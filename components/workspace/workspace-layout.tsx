'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { BranchThread } from './branch-thread'
import { CanvasPanel } from './canvas-panel'
import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'

const shellCardClass =
  'rounded-[1.8rem] border border-white/8 bg-white/[0.04] shadow-[0_24px_80px_rgba(1,4,12,0.32)] backdrop-blur'

export function WorkspaceLayout() {
  const [showAlternatives, setShowAlternatives] = useState(false)

  const conversationPanel = (
    <section className={`${shellCardClass} flex min-h-[640px] flex-col overflow-hidden md:min-h-[720px]`}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Conversation</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white/90">Work the moment in one primary lane</h2>
          </div>

          <button
            onClick={() => setShowAlternatives((value) => !value)}
            className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors sm:min-h-10 sm:w-auto ${
              showAlternatives
                ? 'border-primary/18 bg-primary/12 text-primary/90 hover:bg-primary/16'
                : 'border-white/10 bg-white/[0.04] text-white/74 hover:border-white/16 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {showAlternatives ? 'Hide alternate framings' : 'Show alternate framings'}
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatThread />
      </div>

      <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3 sm:px-5">
        <MessageInput compact />
      </div>

      {showAlternatives && (
        <div className="border-t border-white/8 bg-black/14">
          <div className="border-b border-white/8 px-5 py-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Alternate framings</p>
            <p className="mt-1 text-sm leading-6 text-white/62">Keep practice paths available, but secondary to the main conversation.</p>
          </div>
          <div className="max-h-[300px] overflow-y-auto sm:max-h-[360px]">
            <BranchThread />
          </div>
        </div>
      )}
    </section>
  )

  const readingPanel = (
    <section className={`${shellCardClass} min-h-[auto] overflow-hidden md:min-h-[720px]`}>
      <CanvasPanel embedded />
    </section>
  )

  const introPanel = (
    <section className={`${shellCardClass} p-5 sm:p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Live overview</p>
          <h2 className="mt-2 text-lg font-semibold text-white/90">Keep the conversation on the left and the read on the right.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66">
            The workspace stays focused on one thread, one interpretation, one next move, and one rewrite.
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
          Live
        </span>
      </div>
    </section>
  )

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
            {introPanel}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              {conversationPanel}
              {readingPanel}
            </div>
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

      <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_32%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {introPanel}
          {conversationPanel}
          {readingPanel}
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
