import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  AudioOverviewGeneratedSchema,
  VideoExplainerGeneratedSchema,
  type AudioOverviewGenerated,
  type RendererGenerationMode,
  type SharedSessionAnalysis,
  type VideoExplainerGenerated,
} from "@/lib/workspace/contracts";

type RendererGeneratorInput = {
  mode: RendererGenerationMode;
  sharedSessionState: SharedSessionAnalysis;
  viewState: unknown;
};

export async function runRendererGenerator(
  input: RendererGeneratorInput
): Promise<AudioOverviewGenerated | VideoExplainerGenerated> {
  const system = `
You are Defrag renderer generation.
Use only the provided shared session analysis object as the reasoning source.
Keep language plain, calm, and conversational.
Do not use symbolic system jargon or diagnostic framing.
Do not generate person-specific gossip or private speculation.
Return JSON that matches schema exactly.
`;

  const prompt = `
Mode: ${input.mode}

Shared session analysis:
${JSON.stringify(input.sharedSessionState, null, 2)}

Renderer view state:
${JSON.stringify(input.viewState ?? {}, null, 2)}

Generate product-ready renderer content that stays grounded in the shared session analysis.
`;

  if (input.mode === "audio_overview") {
    const result = await generateObject({
      model: openai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4.1-mini"),
      schema: AudioOverviewGeneratedSchema,
      system,
      prompt,
    });

    return result.object;
  }

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4.1-mini"),
    schema: VideoExplainerGeneratedSchema,
    system,
    prompt,
  });

  return result.object;
}
