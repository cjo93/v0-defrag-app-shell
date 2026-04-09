# Phase 2: Frontend Wiring Guide

## Overview

The WorkspaceLayout is already structured for data integration:
- **Left side:** ChatThread (primary) + BranchThread (conditional)
- **Right side:** CanvasPanel
- **Message input:** MessageInput (compact on mobile/desktop)

This guide shows exact wiring to connect API routes to UI components.

---

## Step 1: Workspace Data Management

Create a new hook in `lib/hooks/useWorkspace.ts`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useCallback } from 'react'

type Workspace = {
  id: string
  title: string
  user_id: string
  created_at: string
}

type Thread = {
  id: string
  workspace_id: string
  kind: 'primary' | 'branch'
  title: string
}

type Message = {
  id: string
  thread_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  structured_output?: any
  created_at: string
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [primaryThread, setPrimaryThread] = useState<Thread | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize workspace on mount
  useEffect(() => {
    initializeWorkspace()
  }, [])

  const initializeWorkspace = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'My workspace' }),
      })
      
      if (!response.ok) throw new Error('Failed to create workspace')
      
      const { workspace } = await response.json()
      setWorkspace(workspace)
      
      // Load primary thread
      const threadResponse = await fetch(`/api/threads?workspace_id=${workspace.id}`)
      const { threads } = await threadResponse.json()
      const primary = threads.find((t: Thread) => t.kind === 'primary')
      setPrimaryThread(primary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!primaryThread) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/threads/${primaryThread.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      
      if (!response.ok) throw new Error('Failed to send message')
      
      const { userMessage, assistantMessage, structured } = await response.json()
      
      // Update local state with new messages
      setMessages(prev => [...prev, userMessage, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [primaryThread])

  return {
    workspace,
    primaryThread,
    messages,
    loading,
    error,
    sendMessage,
  }
}
```

---

## Step 2: Wire ChatThread to API

Update `components/workspace/chat-thread.tsx` to use real data:

```typescript
'use client'

import { useWorkspace } from '@/lib/hooks/useWorkspace'
import { BasedOnDisclosure } from './based-on-disclosure'

export function ChatThread() {
  const { messages, loading } = useWorkspace()

  if (loading && messages.length === 0) {
    return <div className="p-4 text-sm text-muted-foreground">Loading...</div>
  }

  return (
    <div className="space-y-4 p-4">
      {messages.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Start a conversation. Describe a moment or ask for clarity.
        </div>
      ) : (
        messages.map((message) => {
          const isDefrag = message.role === 'assistant'
          const isInsight = message.structured_output?.relationalStatus !== undefined

          return (
            <div key={message.id} className={`flex ${isDefrag ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-4 py-3.5 rounded-lg border transition-all ${
                isDefrag 
                  ? isInsight
                    ? 'bg-primary/12 border-primary/30 text-foreground ring-1 ring-primary/10 font-medium'
                    : 'bg-primary/8 border-primary/20 text-foreground' 
                  : 'bg-background/50 border-border/40 text-foreground/90'
              }`}>
                <p className={`text-sm leading-relaxed font-light ${isInsight ? 'font-medium text-primary/95' : ''}`}>
                  {message.content}
                </p>
                
                {/* Render "Based on" disclosure if structured output exists */}
                {isDefrag && message.structured_output?.rationale && (
                  <BasedOnDisclosure sources={message.structured_output.rationale.map((r: any) => ({
                    name: r.label,
                    description: r.summary,
                    detail: r.details?.[0] || ''
                  }))} />
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
```

---

## Step 3: Wire MessageInput to Send Messages

Update `components/workspace/message-input.tsx`:

```typescript
'use client'

import { useWorkspace } from '@/lib/hooks/useWorkspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('')
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const { sendMessage, loading } = useWorkspace()

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message)
      setMessage('')
    }
  }

  const handleVoiceStart = () => {
    setIsVoiceActive(true)
    // Backend voice input wired in Phase 3
  }

  const handleVoiceStop = () => {
    setIsVoiceActive(false)
  }

  // ... rest of component (unchanged)
  // Add handleSend to send button onClick
  // Add to voice button: onClick={isVoiceActive ? handleVoiceStop : handleVoiceStart}
}
```

---

## Step 4: Wire CanvasPanel to Generate Artifacts

Update `components/workspace/canvas-panel.tsx`:

```typescript
'use client'

import { useWorkspace } from '@/lib/hooks/useWorkspace'
import { CanvasRenderer } from './canvas-renderer'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CanvasPanel() {
  const { workspace, primaryThread, loading } = useWorkspace()
  const [artifact, setArtifact] = useState(null)
  const [artifactLoading, setArtifactLoading] = useState(false)

  const generateArtifact = async (kind: string) => {
    if (!workspace || !primaryThread) return

    try {
      setArtifactLoading(true)
      const response = await fetch('/api/artifacts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspace.id,
          threadId: primaryThread.id,
          kind,
          title: `${kind} view`,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate artifact')
      
      const { artifact } = await response.json()
      setArtifact(artifact)
    } catch (err) {
      console.error('Artifact generation failed:', err)
    } finally {
      setArtifactLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with action buttons */}
      <div className="flex-shrink-0 border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Field</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => generateArtifact('relational_map')}
            disabled={artifactLoading || !workspace}
          >
            Map
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => generateArtifact('timing_view')}
            disabled={artifactLoading || !workspace}
          >
            Timing
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => generateArtifact('family_system')}
            disabled={artifactLoading || !workspace}
          >
            Family
          </Button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-hidden">
        <CanvasRenderer artifact={artifact} />
      </div>
    </div>
  )
}
```

---

## Step 5: Wire Briefs Audio

Update `app/briefs/page.tsx`:

```typescript
'use client'

import { useWorkspace } from '@/lib/hooks/useWorkspace'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function BriefsPage() {
  const { workspace } = useWorkspace()
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioLoading, setAudioLoading] = useState(false)

  const generateAudio = async () => {
    try {
      setAudioLoading(true)
      const response = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'Your daily brief: Consider the relational impact of timing. Pause before responding.',
        }),
      })

      if (!response.ok) throw new Error('Failed to generate audio')
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
    } catch (err) {
      console.error('Audio generation failed:', err)
    } finally {
      setAudioLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with audio button */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Daily Briefs</h1>
        <Button 
          onClick={generateAudio}
          disabled={audioLoading}
        >
          {audioLoading ? 'Generating...' : 'Generate audio overview'}
        </Button>
      </div>

      {/* Audio player */}
      {audioUrl && (
        <audio 
          controls 
          src={audioUrl} 
          className="w-full"
        />
      )}

      {/* Brief cards with audio playback */}
      {/* ... existing brief content ... */}
    </div>
  )
}
```

---

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase and OpenAI credentials
3. Run `supabase db push` to apply migration
4. Run `pnpm install` to add new dependencies
5. Start dev server: `pnpm dev`

---

## Testing Checklist

- [ ] Workspace creates on first load
- [ ] Send message appears in chat
- [ ] Defrag response shows with "Based on" disclosure
- [ ] Generate artifact creates seed payload
- [ ] Canvas renderer displays artifact correctly
- [ ] Audio generation returns MP3 blob
- [ ] Audio player plays briefs audio

Send me confirmation once you've implemented these hooks and wiring, and I'll provide Phase 3 (agent refinement + audio/artifact production).
