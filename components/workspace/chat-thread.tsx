interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  type?: 'interpretation' | 'insight' | 'user'
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
    content: 'They likely interpreted "we need to talk" as criticism or accusation, rather than collaborative problem-solving. Their upset reaction signals defensiveness.',
    timestamp: '2:15 PM',
    type: 'interpretation',
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
    content: 'Key insight: Leading with validation ("I know this is hard for you") before presenting the issue can shift them from defensive to collaborative. This signals you see them, not just the problem.',
    timestamp: '2:17 PM',
    type: 'insight',
  },
]

export function ChatThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {mockMessages.map((message) => {
        const isDefrag = message.author === 'Defrag'
        const isInsight = message.type === 'insight'
        
        return (
          <div key={message.id} className="space-y-1.5 animate-in fade-in-50">
            <div className="flex items-center justify-between px-0.5">
              <span className={`text-xs font-semibold tracking-wider ${
                isDefrag ? 'text-primary/90' : 'text-foreground/80'
              }`}>
                {message.author}
                {isInsight && <span className="ml-2 text-xs font-light text-primary/70">• Key insight</span>}
              </span>
              <span className="text-xs text-muted-foreground/50 font-light">{message.timestamp}</span>
            </div>
            <div className={`px-3.5 py-3 rounded-lg border transition-all ${
              isDefrag 
                ? isInsight
                  ? 'bg-primary/12 border-primary/30 text-foreground ring-1 ring-primary/10'
                  : 'bg-primary/8 border-primary/20 text-foreground' 
                : 'bg-background/50 border-border/40 text-foreground/90'
            }`}>
              <p className="text-sm leading-relaxed font-light">
                {message.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
