import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireTier } from '@/lib/entitlement'
import { getCurrentUserProfile } from '@/lib/supabase/profile'
import { isQAFromHeaders } from '@/lib/qa'

export async function POST(req: Request) {
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

  // QA bypass: allow unauthenticated requests in QA mode for testing
  const isQA = isQAFromHeaders(req.headers)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isQA) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Entitlement check (single source of truth) — skip in QA mode
  if (!isQA) {
    const profile = await getCurrentUserProfile();
    const entitlementError = requireTier(profile, 'base');
    if (entitlementError) {
      return NextResponse.json(entitlementError, { status: 403 });
    }
  }

  const body = await req.json();
  const title = body.title || "Untitled workspace";
  const seed = body.seed;

  // In QA mode create a lightweight workspace owned by a deterministic test user id
  const ownerId = isQA ? 'qa-test-user' : user?.id || 'unknown'
  const { data: workspace, error } = await supabaseAdmin
    .from("workspaces")
    .insert({ user_id: ownerId, title })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create starter thread
  let thread;
  const { data: threadData, error: threadError } = await supabaseAdmin
    .from("threads")
    .insert({ workspace_id: workspace.id, kind: "primary", title: seed ? "First moment" : "Primary" })
    .select("*")
    .single();
  thread = threadData;

  if (threadError) {
    return NextResponse.json({ error: threadError.message }, { status: 500 });
  }

  // If seed provided, create starter messages
  if (seed && thread) {
    // Use the same seeded messages; ensure QA path uses same behavior
    await supabaseAdmin.from("messages").insert([
      {
        thread_id: thread.id,
        role: "user",
        content: seed.moment,
      },
      {
        thread_id: thread.id,
        role: "assistant",
        content:
          "They may have heard \"we need to talk\" as pressure before they heard your care. That can make their body brace before the conversation actually starts.",
        structured_output: {
          relationalStatus: "interpretation",
          rationale: [
            { label: "How they build trust", summary: "Testing before opening up", details: "They may need to test ideas before trusting them, so a defensive response could be checking whether you are safe to engage with." },
            { label: "Safety patterns", summary: "How they learned to protect themselves", details: "They may have learned to scan for reliability before opening up, which can make even neutral pressure feel sharper than you intended." },
            { label: "Current stress level", summary: "What they may already be carrying", details: "If they are already at capacity, even a practical opening can sound threatening regardless of your actual intention." },
          ],
        },
      },
    ]);
  }

  return NextResponse.json({ workspace, thread });
}
