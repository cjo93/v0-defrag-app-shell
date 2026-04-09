'use client'

import { useState } from 'react'
import { RelationalMap } from './artifacts/relational-map'
import { SystemView } from './artifacts/system-view'
import { TimingView } from './artifacts/timing-view'

type ArtifactType = 'map' | 'system' | 'timing' | 'simulation'

interface Artifact {
  id: ArtifactType
  label: string
  status: 'active' | 'ready' | 'empty'
  description: string
}

export function CanvasField() {
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactType>('map')

  const artifacts: Artifact[] = [
    { id: 'map', label: 'Map', status: 'active', description: 'Relational structure' },
    { id: 'system', label: 'System', status: 'ready', description: 'Layered patterns' },
    { id: 'timing', label: 'Timing', status: 'ready', description: 'Pressure context' },
    { id: 'simulation', label: 'Sim', status: 'empty', description: 'Practice space' },
  ]

  const renderArtifact = () => {
    switch (selectedArtifact) {
      case 'map':
        return <RelationalMap />
      case 'system':
        return <SystemView />
      case 'timing':
        return <TimingView />
      case 'simulation':
        return (
          <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 rounded-xl border border-border/20">
            <div className="text-center space-y-3 px-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/20 border border-border/30">
                <svg className="w-6 h-6 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground/70">Simulation inactive</p>
                <p className="text-xs text-muted-foreground/60 font-light max-w-xs">
                  This becomes available after trying an alternative approach
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background via-background/98 to-background/95 relative">
      {/* Slow drifting ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl animate-drift-slow"></div>
        <div className="absolute bottom-[25%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/6 to-transparent blur-3xl animate-drift-slower"></div>
      </div>

      {/* Artifact Grid - System Navigation */}
      <div className="flex-shrink-0 p-4 border-b border-border/20 bg-background/40 backdrop-blur-sm relative z-10">
        <div className="grid grid-cols-4 gap-3">
          {artifacts.map((artifact) => (
            <button
              key={artifact.id}
              onClick={() => setSelectedArtifact(artifact.id)}
              className={`p-3 rounded-lg border transition-all duration-200 group ${
                selectedArtifact === artifact.id
                  ? 'bg-gradient-to-br from-primary/15 to-primary/8 border-primary/40 shadow-lg shadow-primary/5'
                  : 'bg-background/60 border-border/30 hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold transition-colors ${
                  selectedArtifact === artifact.id ? 'text-primary' : 'text-foreground/70 group-hover:text-foreground/90'
                }`}>
                  {artifact.label}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                  artifact.status === 'active'
                    ? 'bg-primary/80 animate-pulse'
                    : artifact.status === 'ready'
                    ? 'bg-emerald-500/70'
                    : 'bg-muted/30'
                }`}></span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-light text-left">
                {artifact.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Artifact Display */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        {renderArtifact()}
      </div>

      {/* System Status Bar */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-border/20 bg-background/60 backdrop-blur-sm flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <span className="w-1 h-1 rounded-full bg-emerald-500/90 animate-pulse"></span>
            <span className="text-[9px] font-bold text-emerald-500/90 tracking-wider uppercase">Field Active</span>
          </span>
          <span className="text-[10px] text-muted-foreground/60 font-light">
            {artifacts.filter(a => a.status === 'active' || a.status === 'ready').length} artifacts available
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground/50 font-light">
          updated just now
        </span>
      </div>

      <style jsx>{`
        @keyframes drift-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes drift-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -25px); }
        }
        
        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }
        
        .animate-drift-slower {
          animation: drift-slower 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
