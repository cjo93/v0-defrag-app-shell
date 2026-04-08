import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pretty">
            You know what you meant.
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground text-balance">
            Defrag shows you what they may have heard.
          </h2>

          <p className="text-lg text-muted-foreground text-balance">
            Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            See the interaction from more than one side before the same misunderstanding gets worse.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How Defrag Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-semibold">
                1
              </div>
              <h3 className="font-semibold text-foreground">Share the Moment</h3>
              <p className="text-sm text-muted-foreground">
                Describe the interaction and what you meant to communicate.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-semibold">
                2
              </div>
              <h3 className="font-semibold text-foreground">See Their Perspective</h3>
              <p className="text-sm text-muted-foreground">
                Understand how they may be interpreting your words and actions.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-semibold">
                3
              </div>
              <h3 className="font-semibold text-foreground">Respond Better</h3>
              <p className="text-sm text-muted-foreground">
                Get suggestions for responses more likely to help and prevent misunderstanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to communicate better?</h2>
          <p className="text-lg text-muted-foreground">
            Join teams already using Defrag to prevent misunderstandings and build stronger relationships.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
