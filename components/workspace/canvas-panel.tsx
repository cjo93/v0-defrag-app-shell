'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'

const artifacts = [
  {
    id: 'map',
    title: 'Relational map',
    subtitle: 'Where meaning broke',
    status: 'Live',
    icon: IconRelationalMap,
    summary: 'Intent and impact split at the opening phrase.',
    insight: 'They likely heard urgency as criticism before they processed your actual request.',
    detail: 'The strongest current repair path is reassurance first, content second.',
  },
  {
    id: 'system',
    title: 'System context',
    subtitle: 'History shaping reaction',
    status: 'Ready',
    icon: IconSystemView,
    summary: 'Family pressure around being “wrong” is active.',
    insight: 'Correction cues land louder when they already feel evaluated.',
    detail: 'Treat quiet as protection rather than refusal and the field softens.',
  },
  {
    id: 'sim',
    title: 'Simulation branch',
    subtitle: 'Alternative opening',
    status: '3 branches',
    icon: IconSimulations,
    summary: 'Validation first outperforms direct problem entry.',
    insight: 'Naming care and asking for a small window produces the cleanest likely outcome.',
    detail: 'The branch lane should keep this state visible instead of resetting context.',
  },
  {
    id: 'timing',
    title: 'Timing field',
    subtitle: 'Pressure around the moment',
    status: 'Watch',
    icon: IconTiming,
    summary: 'Stress load is amplifying interpretation.',
    insight: 'A better window matters almost as much as a better sentence.',
    detail: 'Re-enter after decompression if you want the next move to land.',
  },
]

export function CanvasPanel({ mobile = false }: { mobile?: boolean }) {
  const [selectedArtifact, setSelectedArtifact] = useState('map')
  const selected = artifacts.find((artifact) => artifact.id === selectedArtifact) ?? artifacts[0]
  const SelectedIcon = selected.icon

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#171819] text-stone-100">
      <div className={`border-b border-white/8 bg-[#171819]/95 backdrop-blur-sm ${mobile ? 'px-5 py-4' : 'px-6 py-4 xl:px-8'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {!mobile && (
              <Link href="/dashboard" className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-200 transition hover:bg-white/[0.08]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Relational field</p>
              <h2 className="mt-1 text-lg font-medium text-stone-100">Live canvas</h2>
              <p className="mt-1 text-xs leading-5 text-stone-400">Artifacts stay visible while the moment evolves.</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Field active
            </span>
            <Link href="/settings" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-300 transition hover:bg-white/[0.08]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className={`min-h-0 flex-1 overflow-y-auto ${mobile ? 'px-5 py-5' : 'px-6 py-6 xl:px-8 xl:py-8'}`}>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_340px]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[30px] border border-white/8 bg-[radial-gradient(circle_at_20%_20%,_rgba(223,191,123,0.16),_transparent_18%),radial-gradient(circle_at_78%_24%,_rgba(112,153,163,0.18),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.01))] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Current read</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-stone-50">{selected.summary}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300">
                  {selected.status}
                </div>
              </div>

              <div className="relative mt-6 h-[360px] overflow-hidden rounded-[28px] border border-white/8 bg-[#141516]/85">
                <div className="absolute left-[16%] top-[16%] h-24 w-24 rounded-full border border-amber-200/25 bg-amber-200/10" />
                <div className="absolute right-[15%] top-[18%] h-20 w-20 rounded-full border border-sky-200/25 bg-sky-200/10" />
                <div className="absolute bottom-[18%] left-[34%] h-32 w-32 rounded-full border border-white/10 bg-white/[0.04]" />
                <div className="absolute left-[24%] top-[28%] h-px w-[28%] rotate-[8deg] bg-gradient-to-r from-amber-100/70 to-transparent" />
                <div className="absolute left-[43%] top-[44%] h-px w-[24%] -rotate-[30deg] bg-gradient-to-r from-white/50 to-transparent" />
                <div className="absolute left-[34%] top-[59%] h-px w-[18%] rotate-[30deg] bg-gradient-to-r from-sky-100/55 to-transparent" />

                <div className="absolute left-[8%] top-[11%] max-w-[190px] rounded-2xl border border-white/10 bg-[#1a1c1f]/95 p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Intent</p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">You were trying to move toward clarity before resentment built.</p>
                </div>
                <div className="absolute right-[6%] top-[15%] max-w-[210px] rounded-2xl border border-white/10 bg-[#1a1c1f]/95 p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Likely impact</p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">They may have heard a warning shot instead of an invitation.</p>
                </div>
                <div className="absolute bottom-[9%] left-[16%] max-w-[260px] rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-100/85">Best next move</p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">{selected.detail}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Primary opening', 'Lead with reassurance.'],
                  ['Pressure source', 'Timing plus accumulated stress.'],
                  ['Branch recommendation', 'Validation before request.'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-200">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {artifacts.map((artifact) => {
                const Icon = artifact.icon
                const isSelected = artifact.id === selectedArtifact

                return (
                  <button
                    key={artifact.id}
                    onClick={() => setSelectedArtifact(artifact.id)}
                    className={`rounded-[24px] border p-4 text-left transition ${
                      isSelected
                        ? 'border-white/20 bg-white/[0.08]'
                        : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                          <Icon className="h-5 w-5 text-stone-200" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-stone-100">{artifact.title}</p>
                          <p className="mt-1 text-xs text-stone-400">{artifact.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500">{artifact.status}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-stone-300">{artifact.insight}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <SelectedIcon className="h-5 w-5 text-stone-100" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Selected artifact</p>
                  <h3 className="mt-1 text-lg font-medium text-stone-100">{selected.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-300">{selected.insight}</p>
              <p className="mt-4 rounded-2xl border border-white/8 bg-[#141516] p-4 text-sm leading-6 text-stone-200">{selected.detail}</p>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Artifact state</p>
              <div className="mt-4 space-y-3">
                {[
                  'Map remains pinned while you open branches.',
                  'System context stays visible as background truth.',
                  'Timing cues persist until the moment materially changes.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-[#141516] p-4 text-sm leading-6 text-stone-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Next actions</p>
              <div className="mt-4 space-y-3">
                {['Open full artifact view', 'Send to branch lane', 'Create a brief'].map((action) => (
                  <button
                    key={action}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-[#141516] px-4 py-3 text-left text-sm text-stone-200 transition hover:bg-white/[0.05]"
                  >
                    {action}
                    <span aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
