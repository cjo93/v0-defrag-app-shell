export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-gradient-to-br from-background via-background to-secondary/3 flex flex-col h-full overflow-hidden relative">
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
            <h2 className="text-sm font-semibold text-foreground tracking-wider">Relational Field</h2>
            <p className="text-xs text-muted-foreground mt-2 font-light leading-relaxed">
              AI-generated visual analysis and relational mapping
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse"></span>
            <span>Active</span>
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

          {/* Artifact Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
            {/* Map Artifact */}
            <div className="group relative rounded-lg border border-border/40 bg-card/40 hover:bg-card/60 backdrop-blur-sm transition-all duration-300 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">◆</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Relational Map</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Visual diagram of connections, assumptions, and where understanding may break down
                </p>
                <div className="flex gap-1 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/20"></div>
                </div>
              </div>
            </div>

            {/* System Artifact */}
            <div className="group relative rounded-lg border border-border/40 bg-card/40 hover:bg-card/60 backdrop-blur-sm transition-all duration-300 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">∞</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">System View</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Family dynamics, history, and relational patterns that shape how they interpret the moment
                </p>
                <div className="flex gap-1 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/20"></div>
                </div>
              </div>
            </div>

            {/* Simulation Artifact */}
            <div className="group relative rounded-lg border border-border/40 bg-card/40 hover:bg-card/60 backdrop-blur-sm transition-all duration-300 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">⊕</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Simulations</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Alternative conversations, rewritten responses, and other-side framings that could land better
                </p>
                <div className="flex gap-1 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/20"></div>
                </div>
              </div>
            </div>

            {/* Timing Artifact */}
            <div className="group relative rounded-lg border border-border/40 bg-card/40 hover:bg-card/60 backdrop-blur-sm transition-all duration-300 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">→</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Timing View</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  External factors, emotional states, and pressure dynamics intensifying misunderstanding
                </p>
                <div className="flex gap-1 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/20"></div>
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
