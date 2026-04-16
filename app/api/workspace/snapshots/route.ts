import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  SaveSnapshotRequestSchema,
  SaveSnapshotResponseSchema,
  type SaveSnapshotRequest,
} from "@/lib/workspace/contracts";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = SaveSnapshotRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid snapshot payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;

  const { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id")
    .eq("id", input.conversationId)
    .maybeSingle();

  if (!conversation || conversation.user_id !== user.id) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const { data: thread } = await supabaseAdmin
    .from("conversation_threads")
    .select("id, conversation_id")
    .eq("id", input.sourceThreadId)
    .maybeSingle();

  if (!thread || thread.conversation_id !== input.conversationId) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  if (input.analysisId) {
    const { data: analysis } = await supabaseAdmin
      .from("analyses")
      .select("id, conversation_id")
      .eq("id", input.analysisId)
      .maybeSingle();

    if (!analysis || analysis.conversation_id !== input.conversationId) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }
  }

  const { data, error } = await supabaseAdmin
    .from("canvas_snapshots")
    .insert(toInsertRecord(input))
    .select(
      "id, conversation_id, source_thread_id, analysis_id, mode, title, payload, created_at"
    )
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to save snapshot" },
      { status: 500 }
    );
  }

  const response = SaveSnapshotResponseSchema.parse({
    id: data.id,
    conversationId: data.conversation_id,
    sourceThreadId: data.source_thread_id,
    analysisId: data.analysis_id,
    mode: data.mode,
    title: data.title,
    payload: data.payload,
    createdAt: data.created_at,
  });

  return NextResponse.json(response);
}

function toInsertRecord(input: SaveSnapshotRequest) {
  return {
    conversation_id: input.conversationId,
    source_thread_id: input.sourceThreadId,
    analysis_id: input.analysisId,
    mode: input.mode,
    title: input.title,
    payload: input.payload,
  };
}
