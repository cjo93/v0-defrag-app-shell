'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  if (compact) {
    return (
      <div className="border-t border-border/30 bg-background p-3 space-y-2">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add message..."
            className="bg-background border-border/40 text-foreground text-xs font-light placeholder:text-muted-foreground/40"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button onClick={handleSend} size="sm" className="px-3 h-8 text-xs bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium">
            Send
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border/30 bg-background p-4 space-y-2.5">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe a moment..."
          className="bg-background border-border/40 text-foreground text-sm font-light placeholder:text-muted-foreground/50"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button onClick={handleSend} size="sm" className="px-4 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium">
          Send
        </Button>
      </div>
      <p className="text-xs text-muted-foreground/60 font-light px-1">
        Defrag shows relational context and other perspectives
      </p>
    </div>
  )
}
