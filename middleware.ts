import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Default next response (may be recreated after cookie/header changes)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // QA bypass: when ?qa=1 is present, short-circuit auth and mark the request
  // so downstream APIs and pages can run in test mode without login or gating.
  const isQA = request.nextUrl.searchParams.get('qa') === '1'
  if (isQA) {
    // Clone headers and set a QA header so APIs can detect bypass without secrets
    const forwarded = new Headers(request.headers)
    forwarded.set('x-defrag-qa', '1')

    response = NextResponse.next({
      request: {
        headers: forwarded,
      },
    })

    // Also set a non-httpOnly cookie so client-side code can detect QA mode
    response.cookies.set({ name: 'defrag_qa', value: '1', path: '/' })
    return response
  }

  // Create Supabase server client only if environment variables are present.
  // Preserve graceful handling when env vars are missing so middleware does not crash during deploy/build.
  let supabase: any = null
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase public environment variables missing in middleware. Skipping server-side auth check.')
    } else {
      supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
      )
    }
  } catch (err) {
    console.error('Error initializing Supabase in middleware:', err)
    supabase = null
  }

  let user = null
  if (supabase) {
    try {
      const result = await supabase.auth.getUser()
      user = result?.data?.user ?? null
    } catch (err) {
      console.warn('Supabase auth.getUser failed in middleware; treating as unauthenticated', err)
      user = null
    }
  }

  const url = request.nextUrl.clone()

  // Protect internal app routes (skip when user is present)
  const protectedRoutes = ['/workspace', '/dashboard', '/settings', '/learn', '/briefs', '/people', '/family']
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route))

  if (isProtectedRoute && !user) {
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }


  // Redirect root / to /studio for public entry
  if (url.pathname === '/') {
    url.pathname = '/studio'
    return NextResponse.redirect(url, 301)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // Run middleware for all non-static routes (includes /api so QA bypass can apply to API endpoints)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
