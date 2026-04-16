import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const CreateBranchSchema = z.object({
  conversationId: z.string().uuid(),
  parentThreadId: z.string().uuid().optional(),
  title: z.string().min(1).max(140).default("Branch"),
});

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = CreateBranchSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid branch payload" }, { status: 400 });
  }

  const { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id")
    .eq("id", parsed.data.conversationId)
    .maybeSingle();

  if (!conversation || conversation.user_id !== user.id) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("conversation_threads")
    .insert({
      conversation_id: parsed.data.conversationId,
      kind: "branch",
      parent_thread_id: parsed.data.parentThreadId ?? null,
      title: parsed.data.title,
    })
    .select("id, conversation_id, kind, parent_thread_id, title, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    id: data.id,
    conversationId: data.conversation_id,
    kind: data.kind,
    parentThreadId: data.parent_thread_id,
    title: data.title,
    createdAt: data.created_at,
  });
}
