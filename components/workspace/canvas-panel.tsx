export function CanvasPanel() {
  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full">
      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-2">Canvas</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Artifacts and reference materials appear here.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-md bg-secondary border border-border">
            <p className="text-xs font-medium text-muted-foreground">No artifacts yet</p>
          </div>
        </div>
      </div>
    </div>
  )
}
