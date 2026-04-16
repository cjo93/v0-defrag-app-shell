import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  SharedSessionAnalysisSchema,
  WorkspaceSessionSchema,
  type AnalysisRecord,
  type ConversationThread,
  type WorkspaceMessage,
  type CanvasSnapshot,
} from "@/lib/workspace/contracts";
import { getEmptySharedAnalysis } from "@/lib/workspace/defaults";

const QuerySchema = z.object({
  conversationId: z.string().uuid().optional(),
  personId: z.string().uuid().optional(),
});

const DEFAULT_ROSTER = [
  { name: "Alex", role: "Partner" },
  { name: "Morgan", role: "Colleague" },
  { name: "Jordan", role: "Family" },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    conversationId: url.searchParams.get("conversationId") ?? undefined,
    personId: url.searchParams.get("personId") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query params" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roster = await getOrSeedRoster(user.id);

  let conversation: any = null;
  if (parsed.data.conversationId) {
    const { data } = await supabaseAdmin
      .from("conversations")
      .select("id, title, active_person_id")
      .eq("id", parsed.data.conversationId)
      .eq("user_id", user.id)
      .maybeSingle();
    conversation = data;
  }

  if (!conversation) {
    const { data } = await supabaseAdmin
      .from("conversations")
      .select("id, title, active_person_id")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    conversation = data;
  }

  if (!conversation) {
    const selectedPersonId =
      parsed.data.personId ?? (roster.length > 0 ? roster[0].id : null);
    const { data, error } = await supabaseAdmin
      .from("conversations")
      .insert({
        user_id: user.id,
        title: "Main Workspace Session",
        active_person_id: selectedPersonId,
      })
      .select("id, title, active_person_id")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Failed to create conversation" }, { status: 500 });
    }
    conversation = data;
  }

  if (parsed.data.personId && parsed.data.personId !== conversation.active_person_id) {
    const { data } = await supabaseAdmin
      .from("conversations")
      .update({ active_person_id: parsed.data.personId })
      .eq("id", conversation.id)
      .eq("user_id", user.id)
      .select("id, title, active_person_id")
      .single();
    if (data) conversation = data;
  }

  let threads: any[] = [];
  const threadResult = await supabaseAdmin
    .from("conversation_threads")
    .select("id, conversation_id, kind, parent_thread_id, title, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  if (!threadResult.error && threadResult.data) {
    threads = threadResult.data;
  }

  if (!threads.some((thread) => thread.kind === "primary")) {
    const { data } = await supabaseAdmin
      .from("conversation_threads")
      .insert({
        conversation_id: conversation.id,
        kind: "primary",
        title: "Main Thread",
      })
      .select("id, conversation_id, kind, parent_thread_id, title, created_at")
      .single();

    if (data) {
      threads = [...threads, data];
    }
  }

  const { data: messageRows } = await supabaseAdmin
    .from("messages")
    .select("id, conversation_id, conversation_thread_id, role, content, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  const { data: analysisRows } = await supabaseAdmin
    .from("analyses")
    .select("id, conversation_id, thread_id, shared_session_state, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  const { data: snapshotRows } = await supabaseAdmin
    .from("canvas_snapshots")
    .select("id, conversation_id, source_thread_id, analysis_id, mode, title, payload, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true });

  const session = WorkspaceSessionSchema.parse({
    conversation: {
      id: conversation.id,
      title: conversation.title,
      activePersonId: conversation.active_person_id,
    },
    threads: (threads ?? []).map(
      (thread): ConversationThread => ({
        id: thread.id,
        conversationId: thread.conversation_id,
        kind: thread.kind,
        parentThreadId: thread.parent_thread_id,
        title: thread.title,
        createdAt: thread.created_at,
      })
    ),
    messages: (messageRows ?? []).flatMap((message): WorkspaceMessage[] => {
      if (!message.conversation_thread_id || !message.conversation_id) {
        return [];
      }

      return [
        {
          id: message.id,
          conversationId: message.conversation_id,
          threadId: message.conversation_thread_id,
          role: message.role,
          content: message.content,
          createdAt: message.created_at,
        },
      ];
    }),
    analyses: (analysisRows ?? []).map(
      (analysis): AnalysisRecord => ({
        id: analysis.id,
        conversationId: analysis.conversation_id,
        threadId: analysis.thread_id,
        sharedSessionState:
          SharedSessionAnalysisSchema.safeParse(analysis.shared_session_state).success
            ? analysis.shared_session_state
            : getEmptySharedAnalysis(),
        createdAt: analysis.created_at,
      })
    ),
    snapshots: (snapshotRows ?? []).map(
      (snapshot): CanvasSnapshot => ({
        id: snapshot.id,
        conversationId: snapshot.conversation_id,
        sourceThreadId: snapshot.source_thread_id,
        analysisId: snapshot.analysis_id,
        mode: snapshot.mode,
        title: snapshot.title,
        payload: snapshot.payload ?? {},
        createdAt: snapshot.created_at,
      })
    ),
    roster,
  });

  return NextResponse.json(session);
}

async function getOrSeedRoster(userId: string) {
  const { data: existing } = await supabaseAdmin
    .from("people_roster")
    .select("id, name, role")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (existing && existing.length > 0) {
    return existing;
  }

  const { data: seeded } = await supabaseAdmin
    .from("people_roster")
    .insert(
      DEFAULT_ROSTER.map((person) => ({
        user_id: userId,
        ...person,
      }))
    )
    .select("id, name, role");

  return seeded ?? [];
}
