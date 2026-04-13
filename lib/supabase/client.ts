import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a dummy client for build time / missing env vars
    // This allows the build to proceed even if secrets are missing
    // The dummy client intentionally signals that it is non-functional
    // so callers can surface honest UI (no silent success).
    const dummy = {
      isDummy: true,
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({}),
        // Sign in/up return an error object to avoid pretending to authenticate
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured in this environment') }),
        signUp: async () => ({ data: null, error: new Error('Supabase not configured in this environment') }),
      },
      from: (table: string) => ({
        // upsert should return an explicit error when attempted in a non-configured environment
        upsert: async (_: any) => ({ data: null, error: new Error('Supabase not configured in this environment') }),
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    } as any

    return dummy
  }

  return createBrowserClient(url, key)
}
