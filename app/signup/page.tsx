'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'

const signupBenefits = [
  'Open the workspace, command center, and learning layer from one account.',
  'Keep the visual system calm and premium even before full auth wiring is complete.',
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-10rem)] max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
              Create account
            </div>
            <div className="space-y-4">
              <h1 className="max-w-[12ch] text-4xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-5xl">
                Start with a steadier surface for hard moments.
              </h1>
              <p className="max-w-lg text-base leading-7 text-white/66 sm:text-lg sm:leading-8">
                Create your Defrag account to move from landing into the workspace, onboarding, and briefs without losing continuity.
              </p>
            </div>

            <div className="grid gap-3">
              {signupBenefits.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/70 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-lg justify-self-end">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b0d14]/88 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Account setup</p>
                <h2 className="text-2xl font-semibold text-white/92">Create your Defrag account</h2>
                <p className="text-sm leading-6 text-white/58">A polished signup shell that matches the product tone instead of a generic auth template.</p>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/82">Full name</label>
                  <input type="text" placeholder="Your name" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/18" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/82">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/18" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/82">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/18" />
                  <p className="mt-2 text-xs text-white/38">At least 8 characters</p>
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent" />
                  <span className="text-sm leading-6 text-white/62">I agree to the terms and privacy language for this product shell.</span>
                </label>

                <Link href="/dashboard" className="block">
                  <Button className="h-12 w-full rounded-full bg-white text-sm font-semibold text-black hover:bg-white/92">Create account</Button>
                </Link>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#0b0d14] px-3 text-white/34">or</span>
                  </div>
                </div>

                <Button variant="outline" className="h-12 w-full rounded-full border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.07]">
                  Sign up with Google
                </Button>
              </div>

              <div className="mt-6 border-t border-white/8 pt-5 text-center text-sm text-white/50">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-white/82 transition hover:text-white">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
