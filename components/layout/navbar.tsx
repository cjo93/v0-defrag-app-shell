import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#080a11]/88 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold tracking-[0.18em] text-white transition-colors hover:text-white/86">
            DEFRAG
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm text-white/52 transition-colors hover:text-white/82">
              Product
            </Link>
            <Link href="/pricing" className="text-sm text-white/52 transition-colors hover:text-white/82">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm text-white/52 transition-colors hover:text-white/82">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-sm text-white/72 hover:bg-white/[0.06] hover:text-white">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full bg-white px-4 text-sm font-semibold text-black hover:bg-white/92">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
