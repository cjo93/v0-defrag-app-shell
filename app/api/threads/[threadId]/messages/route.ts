import { NextResponse } from 'next/server'
import { runDefragAgent } from '@/lib/defrag/agent'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
type Params = { params: Promise<{ threadId: string }> }
type ThreadWorkspace = { id: string; title: string; user_id: string }

export async function POST(req: Request, { params }: Params) {
  const { threadId } = await params
  const supabase = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdminClient()

  if (!supabase || !supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content } = await req.json()

  const { data: thread, error: threadError } = await supabaseAdmin
    .from('threads')
    .select('id, kind, workspace:workspaces(id, title, user_id)')
    .eq('id', threadId)
    .single()

  const workspace = (Array.isArray(thread?.workspace) ? thread.workspace[0] : thread?.workspace) as
    | ThreadWorkspace
    | undefined

  if (threadError || !thread || !workspace || workspace.user_id !== user.id) {
    return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
  }

  const { data: userMessage, error: userMsgError } = await supabaseAdmin
    .from("messages")
    .insert({
      thread_id: threadId,
      role: 'user',
      content,
    })
    .select('*')
    .single()

  if (userMsgError) {
    return NextResponse.json({ error: userMsgError.message }, { status: 500 })
  }

  const structured = await runDefragAgent({
    userMessage: content,
    workspaceTitle: workspace.title,
    threadKind: thread.kind,
  })

  const { data: assistantMessage, error: assistantMsgError } =
    await supabaseAdmin
      .from('messages')
      .insert({
        thread_id: threadId,
        role: 'assistant',
        content: structured.responseText,
        structured_output: structured,
      })
      .select('*')
      .single()

  if (assistantMsgError) {
    return NextResponse.json(
      { error: assistantMsgError.message },
      { status: 500 }
    )
  }

  if (structured.rationale.length > 0) {
    await supabaseAdmin.from('rationale_blocks').insert(
      structured.rationale.map((r) => ({
        message_id: assistantMessage.id,
        label: r.label,
        payload: r,
      }))
    )
  }

  return NextResponse.json({
    userMessage,
    assistantMessage,
    structured,
  })
}
