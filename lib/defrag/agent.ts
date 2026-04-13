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
You are Defrag, a relational intelligence system.
Write in plain, human, anti-stigma language.
Do not diagnose.
Keep framework evidence secondary and structured.
Return concise, useful, product-ready output.

Specifically, for each response, provide:

- Signal (responseText):
  What is happening and how it may have landed.
  MUST quote at least one exact phrase from the user's input.

- Risk (rationale):
  What in the user's wording may trigger defensiveness, pressure, or misinterpretation.
  MUST quote the exact phrase causing the issue.
  MUST return at least one rationale item:
    { summary: string }

- Next move (suggestedNextStep):
  A short, usable script the user can say immediately.
  MUST begin with: Start with: "..."
  MUST include one sentence explaining when to use it.

- Rewrite (rewrite):
  A softer or clearer version of the user's original message.

QUALITY ENFORCEMENT RULES:

- MUST include at least one direct quote from the user input
- DO NOT use vague language: "likely", "generally", "may", "can be"
- Next move must be immediately usable as a sentence the user can say
- Output must be specific to THIS message (not reusable)
- MUST return ALL fields: responseText, rationale (>=1), suggestedNextStep, rewrite

FINAL ENFORCEMENT:

If ANY of the following are true, you MUST regenerate the response:

- rationale is empty or missing
- suggestedNextStep does not start with "Start with:"
- no direct quote from the user input appears
- any required field is missing (responseText, rationale, suggestedNextStep, rewrite)
- the response is generic or reusable across multiple situations

Do not return partial or non-compliant output.
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
