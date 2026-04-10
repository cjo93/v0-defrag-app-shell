'use client'

import { useState } from 'react'
import { BranchThread } from './branch-thread'
import { CanvasPanel } from './canvas-panel'
import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'
import {
  IconBranches,
  IconBrief,
  IconChat,
  IconFamily,
  IconField,
  IconPerspective,
  IconRelationalMap,
  IconRewrite,
  IconSimulations,
  IconSystemView,
  IconTiming,
} from '@/components/icons/DefragIcons'

const mobileDestinations = [
  { id: 'Chat', label: 'Chat', icon: IconChat },
  { id: 'Field', label: 'Field', icon: IconField },
  { id: 'Branches', label: 'Branches', icon: IconBranches },
  { id: 'Family', label: 'System', icon: IconFamily },
  { id: 'Brief', label: 'Brief', icon: IconBrief },
] as const

const fieldCards = [
  {
    title: 'Relational map',
    description: 'See where intention drifted, what they may have heard, and where the opening can soften.',
    icon: IconRelationalMap,
    tone: 'from-primary/14 via-primary/6 to-transparent border-primary/18',
  },
  {
    title: 'System view',
    description: 'Keep family pattern context visible so the reaction feels readable instead of random.',
    icon: IconSystemView,
    tone: 'from-secondary/14 via-secondary/6 to-transparent border-secondary/18',
  },
  {
    title: 'Timing pressure',
    description: 'Surface load, urgency, and readiness before you decide how hard to push the moment.',
    icon: IconTiming,
    tone: 'from-amber-400/12 via-amber-400/6 to-transparent border-amber-400/16',
  },
]

const branchCards = [
  {
    title: 'Softer lead',
    description: '“I want to understand what this felt like for you.”',
    icon: IconRewrite,
  },
  {
    title: 'Validation first',
    description: 'Signals care before problem-solving so the conversation can stay collaborative.',
    icon: IconSimulations,
  },
  {
    title: 'Perspective shift',
    description: 'Reframe the moment from pressure to repair before choosing your next sentence.',
    icon: IconPerspective,
  },
]

const familyCards = [
  {
    title: 'Protection pattern',
    description: 'They may protect first and explain later when they sense blame.',
    status: 'Primary',
    icon: IconSystemView,
  },
  {
    title: 'Historical trigger',
    description: 'Direct openings may echo older moments of criticism or sudden correction.',
    status: '2 mapped',
    icon: IconPerspective,
  },
  {
    title: 'Timing sensitivity',
    description: 'Late, overloaded moments increase how sharply they read pressure.',
    status: 'High',
    icon: IconTiming,
  },
]

const briefItems = [
  'Right now the field shows urgency getting mistaken for blame.',
  'Validation-first language remains the strongest repair move.',
  'Tomorrow morning looks cleaner than pushing harder tonight.',
]

