'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { IconSystemView } from '@/components/icons/DefragIcons'

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-stone-50 mb-3">
                Family & Systems
              </h1>
              <p className="text-lg text-stone-400 font-light">
                Relational patterns and family context that shape meaning.
              </p>
            </div>
            <Link href="/dashboard" className="text-stone-500 hover:text-stone-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* System Map Placeholder */}
          <section className="mb-16 rounded-[28px] border border-white/8 bg-white/[0.03] p-12">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full border border-white/10 animate-pulse"></div>
                  <div className="absolute w-40 h-40 rounded-full border border-white/15 shadow-lg"></div>
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-amber-300/18 to-sky-300/10 border border-white/20 flex items-center justify-center">
                    <IconSystemView className="w-16 h-16 text-stone-200/70" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-stone-50">Family System Diagram</h2>
              <p className="text-stone-400 max-w-md font-light">
                Relational patterns, family roles, and inherited dynamics that shape interpretation during conflict.
              </p>
              <Button>Create or Load System Map</Button>
            </div>
          </section>

          {/* Framework Integration */}
          <section>
            <h2 className="text-2xl font-semibold text-stone-50 mb-6">System Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[24px] border border-white/8 p-6 bg-white/[0.03]">
                <h3 className="text-lg font-semibold text-stone-50 mb-3">Family Patterns</h3>
                <ul className="space-y-2 text-sm text-stone-400 font-light">
                  <li>• Recurring roles and dynamics</li>
                  <li>• Communication patterns</li>
                  <li>• Emotional legacies</li>
                  <li>• Implicit rules and expectations</li>
                </ul>
              </div>

              <div className="rounded-[24px] border border-white/8 p-6 bg-white/[0.03]">
                <h3 className="text-lg font-semibold text-stone-50 mb-3">System Context</h3>
                <ul className="space-y-2 text-sm text-stone-400 font-light">
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
