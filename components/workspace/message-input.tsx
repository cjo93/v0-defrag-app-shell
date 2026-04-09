'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function MessageInput() {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  return (
    <div className="border-t border-border/50 bg-background p-4 space-y-2.5">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe a moment..."
          className="bg-background border-border/50 text-foreground text-sm font-light placeholder:text-muted-foreground/50"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button onClick={handleSend} size="sm" className="px-4">
          Send
        </Button>
      </div>
      <p className="text-xs text-muted-foreground/70 font-light px-1">
        Defrag reveals how the other person may be reading the interaction
      </p>
    </div>
  )
}
