'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
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
import { Button } from '@/components/ui/button'
import { BranchThread } from './branch-thread'
import { CanvasPanel } from './canvas-panel'
import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'

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
] as const

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
] as const

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
] as const

const briefItems = [
  'Right now the field shows urgency getting mistaken for blame.',
  'Validation-first language remains the strongest repair move.',
  'Tomorrow morning looks cleaner than pushing harder tonight.',
]

const summaryCards = [
  {
    title: 'Interpretation',
    detail: 'Keep what they may be hearing visible while you reply.',
  },
  {
    title: 'Simulation',
    detail: 'Compare alternate openings without losing the live thread.',
  },
  {
    title: 'Field',
    detail: 'Hold pattern, pressure, and next move in one place.',
  },
] as const

const shellCardClass =
  'rounded-[1.8rem] border border-white/8 bg-white/[0.04] shadow-[0_24px_80px_rgba(1,4,12,0.32)] backdrop-blur'

type MobileDestination = (typeof mobileDestinations)[number]['id']

export function WorkspaceLayout() {
  const [activeDestination, setActiveDestination] = useState<MobileDestination>('Chat')
  const [isBranchOpen, setIsBranchOpen] = useState(true)

  const renderSummaryCards = () => (
    <div className="mt-4 grid gap-3 xl:grid-cols-3">
      {summaryCards.map((card) => (
        <div key={card.title} className="rounded-[1.3rem] border border-white/8 bg-black/18 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">{card.title}</p>
          <p className="mt-2 text-sm leading-6 text-white/68">{card.detail}</p>
        </div>
      ))}
    </div>
  )

  const renderConversationShell = () => (
    <div className={`${shellCardClass} flex min-h-[620px] flex-col overflow-hidden`}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Conversation repair field</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white/90">Primary workspace lanes</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
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
      </div>

      <div className={`grid min-h-0 flex-1 gap-4 p-4 sm:p-5 ${isBranchOpen ? 'xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]' : 'grid-cols-1'}`}>
        <div className="flex min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/18">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Primary lane</p>
            <p className="mt-1 text-sm leading-6 text-white/68">What may be happening in the moment</p>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <ChatThread />
          </div>
          <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3">
            <MessageInput compact />
          </div>
        </div>

        {isBranchOpen && (
          <div className="flex min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/18">
            <div className="border-b border-white/8 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Branch lane</p>
              <p className="mt-1 text-sm leading-6 text-white/68">Try alternate framings before you speak</p>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <BranchThread />
            </div>
            <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3">
              <MessageInput compact />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderMobileContent = () => {
    if (activeDestination === 'Chat') {
      return (
        <div className={`${shellCardClass} flex min-h-[420px] flex-col overflow-hidden`}>
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Primary lane</p>
            <p className="mt-1 text-sm leading-6 text-white/68">Keep the live interpretation visible while you reply.</p>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <ChatThread />
          </div>
          <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3">
            <MessageInput compact />
          </div>
        </div>
      )
    }

    if (activeDestination === 'Field') {
      return (
        <div className="space-y-3">
          <div className={`${shellCardClass} p-5`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Field status</p>
            <p className="mt-2 text-sm leading-6 text-white/68">The field keeps pattern, pressure, and next step together so the moment stays readable on mobile.</p>
          </div>
          {fieldCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className={`rounded-[1.8rem] border bg-gradient-to-br ${card.tone} p-5 shadow-[0_24px_80px_rgba(1,4,12,0.28)]`}>
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
      )
    }

    if (activeDestination === 'Branches') {
      return (
        <div className="space-y-3">
          <div className={`${shellCardClass} p-5`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Branch lane</p>
            <p className="mt-2 text-sm leading-6 text-white/68">Compare alternative openings without turning the workspace into a generic control panel.</p>
          </div>
          {branchCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className={`${shellCardClass} p-5`}>
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
      )
    }

    if (activeDestination === 'Family') {
      return (
        <div className="space-y-3">
          <div className={`${shellCardClass} p-5`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">System view</p>
            <p className="mt-2 text-sm leading-6 text-white/68">Keep the family and pattern context readable while you hold the present conversation.</p>
          </div>
          {familyCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className={`${shellCardClass} p-5`}>
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
      )
    }

    return (
      <div className="space-y-3">
        <div className={`${shellCardClass} p-5 text-center`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Daily brief</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white/90">What matters most right now</h2>
          <p className="mt-3 text-sm leading-6 text-white/66">
            A quick read on the live field, the pressure in play, and the next repair move worth trying.
          </p>
        </div>

        {briefItems.map((item) => (
          <div key={item} className={`${shellCardClass} px-5 py-4 text-sm leading-6 text-white/72`}>
            {item}
          </div>
        ))}
      </div>
    )
  }

  const desktopLayout = (
    <div className="hidden h-screen bg-[#05060a] text-foreground md:flex">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Relational workspace</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/90">Workspace</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.06),transparent_20%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:gap-6">
            <section className={`${shellCardClass} p-5 sm:p-6`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Live overview</p>
                  <h2 className="mt-2 text-lg font-semibold text-white/90">Keep the conversation field visible while you work the next move.</h2>
                </div>
                <span className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
                  Active
                </span>
              </div>
              {renderSummaryCards()}
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              {renderConversationShell()}
              <div className={`${shellCardClass} min-h-[620px] overflow-hidden`}>
                <CanvasPanel embedded />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )

  const mobileLayout = (
    <div className="flex min-h-screen flex-col bg-[#05060a] text-foreground md:hidden">
      <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Relational workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/90">Workspace</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
            Live
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_32%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <section className={`${shellCardClass} p-5`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Live overview</p>
            <h2 className="mt-2 text-lg font-semibold text-white/90">Keep the field readable on iPhone without changing the workspace logic.</h2>
            {renderSummaryCards()}
          </section>

          {renderMobileContent()}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-white/8 bg-[#0a0c13]/96 backdrop-blur-xl">
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
