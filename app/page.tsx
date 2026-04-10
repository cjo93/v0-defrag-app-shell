import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const heroSignals = [
  'For the moments where everyone walks away with a different version of what just happened.',
  'A clearer read on what is happening between people.',
  'See the interaction from more than one side before the same misunderstanding gets worse.',
]

const narrativeSteps = [
  {
    eyebrow: 'Step 1',
    title: 'Bring in the moment.',
    body: 'What was said, what felt off, and what you were trying to convey.',
  },
  {
    eyebrow: 'Step 2',
    title: 'See what may be happening on both sides.',
    body: 'Intent, impact, pressure, and timing—without collapsing it into a generic chat reply.',
  },
  {
    eyebrow: 'Step 3',
    title: 'Leave with a clearer next move.',
    body: 'A safer opening, a better window, or a branch you can actually try.',
  },
]

const valueBullets = [
  {
    title: 'How a message may land before you send it',
    body: 'Preview likely reads so you are not guessing after the fact.',
  },
  {
    title: 'Why someone became defensive, distant, or overwhelmed',
    body: 'Name the pressure shaping the reaction—not just the words on the surface.',
  },
  {
    title: 'Whether to clarify, wait, repair, or stop pushing',
    body: 'Choose a move that matches the field, not only your urgency.',
  },
  {
    title: 'What kind of wording has a better chance of being heard',
    body: 'Shift language so care arrives before threat.',
  },
]

