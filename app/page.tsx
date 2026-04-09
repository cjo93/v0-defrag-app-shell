import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Hero Section - Premium Cinematic */}
      <section className="flex-1 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Premium Hero Copy */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <div className="inline-block">
                <p className="text-xs font-semibold text-primary/80 tracking-widest uppercase mb-4">Relational Intelligence</p>
              </div>
              
              <h1 className="text-foreground text-pretty leading-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">You know what</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">you meant.</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground text-pretty">
                Defrag shows you what they may have heard.
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty font-light">
                See interactions from more than one perspective before misunderstandings multiply. Defrag reveals relational context, the other person's likely reading, and paths forward that actually work.
              </p>
            </div>

            <p className="text-sm text-muted-foreground/80 italic font-light leading-relaxed">
              Dynamic AI-driven workspace. Relational maps. System perspectives. Simulations. Better communication starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" asChild className="text-base px-8 py-6 font-semibold">
                <Link href="/workspace">Start Workspace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Right: Workspace Preview - Corrected Architecture */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-xl aspect-square bg-gradient-to-br from-background via-background to-secondary/5 border border-border/40 rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>

              {/* Preview Header */}
              <div className="border-b border-border/30 px-6 py-4 bg-background/50 relative z-10">
                <h3 className="text-xs font-semibold text-foreground tracking-widest uppercase">Premium Workspace</h3>
                <p className="text-xs text-muted-foreground mt-2 font-light">Relational intelligence operating environment</p>
              </div>
              
              {/* Preview Content - LEFT THREADS + RIGHT CANVAS */}
              <div className="flex-1 flex overflow-hidden gap-0 bg-background relative z-10">
                {/* LEFT: Two Thread Lanes Stacked */}
                <div className="w-1/3 border-r border-border/30 flex flex-col gap-0 bg-background/50">
                  {/* Primary Thread */}
                  <div className="flex-1 border-b border-border/20 p-3 space-y-2">
                    <div className="space-y-1.5">
                      <div className="h-1 bg-primary/40 rounded-full w-2/3"></div>
                      <div className="h-1 bg-muted/30 rounded-full w-full"></div>
                      <div className="h-1 bg-muted/20 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  
                  {/* Branch Thread */}
                  <div className="flex-1 p-3 space-y-2">
                    <div className="space-y-1.5">
                      <div className="h-1 bg-secondary/30 rounded-full w-2/3"></div>
                      <div className="h-1 bg-muted/20 rounded-full w-full"></div>
                      <div className="h-1 bg-muted/15 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>
                
                {/* RIGHT: Dominant Multimedia Canvas */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-secondary/5 via-background to-background relative">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none"></div>
                  
                  {/* Canvas Visual */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {/* Concentric Rings - Product Identity */}
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 w-12 h-12 rounded-full border border-border/20"></div>
                      <div className="absolute inset-1 w-10 h-10 rounded-full border border-border/30"></div>
                      <div className="absolute inset-1.5 w-9 h-9 rounded-full bg-primary/10 border border-primary/40"></div>
                      <div className="absolute inset-2.5 w-7 h-7 rounded-full flex items-center justify-center">
                        <span className="text-lg font-light text-muted-foreground/60">◆</span>
                      </div>
                    </div>
                    
                    {/* Text Indicators */}
                    <div className="space-y-1 text-center">
                      <div className="h-0.5 bg-muted/40 rounded-full w-8 mx-auto"></div>
                      <div className="h-0.5 bg-muted/30 rounded-full w-10 mx-auto"></div>
                      <div className="h-0.5 bg-muted/20 rounded-full w-6 mx-auto"></div>
                    </div>
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
