export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-background flex flex-col h-full overflow-hidden relative">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-secondary/10 via-transparent to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      {/* Canvas Header - Premium Typographic Treatment */}
      <div className="flex-shrink-0 border-b border-border/30 px-8 py-6 bg-background/50 relative z-10">
        <h2 className="text-sm font-semibold text-foreground tracking-wider">Relational Field</h2>
        <p className="text-xs text-muted-foreground mt-2.5 font-light leading-relaxed">
          AI-driven multimedia workspace for visual exploration and dynamic insights
        </p>
      </div>
      
      {/* Canvas Content - Cinematic Centered Composition */}
      <div className="flex-1 overflow-y-auto px-12 py-20 flex flex-col items-center justify-center relative z-10">
        <div className="space-y-12 max-w-2xl w-full">
          {/* Centr Dynamic Element - Product Theater */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              {/* Concentric Ring System - Product Sophistication */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outermost Ring - Subtle */}
                <div className="absolute w-48 h-48 rounded-full border border-border/15 opacity-40"></div>
                
                {/* Middle Ring - Emphasis */}
                <div className="absolute w-40 h-40 rounded-full border border-border/30"></div>
                
                {/* Inner Ring - Focus */}
                <div className="absolute w-32 h-32 rounded-full border border-border/40 opacity-60"></div>
                
                {/* Core Visual - Premium Treatment */}
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 border border-primary/30 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                  <div className="text-center space-y-1">
                    <div className="text-5xl font-light text-foreground/60">◆</div>
                    <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase opacity-50">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Copy - Premium Messaging */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground leading-tight">
                Ready to explore
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-lg mx-auto">
                Describe an interaction and Defrag generates relational maps, family system views, timing analysis, and visual explainers—all powered by AI to reveal what the other person may be experiencing.
              </p>
            </div>

            {/* Capability Hints */}
            <div className="grid grid-cols-2 gap-6 pt-4 max-w-sm mx-auto text-left">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-primary/80 tracking-wide">Diagrams</p>
                <p className="text-xs text-muted-foreground/70 font-light">Family & system relationships</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-primary/80 tracking-wide">Timeline</p>
                <p className="text-xs text-muted-foreground/70 font-light">Moment pressure & context</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-primary/80 tracking-wide">Artifacts</p>
                <p className="text-xs text-muted-foreground/70 font-light">Generated scripts & insights</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-primary/80 tracking-wide">Motion</p>
                <p className="text-xs text-muted-foreground/70 font-light">Interactive scene-based views</p>
              </div>
            </div>
          </div>

          {/* Subtle Animation Indicator */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-muted/40"></div>
            <div className="w-2 h-2 rounded-full bg-muted/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
