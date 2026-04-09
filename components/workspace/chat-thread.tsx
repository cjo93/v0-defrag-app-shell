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
            {/* Generative UI Surface - Intelligence Panel */}
            {isDefrag ? (
              <div className="space-y-3 relative group">
                {/* Primary Insight Panel */}
                <div className={`relative overflow-hidden transition-all duration-300 ${
                  isInsight
                    ? 'bg-gradient-to-br from-primary/14 via-primary/8 to-primary/6 border border-primary/30'
                    : 'bg-gradient-to-br from-primary/10 via-primary/6 to-primary/4 border border-primary/25'
                } rounded-xl p-5`}>
                  {/* Subtle ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="relative z-10 space-y-4">
                    {/* System indicator */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30">
                        <span className="w-1 h-1 rounded-full bg-primary/80 animate-pulse"></span>
                        <span className="text-[9px] font-bold text-primary/90 tracking-wider uppercase">Analyzing</span>
                      </span>
                      {isInsight && (
                        <span className="text-[9px] font-semibold text-primary/60 uppercase tracking-wider">Key Pattern</span>
                      )}
                    </div>
                    
                    {/* Main insight */}
                    <p className="text-sm leading-relaxed text-foreground/95 font-medium">
                      {message.content}
                    </p>
                  </div>
                </div>

                {/* Dynamic Signal Blocks - Structured Intelligence */}
                {message.sources && message.sources.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-primary/20">
                    {message.sources.map((source, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group/signal"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/15 border border-primary/30 flex-shrink-0 mt-0.5">
                            <span className="w-1 h-1 rounded-full bg-primary/80"></span>
                          </span>
                          <div className="flex-1 space-y-1">
                            <p className="text-xs font-bold text-foreground tracking-tight">{source.name}</p>
                            <p className="text-[11px] text-muted-foreground/80 font-light leading-relaxed">{source.description}</p>
                          </div>
                        </div>
                        
                        {/* Expandable detail on hover/click */}
                        <div className="mt-2 pt-2 border-t border-border/20 opacity-0 group-hover/signal:opacity-100 transition-opacity duration-200">
                          <p className="text-[10px] text-muted-foreground/70 font-light leading-relaxed">
                            {source.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* User message - clean and simple */
              <div className="px-4 py-3 rounded-lg bg-background/60 border border-border/30 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-foreground/90 font-light">
                  {message.content}
                </p>
              </div>
            )}

            {/* Action Modules - Interactive System Controls */}
            {isDefrag && message.followUp && (
              <div className="flex flex-wrap gap-2 pl-4">
                {message.followUp.map((action, idx) => (
                  <button
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground/80 bg-background/60 backdrop-blur-sm border border-border/40 rounded-lg hover:border-primary/50 hover:bg-primary/8 hover:text-foreground transition-all duration-200 group/action"
                    onClick={() => setExpandedMessage(isExpanded && expandedMessage === message.id ? null : message.id)}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60 group-hover/action:bg-primary/90 transition-colors"></span>
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
