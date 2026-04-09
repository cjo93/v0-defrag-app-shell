'use client'

import { ChatThread } from './chat-thread'
import { BranchThread } from './branch-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
import { useState } from 'react'
import { IconChat, IconField, IconBranches, IconFamily, IconBrief, IconRelationalMap, IconSystemView, IconTiming, IconRewrite, IconPerspective, IconSimulations } from '@/components/icons/DefragIcons'

const mobileDestinations = [
  { id: 'Chat', label: 'Chat', icon: IconChat },
  { id: 'Field', label: 'Field', icon: IconField },
  { id: 'Branches', label: 'Branches', icon: IconBranches },
  { id: 'Family', label: 'Family', icon: IconFamily },
  { id: 'Brief', label: 'Brief', icon: IconBrief },
]

export function WorkspaceLayout() {
  const [activeDestination, setActiveDestination] = useState('Chat')
  const [isBranchOpen, setIsBranchOpen] = useState(false)

  // Desktop layout: CORRECTED - left conversation zone (primary + conditional branch) + right dominant canvas
  const desktopLayout = (
    <div className="hidden md:flex h-screen bg-background overflow-hidden">
      {/* LEFT SIDE: Conversation Zone - Primary Thread + Conditional Branch */}
      <div className={`flex border-r border-border transition-all duration-300 ${
        isBranchOpen ? 'gap-0' : ''
      }`}>
        {/* Primary Thread Lane */}
        <div className="w-96 flex flex-col bg-background min-w-0">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border/30 px-6 py-4 bg-background/50 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold text-foreground tracking-widest uppercase">Interpretation</h2>
              <p className="text-xs text-muted-foreground mt-1.5 font-light">What may be happening</p>
            </div>
            <button
              onClick={() => setIsBranchOpen(!isBranchOpen)}
              className={`flex-shrink-0 w-8 h-8 rounded border transition-all flex items-center justify-center text-sm font-semibold ${
                isBranchOpen
                  ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20'
                  : 'border-border/40 text-muted-foreground hover:border-border/60 hover:text-foreground hover:bg-muted/10'
              }`}
              title={isBranchOpen ? 'Close branch thread' : 'Open branch thread'}
            >
              {isBranchOpen ? '−' : '+'}
            </button>
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

        {/* Branch Thread Lane - Conditional */}
        {isBranchOpen && (
          <div className="w-96 flex flex-col bg-background border-l border-border/30 min-w-0 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex-shrink-0 border-b border-border/30 px-6 py-4 bg-background/50">
              <h2 className="text-xs font-semibold text-foreground tracking-widest uppercase">Simulations</h2>
              <p className="text-xs text-muted-foreground mt-1.5 font-light">Try another approach</p>
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
        )}
      </div>

      {/* RIGHT SIDE: Dominant Multimedia Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
        <CanvasPanel />
      </div>
    </div>
  )

  // Mobile layout: Destination-based full-screen views (NOT a literal desktop mirror)
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

      {/* Content Area - Full-Screen Destination Views */}
      <div className="flex-1 overflow-hidden flex flex-col min-w-0">
        {/* Chat - Primary conversational view */}
        {activeDestination === 'Chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-secondary/2">
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ChatThread />
            </div>
            <div className="flex-shrink-0 border-t border-border/30 bg-background/50 backdrop-blur-sm px-4 py-3">
              <MessageInput compact />
            </div>
          </div>
        )}

        {/* Field - Relational canvas/map view */}
        {activeDestination === 'Field' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3 relative">
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 border-b border-border/30 bg-background/60 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-foreground mb-1">Relational Field</h2>
              <p className="text-xs text-muted-foreground font-light">Visual mapping &amp; system analysis</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {[
                { 
                  icon: IconRelationalMap, 
                  title: 'Connection map', 
                  desc: 'Their likely emotional path & where you diverged',
                  color: 'from-primary/15 border-primary/30' 
                },
                { 
                  icon: IconSystemView, 
                  title: 'Family system view', 
                  desc: 'Patterns from their history shaping this reaction',
                  color: 'from-secondary/15 border-secondary/30' 
                },
                { 
                  icon: IconTiming, 
                  title: 'Timing pressure analysis', 
                  desc: 'External stressors intensifying sensitivity',
                  color: 'from-amber-500/10 border-amber-500/20' 
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                <div key={idx} className={`border rounded-lg p-4 bg-gradient-to-br ${item.color} to-transparent hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-foreground/70 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-light mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
              })}
            </div>
          </div>
        )}

        {/* Branches - Alternative framings and simulations */}
        {activeDestination === 'Branches' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3 relative">
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 border-b border-border/30 bg-background/60 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-foreground mb-1">Simulation Branch</h2>
              <p className="text-xs text-muted-foreground font-light">Alternate paths &amp; rewritten responses</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {[
                { icon: IconRewrite, title: 'Rewritten: Softer lead', desc: '"I want to check something with you"' },
                { icon: IconSimulations, title: 'Simulation: If you validate first', desc: 'They relax → become receptive' },
                { icon: IconPerspective, title: 'Their perspective', desc: 'They see confrontation, not partnership' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                <div key={idx} className="border border-secondary/30 rounded-lg p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-secondary/80 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-light mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
              })}
            </div>
          </div>
        )}

        {/* Family - System relationships and context */}
        {activeDestination === 'Family' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3 relative">
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 border-b border-border/30 bg-background/60 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-foreground mb-1">System View</h2>
              <p className="text-xs text-muted-foreground font-light">Family patterns &amp; relational history</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {[
                { 
                  icon: IconSystemView, 
                  title: 'Repeating patterns', 
                  desc: 'How their family taught them to defend',
                  status: '3 identified' 
                },
                { 
                  icon: IconPerspective, 
                  title: 'Historical triggers', 
                  desc: 'Past events that mirror this moment',
                  status: '2 mapped' 
                },
                { 
                  icon: IconTiming, 
                  title: 'Their relational role', 
                  desc: 'How they see themselves in families',
                  status: 'Primary' 
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                <div key={idx} className="border border-secondary/30 rounded-lg p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/15 hover:to-secondary/8 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-6 h-6 text-secondary/80 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-foreground tracking-wide uppercase">{item.title}</p>
                        <p className="text-xs text-muted-foreground font-light mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary/90 font-medium whitespace-nowrap">{item.status}</span>
                  </div>
                </div>
              )
              })}
            </div>
          </div>
        )}

        {/* Brief - Daily summary and insights */}
        {activeDestination === 'Brief' && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-br from-background via-background to-secondary/3 relative">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent blur-3xl"></div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
              <div className="relative w-40 h-40 mb-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-40 h-40 rounded-full border border-border/15 animate-pulse"></div>
                  <div className="absolute w-32 h-32 rounded-full border border-border/25 shadow-xl" style={{boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.15)'}}></div>
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <IconTiming className="w-12 h-12 text-foreground/50" />
                  </div>
                </div>
              </div>

              <div className="space-y-5 w-full max-w-md">
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-semibold text-foreground">Daily Brief</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Key insights, patterns, and suggested next steps for your relationships
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-lg border border-border/40 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm p-3.5 group cursor-pointer hover:border-primary/40 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 transition-all">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">→ This Week&apos;s Patterns</p>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">Recurring themes emerging across interactions</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm p-3.5 group cursor-pointer hover:border-primary/40 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 transition-all">
                    <p className="text-xs font-semibold text-primary/90 tracking-wide">→ Next Steps</p>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">Suggested approaches for deeper understanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Bottom Navigation - Native iOS App Feel */}
      <div className="flex-shrink-0 border-t border-border/40 bg-background/90 backdrop-blur-lg flex safe-area-inset-bottom">
        {mobileDestinations.map((dest, idx) => {
          const IconComponent = dest.icon
          return (
          <button
            key={dest.id}
            onClick={() => setActiveDestination(dest.id)}
            className={`flex-1 flex flex-col items-center justify-center py-4 px-2 text-xs font-medium transition-all ${
              activeDestination === dest.id
                ? 'text-primary bg-gradient-to-b from-primary/15 to-primary/5 border-t-2 border-primary'
                : 'text-muted-foreground/70 hover:text-foreground hover:bg-muted/5'
            }`}
          >
            <IconComponent className="w-5 h-5 mb-1.5" />
            <span className="leading-tight text-xs tracking-tight">{dest.label}</span>
          </button>
          )
        })}
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
