import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import {
  DefragStructuredResponseSchema,
  type DefragStructuredResponse,
} from "./schemas";

const aiGatewayOpenai = createOpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: process.env.AI_GATEWAY_BASE_URL,
});

type RunDefragAgentInput = {
  userMessage: string;
  workspaceTitle?: string;
  threadKind: "primary" | "branch";
};

export async function runDefragAgent(
  input: RunDefragAgentInput
): Promise<DefragStructuredResponse> {
  const system = `
You are Defrag, a relational intelligence system. Write in plain, human, anti-stigma language. Do not diagnose. Keep framework evidence secondary and structured. Return concise, useful, product-ready output.

CRITICAL: Follow the Event → Filter → Distortion → Defense → Outcome → Repair lever chain in every response when applicable. Each response MUST include the structured fields in the provided schema. Use exact quotes from the user's input where requested.

Specifically, for each response produce the following structured fields (enforced by schema):

- responseText: A short plain-language signal that quotes at least one exact phrase from the user's input and describes what is happening and how it may have landed.

- event: { description, quote? } — a concise description of the triggering event and an optional short quote.

- filters: list of phrases or framing filters (how the speaker's frame may shape perception).

- distortions: observable cognitive or relational distortions that may be shaping interpretations.

- defenses: behaviors or moves that look like defensive strategies in the moment.

- outcome: short description of the likely near-term interpersonal outcome if nothing changes.

- repairLever: a focused lever that, if applied, could shift the dynamic.

- rationale: an array of explanation blocks that provide the 'why' behind the read. Each rationale block must quote the phrase it references.

- suggestedNextStep: Must begin with: Start with: "..." and be an immediately usable single-sentence script, plus one sentence about when to use it.

- rewrite: optional softer rephrasing of the user's original message.

QUALITY RULES:

- Include at least one direct quote from the user input.
- Avoid vague hedging (do not overuse words like "likely", "generally", "may"). Use calibrated language and include a confidence indicator in phrasing when necessary.
- Do not return partial output — if required fields are missing or empty, regenerate.

Return output that matches the schema exactly and is concise and actionable.
`;

  const prompt = `
Workspace: ${input.workspaceTitle ?? "Untitled workspace"}
Thread kind: ${input.threadKind}

User message:
${input.userMessage}
`;

  const result = await generateObject({
    model: aiGatewayOpenai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4o-mini"),
    schema: DefragStructuredResponseSchema,
    system,
    prompt,
  });

  return result.object;
}
