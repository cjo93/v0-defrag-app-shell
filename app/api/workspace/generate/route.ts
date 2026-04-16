import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GenerateRendererRequestSchema } from "@/lib/workspace/contracts";
import { runRendererGenerationFlow } from "@/lib/workspace/generation-service";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = GenerateRendererRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid generation payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const response = await runRendererGenerationFlow({
      userId: user.id,
      input: parsed.data,
    });
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Renderer generation failed";
    const status =
      message === "Conversation not found" || message === "Analysis not found"
        ? 404
        : message === "Shared session state invalid"
        ? 422
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
