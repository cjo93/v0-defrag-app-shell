'use client'

import { useState, useEffect } from 'react'
import { BasedOnDisclosure } from './based-on-disclosure'
import { IconSimulations } from '@/components/icons/DefragIcons'

// Add Scenario type
interface Scenario {
  id: string
  type: 'rewrite' | 'simulation' | 'perspective'
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string
  sources?: {
    name: string
    description: string
    detail: string
  }[]
}

// Demo scenarios (should be replaced with real data in production)
const scenarios: Scenario[] = [
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



// Utility: Reactive mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

export function BranchThread() {
  // For progressive disclosure on mobile
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const mobile = useIsMobile()

  // For mobile collapse/expand
  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex-1 overflow-y-auto pb-28 px-3 py-4 sm:px-4 sm:py-5 bg-linear-to-b from-[#181c28] via-[#10131b] to-[#0b0d14]">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Sticky header: strong anchor, left/top bias, higher contrast */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-[#181c28]/90 via-[#0b0d14]/85 to-[#181c28]/90 px-4 py-3 backdrop-blur-xl border-b border-white/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Branch lane</p>
          <p className="mt-1 text-sm text-white/55">Alternate ways this moment could land.</p>
        </div>

        {scenarios.map((scenario: Scenario, idx: number) => {
          const Icon = scenario.icon
          const isPrimary = idx === 0
          const isSecondary = !isPrimary
          const collapsed = mobile && isSecondary && !expanded[scenario.id as keyof typeof expanded]

          return (
            <div
              key={scenario.id}
              className={`overflow-hidden rounded-3xl border p-4 sm:p-5
                ${isPrimary
                  ? 'bg-white/6 border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.25)]'
                  : 'bg-white/3 border-white/8'}
                ${!isPrimary ? 'opacity-70' : ''}
                transition-all duration-200
              `}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/6 ${isSecondary ? 'text-white/40' : 'text-white/82'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isSecondary ? 'text-white/40' : 'text-white/55'}`}> 
                      {scenario.type === 'simulation'
                        ? 'Practice path'
                        : scenario.type === 'rewrite'
                          ? 'Rewrite'
                          : 'Perspective'}
                    </p>
                    <p className="mt-1 text-base font-semibold text-white/95">{scenario.title}</p>
                  </div>
                </div>

                {/* Progressive disclosure: summary only on mobile for secondary, expand on tap */}
                <div>
                  <div className="relative">
                    <p className={`text-[15px] leading-7 ${isSecondary ? 'text-white/55' : 'text-white/95'} sm:text-base`}>
                      {collapsed ? scenario.content.slice(0, 72) : scenario.content}
                    </p>
                    {collapsed && (
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-[#0b0d14] to-transparent" />
                    )}
                  </div>
                  {mobile && isSecondary && (
                    <button
                      className="mt-2 text-xs text-emerald-400 underline underline-offset-2"
                      onClick={() => toggleExpand(scenario.id)}
                    >
                      {collapsed ? 'Show more' : 'Show less'}
                    </button>
                  )}
                </div>

                {/* Buttons: premium interaction, no ripple */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    className={`inline-flex min-h-11 items-center rounded-full bg-white/5 px-4 py-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-white/8 active:scale-[0.98] ${isSecondary ? 'text-white/40' : 'text-emerald-400'}`}
                  >
                    Try this wording
                  </button>
                  <button
                    className={`inline-flex min-h-11 items-center rounded-full bg-white/5 px-4 py-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-white/8 active:scale-[0.98] ${isSecondary ? 'text-white/40' : 'text-emerald-400'}`}
                  >
                    Compare to primary lane
                  </button>
                </div>

                {/* Progressive disclosure: sources hidden by default on mobile for secondary */}
                {scenario.sources && (!mobile || !isSecondary || expanded[scenario.id as keyof typeof expanded]) && (
                  <BasedOnDisclosure
                    compactLabel="Why this path may land better"
                    sources={scenario.sources}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
