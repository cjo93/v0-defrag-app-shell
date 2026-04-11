import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runDefragAgent } from "@/lib/defrag/agent";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  const { data: thread, error: threadError } = await supabaseAdmin
    .from("threads")
    .select("id, kind, workspace:workspaces(id, title, user_id)")
    .eq("id", threadId)
    .single();

  if (threadError || !thread || thread.workspace.user_id !== user.id) {
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
  const structured = await runDefragAgent({
    userMessage: content,
    workspaceTitle: thread.workspace.title,
    threadKind: thread.kind,
  });

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
      workspace_id: thread.workspace.id,
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
