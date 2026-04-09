export function CanvasPanel() {
  return (
    <div className="flex-1 min-w-0 bg-card border-l border-border flex flex-col h-full overflow-hidden">
      {/* Canvas Header */}
      <div className="flex-shrink-0 border-b border-border px-6 py-5 bg-background/50">
        <h2 className="text-sm font-semibold text-foreground tracking-wide">Canvas</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Workspace, relations, and insights
        </p>
      </div>
      
      {/* Canvas Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground">Canvas</p>
          </div>
        </div>
        <div className="text-center max-w-xs">
          <p className="text-sm text-muted-foreground">
            Start a conversation to see the relational context and analysis.
          </p>
        </div>
      </div>
    </div>
  )
}
