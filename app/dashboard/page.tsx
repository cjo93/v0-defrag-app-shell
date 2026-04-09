'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export default function DashboardPage() {
  const [showFrameworkDetails, setShowFrameworkDetails] = useState(false)
  // In production, this would check actual user profile completion status
  const hasCompletedBaseline = false // Set to true to see populated state

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
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
          {/* Welcome section */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground/70 text-sm font-light">
              Your relational command center
            </p>
          </div>

          {/* Layer 1: Baseline Profile - Shows completion state or populated baseline */}
          {!hasCompletedBaseline ? (
            /* Baseline Setup Required State */
            <div className="relative p-10 rounded-2xl bg-gradient-to-br from-amber-500/12 via-amber-500/6 to-amber-500/3 border border-amber-500/30 space-y-6 overflow-hidden group hover:border-amber-500/45 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-lg font-bold text-foreground tracking-tight">Complete Your Baseline</p>
                      <p className="text-sm text-muted-foreground/80 font-light mt-1">Your relational profile unlocks after setup</p>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed font-light">
                      DEFRAG builds your baseline through birth details to understand how you show up in relationships, under pressure, and in conflict. This becomes the foundation for all relational guidance.
                    </p>
                  </div>
                </div>

                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/20 transition-all duration-200"
                >
                  Complete Baseline Setup
                </Link>
              </div>
            </div>
          ) : (
            /* Populated Baseline State */
            <div className="relative p-10 rounded-2xl bg-gradient-to-br from-primary/14 via-primary/8 to-secondary/6 border border-primary/30 space-y-6 overflow-hidden group hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-primary/80 tracking-[0.12em] uppercase">Your Baseline</p>
                    <p className="text-xs text-muted-foreground/60 font-light mt-1.5">How you show up relationally</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></span>
                    <span className="text-[10px] font-semibold text-primary/90 tracking-wide uppercase">Active</span>
                  </span>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm border border-primary/15">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/15 border border-primary/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground/95 leading-relaxed">
                      Direct communicator who values clarity and autonomy
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-2 font-light">
                      Honesty appreciated when timed well • Needs space under stress
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowFrameworkDetails(!showFrameworkDetails)}
                  className="text-xs font-semibold text-primary/70 hover:text-primary/95 transition-all flex items-center gap-2 group/btn"
                >
                  <span className={`inline-block w-3 h-3 flex items-center justify-center transition-transform duration-200 ${showFrameworkDetails ? 'rotate-90' : ''}`}>
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
                      <path d="M 1 1 L 5 5 L 1 9" />
                    </svg>
                  </span>
                  <span className="tracking-wide">What this is based on</span>
                </button>

                {showFrameworkDetails && (
                  <div className="space-y-2.5 pt-4 border-t border-primary/20 animate-in fade-in-50 duration-200">
                    <div className="text-xs space-y-2.5">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10">
                        <span className="font-semibold text-foreground/85 min-w-28 flex-shrink-0">Human Design:</span>
                        <span className="text-muted-foreground/85 font-light">How you process decisions and respond to external energy</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10">
                        <span className="font-semibold text-foreground/85 min-w-28 flex-shrink-0">Current timing:</span>
                        <span className="text-muted-foreground/85 font-light">Themes around relationship integrity may be more present</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10">
                        <span className="font-semibold text-foreground/85 min-w-28 flex-shrink-0">Gene Keys:</span>
                        <span className="text-muted-foreground/85 font-light">Recurring growth patterns between reactivity and calm</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10">
                        <span className="font-semibold text-foreground/85 min-w-28 flex-shrink-0">Numerology:</span>
                        <span className="text-muted-foreground/85 font-light">Current cycle emphasizing accountability and honesty</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Layer 2: Active Pressure Points - Premium Dashboard System */}
          <div className="space-y-4">
            <div>
              <p className="text-base font-bold text-foreground tracking-tight">Active Pressure Points</p>
              <p className="text-xs text-muted-foreground/60 font-light mt-1">What&apos;s present in your relational field right now</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pressure Point 1 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/12 to-amber-500/6 border border-amber-500/30 hover:border-amber-500/45 hover:shadow-lg hover:shadow-amber-500/10 transition-all group cursor-pointer">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/35 to-amber-500/20 border border-amber-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-amber-500/90 animate-pulse"></span>
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs font-bold text-foreground tracking-wide">Fatigue Effect</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Directness amplifies when tired</p>
                  </div>
                </div>
              </div>

              {/* Pressure Point 2 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/12 to-red-500/6 border border-red-500/30 hover:border-red-500/45 hover:shadow-lg hover:shadow-red-500/10 transition-all group cursor-pointer">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/35 to-red-500/20 border border-red-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-red-500/90 animate-pulse"></span>
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs font-bold text-foreground tracking-wide">Withdrawal Cycle</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Going quiet signals rejection</p>
                  </div>
                </div>
              </div>

              {/* Pressure Point 3 */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/12 to-blue-500/6 border border-blue-500/30 hover:border-blue-500/45 hover:shadow-lg hover:shadow-blue-500/10 transition-all group cursor-pointer">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/35 to-blue-500/20 border border-blue-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-blue-500/90 animate-pulse"></span>
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs font-bold text-foreground tracking-wide">Criticism Sensitivity</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Triggered when stressed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 3: Who/Where Needs Care - Relational Focus */}
          <div className="space-y-4">
            <div>
              <p className="text-base font-bold text-foreground tracking-tight">Who/Where Needs Care</p>
              <p className="text-xs text-muted-foreground/60 font-light mt-1">Active relationships and focus areas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-foreground tracking-tight">Primary Relationship</p>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/25 border border-emerald-500/40 group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/80 font-light">Active alignment work needed</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 hover:border-amber-500/40 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-foreground tracking-tight">Family Context</p>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/25 border border-amber-500/40 group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/80 font-light">Inherited patterns present</p>
              </div>
            </div>
          </div>

          {/* Layer 4: What May Help Next - Premium Actionable Steps */}
          <div className="space-y-4">
            <div>
              <p className="text-base font-bold text-foreground tracking-tight">What May Help Next</p>
              <p className="text-xs text-muted-foreground/60 font-light mt-1">Suggested next steps based on current state</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/6 border border-primary/30 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 border border-primary/35 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-xs font-bold text-foreground tracking-wide">Good timing for connection</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Early morning + lower stress</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/6 border border-primary/30 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 border border-primary/35 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-xs font-bold text-foreground tracking-wide">Grounding first</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">10 min pause before hard talks</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/12 to-secondary/6 border border-secondary/30 hover:border-secondary/45 hover:shadow-lg hover:shadow-secondary/5 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-secondary/20 border border-secondary/35 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-xs font-bold text-foreground tracking-wide">Practice validation language</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Signal safety before solving</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/12 to-secondary/6 border border-secondary/30 hover:border-secondary/45 hover:shadow-lg hover:shadow-secondary/5 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-secondary/20 border border-secondary/35 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="currentColor" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" />
                    </svg>
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-xs font-bold text-foreground tracking-wide">Map family patterns</p>
                    <p className="text-xs text-muted-foreground/80 font-light leading-relaxed">Explore inherited scripts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="space-y-5 pt-4">
            <h3 className="text-base font-bold text-foreground tracking-tight">Get Started</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/workspace"
                className="inline-flex items-center justify-center h-14 px-8 text-sm font-bold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/20 transition-all duration-200"
              >
                Open Workspace
              </Link>

              <Link
                href="/learn"
                className="inline-flex items-center justify-center h-14 px-8 text-sm font-bold text-foreground bg-transparent border-2 border-foreground/20 rounded-xl hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200"
              >
                Explore Frameworks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
