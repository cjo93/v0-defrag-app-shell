import { NextResponse } from 'next/server'

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';').map((p) => p.trim())
  for (const p of parts) {
    const [k, ...v] = p.split('=')
    if (k === 'resume_checkout') return decodeURIComponent(v.join('='))
  }
  return null
}

function getSiteUrl(path = '') {
  const site = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
  if (site) {
    const base = site.startsWith('http') ? site : `https://${site}`
    return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path)
  }
  return path
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const plan = parseCookieHeader(cookieHeader)
    if (!plan) {
      return NextResponse.json({ ok: false })
    }

    const origin = getSiteUrl('')
    const redirectUrl = `${origin}/pricing?plan=${encodeURIComponent(plan)}&resume=1`

    // Clear cookie
    const clear = `resume_checkout=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    const res = NextResponse.json({ ok: true, redirectUrl })
    res.headers.set('Set-Cookie', clear)
    return res
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

