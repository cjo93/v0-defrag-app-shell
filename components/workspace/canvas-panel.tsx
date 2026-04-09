export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-background flex flex-col h-full overflow-hidden">
      {/* Canvas Header */}
      <div className="flex-shrink-0 border-b border-border px-8 py-5">
        <h2 className="text-sm font-semibold text-foreground tracking-wide">Relational Field</h2>
        <p className="text-xs text-muted-foreground mt-1.5 font-light">
          Visual analysis, connections, and insights emerge here
        </p>
      </div>
      
      {/* Canvas Content - Premium Centered Visual with Visual Depth */}
      <div className="flex-1 overflow-y-auto px-12 py-16 flex flex-col items-center justify-center space-y-10">
        {/* Layered Visual Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        {/* Main Visual Placeholder - More Sophisticated */}
        <div className="space-y-8 max-w-xl relative z-10">
          {/* Large Central Element with Premium Treatment */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 w-40 h-40 rounded-full border border-border/20 opacity-50"></div>
              {/* Middle ring */}
              <div className="absolute inset-2 w-36 h-36 rounded-full border border-border/30"></div>
              
              {/* Central element */}
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/60 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-light text-foreground/40 mb-2">∞</div>
                  <p className="text-xs font-medium text-muted-foreground tracking-wide">Relations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description - Premium Typography */}
          <div className="text-center space-y-4 pt-4">
            <h3 className="text-xl font-semibold text-foreground leading-tight">
              Start a conversation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Describe a moment and Defrag will reveal the relational context—showing you how the other person may be reading your words and what might help.
            </p>
          </div>

          {/* Visual Guide - Minimalist */}
          <div className="flex justify-center gap-3 pt-6">
            <div className="w-1.5 h-1.5 rounded-full bg-muted/70"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
