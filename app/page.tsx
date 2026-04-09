import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Hero Section - Premium Cinematic */}
      <section className="flex-1 py-12 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          {/* Left: Premium Hero Copy */}
          <div className="space-y-6 md:space-y-8 max-w-xl">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block">
                <p className="text-xs font-semibold text-primary/80 tracking-widest uppercase mb-3">Relational Intelligence</p>
              </div>
              
              <h1 className="text-foreground text-pretty leading-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">You know what you meant.</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-primary/80">Defrag shows you what they may have heard.</span>
              </h1>
              
              <h2 className="text-lg md:text-xl font-semibold text-muted-foreground text-pretty">
                Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
              </h2>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty font-light">
                See the interaction from more than one side before the same misunderstanding gets worse.
              </p>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground/80 italic font-light leading-relaxed">
              Dynamic AI workspace. Relational maps. System perspectives. Simulations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
              <Button size="lg" asChild className="text-base px-8 py-6 font-semibold bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
                <Link href="/workspace">Open Workspace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
                <Link href="/pricing">Explore Plans</Link>
              </Button>
            </div>
          </div>

          {/* Right: Workspace Preview - Corrected Architecture with Visible Outputs */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-2xl aspect-auto bg-gradient-to-br from-background via-background to-secondary/3 border border-border/40 rounded-lg overflow-hidden shadow-2xl flex flex-col relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>

              {/* Preview Header */}
              <div className="border-b border-border/30 px-5 py-3 bg-background/60 backdrop-blur-sm relative z-10">
                <h3 className="text-xs font-semibold text-foreground tracking-widest uppercase">DEFRAG Workspace</h3>
                <p className="text-xs text-muted-foreground mt-1 font-light">Live relational analysis</p>
              </div>
              
              {/* Preview Content - LEFT THREADS + RIGHT CANVAS */}
              <div className="flex-1 flex overflow-hidden gap-0 bg-gradient-to-br from-background via-background to-secondary/5 relative z-10 min-h-96">
                {/* LEFT: Two Thread Lanes Stacked */}
                <div className="w-1/3 border-r border-border/30 flex flex-col gap-0 bg-background/40">
                  {/* Primary Thread */}
                  <div className="flex-1 border-b border-border/20 p-3 space-y-2 overflow-hidden">
                    <div className="text-xs font-semibold text-foreground/80 tracking-widest uppercase">Interpretation</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="px-2 py-1.5 rounded bg-primary/12 border border-primary/20 text-foreground/90 leading-snug">You interpreted threat</div>
                      <div className="px-2 py-1.5 rounded bg-primary/8 border border-primary/15 text-foreground/80 leading-snug">They heard it as rejection</div>
                    </div>
                  </div>
                  
                  {/* Branch Thread */}
                  <div className="flex-1 p-3 space-y-2 overflow-hidden">
                    <div className="text-xs font-semibold text-foreground/80 tracking-widest uppercase">Simulation</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="px-2 py-1.5 rounded bg-secondary/12 border border-secondary/20 text-foreground/90 leading-snug">Soften lead: check-in first</div>
                      <div className="px-2 py-1.5 rounded bg-secondary/8 border border-secondary/15 text-foreground/80 leading-snug">Lead with: I value us</div>
                    </div>
                  </div>
                </div>
                
                {/* RIGHT: Dominant Multimedia Canvas - Showing Artifacts */}
                <div className="flex-1 flex flex-col p-3 gap-2 overflow-hidden">
                  {/* Artifact Cards Grid - Real Flow */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    {/* Map Card - Generating */}
                    <div className="rounded border border-primary/30 bg-primary/10 p-2 flex flex-col justify-between">
                      <div className="text-xs font-semibold text-primary/90 flex items-center gap-1">Map <span className="text-xs text-primary/70 font-light">gen…</span></div>
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-primary/70 animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      </div>
                    </div>
                    
                    {/* System Card - Ready */}
                    <div className="rounded border border-primary/20 bg-primary/8 p-2 flex flex-col justify-between">
                      <div className="text-xs font-semibold text-foreground/70">System</div>
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-primary/70"></div>
                        <div className="w-1 h-1 rounded-full bg-primary/50"></div>
                      </div>
                    </div>
                    
                    {/* Simulation Card - Ready */}
                    <div className="rounded border border-primary/20 bg-primary/8 p-2 flex flex-col justify-between">
                      <div className="text-xs font-semibold text-foreground/70">Sim</div>
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-primary/70"></div>
                      </div>
                    </div>
                    
                    {/* Timing Card - Queued */}
                    <div className="rounded border border-border/30 bg-muted/5 p-2 flex flex-col justify-between opacity-60">
                      <div className="text-xs font-semibold text-foreground/50">Timing</div>
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-muted/40"></div>
                      </div>
                    </div>
                  </div>

                  {/* Central Visual with Activity Indicator */}
                  <div className="flex items-center justify-center p-2 rounded border border-border/30 bg-gradient-to-br from-primary/5 to-secondary/3">
                    <div className="text-xs text-muted-foreground/70 font-light">Canvas Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Premium Band */}
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

      {/* CTA Section - Premium */}
      <section className="py-16 md:py-20 bg-card/50 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              See interactions from more than one side
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Start your free trial. No credit card required. Get premium workspace access instantly.
            </p>
          </div>
          
          <Button size="lg" asChild className="text-base px-10 py-7 font-semibold">
            <Link href="/workspace">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
