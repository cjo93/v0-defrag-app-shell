'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'

export function CanvasPanel() {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>('map')

  const artifacts = [
    {
      id: 'map',
      title: 'Relational Map',
      subtitle: 'Connection patterns',
      description: 'How they may be reading this moment. Where understanding breaks. What they might need from you.',
      icon: IconRelationalMap,
      status: 'generating',
      color: 'from-primary/15 border-primary/30',
      details: 'Shows emotional pathways, assumptions, and potential connection points.'
    },
    {
      id: 'system',
      title: 'System View',
      subtitle: 'Family patterns',
      description: 'Their relational history. Repeating patterns. How their background shapes this reaction.',
      icon: IconSystemView,
      status: 'ready',
      color: 'from-secondary/15 border-secondary/30',
      details: 'Includes family dynamics, learned responses, and inherited relational patterns.'
    },
    {
      id: 'sim',
      title: 'Simulations',
      subtitle: 'Alternative paths',
      description: 'What if you led differently? How would they likely respond? What might help more.',
      icon: IconSimulations,
      status: 'ready',
      color: 'from-amber-500/10 border-amber-500/20',
      details: '3 alternative conversation paths with predicted outcomes.'
    },
    {
      id: 'timing',
      title: 'Timing View',
      subtitle: 'Pressure points',
      description: 'External stress. Their emotional readiness. What this moment may mean to them.',
      icon: IconTiming,
      status: 'queued',
      color: 'from-blue-500/10 border-blue-500/20',
      details: 'Current pressures, sensitivities, and contextual factors shaping their reaction.'
    },
  ]

  return (
    <div className="flex-1 min-w-0 bg-background flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/40 bg-background px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex-shrink-0 p-1.5 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Back to Dashboard">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground tracking-widest">Workspace</span>
              <span className="text-xs text-muted-foreground/60 font-light">Live analysis</span>
            </div>
          </div>

          {/* Right: Status + Settings */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground/70 bg-muted/8 border border-border/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
              <span className="font-medium text-xs">Live</span>
            </div>
            <Link href="/settings" className="flex-shrink-0 p-1.5 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Settings">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-3xl space-y-6">
          {/* Intro */}
          <div className="space-y-2 mb-8">
            <h2 className="text-sm font-semibold text-foreground">Relational Analysis</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explore how this moment may be unfolding for them, what patterns may be active, and what could help next.
            </p>
          </div>

          {/* Artifact Cards - Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artifacts.map((artifact) => {
              const Icon = artifact.icon
              const isSelected = selectedArtifact === artifact.id
              
              return (
                <button
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact.id)}
                  className={`text-left rounded-lg border transition-all duration-200 p-4 group ${
                    isSelected
                      ? `bg-gradient-to-br ${artifact.color} to-transparent border-opacity-100 ring-1`
                      : 'bg-card/40 border-border/50 hover:border-border/80 hover:bg-card/60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-9 h-9 rounded flex items-center justify-center ${
                        isSelected ? 'bg-primary/20 border border-primary/30' : 'bg-muted/20 border border-border/40'
                      }`}>
                        <Icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-foreground">{artifact.title}</h3>
                        <p className="text-xs text-muted-foreground/70 font-light">{artifact.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">{artifact.description}</p>

                    {/* Status */}
                    <div className="flex items-center gap-1.5">
                      {artifact.status === 'generating' && (
                        <>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse"></span>
                          <span className="text-xs text-primary/70 font-medium">Generating…</span>
                        </>
                      )}
                      {artifact.status === 'ready' && (
                        <>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
                          <span className="text-xs text-emerald-600/70 font-medium">Ready</span>
                        </>
                      )}
                      {artifact.status === 'queued' && (
                        <>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/70"></span>
                          <span className="text-xs text-amber-600/70 font-medium">Queued</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Artifact Detail */}
          {selectedArtifact && (
            <div className="mt-8 p-6 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">About this analysis</h3>
                  <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">
                    {artifacts.find(a => a.id === selectedArtifact)?.details}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs h-8 bg-primary hover:bg-primary/90">
                    Open Full View
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    Export
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Follow-up Prompt */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-3">Next steps:</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="ghost" className="text-xs h-7 px-2 border border-border/40 hover:border-primary/30 hover:bg-primary/10">
                Practice this conversation
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-7 px-2 border border-border/40 hover:border-primary/30 hover:bg-primary/10">
                Show me another angle
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-7 px-2 border border-border/40 hover:border-primary/30 hover:bg-primary/10">
                Create a brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
