import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section with Integrated Preview */}
      <section className="flex-1 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Hero Copy */}
            <div className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <h1 className="text-foreground text-pretty">
                  You know what you meant.
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground text-pretty">
                  Defrag shows you what they may have heard.
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
                </p>
              </div>

              <p className="text-base text-muted-foreground italic">
                See the interaction from more than one side before the same misunderstanding gets worse.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="text-base px-8 py-6">
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>

            {/* Right: Workspace Preview */}
            <div className="hidden lg:flex justify-center">
              <div className="w-full max-w-lg aspect-square bg-background border border-border rounded-lg overflow-hidden shadow-2xl flex flex-col">
                {/* Preview Header */}
                <div className="border-b border-border px-4 py-3 bg-background/50">
                  <h3 className="text-xs font-semibold text-foreground tracking-wide">Defrag Workspace</h3>
                </div>
                
                {/* Preview Content - Three Column Layout */}
                <div className="flex-1 flex overflow-hidden gap-0.5 bg-card/5">
                  {/* Left: Thread Column */}
                  <div className="w-1/4 border-r border-border/30 bg-background/50 p-2">
                    <div className="space-y-2">
                      <div className="h-1.5 bg-muted/40 rounded w-3/4"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-full"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-2/3"></div>
                      <div className="h-1 bg-muted/20 rounded mt-3"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-4/5"></div>
                    </div>
                  </div>
                  
                  {/* Center: Canvas (DOMINANT - largest) */}
                  <div className="flex-1 border-r border-border/30 flex flex-col items-center justify-center p-4">
                    <div className="w-8 h-8 rounded-lg bg-secondary/30 border border-border/40 flex items-center justify-center mb-3">
                      <span className="text-xs font-light text-muted-foreground/60">∞</span>
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="h-1 bg-muted/30 rounded w-4/5 mx-auto"></div>
                      <div className="h-1 bg-muted/20 rounded w-3/5 mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* Right: Branch Column */}
                  <div className="w-1/4 bg-background/50 p-2">
                    <div className="space-y-2">
                      <div className="h-1.5 bg-muted/40 rounded w-2/3"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-full"></div>
                      <div className="h-1 bg-muted/20 rounded mt-3"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-3/4"></div>
                      <div className="h-1.5 bg-muted/40 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Band */}
      <section className="py-16 md:py-20 bg-card border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            How Defrag Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground">
                You describe the moment
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Share what happened and what you meant to communicate in the interaction.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground">
                Defrag shows their perspective
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                See how they may be reading your words, tone, and actions in that moment.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground">
                Get better responses
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Suggestions for what to say or do that's more likely to help and prevent misunderstanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Defrag Helps You See */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What Defrag Helps You See
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground">
                The gap between intent and impact
              </h3>
              <p className="text-base text-muted-foreground">
                Your intention doesn't always match how others receive it. Defrag helps you see and close that gap.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground">
                What might be driving their reaction
              </h3>
              <p className="text-base text-muted-foreground">
                Context, history, and unspoken emotions shape how people respond. Understanding this changes everything.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground">
                Patterns in your interactions
              </h3>
              <p className="text-base text-muted-foreground">
                Recognize recurring misunderstandings and the conditions that create them.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground">
                Paths forward
              </h3>
              <p className="text-base text-muted-foreground">
                Clear, actionable suggestions for responses and approaches that build understanding instead of conflict.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Better communication starts here
            </h2>
            <p className="text-lg text-muted-foreground">
              See the interaction from more than one side. Prevent misunderstandings before they grow.
            </p>
          </div>
          
          <Button size="lg" asChild className="text-base px-10 py-7">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
