import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Hero Copy */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight tracking-tight">
                You know what you meant. Defrag shows you what they may have heard.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed font-light">
                Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
              </p>
              
              <p className="text-base text-muted-foreground/80 text-balance font-light">
                See the interaction from more than one side before the same misunderstanding gets worse.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild className="text-base font-medium px-8 py-6 bg-gradient-to-br from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/workspace">Open Workspace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 hover:bg-muted/8 transition-colors">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Right: Workspace Preview - Premium Rendering */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-2xl bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
              {/* Ambient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Preview Header */}
              <div className="border-b border-border/40 px-4 py-3 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur">
                <div className="text-xs font-semibold text-foreground tracking-wide">Live Workspace</div>
              </div>
              
              {/* Preview Content: Conversation + Canvas Layout */}
              <div className="flex-1 flex overflow-hidden min-h-[420px] relative z-10">
                {/* Left: Thread Lanes */}
                <div className="w-2/5 border-r border-border/40 flex flex-col bg-gradient-to-b from-background/80 to-background/60">
                  {/* Primary Interpretation Lane */}
                  <div className="flex-1 border-b border-border/30 p-4 space-y-2">
                    <div className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Interpretation</div>
                    <div className="space-y-2">
                      <div className="px-3 py-2.5 rounded-md bg-gradient-to-br from-primary/12 to-primary/6 border border-primary/25 text-xs text-foreground/95 leading-relaxed font-medium">
                        They may read criticism where you meant help
                      </div>
                      <div className="px-3 py-2.5 rounded-md bg-primary/6 border border-primary/15 text-xs text-foreground/80 leading-relaxed">
                        Timing felt abrupt during their stress
                      </div>
                    </div>
                  </div>
                  
                  {/* Simulations Lane */}
                  <div className="flex-1 p-4 space-y-2">
                    <div className="text-[10px] font-semibold text-secondary/80 uppercase tracking-wider">Simulations</div>
                    <div className="space-y-2">
                      <div className="px-3 py-2.5 rounded-md bg-gradient-to-br from-secondary/12 to-secondary/6 border border-secondary/25 text-xs text-foreground/95 leading-relaxed font-medium">
                        Lead with validation: "I know this is hard..."
                      </div>
                      <div className="px-3 py-2.5 rounded-md bg-secondary/6 border border-secondary/15 text-xs text-foreground/80 leading-relaxed">
                        Empathy creates safety first
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Canvas Field - Artifact Grid */}
                <div className="flex-1 p-4 bg-gradient-to-br from-background/40 to-background/20 flex flex-col gap-3">
                  {/* Artifact Grid */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/8 p-3 flex flex-col justify-between hover:border-primary/50 hover:from-primary/20 transition-all">
                      <div className="text-xs font-semibold text-primary/90">Map</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse"></div>
                        <div className="text-[10px] text-primary/70 font-medium">generating</div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/4 p-3 flex flex-col justify-between hover:border-primary/35 transition-all">
                      <div className="text-xs font-semibold text-foreground/70">System</div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></div>
                    </div>
                    
                    <div className="rounded-lg border border-secondary/20 bg-gradient-to-br from-secondary/8 to-secondary/4 p-3 flex flex-col justify-between hover:border-secondary/35 transition-all">
                      <div className="text-xs font-semibold text-foreground/70">Sim</div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></div>
                    </div>
                    
                    <div className="rounded-lg border border-border/20 bg-muted/8 p-3 flex flex-col justify-between opacity-60 hover:opacity-80 transition-opacity">
                      <div className="text-xs font-semibold text-muted-foreground/70">Timing</div>
                      <div className="w-1.5 h-1.5 rounded-full bg-muted/40"></div>
                    </div>
                  </div>

                  {/* Canvas Status */}
                  <div className="flex items-center justify-center py-2.5 rounded-lg bg-gradient-to-r from-primary/8 to-secondary/6 border border-primary/15">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse"></span>
                      <div className="text-xs text-muted-foreground/80 font-medium">Canvas live</div>
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
