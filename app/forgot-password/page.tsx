'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

export default function ForgotPasswordPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(72,117,125,0.08),_transparent_35%)]">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-50">Reset your password</h1>
              <p className="text-stone-400 text-sm">We&apos;ll send a secure link so you can set a new password.</p>
            </div>

            <div className="space-y-6 border border-white/10 rounded-[32px] p-8 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2 ml-1">Email</label>
                <input type="email" placeholder="name@company.com" className="w-full px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-stone-100 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all" />
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  setStatusMessage('Password reset will be available shortly. For now, return to login and contact support if you need immediate help.')
                }
              >
                Send Reset Link
              </Button>

              {statusMessage && (
                <p className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-stone-400 leading-6">
                  {statusMessage}
                </p>
              )}

              <div className="text-center">
                <p className="text-sm text-stone-500 font-light">
                  Remember your password?{' '}
                  <Link href="/login" className="text-stone-300 hover:text-stone-50 hover:underline font-semibold transition">
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
