'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Workspace', href: '/workspace' },
  { name: 'Settings', href: '#' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border bg-card h-screen overflow-y-auto">
      <div className="p-6 space-y-8">
        <Link href="/" className="font-semibold text-lg tracking-tight text-foreground block">
          Defrag
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md text-sm transition ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6 border-t border-border pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">user@defrag.app</p>
          </div>
        </div>
      </div>
    </div>
  )
}
