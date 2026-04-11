'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { IconRelationalMap, IconSimulations, IconSystemView, IconTiming } from '@/components/icons/DefragIcons'

const artifacts = [
  {
    id: 'map',
    title: 'Interpretation',
    description: 'How the moment may be landing right now.',
    signal: 'Your urgency is landing louder than your care, so they may already be bracing for criticism.',
    details: [
      'The opening is reading as pressure before it reads as care.',
      'They may be protecting first and listening second.',
      'A softer first sentence lowers the chance of escalation.',
    ],
    icon: IconRelationalMap,
    tone: 'border-primary/20 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent text-primary/90',
  },
  {
    id: 'rewrite',
    title: 'Next move',
    description: 'The clearest move is validation before explanation.',
    signal: 'Lead with acknowledgement, then say what you meant.',
    details: [
      'Start by naming their experience instead of defending your intent.',
      'Keep the first sentence short and low-pressure.',
      'Explain yourself only after they feel met.',
    ],
    icon: IconSimulations,
    tone: 'border-amber-400/20 bg-gradient-to-br from-amber-400/12 via-amber-400/6 to-transparent text-amber-100',
  },
  {
    id: 'system',
    title: 'System view',
    description: 'Background pattern context.',
    signal: 'They may hear directness as judgment faster than most.',
    details: [
      'Past criticism can make practical language sound sharper.',
      'Protection may show up before reflection.',
    ],
    icon: IconSystemView,
    tone: 'border-secondary/20 bg-gradient-to-br from-secondary/12 via-secondary/6 to-transparent text-secondary/90',
  },
  {
    id: 'timing',
    title: 'Timing view',
    description: 'Pressure and readiness around this moment.',
    signal: 'A calmer window tomorrow morning may land better than pushing tonight.',
    details: [
      'Stress is amplifying how quickly they brace.',
      'A shorter opening is more likely to hold connection.',
    ],
    icon: IconTiming,
    tone: 'border-sky-400/20 bg-gradient-to-br from-sky-400/12 via-sky-400/6 to-transparent text-sky-100',
  },
] as const

const rewriteOptions = [
  '“I want to understand what this felt like for you before I explain where I was coming from.”',
  '“I can feel that this landed hard, and I want to slow down with you.”',
  '“I’m not trying to push you here — I want to get this right together.”',
]

export function CanvasPanel({ embedded = false }: { embedded?: boolean }) {
  const [showSupport, setShowSupport] = useState(false)

  const interpretation = useMemo(() => artifacts.find((artifact) => artifact.id === 'map')!, [])
  const nextMove = useMemo(() => artifacts.find((artifact) => artifact.id === 'rewrite')!, [])
  const supportArtifacts = useMemo(() => artifacts.filter((artifact) => artifact.id === 'system' || artifact.id === 'timing'), [])
  const InterpretationIcon = interpretation.icon
  const NextMoveIcon = nextMove.icon

  return (
    <div className={`flex h-full min-w-0 flex-1 flex-col overflow-hidden text-foreground ${embedded ? 'bg-transparent' : 'bg-[#070911]'}`}>
      {!embedded && (
        <div className="border-b border-white/8 bg-[#0b0d14]/94 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/66 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                title="Back to Dashboard"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Workspace read</p>
                <h2 className="mt-1 text-base font-semibold text-white/90 sm:text-lg">Interpretation and next move</h2>
              </div>
            </div>

            <Link
              href="/settings"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white/76 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
            >
              Settings
            </Link>
          </div>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 ${
          embedded
            ? 'bg-transparent'
            : 'bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_32%),radial-gradient(circle_at_78%_22%,rgba(94,234,212,0.08),transparent_25%),linear-gradient(180deg,#070911_0%,#090b12_44%,#070911_100%)]'
        }`}
      >
        <div className={`mx-auto flex flex-col gap-4 ${embedded ? 'max-w-none' : 'max-w-4xl'}`}>
          <section className="rounded-[1.6rem] border border-white/8 bg-black/18 p-5 shadow-[0_24px_80px_rgba(1,4,12,0.28)] sm:p-6">
            <div className="flex items-start gap-3">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${interpretation.tone}`}>
                <InterpretationIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{interpretation.title}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white/92">What this moment may be doing to the conversation</h3>
              </div>
            </div>

            <p className="mt-5 text-base leading-7 text-white/84">{interpretation.signal}</p>

            <div className="mt-5 space-y-3">
              {interpretation.details.map((detail) => (
                <div key={detail} className="rounded-[1.25rem] border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/68">
                  {detail}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-5 shadow-[0_24px_80px_rgba(1,4,12,0.28)] sm:p-6">
              <div className="flex items-start gap-3">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${nextMove.tone}`}>
                  <NextMoveIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Next move</p>
                  <h3 className="mt-1 text-lg font-semibold text-white/90">What to do before you explain yourself</h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/72">{nextMove.signal}</p>

              <div className="mt-5 space-y-3">
                {nextMove.details.map((detail) => (
                  <div key={detail} className="rounded-[1.2rem] border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/66">
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-5 shadow-[0_24px_80px_rgba(1,4,12,0.28)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Rewrite</p>
                  <h3 className="mt-1 text-lg font-semibold text-white/90">A calmer opening to try</h3>
                </div>
                <span className="rounded-full border border-primary/18 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/85">
                  Recommended
                </span>
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-4 text-[15px] leading-7 text-white/84">
                {rewriteOptions[0]}
              </div>

              <div className="mt-4 space-y-3">
                {rewriteOptions.slice(1).map((option) => (
                  <div key={option} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/64">
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[1.45rem] border border-white/8 bg-black/16 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Support surfaces</p>
                <p className="mt-1 text-sm leading-6 text-white/62">Keep secondary context available without making it the primary workspace.</p>
              </div>
              <button
                onClick={() => setShowSupport((value) => !value)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-medium text-white/76 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
              >
                {showSupport ? 'Hide support surfaces' : 'Show support surfaces'}
              </button>
            </div>

            {showSupport && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {supportArtifacts.map((artifact) => {
                  const Icon = artifact.icon

                  return (
                    <div key={artifact.id} className="rounded-[1.3rem] border border-white/8 bg-white/[0.035] p-4">
                      <div className="flex items-start gap-3">
                        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${artifact.tone}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/88">{artifact.title}</p>
                          <p className="mt-2 text-sm leading-6 text-white/64">{artifact.signal}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
