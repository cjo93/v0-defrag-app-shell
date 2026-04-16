import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { runAnalyzeFlow } from "@/lib/workspace/analyze-service";

type Params = { params: Promise<{ threadId: string }> };

const MessageInputSchema = z.object({
  content: z.string().min(1).max(4000),
});

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = MessageInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
  }

  try {
    const response = await runAnalyzeFlow({
      userId: user.id,
      input: {
        threadId,
        content: parsed.data.content,
      },
    });

    return NextResponse.json(response, {
      headers: {
        "x-defrag-canonical-route": "/api/analyze",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analyze failed";
    const status = message === "Thread not found" ? 404 : message === "Entitlement check failed" ? 402 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
