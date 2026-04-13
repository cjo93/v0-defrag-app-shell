import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runDefragAgent } from "@/lib/defrag/agent";
import { requireTier } from '@/lib/entitlement'
import { getCurrentUserProfile } from '@/lib/supabase/profile'
import { isQAFromHeaders } from '@/lib/qa'

type Params = { params: Promise<{ threadId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params;
  // Read simulation header early so local-only simulated failures can run before
  // any Supabase admin/client initialization. This must NEVER run in production.
  const simulate = (process.env.NODE_ENV !== 'production')
    ? (req.headers.get('x-simulate-failure') || null)
    : null

  if (simulate === 'assistant-generation') {
    return NextResponse.json({ error: 'Simulated assistant generation failure' }, { status: 500 })
  }

  if (simulate === 'persistence-load') {
    return NextResponse.json({ error: 'Simulated persistence/load failure' }, { status: 500 })
  }

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

  const isQA = isQAFromHeaders(req.headers)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isQA) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const content = body.content as string | undefined
  const retryForMessageId = body.retryForMessageId as string | undefined

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

  // If retryForMessageId provided, re-run generation for that user message
  let userMessage: any = null
  if (retryForMessageId) {
    const { data: originalMsg, error: origErr } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('id', retryForMessageId)
      .single()

    if (origErr || !originalMsg) {
      return NextResponse.json({ error: 'Original message not found' }, { status: 404 })
    }
    userMessage = originalMsg
  } else {
    // Insert user message
    const { data: um, error: userMsgError } = await supabaseAdmin
      .from('messages')
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
    userMessage = um
  }

  // Determine content to run the agent on
  const promptContent = (userMessage && userMessage.content) || content || ''

  // Insert "Reading..." placeholder or handle AI generation
  let structured: any
  if (isQA) {
    structured = {
      responseText: `"${promptContent}" — may come across as direct.`,
      relationalStatus: 'interpretation',
      rationale: [
        { label: 'Wording', summary: `Quoted: "${promptContent.split(' ').slice(0,6).join(' ')}..."`, details: '' },
      ],
      suggestedNextStep: 'Start with: "Can we find a time to talk that works for you?"',
      rewrite: 'A softer way to open the topic and invite collaboration.',
    }
  } else {
    // Allow a simulated assistant-generation failure for local testing.
    if (simulate === 'assistant-generation') {
      // Simulate agent failure
      return NextResponse.json({ error: 'Simulated assistant generation failure' }, { status: 500 })
    }

    structured = await runDefragAgent({
      userMessage: promptContent,
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
      structured.rationale.map((r: any) => ({
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
