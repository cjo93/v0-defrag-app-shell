'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'

const artifacts = [
  {
    id: 'map',
    title: 'Relational Map',
    subtitle: 'How the moment may be landing',
    description: 'Tracks what they may be hearing, where the conversation turns sharp, and where connection can be restored.',
    status: 'Generating',
    pulse: 'Field updating',
    tint: 'primary',
    icon: IconRelationalMap,
    signal: 'Misread urgency around your opening line',
    details: [
      'Your urgency is landing louder than your care.',
      'They may already be bracing for criticism.',
      'Validation first lowers the odds of escalation.',
    ],
    shell: [
      { label: 'Confidence', value: 'High' },
      { label: 'Drift', value: '62%' },
      { label: 'Repair window', value: 'Open now' },
    ],
  },
  {
    id: 'system',
    title: 'System View',
    subtitle: 'Family pattern context',
    description: 'Shows the inherited patterns, role expectations, and protection strategies shaping this interaction.',
    status: 'Ready',
    pulse: 'Pattern stable',
    tint: 'secondary',
    icon: IconSystemView,
    signal: 'Defensiveness may be tied to being judged too quickly',
    details: [
      'They may move into protection before they feel understood.',
      'Past family roles suggest they read directness as blame faster than most.',
      'They respond better when the emotional frame is named first.',
    ],
    shell: [
      { label: 'Historical triggers', value: '2 mapped' },
      { label: 'Dominant role', value: 'Protector' },
      { label: 'Openness', value: 'Guarded' },
    ],
  },
  {
    id: 'sim',
    title: 'Simulations',
    subtitle: 'Alternative openings',
    description: 'Tests multiple ways of leading the conversation so you can compare likely outcomes before you speak.',
    status: 'Ready',
    pulse: '3 branches',
    tint: 'amber',
    icon: IconSimulations,
    signal: 'A softer first sentence increases collaboration',
    details: [
      'Direct opening increases shutdown risk.',
      'Naming your intention first improves receptivity.',
      'A slower tone creates more room for honesty.',
    ],
    shell: [
      { label: 'Best path', value: 'Validation first' },
      { label: 'Fallback', value: 'Pause + ask' },
      { label: 'Risk path', value: 'Go direct' },
    ],
  },
  {
    id: 'timing',
    title: 'Timing View',
    subtitle: 'Pressure and readiness',
    description: 'Surfaces current stressors, emotional load, and timing signals that may be intensifying the moment.',
    status: 'Queued',
    pulse: 'Pressure scan',
    tint: 'sky',
    icon: IconTiming,
    signal: 'Stress is likely amplifying how quickly they brace',
    details: [
      'The conversation is arriving on a full nervous system.',
      'Late timing raises the chance of sharp interpretation.',
      'A shorter opening may work better than a long explanation.',
    ],
    shell: [
      { label: 'Stress load', value: 'Elevated' },
      { label: 'Best window', value: 'Tomorrow AM' },
      { label: 'Urgency', value: 'Moderate' },
    ],
  },
] as const

const tintClassNames = {
  primary: {
    panel: 'border-primary/25 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent',
    chip: 'border-primary/18 bg-primary/12 text-primary/90',
    icon: 'border-primary/18 bg-primary/12 text-primary/90',
    glow: 'shadow-[0_0_0_1px_rgba(167,139,250,0.14),0_20px_50px_rgba(45,21,94,0.22)]',
  },
  secondary: {
    panel: 'border-secondary/25 bg-gradient-to-br from-secondary/12 via-secondary/6 to-transparent',
    chip: 'border-secondary/18 bg-secondary/12 text-secondary/90',
    icon: 'border-secondary/18 bg-secondary/12 text-secondary/90',
    glow: 'shadow-[0_0_0_1px_rgba(94,234,212,0.14),0_20px_50px_rgba(8,61,55,0.2)]',
  },
  amber: {
    panel: 'border-amber-400/20 bg-gradient-to-br from-amber-400/12 via-amber-400/5 to-transparent',
    chip: 'border-amber-400/18 bg-amber-400/10 text-amber-100',
    icon: 'border-amber-400/18 bg-amber-400/10 text-amber-100',
    glow: 'shadow-[0_0_0_1px_rgba(251,191,36,0.14),0_20px_50px_rgba(92,59,5,0.2)]',
  },
  sky: {
    panel: 'border-sky-400/20 bg-gradient-to-br from-sky-400/12 via-sky-400/5 to-transparent',
    chip: 'border-sky-400/18 bg-sky-400/10 text-sky-100',
    icon: 'border-sky-400/18 bg-sky-400/10 text-sky-100',
    glow: 'shadow-[0_0_0_1px_rgba(56,189,248,0.14),0_20px_50px_rgba(7,55,83,0.2)]',
  },
} as const

