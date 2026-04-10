import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-900/10 bg-[#f3f0e8]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[-0.02em] text-slate-950 transition hover:text-slate-700">
          DEFRAG
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-slate-600 transition hover:text-slate-950">
            Product
          </Link>
          <Link href="/learn" className="text-sm text-slate-600 transition hover:text-slate-950">
            Learn
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-600 transition hover:text-slate-950">
            Dashboard
          </Link>
          <Link href="/invite" className="text-sm text-slate-600 transition hover:text-slate-950">
            Invite
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-slate-700 transition hover:bg-white/60 hover:text-slate-950">
            Sign In
          </Link>
          <Link href="/onboarding" className="inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-stone-50 transition hover:bg-slate-800">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
