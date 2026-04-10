'use client'

import type { ComponentType } from 'react'

import { BasedOnDisclosure } from './based-on-disclosure'
import { IconPerspective, IconRewrite, IconSimulations } from '@/components/icons/DefragIcons'

interface Scenario {
  id: string
  type: 'rewrite' | 'simulation' | 'perspective'
  icon: ComponentType<{ className?: string }>
  title: string
  content: string
  outcome: string
  sources?: {
    name: string
    description: string
    detail: string
  }[]
}

const scenarios: Scenario[] = [
  {
    id: '1',
    type: 'rewrite',
    icon: IconRewrite,
    title: 'Softer opening',
    content:
      '“I want to check in about something” lowers the threat signal and gives the conversation a calmer first step.',
    sources: [
      {
        name: 'Communication safety',
        description: 'How language creates openness',
        detail:
          'Threat-coded language can trigger defensiveness before understanding, while a softer opening leaves more room for curiosity.',
      },
      {
        name: 'Body response',
        description: 'What happens before thinking',
        detail:
          'The nervous system often closes before reflection begins, so wording that feels safer buys you more listening room.',
      },
    ],
  },
  {
    id: '2',
    type: 'perspective',
    icon: IconPerspective,
    title: 'Their likely read',
    content:
      'They may be hearing criticism first. If that happens, their body can brace before they fully understand what you mean.',
    sources: [
      {
        name: 'Relational history',
        description: 'Their protective patterns',
        detail:
          'Past experiences with criticism can activate protection quickly, especially when the opening feels sudden or loaded.',
      },
      {
        name: 'Sensitivity to pressure',
        description: 'What they may already be feeling',
        detail:
          'If they are already carrying stress, even practical language can sound more confrontational than you intended.',
      },
    ],
  },
  {
    id: '3',
    type: 'simulation',
    icon: IconSimulations,
    title: 'Validation-first path',
    content:
      'If you start with “I know this is hard for you,” they are more likely to feel seen first and stay present for the rest of the conversation.',
    sources: [
      {
        name: 'Safety before solving',
        description: 'How the nervous system works',
        detail:
          'Validation can create enough safety for them to stay collaborative instead of shifting into reaction.',
      },
      {
        name: 'What may help now',
        description: 'Connection before correction',
        detail:
          'A first move that feels empathic often changes the entire shape of the conversation.',
      },
    ],
  },
]

const scenarioTone = {
  rewrite: 'border-white/10 bg-white/[0.045]',
  perspective: 'border-secondary/16 bg-gradient-to-br from-secondary/10 via-secondary/5 to-black/18',
  simulation: 'border-primary/18 bg-gradient-to-br from-primary/12 via-primary/6 to-black/18',
}

export function BranchThread() {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="sticky top-0 z-10 rounded-[1.4rem] border border-white/8 bg-[#0b0d14]/92 px-4 py-3 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Branch lane</p>
          <p className="mt-1 text-sm text-white/72">Alternate ways this moment could land.</p>
        </div>

        {scenarios.map((scenario) => {
          const Icon = scenario.icon

          return (
            <div
              key={scenario.id}
              className={`overflow-hidden rounded-[1.5rem] border p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-5 ${scenarioTone[scenario.type]}`}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/82">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">
                      {scenario.type === 'simulation'
                        ? 'Practice path'
                        : scenario.type === 'rewrite'
                          ? 'Rewrite'
                          : 'Perspective'}
                    </p>
                    <p className="mt-1 text-base font-semibold text-white/90">{scenario.title}</p>
                  </div>
                </div>

                <p className="text-[15px] leading-7 text-white/82 sm:text-base">{scenario.content}</p>

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 text-sm font-medium text-white/72 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
                    Try this wording
                  </button>
                  <button className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 text-sm font-medium text-white/72 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
                    Compare to primary lane
                  </button>
                </div>

                {scenario.sources && <BasedOnDisclosure compactLabel="Why this path may land better" sources={scenario.sources} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
