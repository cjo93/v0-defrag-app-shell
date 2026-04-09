export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-background flex flex-col h-full overflow-hidden">
      {/* Canvas Header */}
      <div className="flex-shrink-0 border-b border-border px-8 py-6">
        <h2 className="text-base font-semibold text-foreground tracking-wide">Relational Field</h2>
        <p className="text-xs text-muted-foreground mt-2">
          Visual analysis, connections, and insights
        </p>
      </div>
      
      {/* Canvas Content - Premium Centered Visual */}
      <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col items-center justify-center space-y-8">
        {/* Main Visual Placeholder */}
        <div className="space-y-6 max-w-lg">
          {/* Large Central Element */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-light text-muted-foreground mb-2">∞</div>
                <p className="text-xs font-medium text-muted-foreground">Relations</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Start a conversation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Describe a moment and Defrag will show you the relational context, helping you see how the other person may be interpreting the interaction.
            </p>
          </div>

          {/* Visual Guide Dots */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted/50"></div>
            <div className="w-2 h-2 rounded-full bg-muted/30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