export function WorkspaceLayout() {
  const [activeDestination, setActiveDestination] = useState<(typeof mobileDestinations)[number]['id']>('Chat')
  const [isBranchOpen, setIsBranchOpen] = useState(true)

  const desktopLayout = (
    <div className="relative hidden h-screen overflow-hidden bg-[#04050a] text-foreground md:flex">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(94,234,212,0.06),transparent_22%)]" />

      <div className="relative flex min-w-[720px] max-w-[820px] flex-1 flex-col border-r border-white/8 bg-[#070911]/92 backdrop-blur-xl xl:max-w-[900px]">
        <div className="border-b border-white/8 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">DEFRAG workspace</p>
              <h1 className="mt-1 text-lg font-semibold text-white/90">Conversation repair field</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
                Live
              </span>
              <button
                onClick={() => setIsBranchOpen((value) => !value)}
                className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors ${
                  isBranchOpen
                    ? 'border-primary/18 bg-primary/12 text-primary/90 hover:bg-primary/16'
                    : 'border-white/10 bg-white/[0.04] text-white/74 hover:border-white/16 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {isBranchOpen ? 'Hide branch lane' : 'Open branch lane'}
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">Interpretation</p>
              <p className="mt-2 text-sm text-white/76">Keep what they may be hearing visible.</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">Simulation</p>
              <p className="mt-2 text-sm text-white/76">Open alternate paths without leaving the moment.</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">Field</p>
              <p className="mt-2 text-sm text-white/76">Track pressure, pattern, and next move together.</p>
            </div>
          </div>
        </div>

        <div className={`grid min-h-0 flex-1 transition-[grid-template-columns] duration-300 ${isBranchOpen ? 'grid-cols-[minmax(0,1fr)_minmax(280px,0.86fr)]' : 'grid-cols-[minmax(0,1fr)]'}`}>
          <div className="flex min-h-0 flex-col border-r border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="border-b border-white/8 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Primary lane</p>
              <p className="mt-1 text-sm text-white/72">What may be happening in the moment</p>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <ChatThread />
            </div>
            <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3">
              <MessageInput compact />
            </div>
          </div>

          {isBranchOpen && (
            <div className="flex min-h-0 flex-col bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="border-b border-white/8 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Branch lane</p>
                <p className="mt-1 text-sm text-white/72">Try alternate framings before you speak</p>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden">
                <BranchThread />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden">
        <CanvasPanel />
      </div>
    </div>
  )

  const mobileLayout = (
    <div className="flex h-screen flex-col overflow-hidden bg-[#05060a] text-foreground md:hidden">
      <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-3.5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">DEFRAG</p>
            <h1 className="mt-1 text-base font-semibold text-white/88">Live workspace</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
            Live
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeDestination === 'Chat' && (
          <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_34%),linear-gradient(180deg,#06070d_0%,#070911_100%)]">
            <div className="border-b border-white/8 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Primary lane</p>
              <p className="mt-1 text-sm text-white/72">Keep the live interpretation visible while you reply.</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              <ChatThread />
            </div>
            <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3">
              <MessageInput compact />
            </div>
          </div>
        )}

        {activeDestination === 'Field' && (
          <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_34%),linear-gradient(180deg,#06070d_0%,#070911_100%)] px-4 py-3.5">
            <div className="space-y-3">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Field status</p>
                <p className="mt-2 text-sm leading-6 text-white/74">Keep pattern, pressure, and next step together so the moment stays readable on mobile.</p>
              </div>
              {fieldCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className={`rounded-[1.5rem] border bg-gradient-to-br ${card.tone} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/78">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/88">{card.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/66">{card.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeDestination === 'Branches' && (
          <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.08),transparent_26%),linear-gradient(180deg,#06070d_0%,#070911_100%)] px-4 py-3.5">
            <div className="space-y-3">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Branch lane</p>
                <p className="mt-2 text-sm leading-6 text-white/74">Compare alternative openings without turning the workspace into a generic control panel.</p>
              </div>
              {branchCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/78">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/88">{card.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/66">{card.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeDestination === 'Family' && (
          <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(94,234,212,0.08),transparent_26%),linear-gradient(180deg,#06070d_0%,#070911_100%)] px-4 py-3.5">
            <div className="space-y-3">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">System view</p>
                <p className="mt-2 text-sm leading-6 text-white/74">Keep the family and pattern context readable while you hold the present conversation.</p>
              </div>
              {familyCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/78">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/88">{card.title}</p>
                          <p className="mt-2 text-sm leading-6 text-white/66">{card.description}</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                        {card.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeDestination === 'Brief' && (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(135,89,255,0.12),transparent_34%),linear-gradient(180deg,#06070d_0%,#070911_100%)] px-4 py-4">
            <div>
              <div className="rounded-[1.7rem] border border-white/8 bg-white/[0.04] p-5 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Daily brief</p>
                <h2 className="mt-3 text-2xl font-semibold text-white/90">What matters most right now</h2>
                <p className="mt-3 text-sm leading-6 text-white/66">
                  A quick read on the live field, the pressure in play, and the next repair move worth trying.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {briefItems.map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/8 bg-[#0a0c13]/96 backdrop-blur-xl">
        <div className="flex safe-area-inset-bottom">
          {mobileDestinations.map((destination) => {
            const Icon = destination.icon
            const isActive = activeDestination === destination.id

            return (
              <button
                key={destination.id}
                onClick={() => setActiveDestination(destination.id)}
                className={`flex flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-white/46 hover:text-white/72'
                }`}
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${
                    isActive
                      ? 'border-primary/18 bg-primary/12 text-primary/90 shadow-[0_10px_25px_rgba(76,29,149,0.22)]'
                      : 'border-white/8 bg-white/[0.04]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>{destination.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  )
}
