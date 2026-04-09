'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'
import { useState } from 'react'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  
  const steps = [
    {
      num: 1,
      title: 'Welcome to Defrag',
      description: 'See interactions from more than one perspective',
      content: (
        <div className="space-y-6 text-center">
          <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-40 h-40 rounded-full border border-border/20 animate-pulse"></div>
                <div className="absolute w-32 h-32 rounded-full border border-border/30"></div>
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                  <IconRelationalMap className="w-12 h-12 text-foreground/50" />
                </div>
              </div>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground font-light max-w-md mx-auto">
              Defrag is a relational intelligence operating system. It helps you see what the other person might be experiencing when communication breaks down.
            </p>
          </div>
        </div>
      )
    },
    {
      num: 2,
      title: 'How It Works',
      description: 'Three simple steps to clarity',
      content: (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            {[
              { num: '1', title: 'Describe the moment', desc: 'Share what happened and what you meant to say' },
              { num: '2', title: 'See their perspective', desc: 'Defrag generates how they may be reading your words' },
              { num: '3', title: 'Explore paths forward', desc: 'Get clear suggestions for better communication' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{item.num}</span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: 3,
      title: 'Key Outputs',
      description: 'What you&apos;ll see',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { icon: IconRelationalMap, label: 'Relational Maps', desc: 'Visual connections and assumptions' },
            { icon: IconSystemView, label: 'System Views', desc: 'Family dynamics and patterns' },
            { icon: IconSimulations, label: 'Simulations', desc: 'Alternative conversations' },
            { icon: IconTiming, label: 'Timing Analysis', desc: 'Pressure and context factors' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
            <div key={idx} className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20">
              <Icon className="w-8 h-8 mb-3 text-foreground/70" />
              <p className="font-semibold text-foreground mb-2">{item.label}</p>
              <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
            </div>
          )
          })}
        </div>
      )
    },
    {
      num: 4,
      title: 'Ready to Start',
      description: 'Create your first relational analysis',
      content: (
        <div className="space-y-6 text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40">
            <span className="text-5xl font-light text-foreground/50">✓</span>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">You&apos;re all set</p>
            <p className="text-muted-foreground font-light">
              Jump into your workspace and describe an interaction to begin seeing it from multiple perspectives.
            </p>
          </div>
        </div>
      )
    }
  ]

  const currentStep = steps[step - 1]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2 flex-1">
                  <button
                    onClick={() => setStep(s)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      s <= step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground border border-border/40'
                    }`}
                  >
                    {s <= step && step > s ? '✓' : s}
                  </button>
                  <span className="text-xs font-medium text-center">{`Step ${s}`}</span>
                </div>
              ))}
            </div>
            <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {currentStep.title}
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                {currentStep.description}
              </p>
            </div>

            <div className="border border-border/40 rounded-lg p-12 bg-gradient-to-br from-card/60 to-card/20">
              {currentStep.content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              ) : (
                <Link href="/workspace">
                  <Button>Start Workspace</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
