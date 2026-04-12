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
                <div className="max-w-xl space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.28em] text-stone-500">Relational intelligence</p>
                  <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-stone-50 sm:text-[3.25rem] lg:text-[4.25rem]">
                    Before you answer, see the other side.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-stone-300 sm:text-lg">
                    Defrag helps you see how the moment may be landing on the other side, why it feels so different from your intent, and what to do next.
                  </p>
                  <p className="max-w-lg text-sm leading-6 text-stone-500">See the pattern, the pressure, and the repair opening before the same conflict repeats.</p>
                  <p className="text-xs text-stone-400 mt-1">Not a chatbot. A relational intelligence system for moments that can still go either way.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row items-start">
                  <Link href="/workspace" className="inline-flex h-14 min-h-[48px] items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-slate-950 shadow-[0_22px_60px_rgba(0,0,0,0.42)] ring-1 ring-white/20 transition hover:-translate-y-px hover:bg-white">
                    Open Workspace
                  </Link>
                  <Link href="/pricing" className="inline-flex h-14 min-h-[48px] items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-8 text-sm font-semibold text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/[0.08]">
                    See Pricing
                  </Link>
                </div>

                {/* left column: kept minimal per hotfix — eyebrow, headline, subhead, support line, anti-chatbot, CTAs only */}
              </div>

              {/* removed the lower 3 proof blurbs to simplify hero (hotfix) */}
            </div>

            {/* Right column: simplified premium hero card (single-card composition) */}
            <div className="relative min-h-[min(560px,68svh)] overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-b from-[#0f1114] to-[#060708] text-stone-100 shadow-[0_40px_120px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.04]">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_18%,_rgba(223,191,123,0.08),_transparent_20%),radial-gradient(circle_at_80%_16%,_rgba(98,137,145,0.06),_transparent_22%)]" />

              <div className="relative flex h-full flex-col p-6 lg:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">LIVE READ</p>
                    <p className="mt-1 text-sm font-medium text-stone-100">Session · Misread intent · pattern</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr]">
                  <div className="rounded-2xl border border-white/8 bg-[#0f1214] p-6 shadow-md">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-stone-500">USER MOMENT</div>
                    <p className="mt-3 text-sm leading-7 text-stone-100 font-medium">“Why do you always go quiet when I bring this up?”</p>

                    <div className="mt-4">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-stone-500">READ</div>
                      <p className="mt-2 text-sm text-stone-300">The word “always” likely made the moment land as accusation before concern could be felt.</p>

                      <ul className="mt-3 ml-4 list-inside list-disc text-sm text-stone-300 space-y-1">
                        <li>accusation before safety</li>
                        <li>pressure before reflection</li>
                        <li>being cornered before being understood</li>
                      </ul>
                    </div>

                    <div className="mt-4 rounded-md border border-emerald-300/12 bg-emerald-300/6 p-3">
                      <p className="text-sm font-semibold text-stone-100">NEXT MOVE</p>
                      <p className="mt-2 text-sm text-stone-100">Lower pressure first. Then reopen the topic without blame.</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-semibold text-stone-200">REPAIR OPENING</p>
                      <div className="mt-2 text-sm text-stone-200">“I’m not trying to pin this on you. I want to understand what happens for you when this comes up.”</div>
                    </div>
                  </div>

                  {/* Bottom artifact row: two compact chips/previews */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-sm">
                      <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 8 8" fill="none" aria-hidden>
                        <circle cx="4" cy="4" r="3" fill="#34D399" />
                      </svg>
                      <div className="text-sm text-stone-100">Map live</div>
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-sm">
                      {/* Poster-frame visual: always show a premium fallback gradient + play affordance */}
                      <div className="relative h-10 w-16 rounded-md overflow-hidden bg-gradient-to-br from-[#15202b] to-[#0b1116] border border-white/4">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(135,89,255,0.08),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
                            <svg className="h-4 w-4 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-stone-100">0:47 explainer</div>
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
