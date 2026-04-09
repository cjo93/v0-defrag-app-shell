'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Settings
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Customize your Defrag experience
              </p>
            </div>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Profile Settings */}
            <section className="border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Profile</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                  <input type="email" value="user@example.com" disabled className="w-full px-4 py-2 rounded border border-border/40 bg-background/50 text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Display Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </section>

            {/* Framework Preferences */}
            <section className="border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Framework Preferences</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-light mb-6">
                  Select which symbolic frameworks to enable in your workspace analysis
                </p>
                {['Astrology', 'Human Design', 'Numerology', 'I Ching'].map((fw, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 rounded border-border/40" />
                    <span className="text-sm font-medium text-foreground">{fw}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Privacy & Data */}
            <section className="border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Privacy & Data</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border/40" />
                  <span className="text-sm font-medium text-foreground">Allow Defrag to improve with my data</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border/40" />
                  <span className="text-sm font-medium text-foreground">Email me weekly briefs</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border/40" />
                  <span className="text-sm font-medium text-foreground">Send me insights about my patterns</span>
                </label>
              </div>
            </section>

            {/* Workspace Settings */}
            <section className="border border-border/40 rounded-lg p-8 bg-gradient-to-br from-card/60 to-card/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Workspace</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Default Analysis Depth</label>
                  <select className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm">
                    <option>Standard (relational maps + simulations)</option>
                    <option>Deep (includes family systems)</option>
                    <option>Advanced (with frameworks)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Thread Behavior</label>
                  <select className="w-full px-4 py-2 rounded border border-border/40 bg-background text-foreground text-sm">
                    <option>Show branch thread by default</option>
                    <option>Hide branch thread by default</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="border border-red-500/30 rounded-lg p-8 bg-red-500/5">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Danger Zone</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-light">
                  These actions cannot be undone. Proceed with caution.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-red-600 border-red-500/40 hover:bg-red-500/10">
                    Export My Data
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-500/40 hover:bg-red-500/10">
                    Delete All Sessions
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
