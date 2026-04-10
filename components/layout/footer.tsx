'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email && message) {
      setSubmitted(true)
      setTimeout(() => {
        setEmail('')
        setMessage('')
        setSubmitted(false)
      }, 2000)
    }
  }

  return (
    <footer className="border-t border-border/40 bg-card/40 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4 tracking-widest uppercase">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Defrag reveals relational context. Understand what changed the meaning before the moment breaks.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/75">DEFRAG</span>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4 tracking-widest uppercase">How It Works</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">Learn more</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">See pricing</Link></li>
              <li><Link href="/workspace" className="text-sm text-muted-foreground hover:text-foreground transition">Try workspace</Link></li>
              <li><Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition">Educational resources</Link></li>
              <li><Link href="/invite" className="text-sm text-muted-foreground hover:text-foreground transition">Invite flow</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4 tracking-widest uppercase">Contact</h4>
            <div className="space-y-3">
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border/40 text-foreground text-sm placeholder:text-muted-foreground/40"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-background border-border/40 text-foreground text-sm placeholder:text-muted-foreground/40 resize-none h-20"
                />
              </div>
              <Button
                onClick={handleSubmit}
                size="sm"
                disabled={submitted}
                className="w-full text-xs"
              >
                {submitted ? 'Sent' : 'Send'}
              </Button>
              <p className="text-xs text-muted-foreground/60 font-light">
                Private feedback channel for product support
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/60">&copy; 2026 Defrag. All rights reserved.</p>
            <div className="text-xs text-muted-foreground/60">
              <Link href="/login" className="hover:text-foreground transition">Login</Link>
              <span className="mx-2">•</span>
              <Link href="/signup" className="hover:text-foreground transition">Signup</Link>
              <span className="mx-2">•</span>
              <Link href="/settings" className="hover:text-foreground transition">Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
