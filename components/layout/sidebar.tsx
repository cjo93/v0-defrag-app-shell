'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { name: 'Workspace', href: '/workspace' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Learn', href: '/learn' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [sessions, setSessions] = useState<{ id: string, title: string }[]>([])
  const [user, setUser] = useState<{ email?: string } | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    async function getInitialData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ email: user.email })
        fetchSessions()
      }
    }
    getInitialData()
  }, [])

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('workspaces')
      .select('id, title')
      .order('updated_at', { ascending: false })
      .limit(8)
    
    if (data) setSessions(data)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="w-56 border-r border-border bg-background h-screen flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 flex-shrink-0">
        <Link href="/" className="font-bold text-lg tracking-tight text-foreground block">
          DEFRAG
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-6 space-y-1">
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

      {/* Sessions History */}
      {sessions.length > 0 && (
        <div className="flex-1 px-3 py-4 space-y-4">
          <div className="px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Recent Defrags</p>
          </div>
          <div className="space-y-1">
            {sessions.map((session) => (
              <Link
                key={session.id}
                href={`/workspace?id=${session.id}`}
                className="block px-3 py-2 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-secondary truncate transition-colors"
                title={session.title}
              >
                {session.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* User Menu */}
      <div className="flex-shrink-0 border-t border-border p-3">
        <div className="group relative">
          <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-secondary transition-colors text-left">
            <div className="w-8 h-8 rounded bg-secondary text-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Account</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email || 'user@defrag.app'}</p>
            </div>
          </button>
          
          <div className="absolute bottom-full left-0 w-full mb-2 hidden group-hover:block">
            <div className="bg-popover border border-border rounded-lg overflow-hidden shadow-xl">
              <button 
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
