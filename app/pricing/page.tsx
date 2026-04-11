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
            Choose your level of clarity
          </h1>
          <p className="text-lg text-stone-400 text-balance max-w-2xl mx-auto">
            Defrag helps you see the other side before the moment hardens. Select the plan that fits your interaction volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Personal"
            price="$29"
            description="For individuals navigating high-stakes interactions"
            features={[
              '50 workspace interactions / mo',
              'Intent & Impact mapping',
              'Next move simulations',
              'Private history',
            ]}
          />

          <PricingCard
            name="Professional"
            price="$79"
            description="For leaders and teams building relational intelligence"
            features={[
              'Unlimited interactions',
              'Shared workspace threads',
              'Team baseline mapping',
              'Priority response logic',
              'Pattern analysis',
            ]}
            highlighted
          />

          <PricingCard
            name="Studio"
            price="Custom"
            description="Custom deployments for organizations"
            features={[
              'Enterprise-grade privacy',
              'Custom integration layer',
              'Dedicated relational support',
              'On-premise options available',
            ]}
          />
        </div>

        <div className="mt-24 p-10 rounded-[32px] border border-white/10 bg-white/[0.02] text-center space-y-6 max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="font-semibold text-stone-50 text-2xl tracking-tight">Need a custom configuration?</h3>
          <p className="text-stone-400 text-lg">
            For specialized team needs or organizational scale, we offer tailored relational intelligence packages.
          </p>
          <a href="mailto:hello@defrag.com" className="inline-flex h-12 items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-stone-950 transition hover:bg-white">
            Talk to us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
