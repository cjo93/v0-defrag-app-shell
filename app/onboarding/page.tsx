'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type OnboardingStep = 'welcome' | 'why' | 'profile' | 'complete'

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthLocation, setBirthLocation] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="space-y-8 text-center animate-in fade-in-50 duration-500">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
                Welcome to DEFRAG
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground/80 font-light text-balance max-w-xl mx-auto">
                A relational intelligence platform that helps you see interactions from more than one side
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep('why')}
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/20 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Why We Ask Step */}
        {step === 'why' && (
          <div className="space-y-10 animate-in fade-in-50 duration-500">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
                Build Your Baseline
              </h2>
              <p className="text-lg text-muted-foreground/80 font-light text-balance max-w-lg mx-auto">
                DEFRAG uses your birth details to create a foundational relational profile—understanding how you tend to show up in connection, conflict, and under pressure
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 space-y-6">
              <h3 className="text-lg font-bold text-foreground">What DEFRAG looks at</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Astrology</p>
                    <p className="text-xs text-muted-foreground/80 font-light mt-1">Helps understand timing, pressure, and how certain themes may be active</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Human Design</p>
                    <p className="text-xs text-muted-foreground/80 font-light mt-1">Helps understand how you process energy, decisions, and stress</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Gene Keys</p>
                    <p className="text-xs text-muted-foreground/80 font-light mt-1">Helps understand recurring growth patterns and emotional themes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Numerology</p>
                    <p className="text-xs text-muted-foreground/80 font-light mt-1">Helps understand cycles, emphasis, and pattern timing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/25">
              <p className="text-sm text-foreground/90 font-light leading-relaxed">
                <span className="font-semibold">These are lenses, not beliefs.</span> DEFRAG synthesizes patterns from multiple frameworks to give you clearer relational awareness. When another person is added, DEFRAG compares both profiles and the live situation to show where meaning may be splitting.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('welcome')}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-transparent border-2 border-foreground/20 rounded-xl hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep('profile')}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/20 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Profile Entry Step */}
        {step === 'profile' && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
                Enter Your Birth Details
              </h2>
              <p className="text-lg text-muted-foreground/80 font-light text-balance max-w-lg mx-auto">
                This information creates your foundational relational baseline
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Birth Date</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Birth Time</label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <p className="text-xs text-muted-foreground/70 font-light">If unknown, use 12:00 PM as an estimate</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Birth Location</label>
                <input
                  type="text"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  placeholder="City, State/Country"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/25">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">What Stays Private</p>
                  <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">
                    Your birth details are used to generate your baseline profile. They are never shared with other users. When relationships are added, DEFRAG compares synthesized patterns, not raw birth data.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('why')}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-transparent border-2 border-foreground/20 rounded-xl hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep('complete')}
                disabled={!birthDate || !birthLocation}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === 'complete' && (
          <div className="space-y-8 text-center animate-in fade-in-50 duration-500">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/25 to-emerald-500/10 border border-emerald-500/40 mx-auto">
                <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
                  Your Baseline Is Ready
                </h2>
                <p className="text-lg text-muted-foreground/80 font-light text-balance max-w-lg mx-auto">
                  DEFRAG is building your relational profile across multiple lenses. This will help you understand interactions with more clarity and composure.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/25 space-y-4">
              <h3 className="text-base font-bold text-foreground">What happens next</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </span>
                  <p className="text-sm text-foreground/90 font-light">Your dashboard shows your baseline and current relational context</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </span>
                  <p className="text-sm text-foreground/90 font-light">Bring a specific moment or conversation to the workspace for clarity</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </span>
                  <p className="text-sm text-foreground/90 font-light">Add relationships to see how dynamics shift when both profiles are compared</p>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/20 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
