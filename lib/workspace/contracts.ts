import { z } from "zod";

export const CenterModeSchema = z.enum([
  "live_system_state",
  "video_explainer",
  "audio_overview",
  "visual_infographic",
]);

export type CenterMode = z.infer<typeof CenterModeSchema>;

export const PersonRosterRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  role: z.string(),
});

export type PersonRosterRecord = z.infer<typeof PersonRosterRecordSchema>;

const SpineSchema = z.object({
  event: z.string(),
  filter: z.string(),
  distortion: z.string(),
  defense: z.string(),
  outcome: z.string(),
  repairLever: z.string(),
});

const ScopeSelectionSchema = z.object({
  personId: z.string().uuid().nullable(),
  name: z.string().nullable(),
  role: z.string().nullable(),
});

const TimingPressureSchema = z.object({
  level: z.enum(["low", "medium", "high"]),
  factors: z.array(z.string()).default([]),
});

const BranchSuggestionSchema = z.object({
  title: z.string(),
  reason: z.string(),
  prompt: z.string(),
});

const MediaTriggerSchema = z.object({
  liveSystemState: z.boolean(),
  videoExplainer: z.boolean(),
  audioOverview: z.boolean(),
  visualInfographic: z.boolean(),
});

const ConfidenceSchema = z.object({
  overall: z.number().min(0).max(1),
  evidenceSupport: z.number().min(0).max(1),
});

const SupportNoteSchema = z.object({
  label: z.string(),
  detail: z.string(),
});

export const SharedSessionAnalysisSchema = z.object({
  requestClassification: z.string(),
  selectedPeopleScope: ScopeSelectionSchema,
  timingPressure: TimingPressureSchema,
  eventType: z.string(),
  likelyUserFilters: z.array(z.string()).default([]),
  likelyOtherFilters: z.array(z.string()).default([]),
  likelyDistortions: z.array(z.string()).default([]),
  likelyDefenses: z.array(z.string()).default([]),
  likelyLargerPattern: z.string(),
  likelyOutcome: z.string(),
  repairLevers: z.array(z.string()).default([]),
  exactLanguage: z.object({
    opening: z.string(),
    followUp: z.string(),
  }),
  branchSuggestions: z.array(BranchSuggestionSchema).default([]),
  mediaTriggers: MediaTriggerSchema,
  supportNotes: z.array(SupportNoteSchema).default([]),
  confidence: ConfidenceSchema,
  summary: z.string(),
  spine: SpineSchema,
  branchSuggestion: BranchSuggestionSchema.nullable().default(null),
  rationaleBlocks: z.array(SupportNoteSchema).default([]),
});

export type SharedSessionAnalysis = z.infer<typeof SharedSessionAnalysisSchema>;

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  activePersonId: z.string().uuid().nullable(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

export const ConversationThreadSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  kind: z.enum(["primary", "branch"]),
  parentThreadId: z.string().uuid().nullable(),
  title: z.string(),
  createdAt: z.string(),
});

export type ConversationThread = z.infer<typeof ConversationThreadSchema>;

export const WorkspaceMessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  createdAt: z.string(),
});

export type WorkspaceMessage = z.infer<typeof WorkspaceMessageSchema>;

export const AnalysisRecordSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  sharedSessionState: SharedSessionAnalysisSchema,
  createdAt: z.string(),
});

export type AnalysisRecord = z.infer<typeof AnalysisRecordSchema>;

export const LiveSystemViewStateSchema = z.object({
  zoom: z.number(),
  panX: z.number(),
  panY: z.number(),
  highlightedNodeId: z.string().nullable(),
});

export type LiveSystemViewStateSnapshot = z.infer<typeof LiveSystemViewStateSchema>;

export const LiveSystemSnapshotPayloadSchema = z.object({
  rendererType: z.literal("live_system_state"),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  analysisId: z.string().uuid().nullable(),
  selectedPeopleScope: z.object({
    personId: z.string().uuid().nullable(),
    name: z.string().nullable(),
    role: z.string().nullable(),
  }),
  mapViewState: LiveSystemViewStateSchema,
  focusState: z.object({
    highlightedNodeId: z.string().nullable(),
  }),
  createdAt: z.string(),
});

