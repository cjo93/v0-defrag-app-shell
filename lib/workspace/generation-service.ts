import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSharedAIAdapter } from "@/lib/defrag/adapter";
import {
  GenerateRendererResponseSchema,
  GenerateRendererRequestSchema,
  SharedSessionAnalysisSchema,
  type AudioOverviewGenerated,
  type GenerateRendererRequest,
  type GenerateRendererResponse,
  type SharedSessionAnalysis,
  type VideoExplainerGenerated,
} from "@/lib/workspace/contracts";

export async function runRendererGenerationFlow(params: {
  userId: string;
  input: GenerateRendererRequest;
}): Promise<GenerateRendererResponse> {
  const { userId, input } = params;
  const validatedInput = GenerateRendererRequestSchema.parse(input);

  const { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id")
    .eq("id", validatedInput.conversationId)
    .maybeSingle();

  if (!conversation || conversation.user_id !== userId) {
    throw new Error("Conversation not found");
  }

  const { data: analysis } = await supabaseAdmin
    .from("analyses")
    .select("id, conversation_id, shared_session_state")
    .eq("id", validatedInput.analysisId)
    .maybeSingle();

  if (!analysis || analysis.conversation_id !== validatedInput.conversationId) {
    throw new Error("Analysis not found");
  }

  const parsedShared = SharedSessionAnalysisSchema.safeParse(
    analysis.shared_session_state
  );
  if (!parsedShared.success) {
    throw new Error("Shared session state invalid");
  }

  const adapter = getSharedAIAdapter();
  const generatedAt = new Date().toISOString();

  if (validatedInput.mode === "audio_overview") {
    let content: AudioOverviewGenerated;
    try {
      const generated = await adapter.generateRenderer({
        mode: "audio_overview",
        sharedSessionState: parsedShared.data,
        viewState: validatedInput.viewState,
      });
      content = generated as AudioOverviewGenerated;
    } catch {
      content = buildAudioFallback(parsedShared.data);
    }

    return GenerateRendererResponseSchema.parse({
      mode: "audio_overview",
      analysisId: analysis.id,
      generatedAt,
      content,
    });
  }

  let content: VideoExplainerGenerated;
  try {
    const generated = await adapter.generateRenderer({
      mode: "video_explainer",
      sharedSessionState: parsedShared.data,
      viewState: validatedInput.viewState,
    });
    content = generated as VideoExplainerGenerated;
  } catch {
    content = buildVideoFallback(parsedShared.data);
  }

  return GenerateRendererResponseSchema.parse({
    mode: "video_explainer",
    analysisId: analysis.id,
    generatedAt,
    content,
  });
}

function buildAudioFallback(shared: SharedSessionAnalysis): AudioOverviewGenerated {
  return {
    summary: shared.summary,
    overviewScript: `${shared.exactLanguage.opening} ${shared.exactLanguage.followUp}`.trim(),
    interpretationNotes: [
      `Likely pattern: ${shared.likelyLargerPattern}.`,
      `Likely next move if nothing changes: ${shared.likelyOutcome}.`,
    ],
    timingSupport: [
      `Timing pressure is ${shared.timingPressure.level}.`,
      shared.timingPressure.factors[0] ?? "Lead with one calm sentence before more detail.",
    ],
  };
}

function buildVideoFallback(shared: SharedSessionAnalysis): VideoExplainerGenerated {
  return {
    opener: shared.summary,
    beats: [
      {
        id: "context",
        title: "Scene 1: Context",
        transition: "Fade into pressure signal.",
        orbCue: `Orb settles around ${shared.eventType.toLowerCase()}.`,
        narration: shared.summary,
      },
      {
        id: "friction",
        title: "Scene 2: Friction",
        transition: "Flow line narrows into pivot.",
        orbCue: `Orbs diverge on ${shared.likelyDistortions[0] ?? "meaning mismatch"}.`,
        narration: `What seems off: ${shared.likelyLargerPattern}.`,
      },
      {
        id: "pivot",
        title: "Scene 3: Pivot",
        transition: "Soft cut toward repair vector.",
        orbCue: `Repair cue points toward ${shared.repairLevers[0] ?? "a clearer next step"}.`,
        narration: `Likely next move: ${shared.likelyOutcome}. Better option: ${shared.exactLanguage.opening}`,
      },
      {
        id: "repair",
        title: "Scene 4: Repair",
        transition: "Hold on stable frame and close.",
        orbCue: "Orbs stabilize and pulse slows.",
        narration: `Try this line: ${shared.exactLanguage.followUp}`,
      },
    ],
    closer:
      shared.supportNotes[0]?.detail ??
      "Close with one grounded sentence and one clear question.",
  };
}
