import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let adminClient: SupabaseClient | null | undefined

export function createSupabaseAdminClient() {
  if (adminClient !== undefined) {
    return adminClient
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    adminClient = null
    return adminClient
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })

  return adminClient
}
