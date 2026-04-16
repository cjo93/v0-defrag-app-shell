import Link from 'next/link'

const briefCards = [
  {
    title: 'Today’s relational brief',
    detail: 'The strongest repair window comes from softer pacing, visible care, and less explanatory overload.',
  },
  {
    title: 'Pressure watch',
    detail: 'Stress is amplifying interpretation drift. Name care before details if you want the room to stay open.',
  },
  {
    title: 'Use the workspace when',
    detail: 'The live conversation needs more precision, branching, or field visibility than a brief can comfortably hold.',
  },
]

export default function BriefsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Briefs</p>
            <h1 className="mt-1 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white/92 sm:text-4xl">
              A lighter read on what matters most right now, without turning the product into a document dump.
            </h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Current brief</p>
                <p className="mt-2 text-sm text-white/62">A quick read built for orientation, not a wall of text.</p>
              </div>
              <span className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
                Fresh
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {briefCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-base font-semibold text-white/88">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.8rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Audio brief shell</p>
              <div className="mt-5 rounded-2xl border border-white/8 bg-black/18 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white/86">Listen on the go</p>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
                    Soon
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Reserve this space for short spoken summaries instead of forcing the product back into long written explanations.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Use the right surface</p>
              <div className="mt-5 space-y-3">
                {['Use briefs for orientation.', 'Use the dashboard for grouping and pressure signals.', 'Use the workspace for live relational decisions.'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
