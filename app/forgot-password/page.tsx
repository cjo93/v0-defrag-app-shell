'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Reset your password</h1>
              <p className="text-muted-foreground font-light">We&apos;ll send you a link to create a new password</p>
            </div>

            {/* Form */}
            <div className="space-y-6 border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm focus:outline-none focus:border-primary/60" />
              </div>

              <Button className="w-full">Send Reset Link</Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground font-light">
                  Remember your password?{' '}
                  <Link href="/login" className="text-primary hover:underline font-semibold">
                    Back to login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
