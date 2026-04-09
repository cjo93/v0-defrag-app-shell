'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
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
            <p className="text-muted-foreground">
              Here&apos;s your relational baseline and current alignment context.
            </p>
          </div>

          {/* Your Baseline - Enhanced Full-Width Panel */}
          <div className="p-8 rounded-lg bg-gradient-to-br from-primary/12 via-primary/6 to-secondary/5 border border-primary/25 space-y-6 relative overflow-hidden group hover:border-primary/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div>
                <p className="text-sm font-semibold text-primary tracking-wide uppercase">Your Baseline</p>
                <p className="text-xs text-muted-foreground/70 font-light mt-1">Your relational profile and insight foundation</p>
              </div>

              {/* Primary Profile - Plain Language First */}
              <div className="space-y-3">
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold text-foreground/95">Direct communicator who withdraws under pressure</p>
                </div>
                <div className="text-xs text-muted-foreground/85 space-y-2 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-foreground/80 font-medium">Interaction Style:</p>
                    <p>Values honesty, tends to say what you think, but timing and tone often become friction points</p>
                  </div>
                  <div>
                    <p className="text-foreground/80 font-medium">Under Pressure:</p>
                    <p>Goes quiet when stressed, needs space to process, reconnects after cooling off</p>
                  </div>
                  <div>
                    <p className="text-foreground/80 font-medium">Sensitivities:</p>
                    <p>Triggered by criticism, especially when tired or already managing stress</p>
                  </div>
                  <div>
                    <p className="text-foreground/80 font-medium">Current State:</p>
                    <p>Baseline alignment active—check-ins may help prevent cycles of withdrawal</p>
                  </div>
                </div>
              </div>

              {/* Framework Layers - Expandable */}
              <div className="space-y-3 pt-2 border-t border-primary/15">
                <button className="text-xs font-medium text-primary/65 hover:text-primary/85 transition-all flex items-center gap-1.5 group/btn">
                  <span className="inline-block w-3 h-3 flex items-center justify-center transition-transform duration-200 group-hover/btn:rotate-90">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
                      <path d="M 1 1 L 5 5 L 1 9" />
                    </svg>
                  </span>
                  <span>Framework foundations (Human Design, Astrology, Gene Keys, Numerology)</span>
                </button>

                {/* Example expanded state hint */}
                <div className="text-xs text-muted-foreground/80 space-y-2 pl-5">
                  <p className="italic">Hover or click to explore your personal frameworks—these shape how you process relationships and respond under pressure.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Relational Context - New Alignment Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border/60 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Relational Alignment</p>
                <p className="text-xs text-muted-foreground/70 font-light">How your style is landing</p>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Clarity:</span> Direct style is appreciated when timed well</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/70 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Timing mismatch:</span> Directness can feel harsh when other person is overwhelmed</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/70 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Repair pattern:</span> Space helps, but reconnection requires vulnerability</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/60 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Pressure Indicators</p>
                <p className="text-xs text-muted-foreground/70 font-light">Watch for these signals</p>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Withdrawal cycle:</span> When you go quiet, they may interpret it as rejection</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Fatigue effect:</span> Your directness amplifies when you're already tired</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1 flex-shrink-0"></span>
                  <p className="text-muted-foreground/90"><span className="text-foreground font-medium">Safety concern:</span> They may need to hear validation before problem-solving</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="h-12 text-sm font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85">
                <Link href="/workspace">Open Workspace</Link>
              </Button>

              <Button variant="outline" asChild className="h-12 text-sm font-medium hover:bg-muted/8">
                <Link href="/learn">Learn About Relational Dynamics</Link>
              </Button>
            </div>
          </div>

          {/* Features section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Workspace Features</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Relational Maps</p>
                <p className="text-xs text-muted-foreground">
                  See the interaction from their perspective
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Simulations</p>
                <p className="text-xs text-muted-foreground">
                  Try another approach before the conversation
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">System Context</p>
                <p className="text-xs text-muted-foreground">
                  Understand inherited patterns and pressures
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Timing Awareness</p>
                <p className="text-xs text-muted-foreground">
                  Learn when conversations are more likely to land
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
