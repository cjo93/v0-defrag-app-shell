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
- An interpretation (responseText): what they may be reacting to.
- A next move (suggestedNextStep): what may help next.
- A rewrite (rewrite): a softer framing or better wording for the user's message.
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
