import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runDefragAgent } from "@/lib/defrag/agent";

type Params = { params: Promise<{ threadId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params;
  const supabase = await createSupabaseServerClient();
  const admin = getSupabaseAdmin();

  if (!supabase || !admin) {
    return NextResponse.json(
      { error: "Database is not configured. Set Supabase environment variables." },
      { status: 503 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return NextResponse.json(
      {
        error:
          "OpenAI is not configured. Add OPENAI_API_KEY to enable message responses.",
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

  const { data: thread, error: threadError } = await admin
    .from("threads")
    .select("id, kind, workspace:workspaces(id, title, user_id)")
    .eq("id", threadId)
    .single();

  if (threadError || !thread || thread.workspace.user_id !== user.id) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  const { data: userMessage, error: userMsgError } = await admin
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

  const structured = await runDefragAgent({
    userMessage: content,
    workspaceTitle: thread.workspace.title,
    threadKind: thread.kind,
  });

  const { data: assistantMessage, error: assistantMsgError } =
    await admin
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

  if (structured.rationale.length > 0) {
    await admin.from("rationale_blocks").insert(
      structured.rationale.map((r) => ({
        message_id: assistantMessage.id,
        label: r.label,
        payload: r,
      }))
    );
  }

  return NextResponse.json({
    userMessage,
    assistantMessage,
    structured,
  });
}
