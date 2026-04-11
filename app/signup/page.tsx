'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsSubmitting(false)
      setStatusMessage(null)
      return
    }

    setStatusMessage('Success! Please check your email to confirm your account.')
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
              <p className="text-muted-foreground font-light">Join Defrag and start seeing interactions clearly</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6 border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60"
                />
                <p className="text-xs text-muted-foreground mt-1 font-light">At least 8 characters</p>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" required className="w-4 h-4 rounded border-border/40" />
                <span className="text-sm text-muted-foreground font-light">I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </Button>

              {statusMessage && (
                <p className="rounded-md border border-border/40 bg-card/40 px-3 py-2 text-sm text-muted-foreground">
                  {statusMessage}
                </p>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground font-light">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" disabled>
                Google sign-up unavailable in this release shell
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-light">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
