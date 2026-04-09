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
`;

  const prompt = `
Workspace: ${input.workspaceTitle ?? "Untitled workspace"}
Thread kind: ${input.threadKind}

User message:
${input.userMessage}
`;

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL_PRIMARY || "gpt-4.1-mini"),
    schema: DefragStructuredResponseSchema,
    system,
    prompt,
  });

  return result.object;
}
