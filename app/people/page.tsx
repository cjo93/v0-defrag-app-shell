'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PeoplePage() {
  const people = [
    { name: 'Ari', relationship: 'Partner', sessions: 3, lastSession: '2 hours ago' },
    { name: 'Noah', relationship: 'Collaborator', sessions: 1, lastSession: '1 day ago' },
    { name: 'Family thread', relationship: 'Family', sessions: 2, lastSession: '3 days ago' },
  ]

  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-stone-50 mb-3">
                People
              </h1>
              <p className="text-lg text-stone-400 font-light">
                Your active relationship contexts and recent sessions.
              </p>
            </div>
            <Link href="/dashboard" className="text-stone-500 hover:text-stone-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person, idx) => (
              <div key={idx} className="rounded-[24px] border border-white/8 p-6 bg-white/[0.03] hover:bg-white/[0.05] transition-all hover:border-white/16">
                <h3 className="text-lg font-semibold text-stone-50 mb-2">{person.name}</h3>
                <p className="text-sm text-stone-400 mb-4">{person.relationship}</p>
                <div className="space-y-2 text-sm text-stone-400 mb-4">
                  <p>Sessions: <span className="text-stone-100 font-semibold">{person.sessions}</span></p>
                  <p>Last: {person.lastSession}</p>
                </div>
                <Link href="/workspace" className="inline-block">
                  <Button size="sm" variant="outline">View Sessions</Button>
                </Link>
              </div>
            ))}

            {/* Add New Person */}
            <div className="rounded-[24px] border border-white/8 p-6 bg-gradient-to-br from-amber-300/10 to-sky-300/5 hover:from-amber-300/14 hover:to-sky-300/10 transition-all hover:border-white/16 flex flex-col items-center justify-center text-center gap-4 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-stone-50">Add New Person</h3>
              <p className="text-sm text-stone-400 font-light">Start a new relationship context</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
