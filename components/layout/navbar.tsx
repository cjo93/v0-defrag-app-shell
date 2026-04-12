import Link from 'next/link'


export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/8 bg-linear-to-r from-[#0b0f12]/80 via-[#0a0c10]/70 to-[#0d0f11]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/studio" className="text-lg font-semibold tracking-[0.18em] text-white transition-colors hover:text-white/86">
            DEFRAG
          </Link>

          <div className="flex items-center gap-7">
            <Link href="/studio" className="text-sm text-white/82 font-semibold transition-colors hover:text-white">
              Workspace
            </Link>
            <Link href="/login" className="text-sm text-white/72 transition-colors hover:text-white">
              Sign in
            </Link>
            <Link href="/pricing" className="text-sm text-white/72 transition-colors hover:text-white">
              Plans
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
