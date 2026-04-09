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
              Here&apos;s your overview of recent activity and interactions.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Active Workspaces</p>
              <p className="text-3xl font-bold text-foreground">1</p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Interactions This Month</p>
              <p className="text-3xl font-bold text-foreground">0</p>
            </div>

            {/* Your Baseline Panel - Premium Treatment */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-primary/12 via-primary/6 to-secondary/5 border border-primary/25 space-y-4 relative overflow-hidden group hover:border-primary/40 transition-colors">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary tracking-wide uppercase">Your Baseline</p>
                  <p className="text-xs text-muted-foreground/70 font-light mt-1">Your relational profile</p>
                </div>
              </div>
              
              {/* Plain-language first layer - prominent */}
              <div className="relative z-10 space-y-3">
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold text-foreground/95">Direct communicator who withdraws under pressure</p>
                </div>
                <div className="text-xs text-muted-foreground/80 space-y-1.5 leading-relaxed">
                  <p>Tends to go quiet when stressed, then reconnects after cooling off</p>
                  <p>Triggered by criticism when already tired</p>
                  <p>Values honesty but struggles with timing and tone</p>
                </div>
              </div>
              
              {/* Secondary frameworks disclosure - refined */}
              <button className="relative z-10 text-xs font-medium text-primary/60 hover:text-primary/80 transition flex items-center gap-1.5 pt-2 group/btn">
                <span className="inline-block w-3 h-3 flex items-center justify-center transform transition-transform group-hover/btn:translate-x-0.5">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
                    <path d="M 1 1 L 5 5 L 1 9" />
                  </svg>
                </span>
                <span>Based on: insight layers</span>
              </button>
            </div>
          </div>

          {/* Recent section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get Started</h3>

            <div className="p-6 rounded-lg bg-card border border-border space-y-4">
              <h4 className="font-medium text-foreground">Create your first workspace</h4>
              <p className="text-sm text-muted-foreground">
                Set up a workspace to begin analyzing interactions and getting insights.
              </p>
              <Button asChild>
                <Link href="/workspace">Go to Workspace</Link>
              </Button>
            </div>
          </div>

          {/* Features section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Key Features</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Multi-perspective Analysis</p>
                <p className="text-xs text-muted-foreground">
                  See interactions from multiple viewpoints
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Suggested Responses</p>
                <p className="text-xs text-muted-foreground">
                  Get recommendations for better communication
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Team Collaboration</p>
                <p className="text-xs text-muted-foreground">
                  Work together to prevent misunderstandings
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                <p className="font-medium text-foreground text-sm">Insights & Analytics</p>
                <p className="text-xs text-muted-foreground">
                  Track patterns and improve over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
