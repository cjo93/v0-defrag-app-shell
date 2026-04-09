'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export default function DashboardPage() {
  const [showFrameworkDetails, setShowFrameworkDetails] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Welcome section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm">
              Your relational baseline and current alignment context
            </p>
          </div>

          {/* Layer 1: Alignment Overview - Visual Badge Profile */}
          <div className="p-8 rounded-lg bg-gradient-to-br from-primary/12 via-primary/6 to-secondary/5 border border-primary/25 space-y-5 relative overflow-hidden group hover:border-primary/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-5">
              {/* Header */}
              <div>
                <p className="text-xs font-semibold text-primary tracking-widest uppercase">Your Baseline</p>
                <p className="text-xs text-muted-foreground/60 font-light mt-1">How you typically show up in relationships</p>
              </div>

              {/* Main Profile - Single Line */}
              <div className="text-sm font-semibold text-foreground/95 leading-relaxed">
                Direct communicator who withdraws under pressure
              </div>

              {/* Framework Disclosure */}
              <button 
                onClick={() => setShowFrameworkDetails(!showFrameworkDetails)}
                className="text-xs font-medium text-primary/65 hover:text-primary/85 transition-all flex items-center gap-1.5"
              >
                <span className={`inline-block w-3 h-3 flex items-center justify-center transition-transform duration-200 ${showFrameworkDetails ? 'rotate-90' : ''}`}>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
                    <path d="M 1 1 L 5 5 L 1 9" />
                  </svg>
                </span>
                <span>Framework foundations</span>
              </button>

              {/* Framework Details - Expandable */}
              {showFrameworkDetails && (
                <div className="space-y-3 pt-3 border-t border-primary/15 animate-in fade-in-50 duration-200">
                  <div className="text-xs space-y-2">
                    <div className="flex gap-2">
                      <span className="font-medium text-foreground/80 min-w-32">Human Design:</span>
                      <span className="text-muted-foreground/80">Type 4/1 → Tests commitments before trusting</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-foreground/80 min-w-32">Natal timing:</span>
                      <span className="text-muted-foreground/80">Saturn present → Scrutinizing relationship integrity now</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-foreground/80 min-w-32">Gene Keys:</span>
                      <span className="text-muted-foreground/80">Shadow/Gift patterns → Moving toward authenticity</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-foreground/80 min-w-32">Numerology:</span>
                      <span className="text-muted-foreground/80">Current cycle → Emphasis on truth and accountability</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Layer 2: Active Pressure Points - Visual Dashboard */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Active Pressure Points</p>
              <p className="text-xs text-muted-foreground/70 font-light">What&apos;s present in your relational field right now</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Pressure Point 1 */}
              <div className="p-4 rounded-lg bg-amber-500/8 border border-amber-500/25">
                <div className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/30 flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
                  </span>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-foreground">Fatigue Effect</p>
                    <p className="text-xs text-muted-foreground/80">Directness amplifies when tired</p>
                  </div>
                </div>
              </div>

              {/* Pressure Point 2 */}
              <div className="p-4 rounded-lg bg-red-500/8 border border-red-500/25">
                <div className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/30 flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80"></span>
                  </span>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-foreground">Withdrawal Cycle</p>
                    <p className="text-xs text-muted-foreground/80">Going quiet signals rejection to others</p>
                  </div>
                </div>
              </div>

              {/* Pressure Point 3 */}
              <div className="p-4 rounded-lg bg-blue-500/8 border border-blue-500/25">
                <div className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/30 flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80"></span>
                  </span>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-foreground">Criticism Sensitivity</p>
                    <p className="text-xs text-muted-foreground/80">Triggered especially when already stressed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 3: Who/Where Needs Care - Relational Focus */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Who/Where Needs Care</p>
              <p className="text-xs text-muted-foreground/70 font-light">Active relationships and focus areas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-card border border-border/60 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Primary Relationship</p>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/40">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/80">Active alignment work needed</p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border/60 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Family Context</p>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/40">
                    <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/80">Inherited patterns present</p>
              </div>
            </div>
          </div>

          {/* Layer 4: What May Help Next - Actionable Steps */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">What May Help Next</p>
              <p className="text-xs text-muted-foreground/70 font-light">Concrete next steps based on current state</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-primary/8 border border-primary/25 space-y-2">
                <p className="text-xs font-semibold text-foreground">Good timing for connection</p>
                <p className="text-xs text-muted-foreground/80">Early morning + lower stress = better landing</p>
              </div>

              <div className="p-4 rounded-lg bg-primary/8 border border-primary/25 space-y-2">
                <p className="text-xs font-semibold text-foreground">Grounding first</p>
                <p className="text-xs text-muted-foreground/80">10 min pause before difficult conversations</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/25 space-y-2">
                <p className="text-xs font-semibold text-foreground">Practice validation language</p>
                <p className="text-xs text-muted-foreground/80">Signal safety before problem-solving</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/25 space-y-2">
                <p className="text-xs font-semibold text-foreground">Map family patterns</p>
                <p className="text-xs text-muted-foreground/80">Explore inherited relational scripts</p>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-semibold text-foreground">Get Started</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="h-12 text-sm font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85">
                <Link href="/workspace">Open Workspace</Link>
              </Button>

              <Button variant="outline" asChild className="h-12 text-sm font-medium hover:bg-muted/8">
                <Link href="/learn">Explore Relational Frameworks</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
