import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runDefragAgent } from "@/lib/defrag/agent";
import { requireTier } from '@/lib/entitlement'
import { getCurrentUserProfile } from '@/lib/supabase/profile'

type Params = { params: Promise<{ threadId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params;
  let supabase;
  let supabaseAdmin;

  try {
    supabase = await createSupabaseServerClient();
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Supabase is not configured.",
      },
      { status: 503 }
    );
  }

  const isQA = req.headers.get('x-defrag-qa') === '1' || req.headers.get('cookie')?.includes('defrag_qa=1')

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isQA) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  // Fetch user profile and check entitlement (single source of truth) — skip in QA
  if (!isQA) {
    const profile = await getCurrentUserProfile();
    const entitlementError = requireTier(profile, 'base');
    if (entitlementError) {
      return NextResponse.json(entitlementError, { status: 403 });
    }
  }

  // Supabase may return joined workspace as an array or object depending on the query result.
  // Cast to any for minimal friction and normalize the workspace shape for safe access.
  const { data: thread, error: threadError }: any = await supabaseAdmin
    .from("threads")
    .select("id, kind, workspace:workspaces(id, title, user_id)")
    .eq("id", threadId)
    .single();

  const workspace = thread?.workspace && Array.isArray(thread.workspace) ? thread.workspace[0] : thread?.workspace;

  // Allow QA owner to operate on test workspaces
  const ownerId = isQA ? 'qa-test-user' : user?.id || 'unknown'
  if (threadError || !thread || !workspace || workspace.user_id !== ownerId) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // Insert user message
  const { data: userMessage, error: userMsgError } = await supabaseAdmin
    .from("messages")
    .insert({
      thread_id: threadId,
      role: "user",
      content,
    })
    .select("*")
    .single();

  if (userMsgError) {
    return NextResponse.json({ error: userMsgError.message }, { status: 500 });
  }

  // Insert "Reading..." placeholder or handle AI generation
  // In QA mode, return a deterministic structured response without calling AI
  let structured
  if (isQA) {
    structured = {
      responseText: `"${content}" — may come across as direct.`,
      relationalStatus: 'interpretation',
      rationale: [
        { label: 'Wording', summary: `Quoted: "${content.split(' ').slice(0,6).join(' ')}..."`, details: '' },
      ],
      suggestedNextStep: 'Start with: "Can we find a time to talk that works for you?"',
      rewrite: 'A softer way to open the topic and invite collaboration.',
    }
  } else {
    structured = await runDefragAgent({
      userMessage: content,
      workspaceTitle: workspace.title,
      threadKind: thread.kind,
    });
  }

  const { data: assistantMessage, error: assistantMsgError } =
    await supabaseAdmin
      .from("messages")
      .insert({
        thread_id: threadId,
        role: "assistant",
        content: structured.responseText,
        structured_output: structured,
      })
      .select("*")
      .single();

  if (assistantMsgError) {
    return NextResponse.json(
      { error: assistantMsgError.message },
      { status: 500 }
    );
  }

  // Insert rationale blocks
  if (structured.rationale && structured.rationale.length > 0) {
    await supabaseAdmin.from("rationale_blocks").insert(
      structured.rationale.map((r) => ({
        message_id: assistantMessage.id,
        label: r.label,
        payload: r,
      }))
    );
  }

  // Also update artifacts for the workspace if needed
  if (structured.suggestedArtifact && structured.suggestedArtifact !== 'none') {
    await supabaseAdmin.from("artifacts").insert({
      workspace_id: workspace.id,
      source_thread_id: threadId,
      kind: structured.suggestedArtifact,
      status: 'ready',
      title: structured.suggestedArtifact.replace('_', ' '),
      payload: structured.educationalLayer || { summary: structured.responseText }
    });
  }

  return NextResponse.json({
    userMessage,
    assistantMessage,
    structured,
  });
}
