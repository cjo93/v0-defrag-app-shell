"use client"

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function DemoPage() {
  const [explainerOpen, setExplainerOpen] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [mapHighlight, setMapHighlight] = useState(false)

  function openExplainer() {
    setExplainerOpen(true)
  }

  function closeExplainer() {
    setExplainerOpen(false)
  }

  function revealMap() {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setMapHighlight(true)
      setTimeout(() => setMapHighlight(false), 1100)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto pb-24 pt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">
              Demo — Read-only
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-stone-50">Explore a curated session</h1>
            <p className="mt-3 text-stone-400 max-w-2xl">This read-only demo shows a single curated interaction, the Defrag read, a quiet field map, and an explainer. Full interaction requires an account.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 bg-transparent">
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">SESSION</p>
                  <h2 className="mt-2 text-2xl font-semibold text-stone-50">You brought in: “Why do you always go quiet when I bring this up?”</h2>
                </div>

                <div className="rounded-2xl bg-[#0f1214]/80 p-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone-400">DEFRAg primary read</p>
                  <p className="mt-2 text-sm text-stone-300">The word “always” likely framed the question as a character judgment rather than a pattern-check. Pressure rose before safety.</p>

                  <ul className="mt-3 ml-4 list-inside list-disc text-sm text-stone-300">
                    <li>accusation before safety</li>
                    <li>pressure before reflection</li>
                  </ul>

                  <div className="mt-4 bg-emerald-300/6 p-3 rounded-md">Next move: Lower pressure first, then reopen the topic without blame.</div>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">REPAIR OPENING</p>
                  <div className="mt-2 text-sm text-stone-200">“I’m not trying to pin this on you. I want to understand what happens for you when this comes up.”</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-transparent">
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Field map</p>
                  <div
                    ref={mapRef}
                    className={`mt-3 rounded-2xl bg-[#0f1416]/70 p-4 flex items-center justify-center ${mapHighlight ? 'ring-2 ring-emerald-400/60' : ''}`}
                  >
                    <svg viewBox="0 0 200 100" className="w-full h-40 max-w-sm">
                      <circle cx="50" cy="50" r="8" fill="#f6f6f6" />
                      <text x="50" y="75" textAnchor="middle" className="text-[9px] fill-stone-200">YOU</text>
                      <circle cx="150" cy="50" r="8" fill="#f6f6f6" />
                      <text x="150" y="75" textAnchor="middle" className="text-[9px] fill-stone-200">THEM</text>
                      <path d="M60 50 C95 40, 105 40, 140 50" stroke="#f6c27a" strokeWidth="2" fill="none" />
                      <path d="M60 55 C95 65, 105 65, 140 55" stroke="#7ee7e0" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={revealMap} className="inline-flex items-center gap-3 rounded-full bg-white/[0.02] px-3 py-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span className="text-sm text-stone-100">Map live</span>
                    </button>

                    <button onClick={openExplainer} className="inline-flex items-center gap-3 rounded-full bg-white/[0.02] px-3 py-2 text-sm">
                      <div className="relative h-8 w-12 rounded-md overflow-hidden bg-gradient-to-br from-[#15202b] to-[#0b1116]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
                            <svg className="h-4 w-4 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-stone-100">0:47 explainer</span>
                    </button>
                  </div>

                  <div className="mt-6 text-sm text-stone-400">
                    This demo is read-only. Create an account to run reads on your own moments and keep a private baseline.
                  </div>

                  <div className="mt-6">
                    <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-stone-100 px-6 py-3 text-sm font-semibold text-slate-950">Create account</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {explainerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-w-3xl w-full rounded-2xl bg-[#0b0c0e] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-stone-50">Explainer — Why this read</h3>
                  <p className="mt-2 text-sm text-stone-400">A short structural explanation of how the read was formed and what to try next.</p>
                </div>
                <button onClick={closeExplainer} className="text-stone-400 hover:text-stone-200">Close</button>
              </div>

              <div className="mt-4 grid gap-4">
                <div className="text-sm text-stone-300">
                  <strong>Overview:</strong> The explainer summarizes why the moment landed as an accusation (wording, timing, pressure). It recommends a lower-pressure opening and gives one concrete phrasing.
                </div>

                <div className="rounded-md bg-[#0f1214]/60 p-4">
                  <p className="text-sm text-stone-200 font-semibold">Recommended phrasing</p>
                  <div className="mt-2 text-sm text-stone-300 italic">“I’m not trying to pin this on you. I want to understand what happens for you when this comes up.”</div>
                </div>

                <div className="text-sm text-stone-300">
                  <p className="font-semibold">Timing cue</p>
                  <p className="mt-1">Wait for a low-pressure opening; offer reassurance before content.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}


