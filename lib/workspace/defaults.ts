import type { SharedSessionAnalysis } from "./contracts";

function buildSupportNotes(): SharedSessionAnalysis["supportNotes"] {
  return [
    {
      label: "Interaction context",
      detail: "Interpretation focused on repair and clarity within the selected relationship scope.",
    },
  ];
}

export function getEmptySharedAnalysis(): SharedSessionAnalysis {
  const supportNotes = buildSupportNotes();

  return {
    requestClassification: "unknown",
    selectedPeopleScope: {
      personId: null,
      name: null,
      role: null,
    },
    timingPressure: {
      level: "medium",
      factors: ["No timing context loaded yet"],
    },
    eventType: "unknown",
    likelyUserFilters: [],
    likelyOtherFilters: [],
    likelyDistortions: [],
    likelyDefenses: [],
    likelyLargerPattern: "No pattern identified yet",
    likelyOutcome: "Awaiting analysis",
    repairLevers: ["Share one concrete moment and your intended outcome"],
    exactLanguage: {
      opening: "Can we walk through what happened so we both feel understood?",
      followUp: "What part landed hardest for you?",
    },
    branchSuggestions: [],
    mediaTriggers: {
      liveSystemState: true,
      videoExplainer: false,
      audioOverview: false,
      visualInfographic: false,
    },
    supportNotes,
    confidence: {
      overall: 0.2,
      evidenceSupport: 0.2,
    },
    summary: "No analysis yet. Describe a moment to start.",
    spine: {
      event: "Awaiting event details",
      filter: "Unknown",
      distortion: "Unknown",
      defense: "Unknown",
      outcome: "Unknown",
      repairLever: "Lead with clarity and validation",
    },
    branchSuggestion: null,
    rationaleBlocks: supportNotes,
  };
}

export function buildHeuristicSharedAnalysis(args: {
  userMessage: string;
  assistantText: string;
  shouldOpenBranch?: boolean;
  selectedScope?: {
    personId: string | null;
    name: string | null;
    role: string | null;
  };
  timingFactors?: string[];
}): SharedSessionAnalysis {
  const trimmed = args.userMessage.trim();
  const branchSuggestion = args.shouldOpenBranch
    ? {
        title: "Alternative framing branch",
        reason: "Try a lower-pressure framing before problem-solving.",
        prompt:
          "Draft a softer opening that validates the other person before introducing the core issue.",
      }
    : null;

  const supportNotes = buildSupportNotes();

  return {
    requestClassification: "repair",
    selectedPeopleScope: {
      personId: args.selectedScope?.personId ?? null,
      name: args.selectedScope?.name ?? null,
      role: args.selectedScope?.role ?? null,
    },
    timingPressure: {
      level: "medium",
      factors: args.timingFactors ?? ["Recent interaction appears emotionally loaded"],
    },
    eventType: "relationship_tension",
    likelyUserFilters: ["Urgency to resolve quickly"],
    likelyOtherFilters: ["Threat sensitivity to criticism"],
    likelyDistortions: ["Intent-impact split"],
    likelyDefenses: ["Protective defensiveness"],
    likelyLargerPattern: "Rapid escalation after ambiguous phrasing",
    likelyOutcome: "Clarity drops unless safety is signaled first",
    repairLevers: [
      "Name positive intent first",
      "Validate impact before asking for change",
      "Keep the next step concrete and short",
    ],
    exactLanguage: {
      opening: "I care about getting this right with you, and I want to understand your side first.",
      followUp: "Can we start with what felt most difficult in that moment?",
    },
    branchSuggestions: branchSuggestion ? [branchSuggestion] : [],
    mediaTriggers: {
      liveSystemState: true,
      videoExplainer: false,
      audioOverview: true,
      visualInfographic: true,
    },
    supportNotes,
    confidence: {
      overall: 0.58,
      evidenceSupport: 0.52,
    },
    summary: args.assistantText,
    spine: {
      event: trimmed.length > 0 ? trimmed : "No event provided",
      filter: "Threat or criticism is inferred before intent is clarified",
      distortion: "Intent and impact get split under pressure",
      defense: "Protective defensiveness or withdrawal",
      outcome: "Understanding degrades and tension rises",
      repairLever: "Name intent first, validate impact, then ask one clear next-step question",
    },
    branchSuggestion,
    rationaleBlocks: supportNotes,
  };
}
