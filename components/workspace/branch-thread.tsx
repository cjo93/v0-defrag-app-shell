interface Scenario {
  id: string
  type: 'rewrite' | 'simulation' | 'perspective'
  icon: string
  title: string
  content: string
}

const scenarios: Scenario[] = [
  {
    id: '1',
    type: 'rewrite',
    icon: '↻',
    title: 'Rewritten opening',
    content: '"I want to check in about something" removes threat signal, opens dialogue instead',
  },
  {
    id: '2',
    type: 'perspective',
    icon: '◇',
    title: 'Their interpretation layer',
    content: 'They&apos;re hearing criticism + abandonment threat. Body closes before you ask.',
  },
  {
    id: '3',
    type: 'simulation',
    icon: '⊕',
    title: 'Simulation: Lead with validation',
    content: 'If: "I value us" → They relax → Question lands → They listen → Collaboration possible',
  },
]

export function BranchThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {/* Engine Identity */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm pb-3 mb-2 border-b border-border/30">
        <p className="text-xs font-semibold text-foreground/80 tracking-wider uppercase">Simulation Engine</p>
        <p className="text-xs text-muted-foreground/60 font-light mt-1">Alternative paths &amp; scenario testing</p>
      </div>

      {/* Scenario Cards */}
      {scenarios.map((scenario) => (
        <div key={scenario.id} className="space-y-1.5 animate-in fade-in-50">
          <div className="flex items-center gap-2 px-1">
            <span className={`text-lg font-light ${
              scenario.type === 'simulation'
                ? 'text-primary/90'
                : scenario.type === 'rewrite'
                ? 'text-secondary/80'
                : 'text-muted-foreground/70'
            }`}>
              {scenario.icon}
            </span>
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
          </div>
        </div>
      ))}
    </div>
  )
}
