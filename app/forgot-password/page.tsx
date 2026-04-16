'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-3xl items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0b0d14]/88 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
            <div className="space-y-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Password reset</p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white/92">Reset your password</h1>
              <p className="text-sm leading-6 text-white/58">We&apos;ll send a reset link while keeping the surface as calm as the rest of the product.</p>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/82">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/18" />
              </div>

              <Button className="h-12 w-full rounded-full bg-white text-sm font-semibold text-black hover:bg-white/92">
                Send reset link
              </Button>
            </div>

            <div className="mt-6 border-t border-white/8 pt-5 text-center text-sm text-white/50">
              Remember your password?{' '}
              <Link href="/login" className="font-semibold text-white/82 transition hover:text-white">
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
