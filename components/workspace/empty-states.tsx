export function EmptyThreadState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="space-y-3">
        <div className="text-5xl text-muted-foreground/30">◆</div>
        <h3 className="text-sm font-semibold text-foreground">No conversation yet</h3>
        <p className="text-xs text-muted-foreground/70 max-w-xs font-light">Describe an interaction using the input below to generate relational analysis</p>
      </div>
    </div>
  )
}

export function EmptyCanvasState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="space-y-3">
        <div className="text-5xl text-muted-foreground/30">→</div>
        <h3 className="text-sm font-semibold text-foreground">Waiting for input</h3>
        <p className="text-xs text-muted-foreground/70 max-w-xs font-light">Artifacts will appear here once analysis begins</p>
      </div>
    </div>
  )
}

export function LoadingState() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/40 bg-muted/5">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{animationDelay: '0.1s'}}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{animationDelay: '0.2s'}}></div>
      </div>
      <span className="text-xs text-muted-foreground/70 font-light">Analyzing…</span>
    </div>
  )
}

export function ErrorState({ message = 'Could not generate analysis' }: { message?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10">
      <div className="flex items-center gap-3">
        <span className="text-base text-red-600/80">⚠</span>
        <span className="text-xs text-foreground font-light">{message}</span>
      </div>
      <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
        Retry
      </button>
    </div>
  )
}
