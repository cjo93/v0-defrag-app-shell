import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium ambient background with liquid glass feel */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[30%] right-[25%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/12 via-primary/6 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/8 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center relative z-10">
          {/* Left: Premium Hero Copy */}
          <div className="space-y-10 max-w-2xl">
            <div className="space-y-8">
              <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-foreground leading-[1.1] tracking-[-0.02em] text-pretty">
                You know what you meant.{' '}
                <span className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/80 bg-clip-text text-transparent">
                  Defrag shows you what they may have heard.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed font-light text-pretty max-w-xl">
                Defrag helps you see how the other person may be reading the moment, why they may be reacting that way, and what kind of response is more likely to help.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground/70 font-light text-pretty max-w-lg">
                See the interaction from more than one side before the same misunderstanding gets worse.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                href="/workspace"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-background bg-foreground rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/25"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 transition-opacity group-hover:opacity-90"></div>
                <span className="relative">Open Workspace</span>
              </Link>
              
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-foreground bg-transparent border-2 border-foreground/20 rounded-lg hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200"
              >
                See Pricing
              </Link>
            </div>
          </div>

          {/* Right: Workspace Preview - Live Product Slice */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.16)] flex flex-col relative group transition-all duration-500">
              {/* Premium glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-xl pointer-events-none"></div>
              
              {/* Preview Header */}
              <div className="relative z-10 border-b border-border/30 px-5 py-3.5 bg-gradient-to-r from-card/90 via-card/80 to-card/70 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-foreground/90 tracking-wide uppercase">Workspace</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-border/40"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border/40"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border/40"></span>
                  </div>
                </div>
              </div>
              
              {/* Preview Content: Live Workspace Layout */}
              <div className="flex-1 flex overflow-hidden min-h-[480px] relative z-10">
                {/* Left: Conversation Lanes */}
                <div className="w-[42%] border-r border-border/30 flex flex-col bg-gradient-to-b from-background/95 to-background/80">
                  {/* Interpretation Lane */}
                  <div className="flex-1 border-b border-border/20 p-4 space-y-2.5">
                    <div className="text-[10px] font-bold text-primary/70 uppercase tracking-[0.08em] mb-2">Interpretation</div>
                    <div className="space-y-2">
                      <div className="px-3.5 py-3 rounded-lg bg-gradient-to-br from-primary/14 to-primary/7 border border-primary/30 text-xs text-foreground/95 leading-relaxed font-medium shadow-sm">
                        They may read criticism where you meant help
                      </div>
                      <div className="px-3.5 py-3 rounded-lg bg-primary/6 border border-primary/15 text-xs text-foreground/85 leading-relaxed">
                        Timing felt abrupt during their stress
                      </div>
                    </div>
                  </div>
                  
                  {/* Simulation Lane */}
                  <div className="flex-1 p-4 space-y-2.5">
                    <div className="text-[10px] font-bold text-secondary/70 uppercase tracking-[0.08em] mb-2">Try Another Approach</div>
                    <div className="space-y-2">
                      <div className="px-3.5 py-3 rounded-lg bg-gradient-to-br from-secondary/14 to-secondary/7 border border-secondary/30 text-xs text-foreground/95 leading-relaxed font-medium shadow-sm">
                        Lead with validation: "I know this is hard..."
                      </div>
                      <div className="px-3.5 py-3 rounded-lg bg-secondary/6 border border-secondary/15 text-xs text-foreground/85 leading-relaxed">
                        Safety signal → receptivity opens
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Relational Field - Dominant Canvas */}
                <div className="flex-1 p-5 bg-gradient-to-br from-background/60 via-background/40 to-background/30 flex flex-col gap-3.5 relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 via-transparent to-secondary/2 pointer-events-none"></div>
                  
                  {/* Artifact Grid */}
                  <div className="grid grid-cols-2 gap-2.5 flex-1 relative z-10">
                    {/* Active Map Artifact */}
                    <div className="rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/18 via-primary/10 to-primary/6 p-4 flex flex-col justify-between hover:border-primary/60 hover:from-primary/24 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group/artifact">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-primary/95 tracking-wide">Map</div>
                        <div className="text-[10px] text-primary/60 font-medium">Relational path</div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></div>
                        <div className="text-[9px] text-primary/70 font-semibold uppercase tracking-wide">Live</div>
                      </div>
                    </div>
                    
                    {/* System Artifact */}
                    <div className="rounded-xl border border-border/30 bg-gradient-to-br from-card/80 to-card/60 p-4 flex flex-col justify-between hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/12 hover:to-primary/6 transition-all cursor-pointer">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-foreground/80 tracking-wide">System</div>
                        <div className="text-[10px] text-muted-foreground/60 font-medium">Family context</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-3"></div>
                    </div>
                    
                    {/* Simulation Artifact */}
                    <div className="rounded-xl border border-border/30 bg-gradient-to-br from-card/80 to-card/60 p-4 flex flex-col justify-between hover:border-secondary/40 hover:bg-gradient-to-br hover:from-secondary/12 hover:to-secondary/6 transition-all cursor-pointer">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-foreground/80 tracking-wide">Sim</div>
                        <div className="text-[10px] text-muted-foreground/60 font-medium">Practice run</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-3"></div>
                    </div>
                    
                    {/* Timing Artifact */}
                    <div className="rounded-xl border border-border/20 bg-card/40 p-4 flex flex-col justify-between opacity-50 hover:opacity-70 transition-opacity">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-muted-foreground/70 tracking-wide">Timing</div>
                        <div className="text-[10px] text-muted-foreground/50 font-medium">Pressure view</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-muted/30 mt-3"></div>
                    </div>
                  </div>

                  {/* Canvas Status Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary/10 via-primary/6 to-secondary/8 border border-primary/20 backdrop-blur-sm relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500/90 animate-pulse"></span>
                      <div className="text-[11px] text-foreground/80 font-semibold tracking-wide">Field active</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground/60 font-medium">4 artifacts</div>
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
      <section className="py-20 md:py-24 bg-gradient-to-b from-card/40 via-card/60 to-card/80 border-t border-border/30 relative overflow-hidden">
        {/* Ambient depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-secondary/4 blur-3xl"></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10">
          <div className="space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              See interactions from more than one side
            </h2>
            <p className="text-xl text-muted-foreground/80 font-light text-balance">
              Start working with Defrag today
            </p>
          </div>
          
          <Link
            href="/workspace"
            className="inline-flex items-center justify-center px-12 py-6 text-lg font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/20 transition-all duration-300"
          >
            Open Workspace
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
