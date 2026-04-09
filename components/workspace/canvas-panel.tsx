import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-gradient-to-br from-background via-background to-secondary/3 flex flex-col h-full overflow-hidden relative">
      {/* Minimal Floating Header - Navigation + Context */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-border/30 bg-gradient-to-b from-background/95 via-background/80 to-background/0 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Navigation */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Back to Dashboard">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground tracking-wider">Relational Field</span>
              <span className="text-xs text-muted-foreground/70 font-light">Live analysis</span>
            </div>
          </div>

          {/* Right: Status + Settings */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-muted-foreground/70 bg-muted/5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse"></span>
              <span className="font-medium">Active</span>
            </div>
            <Link href="/settings" className="p-2 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full opacity-40">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/4 via-transparent to-transparent blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Canvas Header - Premium Typographic Treatment */}
      <div className="flex-shrink-0 border-b border-border/30 px-8 py-5 bg-background/60 backdrop-blur-sm relative z-10 mt-20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground tracking-wider">Analysis Canvas</h2>
            <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
              AI-generated mapping and interpretation layers
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse"></span>
            <span>Generating…</span>
          </div>
        </div>
      </div>
      
      {/* Canvas Content - Premium Artifact Composition */}
      <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col items-center justify-start relative z-10">
        <div className="max-w-3xl w-full space-y-6">
          {/* Welcome State with Relational Visual */}
          <div className="text-center space-y-8 py-8">
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                {/* Animated Concentric Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer ring - subtle */}
                  <div className="absolute w-40 h-40 rounded-full border border-border/20"></div>
                  {/* Middle ring */}
                  <div className="absolute w-32 h-32 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)'}}></div>
                  {/* Inner ring - glowing */}
                  <div className="absolute w-24 h-24 rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/5 shadow-xl" style={{boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.15)'}}></div>
                  {/* Core */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl font-light text-foreground/50">◆</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Relational Canvas Ready
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xl mx-auto">
                Describe an interaction and Defrag will generate relational maps, family system diagrams, timing analysis, and visual explainers showing what the other person may be experiencing.
              </p>
            </div>
          </div>

          {/* Artifact Preview Cards - Dynamic States */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6">
            {/* Map Artifact - Generating State */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-5 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/40 flex items-center justify-center group-hover:from-primary/60 group-hover:to-primary/30 transition-all">
                    <span className="text-sm font-bold text-primary">◆</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Relational Map</p>
                    <span className="text-xs text-primary/70 font-light">Generating…</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Visual diagram of connections, assumptions, and where understanding may break down
                </p>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-muted/30 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* System Artifact - Ready State */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-5 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/40 flex items-center justify-center group-hover:from-primary/60 group-hover:to-primary/30 transition-all">
                    <span className="text-sm font-bold text-primary">∞</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-foreground tracking-wide uppercase">System View</p>
                    <span className="text-xs text-emerald-600/70 font-light">Ready</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Family dynamics, history, and relational patterns that shape interpretation
                </p>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/30"></div>
                </div>
              </div>
            </div>

            {/* Simulation Artifact - Ready State */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-5 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/40 flex items-center justify-center group-hover:from-primary/60 group-hover:to-primary/30 transition-all">
                    <span className="text-sm font-bold text-primary">⊕</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Simulations</p>
                    <span className="text-xs text-emerald-600/70 font-light">3 alternatives</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Alternative conversations and rewritten responses that could land better
                </p>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/30"></div>
                </div>
              </div>
            </div>

            {/* Timing Artifact - Queued State */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-5 overflow-hidden cursor-pointer hover:border-primary/40 opacity-75">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/40 flex items-center justify-center group-hover:from-primary/60 group-hover:to-primary/30 transition-all">
                    <span className="text-sm font-bold text-primary">→</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Timing View</p>
                    <span className="text-xs text-amber-600/70 font-light">Queued</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  External factors, emotional states, and pressure dynamics at play
                </p>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-muted/40"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/30"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Note */}
          <div className="rounded-lg border border-border/40 bg-gradient-to-br from-primary/5 to-secondary/3 backdrop-blur-sm p-4 space-y-2 mt-8">
            <p className="text-xs font-semibold text-primary/90 tracking-wide uppercase">Premium Features</p>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Defrag generates dynamic multimedia outputs including relational diagrams, family systems analysis, interactive scene-based views, timing pressure maps, and AI-powered conversation simulations—all designed to reveal what the other person may be experiencing in the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
