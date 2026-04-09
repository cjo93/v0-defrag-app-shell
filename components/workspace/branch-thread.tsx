interface Message {
  id: string
  type: 'simulation' | 'rewrite' | 'perspective'
  title: string
  content: string
}

const mockBranches: Message[] = [
  {
    id: '1',
    type: 'rewrite',
    title: 'Alternative phrasing',
    content: '"I want to check in about something" opens dialogue rather than positions it as a problem.',
  },
  {
    id: '2',
    type: 'perspective',
    title: 'Their likely interpretation',
    content: 'They&apos;re hearing threat/criticism. Their body language will close before they hears the actual ask.',
  },
  {
    id: '3',
    type: 'simulation',
    title: 'Simulation: What happens if…',
    content: 'If you soften the lead: "I really value us" → they relax → you can ask the harder question → they&apos;re actually listening.',
  },
]

export function BranchThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {/* Branch Header */}
      <div className="border-b border-border/30 pb-4 mb-2 sticky top-0 bg-background/80 backdrop-blur-sm">
        <p className="text-xs font-semibold text-foreground/80 tracking-wider uppercase">Alternate Paths</p>
        <p className="text-xs text-muted-foreground/60 font-light mt-1.5">Simulation mode: What else could happen</p>
      </div>

      {/* Branch Items */}
      {mockBranches.map((branch) => (
        <div key={branch.id} className="space-y-1.5 animate-in fade-in-50">
          <div className="flex items-center gap-2 px-1">
            <span className={`text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 ${
              branch.type === 'simulation'
                ? 'text-primary'
                : branch.type === 'rewrite'
                ? 'text-secondary/80'
                : 'text-muted-foreground/70'
            }`}>
              <span>{branch.type === 'simulation' ? '⊕' : branch.type === 'rewrite' ? '↻' : '◇'}</span>
              <span>{branch.title}</span>
            </span>
          </div>
          <div className={`px-3.5 py-3 rounded-lg border transition-all ${
            branch.type === 'simulation'
              ? 'bg-secondary/15 border-secondary/40 ring-1 ring-secondary/20'
              : 'bg-secondary/8 border-secondary/30'
          }`}>
            <p className="text-sm leading-relaxed font-light text-foreground">
              {branch.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
