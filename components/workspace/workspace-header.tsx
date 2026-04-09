'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

const workspaces = [
  { id: 'main', name: 'Main', active: true },
  { id: 'recent-1', name: 'Recent workspace', active: false },
  { id: 'recent-2', name: 'Another conversation', active: false },
]

export function WorkspaceHeader() {
  return (
    <header className="hidden md:flex flex-shrink-0 h-14 border-b border-border/40 bg-card/60 backdrop-blur-md px-6 items-center justify-between gap-6 sticky top-0 z-30">
      {/* Left: Logo + Workspace Switcher */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <div className="text-sm font-bold text-foreground tracking-widest">DEFRAG</div>
        </Link>

        {/* Workspace Switcher */}
        <div className="flex items-center gap-2 border-l border-border/30 pl-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs gap-2 hover:bg-muted/10 transition-colors">
                <span className="hidden sm:inline">Main Workspace</span>
                <span className="inline sm:hidden">Main</span>
                <svg className="w-4 h-4 opacity-50 hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {workspaces.map((ws) => (
                <DropdownMenuItem key={ws.id} className={`${ws.active ? 'bg-primary/15 border-l-2 border-primary' : ''} transition-colors`}>
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-2 h-2 rounded-full transition-all ${ws.active ? 'bg-primary scale-125' : 'bg-muted'}`}></div>
                    <span className="text-sm">{ws.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                <span className="text-sm text-primary font-medium">+ New workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Right: Global Navigation + Settings */}
      <div className="flex items-center gap-1">
        {/* Global Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link href="/dashboard" className="px-3 py-2 text-xs rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/people" className="px-3 py-2 text-xs rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground">
            People
          </Link>
          <Link href="/family" className="px-3 py-2 text-xs rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground">
            Family
          </Link>
          <Link href="/briefs" className="px-3 py-2 text-xs rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground">
            Briefs
          </Link>
        </nav>

        {/* Compact Menu for smaller screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="text-sm">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/people" className="text-sm">People</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/family" className="text-sm">Family</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/briefs" className="text-sm">Briefs</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Button */}
        <Link href="/settings" className="p-2 ml-2 rounded hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground" title="Settings">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
