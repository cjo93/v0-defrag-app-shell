'use client'

import { BasedOnDisclosure } from './based-on-disclosure'
import { IconRewrite, IconPerspective, IconSimulations } from '@/components/icons/DefragIcons'

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

const scenarios: Scenario[] = [
  {
    id: '1',
    type: 'rewrite',
    icon: IconRewrite,
    title: 'Rewritten opening',
    content: '"I want to check in about something" removes threat signal, opens dialogue instead',
    sources: [
      {
        name: 'Communication safety',
        description: 'How language creates openness',
        detail: 'Threat language ("we need to talk") can trigger defensiveness before understanding—reframing invites curiosity instead'
      },
      {
        name: 'Body response',
        description: 'What happens before thinking',
        detail: 'The body closes before thinking happens—defensiveness precedes comprehension until they feel safe'
      }
    ]
  },
  {
    id: '2',
    type: 'perspective',
    icon: IconPerspective,
    title: 'Their likely interpretation',
    content: 'They may be hearing criticism and threat. Their body may close before you finish the question.',
    sources: [
      {
        name: 'Relational history',
        description: 'Their protective patterns',
        detail: 'Past experiences with criticism can activate defense armor before they understand your intent'
      },
      {
        name: 'Sensitivity to pressure',
        description: 'What they may already be feeling',
        detail: 'They may absorb stress from others—if already managing pressure, threat detection increases'
      }
    ]
  },
  {
    id: '3',
    type: 'simulation',
    icon: IconSimulations,
    title: 'Try leading with validation',
    content: 'If you say "I know this is hard for you" first → They feel heard → Then the question lands → They can listen',
    sources: [
      {
        name: 'Safety before solving',
        description: 'How the nervous system works',
        detail: 'Validation signals safety first—helps them shift from reactive to thinking mode before problem-solving'
      },
      {
        name: 'What may help now',
        description: 'Connection before correction',
        detail: 'Leading with empathy matches what they need in this moment—increases receptivity and repair likelihood'
      }
    ]
  },
]

export function BranchThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm pb-3 mb-2 border-b border-border/30">
        <p className="text-xs font-semibold text-foreground/80 tracking-wider uppercase">Try another approach</p>
        <p className="text-xs text-muted-foreground/60 font-light mt-1">Alternative ways to land this conversation</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {['Acknowledge', 'You', 'Them', 'Dynamic', 'Timing', 'Next'].map((step) => (
            <span key={step} className="inline-flex items-center rounded-full border border-border/40 bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground/80">
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Scenario Cards */}
      {scenarios.map((scenario) => {
        const Icon = scenario.icon
        return (
        <div key={scenario.id} className="space-y-2 animate-in fade-in-50">
          <div className="flex items-center gap-2 px-1">
            <Icon className={`w-5 h-5 ${
              scenario.type === 'simulation'
                ? 'text-primary/90'
                : scenario.type === 'rewrite'
                ? 'text-secondary/80'
                : 'text-muted-foreground/70'
            }`} />
            <span className={`text-xs font-semibold tracking-wide uppercase ${
              scenario.type === 'simulation'
                ? 'text-primary'
                : scenario.type === 'rewrite'
                ? 'text-secondary/90'
                : 'text-muted-foreground/80'
            }`}>
              {scenario.title}
            </span>
          </div>
          <div className={`px-4 py-3.5 rounded-lg border transition-all ${
            scenario.type === 'simulation'
              ? 'bg-primary/12 border-primary/30 ring-1 ring-primary/10'
              : 'bg-secondary/10 border-secondary/30'
          }`}>
            <div className="mb-2 inline-flex items-center rounded-full border border-border/30 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-foreground/70">
              {scenario.type === 'rewrite' ? 'What to say' : scenario.type === 'perspective' ? 'How they may hear it' : 'Likely outcome'}
            </div>
            <p className="text-sm leading-relaxed font-light text-foreground">
              {scenario.content}
            </p>
            {scenario.sources && (
              <BasedOnDisclosure sources={scenario.sources} />
            )}
          </div>
        </div>
      )
      })}
    </div>
  )
}
