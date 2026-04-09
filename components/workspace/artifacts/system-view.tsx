'use client'

import { useState } from 'react'

interface SystemLayer {
  id: string
  label: string
  intensity: number // 0-100
  description: string
  active: boolean
}

export function SystemView() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)

  const layers: SystemLayer[] = [
    {
      id: 'attachment',
      label: 'Attachment pattern',
      intensity: 75,
      description: 'Tests reliability before trusting',
      active: true
    },
    {
      id: 'family',
      label: 'Family context',
      intensity: 60,
      description: 'Learned criticism feels like rejection',
      active: true
    },
    {
      id: 'timing',
      label: 'Current pressure',
      intensity: 85,
      description: 'Already at capacity, low threshold',
      active: true
    },
    {
      id: 'nervous',
      label: 'Nervous system',
      intensity: 40,
      description: 'Needs safety before problem-solving',
      active: false
    },
  ]

  return (
    <div className="w-full h-full min-h-[400px] relative bg-gradient-to-br from-background via-background/95 to-secondary/3 rounded-xl border border-border/30 overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-border/20 bg-background/60 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/15 border border-secondary/30">
              <span className="w-1 h-1 rounded-full bg-secondary/80 animate-pulse"></span>
              <span className="text-[9px] font-bold text-secondary/90 tracking-wider uppercase">System View</span>
            </span>
            <span className="text-xs text-muted-foreground/70 font-light">Relational layers</span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-light">4 patterns detected</span>
        </div>
      </div>

      {/* Layered Signal Visualization */}
      <div className="absolute inset-0 top-16 p-6 space-y-6 overflow-y-auto">
        {layers.map((layer, idx) => (
          <div
            key={layer.id}
            className="relative cursor-pointer group/layer"
            onMouseEnter={() => setSelectedLayer(layer.id)}
            onMouseLeave={() => setSelectedLayer(null)}
          >
            {/* Layer bar container */}
            <div className="space-y-2">
              {/* Layer label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    layer.active ? 'bg-secondary/80 animate-pulse' : 'bg-muted/40'
                  }`}></span>
                  <span className="text-xs font-bold text-foreground tracking-tight">
                    {layer.label}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground/60 font-semibold">
                  {layer.intensity}%
                </span>
              </div>

              {/* Visual intensity bar */}
              <div className="relative h-8 rounded-lg bg-background/40 border border-border/30 overflow-hidden">
                {/* Intensity fill */}
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${
                    layer.active
                      ? 'bg-gradient-to-r from-secondary/40 via-secondary/25 to-secondary/15'
                      : 'bg-gradient-to-r from-muted/30 to-muted/10'
                  }`}
                  style={{ width: `${layer.intensity}%` }}
                >
                  {/* Animated pulse overlay */}
                  {layer.active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-pulse"></div>
                  )}
                </div>

                {/* Description text on bar */}
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-[11px] text-foreground/80 font-light">
                    {layer.description}
                  </span>
                </div>
              </div>

              {/* Expanded detail on hover */}
              {selectedLayer === layer.id && (
                <div className="pl-4 border-l-2 border-secondary/20 animate-in fade-in-50 duration-200">
                  <p className="text-[10px] text-muted-foreground/70 font-light leading-relaxed">
                    This pattern is {layer.active ? 'actively influencing' : 'present in background'} the current dynamic
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom summary */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 via-background/60 to-transparent backdrop-blur-sm border-t border-border/20">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground/70 font-light">
            3 active • 1 background
          </span>
          <span className="text-muted-foreground/60 font-light">
            Hover for details
          </span>
        </div>
      </div>
    </div>
  )
}
