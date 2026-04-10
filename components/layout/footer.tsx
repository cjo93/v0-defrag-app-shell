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
    <footer className="border-t border-slate-900/10 bg-[#ece4d6] text-slate-900">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr_0.9fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Defrag</p>
              <h3 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight text-slate-950">
                See the moment from more than one side before it hardens.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-700">
              Defrag reveals relational context, pressure, and repair paths so meaning does not keep breaking in the same place.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              DEFRAG live workspace
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Navigate</p>
            <div className="space-y-2 text-sm text-slate-700">
              <Link href="/workspace" className="block transition hover:text-slate-950">Workspace</Link>
              <Link href="/dashboard" className="block transition hover:text-slate-950">Dashboard</Link>
              <Link href="/learn" className="block transition hover:text-slate-950">Educational layer</Link>
              <Link href="/invite" className="block transition hover:text-slate-950">Invite overlay</Link>
              <Link href="/onboarding" className="block transition hover:text-slate-950">Build baseline</Link>
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-900/10 bg-white/55 p-5 backdrop-blur-sm">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Private feedback</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Use this channel for product questions, invite concerns, or privacy requests.</p>
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

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-900/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Defrag. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="transition hover:text-slate-950">Login</Link>
            <Link href="/signup" className="transition hover:text-slate-950">Signup</Link>
            <Link href="/settings" className="transition hover:text-slate-950">Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
