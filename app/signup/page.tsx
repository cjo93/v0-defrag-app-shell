'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/client'
import { getAuthRedirectUrl } from '@/lib/supabase/redirect'

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setStatusMessage('Creating your account...')

    const supabase = createClient()
    const redirectTo = getAuthRedirectUrl('/auth/callback')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      setError(error.message)
      setIsSubmitting(false)
      setStatusMessage(null)
      return
    }

    // Redirect to onboarding after successful signup
    window.location.href = '/onboarding'
  }

  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[radial-gradient(circle_at_top_right,_rgba(199,160,92,0.08),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(72,117,125,0.08),_transparent_35%)]">
        <div className="w-full max-w-md relative">
          {/* Contextual Artifacts */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="space-y-10 relative z-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                Begin Onboarding
              </div>
              <h1 className="text-3xl font-semibold text-stone-50 tracking-tight">Create your account</h1>
              <p className="text-stone-400 font-light text-sm">Join Defrag and start seeing interactions clearly</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6 border border-white/10 rounded-[32px] p-10 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-2xl flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-stone-100 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-stone-100 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-stone-100 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                />
                <p className="text-[10px] text-stone-600 ml-1 uppercase tracking-widest font-medium">8+ characters recommended</p>
              </div>

              <label className="flex items-start gap-3 ml-1 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded-md border-white/10 bg-white/5 checked:bg-stone-100 transition" />
                <span className="text-xs text-stone-400 group-hover:text-stone-300 transition leading-relaxed">
                  I agree to the <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                </span>
              </label>

              <Button type="submit" className="w-full h-12 rounded-full bg-stone-100 text-stone-950 font-semibold hover:bg-white shadow-lg transition-all" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </Button>

              {statusMessage && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] px-4 py-3 text-xs text-stone-500 text-center animate-pulse">
                  {statusMessage}
                </div>
              )}

              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                  <span className="px-4 bg-[#0d0e10] text-stone-600">Secure Bridge</span>
                </div>
              </div>

              {/* Third-party sign-in coming soon. For now, use email sign-up for a secure start. */}
            </form>

            <div className="text-center">
              <p className="text-sm text-stone-500 font-light">
                Already have an account?{' '}
                <Link href="/login" className="text-stone-300 hover:text-stone-50 hover:underline font-semibold transition">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
