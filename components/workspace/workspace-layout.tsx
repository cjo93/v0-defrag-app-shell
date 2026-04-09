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

  // Mobile layout: Destination-based full-screen views with premium native app feel
  const mobileLayout = (
    <div className="md:hidden flex flex-col h-screen bg-background overflow-hidden">
      {/* Premium Status Bar Area */}
      <div className="flex-shrink-0 bg-gradient-to-b from-background to-background/50 backdrop-blur-sm px-4 py-3.5 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-foreground tracking-wider">Defrag</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse"></span>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Content Area - Premium Full-Screen Cards */}
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
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Relational Visual - Premium Presentation */}
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full border border-border/20"></div>
                  <div className="absolute w-24 h-24 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)'}}></div>
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-light text-foreground/50">◆</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-sm">
                <div className="space-y-3 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Relational Field</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Dynamic relational maps, family systems views, and visual explainers generated by AI
                  </p>
                </div>

                {/* Artifact Capability Cards */}
                <div className="space-y-2">
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">◆ Relational Maps</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Visual connections and assumptions</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">∞ System Views</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Family dynamics and relational patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branches View - Alternative Threads */}
        {activeDestination === 'Branches' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Simulation Visual */}
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full border border-border/20"></div>
                  <div className="absolute w-24 h-24 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)'}}></div>
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-light text-foreground/50">⊕</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-sm">
                <div className="space-y-3 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Branch Simulations</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Alternate framings, rewritten responses, and other-side perspectives
                  </p>
                </div>

                {/* Simulation Options */}
                <div className="space-y-2">
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">⊕ Rewritten Response</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Alternative way to express the same meaning</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">⊕ Other-Side View</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">How they might interpret the interaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Family View - System Relationships */}
        {activeDestination === 'Family' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Family System Visual */}
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full border border-border/20"></div>
                  <div className="absolute w-24 h-24 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)'}}></div>
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-light text-foreground/50">∞</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-sm">
                <div className="space-y-3 text-center">
                  <h2 className="text-lg font-semibold text-foreground">System View</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Relational patterns, history, and family dynamics shaping interpretation
                  </p>
                </div>

                {/* System Analysis */}
                <div className="space-y-2">
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">∞ Family Patterns</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Recurring themes and relational structures</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">∞ Historical Context</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">What happened before that shapes now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Brief View - Daily Summary */}
        {activeDestination === 'Brief' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Brief Visual */}
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full border border-border/20"></div>
                  <div className="absolute w-24 h-24 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)'}}></div>
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <span className="text-3xl font-light text-foreground/50">→</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-sm">
                <div className="space-y-3 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Daily Brief</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Key insights, patterns, and suggested next steps for your relationships
                  </p>
                </div>

                {/* Summary Sections */}
                <div className="space-y-2">
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">→ This Week's Patterns</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Recurring themes emerging across interactions</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-3">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">→ Next Steps</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Suggested approaches for deeper understanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Bottom Navigation - App-Like */}
      <div className="flex-shrink-0 border-t border-border/30 bg-background/80 backdrop-blur-md flex safe-area-inset-bottom">
        {mobileDestinations.map((dest, idx) => (
          <button
            key={dest.id}
            onClick={() => setActiveDestination(dest.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3.5 text-xs font-medium transition-all ${
              activeDestination === dest.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
            } ${idx > 0 ? 'border-l border-border/20' : ''}`}
          >
            <span className="text-lg mb-1 leading-none">{dest.icon}</span>
            <span className="leading-tight">{dest.label}</span>
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
