'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'

const liveSignals = [
  {
    title: 'Right now',
    value: 'Urgency is landing louder than care.',
    detail: 'Lead with acknowledgement before explanation.',
  },
  {
    title: 'Repair odds',
    value: 'Still open',
    detail: 'The field suggests this can soften if you slow the opening.',
  },
  {
    title: 'Timing',
    value: 'Tonight is charged',
    detail: 'Tomorrow morning likely gives you more room for honesty.',
  },
]

const moveCards = [
  {
    title: 'Open the workspace',
    description: 'Keep the live read, alternate branches, and field state visible together.',
    href: '/workspace',
  },
  {
    title: 'Complete your baseline',
    description: 'Lock in a steadier read on pressure, pacing, and recurring relational patterns.',
    href: '/onboarding',
  },
  {
    title: 'Review the learning layer',
    description: 'Open context only when you want more language for what the field is showing.',
    href: '/learn',
  },
]

const pressureCards = [
  {
    title: 'Current load',
    metric: 'Elevated',
    description: 'Stress and timing are making neutral language hit harder.',
  },
  {
    title: 'Connection outlook',
    metric: 'Recoverable',
    description: 'Validation-first language raises the odds of repair.',
  },
  {
    title: 'Best move',
    metric: 'Slow down',
    description: 'Move from urgency into steadiness before you explain yourself.',
  },
]

const activeThreads = [
  {
    title: 'Primary relationship',
    note: 'Repair window improves if you go softer first.',
    state: 'Needs care',
  },
  {
    title: 'Family context',
    note: 'Inherited honesty pressure is coloring the read.',
    state: 'Background',
  },
  {
    title: 'Recent workspace',
    note: 'Misread urgency is still unresolved.',
    state: 'Open',
  },
]

const pressureSignals = [
  {
    title: 'Fatigue sharpens tone',
    detail: 'Directness rises late in the day.',
    status: 'High',
  },
  {
    title: 'Withdrawal reads as distance',
    detail: 'Silence still lands as rejection.',
    status: 'Active',
  },
  {
    title: 'Criticism sensitivity',
    detail: 'Corrective language is hitting harder than usual.',
    status: 'Watch',
  },
]

const frameworkLayers = [
  {
    title: 'Pattern layer',
    description: 'Translate a reaction into a dynamic you can actually recognize next time.',
  },
  {
    title: 'Timing layer',
    description: 'Surface stress, overload, and emotional weather before you choose a tone.',
  },
  {
    title: 'Repair layer',
    description: 'Keep practical reconnection language close when you need a calmer next move.',
  },
]

export default function DashboardPage() {
  const [showFrameworkDetails, setShowFrameworkDetails] = useState(false)
  const hasCompletedBaseline = false

  return (
    <div className="flex h-screen bg-[#05060a] text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Relational command center</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/92">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08]">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white/72 hover:bg-white/[0.06] hover:text-white">
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.06),transparent_20%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-6xl space-y-5 lg:space-y-6">
            <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.9rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Live overview</p>
                    <h2 className="mt-2 text-xl font-semibold text-white/90">What the field is saying right now</h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
                    Live
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {liveSignals.map((signal) => (
                    <div key={signal.title} className="rounded-[1.35rem] border border-white/8 bg-black/18 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">{signal.title}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/88">{signal.value}</p>
                      <p className="mt-2 text-sm leading-6 text-white/62">{signal.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.9rem] border border-primary/16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Recommended move</p>
                    <h2 className="mt-2 text-lg font-semibold text-white/90">Take this into the workspace</h2>
                  </div>
                  <span className="rounded-full border border-primary/18 bg-primary/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                    Priority
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  The strongest next step is still a softer opening with the field visible beside you.
                </p>
                <div className="mt-5 space-y-3">
                  {['Reassurance before content.', 'Choose a lower-pressure window.', 'Run the validation-first branch.'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/74">
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/workspace"
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.01] hover:bg-white/92"
                >
                  Open Workspace
                </Link>
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.04fr_0.96fr]">
              <div className="space-y-5">
                {!hasCompletedBaseline ? (
                  <div className="rounded-[1.8rem] border border-amber-400/18 bg-gradient-to-br from-amber-400/10 via-amber-400/5 to-transparent p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">Baseline locked</p>
                        <h2 className="mt-2 text-xl font-semibold text-white/90">Complete your baseline to unlock a steadier read</h2>
                      </div>
                      <span className="rounded-full border border-amber-400/18 bg-amber-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/80">
                        Incomplete
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/66">
                      Your baseline becomes the reference point for how you sound under pressure, how you read conflict,
                      and what usually helps you reconnect more cleanly.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="/onboarding"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.01] hover:bg-white/92"
                      >
                        Complete baseline
                      </Link>
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/62">
                        Locked until onboarding is complete
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Pressure and alignment</p>
                      <h2 className="mt-2 text-lg font-semibold text-white/90">What the field suggests right now</h2>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                      Updated live
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {pressureCards.map((card) => (
                      <div key={card.title} className="rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">{card.title}</p>
                        <p className="mt-2 text-lg font-semibold text-white/88">{card.metric}</p>
                        <p className="mt-2 text-sm leading-6 text-white/62">{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Active threads</p>
                      <h2 className="mt-2 text-lg font-semibold text-white/90">Where attention is currently landing</h2>
                    </div>
                    <Link href="/briefs" className="text-sm text-white/52 transition hover:text-white/84">
                      Open briefs
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {activeThreads.map((thread) => (
                      <div key={thread.title} className="flex flex-wrap items-start justify-between gap-3 rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
                        <div>
                          <p className="text-sm font-semibold text-white/88">{thread.title}</p>
                          <p className="mt-2 text-sm leading-6 text-white/62">{thread.note}</p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/56">
                          {thread.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">What may help next</p>
                  <div className="mt-4 space-y-3">
                    {moveCards.map((move) => (
                      <Link
                        key={move.title}
                        href={move.href}
                        className="block rounded-[1.35rem] border border-white/8 bg-black/18 p-4 transition-colors hover:border-white/14 hover:bg-black/24"
                      >
                        <p className="text-sm font-semibold text-white/88">{move.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/62">{move.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Pressure watch</p>
                  <div className="mt-4 space-y-3">
                    {pressureSignals.map((signal) => (
                      <div key={signal.title} className="rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-white/88">{signal.title}</p>
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                            {signal.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">{signal.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Framework layer</p>
                      <h2 className="mt-2 text-lg font-semibold text-white/90">Keep context secondary until you want it</h2>
                    </div>
                    <button
                      onClick={() => setShowFrameworkDetails((value) => !value)}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/74 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                    >
                      {showFrameworkDetails ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/62">
                    Frameworks stay available, but the dashboard keeps the live relational read in front.
                  </p>

                  {showFrameworkDetails && (
                    <div className="mt-4 space-y-3">
                      {frameworkLayers.map((layer) => (
                        <div key={layer.title} className="rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
                          <p className="text-sm font-semibold text-white/88">{layer.title}</p>
                          <p className="mt-2 text-sm leading-6 text-white/62">{layer.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
