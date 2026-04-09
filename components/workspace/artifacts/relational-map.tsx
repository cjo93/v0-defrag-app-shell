'use client'

import { useEffect, useState } from 'react'

interface Node {
  id: string
  label: string
  x: number
  y: number
  type: 'you' | 'them' | 'dynamic'
  active?: boolean
}

interface Connection {
  from: string
  to: string
  label: string
  strength: 'strong' | 'weak' | 'tension'
}

export function RelationalMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  
  // Sample relational structure
  const nodes: Node[] = [
    { id: 'you', label: 'You', x: 20, y: 50, type: 'you', active: true },
    { id: 'them', label: 'Them', x: 80, y: 50, type: 'them', active: true },
    { id: 'intention', label: 'Your intent', x: 35, y: 30, type: 'dynamic' },
    { id: 'reception', label: 'Their reading', x: 65, y: 30, type: 'dynamic' },
    { id: 'gap', label: 'Meaning split', x: 50, y: 15, type: 'dynamic', active: true },
  ]

  const connections: Connection[] = [
    { from: 'you', to: 'intention', label: 'meant help', strength: 'strong' },
    { from: 'intention', to: 'gap', label: 'split', strength: 'tension' },
    { from: 'gap', to: 'reception', label: 'heard criticism', strength: 'tension' },
    { from: 'reception', to: 'them', label: 'defensive response', strength: 'strong' },
  ]

  return (
    <div className="w-full h-full min-h-[400px] relative bg-gradient-to-br from-background via-background/95 to-primary/3 rounded-xl border border-border/30 overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-border/20 bg-background/60 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/15 border border-primary/30">
              <span className="w-1 h-1 rounded-full bg-primary/80 animate-pulse"></span>
              <span className="text-[9px] font-bold text-primary/90 tracking-wider uppercase">Live Map</span>
            </span>
            <span className="text-xs text-muted-foreground/70 font-light">Relational structure</span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-light">updated just now</span>
        </div>
      </div>

      {/* Map SVG Canvas */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Connection line gradients */}
          <linearGradient id="strong-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="tension-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 70%, 60%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(30, 80%, 55%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Connection lines with animation */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const strokeColor = conn.strength === 'tension' ? 'url(#tension-gradient)' : 'url(#strong-gradient)'
          const strokeWidth = conn.strength === 'strong' ? 0.4 : 0.3
          const dashArray = conn.strength === 'weak' ? '1,1' : undefined

          return (
            <g key={idx}>
              {/* Connection line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                className="transition-all duration-500"
                style={{
                  animation: conn.strength === 'tension' ? 'pulse 2s ease-in-out infinite' : undefined
                }}
              />
              
              {/* Connection label */}
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 1}
                className="text-[2.5px] fill-muted-foreground/60 font-light"
                textAnchor="middle"
              >
                {conn.label}
              </text>
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            className="cursor-pointer transition-all hover:scale-110"
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* Node glow for active nodes */}
            {node.active && (
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="hsl(var(--primary))"
                opacity="0.15"
                className="animate-pulse"
              />
            )}
            
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'dynamic' ? '2' : '2.5'}
              fill={
                node.type === 'you' ? 'hsl(var(--primary))' :
                node.type === 'them' ? 'hsl(var(--secondary))' :
                'hsl(var(--foreground))'
              }
              opacity={activeNode === node.id ? '1' : node.active ? '0.9' : '0.6'}
              className="transition-all duration-200"
            />

            {/* Node label */}
            <text
              x={node.x}
              y={node.y + (node.type === 'dynamic' ? 4 : 5)}
              className={`text-[3px] font-semibold transition-all ${
                node.type === 'you' ? 'fill-primary' :
                node.type === 'them' ? 'fill-secondary' :
                'fill-foreground/80'
              }`}
              textAnchor="middle"
              opacity={activeNode === node.id ? '1' : '0.8'}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground/70">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary/80"></span>
            <span>You</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary/80"></span>
            <span>Them</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-foreground/60"></span>
            <span>Dynamic</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
