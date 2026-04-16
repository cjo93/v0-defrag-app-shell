'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { SharedSessionAnalysis, VisualInfographicViewStateSnapshot } from '@/lib/workspace/contracts'

type PanelId =
  | 'what_seems_off'
  | 'how_it_lands'
  | 'pressure_source'
  | 'likely_next_move'
  | 'what_to_avoid'

const PANEL_ORDER: PanelId[] = [
  'what_seems_off',
  'how_it_lands',
  'pressure_source',
  'likely_next_move',
  'what_to_avoid',
]

export function VisualInfographicRenderer({
  sharedState,
  draft,
  onDraftChange,
  viewState,
  onViewStateChange,
}: {
  sharedState: SharedSessionAnalysis
  draft: { notes: string; title: string }
  onDraftChange: (patch: Partial<{ notes: string; title: string }>) => void
  viewState: VisualInfographicViewStateSnapshot
  onViewStateChange: (patch: Partial<VisualInfographicViewStateSnapshot>) => void
}) {
  const selectedName = sharedState.selectedPeopleScope.name ?? 'the other person'
  const selectedRole = sharedState.selectedPeopleScope.role ?? 'their role'

  const contentByPanel: Record<PanelId, { label: string; title: string; summary: string; detail: string }> = {
    what_seems_off: {
      label: '1',
      title: 'What Seems Off',
      summary: sharedState.likelyLargerPattern || 'Pattern not established yet.',
      detail:
        sharedState.likelyDistortions[0] ??
        'A mismatch in interpretation is likely driving friction.',
    },
    how_it_lands: {
      label: '2',
      title: 'How It May Land',
      summary:
        sharedState.likelyOtherFilters[0] ??
        `It may land as pressure on ${selectedName}.`,
      detail: `This likely lands through ${selectedRole.toLowerCase()} expectations before intent is heard.`,
    },
    pressure_source: {
      label: '3',
      title: 'Pressure Source',
      summary:
        sharedState.timingPressure.factors[0] ??
        `Timing pressure is ${sharedState.timingPressure.level}.`,
      detail: `Current pressure level is ${sharedState.timingPressure.level}, which raises reactivity risk.`,
    },
    likely_next_move: {
      label: '4',
      title: 'Likely Next Move',
      summary: sharedState.likelyOutcome || 'Outcome signal is still forming.',
      detail:
        sharedState.likelyDefenses[0] ??
        'Without intervention, the next move likely reinforces the same loop.',
    },
    what_to_avoid: {
      label: '5',
      title: 'What To Avoid',
      summary:
        sharedState.likelyDistortions[0] ??
        'Avoid escalating language that narrows options.',
      detail:
        sharedState.exactLanguage.followUp ||
        'Avoid overexplaining. Keep one grounded next sentence.',
    },
  }

  const toneClasses =
    viewState.emphasisLevel === 'urgent'
      ? 'from-rose-500/20 via-amber-500/10 to-background'
      : viewState.emphasisLevel === 'balanced'
      ? 'from-sky-500/15 via-primary/10 to-background'
      : 'from-emerald-500/15 via-slate-500/5 to-background'

  return (
    <div className="max-w-6xl space-y-4">
      <div className={`rounded-xl border border-border/40 bg-gradient-to-br ${toneClasses} p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Visual Infographic</p>
            <h3 className="text-lg font-semibold leading-tight mt-1">{draft.title || 'Relational Read At A Glance'}</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
              Structured from one shared session analysis object. Poster-style synthesis for quick orientation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasisLevel: 'calm' })}>
              Calm
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasisLevel: 'balanced' })}>
              Balanced
            </Button>
            <Button size="sm" variant="outline" onClick={() => onViewStateChange({ emphasisLevel: 'urgent' })}>
              Urgent
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.25fr_0.75fr] gap-4">
        <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
          {PANEL_ORDER.map((panelId) => {
            const panel = contentByPanel[panelId]
            const focused = viewState.focusPanel === panelId
            const expanded = viewState.expandedPanelIds.includes(panelId)

            return (
              <button
                key={panelId}
                type="button"
                onClick={() => onViewStateChange({ focusPanel: panelId })}
                className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                  focused
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border/40 bg-background/70 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full border border-border/50 text-[11px] font-semibold grid place-items-center">
                      {panel.label}
                    </span>
                    <p className="text-sm font-semibold">{panel.title}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{focused ? 'Focused' : 'Tap to focus'}</span>
                </div>
                <p className="text-sm mt-2">{panel.summary}</p>
                {(expanded || focused) && (
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{panel.detail}</p>
                )}
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {expanded ? 'Expanded in this session' : focused ? 'Focused in this session' : 'Tap to focus'}
                </p>
              </button>
            )
          })}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Infographic Draft (Unsaved)</p>
            <Input
              value={draft.title}
              onChange={(event) => onDraftChange({ title: event.target.value })}
              placeholder="Infographic title"
            />
            <Textarea
              value={draft.notes}
              onChange={(event) => onDraftChange({ notes: event.target.value })}
              rows={7}
              placeholder="Temporary infographic notes preserved while switching modes"
            />
          </div>

          <div className="rounded-xl border border-border/40 bg-background/80 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Focused Panel</p>
            <p className="text-sm font-medium">{contentByPanel[viewState.focusPanel].title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {contentByPanel[viewState.focusPanel].detail}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (viewState.expandedPanelIds.includes(viewState.focusPanel)) return
                  onViewStateChange({
                    expandedPanelIds: [...viewState.expandedPanelIds, viewState.focusPanel],
                  })
                }}
              >
                Expand Focused
              </Button>
              <Button size="sm" variant="outline" onClick={() => onViewStateChange({ expandedPanelIds: [] })}>
                Collapse All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
