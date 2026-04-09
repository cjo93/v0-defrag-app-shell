'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
              <p className="text-muted-foreground font-light">Join Defrag and start seeing interactions clearly</p>
            </div>

            {/* Form */}
            <div className="space-y-6 border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
                <p className="text-xs text-muted-foreground mt-1 font-light">At least 8 characters</p>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-border/40" />
                <span className="text-sm text-muted-foreground font-light">I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <Link href="/dashboard">
                <Button className="w-full">Create Account</Button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground font-light">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">Sign up with Google</Button>
            </div>

            {/* Footer */}
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
