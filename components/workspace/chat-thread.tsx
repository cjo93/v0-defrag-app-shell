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

export interface WorkspaceMessage {
  id: string
  author: string
  content: string
  timestamp: string
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
}

export const initialWorkspaceMessages: WorkspaceMessage[] = [
  {
    id: '1',
    author: 'You',
    content: 'They seemed upset when I said we needed to talk about this.',
    timestamp: '2:14 PM',
    type: 'user',
  },
  {
    id: '2',
    author: 'Defrag',
    content:
      'They may have heard “we need to talk” as pressure before they heard your care. That can make their body brace before the conversation actually starts.',
    timestamp: '2:15 PM',
    type: 'interpretation',
    sources: [
      {
        name: 'How they build trust',
        description: 'Testing before opening up',
        detail:
          'They may need to test ideas before trusting them, so a defensive response could be checking whether you are safe to engage with.',
      },
      {
        name: 'Safety patterns',
        description: 'How they learned to protect themselves',
        detail:
          'They may have learned to scan for reliability before opening up, which can make even neutral pressure feel sharper than you intended.',
      },
      {
        name: 'Current stress level',
        description: 'What they may already be carrying',
        detail:
          'If they are already at capacity, even a practical opening can sound threatening regardless of your actual intention.',
      },
    ],
    followUp: [
      { label: 'Show the signal', action: 'expand_sources' },
      { label: 'Try a softer opening', action: 'show_simulations' },
      { label: 'Walk it through', action: 'expand_detail' },
    ],
  },
  {
    id: '3',
    author: 'You',
    content: 'That makes sense. What if I acknowledged their concerns first?',
    timestamp: '2:16 PM',
    type: 'user',
  },
  {
    id: '4',
    author: 'Defrag',
    content:
      'Yes. Leading with validation first can shift the moment from defensive to collaborative because it signals that you see them before you try to solve the issue.',
    timestamp: '2:17 PM',
    type: 'insight',
    sources: [
      {
        name: 'Current timing',
        description: 'What may be heightened right now',
        detail:
          'Themes around relationship integrity may be more active right now, so they may be testing whether your tone matches your care.',
      },
      {
        name: 'Pressure context',
        description: 'What this moment may amplify',
        detail:
          'When accountability is already in the air, defensiveness can be less about disagreement and more about checking whether they are safe.',
      },
      {
        name: 'Safety before solving',
        description: 'How they may need to process',
        detail:
          'Validation first signals enough safety for them to move out of reaction and into collaboration.',
      },
    ],
    followUp: [
      { label: 'What is this reading?', action: 'expand_sources' },
      { label: 'Practice the wording', action: 'open_practice' },
      { label: 'Offer another frame', action: 'alternative_framing' },
    ],
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
  const [expandedMessage, setExpandedMessage] = useState<string | null>('4')

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
          const isDefrag = message.author === 'Defrag'
          const isInsight = message.type === 'insight'
          const isExpanded = expandedMessage === message.id

          return (
            <div key={message.id} className="animate-in fade-in-50 space-y-2">
              <div className="flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isDefrag ? 'text-white/42' : 'text-white/34'
                    }`}
                  >
                    {message.author}
                  </span>
                  {isInsight && (
                    <span className="rounded-full border border-primary/16 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/85">
                      Key read
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-white/28">{message.timestamp}</span>
              </div>

              {isDefrag ? (
                <div
                  className={`overflow-hidden rounded-[1.55rem] border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-colors sm:p-5 ${
                    isInsight
                      ? 'border-primary/20 bg-gradient-to-br from-primary/12 via-primary/6 to-black/20'
                      : 'border-white/10 bg-gradient-to-br from-white/[0.055] via-white/[0.03] to-black/16'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          isInsight
                            ? 'border-primary/18 bg-primary/10 text-primary/85'
                            : 'border-white/10 bg-white/[0.05] text-white/52'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${message.type === 'rewrite' ? 'bg-amber-400' : isInsight ? 'bg-primary' : 'bg-emerald-300'} shadow-[0_0_10px_rgba(255,255,255,0.35)]`} />
                        {message.type === 'rewrite' ? 'Rewrite' : isInsight ? 'What may help next' : 'What they may be reacting to'}
                      </span>
                    </div>

                    <p className="text-[15px] leading-7 text-white/84 sm:text-base">{message.content}</p>

                    {message.followUp && (
                      <div className="flex flex-wrap gap-2">
                        {message.followUp.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => setExpandedMessage((current) => (current === message.id ? null : message.id))}
                            className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.045] px-3.5 text-sm font-medium text-white/72 transition-colors hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                          >
                            <span className="text-[10px] uppercase tracking-[0.16em] text-white/38">
                              {actionLabels[item.action] ?? 'Next'}
                            </span>
                            <span className="ml-2">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {message.sources && (
                      <BasedOnDisclosure
                        compactLabel="Signals in view"
                        expanded={isExpanded}
                        onToggle={() =>
                          setExpandedMessage((current) => (current === message.id ? null : message.id))
                        }
                        sources={message.sources}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="ml-auto max-w-[94%] rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px] leading-7 text-white/78 sm:max-w-[80%] sm:rounded-[1.45rem]">
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
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">
                Reading
              </span>
            </div>
            <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/56">
              Building the next read…
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
