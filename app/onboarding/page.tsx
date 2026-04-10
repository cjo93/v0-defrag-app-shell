'use client'

import { useState } from 'react'
import Link from 'next/link'

type OnboardingStep = 'welcome' | 'why' | 'profile' | 'complete'

const frameworkCards = [
  {
    title: 'Astrology',
    description: 'A timing lens. It helps Defrag notice where pressure, intensity, or sensitivity may be louder than usual.',
  },
  {
    title: 'Human Design',
    description: 'A decision and energy lens. It helps explain how you tend to process, pace, and respond when you feel overloaded.',
  },
  {
    title: 'Gene Keys',
    description: 'A growth-pattern lens. It helps surface the emotional themes you may revisit when connection gets hard.',
  },
  {
    title: 'Numerology',
    description: 'A cycle lens. It helps highlight recurring emphasis, rhythm, and relational themes over time.',
  },
]

const fieldExplainers = [
  {
    label: 'Date of birth',
    detail: 'Used to anchor your baseline timing and pattern layers.',
  },
  {
    label: 'Birth time',
    detail: 'Helpful for a more precise baseline. If you do not know it yet, you can add it later.',
  },
  {
    label: 'Birth location',
    detail: 'Used to calculate your baseline accurately and keep the symbolic layers consistent.',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-5">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Baseline onboarding</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/92 sm:text-3xl">Build your Defrag baseline</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        {step === 'welcome' && (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                'Plain-language baseline setup',
                'Privacy and trust kept visible',
                'Built to feel calm on iPhone too',
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-white/68 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.9rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur xl:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Start here</p>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl">
                Make your baseline feel solid before the hard moments arrive.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                Defrag uses a small set of birth details to create a steadier read on your pressure patterns, relational pacing, and recurring themes. This becomes the background layer for the workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setStep('why')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92"
                >
                  Start baseline
                </button>
                <button
                  onClick={() => setStep('profile')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                >
                  I already know my details
                </button>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6 xl:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">What this unlocks</p>
              <div className="mt-5 space-y-3">
                {[
                  'A clearer read on how you sound under pressure.',
                  'More stable timing and pattern context in the workspace.',
                  'A calmer baseline for repair, pacing, and reconnection.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-3 text-sm leading-6 text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        )}

        {step === 'why' && (
          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Why we ask</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white/92">A simple explanation of the inputs</h2>
              <div className="mt-5 space-y-3">
                {fieldExplainers.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4">
                    <p className="text-sm font-semibold text-white/86">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-400/16 bg-emerald-400/8 px-4 py-4 text-sm leading-6 text-emerald-100/86">
                Defrag does not need you to know everything perfectly to begin. You can start with what you know and refine your baseline later.
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Frameworks in plain language</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {frameworkCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/8 bg-black/18 p-4">
                    <p className="text-sm font-semibold text-white/88">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">{card.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setStep('welcome')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('profile')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92"
                >
                  Continue to details
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'profile' && (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.82fr]">
            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Your details</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white/92">Enter what you know</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-semibold text-white/82">Date of birth</span>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none transition focus:border-white/18"
                  />
                </label>

                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-semibold text-white/82">Birth time</span>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none transition focus:border-white/18"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-white/82">Birth location</span>
                  <input
                    type="text"
                    placeholder="City, state, country"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/18"
                  />
                </label>
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/62">
                If your birth time is uncertain, you can keep going. Defrag will still build a useful baseline and let you refine it later.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setStep('why')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('complete')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92"
                >
                  Build baseline
                </button>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Trust and privacy</p>
              <div className="mt-5 space-y-3">
                {[
                  'These details are used to build your baseline, not to turn the UI into jargon.',
                  'The symbolic layers stay behind the scenes unless you choose to open them.',
                  'The goal is clearer relational context, not abstract language.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="rounded-[1.9rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6 text-center backdrop-blur sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Baseline ready</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white/92">Your Defrag baseline is ready to use.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/66">
              You now have a steadier starting point for timing, pressure, and relational pattern reads across the workspace and dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92"
              >
                Go to dashboard
              </Link>
              <Link
                href="/workspace"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
              >
                Open workspace
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
