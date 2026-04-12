
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(199,160,92,0.18),transparent_26%),radial-gradient(circle_at_80%_16%,rgba(72,117,125,0.16),transparent_24%),linear-gradient(180deg,#101113_0%,#0b0c0e_100%)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <section className="relative isolate border-b border-white/8">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-y-0 left-[7%] w-px bg-white/5" />
            <div className="absolute inset-y-0 right-[7%] w-px bg-white/5" />
          </div>
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-360 grid-cols-1 gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(min(100%,560px),1fr)] lg:px-10 lg:pb-14 lg:pt-10">
            <div className="relative flex flex-col justify-between gap-10 lg:py-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                  DEFRAG workspace
                </div>
                <div className="max-w-xl space-y-4">
                  <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-stone-50 sm:text-[3.25rem] lg:text-[4.25rem]">
                    Your relationship-intelligence studio
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-stone-300 sm:text-lg">
                    See how a moment is landing, why it feels so different from your intent, and what to do next. Defrag is a cinematic workspace for relational clarity.
                  </p>
                  <p className="max-w-lg text-sm leading-6 text-stone-500">Not a chatbot. A relational intelligence system for moments that can still go either way.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row items-start">
                  <Link href="/workspace" className="inline-flex h-14 min-h-12 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-slate-950 shadow-[0_22px_60px_rgba(0,0,0,0.42)] ring-1 ring-white/20 transition hover:-translate-y-px hover:bg-white">
                    Open Workspace
                  </Link>
                  <Link href="/pricing" className="inline-flex h-14 min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 text-sm font-semibold text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/8">
                    See Plans
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              {/* Cinematic workspace visual: always visible, less card stacking */}
              <div className="aspect-video w-full max-w-lg rounded-3xl border border-white/10 bg-linear-to-br from-[#1a1d22] to-[#0b0c0e] shadow-2xl flex items-center justify-center">
                <span className="text-stone-400 text-lg font-semibold">Workspace Cinematic Visual</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}