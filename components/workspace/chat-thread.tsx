interface Message {
  id: string
  author: string
  content: string
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'User',
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
    author: 'User',
    content: 'I see. What if we frame it differently?',
    timestamp: '10:34 AM',
  },
]

export function ChatThread() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {mockMessages.map((message) => (
        <div key={message.id} className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground tracking-wide">{message.author}</span>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {message.content}
          </p>
        </div>
      ))}
    </div>
  )
}