const productPlanes = [
  {
    title: 'Field',
    body: 'A live canvas for intent, impact, and pressure.',
  },
  {
    title: 'Simulation',
    body: 'Alternate framings without losing the source thread.',
  },
  {
    title: 'Baseline',
    body: 'Patterns and context that keep compounding over time.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100">
      <Navbar />

      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.18),_transparent_26%),radial-gradient(circle_at_80%_16%,_rgba(72,117,125,0.16),_transparent_24%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <section className="relative isolate border-b border-white/8">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-y-0 left-[7%] w-px bg-white/5" />
            <div className="absolute inset-y-0 right-[7%] w-px bg-white/5" />
          </div>

          <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] grid-cols-1 gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(min(100%,560px),1fr)] lg:px-10 lg:pb-14 lg:pt-10">
            <div className="relative flex flex-col justify-between gap-10 lg:py-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                  DEFRAG relational intelligence
                </div>

                <div className="max-w-xl space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.28em] text-stone-500">Relational intelligence</p>
                  <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-stone-50 sm:text-[3.25rem] lg:text-[4.25rem]">
                    You know what you meant. Defrag shows you what they may have heard.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-stone-300 sm:text-lg">
                    Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
                  </p>
                  <p className="max-w-lg text-sm leading-6 text-stone-500">
                    Not therapy. Not generic AI. Not vague advice. A relational intelligence system for difficult interactions—seen from more than one side.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/workspace"
                    className="inline-flex h-14 min-h-[48px] items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-slate-950 shadow-[0_22px_60px_rgba(0,0,0,0.42)] ring-1 ring-white/20 transition hover:-translate-y-px hover:bg-white"
                  >
                    Open Workspace
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-14 min-h-[48px] items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-8 text-sm font-semibold text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/[0.1]"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
                {heroSignals.map((signal) => (
                  <div key={signal} className="space-y-2">
                    <div className="h-px w-10 bg-white/12" />
                    <p className="text-sm leading-6 text-stone-400">{signal}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[min(640px,78svh)] overflow-hidden rounded-[34px] border border-white/10 bg-[#111315] text-stone-100 shadow-[0_50px_140px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.07]">
              <div className="defrag-ambient-breathe pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_rgba(223,191,123,0.22),_transparent_18%),radial-gradient(circle_at_74%_16%,_rgba(98,137,145,0.2),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_36%)]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Live workspace</p>
                    <p className="mt-1 text-sm font-medium text-stone-100">Misread intent / repair path</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Field active
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-1 lg:grid-cols-[310px_1fr]">
                  <div className="border-b border-white/10 bg-white/[0.03] lg:border-b-0 lg:border-r lg:border-white/10">
                    <div className="space-y-5 p-5">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">Interpretation</p>
                        <p className="mt-3 text-sm leading-6 text-stone-100">
                          Urgency may have landed as criticism before your care became visible.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-amber-300/15 bg-amber-200/10 p-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/80">Pressure note</p>
                        <p className="mt-3 text-sm leading-6 text-stone-200">
                          Stress was already high, so the opening read like threat.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#17191c] p-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">Safer branch</p>
                        <p className="mt-3 text-sm leading-6 text-stone-100">
                          Reassure first, then ask for a quieter window.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-4 sm:p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(223,191,123,0.14),_transparent_34%)]" />
                    <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Field</p>
                          <h2 className="mt-1 text-xl font-semibold tracking-tight text-stone-50">Intent, stress, and history are pulling the same line apart.</h2>
                        </div>
                        <div className="flex gap-2 text-[11px] uppercase tracking-[0.18em] text-stone-300">
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">Map live</span>
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">3 branches</span>
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-inner shadow-black/20">
                        <div className="absolute left-[18%] top-[20%] h-28 w-28 rounded-full border border-amber-200/30 bg-amber-200/10 blur-[1px] motion-safe:animate-pulse" />
                        <div className="absolute right-[18%] top-[24%] h-24 w-24 rounded-full border border-sky-200/25 bg-sky-200/10 blur-[1px]" />
                        <div className="absolute bottom-[18%] left-[34%] h-36 w-36 rounded-full border border-white/10 bg-white/[0.04]" />
                        <div className="absolute left-[26%] top-[32%] h-px w-[34%] rotate-[10deg] bg-gradient-to-r from-amber-200/60 to-transparent" />
                        <div className="absolute left-[44%] top-[44%] h-px w-[26%] -rotate-[28deg] bg-gradient-to-r from-white/50 to-transparent" />
                        <div className="absolute left-[33%] top-[57%] h-px w-[18%] rotate-[34deg] bg-gradient-to-r from-sky-200/55 to-transparent" />

                        <div className="absolute left-[11%] top-[14%] max-w-[180px] rounded-2xl border border-white/10 bg-[#181b1f]/90 p-3 shadow-2xl">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Intent</p>
                          <p className="mt-2 text-sm text-stone-100">You meant: clear this up before it festers.</p>
                        </div>
                        <div className="absolute right-[7%] top-[18%] max-w-[200px] rounded-2xl border border-white/10 bg-[#181b1f]/90 p-3 shadow-2xl">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Likely read</p>
                          <p className="mt-2 text-sm text-stone-100">They heard: I am in trouble again.</p>
                        </div>
                        <div className="absolute bottom-[10%] left-[18%] max-w-[260px] rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 shadow-2xl">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-100/85">Repair opening</p>
                          <p className="mt-2 text-sm leading-6 text-stone-100">
                            “I’m not trying to come at you. I want to understand what this felt like on your side.”
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {productPlanes.map((plane) => (
                          <div key={plane.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">{plane.title}</p>
                            <p className="mt-2 text-sm leading-6 text-stone-300">{plane.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#0d0e10]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
            <div className="mb-12 max-w-2xl space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.26em] text-stone-500">What Defrag helps you see</p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
                Compare intent with likely impact—before the moment hardens.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {valueBullets.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-stone-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-white/8 bg-[#0d0e10]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.26em] text-stone-500">How it works</p>
                <h2 className="max-w-md text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">
                  A workspace built for interpretation—not another chat window.
                </h2>
                <p className="max-w-md text-base leading-7 text-stone-400">
                  Keep intent, impact, and repair in view at the same time.
                </p>
              </div>

              <div className="space-y-8">
                {narrativeSteps.map((step, index) => (
                  <div key={step.title} className="grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-[72px_1fr]">
                    <div className="text-sm font-semibold uppercase tracking-[0.26em] text-stone-500">
                      0{index + 1} {step.eyebrow}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-tight text-stone-50">{step.title}</h3>
                      <p className="max-w-xl text-base leading-7 text-stone-400">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0c0e]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
              <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-8 backdrop-blur-sm">
                <p className="text-sm font-medium uppercase tracking-[0.26em] text-stone-500">What Defrag generates</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-50">Interpretive map</h3>
                    <p className="mt-2 text-base leading-7 text-stone-400">
                      A visual field of meaning, defense, and missed signal.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-50">System context</h3>
                    <p className="mt-2 text-base leading-7 text-stone-400">
                      Family role, stress pattern, and relational history.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-50">Branch behavior</h3>
                    <p className="mt-2 text-base leading-7 text-stone-400">
                      Alternate openings and likely outcomes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-50">Next move</h3>
                    <p className="mt-2 text-base leading-7 text-stone-400">
                      One cleaner response and one better window.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[28px] border border-white/8 bg-[linear-gradient(160deg,rgba(17,18,20,0.96),rgba(10,11,12,0.98))] p-8 text-stone-100">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.26em] text-stone-500">Built for the moment after impact</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-50">
                    See the other side before you repeat the same wound.
                  </h2>
                </div>

                <div className="mt-10 space-y-4">
                  <p className="text-base leading-7 text-stone-300">
                    Defrag is strongest when something already feels off and the usual explanation no longer helps.
                  </p>
                  <Link
                    href="/onboarding"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-slate-950 transition hover:bg-white"
                  >
                    Complete baseline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
