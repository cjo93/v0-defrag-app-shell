'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {
  AudioOverviewGenerated,
  AudioOverviewViewStateSnapshot,
  SharedSessionAnalysis,
} from '@/lib/workspace/contracts'

type SegmentId = 'summary' | 'overview_script' | 'interpretation_notes' | 'timing_support'

export function AudioOverviewRenderer({
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
  viewState: AudioOverviewViewStateSnapshot
  onViewStateChange: (patch: Partial<AudioOverviewViewStateSnapshot>) => void
  generatedContent: AudioOverviewGenerated | null
  isGenerating: boolean
  onGenerate: () => void
  generationError: string | null
}) {
  const role = sharedState.selectedPeopleScope.role ?? 'relationship context'

  const segments: Record<SegmentId, { label: string; title: string; text: string }> = {
    summary: {
      label: 'A',
      title: 'Summary',
      text: generatedContent?.summary ?? sharedState.summary,
    },
    overview_script: {
      label: 'B',
      title: 'Overview Script',
      text:
        generatedContent?.overviewScript ??
        `${sharedState.exactLanguage.opening} ${sharedState.exactLanguage.followUp}`.trim(),
    },
    interpretation_notes: {
      label: 'C',
      title: 'Interpretation Notes',
      text:
        generatedContent?.interpretationNotes.join(' ') ||
        `This pattern likely moves through ${role.toLowerCase()} pressure: ${sharedState.likelyLargerPattern}.`,
    },
    timing_support: {
      label: 'D',
      title: 'Timing & Support Framing',
      text:
        generatedContent?.timingSupport.join(' ') ||
        `Timing pressure is ${sharedState.timingPressure.level}. ${
          sharedState.timingPressure.factors[0] ?? 'Lead with one calm sentence before adding detail.'
        }`,
    },
  }

  const selected = segments[viewState.selectedSegment]
  const supportLine =
    sharedState.supportNotes[0]?.detail ??
    sharedState.rationaleBlocks[0]?.detail ??
    'No additional support note available yet.'

  return (
    <div className="max-w-5xl space-y-4">
      <div className="rounded-xl border border-border/40 bg-gradient-to-br from-background via-card/10 to-sky-500/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Audio Overview</p>
            <h3 className="text-lg font-semibold leading-tight mt-1">{draft.title || 'Calm Spoken Overview'}</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
              Generated from shared session state. Playback remains optional and separate from this renderer.
            </p>
            {generationError && <p className="text-xs text-destructive mt-2">{generationError}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={onGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : generatedContent ? 'Regenerate Script' : 'Generate Script'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'brief' })}>
              Brief
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'steady' })}>
              Steady
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ pace: 'reflective' })}>
              Reflective
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
          {Object.entries(segments).map(([key, segment]) => {
            const segmentId = key as SegmentId
            const isActive = segmentId === viewState.selectedSegment
            return (
              <button
                key={segmentId}
                type="button"
                onClick={() => onViewStateChange({ selectedSegment: segmentId })}
                className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                  isActive
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border/40 bg-background/70 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full border border-border/50 text-[11px] font-semibold grid place-items-center">
                    {segment.label}
                  </span>
                  <p className="text-sm font-semibold">{segment.title}</p>
                </div>
                <p className="text-sm mt-2 leading-relaxed">{segment.text}</p>
              </button>
            )
          })}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Selected Segment</p>
            <p className="text-sm font-medium">{selected.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{selected.text}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewState.includeSupportNotes ? 'default' : 'outline'}
                onClick={() => onViewStateChange({ includeSupportNotes: !viewState.includeSupportNotes })}
              >
                {viewState.includeSupportNotes ? 'Support Notes On' : 'Support Notes Off'}
              </Button>
            </div>
            {viewState.includeSupportNotes && (
              <p className="text-xs text-muted-foreground leading-relaxed rounded border border-border/40 bg-card/40 p-2">
                {supportLine}
              </p>
            )}
            <p className="text-[11px] text-muted-foreground">Current pace: {viewState.pace}</p>
          </div>

          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Audio Draft (Unsaved)</p>
            <Input
              value={draft.title}
              onChange={(event) => onDraftChange({ title: event.target.value })}
              placeholder="Audio overview title"
            />
            <Textarea
              value={draft.notes}
              onChange={(event) => onDraftChange({ notes: event.target.value })}
              rows={7}
              placeholder="Temporary audio notes preserved while switching modes"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
