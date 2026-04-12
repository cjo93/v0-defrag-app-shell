import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

const bodySchema = z.object({
  title: z.string().min(1).max(100).optional(),
})

export async function POST(req: Request) {
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

  const rawBody = await req.json().catch(() => ({}))
  const parsed = bodySchema.safeParse(rawBody)
  const title = parsed.success ? (parsed.data.title ?? 'Untitled workspace') : 'Untitled workspace'

  const { data: workspace, error } = await supabaseAdmin
    .from('workspaces')
    .insert({ user_id: user.id, title })
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 })
  }

  const { data: thread, error: threadError } = await supabaseAdmin
    .from('threads')
    .insert({ workspace_id: workspace.id, kind: 'primary', title: 'Primary' })
    .select('*')
    .single()

  if (threadError) {
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 })
  }

  return NextResponse.json({ workspaceId: workspace.id, threadId: thread?.id ?? null })
}