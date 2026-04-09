'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { IconRelationalMap, IconSystemView, IconSimulations, IconTiming } from '@/components/icons/DefragIcons'

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          <div className="space-y-8 border border-border/40 rounded-lg p-8 md:p-12 bg-gradient-to-br from-card/60 to-card/20">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/40">
                <IconRelationalMap className="w-8 h-8 text-foreground/50" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                You&apos;ve been invited to Defrag
              </h1>
              <p className="text-lg text-muted-foreground font-light max-w-md mx-auto">
                Someone wants to work through a relational moment more clearly. See how their experience may differ from yours.
              </p>
            </div>

            {/* About Section */}
            <div className="space-y-6 border-t border-border/30 pt-8">
              <h2 className="text-2xl font-semibold text-foreground">What is Defrag?</h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                Defrag is a relational intelligence operating system. It helps people understand interactions from more than one perspective—revealing what the other person may be experiencing when communication breaks down.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: IconRelationalMap, title: 'Relational Maps', desc: 'See how the other person connects the dots' },
                  { icon: IconSystemView, title: 'System Context', desc: 'Understand family and relational history' },
                  { icon: IconSimulations, title: 'Simulations', desc: 'Explore alternative conversations' },
                  { icon: IconTiming, title: 'Timing Analysis', desc: 'Understand external pressures' }
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                  <div key={idx} className="space-y-2">
                    <Icon className="w-6 h-6 text-foreground/70" />
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                )
                })}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="border-t border-border/30 pt-8 space-y-4">
              <h3 className="font-semibold text-foreground">Your Privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                You control what you share. This invite is personalized and private. Only share information you&apos;re comfortable with. All analysis stays confidential between you and the person who invited you.
              </p>
            </div>

            {/* Action */}
            <div className="border-t border-border/30 pt-8 space-y-4">
              <Link href="/signup" className="block">
                <Button className="w-full">Accept & Join</Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground font-light">
                You&apos;ll create a free Defrag account to start
              </p>
            </div>

            {/* Questions */}
            <div className="border-t border-border/30 pt-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground font-light">
                Not sure if this is for you? Have questions?
              </p>
              <a href="mailto:chadowen93@gmail.com" className="text-primary hover:underline font-medium">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
