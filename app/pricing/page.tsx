import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PricingCard } from '@/components/pricing/pricing-card'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-pretty">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Core"
            price="$29"
            description="Perfect for individuals"
            features={[
              'Up to 50 interactions per month',
              'Single workspace',
              'Email support',
              'Basic insights',
            ]}
          />

          <PricingCard
            name="System"
            price="$79"
            description="For growing teams"
            features={[
              'Unlimited interactions',
              'Up to 5 team members',
              'Shared workspaces',
              'Priority support',
              'Advanced insights',
              'Integration APIs',
            ]}
            highlighted
          />

          <PricingCard
            name="Studio"
            price="Custom"
            description="For enterprises"
            features={[
              'Unlimited everything',
              'Unlimited team members',
              'Custom integrations',
              'Dedicated support',
              'SLA guarantee',
              'On-premise option',
            ]}
          />
        </div>

        <div className="mt-16 p-8 rounded-lg bg-card border border-border text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-semibold text-foreground text-lg">Questions about pricing?</h3>
          <p className="text-muted-foreground">
            Contact our sales team for a custom plan tailored to your organization&apos;s needs.
          </p>
          <a href="#" className="text-primary font-medium hover:underline">
            Talk to sales
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
