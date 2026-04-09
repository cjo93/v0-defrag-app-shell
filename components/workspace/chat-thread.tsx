interface Message {
  id: string
  author: string
  content: string
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'You',
    content: 'They seemed upset when I said we needed to talk about this.',
    timestamp: '2:14 PM',
  },
  {
    id: '2',
    author: 'Defrag',
    content: 'They may have heard "we have a problem with you" rather than "we need to work through something together." Leading with understanding first can shift their response.',
    timestamp: '2:15 PM',
  },
  {
    id: '3',
    author: 'You',
    content: 'That makes sense. What if I acknowledged their concerns first?',
    timestamp: '2:16 PM',
  },
]

export function ChatThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-3.5 p-4">
      {mockMessages.map((message) => {
        const isDefrag = message.author === 'Defrag'
        return (
          <div key={message.id} className="space-y-1.5 animate-in fade-in-50">
            <div className="flex items-center justify-between px-0.5">
              <span className={`text-xs font-semibold tracking-wider ${
                isDefrag ? 'text-primary/90' : 'text-foreground/80'
              }`}>
                {message.author}
              </span>
              <span className="text-xs text-muted-foreground/50 font-light">{message.timestamp}</span>
            </div>
            <div className={`px-3 py-2.5 rounded-lg border transition-all ${
              isDefrag 
                ? 'bg-primary/8 border-primary/20 text-foreground' 
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
