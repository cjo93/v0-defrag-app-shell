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
    <footer className="mt-20 border-t border-white/8 bg-[#070911] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/42">About</h4>
            <p className="text-sm leading-7 text-white/62">
              Defrag reveals relational context. Understand what changed the meaning before the moment breaks.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              DEFRAG live workspace
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/42">How It Works</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-sm text-white/58 transition hover:text-white/86">Learn more</Link></li>
              <li><Link href="/pricing" className="text-sm text-white/58 transition hover:text-white/86">See pricing</Link></li>
              <li><Link href="/workspace" className="text-sm text-white/58 transition hover:text-white/86">Try workspace</Link></li>
              <li><Link href="/learn" className="text-sm text-white/58 transition hover:text-white/86">Educational layer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/42">Contact</h4>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/10 bg-white/[0.05] text-sm text-white placeholder:text-white/28"
              />
              <Textarea
                placeholder="How can Defrag help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-24 resize-none border-white/10 bg-white/[0.05] text-sm text-white placeholder:text-white/28"
              />
              <Button
                onClick={handleSubmit}
                size="sm"
                disabled={submitted}
                className="w-full rounded-full bg-white text-xs font-semibold text-black hover:bg-white/92"
              >
                {submitted ? 'Sent' : 'Send'}
              </Button>
              <p className="text-xs font-light text-white/34">Sends to chadowen93@gmail.com</p>
            </div>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-slate-900/10 bg-white/80 text-slate-900 placeholder:text-slate-400"
            />
            <Textarea
              placeholder="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="h-24 resize-none border-slate-900/10 bg-white/80 text-slate-900 placeholder:text-slate-400"
            />
            <Button onClick={handleSubmit} disabled={submitted} className="h-11 rounded-full bg-slate-950 text-sm font-semibold text-stone-50 hover:bg-slate-800">
              {submitted ? 'Sent' : 'Send'}
            </Button>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/34">&copy; 2026 Defrag. All rights reserved.</p>
            <div className="text-xs text-white/34">
              <Link href="/login" className="transition hover:text-white/80">Login</Link>
              <span className="mx-2">•</span>
              <Link href="/signup" className="transition hover:text-white/80">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
