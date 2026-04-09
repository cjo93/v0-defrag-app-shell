'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { IconSystemView } from '@/components/icons/DefragIcons'

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Family & Systems
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Relational patterns and family contexts
              </p>
            </div>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* System Map Placeholder */}
          <section className="mb-16 border border-border/40 rounded-lg bg-gradient-to-br from-card/60 to-card/20 p-12">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full border border-border/20 animate-pulse"></div>
                  <div className="absolute w-40 h-40 rounded-full border border-border/30 shadow-lg" style={{boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.1)'}}></div>
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40 flex items-center justify-center">
                    <IconSystemView className="w-16 h-16 text-foreground/50" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Family System Diagram</h2>
              <p className="text-muted-foreground max-w-md font-light">
                Relational patterns, family roles, and system dynamics that shape interpretation in moments of conflict
              </p>
              <Button>Create or Load System Map</Button>
            </div>
          </section>

          {/* Framework Integration */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">System Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20">
                <h3 className="text-lg font-semibold text-foreground mb-3">Family Patterns</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li>• Recurring roles and dynamics</li>
                  <li>• Communication patterns</li>
                  <li>• Emotional legacies</li>
                  <li>• Implicit rules and expectations</li>
                </ul>
              </div>

              <div className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20">
                <h3 className="text-lg font-semibold text-foreground mb-3">System Context</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li>• Individual history and wounds</li>
                  <li>• Relational attachment styles</li>
                  <li>• Current system stressors</li>
                  <li>• Available resources and support</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
