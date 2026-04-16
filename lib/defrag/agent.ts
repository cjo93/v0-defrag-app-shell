import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  DefragStructuredResponseSchema,
  type DefragStructuredResponse,
} from "./schemas";

type RunDefragAgentInput = {
  userMessage: string;
  workspaceTitle?: string;
  threadKind: "primary" | "branch";
  context?: {
    baselineSummary?: unknown;
    selectedScope?: {
      personId: string | null;
      name: string | null;
      role: string | null;
    };
    timingOverlay?: {
      level: "low" | "medium" | "high";
      factors: string[];
    };
    relationalContext?: {
      recentMessages: string[];
      recentPatterns: string[];
    };
  };
};

export async function runDefragAgent(
  input: RunDefragAgentInput
): Promise<DefragStructuredResponse> {
  const system = `
You are Defrag, a relational intelligence system.
Write in plain, human, anti-stigma language.
Do not diagnose.
Do not use jargon from astrology, human design, gene keys, numerology, I Ching, Penta, or Hexa in normal user-facing output.
Keep framework evidence internal and concise in support notes.
Return concise, useful, product-ready output.

You must always fill sharedSessionState and keep this reasoning spine:
Event -> Filter -> Distortion -> Defense -> Outcome -> Repair lever
`;

  const prompt = `
Workspace: ${input.workspaceTitle ?? "Untitled workspace"}
Thread kind: ${input.threadKind}

Selected scope:
${JSON.stringify(input.context?.selectedScope ?? null, null, 2)}

Timing overlay:
${JSON.stringify(input.context?.timingOverlay ?? null, null, 2)}

Relational context:
${JSON.stringify(input.context?.relationalContext ?? null, null, 2)}

Baseline summary:
${JSON.stringify(input.context?.baselineSummary ?? null, null, 2)}

User message:
${input.userMessage}

Return JSON that satisfies schema exactly. Branch suggestions must be suggestions only.
Keep supportNotes concise and safe for a "What this is based on" panel.
`;

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4.1-mini"),
    schema: DefragStructuredResponseSchema,
    system,
    prompt,
  });

  return result.object;
}
