import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function POST(req: Request) {
  const openai = getOpenAIClient();

  if (!openai) {
    return NextResponse.json(
      {
        error:
          "OpenAI is not configured yet. Add OPENAI_API_KEY to enable audio generation.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const input =
      body?.text ||
      body?.input ||
      "Audio overview is not available yet.";

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(buffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate audio.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
