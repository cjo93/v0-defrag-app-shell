"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type OnboardingStep = 'orientation' | 'context' | 'complete'

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('orientation')
  const [relation, setRelation] = useState('partner')
  const [moment, setMoment] = useState('A recent disagreement')
  const [goal, setGoal] = useState<'clarity' | 'rewrite' | 'pattern'>('clarity')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Persist onboarding baseline/profile and seed starter workspace/thread
  const handleComplete = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const supabase = createClient()
      // Update user profile with onboarding context
      await supabase.from('profiles').upsert({
        // user id will be set by RLS/session
        relation,
        onboarding_moment: moment,
        onboarding_goal: goal,
        completed_onboarding: true,
      })
      // Create starter workspace/thread if missing
      let created = false;
      try {
        const res = await fetch('/api/workspaces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `First moment: ${moment}`,
            seed: {
              relation,
              moment,
              goal,
            },
          }),
        });
        const data = await res.json();
        if (res.ok && data.workspace) {
          created = true;
        }
      } catch {}
      // Fallback: always create a starter workspace if not created
      if (!created) {
        await fetch('/api/workspaces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Welcome to Defrag',
            seed: {
              relation: relation || 'partner',
              moment: moment || 'They seemed upset when I said we needed to talk about this.',
              goal: goal || 'clarity',
            },
          }),
        });
      }
      // Redirect to dashboard after onboarding
      router.push('/dashboard')
    } catch (err: any) {
      setError('Failed to complete onboarding. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.06),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Onboarding</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white/92 sm:text-3xl">Enter the field</h1>
          </div>
          <Link href="/signup" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/8 hover:text-white">
            Back
          </Link>
        </div>

        {step === 'orientation' && (
          <div className="rounded-[1.8rem] border border-white/8 bg-white/3 p-6 xl:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Orientation</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/92">A quieter way to see the other side</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
              Defrag helps you understand how a moment may be landing on someone else, what is shaping the reaction, and a low-pressure next move you can try. This is concise, private, and built for real moments.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep('context')}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/92"
              >
                Start
              </button>
              <button
                onClick={() => setStep('context')}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/8"
              >
                I know the moment I want
              </button>
            </div>
          </div>
        )}

        {step === 'context' && (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.48fr]">
              <div className="rounded-[1.8rem] border border-white/8 bg-white/3 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Context</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white/92">A few details to make your first read useful</h2>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-white/82">Relationship</span>
                  <select value={relation} onChange={(e) => setRelation(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none">
                    <option value="partner">Partner</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="family">Family</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-white/82">Moment (short)</span>
                  <input value={moment} onChange={(e) => setMoment(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none" />
                </label>

                <div>
                  <span className="text-sm font-semibold text-white/82">What do you want from this read?</span>
                  <div className="mt-3 flex gap-2">
                            <button onClick={() => setGoal('clarity')} className={`px-4 py-2 rounded-full ${goal === 'clarity' ? 'bg-white text-black' : 'bg-white/4 text-white/80'}`}>Clarity</button>
                            <button onClick={() => setGoal('rewrite')} className={`px-4 py-2 rounded-full ${goal === 'rewrite' ? 'bg-white text-black' : 'bg-white/4 text-white/80'}`}>Rewrite</button>
                            <button onClick={() => setGoal('pattern')} className={`px-4 py-2 rounded-full ${goal === 'pattern' ? 'bg-white text-black' : 'bg-white/4 text-white/80'}`}>Pattern</button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                      <button onClick={() => setStep('orientation')} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80">Back</button>
                <button onClick={() => setStep('complete')} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Build baseline</button>
              </div>
            </div>

              <div className="rounded-[1.8rem] border border-white/8 bg-linear-to-br from-primary/8 to-black/12 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Privacy and approach</p>
              <div className="mt-4 space-y-3 text-sm text-white/72">
                <div className="rounded-2xl border border-white/8 bg-black/14 px-4 py-3">Minimal data. Private reads kept for continuity only.</div>
                <div className="rounded-2xl border border-white/8 bg-black/14 px-4 py-3">We focus on one moment at a time—no overcollection.</div>
                <div className="rounded-2xl border border-white/8 bg-black/14 px-4 py-3">You control what stays in your baseline.</div>
              </div>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="rounded-[1.8rem] border border-primary/16 bg-linear-to-br from-primary/12 via-primary/6 to-black/16 p-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Ready</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white/92">Your baseline is set</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/66">You now have a focused starting point. Start with one moment and let Defrag keep the context private and continuous.</p>
            {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={handleComplete}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Completing...' : 'Go to dashboard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
