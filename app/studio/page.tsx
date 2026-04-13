
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import StudioQAClient from './StudioQAClient'
import { HeroArtifact } from '@/components/landing/HeroArtifact'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { WhatDefragShows } from '@/components/landing/WhatDefragShows'
import { ProofContrast } from '@/components/landing/ProofContrast'

export default function StudioPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const qaParam = searchParams?.qa
  const isQA = qaParam === '1' || (Array.isArray(qaParam) && qaParam.includes('1'))

  // When QA mode is active, render the live workspace inline for testing without redirect
  if (isQA) {
    return (
      <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-hidden pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <StudioQAClient />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <section className="relative border-b border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                  DEFRAG
                </div>
                <h1 className="mt-6 text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.02em] text-stone-50 sm:text-[3rem] lg:text-[3.75rem]">Before you answer, see the other side.</h1>
                <p className="mt-4 text-lg text-stone-300">Defrag helps you see how the moment may be landing on the other side, why it feels so different from your intent, and what to do next.</p>
                <p className="mt-3 text-sm text-stone-500">See what they may be reacting to before the moment hardens.</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/workspace" className="inline-flex h-14 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-slate-950 shadow-[0_22px_60px_rgba(0,0,0,0.42)] ring-1 ring-white/20">Open Workspace</Link>
                  <Link href="/pricing" className="inline-flex h-14 items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 text-sm font-semibold text-stone-100">See Plans</Link>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <HeroArtifact />
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <WhatDefragShows />
        <ProofContrast />
      </main>
      <Footer />
    </div>
  )
}