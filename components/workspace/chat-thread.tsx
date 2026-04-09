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
    content: 'How are we feeling about the current approach?',
    timestamp: '10:32 AM',
  },
  {
    id: '2',
    author: 'Defrag',
    content: 'They may be reading this as uncertainty. Consider showing confidence in the direction while inviting collaboration.',
    timestamp: '10:33 AM',
  },
  {
    id: '3',
    author: 'You',
    content: 'I see. What if we frame it differently?',
    timestamp: '10:34 AM',
  },
]

export function ChatThread() {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-5">
      {mockMessages.map((message) => {
        const isDefrag = message.author === 'Defrag'
        return (
          <div key={message.id} className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className={`text-xs font-semibold tracking-wide ${
                isDefrag ? 'text-primary' : 'text-foreground'
              }`}>
                {message.author}
              </span>
              <span className="text-xs text-muted-foreground/70">{message.timestamp}</span>
            </div>
            <div className={`px-3 py-2.5 rounded-md border ${
              isDefrag 
                ? 'bg-secondary/20 border-secondary/40 text-foreground' 
                : 'bg-background border-border/50 text-foreground'
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
