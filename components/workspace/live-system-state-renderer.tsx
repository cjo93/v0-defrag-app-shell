'use client'

import { useRef } from 'react'
import type { SharedSessionAnalysis } from '@/lib/workspace/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export type LiveSystemViewState = {
  zoom: number
  panX: number
  panY: number
  highlightedNodeId: string | null
}

export function LiveSystemStateRenderer({
  sharedState,
  draft,
  onDraftChange,
  viewState,
  onViewStateChange,
}: {
  sharedState: SharedSessionAnalysis
  draft: { notes: string; title: string }
  onDraftChange: (patch: Partial<{ notes: string; title: string }>) => void
  viewState: LiveSystemViewState
  onViewStateChange: (patch: Partial<LiveSystemViewState>) => void
}) {
  const selectedName = sharedState.selectedPeopleScope.name ?? 'Other Person'
  const selectedRole = sharedState.selectedPeopleScope.role ?? 'Relationship'

  const triangulationActive =
    sharedState.likelyLargerPattern.toLowerCase().includes('triang') ||
    sharedState.likelyLargerPattern.toLowerCase().includes('third')

  const escalation =
    sharedState.timingPressure.level === 'high' || sharedState.likelyDistortions.length > 0
  const withdrawal = sharedState.likelyDefenses.some((item) =>
    /withdraw|shut|silent|distance/i.test(item)
  )
  const openness = sharedState.repairLevers.length > 0
  const repairPotential = sharedState.confidence.overall >= 0.5

  const nodes = [
    { id: 'self', label: 'You', sub: 'Primary perspective', x: 180, y: 220, color: 'from-primary/40 to-primary/10' },
    {
      id: 'other',
      label: selectedName,
      sub: selectedRole,
      x: 520,
      y: 220,
      color: 'from-sky-500/30 to-sky-500/10',
    },
    {
      id: 'pattern',
      label: 'Pattern Field',
      sub: sharedState.eventType,
      x: 350,
      y: 90,
      color: 'from-amber-500/30 to-amber-500/10',
    },
    ...(triangulationActive
      ? [
          {
            id: 'third',
            label: 'Third Pressure Node',
            sub: 'Triangulation risk',
            x: 350,
            y: 360,
            color: 'from-rose-500/30 to-rose-500/10',
          },
        ]
      : []),
  ]

  const lines = [
    {
      id: 'self-other',
      from: 'self',
      to: 'other',
      label: withdrawal ? 'distance' : repairPotential ? 'repair-ready' : 'tension',
      style: withdrawal
        ? 'stroke-rose-400/80'
        : repairPotential
        ? 'stroke-emerald-400/80'
        : 'stroke-amber-400/80',
      pulse: escalation || withdrawal,
      dashed: withdrawal,
    },
    {
      id: 'self-pattern',
      from: 'self',
      to: 'pattern',
      label: 'filter path',
      style: 'stroke-primary/70',
      pulse: escalation,
      dashed: false,
    },
    {
      id: 'other-pattern',
      from: 'other',
      to: 'pattern',
      label: 'interpretation path',
      style: 'stroke-sky-400/70',
      pulse: escalation,
      dashed: false,
    },
    ...(triangulationActive
      ? [
          {
            id: 'triangulation',
            from: 'pattern',
            to: 'third',
            label: 'triangulation',
            style: 'stroke-rose-400/80',
            pulse: true,
            dashed: true,
          },
        ]
      : []),
  ]

  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]))

  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide">Live System State</p>
          <p className="text-sm text-muted-foreground">Shared analysis state mapped into a soft relational field.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onViewStateChange({ zoom: Math.min(viewState.zoom + 0.1, 2) })}>
            Zoom +
          </Button>
          <Button size="sm" variant="outline" onClick={() => onViewStateChange({ zoom: Math.max(viewState.zoom - 0.1, 0.6) })}>
            Zoom -
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewStateChange({ zoom: 1, panX: 0, panY: 0, highlightedNodeId: null })}
          >
            Reset View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        <MapSurface
          nodes={nodes}
          lines={lines}
          nodeById={nodeById}
          viewState={viewState}
          onViewStateChange={onViewStateChange}
          escalation={escalation}
          withdrawal={withdrawal}
          openness={openness}
          repairPotential={repairPotential}
        />

        <div className="space-y-3">
          <div className="rounded border border-border/40 bg-card/60 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Live Signals</p>
            <Signal label="Escalation" active={escalation} tone="amber" />
            <Signal label="Withdrawal" active={withdrawal} tone="rose" />
            <Signal label="Openness" active={openness} tone="sky" />
            <Signal label="Repair Potential" active={repairPotential} tone="emerald" />
          </div>

          <div className="rounded border border-border/40 bg-card/60 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Map Draft (Unsaved)</p>
            <Input value={draft.title} onChange={(e) => onDraftChange({ title: e.target.value })} />
            <Textarea
              value={draft.notes}
              onChange={(e) => onDraftChange({ notes: e.target.value })}
              rows={5}
              placeholder="Temporary notes preserved while switching modes"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function MapSurface({
  nodes,
  lines,
  nodeById,
  viewState,
  onViewStateChange,
  escalation,
  withdrawal,
  openness,
  repairPotential,
}: {
  nodes: Array<{ id: string; label: string; sub: string; x: number; y: number; color: string }>
  lines: Array<{ id: string; from: string; to: string; label: string; style: string; pulse: boolean; dashed: boolean }>
  nodeById: Record<string, { id: string; label: string; sub: string; x: number; y: number; color: string }>
  viewState: LiveSystemViewState
  onViewStateChange: (patch: Partial<LiveSystemViewState>) => void
  escalation: boolean
  withdrawal: boolean
  openness: boolean
  repairPotential: boolean
}) {
  const dragRef = useRef<{
    startX: number
    startY: number
    basePanX: number
    basePanY: number
  } | null>(null)

  return (
    <div
      className="rounded-xl border border-border/40 bg-gradient-to-br from-background via-background to-card/40 p-3 overflow-hidden"
      onWheel={(event) => {
        event.preventDefault()
        const next = event.deltaY < 0 ? viewState.zoom + 0.06 : viewState.zoom - 0.06
        onViewStateChange({ zoom: Math.min(2, Math.max(0.6, next)) })
      }}
      onMouseDown={(event) => {
        dragRef.current = {
          startX: event.clientX,
          startY: event.clientY,
          basePanX: viewState.panX,
          basePanY: viewState.panY,
        }
        const onMove = (moveEvent: MouseEvent) => {
          if (!dragRef.current) return
          const deltaX = moveEvent.clientX - dragRef.current.startX
          const deltaY = moveEvent.clientY - dragRef.current.startY
          onViewStateChange({
            panX: dragRef.current.basePanX + deltaX,
            panY: dragRef.current.basePanY + deltaY,
          })
        }
        const onUp = () => {
          dragRef.current = null
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseup', onUp)
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
      }}
    >
      <div className="text-[11px] text-muted-foreground mb-2 flex items-center gap-3">
        <span>Pan: drag</span>
        <span>Zoom: scroll</span>
        <span className={`${escalation ? 'text-amber-500' : ''}`}>Escalation {escalation ? 'active' : 'low'}</span>
        <span className={`${withdrawal ? 'text-rose-500' : ''}`}>Withdrawal {withdrawal ? 'active' : 'low'}</span>
        <span className={`${openness ? 'text-sky-500' : ''}`}>Openness {openness ? 'active' : 'low'}</span>
        <span className={`${repairPotential ? 'text-emerald-500' : ''}`}>Repair {repairPotential ? 'possible' : 'uncertain'}</span>
      </div>

      <div className="relative h-[460px] rounded-lg border border-border/30 bg-background/80 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${viewState.panX}px, ${viewState.panY}px) scale(${viewState.zoom})`,
            transformOrigin: 'center center',
          }}
        >
          <svg className="absolute inset-0 w-full h-full">
            {lines.map((line) => {
              const from = nodeById[line.from]
              const to = nodeById[line.to]
              if (!from || !to) return null
              return (
                <g key={line.id}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={`${line.style} ${line.pulse ? 'animate-pulse' : ''}`}
                    strokeWidth={line.label === 'triangulation' ? 3 : 2.5}
                    strokeDasharray={line.dashed ? '8 8' : undefined}
                  />
                  <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 8} className="fill-muted-foreground text-[11px]">
                    {line.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {nodes.map((node) => {
            const highlighted = viewState.highlightedNodeId === node.id
            return (
              <button
                key={node.id}
                type="button"
                onClick={() =>
                  onViewStateChange({ highlightedNodeId: highlighted ? null : node.id })
                }
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border text-center transition-all ${
                  highlighted
                    ? 'w-36 h-36 border-primary/60 shadow-[0_0_40px_rgba(99,102,241,0.35)]'
                    : 'w-28 h-28 border-border/50'
                } bg-gradient-to-br ${node.color}`}
                style={{ left: node.x, top: node.y }}
              >
                <span className="block text-xs font-semibold">{node.label}</span>
                <span className="block text-[11px] text-muted-foreground mt-1">{node.sub}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Signal({
  label,
  active,
  tone,
}: {
  label: string
  active: boolean
  tone: 'amber' | 'rose' | 'sky' | 'emerald'
}) {
  const toneClass =
    tone === 'amber'
      ? 'bg-amber-500/70'
      : tone === 'rose'
      ? 'bg-rose-500/70'
      : tone === 'sky'
      ? 'bg-sky-500/70'
      : 'bg-emerald-500/70'

  return (
    <div className="flex items-center justify-between text-xs">
      <span>{label}</span>
      <span className="inline-flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${toneClass} ${active ? 'animate-pulse' : 'opacity-40'}`} />
        <span className="text-muted-foreground">{active ? 'On' : 'Off'}</span>
      </span>
    </div>
  )
}
