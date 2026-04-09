'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { TopicCard } from '@/components/learn/topic-card'

const topics = [
  {
    title: 'Psychological Dynamics',
    description: 'Understanding projection, transference, and triggers in relationships',
    fullContent: `Projection occurs when we attribute our own feelings, thoughts, or fears to another person. In relationships, this often happens when we're triggered—we might assume someone is angry at us when they're actually upset about something else entirely.

Transference is when past relational patterns unconsciously show up in current relationships. If a partner reminds you of a parent, you might react to them as if they are that parent, even if they're acting completely differently.

Triggers are the moments when old wounds get activated. Understanding your own triggers helps you see when you're reacting from the past rather than responding to what's actually happening now. When you notice yourself triggered, you have the chance to pause and choose a different response.`
  },
  {
    title: 'Nervous System & Regulation',
    description: 'How stress and safety signals shape relational responses',
    fullContent: `Your nervous system has three main states: calm (parasympathetic), alert (sympathetic), and shutdown (dorsal vagal). When you feel safe, you're in calm mode—curious, open, able to hear nuance. When threatened, you go into alert mode—defensive, reactive, protective.

The polyvagal theory shows that connection and safety are physiological states. When someone feels safe with you, their nervous system relaxes and they become more receptive. Conversely, when they feel unsafe, no amount of logic will help—their threat-detection system is running the show.

Regulation means helping someone return to calm. This isn't about fixing them or changing their mind—it's about creating the conditions (safety, validation, presence) where their nervous system can downshift from protection mode to openness.`
  },
  {
    title: 'Attachment & Trauma',
    description: 'How early relationships shape current patterns and safety needs',
    fullContent: `Attachment theory describes how early relationships with caregivers create templates for how we relate to others. Secure attachment means you trust that others will be there; you can both depend and be independent. Insecure patterns (anxious, avoidant, fearful) develop when those early relationships were inconsistent, rejecting, or chaotic.

Trauma leaves imprints on the nervous system. A person with abandonment trauma may misread ambiguity as rejection. Someone with criticism trauma might hear feedback as attack. These aren't overreactions—they're nervous system patterns learned in survival.

Healing from trauma doesn't mean erasing it. It means expanding your window of tolerance—building capacity to stay regulated even when old triggers activate. Relationships that provide safety, consistency, and repair actually rewire the nervous system over time.`
  },
  {
    title: 'Emotional Processing & Validation',
    description: 'How to move emotions through the body and create safety for expression',
    fullContent: `Emotions need to move. When we suppress them, they lodge in the body as tension, numbness, or acting out. When we can feel and express them, they flow and resolve.

Validation doesn't mean agreement—it means acknowledging that what someone feels makes sense given their perspective. "That makes sense that you felt hurt" doesn't require you to have done anything wrong. It just means their experience is real and understandable.

When someone feels validated, their nervous system settles. They move from defensive explaining to genuine listening. This is why leading with "I hear you" before problem-solving is so powerful—it signals safety first.`
  },
  {
    title: 'Communication Under Pressure',
    description: 'Navigating conversations when stress, fear, or flooding is happening',
    fullContent: `"Flooding" is when someone's emotional overwhelm makes thinking impossible. They can't hear nuance, consider your perspective, or problem-solve. They're in protection mode.

When someone is flooded, the best approach is to pause. Not silence—but explicit recognition: "I can see this is really hard right now. I want to hear you, but I also want us to understand each other. Can we come back to this when we're both calmer?"

This isn't backing down—it's strategic. Continuing the conversation during flooding only embeds the conflict deeper. A pause gives both nervous systems time to regulate, and the conversation that follows will land completely differently.`
  },
  {
    title: 'Rupture & Repair',
    description: 'How to recover from conflict and deepen trust through repair',
    fullContent: `Every relationship ruptures. The question is whether it repairs well. Good repair doesn't erase the rupture—it actually strengthens the relationship because both people learn they can survive conflict.

Repair requires: acknowledgment of the impact (not just intention), genuine remorse, understanding what happened from their perspective, and commitment to different behavior.

"I'm sorry you felt that way" isn't repair—it centers your innocence. "I said something harsh and it hurt you. I can see why that landed as criticism. I want to be more thoughtful" is repair. It takes ownership, shows understanding, and signals change.`
  },
  {
    title: 'Relational Patterns & Cycles',
    description: 'Recognizing pursuer-withdrawer patterns and how to interrupt them',
    fullContent: `Many couples fall into pursuer-withdrawer cycles. One person pushes for connection; the other retreats. The more one pursues, the more the other withdraws. Both feel abandoned—one because of distance, one because of pressure.

This isn't about blame. Often the pursuer is anxious-attached and the withdrawer is avoidant-attached. Neither is wrong; they're just speaking different languages around safety and closeness.

Breaking the cycle means the pursuer learning to create safety through space, and the withdrawer learning to reach out before retreating fully. Both are acts of vulnerability that reshape the pattern.`
  },
  {
    title: 'Generational & System Dynamics',
    description: 'How family history and inherited patterns shape current relationships',
    fullContent: `Generational trauma passes through families. If your parent withdrew when hurt, you might do the same. If they criticized harshly, criticism might trigger you intensely. These patterns aren't character flaws—they're survival strategies learned in your family system.

Systems thinking shows that change in one person shifts the whole system. When you regulate differently, others respond differently. When you repair conflict instead of avoiding it, your family learns a new pattern. This is why healing your own patterns is relational—it literally changes how others can relate to you.

Understanding your family story doesn't excuse your choices, but it contextualizes them. You can then choose consciously rather than repeating automatically.`
  }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <p className="text-xs font-semibold text-primary/80 tracking-widest uppercase mb-3">Educational Resources</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Understanding Relational Dynamics
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-3xl leading-relaxed">
              Psychoeducational frameworks to deepen your understanding of patterns, attachment, communication, and what creates change in relationships. This content is general, anti-stigma, and designed to help you make sense of hard moments.
            </p>
          </div>

          {/* Topics */}
          <div className="space-y-4 mb-12">
            {topics.map((topic, idx) => (
              <TopicCard
                key={idx}
                title={topic.title}
                description={topic.description}
                fullContent={topic.fullContent}
              />
            ))}
          </div>

          {/* Disclaimers & CTA */}
          <div className="border-t border-border/40 pt-8 space-y-6">
            <p className="text-sm text-muted-foreground/90 leading-relaxed">
              These concepts come alive in context. Try describing a specific moment in the workspace, and you'll see how these dynamics show up in real conversations—family patterns, attachment responses, timing pressures, and what might actually help.
            </p>
            
            <div className="p-6 border border-border/40 rounded-lg bg-card/40 space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Important</p>
              <p className="text-sm text-muted-foreground/90 leading-relaxed">
                This content is educational, not therapeutic or diagnostic. It's designed to normalize human experience and deepen self-understanding. If you're working through significant trauma or relationship issues, consider connecting with a licensed therapist or counselor.
              </p>
            </div>

            <Button size="lg" asChild>
              <Link href="/workspace">Explore These Concepts in Your Workspace</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
