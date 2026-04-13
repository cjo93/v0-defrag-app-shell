"use client"
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PricingCard } from '@/components/pricing/pricing-card'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()

  // Local UI state for resume flow and per-plan loading
  const [isResuming, setIsResuming] = useState(false)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [resumingPlan, setResumingPlan] = useState<string | null>(null)
  const [planLoading, setPlanLoading] = useState<Record<string, boolean>>({})
  const [resumeAttempted, setResumeAttempted] = useState(false)

  // helper: set loading for a plan
  const setLoadingForPlan = (plan: string, loading: boolean) => {
    setPlanLoading((s) => ({ ...s, [plan]: loading }))
  }

  // Centralized checkout creation used by cards and resume flow.
  const createCheckout = useCallback(async (plan: string) => {
    setResumeError(null)
    setLoadingForPlan(plan, true)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: plan }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.status === 401 || res.status === 403) {
        // Not authenticated — ask server to set a short-lived resume cookie,
        // then navigate to signup. Server will be able to resume checkout after auth.
        try {
          const r = await fetch('/api/billing/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan }),
          })
          const body = await r.json().catch(() => ({}))
          window.location.href = body?.redirect || `/signup`
        } catch (e) {
          // fallback: direct client redirect if server resume failed
          window.location.href = `/signup?next=/pricing&plan=${encodeURIComponent(plan)}`
        }
        return
      }

      if (res.status === 503) {
        // Stripe or payment service down — surface calm inline error with retry
        setResumeError('We couldn’t start checkout right now. Please try again, or sign in to continue.')
        setResumingPlan(plan)
        return
      }

      if (data?.url) {
        // Successful: navigate the browser to Stripe-hosted checkout
        window.location.href = data.url
      } else {
        setResumeError('We couldn’t start checkout right now. Please try again, or sign in to continue.')
        setResumingPlan(plan)
      }
    } catch (e) {
      // Network or unexpected error — preserve intent by routing to signup so the user can continue after auth
      window.location.href = `/signup?next=/pricing&plan=${encodeURIComponent(plan)}`
    } finally {
      setLoadingForPlan(plan, false)
    }
  }, [])

  // Resume checkout after returning from auth. Attempt exactly once per page load.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const resume = params.get('resume')
      const plan = params.get('plan')
      if (resume === '1' && plan && !resumeAttempted) {
        setResumeAttempted(true)
        setIsResuming(true)
        setResumingPlan(plan)
        setResumeError(null)
        // attempt to resume by creating checkout (which will redirect on success)
        createCheckout(plan).finally(() => {
          setIsResuming(false)
        })
      }
    } catch (e) {
      // noop — parsing failure shouldn't break the page
    }
  }, [router, createCheckout, resumeAttempted])
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />

      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-[radial-gradient(circle_at_top_right,rgba(199,160,92,0.1),transparent_40%)]">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
            Access Relational Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-stone-50 text-pretty">
            Plans for continuity — not one-off fixes
          </h1>
          <p className="text-lg text-stone-400 text-balance max-w-2xl mx-auto">
            Defrag helps you see the other side before the moment hardens. Choose the level of continuity that matches how you want Defrag to follow your moments.
          </p>
          <p className="max-w-2xl mx-auto text-sm text-stone-500">Privacy, restraint, and continuity are built into every plan. All subscriptions route into onboarding so your first baseline is focused and useful.</p>
          <div className="mt-4">
            <a href="/studio?qa=1" className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-transparent px-4 py-2 text-sm font-semibold text-stone-100">Try a guided demo</a>
          </div>
          {/* Inline resume / error banner shown when returning from auth with resume intent */}
          {isResuming && resumingPlan && (
            <div className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-emerald-900/30 border border-emerald-700 px-4 py-2 text-sm text-emerald-200">
              Resuming checkout for {resumingPlan} — attempting to continue checkout.
            </div>
          )}
          {resumeError && (
            <div className="mt-6 max-w-2xl mx-auto p-4 rounded-lg border border-white/6 bg-white/3 text-stone-100">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm">
                  <div className="font-semibold">Checkout is currently unavailable.</div>
                  <div className="text-xs text-stone-300 mt-1">{resumeError}</div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if (resumingPlan) {
                        setResumeError(null)
                        setIsResuming(true)
                        createCheckout(resumingPlan).finally(() => setIsResuming(false))
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-950"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Base"
            price="$29"
            description="Start with a single moment — immediate relational clarity."
            features={[
              'One detailed moment read',
              'One repair opening suggested',
              'Short private session history',
            ]}
            onCheckout={createCheckout}
            loading={!!planLoading['base']}
          />

          <PricingCard
            name="Core"
            price="$79"
            description="Ongoing continuity — recurring reads, saved baselines, and rewrite support."
            features={[
              'Recurring moment reads',
              'Persistent baseline & memory',
              'Rewrite and phrasing support',
              'Priority onboarding and continuity',
            ]}
            highlighted
            onCheckout={createCheckout}
            loading={!!planLoading['core']}
          />

          <PricingCard
            name="Studio"
            price="Custom"
            description="Deeper pattern continuity and tailored support for extended practice."
            features={[
              'Extended pattern history and analysis',
              'Custom privacy and retention controls',
              'Integration and workflow tailoring',
              'Dedicated support and onboarding',
            ]}
            contactOnly
            onCheckout={createCheckout}
            loading={!!planLoading['studio']}
          />
        </div>

        <div className="mt-10 max-w-4xl mx-auto p-6 rounded-2xl border border-white/8 bg-white/2 text-stone-300">
          <h4 className="text-sm font-semibold text-stone-50">Why start with Defrag</h4>
          <p className="mt-2 text-sm text-stone-400">Start small. Your first moment generates a private read and a single repair opening — a low-friction way to feel the product's value. All plans prioritize privacy and continuity.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-300 mt-1" />
              <div>
                <div className="text-sm font-semibold text-stone-100">Private by default</div>
                <div className="text-xs text-stone-400">Your interactions are private and not used to train public models.</div>
              </div>
            </div>
            <div className="inline-flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-white/60 mt-1" />
              <div>
                <div className="text-sm font-semibold text-stone-100">Built for continuity</div>
                <div className="text-xs text-stone-400">Core is for ongoing practice; Studio is for tailored continuity.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 p-10 rounded-4xl border border-white/10 bg-white/2 text-center space-y-6 max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="font-semibold text-stone-50 text-2xl tracking-tight">Need a tailored configuration?</h3>
          <p className="text-stone-400 text-lg">
            For sustained practice, organizational continuity, or custom retention needs, we offer studio-grade configurations and onboarding.
          </p>
          <a href="mailto:info@defrag.app" className="inline-flex h-12 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-stone-950 transition hover:bg-white">
            Contact us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
