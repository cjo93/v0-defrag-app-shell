import { createSupabaseServerClient } from './server'

export async function getCurrentUserProfile() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, subscription_tier, stripe_customer_id, stripe_subscription_status')
    .eq('id', user.id)
    .single()
  return profile
}

