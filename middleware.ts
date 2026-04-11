import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host')

  // 1. Force canonical domain (defrag.app)
  if (hostname === 'www.defrag.app' || hostname === 'defrag-app.vercel.app') {
    return NextResponse.redirect(`https://defrag.app${url.pathname}${url.search}`, 301)
  }

  // 2. Fix the /studio redirect issue
  if (url.pathname === '/studio' || url.pathname.startsWith('/studio/')) {
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
