'use client'

type Artifact = {
  id?: string
  title?: string
  kind?: string
  status?: string
  payload?: Record<string, unknown>
} | null

export function CanvasRenderer({ artifact }: { artifact: Artifact }) {
  if (!artifact) {
    return (
      <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5 text-sm text-white/62">
        No artifact selected yet.
      </div>
    )
  }

  return (
    <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Artifact renderer</p>
          <h3 className="mt-2 text-lg font-semibold text-white/90">{artifact.title ?? 'Untitled artifact'}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
            {artifact.kind ?? 'unknown'}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
            {artifact.status ?? 'draft'}
          </span>
        </div>
      </div>

      <pre className="mt-5 overflow-x-auto rounded-[1.2rem] border border-white/8 bg-black/18 p-4 text-xs leading-6 text-white/66">
        {JSON.stringify(artifact.payload ?? {}, null, 2)}
      </pre>
    </div>
  )
}
