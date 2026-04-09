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
    title: 'Different framing',
    content: 'What if you led with appreciation first, then asked the question?',
  },
  {
    id: '2',
    type: 'perspective',
    title: 'Their likely reading',
    content: 'They may hear this as a challenge to their competence or judgment.',
  },
  {
    id: '3',
    type: 'simulation',
    title: 'If you said...',
    content: 'Try: "I noticed something and I'm wondering if I'm reading it right..."',
  },
]

export function BranchThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 p-4">
      {mockBranches.map((branch) => (
        <div key={branch.id} className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <span className={`text-xs font-semibold tracking-wide ${
              branch.type === 'simulation'
                ? 'text-primary'
                : branch.type === 'rewrite'
                ? 'text-secondary/80'
                : 'text-muted-foreground/70'
            }`}>
              {branch.type === 'simulation' ? '⊕' : branch.type === 'rewrite' ? '↻' : '◇'} {branch.title}
            </span>
          </div>
          <div className="px-3 py-2 rounded-md border border-border/40 bg-secondary/10">
            <p className="text-xs leading-relaxed font-light text-foreground">
              {branch.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
