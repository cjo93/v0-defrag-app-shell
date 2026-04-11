import { NextResponse } from "next/server";
import { runDefragAgent } from "@/lib/defrag/agent";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    // Check for required env vars - graceful handling if missing
    if (!process.env.AI_GATEWAY_API_KEY || !process.env.AI_GATEWAY_BASE_URL) {
      console.warn("AI_GATEWAY configuration missing. Falling back to demo mode behavior.");
      return NextResponse.json(
        { error: "AI gateway not configured" },
        { status: 503 }
      );
    }

    const result = await runDefragAgent({
      userMessage: input,
      threadKind: "primary",
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI Generation Error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate AI response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
