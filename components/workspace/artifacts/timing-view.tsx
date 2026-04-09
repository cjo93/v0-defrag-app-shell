'use client'

import { useState } from 'react'

interface PressureMarker {
  id: string
  label: string
  position: number // 0-100
  intensity: 'high' | 'medium' | 'low'
  description: string
}

export function TimingView() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null)

  const markers: PressureMarker[] = [
    {
      id: 'morning',
      label: 'Morning',
      position: 20,
      intensity: 'low',
      description: 'Lower stress, more receptive'
    },
    {
      id: 'current',
      label: 'Now',
      position: 60,
      intensity: 'high',
      description: 'High pressure window, low threshold'
    },
    {
      id: 'evening',
      label: 'Evening',
      position: 85,
      intensity: 'medium',
      description: 'Fatigue may amplify reactions'
    },
  ]

  const currentPosition = 60 // Current time marker

  return (
    <div className="w-full h-full min-h-[320px] relative bg-gradient-to-br from-background via-background/95 to-amber-500/3 rounded-xl border border-border/30 overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-border/20 bg-background/60 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
              <span className="w-1 h-1 rounded-full bg-amber-500/80 animate-pulse"></span>
              <span className="text-[9px] font-bold text-amber-500/90 tracking-wider uppercase">Timing</span>
            </span>
            <span className="text-xs text-muted-foreground/70 font-light">Pressure context</span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-light">Today</span>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="absolute inset-0 top-16 p-8 flex flex-col justify-center">
        {/* Timeline track */}
        <div className="relative h-32">
          {/* Background track */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gradient-to-r from-border/20 via-border/40 to-border/20 rounded-full"></div>

          {/* Pressure zones - visual intensity */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 flex items-center">
            {/* Low pressure zone */}
            <div 
              className="h-3 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-l-full"
              style={{ width: '40%' }}
            ></div>
            {/* High pressure zone */}
            <div 
              className="h-5 bg-gradient-to-r from-amber-500/20 via-red-500/15 to-amber-500/10"
              style={{ width: '40%' }}
            ></div>
            {/* Medium pressure zone */}
            <div 
              className="h-4 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-r-full"
              style={{ width: '20%' }}
            ></div>
          </div>

          {/* Markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer group/marker"
              style={{ left: `${marker.position}%` }}
              onMouseEnter={() => setActiveMarker(marker.id)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              {/* Marker indicator */}
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                  marker.intensity === 'high'
                    ? 'bg-red-500/80 border-red-500/50 shadow-lg shadow-red-500/30'
                    : marker.intensity === 'medium'
                    ? 'bg-amber-500/80 border-amber-500/50 shadow-lg shadow-amber-500/20'
                    : 'bg-emerald-500/80 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                } ${activeMarker === marker.id ? 'scale-150' : 'scale-100'}`}>
                  {marker.id === 'current' && (
                    <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping"></span>
                  )}
                </div>

                {/* Label */}
                <span className={`absolute -bottom-8 text-[10px] font-bold whitespace-nowrap transition-all ${
                  marker.id === 'current' ? 'text-red-500/90' : 'text-foreground/70'
                } ${activeMarker === marker.id ? 'scale-110' : 'scale-100'}`}>
                  {marker.label}
                  {marker.id === 'current' && (
                    <span className="ml-1 text-[8px] font-light">• Current</span>
                  )}
                </span>

                {/* Description tooltip */}
                {activeMarker === marker.id && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-background/95 backdrop-blur-sm border border-border/40 rounded-lg shadow-xl animate-in fade-in-50 duration-200 z-20">
                    <p className="text-[10px] text-foreground/90 font-medium whitespace-nowrap">
                      {marker.description}
                    </p>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background/95 border-b border-r border-border/40 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Current time indicator - vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/40 to-transparent"
            style={{ left: `${currentPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 rounded-full bg-red-500/60 animate-pulse"></div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex items-center justify-center gap-6 text-[10px] text-muted-foreground/70">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
            <span>Low pressure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
            <span>High pressure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
