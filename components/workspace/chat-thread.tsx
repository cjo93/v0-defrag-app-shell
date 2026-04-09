'use client'

import { BasedOnDisclosure } from './based-on-disclosure'
import { Button } from '@/components/ui/button'
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
    content: 'They likely interpreted "we need to talk" as criticism or accusation, rather than collaborative problem-solving. The phrase itself can trigger defensiveness before the conversation even starts.',
    timestamp: '2:15 PM',
    type: 'interpretation',
    sources: [
      {
        name: 'How they build trust',
        description: 'Testing before opening up',
        detail: 'They may need to test ideas before trusting them—defensive response could be checking if you mean well'
      },
      {
        name: 'Safety patterns',
        description: 'How they learned to protect themselves',
        detail: 'They may have learned to check for reliability before opening up—could be sensing pressure in your tone'
      },
      {
        name: 'Current stress level',
        description: 'What they may already be carrying',
        detail: 'If they are already at capacity, even neutral wording can feel threatening regardless of your intent'
      }
    ],
    followUp: [
      { label: 'What makes you say that?', action: 'expand_sources' },
      { label: 'Try another approach', action: 'show_simulations' },
      { label: 'Walk me through this', action: 'expand_detail' },
    ]
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
    content: 'Leading with validation ("I know this is hard for you") before presenting the issue can shift them from defensive to collaborative. This signals you see them, not just the problem.',
    timestamp: '2:17 PM',
    type: 'insight',
    sources: [
      {
        name: 'Current timing',
        description: 'What may be heightened right now',
        detail: 'Themes around relationship integrity may be more present—they may be evaluating commitment more carefully'
      },
      {
        name: 'Pressure context',
        description: 'What this moment may amplify',
        detail: "Emphasis on honesty and accountability may be stronger right now—their defensiveness could signal they're checking if you mean it"
      },
      {
        name: 'Safety before solving',
        description: 'How they may need to process',
        detail: 'Validation first signals safety; acknowledgment of their experience helps them shift from reactive to collaborative'
      }
    ],
    followUp: [
      { label: 'Show me what this is based on', action: 'expand_sources' },
      { label: 'Practice the conversation', action: 'open_practice' },
      { label: "That doesn't sound like them", action: 'alternative_framing' },
    ]
  },
]

export function ChatThread() {
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {mockMessages.map((message) => {
        const isDefrag = message.author === 'Defrag'
        const isInsight = message.type === 'insight'
        const isExpanded = expandedMessage === message.id
        
        return (
          <div key={message.id} className="space-y-2 animate-in fade-in-50">
            <div className="flex items-center justify-between px-1">
              <span className={`text-xs font-semibold tracking-wider uppercase ${
                isDefrag ? 'text-primary/90' : 'text-foreground/80'
              }`}>
                {message.author}
                {isInsight && <span className="ml-2 text-xs font-light text-primary/70">• Key insight</span>}
              </span>
              <span className="text-xs text-muted-foreground/50 font-light">{message.timestamp}</span>
            </div>
            <div className={`px-4 py-3.5 rounded-lg border transition-all ${
              isDefrag 
                ? isInsight
                  ? 'bg-primary/12 border-primary/30 text-foreground ring-1 ring-primary/10 font-medium'
                  : 'bg-primary/8 border-primary/20 text-foreground' 
                : 'bg-background/50 border-border/40 text-foreground/90'
            }`}>
              <p className={`text-sm leading-relaxed font-light ${isInsight ? 'font-medium text-primary/95' : ''}`}>
                {message.content}
              </p>
              {isDefrag && message.sources && (
                <div className="mt-3 pt-3 border-t border-border/20">
                  <BasedOnDisclosure sources={message.sources} />
                </div>
              )}
            </div>

            {/* Follow-up Actions - Product-Native */}
            {isDefrag && message.followUp && (
              <div className="flex flex-wrap gap-2 px-1">
                {message.followUp.map((action, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all"
                    onClick={() => setExpandedMessage(isExpanded && expandedMessage === message.id ? null : message.id)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
