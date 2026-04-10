'use client'

import { Sidebar } from '@/components/layout/sidebar'
import Link from 'next/link'
import { useState } from 'react'

type DashboardMode = 'locked' | 'active'

const dashboardMode: DashboardMode = 'locked'

const pressureSignals = [
  {
    title: 'Fatigue sharpens tone',
    detail: 'Directness rises late day.',
    status: 'High',
  },
  {
    title: 'Withdrawal reads as distance',
    detail: 'Silence still lands as rejection.',
    status: 'Active',
  },
  {
    title: 'Criticism sensitivity is elevated',
    detail: 'Stress makes corrective language hit harder.',
    status: 'Watch',
  },
]

const activeThreads = [
  {
    title: 'Primary relationship',
    note: 'Repair window looks better tonight.',
    state: 'Needs care',
  },
  {
    title: 'Family context',
    note: 'Inherited honesty pressure is active.',
    state: 'Background',
  },
  {
    title: 'Recent workspace',
    note: 'Misread urgency is still unresolved.',
    state: 'Open',
  },
]

const nextMoves = [
  'Reassurance before content.',
  'Choose a lower-pressure window.',
  'Run the validation-first branch.',
]

export default function DashboardPage() {
  const [showFrameworkDetails, setShowFrameworkDetails] = useState(false)
  const hasCompletedBaseline = dashboardMode === 'active'

  return (
    <div className="flex h-screen bg-[#0f1012] text-stone-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(120,92,46,0.18),_transparent_24%),radial-gradient(circle_at_78%_18%,_rgba(74,111,118,0.18),_transparent_24%),linear-gradient(180deg,_#101113_0%,_#0d0e10_100%)]">
        <header className="border-b border-white/8 bg-[#101214]/88 px-5 py-5 backdrop-blur-md md:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">Relational command center</p>
              <h1 className="text-3xl font-semibold tracking-tight text-stone-50">Dashboard</h1>
              <p className="max-w-2xl text-sm leading-6 text-stone-400">
                Baseline, live pressure, and the next move worth making.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/workspace"
                className="inline-flex h-11 items-center justify-center rounded-full bg-stone-100 px-6 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Open Workspace
              </Link>
              <Link
                href="/learn"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-stone-200 transition hover:bg-white/[0.07]"
              >
                Learn
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-6 xl:px-10 xl:py-8">
          <div className="space-y-6">
            <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
              {!hasCompletedBaseline ? (
                <div className="relative overflow-hidden rounded-[30px] border border-amber-300/12 bg-[linear-gradient(145deg,rgba(32,27,19,0.96),rgba(19,20,22,0.94))] p-6 sm:p-8">
                  <div className="absolute left-[-30px] top-[-40px] h-36 w-36 rounded-full bg-amber-300/10 blur-3xl" />
                  <div className="absolute right-[-40px] bottom-[-60px] h-40 w-40 rounded-full bg-sky-300/8 blur-3xl" />

                  <div className="relative space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-100/70">Locked baseline state</p>
                        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-stone-50">
                          Complete your baseline so Defrag can separate your pattern from this moment’s pressure.
                        </h2>
                        <p className="max-w-xl text-sm leading-6 text-stone-300">
                          Without it, the dashboard stays in setup mode and the workspace has less signal to work with.
                        </p>
                      </div>

                      <div className="rounded-full border border-amber-300/15 bg-amber-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/80">
                        Baseline locked
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">What it unlocks</p>
                        <p className="mt-2 text-sm leading-6 text-stone-200">Conflict style, pressure pattern, and stronger repair cues.</p>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">What stays private</p>
                        <p className="mt-2 text-sm leading-6 text-stone-200">Raw birth data stays hidden. Defrag works from synthesized patterning.</p>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Current state</p>
                        <p className="mt-2 text-sm leading-6 text-stone-200">You are seeing the dashboard shell, not the fully active command surface.</p>
                      </div>
                    </div>

                    <Link
                      href="/onboarding"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-stone-100 px-6 text-sm font-semibold text-slate-950 transition hover:bg-white"
                    >
                      Complete Baseline Setup
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[30px] border border-emerald-300/12 bg-[linear-gradient(145deg,rgba(18,21,22,0.96),rgba(15,16,18,0.96))] p-6 sm:p-8">
                  <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl" />
                  <div className="relative space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Active baseline state</p>
                        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-stone-50">
                          Direct communicator who needs timing and room to stay soft.
                        </h2>
                      </div>
                      <div className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
                        Active baseline
                      </div>
                    </div>

                    <p className="max-w-2xl text-sm leading-6 text-stone-300">
                      Honesty is a strength here. Under strain, it can land harder than you intend.
                    </p>

                    <button
                      onClick={() => setShowFrameworkDetails(!showFrameworkDetails)}
                      className="text-sm font-semibold text-stone-200 transition hover:text-white"
                    >
                      {showFrameworkDetails ? 'Hide basis' : 'Show basis'}
                    </button>

                    {showFrameworkDetails && (
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          ['Human Design', 'Decision style and pressure response.'],
                          ['Current timing', 'Relational integrity is louder right now.'],
                          ['Gene Keys', 'Growth patterns around honesty and calm.'],
                          ['Numerology', 'A cycle emphasizing accountability.'],
                        ].map(([title, body]) => (
                          <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                            <p className="text-sm font-semibold text-stone-100">{title}</p>
                            <p className="mt-1 text-sm leading-6 text-stone-300">{body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(17,18,20,0.98),rgba(13,14,16,0.96))] p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,_rgba(81,140,152,0.18),_transparent_24%),radial-gradient(circle_at_18%_16%,_rgba(207,171,101,0.18),_transparent_22%)]" />
                <div className="relative space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Right now</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-50">The field wants less pressure and a cleaner opening.</h2>
                    </div>
                    <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100/80 animate-pulse">
                      Live
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">Current recommendation</p>
                      <span className="inline-flex items-center gap-2 text-[11px] text-stone-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        Updating
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {nextMoves.map((move, index) => (
                        <div key={move} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#101113] p-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[11px] font-semibold text-stone-200">
                            {index + 1}
                          </span>
                          <p className="text-sm leading-6 text-stone-200">{move}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Primary action</p>
                      <Link
                        href="/workspace"
                        className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-stone-100 px-5 text-sm font-semibold text-slate-950 transition hover:bg-white"
                      >
                        Resume live workspace
                      </Link>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Field state</p>
                      <p className="mt-3 text-sm leading-6 text-stone-200">Validation-first branch is outperforming direct problem entry.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[0.72fr_1fr_0.78fr]">
              <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Pressure radar</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-50">Active pressure</h3>
                  </div>
                  <span className="text-xs text-stone-500">Recent signal</span>
                </div>

                <div className="space-y-3">
                  {pressureSignals.map((signal) => (
                    <div key={signal.title} className="rounded-2xl border border-white/8 bg-[#101113] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-stone-100">{signal.title}</p>
                          <p className="mt-1 text-sm leading-6 text-stone-400">{signal.detail}</p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                          {signal.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Who and where</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-50">Open relational threads</h3>
                  </div>
                  <span className="text-xs text-stone-500">Triage first</span>
                </div>

                <div className="space-y-3">
                  {activeThreads.map((thread) => (
                    <div key={thread.title} className="grid gap-3 rounded-2xl border border-white/8 bg-[#101113] p-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <p className="text-sm font-semibold text-stone-100">{thread.title}</p>
                        <p className="mt-1 text-sm leading-6 text-stone-400">{thread.note}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                        {thread.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 sm:p-6 lg:col-span-2 xl:col-span-1">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Suggested move</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-50">What may help next</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                  {[
                    ['Best window', 'After decompression.'],
                    ['Opening cue', 'Reassure before content.'],
                    ['Best branch', 'Validation then request.'],
                    ['Learn next', 'Review safety language.'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-[#101113] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-200">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
