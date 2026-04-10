import Link from 'next/link'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/learn', label: 'Learn' },
  { href: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#080a11]/82 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[11px] font-semibold tracking-[0.2em] text-white/86">
              D
            </span>
            <span className="text-sm font-semibold tracking-[0.22em] text-white">DEFRAG</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/54 transition-colors hover:text-white/84">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="rounded-full border border-transparent px-4 text-sm text-white/72 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
            >
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full bg-white px-4 text-sm font-semibold text-black hover:bg-white/92">
              <Link href="/workspace">Open workspace</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
