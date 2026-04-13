import { NextResponse } from 'next/server'

function makeCookie(plan: string) {
  const maxAge = 60 * 5 // 5 minutes
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  // HttpOnly, short-lived resume cookie storing only plan identifier
  return `resume_checkout=${encodeURIComponent(plan)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const plan = (body.plan || '').toString().toLowerCase()
    if (!plan) {
      return NextResponse.json({ error: 'Missing plan' }, { status: 400 })
    }

    const res = NextResponse.json({ ok: true, redirect: '/signup' })
    res.headers.set('Set-Cookie', makeCookie(plan))
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Failed to set resume' }, { status: 500 })
  }
}

