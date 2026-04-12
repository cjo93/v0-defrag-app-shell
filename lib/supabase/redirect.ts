// Helper to produce environment-aware redirect URLs for Supabase auth flows.
// Uses NEXT_PUBLIC_SITE_URL for production, NEXT_PUBLIC_VERCEL_URL for Vercel previews,
// and falls back to window.location.origin for local development when available,
// otherwise to http://localhost:3000.
export function getAuthRedirectUrl(path = '/auth/callback') {
  const envSite = process.env.NEXT_PUBLIC_SITE_URL
  const envVercel = process.env.NEXT_PUBLIC_VERCEL_URL

  // Normalize Vercel value into a full URL when present (Vercel may provide domain only)
  const vercelUrl = envVercel ? (envVercel.startsWith('http') ? envVercel : `https://${envVercel}`) : undefined

  // If running in a browser, prefer the current origin for non-localhost deployments
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    // If we're on localhost/127, treat as dev and return the actual origin
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return `${origin}${path}`
    }
    // If SITE_URL is explicitly provided, prefer it (production)
    if (envSite) return `${envSite.replace(/\/$/, '')}${path}`
    // If this is a Vercel preview domain, prefer it
    if (vercelUrl) return `${vercelUrl.replace(/\/$/, '')}${path}`
    // Otherwise use the current origin
    return `${origin}${path}`
  }

  // Server-side or build-time fallback: prefer SITE_URL -> VERCEL_URL -> localhost
  if (envSite) return `${envSite.replace(/\/$/, '')}${path}`
  if (vercelUrl) return `${vercelUrl.replace(/\/$/, '')}${path}`
  return `http://localhost:3000${path}`
}

