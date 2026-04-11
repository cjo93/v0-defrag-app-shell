import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const learningModules = [
  {
    title: 'The Field of Interaction',
    eyebrow: 'Fundamental',
    description: 'Learn to see intent, impact, pressure, and timing as distinct layers of every interaction.',
    items: [
      'Intent vs Impact: Why they split apart.',
      'Pressure: How stress changes hearing.',
      'Timing: When to repair and when to wait.',
    ]
  },
  {
    title: 'Relational Intelligence',
    eyebrow: 'Applied',
    description: 'Practical moves for high-stakes moments where connection feels fragile or unavailable.',
    items: [
      'Repair Language: Softening the opening.',
      'Pacing Cues: Slowing the moment down.',
      'Validation: Naming the pressure.',
    ]
  }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(199,160,92,0.12),transparent_32%),linear-gradient(180deg,#101113_0%,#0b0c0e_100%)] pb-24 pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl mb-20 space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
              Learning Layer
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-stone-50 leading-[1.1]">
              Learn the language behind the field.
            </h1>
            <p className="text-xl text-stone-400 leading-8">
              Defrag provides a clearer read on what is happening between people. These modules help you understand the framework we use to map the moment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {learningModules.map((module) => (
              <div key={module.title} className="group relative rounded-[40px] border border-white/10 bg-white/[0.02] p-10 backdrop-blur-sm transition hover:bg-white/[0.04]">
                <div className="space-y-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 group-hover:text-stone-300 transition">
                    {module.eyebrow}
                  </span>
                  <h3 className="text-3xl font-semibold tracking-tight text-stone-50">
                    {module.title}
                  </h3>
                  <p className="text-stone-400 leading-7">
                    {module.description}
                  </p>
                  <ul className="space-y-4 pt-6 border-t border-white/5">
                    {module.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-stone-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-[40px] border border-white/10 bg-white/[0.02] p-10 flex flex-col justify-between gap-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-stone-50">Visual Context</h3>
                <p className="text-stone-400 leading-7 max-w-xl">
                  We use a live canvas to show how intent and impact can drift. This visual read helps you spot recurring patterns without collapsing into blame.
                </p>
              </div>
              <div className="aspect-[21/9] rounded-[24px] border border-white/5 bg-[radial-gradient(circle_at_center,rgba(199,160,92,0.1),transparent_70%),#0b0d14] flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold italic">Interactive Simulation Shell</span>
              </div>
            </div>

            <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-stone-50">Audio Briefs</h3>
                <p className="text-stone-400 text-sm leading-6">
                  Short, five-minute explainers for when you want the learning layer without reading.
                </p>
              </div>
              <button className="h-14 w-full rounded-full border border-white/10 bg-white/5 text-stone-300 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
