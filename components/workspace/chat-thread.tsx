'use client'

import { useMemo, useState } from 'react'
import { BasedOnDisclosure } from './based-on-disclosure'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'


type WorkspaceMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export const initialWorkspaceMessages: WorkspaceMessage[] = [
  {
    id: 'seed-1',
    role: 'assistant',
    content: "Start with a moment. We'll map it clearly.",
  },
  {
    id: 'seed-2',
    role: 'assistant',
    content:
      "What happened, what you meant, and what landed can be different. Let's make that visible.",
  },
]

const actionLabels: Record<string, string> = {
  expand_sources: 'Signal trace',
  show_simulations: 'Branch lane',
  expand_detail: 'Deeper read',
  open_practice: 'Practice',
  alternative_framing: 'Alternate frame',
}

type ChatThreadProps = {
  messages?: WorkspaceMessage[]
  isSubmitting?: boolean
  errorMessage?: string | null
}

export function ChatThread({
  messages = initialWorkspaceMessages,
  isSubmitting = false,
  errorMessage = null,
}: ChatThreadProps) {
  const renderedMessages = useMemo(() => messages, [messages])

  if (renderedMessages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-3 py-3.5 sm:px-4 sm:py-5">
        <Empty className="rounded-[1.55rem] border border-white/10 bg-white/[0.035] text-white">
          <EmptyHeader>
            <EmptyTitle className="text-white/88">No conversation yet</EmptyTitle>
            <EmptyDescription className="text-white/56">
              Start with what happened, what was said, or what felt off in the moment.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="text-white/48">
            Defrag will keep the thread readable here as soon as you bring the moment in.
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3.5 sm:px-4 sm:py-5">
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
        {errorMessage && (
          <div className="rounded-[1.35rem] border border-amber-400/18 bg-amber-400/8 px-4 py-3 text-sm leading-6 text-amber-50/88">
            {errorMessage}
          </div>
        )}
        {renderedMessages.map((message) => {
          const isAssistant = message.role === 'assistant'
          return (
            <div key={message.id} className="animate-in fade-in-50 space-y-2">
              <div className="flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isAssistant ? 'text-white/42' : 'text-white/34'}`}>
                    {isAssistant ? 'Defrag' : 'You'}
                  </span>
                </div>
                {message.created_at && (
                  <span className="text-[11px] font-medium text-white/28">{message.created_at}</span>
                )}
              </div>
              {isAssistant ? (
                <div className="overflow-hidden rounded-[1.55rem] border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-colors sm:p-5 border-white/10 bg-white/5">
                  <p className="text-[15px] leading-7 text-white/84 sm:text-base">{message.content}</p>
                </div>
              ) : (
                <div className="ml-auto max-w-[94%] rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] leading-7 text-white/78 sm:max-w-[80%] sm:rounded-[1.45rem]">
                  {message.content}
                </div>
              )}
            </div>
          )
        })}
        {isSubmitting && (
          <div className="animate-in fade-in-50 space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Defrag</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">
                Reading
              </span>
            </div>
            <div className="rounded-[1.45rem] border border-white/10 bg-white/4 px-4 py-4 text-sm text-white/56">
              {/* Loading... */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
