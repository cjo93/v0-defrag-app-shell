import { NextResponse } from "next/server";
import { AnalyzeRequestSchema } from "@/lib/workspace/contracts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runAnalyzeFlow } from "@/lib/workspace/analyze-service";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = AnalyzeRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid analyze payload",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const result = await runAnalyzeFlow({
      userId: user.id,
      input: parsed.data,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analyze failed";
    const status = message === "Thread not found" ? 404 : message === "Entitlement check failed" ? 402 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
