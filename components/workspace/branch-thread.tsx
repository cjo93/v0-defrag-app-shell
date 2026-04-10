'use client'

import type { ComponentType } from 'react'

import { BasedOnDisclosure } from './based-on-disclosure'
import { IconRewrite, IconPerspective, IconSimulations } from '@/components/icons/DefragIcons'

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
    title: 'Rewrite the opening',
    content: '“I want to check in about something” lowers threat and keeps the invitation open.',
    outcome: 'Best for re-entry when their body is already braced.',
    sources: [
      {
        name: 'Communication safety',
        description: 'Wording changes nervous system response.',
        detail: 'Threat-coded language can trigger defense before meaning arrives.',
      },
    ],
  },
  {
    id: '2',
    type: 'perspective',
    icon: IconPerspective,
    title: 'How they may hear the original',
    content: 'They may hear “we need to talk” as a warning that they have already failed.',
    outcome: 'Explains the fast close-down and the sharp tone shift.',
    sources: [
      {
        name: 'Relational history',
        description: 'Old criticism primes current interpretation.',
        detail: 'Past evaluative dynamics can make neutral phrases feel loaded.',
      },
    ],
  },
  {
    id: '3',
    type: 'simulation',
    icon: IconSimulations,
    title: 'Validation-first branch',
    content: '“I know this has felt heavy. I’m not trying to corner you. Can we look at it together?”',
    outcome: 'Most likely branch to keep both people in contact.',
    sources: [
      {
        name: 'Safety before solving',
        description: 'Connection first, then problem-solving.',
        detail: 'Validation lowers defense and increases the odds that the request will actually be heard.',
      },
    ],
  },
]

export function BranchThread() {
  return (
    <div className="space-y-4 p-4">
      <div className="sticky top-0 z-10 rounded-[22px] border border-white/8 bg-[#141516]/95 p-4 backdrop-blur-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Branch state</p>
        <h3 className="mt-1 text-base font-medium text-stone-100">Compare the original moment against safer alternate paths.</h3>
      </div>

      {scenarios.map((scenario, index) => {
        const Icon = scenario.icon

        return (
          <div key={scenario.id} className="overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-[#141516]">
                  <Icon className="h-4 w-4 text-stone-200" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Branch 0{index + 1}</p>
                  <p className="text-sm font-medium text-stone-100">{scenario.title}</p>
                </div>
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {scenario.type === 'rewrite' ? 'Language' : scenario.type === 'perspective' ? 'Read' : 'Simulation'}
              </span>
            </div>

            <div className="space-y-4 p-4">
              <p className="text-sm leading-7 text-stone-100">{scenario.content}</p>
              <div className="rounded-2xl border border-white/8 bg-[#141516] p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Likely effect</p>
                <p className="mt-2 text-sm leading-6 text-stone-200">{scenario.outcome}</p>
              </div>
              {scenario.sources && <BasedOnDisclosure sources={scenario.sources} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
