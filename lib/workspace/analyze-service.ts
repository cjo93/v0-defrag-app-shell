import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSharedAIAdapter } from "@/lib/defrag/adapter";
import { DefragStructuredResponseSchema } from "@/lib/defrag/schemas";
import {
  AnalyzeResponseSchema,
  type AnalyzeRequest,
  type AnalyzeResponse,
} from "@/lib/workspace/contracts";
import { buildHeuristicSharedAnalysis } from "@/lib/workspace/defaults";

export async function runAnalyzeFlow(params: {
  userId: string;
  input: AnalyzeRequest;
}): Promise<AnalyzeResponse> {
  const { userId, input } = params;

  const { data: thread, error: threadError } = await supabaseAdmin
    .from("conversation_threads")
    .select(
      "id, kind, title, conversation:conversations(id, title, user_id, active_person_id)"
    )
    .eq("id", input.threadId)
    .maybeSingle();

  const conversation = thread?.conversation
    ? Array.isArray(thread.conversation)
      ? thread.conversation[0]
      : thread.conversation
    : null;

  if (threadError || !thread || !conversation || conversation.user_id !== userId) {
    throw new Error("Thread not found");
  }

  const [baselineResult, personResult, contextResult, recentAnalyses, entitlement] =
    await Promise.all([
      supabaseAdmin
        .from("baseline_profiles")
        .select("plain_language_summary, insight_layers")
        .eq("user_id", userId)
        .maybeSingle(),
      conversation.active_person_id
        ? supabaseAdmin
            .from("people_roster")
            .select("id, name, role")
            .eq("id", conversation.active_person_id)
            .maybeSingle()
        : Promise.resolve({ data: null } as { data: null }),
      supabaseAdmin
        .from("messages")
        .select("content, role, created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: false })
        .limit(12),
      supabaseAdmin
        .from("analyses")
        .select("metadata")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: false })
        .limit(3),
      checkEntitlements(userId),
    ]);

  if (!entitlement.allowed) {
    throw new Error("Entitlement check failed");
  }

  const selectedScope = personResult.data
    ? {
        personId: personResult.data.id,
        name: personResult.data.name,
        role: personResult.data.role,
      }
    : {
        personId: null,
        name: null,
        role: null,
      };

  const timingOverlay = deriveTimingOverlay(contextResult.data ?? []);
  const relationalContext = {
    recentMessages: (contextResult.data ?? []).map((row) => `${row.role}: ${row.content}`),
    recentPatterns: (recentAnalyses.data ?? [])
      .map((row) => row.metadata?.requestClassification)
      .filter((value): value is string => Boolean(value)),
  };

  const userMessageInsert = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversation.id,
      conversation_thread_id: input.threadId,
      role: "user",
      content: input.content,
      metadata: {
        requestClassification: classifyRequest(input.content),
        selectedScope,
      },
    })
    .select("id, conversation_id, conversation_thread_id, role, content, created_at")
    .single();

  if (userMessageInsert.error || !userMessageInsert.data) {
    throw new Error(userMessageInsert.error?.message ?? "Could not persist user message");
  }

  const adapter = getSharedAIAdapter();

  let structured = null;
  try {
    structured = await adapter.analyze({
      userMessage: input.content,
      workspaceTitle: conversation.title,
      threadKind: thread.kind,
      baselineSummary: baselineResult.data?.plain_language_summary ?? null,
      selectedScope,
      timingOverlay,
      relationalContext,
    });
  } catch {
    structured = {
      responseText:
        "I can help map this moment. Start with what happened and what you hoped they would hear.",
      relationalStatus: "uncertain" as const,
      suggestedNextStep:
        "Share one specific moment and the exact phrase you used.",
      shouldOpenBranch: false,
      suggestedArtifact: "none" as const,
      rationale: [],
      educationalLayer: null,
      sharedSessionState: buildHeuristicSharedAnalysis({
        userMessage: input.content,
        assistantText:
          "I can help map this moment. Start with what happened and what you hoped they would hear.",
        shouldOpenBranch: false,
        selectedScope,
        timingFactors: timingOverlay.factors,
      }),
    };
  }

  const parsedStructured = DefragStructuredResponseSchema.parse(structured);

  const assistantMessageInsert = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversation.id,
      conversation_thread_id: input.threadId,
      role: "assistant",
      content: parsedStructured.responseText,
      structured_output: parsedStructured,
      metadata: {
        supportNotes: parsedStructured.sharedSessionState.supportNotes,
        confidence: parsedStructured.sharedSessionState.confidence,
      },
    })
    .select("id, conversation_id, conversation_thread_id, role, content, created_at")
    .single();

  if (assistantMessageInsert.error || !assistantMessageInsert.data) {
    throw new Error(
      assistantMessageInsert.error?.message ?? "Could not persist assistant message"
    );
  }

  const analysisInsert = await supabaseAdmin
    .from("analyses")
    .insert({
      conversation_id: conversation.id,
      thread_id: input.threadId,
      user_message_id: userMessageInsert.data.id,
      assistant_message_id: assistantMessageInsert.data.id,
      status: "ready",
      shared_session_state: parsedStructured.sharedSessionState,
      branch_suggestion: parsedStructured.sharedSessionState.branchSuggestion,
      metadata: {
        requestClassification: parsedStructured.sharedSessionState.requestClassification,
        selectedScope: parsedStructured.sharedSessionState.selectedPeopleScope,
        timingPressure: parsedStructured.sharedSessionState.timingPressure,
        confidence: parsedStructured.sharedSessionState.confidence,
        entitlement: entitlement.plan,
        entitlementPolicy: "temporary_free_fallback_if_row_missing",
      },
    })
    .select("id, conversation_id, thread_id, shared_session_state, created_at")
    .single();

  if (analysisInsert.error || !analysisInsert.data) {
    throw new Error(analysisInsert.error?.message ?? "Could not persist analysis");
  }

  await supabaseAdmin
    .from("messages")
    .update({ analysis_id: analysisInsert.data.id })
    .in("id", [userMessageInsert.data.id, assistantMessageInsert.data.id]);

  return AnalyzeResponseSchema.parse({
    userMessage: {
      id: userMessageInsert.data.id,
      conversationId: userMessageInsert.data.conversation_id,
      threadId: userMessageInsert.data.conversation_thread_id,
      role: userMessageInsert.data.role,
      content: userMessageInsert.data.content,
      createdAt: userMessageInsert.data.created_at,
    },
    assistantMessage: {
      id: assistantMessageInsert.data.id,
      conversationId: assistantMessageInsert.data.conversation_id,
      threadId: assistantMessageInsert.data.conversation_thread_id,
      role: assistantMessageInsert.data.role,
      content: assistantMessageInsert.data.content,
      createdAt: assistantMessageInsert.data.created_at,
    },
    analysis: {
      id: analysisInsert.data.id,
      conversationId: analysisInsert.data.conversation_id,
      threadId: analysisInsert.data.thread_id,
      sharedSessionState: analysisInsert.data.shared_session_state,
      createdAt: analysisInsert.data.created_at,
    },
  });
}

