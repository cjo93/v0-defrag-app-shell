'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { TopicCard } from '@/components/learn/topic-card'

// Icon components (simple SVG-based)
const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const IconHeart = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const IconCycle = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

const IconVoice = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
  </svg>
)

const IconDots = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

const topics = [
  {
    title: 'Psychological Dynamics',
    description: 'Projection, transference, and how past patterns show up now',
    icon: IconBrain,
    explainer: 'Projection means we attribute our feelings to others. Transference is when past relational patterns unconsciously activate in current relationships. Triggers are moments when old wounds activate—recognizing them helps you choose conscious responses instead of reacting automatically.',
    keywords: ['Projection', 'Transference', 'Triggers', 'Awareness']
  },
  {
    title: 'Nervous System & Regulation',
    description: 'How safety signals reshape relational responses',
    icon: IconVoice,
    explainer: 'Your nervous system has three states: calm (open), alert (defensive), and shutdown. Connection and safety are physiological states—when someone feels safe, they downregulate and become receptive. Regulation isn\'t about fixing them; it\'s about creating safety conditions where their system can shift from protection to openness.',
    keywords: ['Polyvagal', 'Safety', 'Threat Detection', 'Regulation']
  },
  {
    title: 'Attachment & Trauma',
    description: 'How early relationships shape security and triggers',
    icon: IconHeart,
    explainer: 'Early relationships create templates for how we relate to others. Secure attachment builds trust; insecure patterns develop from inconsistency or rejection. Trauma leaves nervous system imprints—past abandonment may cause misinterpretation of ambiguity. Healing means expanding your window of tolerance so you stay regulated even when old triggers activate.',
    keywords: ['Attachment Styles', 'Nervous System', 'Healing', 'Tolerance']
  },
  {
    title: 'Emotional Processing',
    description: 'How validation creates safety and unlocks collaboration',
    icon: IconHeart,
    explainer: 'Emotions need to move through the body to resolve—suppression lodges them as tension. Validation isn\'t agreement; it\'s acknowledging that someone\'s feelings make sense given their perspective. When validated, nervous systems settle and people move from defense to openness—this is why leading with "I hear you" before problem-solving is so powerful.',
    keywords: ['Validation', 'Safety', 'Expression', 'Connection']
  },
  {
    title: 'Communication Under Pressure',
    description: 'How to stay connected when stress or flooding happens',
    icon: IconVoice,
    explainer: 'Flooding is when emotional overwhelm makes thinking impossible—the person can\'t hear nuance or problem-solve. The strategic response: pause with explicit recognition ("I see this is hard. Can we come back when calmer?"). This isn\'t backing down; it\'s giving both nervous systems time to regulate so the next conversation can actually land.',
    keywords: ['Flooding', 'Pausing', 'Regulation', 'Timing']
  },
  {
    title: 'Rupture & Repair',
    description: 'How conflict actually deepens trust when repair is genuine',
    icon: IconCycle,
    explainer: 'Every relationship ruptures—what matters is whether it repairs well. Good repair includes: acknowledging impact (not just intent), genuine remorse, understanding their perspective, and commitment to change. "I said something harsh and it hurt you. I can see why that felt like criticism. I want to be more thoughtful" is repair. It takes ownership and signals genuine change.',
    keywords: ['Accountability', 'Ownership', 'Understanding', 'Change']
  },
  {
    title: 'Relational Patterns & Cycles',
    description: 'Understanding pursuer-withdrawer and other stuck loops',
    icon: IconCycle,
    explainer: 'Many couples get stuck in pursuer-withdrawer cycles: one pushes for connection, the other retreats. Often anxious and avoidant attachment patterns. Breaking the cycle: pursuers learn to create safety through space; withdrawers learn to reach out before fully retreating. Both acts of vulnerability reshape the pattern.',
    keywords: ['Pursuer-Withdrawer', 'Attachment', 'Cycles', 'Interruption']
  },
  {
    title: 'Generational & System Dynamics',
    description: 'How family history shapes relational templates',
    icon: IconDots,
    explainer: 'Generational trauma passes through families as survival strategies. When you change one pattern, the whole system responds differently. Healing your own patterns is relational—it literally changes how others can relate to you. Understanding your family story doesn\'t excuse choices, but it contextualizes them so you can choose consciously.',
    keywords: ['Family Patterns', 'Systems', 'Healing', 'Awareness']
  }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Premium Header */}
          <div className="mb-14 md:mb-20">
            <div className="inline-block mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></span>
                <span className="text-[10px] font-bold text-primary/90 tracking-[0.12em] uppercase">Educational Frameworks</span>
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-[1.08] tracking-tight">
              Understanding Relational Dynamics
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 font-light max-w-2xl leading-relaxed text-pretty">
              Explore the frameworks that shape how we show up in relationships. Visual-first, scannable, designed to deepen self-understanding.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="space-y-3 mb-12">
            {topics.map((topic, idx) => (
              <TopicCard
                key={idx}
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                explainer={topic.explainer}
                keywords={topic.keywords}
              />
            ))}
          </div>

          {/* Premium Footer & CTA */}
          <div className="border-t border-border/30 pt-12 space-y-8 mt-8">
            <p className="text-base text-muted-foreground/85 leading-relaxed max-w-3xl font-light">
              These concepts come alive in context. Bring a specific moment to the workspace, and you'll see how these dynamics show up in real conversations—family patterns, attachment responses, timing pressures, and what might actually help.
            </p>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/40 space-y-4">
              <p className="text-[10px] font-bold text-foreground/80 uppercase tracking-[0.12em]">Disclaimer</p>
              <p className="text-sm text-muted-foreground/85 leading-relaxed font-light">
                This content is educational and anti-stigma, not therapeutic or diagnostic. If you're working through significant trauma or relationship issues, a licensed therapist can provide personalized support.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-background bg-foreground rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/20 transition-all duration-300"
            >
              Try These Concepts in Your Workspace
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
