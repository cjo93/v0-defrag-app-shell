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
    <div className="border-t border-border bg-card p-4 space-y-3">
      <div className="flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="bg-secondary border-border text-foreground"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button onClick={handleSend} size="sm">
          Send
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Defrag helps you see how the other person may be reading the moment.
      </p>
    </div>
  )
}
