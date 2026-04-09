'use client'

import { ChatThread } from './chat-thread'
import { BranchThread } from './branch-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
import { useState } from 'react'

const mobileDestinations = [
  { id: 'Chat', label: 'Chat', icon: '💬' },
  { id: 'Field', label: 'Field', icon: '◆' },
  { id: 'Branches', label: 'Branches', icon: '⊕' },
  { id: 'Family', label: 'Family', icon: '∞' },
  { id: 'Brief', label: 'Brief', icon: '→' },
]

export function WorkspaceLayout() {
  const [activeDestination, setActiveDestination] = useState('Chat')

  // Desktop layout: CORRECTED - left threads + right dominant canvas
  // Left side: primary thread (top) + branch thread (bottom), Right side: dominant multimedia canvas
  const desktopLayout = (
    <div className="hidden md:flex h-screen bg-background overflow-hidden">
      {/* LEFT SIDE: Two Vertical Thread Lanes */}
      <div className="w-80 border-r border-border flex flex-col bg-background">
        {/* Primary Thread Lane */}
        <div className="flex-1 flex flex-col min-w-0 border-b border-border/50">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border/30 px-5 py-4 bg-background/50">
            <h2 className="text-xs font-semibold text-foreground tracking-widest uppercase">Primary</h2>
            <p className="text-xs text-muted-foreground mt-1.5 font-light">Live interpretation</p>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <ChatThread />
            </div>
            <div className="flex-shrink-0 border-t border-border/30">
              <MessageInput compact />
            </div>
          </div>
        </div>

        {/* Branch/Simulation Thread Lane */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border/30 px-5 py-4 bg-background/50">
            <h2 className="text-xs font-semibold text-foreground tracking-widest uppercase">Branch</h2>
            <p className="text-xs text-muted-foreground mt-1.5 font-light">Simulations & rewrites</p>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <BranchThread />
            </div>
            <div className="flex-shrink-0 border-t border-border/30">
              <MessageInput compact />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Dominant Multimedia Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
        <CanvasPanel />
      </div>
    </div>
  )

  // Mobile layout: Destination-based full-screen views with premium app feel
  const mobileLayout = (
    <div className="md:hidden flex flex-col h-screen bg-background overflow-hidden">
      {/* Status Bar Area */}
      <div className="flex-shrink-0 bg-background px-4 py-3 border-b border-border/30">
        <h1 className="text-sm font-semibold text-foreground tracking-wide">Defrag</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col min-w-0">
        {/* Chat View */}
        {activeDestination === 'Chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <ChatThread />
            </div>
            <div className="flex-shrink-0 border-t border-border/30">
              <MessageInput />
            </div>
          </div>
        )}

        {/* Field View - Relational Canvas */}
        {activeDestination === 'Field' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/5 border border-border/40 flex items-center justify-center mb-8">
              <span className="text-4xl font-light text-muted-foreground/40">◆</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground text-center mb-3 tracking-tight">Relational Field</h2>
            <p className="text-sm text-muted-foreground text-center font-light leading-relaxed max-w-xs">
              Dynamic relational maps, family systems views, and visual explainers appear here as AI generates insights
            </p>
          </div>
        )}

        {/* Branches View - Alternative Threads */}
        {activeDestination === 'Branches' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/5 border border-border/40 flex items-center justify-center mb-8">
              <span className="text-4xl font-light text-muted-foreground/40">⊕</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground text-center mb-3 tracking-tight">Branch Simulations</h2>
            <p className="text-sm text-muted-foreground text-center font-light leading-relaxed max-w-xs">
              Alternate framings, rewritten responses, and other-side perspectives on the same moment
            </p>
          </div>
        )}

        {/* Family View - System Relationships */}
        {activeDestination === 'Family' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/5 border border-border/40 flex items-center justify-center mb-8">
              <span className="text-4xl font-light text-muted-foreground/40">∞</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground text-center mb-3 tracking-tight">System View</h2>
            <p className="text-sm text-muted-foreground text-center font-light leading-relaxed max-w-xs">
              See how this moment connects to patterns, history, and related interactions across your relationships
            </p>
          </div>
        )}

        {/* Brief View - Daily Summary */}
        {activeDestination === 'Brief' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/5 border border-border/40 flex items-center justify-center mb-8">
              <span className="text-4xl font-light text-muted-foreground/40">→</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground text-center mb-3 tracking-tight">Daily Brief</h2>
            <p className="text-sm text-muted-foreground text-center font-light leading-relaxed max-w-xs">
              Summary of insights, patterns, and suggested next steps for your relationships this week
            </p>
          </div>
        )}
      </div>

      {/* Premium Bottom Navigation */}
      <div className="flex-shrink-0 border-t border-border/30 bg-background flex safe-area-inset-bottom">
        {mobileDestinations.map((dest, idx) => (
          <button
            key={dest.id}
            onClick={() => setActiveDestination(dest.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-xs transition-all ${
              activeDestination === dest.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            } ${idx > 0 ? 'border-l border-border/20' : ''}`}
          >
            <span className="text-lg mb-1">{dest.icon}</span>
            <span className="font-medium">{dest.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  )
}
