import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const title = body.title || "Untitled workspace";

  const { data: workspace, error } = await supabaseAdmin
    .from("workspaces")
    .insert({ user_id: user.id, title })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error: threadError } = await supabaseAdmin.from("threads").insert([
    { workspace_id: workspace.id, kind: "primary", title: "Primary" },
  ]);

  if (threadError) {
    return NextResponse.json({ error: threadError.message }, { status: 500 });
  }

  return NextResponse.json({ workspace });
}
