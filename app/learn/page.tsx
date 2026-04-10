import Link from 'next/link'

const learningCards = [
  {
    title: 'Timing and pressure',
    tag: 'Listen first',
    description: 'A short, visual read on when stress changes what people hear and how to slow the moment down.',
  },
  {
    title: 'Repair language',
    tag: 'Use in real time',
    description: 'Simple openings, validation moves, and pacing cues that help connection stay available.',
  },
  {
    title: 'Pattern recognition',
    tag: 'See the dynamic',
    description: 'Spot recurring reactions without collapsing the moment into blame or theory.',
  },
  {
    title: 'Family and history',
    tag: 'Context',
    description: 'Understand how older roles and protection styles may still be shaping the present conversation.',
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Learning layer</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-white/92 sm:text-4xl">Learn the language behind the field without drowning in it.</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.9rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Visual-first overview</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {learningCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
                    {card.tag}
                  </span>
                  <p className="mt-3 text-base font-semibold text-white/88">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.9rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">How to use this layer</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Open it when you need extra language, not when you need more noise.',
                  'Use it to support the field, then move back into the workspace.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.9rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Audio shell</p>
              <div className="mt-5 rounded-2xl border border-white/8 bg-black/18 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white/86">Five-minute listen</p>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
                    Soon
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/62">A short audio explainer for when you want the learning layer without reading a long page.</p>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Video shell</p>
              <div className="mt-5 rounded-2xl border border-white/8 bg-black/18 p-4">
                <div className="aspect-video rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(135,89,255,0.18),transparent_38%),#0b0d14] p-4">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                      <svg className="h-5 w-5 text-white/76" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">Reserved for short explainers that show timing, pattern, and repair ideas without overloading the page.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            'Open this layer when you want extra context, not when you need the UI to feel heavier.',
            'Keep frameworks translated into plain language and practical use.',
            'Move back into the workspace once you know what you want to try next.',
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] px-5 py-5 text-sm leading-6 text-white/68">
              {item}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
