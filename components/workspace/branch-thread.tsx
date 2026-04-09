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
        name: 'Gene Keys: Shadow to Gift',
        description: 'Communication safety',
        detail: 'Threat language ("we need to talk") activates shadow—reframe moves listener toward curiosity and gift'
      },
      {
        name: 'Nervous system: Polyvagal response',
        description: 'Threat detection impact',
        detail: 'Body closes before thinking happens—defensiveness precedes comprehension until nervous system feels safe'
      }
    ]
  },
  {
    id: '2',
    type: 'perspective',
    icon: IconPerspective,
    title: 'Their likely interpretation',
    content: 'They&apos;re hearing criticism + abandonment threat. Body closes before you ask.',
    sources: [
      {
        name: 'Relational history',
        description: 'Their protective patterns',
        detail: 'Past experiences with criticism activate defense armor before they understand your intent'
      },
      {
        name: 'Human Design: Open centers',
        description: 'Sensitivity amplification',
        detail: 'Open emotional center means they absorb your stress—already managing pressure increases threat detection'
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
        name: 'Nervous system: Regulation window',
        description: 'Safety signals downregulate threat',
        detail: 'Validation signals safety—downregulates amygdala threat response, activates prefrontal cortex thinking'
      },
      {
        name: 'Numerology: Current cycle timing',
        description: 'Receptivity readiness',
        detail: 'Connection before problem-solving aligns with current cycle emphasis—increases receptivity and repair likelihood'
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
