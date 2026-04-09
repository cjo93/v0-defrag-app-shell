import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Copy */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                You know what you meant. Defrag shows you what they may have heard.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
              </p>
              
              <p className="text-base text-muted-foreground/80 text-balance font-light">
                See the interaction from more than one side before the same misunderstanding gets worse.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" asChild className="text-base px-8 py-6 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
                <Link href="/workspace">Open Workspace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Right: Workspace Preview */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-2xl bg-card border border-border rounded-lg overflow-hidden shadow-xl flex flex-col">
              {/* Preview Header */}
              <div className="border-b border-border px-4 py-3 bg-card">
                <div className="text-xs font-semibold text-foreground/90">Workspace Preview</div>
              </div>
              
              {/* Preview Content: Conversation + Canvas Layout */}
              <div className="flex-1 flex overflow-hidden min-h-[400px]">
                {/* Left: Thread Lanes */}
                <div className="w-2/5 border-r border-border flex flex-col">
                  {/* Primary Interpretation Lane */}
                  <div className="flex-1 border-b border-border/50 p-4 space-y-2 bg-background/50">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Primary</div>
                    <div className="space-y-2">
                      <div className="px-3 py-2 rounded bg-primary/10 border border-primary/20 text-xs text-foreground/90 leading-relaxed">
                        They likely interpreted this as criticism
                      </div>
                      <div className="px-3 py-2 rounded bg-primary/8 border border-primary/15 text-xs text-foreground/80 leading-relaxed">
                        Your intent was to help, but timing felt abrupt
                      </div>
                    </div>
                  </div>
                  
                  {/* Branch Simulation Lane */}
                  <div className="flex-1 p-4 space-y-2 bg-background/30">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Branch</div>
                    <div className="space-y-2">
                      <div className="px-3 py-2 rounded bg-secondary/10 border border-secondary/20 text-xs text-foreground/90 leading-relaxed">
                        Try: "I know this is hard for you..."
                      </div>
                      <div className="px-3 py-2 rounded bg-secondary/8 border border-secondary/15 text-xs text-foreground/80 leading-relaxed">
                        Lead with validation first
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Canvas Field */}
                <div className="flex-1 p-4 bg-background/20">
                  <div className="h-full flex flex-col gap-3">
                    {/* Artifact Grid */}
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <div className="rounded border border-primary/25 bg-primary/8 p-3 flex flex-col justify-between">
                        <div className="text-xs font-medium text-foreground/80">Map</div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></div>
                          <div className="text-[10px] text-primary/70">generating</div>
                        </div>
                      </div>
                      
                      <div className="rounded border border-border bg-card p-3 flex flex-col justify-between">
                        <div className="text-xs font-medium text-foreground/70">System</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                      </div>
                      
                      <div className="rounded border border-border bg-card p-3 flex flex-col justify-between">
                        <div className="text-xs font-medium text-foreground/70">Sim</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                      </div>
                      
                      <div className="rounded border border-border/50 bg-muted/20 p-3 flex flex-col justify-between opacity-50">
                        <div className="text-xs font-medium text-muted-foreground">Timing</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-muted/40"></div>
                      </div>
                    </div>

                    {/* Canvas Active Indicator */}
                    <div className="flex items-center justify-center py-3 rounded bg-primary/5 border border-primary/10">
                      <div className="text-xs text-muted-foreground/80">Canvas active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-card/50 border-y border-border/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Defrag Works
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Three steps to breakthrough understanding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Describe the moment
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Share what happened, what you meant to say, and the context around the interaction.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                See their perspective
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Defrag generates relational analysis showing how they may be reading your words and actions in that moment.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Explore paths forward
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Get clear suggestions for what to say or do that's more likely to deepen understanding instead of conflict.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Defrag Shows You */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Defrag Generates
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              AI-powered outputs for deeper understanding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 border-l-2 border-primary/40 pl-6">
              <h3 className="text-lg font-semibold text-foreground">
                Relational maps
              </h3>
              <p className="text-base text-muted-foreground font-light">
                Visual diagrams showing how the other person may be connecting the dots, what they may be assuming, and where understanding might break down.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary/40 pl-6">
              <h3 className="text-lg font-semibold text-foreground">
                System perspectives
              </h3>
              <p className="text-base text-muted-foreground font-light">
                Family and relational context that shapes how someone interprets the moment—their history, fears, values, and what matters to them.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary/40 pl-6">
              <h3 className="text-lg font-semibold text-foreground">
                Simulations & rewrites
              </h3>
              <p className="text-base text-muted-foreground font-light">
                Alternative conversations—what you might have said, how they might respond, different framings that could land better.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-primary/40 pl-6">
              <h3 className="text-lg font-semibold text-foreground">
                Timing & pressure views
              </h3>
              <p className="text-base text-muted-foreground font-light">
                Analysis of external factors, emotional states, and timing that may be intensifying misunderstanding in this specific moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-card/50 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              See interactions from more than one side
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Start your free trial. No credit card required.
            </p>
          </div>
          
          <Button size="lg" asChild className="text-base px-10 py-7">
            <Link href="/workspace">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