async function checkEntitlements(userId: string) {
  const result = await supabaseAdmin
    .from("subscriptions")
    .select("status, plan_code, current_period_end")
    .eq("user_id", userId)
    .maybeSingle();

  if (result.error || !result.data) {
    // Temporary policy for workspace bring-up:
    // if no subscription row exists yet, allow free access.
    // Replace with explicit billing truth once subscription provisioning is finalized.
    return { allowed: true, plan: "free" };
  }

  const activeStatuses = new Set(["active", "trialing"]);
  const isActive = activeStatuses.has(result.data.status);

  return {
    allowed: isActive || result.data.plan_code === "free",
    plan: result.data.plan_code,
  };
}

function classifyRequest(content: string): string {
  const lower = content.toLowerCase();

  if (lower.includes("sorry") || lower.includes("repair")) return "repair";
  if (lower.includes("boundary") || lower.includes("limit")) return "boundary";
  if (lower.includes("why") || lower.includes("clarify")) return "clarify";
  if (lower.includes("plan") || lower.includes("next")) return "planning";

  return "general";
}

function deriveTimingOverlay(messages: Array<{ created_at: string }>) {
  const nowHour = new Date().getHours();
  const recentCount = messages.length;
  const offHours = nowHour < 7 || nowHour > 22;

  const factors: string[] = [];
  if (offHours) factors.push("Conversation is happening at an off-hour window");
  if (recentCount > 6) factors.push("High recent message volume suggests elevated pressure");
  if (factors.length === 0) {
    factors.push("No strong timing pressure indicators detected");
  }

  const level: "low" | "medium" | "high" =
    offHours || recentCount > 6 ? "high" : recentCount > 2 ? "medium" : "low";

  return { level, factors };
}
