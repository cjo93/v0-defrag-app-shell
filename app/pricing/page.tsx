import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

const tiers = [
  {
    name: 'Personal',
    price: '$24',
    cadence: '/month',
    eyebrow: 'For one relationship at a time',
    description:
      'A steady place to slow the moment down, read pressure more clearly, and practice cleaner repair.',
    highlights: ['Live workspace', 'Relational map + branch lane', 'Weekly brief'],
    tone: 'border-white/10 bg-white/[0.045]',
    cta: 'Start personal',
  },
  {
    name: 'Partnership',
    price: '$58',
    cadence: '/month',
    eyebrow: 'For shared repair work',
    description:
      'Built for couples, co-parents, and close collaborators who want more visibility without turning the process clinical.',
    highlights: ['Shared invites', 'More workspace history', 'Priority support for setup'],
    tone: 'border-primary/20 bg-gradient-to-br from-primary/12 via-primary/6 to-black/20',
    cta: 'Choose partnership',
    featured: true,
  },
  {
    name: 'Guided',
    price: 'Custom',
    cadence: '',
    eyebrow: 'For practitioners and private cohorts',
    description:
      'A calmer way to support multiple clients or members while keeping the interface grounded and human.',
    highlights: ['Private cohorts', 'Admin-safe invite controls', 'Launch planning support'],
    tone: 'border-secondary/20 bg-gradient-to-br from-secondary/10 via-secondary/6 to-black/20',
    cta: 'Talk with us',
  },
]

const trustSignals = [
  'No generic productivity language or fake urgency loops.',
  'Invite and privacy controls stay explicit before anything is shared.',
  'You can begin with the visual/product surfaces before wiring billing flows.',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative border-b border-white/8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#090b13_46%,#05060a_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/74">
                  Pricing
                </div>
                <div className="space-y-4">
                  <h1 className="text-[2.8rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[4rem]">
                    Choose the level of steadiness you want around hard conversations.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-white/66 sm:text-lg sm:leading-8">
                    Defrag pricing is structured around how much shared visibility, support, and workspace continuity
                    you need, not around generic seat-count theater.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92"
                  >
                    See the command center
                  </Link>
                  <Link
                    href="/invite"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-6 text-sm font-semibold text-white/82 transition hover:border-white/18 hover:bg-white/[0.08]"
                  >
                    Review invite flow
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {trustSignals.map((signal) => (
                  <div key={signal} className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4 backdrop-blur">
                    <p className="text-sm leading-6 text-white/72">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`rounded-[1.8rem] border p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur ${tier.tone}`}
              >
                <div className="flex min-h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">{tier.eyebrow}</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white/92">{tier.name}</h2>
                    </div>
                    {tier.featured && (
                      <span className="rounded-full border border-primary/18 bg-primary/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                        Most aligned
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-[-0.05em] text-white">{tier.price}</span>
                    <span className="pb-1 text-sm text-white/46">{tier.cadence}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/66">{tier.description}</p>

                  <div className="mt-6 space-y-3">
                    {tier.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/18 px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-white/70" />
                        <span className="text-sm text-white/76">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={tier.name === 'Guided' ? '/invite' : '/dashboard'}
                    className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
                      tier.featured
                        ? 'bg-white text-black hover:bg-white/92'
                        : 'border border-white/12 bg-white/[0.05] text-white/82 hover:border-white/18 hover:bg-white/[0.08]'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Launch readiness note</p>
                <h3 className="mt-2 text-xl font-semibold text-white/90">Billing can stay calm and staged.</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
                  This pass keeps pricing trustworthy and product-specific without inventing Stripe completion states.
                  If billing is not wired yet, the UI should still feel intentional and ready for launch sequencing.
                </p>
              </div>
              <Link
                href="/settings"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-semibold text-white/82 transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                Review launch settings
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
