'use client'

import { useState } from 'react'

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  type?: 'interpretation' | 'insight' | 'user'
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

const mockMessages: Message[] = [
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
      'They likely interpreted “we need to talk” as criticism or accusation rather than collaboration. The phrase may have triggered defense before the topic itself arrived.',
    timestamp: '2:15 PM',
    type: 'interpretation',
    sources: [
      {
        name: 'Trust pattern',
        description: 'They test safety before they open.',
        detail: 'A defensive response may be a check for whether you are coming toward them or at them.',
      },
      {
        name: 'Stress load',
        description: 'Capacity already looked thin.',
        detail: 'When someone is already strained, even neutral wording can arrive as threat.',
      },
    ],
    followUp: [
      { label: 'Why this read?', action: 'expand_sources' },
      { label: 'Show better opening', action: 'show_simulations' },
      { label: 'Map the split', action: 'expand_detail' },
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
      'Leading with validation before the issue can move them from bracing to listening. It signals that you see their experience, not only the problem you want to solve.',
    timestamp: '2:17 PM',
    type: 'insight',
    sources: [
      {
        name: 'Safety before solving',
        description: 'Regulation supports collaboration.',
        detail: 'Validation first helps the nervous system stand down enough for actual conversation.',
      },
      {
        name: 'Timing',
        description: 'Relational integrity feels louder right now.',
        detail: 'They may be checking whether your approach is care or criticism more than usual.',
      },
    ],
    followUp: [
      { label: 'Practice this branch', action: 'open_practice' },
      { label: 'What supports this?', action: 'expand_sources' },
      { label: 'Offer another angle', action: 'alternative_framing' },
    ],
  },
]

export function ChatThread() {
  const [expandedMessage, setExpandedMessage] = useState<string | null>('4')

  return (
    <div className="space-y-5 p-4">
      {mockMessages.map((message) => {
        const isDefrag = message.author === 'Defrag'
        const isExpanded = expandedMessage === message.id

        return (
          <div key={message.id} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isDefrag ? 'text-stone-400' : 'text-stone-500'}`}>
                  {message.author}
                </span>
                {message.type === 'insight' && (
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    Key pattern
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-600">{message.timestamp}</span>
            </div>

            {isDefrag ? (
              <div className="overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.04]">
                <div className="border-b border-white/8 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                    {message.type === 'insight' ? 'Active interpretation' : 'Working read'}
                  </p>
                </div>
                <div className="space-y-4 p-4">
                  <p className="text-sm leading-7 text-stone-100">{message.content}</p>

                  {message.sources && (
                    <div className="space-y-2">
                      {message.sources.map((source) => (
                        <button
                          key={source.name}
                          onClick={() => setExpandedMessage(isExpanded ? null : message.id)}
                          className="block w-full rounded-2xl border border-white/8 bg-[#141516] p-3 text-left transition hover:bg-white/[0.04]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-stone-200">{source.name}</p>
                              <p className="mt-1 text-xs leading-5 text-stone-500">{source.description}</p>
                            </div>
                            <span className="text-xs text-stone-600">{isExpanded ? 'Hide' : 'Open'}</span>
                          </div>
                          {isExpanded && <p className="mt-3 text-sm leading-6 text-stone-300">{source.detail}</p>}
                        </button>
                      ))}
                    </div>
                  )}

                  {message.followUp && (
                    <div className="flex flex-wrap gap-2">
                      {message.followUp.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => setExpandedMessage(isExpanded ? null : message.id)}
                          className="rounded-full border border-white/8 bg-[#141516] px-3 py-2 text-xs font-semibold text-stone-300 transition hover:bg-white/[0.05]"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-[22px] border border-white/8 bg-[#121314] p-4">
                <p className="text-sm leading-7 text-stone-200">{message.content}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
