import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const admin = getSupabaseAdmin();

  if (!supabase || !admin) {
    return NextResponse.json(
      { error: "Database is not configured. Set Supabase environment variables." },
      { status: 503 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId, threadId, kind, title } = await req.json();

  const { data: workspace, error: workspaceError } = await admin
    .from("workspaces")
    .select("id, user_id")
    .eq("id", workspaceId)
    .single();

  if (workspaceError || !workspace || workspace.user_id !== user.id) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const { data: artifact, error } = await admin
    .from("artifacts")
    .insert({
      workspace_id: workspaceId,
      source_thread_id: threadId ?? null,
      kind,
      title: title ?? "Generated artifact",
      status: "ready",
      payload: getSeedPayload(kind),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ artifact });
}

function getSeedPayload(kind: string) {
  switch (kind) {
    case "relational_map":
      return {
        nodes: [
          { id: "self", label: "You", x: 120, y: 140 },
          { id: "other", label: "Other person", x: 420, y: 140 },
        ],
        edges: [{ from: "self", to: "other", label: "Meaning split" }],
      };
    case "timing_view":
      return {
        title: "Timing pressure view",
        items: [
          { label: "Current pressure", level: "high" },
          { label: "Best next move", level: "pause and clarify" },
        ],
      };
    case "family_system":
      return {
        title: "Family system view",
        members: [
          { id: "a", label: "You" },
          { id: "b", label: "Parent / partner" },
        ],
      };
    case "educational":
      return {
        title: "Educational explainer",
        summary:
          "Many people experience moments where intent and impact split under pressure.",
      };
    default:
      return { title: "Artifact", summary: "Structured output ready." };
  }
}