export type LiveSystemSnapshotPayload = z.infer<typeof LiveSystemSnapshotPayloadSchema>;

export const VisualInfographicViewStateSchema = z.object({
  focusPanel: z.enum(["what_seems_off", "how_it_lands", "pressure_source", "likely_next_move", "what_to_avoid"]),
  emphasisLevel: z.enum(["calm", "balanced", "urgent"]),
  expandedPanelIds: z.array(z.string()).default([]),
});

export type VisualInfographicViewStateSnapshot = z.infer<typeof VisualInfographicViewStateSchema>;

export const VisualInfographicSnapshotPayloadSchema = z.object({
  rendererType: z.literal("visual_infographic"),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  analysisId: z.string().uuid().nullable(),
  selectedPeopleScope: z.object({
    personId: z.string().uuid().nullable(),
    name: z.string().nullable(),
    role: z.string().nullable(),
  }),
  infographicViewState: VisualInfographicViewStateSchema,
  focusState: z.object({
    selectedPanel: z.string().nullable(),
  }),
  createdAt: z.string(),
});

export type VisualInfographicSnapshotPayload = z.infer<typeof VisualInfographicSnapshotPayloadSchema>;

export const AudioOverviewViewStateSchema = z.object({
  pace: z.enum(["steady", "brief", "reflective"]),
  selectedSegment: z.enum(["summary", "overview_script", "interpretation_notes", "timing_support"]),
  includeSupportNotes: z.boolean(),
});

export type AudioOverviewViewStateSnapshot = z.infer<typeof AudioOverviewViewStateSchema>;

export const AudioOverviewSnapshotPayloadSchema = z.object({
  rendererType: z.literal("audio_overview"),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  analysisId: z.string().uuid().nullable(),
  selectedPeopleScope: z.object({
    personId: z.string().uuid().nullable(),
    name: z.string().nullable(),
    role: z.string().nullable(),
  }),
  audioViewState: AudioOverviewViewStateSchema,
  focusState: z.object({
    selectedSegment: z.string().nullable(),
  }),
  createdAt: z.string(),
});

export type AudioOverviewSnapshotPayload = z.infer<typeof AudioOverviewSnapshotPayloadSchema>;

export const VideoExplainerViewStateSchema = z.object({
  pace: z.enum(["calm", "balanced", "dynamic"]),
  emphasis: z.enum(["soft", "standard", "strong"]),
  transitionStyle: z.enum(["fade", "flow", "cut"]),
  selectedBeat: z.enum(["context", "friction", "pivot", "repair"]),
  showOrbCues: z.boolean(),
});

export type VideoExplainerViewStateSnapshot = z.infer<typeof VideoExplainerViewStateSchema>;

export const VideoExplainerSnapshotPayloadSchema = z.object({
  rendererType: z.literal("video_explainer"),
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  analysisId: z.string().uuid().nullable(),
  selectedPeopleScope: z.object({
    personId: z.string().uuid().nullable(),
    name: z.string().nullable(),
    role: z.string().nullable(),
  }),
  videoViewState: VideoExplainerViewStateSchema,
  focusState: z.object({
    selectedBeat: z.string().nullable(),
  }),
  createdAt: z.string(),
});

export type VideoExplainerSnapshotPayload = z.infer<typeof VideoExplainerSnapshotPayloadSchema>;

export const CanvasSnapshotSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  sourceThreadId: z.string().uuid().nullable(),
  analysisId: z.string().uuid().nullable(),
  mode: CenterModeSchema,
  title: z.string().nullable(),
  payload: z.record(z.any()),
  createdAt: z.string(),
});

export type CanvasSnapshot = z.infer<typeof CanvasSnapshotSchema>;

