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
        name: 'Communication research',
        description: 'Threat signal detection',
        detail: '"We need to talk" is a documented threat phrase—suggests problem, criticism, or rejection incoming'
      },
      {
        name: 'Nervou system response',
        description: 'How threat activates',
        detail: 'Body closes before thinking happens—defensiveness precedes comprehension'
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
        name: 'Attachment patterns',
        description: 'Their relational history',
        detail: 'Past experiences with criticism may activate defensive armor before they understand your intent'
      },
      {
        name: 'Current state',
        description: 'Their stress capacity',
        detail: 'Already managing pressure—threat detection heightened, receptivity lowered'
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
        name: 'Attachment theory',
        description: 'Nervous system regulation',
        detail: 'Validation signals safety—downregulates threat response, activates thinking brain'
      },
      {
        name: 'Timing research',
        description: 'When conversations work',
        detail: 'Connection before problem-solving increases receptivity and repair likelihood'
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
