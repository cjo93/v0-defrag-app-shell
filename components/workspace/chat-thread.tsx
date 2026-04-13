'use client'

import { useMemo, useState } from 'react'
import { type DefragStructuredResponse } from '@/lib/defrag/schemas'
import { BasedOnDisclosure } from './based-on-disclosure'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'


export type WorkspaceMessage = {
  id: string
  // New canonical shape used by ChatThread
  role?: 'user' | 'assistant'
  content: string
  created_at?: string

  // Legacy/expanded fields used elsewhere in the workspace until fully migrated
  author?: string
  timestamp?: string
  type?: 'interpretation' | 'insight' | 'user' | 'rewrite'
  sources?: {
    name: string
    description: string
    detail: string
  }[]
  followUp?: {
    label: string
    action: string
  }[]
  // Structured AI response when available
  structured?: DefragStructuredResponse
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
  onRetryGeneration?: (lastUserMessageId?: string) => Promise<void>
}

export function ChatThread({
  messages = initialWorkspaceMessages,
  isSubmitting = false,
  errorMessage = null,
  onRetryGeneration,
}: ChatThreadProps) {
  // ...existing code...
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
                (() => {
                  const read = message.structured
                  if (read) {
                    return (
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider">Signal</p>
                          <p className="text-white/90 text-sm">{read.responseText}</p>
                        </div>

                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider">Risk</p>
                          <p className="text-white/75 text-sm">{read.rationale?.[0]?.summary ?? ''}</p>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Next move</p>

                          <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-3">
                            <p className="text-white text-sm font-medium">{read.suggestedNextStep}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  // If structured is missing, show an error block with retry option
                  return (
                    <div className="rounded-2xl border border-amber-400/18 bg-amber-400/8 px-4 py-3 text-sm leading-6 text-amber-50/88">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">We couldn\'t finish the read.</div>
                          <div className="text-sm mt-1">Something interrupted the assistant response. You can retry or save your message to try again.</div>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => onRetryGeneration?.(message.id)}
                            className="rounded-full bg-amber-500/90 px-3 py-1 text-sm font-semibold text-white"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()
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
