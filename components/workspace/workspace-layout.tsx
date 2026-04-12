'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { BranchThread } from './branch-thread'
import { CanvasPanel } from './canvas-panel'
import { ChatThread, type WorkspaceMessage } from './chat-thread'
import { MessageInput } from './message-input'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const shellCardClass =
  'rounded-[1.8rem] border border-white/8 bg-white/[0.04] shadow-[0_24px_80px_rgba(1,4,12,0.32)] backdrop-blur'

export function WorkspaceLayout({ workspaceId }: { workspaceId?: string }) {
  const router = useRouter()
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [messages, setMessages] = useState<WorkspaceMessage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [composerError, setComposerError] = useState<string | null>(null)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(workspaceId || null)
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!!workspaceId)

  const supabase = createClient()

  useEffect(() => {
    if (workspaceId) {
      loadWorkspace(workspaceId)
    } else {
      // On first session, seed a starter workspace/thread if none exists
      seedFirstWorkspace()
    }
  }, [workspaceId])

  // Seed starter workspace/thread for first session
  const seedFirstWorkspace = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Welcome to Defrag',
          seed: {
            relation: 'partner',
            moment: 'They seemed upset when I said we needed to talk about this.',
            goal: 'clarity',
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create workspace')
      setCurrentWorkspaceId(data.workspace.id)
      loadWorkspace(data.workspace.id)
    } catch (err) {
      setComposerError('Failed to create starter workspace.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadWorkspace = async (id: string) => {
    setIsLoading(true)
    try {
      // 1. Fetch workspace and its primary thread
      const { data: thread, error: threadError } = await supabase
        .from('threads')
        .select('id, workspace_id')
        .eq('workspace_id', id)
        .eq('kind', 'primary')
        .single()

      if (threadError) throw threadError
      setCurrentThreadId(thread.id)

      // 2. Fetch messages for that thread
      const { data: dbMessages, error: msgError } = await supabase
        .from('messages')
        .select('*, rationale_blocks(*)')
        .eq('thread_id', thread.id)
        .order('created_at', { ascending: true })

      if (msgError) throw msgError

      const formattedMessages: WorkspaceMessage[] = dbMessages.map((msg: any) => ({
        id: msg.id,
        author: msg.role === 'user' ? 'You' : 'Defrag',
        content: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: msg.role === 'user' ? 'user' : (msg.structured_output?.relationalStatus === 'aligned' ? 'insight' : 'interpretation'),
        sources: msg.rationale_blocks?.map((rb: any) => ({
          name: rb.label,
          description: rb.payload?.summary || '',
          detail: Array.isArray(rb.payload?.details) ? rb.payload.details.join('. ') : rb.payload?.details || ''
        }))
      }))

      setMessages(formattedMessages)
    } catch (err) {
      console.error('Error loading workspace:', err)
      setComposerError('Failed to load session history.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (input: string) => {
    setComposerError(null)
    setIsSubmitting(true)

    let wId = currentWorkspaceId
    let tId = currentThreadId

    try {
      // 1. Ensure we have a workspace and thread
      if (!wId) {
        const title = input.slice(0, 40) + (input.length > 40 ? '...' : '')
        const response = await fetch('/api/workspaces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Failed to create workspace')
        
        wId = data.workspace.id
        setCurrentWorkspaceId(wId)
        
        // Fetch the thread that was created automatically
        const { data: thread } = await supabase
          .from('threads')
          .select('id')
          .eq('workspace_id', wId)
          .single()
        
        tId = thread?.id || null
        setCurrentThreadId(tId)
        
        // Update URL without full refresh to "reopen" this session
        window.history.replaceState(null, '', `/workspace?id=${wId}`)
      }

      if (!tId) throw new Error('No thread found for workspace')

      // 2. Add local user message immediately
      const tempUserMsg: WorkspaceMessage = {
        id: 'temp-' + Date.now(),
        author: 'You',
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: 'user',
      }
      setMessages(curr => [...curr, tempUserMsg])

      // 3. Persist and get AI response via API
      const response = await fetch(`/api/threads/${tId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to persist message')

      // 4. Update messages with real data from DB
      const assistantMsg = data.assistantMessage
      const structured = data.structured
      
      const newDefragMsg: WorkspaceMessage = {
        id: assistantMsg.id,
        author: 'Defrag',
        content: assistantMsg.content,
        timestamp: new Date(assistantMsg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: structured.relationalStatus === 'aligned' ? 'insight' : 'interpretation',
        sources: structured.rationale?.map((r: any) => ({
          name: r.label,
          description: r.summary,
          detail: Array.isArray(r.details) ? r.details.join('. ') : r.details,
        })),
      }

      setMessages(curr => {
        // Replace temp user message with real one if needed, or just append
        const withoutTemp = curr.filter(m => !m.id.startsWith('temp-'))
        const realUserMsg: WorkspaceMessage = {
          id: data.userMessage.id,
          author: 'You',
          content: data.userMessage.content,
          timestamp: new Date(data.userMessage.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          type: 'user'
        }
        return [...withoutTemp, realUserMsg, newDefragMsg]
      })

    } catch (err: any) {
      setComposerError(err.message || 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const helperText = "Enter the moment as it happened. Defrag will provide interpretation and a next move."

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#05060a]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-white/40">Loading your session...</p>
        </div>
      </div>
    )
  }

  const conversationPanel = (
    <section className={`${shellCardClass} flex min-h-[640px] flex-col overflow-hidden md:min-h-[720px]`}>
      <div className="border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Conversation</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white/90">Work the moment in one primary lane</h2>
          </div>

          <button
            onClick={() => setShowAlternatives((value) => !value)}
            className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors sm:min-h-10 sm:w-auto ${
              showAlternatives
                ? 'border-primary/18 bg-primary/12 text-primary/90 hover:bg-primary/16'
                : 'border-white/10 bg-white/[0.04] text-white/74 hover:border-white/16 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {showAlternatives ? 'Hide alternate framings' : 'Show alternate framings'}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
            Workspace ready
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatThread messages={messages} isSubmitting={isSubmitting} errorMessage={composerError} />
      </div>

      <div className="border-t border-white/8 bg-[#090b12]/94 px-4 py-3 sm:px-5">
        <MessageInput
          compact
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          helperText={helperText}
        />
      </div>

      {showAlternatives && (
        <div className="border-t border-white/8 bg-black/14">
          <div className="border-b border-white/8 px-5 py-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Alternate framings</p>
            <p className="mt-1 text-sm leading-6 text-white/62">Keep practice paths available, but secondary to the main conversation.</p>
          </div>
          <div className="max-h-[300px] overflow-y-auto sm:max-h-[360px]">
            <BranchThread />
          </div>
        </div>
      )}
    </section>
  )

  const readingPanel = (
    <section className={`${shellCardClass} min-h-[auto] overflow-hidden md:min-h-[720px]`}>
      <CanvasPanel embedded />
    </section>
  )

  const introPanel = (
    <section className={`${shellCardClass} p-5 sm:p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">Live overview</p>
          <h2 className="mt-2 text-lg font-semibold text-white/90">Keep the conversation on the left and the read on the right.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66">
            The workspace stays focused on one thread, one interpretation, one next move, and one rewrite.
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
          Live
        </span>
      </div>
    </section>
  )

  const desktopLayout = (
    <div className="hidden h-screen bg-[#05060a] text-foreground md:flex">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Relational workspace</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/90">Workspace</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.06),transparent_20%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:gap-6">
            {introPanel}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              {conversationPanel}
              {readingPanel}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const mobileLayout = (
    <div className="flex min-h-screen flex-col bg-[#05060a] text-foreground md:hidden">
      <div className="border-b border-white/8 bg-[#0a0c13]/96 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Relational workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/90">Workspace</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
            Live
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_32%),linear-gradient(180deg,#05060a_0%,#080a11_44%,#05060a_100%)] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {introPanel}
          {conversationPanel}
          {readingPanel}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  )
}
