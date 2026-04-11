import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a dummy client for build time / missing env vars
    // This allows the build to proceed even if secrets are missing
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => {},
      },
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    } as any
  }

  return createBrowserClient(url, key)
}
