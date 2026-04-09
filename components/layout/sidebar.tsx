'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Workspace', href: '/workspace' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Learn', href: '/learn' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-56 border-r border-border bg-background h-screen flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 flex-shrink-0">
        <Link href="/" className="font-semibold text-lg tracking-tight text-foreground block">
          Defrag
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded text-sm transition-colors ${
              pathname === item.href
                ? 'bg-secondary text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Menu */}
      <div className="flex-shrink-0 border-t border-border p-3">
        <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-secondary transition-colors">
          <div className="w-8 h-8 rounded bg-secondary text-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
            U
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-foreground truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">user@defrag.app</p>
          </div>
        </button>
      </div>
    </div>
  )
}
