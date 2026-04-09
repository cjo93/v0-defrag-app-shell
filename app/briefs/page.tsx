'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function BriefsPage() {
  const briefs = [
    { date: 'Today', patterns: ['Avoidance during conflict', 'Seeking reassurance', 'Pattern repeating with Sarah'], actions: 3 },
    { date: 'Yesterday', patterns: ['Expressing needs clearly', 'Listening without defending', 'Emotional regulation improving'], actions: 2 },
    { date: '3 days ago', patterns: ['Conflict escalation', 'Triggered old wound', 'Historical patterns surfacing'], actions: 4 },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Daily Briefs
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Your patterns, insights, and next steps
              </p>
            </div>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* Briefs Timeline */}
          <div className="space-y-4">
            {briefs.map((brief, idx) => (
              <div key={idx} className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{brief.date}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                    {brief.actions} Actions
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Patterns Detected</h4>
                  <ul className="space-y-2">
                    {brief.patterns.map((pattern, pidx) => (
                      <li key={pidx} className="text-sm text-muted-foreground font-light flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-border/20 flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="ghost">Export</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Insights Section */}
          <section className="mt-16 border border-border/40 rounded-lg bg-gradient-to-br from-card/60 to-card/20 p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">This Week's Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-border/20 rounded-lg bg-background/20">
                <p className="text-xs font-semibold text-primary/90 tracking-wide uppercase mb-2">Breakthrough</p>
                <p className="text-sm text-muted-foreground font-light">Improved listening skills emerging in interactions with James</p>
              </div>
              <div className="p-4 border border-border/20 rounded-lg bg-background/20">
                <p className="text-xs font-semibold text-primary/90 tracking-wide uppercase mb-2">Recurring</p>
                <p className="text-sm text-muted-foreground font-light">Conflict escalation pattern with Sarah requires system-level intervention</p>
              </div>
              <div className="p-4 border border-border/20 rounded-lg bg-background/20">
                <p className="text-xs font-semibold text-primary/90 tracking-wide uppercase mb-2">Opportunity</p>
                <p className="text-sm text-muted-foreground font-light">Family context work could unlock deeper understanding with Mom</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