export const WorkspaceSessionSchema = z.object({
  conversation: ConversationSchema,
  threads: z.array(ConversationThreadSchema),
  messages: z.array(WorkspaceMessageSchema),
  analyses: z.array(AnalysisRecordSchema),
  snapshots: z.array(CanvasSnapshotSchema),
  roster: z.array(PersonRosterRecordSchema),
});

export type WorkspaceSession = z.infer<typeof WorkspaceSessionSchema>;

export const AnalyzeRequestSchema = z.object({
  threadId: z.string().uuid(),
  content: z.string().min(1).max(4000),
});

export const AnalyzeResponseSchema = z.object({
  userMessage: WorkspaceMessageSchema,
  assistantMessage: WorkspaceMessageSchema,
  analysis: AnalysisRecordSchema,
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>;

export const SaveSnapshotRequestSchema = z.object({
  conversationId: z.string().uuid(),
  sourceThreadId: z.string().uuid(),
  analysisId: z.string().uuid().nullable(),
  mode: z.enum(["live_system_state", "visual_infographic", "audio_overview", "video_explainer"]),
  title: z.string().min(1).max(140),
  payload: z.discriminatedUnion("rendererType", [
    LiveSystemSnapshotPayloadSchema,
    VisualInfographicSnapshotPayloadSchema,
    AudioOverviewSnapshotPayloadSchema,
    VideoExplainerSnapshotPayloadSchema,
  ]),
}).superRefine((input, ctx) => {
  if (input.mode !== input.payload.rendererType) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "mode must match payload rendererType",
      path: ["mode"],
    });
  }
});

export const SaveSnapshotResponseSchema = CanvasSnapshotSchema;

export type SaveSnapshotRequest = z.infer<typeof SaveSnapshotRequestSchema>;
export type SaveSnapshotResponse = z.infer<typeof SaveSnapshotResponseSchema>;

export const RendererGenerationModeSchema = z.enum(["audio_overview", "video_explainer"]);
export type RendererGenerationMode = z.infer<typeof RendererGenerationModeSchema>;

export const AudioOverviewGeneratedSchema = z.object({
  summary: z.string(),
  overviewScript: z.string(),
  interpretationNotes: z.array(z.string()).default([]),
  timingSupport: z.array(z.string()).default([]),
});

export type AudioOverviewGenerated = z.infer<typeof AudioOverviewGeneratedSchema>;

export const VideoStoryboardBeatSchema = z.object({
  id: z.enum(["context", "friction", "pivot", "repair"]),
  title: z.string(),
  transition: z.string(),
  orbCue: z.string(),
  narration: z.string(),
});

export const VideoExplainerGeneratedSchema = z.object({
  opener: z.string(),
  beats: z.array(VideoStoryboardBeatSchema).min(1),
  closer: z.string(),
});

export type VideoExplainerGenerated = z.infer<typeof VideoExplainerGeneratedSchema>;

export const GenerateRendererRequestSchema = z.discriminatedUnion("mode", [
  z.object({
    conversationId: z.string().uuid(),
    analysisId: z.string().uuid(),
    mode: z.literal("audio_overview"),
    viewState: AudioOverviewViewStateSchema,
  }),
  z.object({
    conversationId: z.string().uuid(),
    analysisId: z.string().uuid(),
    mode: z.literal("video_explainer"),
    viewState: VideoExplainerViewStateSchema,
  }),
]);

export type GenerateRendererRequest = z.infer<typeof GenerateRendererRequestSchema>;

export const GenerateRendererResponseSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("audio_overview"),
    analysisId: z.string().uuid(),
    generatedAt: z.string(),
    content: AudioOverviewGeneratedSchema,
  }),
  z.object({
    mode: z.literal("video_explainer"),
    analysisId: z.string().uuid(),
    generatedAt: z.string(),
    content: VideoExplainerGeneratedSchema,
  }),
]);

export type GenerateRendererResponse = z.infer<typeof GenerateRendererResponseSchema>;
