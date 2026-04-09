import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'

export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-gradient-to-br from-background via-background to-secondary/3 flex flex-col h-full overflow-hidden relative">
      {/* System Bar - Integrated Navigation (not floating) */}
      <div className="flex-shrink-0 border-b border-border/40 bg-background/80 backdrop-blur-md px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 max-w-full">
          {/* Left: Navigation */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard" className="flex-shrink-0 p-1.5 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Back to Dashboard">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground tracking-widest">WORKSPACE</span>
              <span className="text-xs text-muted-foreground/60 font-light">Relational Field</span>
            </div>
          </div>

          {/* Right: System Status + Settings */}
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

      {/* Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full opacity-40">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/4 via-transparent to-transparent blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Canvas Header - Premium Typographic Treatment */}
      <div className="flex-shrink-0 border-b border-border/30 px-8 py-5 bg-background/60 backdrop-blur-sm relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground tracking-wider">Analysis Canvas</h2>
            <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
              Relational analysis in real time
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse"></span>
            <span>Processing…</span>
          </div>
        </div>
      </div>
      
      {/* Canvas Content - Premium Artifact Composition */}
      <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col items-center justify-start relative z-10">
        <div className="max-w-3xl w-full space-y-8">
          {/* System Flow Visualization */}
          <div className="text-center space-y-4 py-6">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted/10 border border-border/40 rounded-full px-4 py-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse"></span>
              <span className="font-medium">System flow: Thread → Branch → Artifacts → Brief</span>
            </div>
          </div>

          {/* Artifact Flow with Visual Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Stage 1: Interpretation - Input to Map */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-6 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <IconRelationalMap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Relational Map</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary/80 font-medium">Stage 1</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">Visual connections, assumptions, where understanding breaks</p>
                  </div>
                </div>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{animationDelay: '0.15s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 text-6xl font-light text-primary/5 pointer-events-none"><IconTiming className="w-24 h-24 opacity-10" /></div>
            </div>

            {/* Stage 2: System Context */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-6 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <IconSystemView className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">System View</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600/80 font-medium">Ready</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">Family patterns, history, relational structures</p>
                  </div>
                </div>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 text-6xl font-light text-primary/5 pointer-events-none">→</div>
            </div>

            {/* Stage 3: Simulations */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-6 overflow-hidden cursor-pointer hover:border-primary/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <IconSimulations className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Simulations</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600/80 font-medium">3 paths</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">Alternative conversations, rewritten responses</p>
                  </div>
                </div>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 text-6xl font-light text-primary/5 pointer-events-none"><IconTiming className="w-24 h-24 opacity-10" /></div>
            </div>

            {/* Stage 4: Timing Analysis */}
            <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 backdrop-blur-md transition-all duration-300 p-6 overflow-hidden cursor-pointer hover:border-primary/40 opacity-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <IconTiming className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Timing View</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600/80 font-medium">Queued</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-light mt-1.5">External factors, emotional state, pressure</p>
                  </div>
                </div>
                <div className="flex gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-muted/50"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/40"></div>
                  <div className="w-2 h-2 rounded-full bg-muted/30"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Output - Brief */}
          <div className="border border-primary/40 rounded-lg bg-gradient-to-br from-primary/8 to-primary/3 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/30 border border-primary/50 flex items-center justify-center">
                <IconTiming className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Brief Output</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary/80 font-medium">Final</span>
                </div>
                <p className="text-xs text-muted-foreground font-light mt-2">Coherent summary with recommended next steps and conversation framing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
