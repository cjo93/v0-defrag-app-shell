'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setStatusMessage('Opening your workspace shell…')
    await new Promise((resolve) => setTimeout(resolve, 350))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
              <p className="text-muted-foreground font-light">Sign in to your Defrag account</p>
            </div>

            <div className="space-y-6 border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-foreground">Password</label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                    Forgot?
                  </Link>
                </div>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-border/40" />
                <span className="text-sm text-muted-foreground font-light">Keep me signed in</span>
              </label>

              <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Opening…' : 'Sign In'}
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
                Google sign-in unavailable in this release shell
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-light">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
