'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { useState } from 'react'

const topics = [
  {
    id: 'psychology',
    title: 'Psychological Dynamics',
    description: 'Projection, transference, and how past patterns shape current reactions',
    icon: '🧠'
  },
  {
    id: 'coping',
    title: 'Coping & Regulation',
    description: 'Nervous system awareness and grounding strategies under pressure',
    icon: '🌬️'
  },
  {
    id: 'attachment',
    title: 'Attachment & Trauma',
    description: 'Developmental patterns and how they influence relational triggers',
    icon: '🔗'
  },
  {
    id: 'emotional',
    title: 'Emotional Processing',
    description: 'Validation, expression, and safe containment of difficult feelings',
    icon: '💙'
  },
  {
    id: 'communication',
    title: 'Communication Under Pressure',
    description: 'Managing triggers and staying connected when emotions escalate',
    icon: '💬'
  },
  {
    id: 'repair',
    title: 'Rupture & Repair',
    description: 'How to recover from conflicts and rebuild connection',
    icon: '🔧'
  },
  {
    id: 'patterns',
    title: 'Relational Patterns',
    description: 'Pursuer-withdrawer cycles, patterns across relationships',
    icon: '🔄'
  },
  {
    id: 'generational',
    title: 'Generational Dynamics',
    description: 'How inherited patterns shape current interactions',
    icon: '🌳'
  },
]

export default function LearnPage() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <p className="text-xs font-semibold text-primary/80 tracking-widest uppercase mb-3">Educational Resources</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Understanding Relational Dynamics
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl">
              Psychoeducational content to deepen your understanding of patterns, attachment, communication, and connection. Learn at your own pace.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="border border-border/40 rounded-lg p-6 bg-gradient-to-br from-card/60 to-card/20 hover:from-card/80 hover:to-card/40 transition-all cursor-pointer"
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-foreground pr-4">{topic.title}</h3>
                  <span className={`transform transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`}>▼</span>
                </div>
                
                <p className="text-sm text-muted-foreground font-light mb-4">
                  {topic.description}
                </p>

                {expandedTopic === topic.id && (
                  <div className="space-y-4 pt-4 border-t border-border/20">
                    <div className="text-sm leading-relaxed text-muted-foreground/90 space-y-2">
                      <p>
                        {topic.id === 'psychology' && 'Explore how unconscious patterns from past relationships shape how we interpret current interactions. Learn about projection (seeing ourselves in others) and transference (reliving past dynamics in present relationships).'}
                        {topic.id === 'coping' && 'Understand your nervous system\'s response to stress and triggers. Learn grounding techniques, breathing practices, and body-based awareness to maintain connection during difficult moments.'}
                        {topic.id === 'attachment' && 'Discover how early relationships with caregivers create internal blueprints for all future connections. Understand avoidant, anxious, and secure attachment patterns and how they show up in relationships.'}
                        {topic.id === 'emotional' && 'Learn why validation—truly being heard and understood—is foundational to emotional safety. Explore how to create conditions where difficult feelings can be expressed and processed.'}
                        {topic.id === 'communication' && 'Master the skills for staying present and connected when emotions are high. Learn how to name your needs, listen without defending, and repair quickly when misunderstandings happen.'}
                        {topic.id === 'repair' && 'Ruptures happen in every relationship. Learn the proven steps for sincere apology, accountability, and rebuild trust after conflict. Repair actually deepens connection when done well.'}
                        {topic.id === 'patterns' && 'Recognize the cycles that keep repeating. The pursuer-withdrawer dance, alternating criticism and defensiveness, or patterns where one person manages emotions for two. Awareness is the first step to change.'}
                        {topic.id === 'generational' && 'Your parents\' relational patterns live in your body and nervous system. Learn how to recognize inherited dynamics and consciously choose different ways of relating.'}
                      </p>
                    </div>

                    {/* Audio/Video Shells */}
                    <div className="flex gap-2 pt-2">
                      <button className="text-xs px-3 py-2 rounded bg-primary/10 border border-primary/20 text-primary/90 hover:bg-primary/20 transition-colors font-medium">
                        Listen (audio shell)
                      </button>
                      <button className="text-xs px-3 py-2 rounded bg-secondary/10 border border-secondary/20 text-secondary/90 hover:bg-secondary/20 transition-colors font-medium">
                        Watch (video shell)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 p-6 border border-border/40 rounded-lg bg-card/40">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              <span className="font-semibold text-foreground">Note:</span> This content is educational only, not therapeutic or diagnostic. It&apos;s designed to normalize human experience and deepen self-understanding. If you&apos;re working through significant trauma or relationship issues, consider connecting with a licensed therapist or counselor.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
