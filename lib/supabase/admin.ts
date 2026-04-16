<<<<<<< HEAD
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

function getSupabaseAdminClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}

export const supabaseAdmin = {
  from: (...args: Parameters<SupabaseClient["from"]>) =>
    getSupabaseAdminClient().from(...args),
};
=======
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
>>>>>>> origin/main
