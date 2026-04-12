/*
  lib/supabase/redirect.ts

  getAuthRedirectUrl(path)

  Behavior:
  - Prefer NEXT_PUBLIC_SITE_URL (explicit production site).
  - Then prefer NEXT_PUBLIC_VERCEL_URL (preview / Vercel-hosted).
  - Then, client-side, use window.location.origin only if either:
      - the origin is not localhost (so previews are okay), or
      - NODE_ENV === 'development' (true local dev).
    This prevents returning localhost in production/previews if env vars are missing.
  - Last resort: return the path only (relative). This avoids leaking localhost in non-dev environments;
    Supabase will fall back to the Site URL configured in the Supabase dashboard when given a relative path.
*/

export function getAuthRedirectUrl(path = '/onboarding') {
  const nodeEnv = typeof process !== 'undefined' ? process.env.NODE_ENV : undefined;
  const siteEnv = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SITE_URL : undefined;
  const vercelEnv = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VERCEL_URL : undefined;

  const normalize = (base: string) => {
    const trimmed = base.replace(/\/$/, '');
    return trimmed + (path.startsWith('/') ? path : '/' + path);
  };

  // 1) explicit site URL (production)
  if (siteEnv && siteEnv.length) {
    return normalize(siteEnv);
  }

  // 2) Vercel URL (preview / deployments)
  if (vercelEnv && vercelEnv.length) {
    // NEXT_PUBLIC_VERCEL_URL may be like "my-app-abc123.vercel.app" — ensure protocol.
    const base = vercelEnv.startsWith('http') ? vercelEnv : `https://${vercelEnv}`;
    return normalize(base);
  }

  // 3) client-side origin fallback (use only if not exposing localhost in prod)
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    const hostname = window.location.hostname;

    // Allow using the origin if:
    //  - It's not localhost (so preview domains are okay), OR
    //  - We are in true local development (NODE_ENV === 'development')
    if (hostname !== 'localhost' || nodeEnv === 'development') {
      return normalize(origin);
    }
  }

  // 4) last-resort: return the path only (relative). This avoids returning "http://localhost:3000" in prod.
  return path;
}

export default getAuthRedirectUrl;

