import { runDefragAgent } from "./agent";
import type { DefragStructuredResponse } from "./schemas";
import { runRendererGenerator } from "./renderer-generator";
import type {
  AudioOverviewGenerated,
  SharedSessionAnalysis,
  VideoExplainerGenerated,
  RendererGenerationMode,
} from "@/lib/workspace/contracts";

export type SharedAdapterInput = {
  userMessage: string;
  workspaceTitle?: string;
  threadKind: "primary" | "branch";
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

export type SharedAdapter = {
  analyze: (input: SharedAdapterInput) => Promise<DefragStructuredResponse>;
  generateRenderer: (input: {
    mode: RendererGenerationMode;
    sharedSessionState: SharedSessionAnalysis;
    viewState: unknown;
  }) => Promise<AudioOverviewGenerated | VideoExplainerGenerated>;
};

const openAIAdapter: SharedAdapter = {
  async analyze(input) {
    return runDefragAgent({
      userMessage: input.userMessage,
      workspaceTitle: input.workspaceTitle,
      threadKind: input.threadKind,
      context: {
        baselineSummary: input.baselineSummary,
        selectedScope: input.selectedScope,
        timingOverlay: input.timingOverlay,
        relationalContext: input.relationalContext,
      },
    });
  },
  async generateRenderer(input) {
    return runRendererGenerator(input);
  },
};

export function getSharedAIAdapter(): SharedAdapter {
  return openAIAdapter;
}
