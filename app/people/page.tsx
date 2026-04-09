'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PeoplePage() {
  const people = [
    { name: 'Sarah', relationship: 'Partner', sessions: 3, lastSession: '2 hours ago' },
    { name: 'James', relationship: 'Colleague', sessions: 1, lastSession: '1 day ago' },
    { name: 'Mom', relationship: 'Family', sessions: 2, lastSession: '3 days ago' },
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
                People
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Your saved relationships and contexts
              </p>
            </div>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person, idx) => (
              <div key={idx} className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 transition-all hover:border-primary/40">
                <h3 className="text-lg font-semibold text-foreground mb-2">{person.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{person.relationship}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Sessions: <span className="text-foreground font-semibold">{person.sessions}</span></p>
                  <p>Last: {person.lastSession}</p>
                </div>
                <Link href="/workspace" className="inline-block">
                  <Button size="sm" variant="outline">View Sessions</Button>
                </Link>
              </div>
            ))}

            {/* Add New Person */}
            <div className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-primary/5 to-secondary/3 hover:from-primary/10 hover:to-secondary/5 transition-all hover:border-primary/40 flex flex-col items-center justify-center text-center gap-4 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Add New Person</h3>
              <p className="text-sm text-muted-foreground font-light">Start a new relationship context</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