export function CanvasPanel() {
  const [selectedArtifact, setSelectedArtifact] = useState<string>('map')

  const activeArtifact = useMemo(
    () => artifacts.find((artifact) => artifact.id === selectedArtifact) ?? artifacts[0],
    [selectedArtifact]
  )

  const tone = tintClassNames[activeArtifact.tint]
  const ActiveIcon = activeArtifact.icon

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#070911] text-foreground">
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Workspace field</p>
              <h2 className="mt-1 text-base font-semibold text-white/90 sm:text-lg">Live relational canvas</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
              Live
            </div>
            <Link
              href="/settings"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white/76 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_32%),radial-gradient(circle_at_78%_22%,rgba(94,234,212,0.08),transparent_25%),linear-gradient(180deg,#070911_0%,#090b12_44%,#070911_100%)] px-4 py-5 sm:px-6 sm:py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Selected surface</p>
              <p className="mt-2 text-sm font-medium text-white/86">{activeArtifact.title}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Field note</p>
              <p className="mt-2 text-sm font-medium text-white/86">{activeArtifact.signal}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Right now</p>
              <p className="mt-2 text-sm font-medium text-white/86">Safety-first language improves connection odds.</p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-3">
              {artifacts.map((artifact) => {
                const Icon = artifact.icon
                const isSelected = artifact.id === activeArtifact.id
                const artifactTone = tintClassNames[artifact.tint]

                return (
                  <button
                    key={artifact.id}
                    onClick={() => setSelectedArtifact(artifact.id)}
                    className={`w-full rounded-[1.55rem] border p-4 text-left transition-all duration-300 sm:p-5 ${
                      isSelected
                        ? `${artifactTone.panel} ${artifactTone.glow} border-opacity-100`
                        : 'border-white/8 bg-white/[0.035] hover:border-white/14 hover:bg-white/[0.055]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          isSelected ? artifactTone.icon : 'border-white/10 bg-white/[0.05] text-white/70'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white/90 sm:text-base">{artifact.title}</p>
                            <p className="mt-1 text-xs leading-5 text-white/56">{artifact.subtitle}</p>
                          </div>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                              isSelected ? artifactTone.chip : 'border-white/10 bg-white/[0.04] text-white/54'
                            }`}
                          >
                            {artifact.status}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-white/68">{artifact.description}</p>
                        <div className="mt-4 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                              isSelected ? artifactTone.chip : 'border-white/10 bg-white/[0.04] text-white/52'
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90" />
                            {artifact.pulse}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className={`relative overflow-hidden rounded-[1.8rem] border ${tone.panel} ${tone.glow}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,0.04),transparent_20%)]" />
              <div className="relative space-y-6 p-5 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.35rem] border ${tone.icon}`}>
                      <ActiveIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Focused surface</p>
                      <h3 className="mt-1 text-xl font-semibold text-white/92 sm:text-2xl">{activeArtifact.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/68">{activeArtifact.description}</p>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.chip}`}>
                    {activeArtifact.status}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {activeArtifact.shell.map((item) => (
                    <div key={item.label} className="rounded-[1.2rem] border border-white/8 bg-black/16 px-4 py-4 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">{item.label}</p>
                      <p className="mt-2 text-sm font-medium text-white/86">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.5rem] border border-white/8 bg-black/18 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Field interpretation</p>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/34">Live shell</span>
                    </div>
                    <p className="mt-4 text-base leading-7 text-white/82">{activeArtifact.signal}</p>

                    <div className="mt-5 space-y-3">
                      {activeArtifact.details.map((detail) => (
                        <div key={detail} className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/68">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/8 bg-black/18 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Multimedia shell</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-white/86">Voice note replay</p>
                          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                            Soon
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          Audio summary shell remains visible without requiring any backend change in this pass.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-white/86">Practice replay</p>
                          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                            Queued
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          Keep alternate paths visible so the field feels active even before deeper media hooks are wired.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                        <p className="text-sm font-semibold text-white/86">Recommended opening</p>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          “I want to understand what this felt like for you before I explain where I was coming from.”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Field presence</p>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        The canvas keeps the active surface, a live signal, and the next action in view so the workspace feels readable under pressure.
                      </p>
                    </div>
                    <Link
                      href="/learn"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-medium text-white/78 transition-colors hover:border-white/16 hover:bg-white/[0.09] hover:text-white"
                    >
                      Open learning layer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
