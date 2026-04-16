'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {
  SharedSessionAnalysis,
  VideoExplainerGenerated,
  VideoExplainerViewStateSnapshot,
} from '@/lib/workspace/contracts'

type BeatId = 'context' | 'friction' | 'pivot' | 'repair'

export function VideoExplainerRenderer({
  sharedState,
  draft,
  onDraftChange,
  viewState,
  onViewStateChange,
  generatedContent,
  isGenerating,
  onGenerate,
  generationError,
}: {
  sharedState: SharedSessionAnalysis
  draft: { notes: string; title: string }
  onDraftChange: (patch: Partial<{ notes: string; title: string }>) => void
  viewState: VideoExplainerViewStateSnapshot
  onViewStateChange: (patch: Partial<VideoExplainerViewStateSnapshot>) => void
  generatedContent: VideoExplainerGenerated | null
  isGenerating: boolean
  onGenerate: () => void
  generationError: string | null
}) {
  const fallbackBeats: Record<BeatId, { title: string; orbCue: string; narration: string; transition: string }> = {
    context: {
      title: 'Scene 1: Context',
      orbCue: `Orb settles around ${sharedState.eventType.toLowerCase()} tension.`,
      narration: sharedState.summary,
      transition: 'Fade into Scene 2 with a light pressure pulse.',
    },
    friction: {
      title: 'Scene 2: Friction',
      orbCue: `Orbs diverge on ${sharedState.likelyDistortions[0] ?? 'interpretation mismatch'}.`,
      narration: `What seems to be happening: ${sharedState.likelyLargerPattern}.`,
      transition: 'Flow line narrows before the pivot beat.',
    },
    pivot: {
      title: 'Scene 3: Pivot',
      orbCue: `Cue repair vector toward ${sharedState.repairLevers[0] ?? 'a calmer next move'}.`,
      narration: `Likely next move: ${sharedState.likelyOutcome}. Better option: ${sharedState.exactLanguage.opening}`,
      transition: 'Soft cut into repair framing.',
    },
    repair: {
      title: 'Scene 4: Repair',
      orbCue: 'Orbs stabilize with lower pulse and wider spacing.',
      narration: `Suggested line: ${sharedState.exactLanguage.followUp}`,
      transition: 'Hold on stable state and end on concise support note.',
    },
  }

  const generatedBeats = generatedContent
    ? generatedContent.beats.reduce(
        (acc, beat) => {
          acc[beat.id] = beat
          return acc
        },
        {} as Record<BeatId, { title: string; orbCue: string; narration: string; transition: string }>
      )
    : null

  const beats = generatedBeats ?? fallbackBeats
  const selectedBeat = beats[viewState.selectedBeat]

  return (
    <div className="max-w-6xl space-y-4">
      <div className="rounded-xl border border-border/40 bg-gradient-to-br from-background via-card/20 to-primary/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Video Explainer</p>
            <h3 className="text-lg font-semibold leading-tight mt-1">{draft.title || 'Storyboard Motion Shell'}</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
              Storyboard and narration generated from shared session state. Final media rendering is separate.
            </p>
            {generationError && <p className="text-xs text-destructive mt-2">{generationError}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={onGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : generatedContent ? 'Regenerate Storyboard' : 'Generate Storyboard'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'calm' })}>
              Calm
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'balanced' })}>
              Balanced
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'dynamic' })}>
              Dynamic
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
          {(Object.keys(beats) as BeatId[]).map((id, index) => {
            const beat = beats[id]
            const active = id === viewState.selectedBeat
            return (
              <button
                key={id}
                type="button"
                onClick={() => onViewStateChange({ selectedBeat: id })}
                className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                  active
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border/40 bg-background/70 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">
                    {index + 1}. {beat.title}
                  </p>
                  <span className="text-[11px] text-muted-foreground">
                    {viewState.transitionStyle === 'flow' ? 'Flow' : viewState.transitionStyle === 'fade' ? 'Fade' : 'Cut'}
                  </span>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">{beat.transition}</p>
                <p className="text-sm mt-2 leading-relaxed">{beat.narration}</p>
                {viewState.showOrbCues && (
                  <p className="text-xs mt-2 rounded border border-border/40 bg-card/40 px-2 py-1">{beat.orbCue}</p>
                )}
              </button>
            )
          })}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Motion Controls</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ transitionStyle: 'fade' })}>
                Fade
              </Button>
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ transitionStyle: 'flow' })}>
                Flow
              </Button>
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ transitionStyle: 'cut' })}>
                Cut
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasis: 'soft' })}>
                Soft
              </Button>
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasis: 'standard' })}>
                Standard
              </Button>
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasis: 'strong' })}>
                Strong
              </Button>
            </div>
            <Button
              size="sm"
              variant={viewState.showOrbCues ? 'default' : 'outline'}
              onClick={() => onViewStateChange({ showOrbCues: !viewState.showOrbCues })}
            >
              {viewState.showOrbCues ? 'Orb Cues On' : 'Orb Cues Off'}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Pace: {viewState.pace} | Emphasis: {viewState.emphasis}
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Focused Narration Block</p>
            <p className="text-sm font-medium">{selectedBeat.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{selectedBeat.narration}</p>
            {generatedContent?.opener && (
              <p className="text-[11px] text-muted-foreground">Opener: {generatedContent.opener}</p>
            )}
            {generatedContent?.closer && (
              <p className="text-[11px] text-muted-foreground">Closer: {generatedContent.closer}</p>
            )}
          </div>

          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Video Draft (Unsaved)</p>
            <Input
              value={draft.title}
              onChange={(event) => onDraftChange({ title: event.target.value })}
              placeholder="Video explainer title"
            />
            <Textarea
              value={draft.notes}
              onChange={(event) => onDraftChange({ notes: event.target.value })}
              rows={6}
              placeholder="Temporary storyboard notes preserved while switching modes"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
