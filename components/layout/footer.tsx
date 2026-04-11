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
    <footer className="border-t border-white/6 bg-[#0b0c0e] text-stone-300">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr_0.9fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Defrag</p>
              <h3 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight text-stone-50">
                See the moment from more than one side before it hardens.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-stone-400">
              Defrag is built for the moments where intent, timing, and reception split apart.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Navigate</p>
            <div className="space-y-2 text-sm text-stone-400">
              <Link href="/workspace" className="block transition hover:text-stone-50">Workspace</Link>
              <Link href="/dashboard" className="block transition hover:text-stone-50">Dashboard</Link>
              <Link href="/pricing" className="block transition hover:text-stone-50">Pricing</Link>
              <Link href="/learn" className="block transition hover:text-stone-50">Learn</Link>
              <Link href="/about" className="block transition hover:text-stone-50">About</Link>
              <Link href="/onboarding" className="block transition hover:text-stone-50">Baseline</Link>
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-white/6 bg-[#0f1114]/60 p-5 backdrop-blur-sm">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Private feedback</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">Use this channel for product questions, invite concerns, or privacy requests.</p>
            </div>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-white/10 bg-white/[0.02] text-stone-50 placeholder:text-stone-600"
            />
            <Textarea
              placeholder="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="h-24 resize-none border-white/10 bg-white/[0.02] text-stone-50 placeholder:text-stone-600"
            />
            <Button onClick={handleSubmit} disabled={submitted} className="h-11 rounded-full bg-stone-100 text-sm font-semibold text-stone-950 hover:bg-white">
              {submitted ? 'Sent' : 'Send'}
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Defrag. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="transition hover:text-stone-50">Login</Link>
            <Link href="/signup" className="transition hover:text-stone-50">Signup</Link>
            <Link href="/privacy" className="transition hover:text-stone-50">Privacy</Link>
            <Link href="/terms" className="transition hover:text-stone-50">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
