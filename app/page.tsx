import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const heroSignals = [
  { label: 'Interpretation live', value: 'How the moment may be landing' },
  { label: 'Pressure visible', value: 'Stress and timing in view' },
  { label: 'Next move clearer', value: 'Practical language to try next' },
]

const productLayers = [
  {
    title: 'What may be happening for you',
    description: 'Separate your intention from your stress so the moment stops collapsing into one feeling.',
  },
  {
    title: 'What they may be reacting to',
    description: 'See how their fears, history, or pressure could be reshaping what they hear.',
  },
  {
    title: 'What may help next',
    description: 'Get a calmer next step with language that protects connection instead of escalating friction.',
  },
]

const workspaceArtifacts = [
  {
    title: 'Relational map',
    subtitle: 'Selected · generating',
    tone: 'from-primary/20 via-primary/10 to-transparent',
  },
  {
    title: 'System view',
    subtitle: 'Ready · family context',
    tone: 'from-secondary/20 via-secondary/10 to-transparent',
  },
  {
    title: 'Simulations',
    subtitle: 'Ready · alternate openings',
    tone: 'from-amber-500/20 via-amber-500/10 to-transparent',
  },
  {
    title: 'Timing view',
    subtitle: 'Queued · pressure scan',
    tone: 'from-sky-500/20 via-sky-500/10 to-transparent',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05060a] text-foreground">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative border-b border-white/8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.12),transparent_28%),linear-gradient(180deg,#07080d_0%,#05060a_46%,#080a12_100%)]" />
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-primary/18 blur-3xl md:h-[28rem] md:w-[28rem]" />
          <div className="pointer-events-none absolute bottom-[-10rem] right-[-6rem] h-80 w-80 rounded-full bg-secondary/12 blur-3xl md:h-[34rem] md:w-[34rem]" />

          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-4 pb-12 pt-6 sm:px-6 md:gap-16 md:pb-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:pb-24 lg:pt-10">
            <div className="max-w-xl space-y-7 md:space-y-10">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/78 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                  DEFRAG
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-[11ch] text-[2.8rem] font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-[4.15rem] md:text-[4.9rem] lg:text-[5.5rem]">
                    See what the moment may be doing to both of you.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                    Defrag helps you slow the interaction down, see what they may be reacting to, and choose a calmer next move before the misunderstanding hardens.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/workspace"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.01] hover:bg-white/92 hover:shadow-[0_18px_45px_rgba(255,255,255,0.14)]"
                >
                  Open Workspace
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 text-sm font-semibold text-white/86 backdrop-blur transition-colors duration-300 hover:border-white/24 hover:bg-white/10"
                >
                  View Command Center
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 backdrop-blur-md"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">{signal.label}</p>
                    <p className="mt-2 text-sm leading-6 text-white/74">{signal.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-6">
              <div className="absolute inset-x-8 top-8 h-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0d14]/88 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:rounded-[2rem]">
                <div className="border-b border-white/8 bg-white/[0.03] px-4 py-3 sm:px-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">Live workspace</p>
                        <p className="text-sm text-white/72">Late-night conversation repair</p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
                      Field active
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="border-b border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent p-4 sm:p-5 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-primary/18 bg-primary/8 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/78">What they may be hearing</p>
                            <p className="mt-2 text-sm leading-6 text-white/78">
                              “We need to talk” may feel like a threat before the real conversation even starts.
                            </p>
                          </div>
                          <span className="rounded-full border border-primary/20 bg-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                            Live
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">What may be happening for you</p>
                          <p className="mt-2 text-sm leading-6 text-white/72">
                            You are trying to move the conversation forward, but your urgency may be leaking through as pressure.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">What may help next</p>
                          <p className="mt-2 text-sm leading-6 text-white/72">
                            Lead with safety first: “I want to understand how this felt on your side.”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-4 sm:p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(121,99,255,0.18),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(94,234,212,0.1),transparent_26%)]" />
                    <div className="relative space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">Artifact field</p>
                          <p className="text-sm text-white/68">Selected surfaces stay visible while the field updates.</p>
                        </div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">4 surfaces</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {workspaceArtifacts.map((artifact, index) => (
                          <div
                            key={artifact.title}
                            className={`group rounded-[1.35rem] border border-white/10 bg-gradient-to-br ${artifact.tone} p-4 transition-transform duration-300 hover:-translate-y-0.5`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-white/90">{artifact.title}</p>
                                <p className="mt-1 text-xs leading-5 text-white/58">{artifact.subtitle}</p>
                              </div>
                              <span
                                className={`mt-1 h-2 w-2 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)] ${
                                  index === 0 ? 'bg-primary' : 'bg-white/60'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[1.6rem] border border-white/10 bg-[#0e111a]/88 p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">Relational field</p>
                            <p className="mt-1 text-sm text-white/72">Intensity is rising around timing, defensiveness, and repair.</p>
                          </div>
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/90">
                            Pressure high
                          </span>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">
                              <span>Signal drift</span>
                              <span>62%</span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary via-secondary to-amber-300 shadow-[0_0_18px_rgba(167,139,250,0.45)]" />
                            </div>
                            <div className="mt-4 space-y-2 text-xs text-white/58">
                              <div className="flex items-center justify-between">
                                <span>Safety restored by validation</span>
                                <span className="text-emerald-200/90">+18%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Escalation risk if direct</span>
                                <span className="text-amber-200/90">Moderate</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">Recommended opening</p>
                            <p className="mt-3 text-sm leading-6 text-white/74">
                              “I don&apos;t want this to feel like blame. I want to understand what landed badly for you.”
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#080a11]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">What Defrag helps you see</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                One field, three clearer questions.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {productLayers.map((layer) => (
                <div key={layer.title} className="rounded-[1.6rem] border border-white/8 bg-white/[0.035] p-5 sm:p-6">
                  <p className="text-lg font-semibold text-white/90">{layer.title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/64">{layer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05060a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(135,89,255,0.1),transparent_34%)]" />
          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Ready when the moment matters</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
              Open the workspace before the story hardens.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              Bring the interaction in as it happened. Defrag helps you see the pressure, the pattern, and the next move with more steadiness.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="inline-flex h-13 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.01] hover:bg-white/92"
              >
                Open Workspace
              </Link>
              <Link
                href="/learn"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 text-sm font-semibold text-white/86 backdrop-blur transition-colors duration-300 hover:border-white/24 hover:bg-white/10"
              >
                Explore the Framework Layer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
