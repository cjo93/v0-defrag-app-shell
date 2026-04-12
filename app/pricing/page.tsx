import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PricingCard } from '@/components/pricing/pricing-card'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />

      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-[radial-gradient(circle_at_top_right,_rgba(199,160,92,0.1),_transparent_40%)]">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
            Access Relational Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-stone-50 text-pretty">
            Plans for continuity — not one-off fixes
          </h1>
          <p className="text-lg text-stone-400 text-balance max-w-2xl mx-auto">
            Defrag helps you see the other side before the moment hardens. Choose the level of continuity that matches how you want Defrag to follow your moments.
          </p>
          <p className="max-w-2xl mx-auto text-sm text-stone-500">Privacy, restraint, and continuity are built into every plan. All subscriptions route into onboarding so your first baseline is focused and useful.</p>
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
          />
        </div>

        <div className="mt-24 p-10 rounded-[32px] border border-white/10 bg-white/[0.02] text-center space-y-6 max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="font-semibold text-stone-50 text-2xl tracking-tight">Need a tailored configuration?</h3>
          <p className="text-stone-400 text-lg">
            For sustained practice, organizational continuity, or custom retention needs, we offer studio-grade configurations and onboarding.
          </p>
          <a href="mailto:hello@defrag.com" className="inline-flex h-12 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-stone-950 transition hover:bg-white">
            Contact us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
