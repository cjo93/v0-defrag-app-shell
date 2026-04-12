import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)] pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
              Terms of Service
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
              Terms of Service
            </h1>
            <div className="prose prose-invert prose-stone max-w-none space-y-6 text-stone-300">
              <p className="text-sm uppercase tracking-widest text-stone-500 font-semibold">Last Updated: April 11, 2026</p>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Acceptance</h2>
                <p>
                  By using Defrag, you agree to these Terms of Service. Defrag provides relational intelligence tools to help you interpret interactions. Use the service consciously and responsibly.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Intended use and limitations</h2>
                <p>
                  Defrag is not a substitute for professional medical, legal, or mental health advice. The reads and recommendations are informational and interpretive; they are not diagnostic or prescriptive treatment plans. You are responsible for how you use and act on the output.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Payments and billing</h2>
                <p>
                  Paid plans (Base, Core, Studio) provide access to higher levels of continuity, reads, and retention. Billing is handled through our secure payment processor. By subscribing, you authorize us to charge your payment method on a recurring basis at the rate shown at checkout.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-400">
                  <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
                  <li>You may cancel at any time from your account Settings. Cancellation takes effect at the end of the current billing period.</li>
                  <li>Refunds are not issued for partial periods, except where required by law or at our discretion for documented service failures.</li>
                  <li>For Studio or custom configurations, billing terms are arranged separately. Contact <a href="mailto:info@defrag.app" className="underline">info@defrag.app</a>.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Account and use limitations</h2>
                <p>
                  You agree not to use Defrag to attempt to defame, harass, or harm others. Avoid sharing material that violates third-party rights. Each account is for a single user; sharing credentials is not permitted. We reserve the right to suspend accounts for abusive or illegal activity.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Termination and suspension</h2>
                <p>
                  We may suspend or terminate accounts for violations of these terms. Defrag is provided &ldquo;as is&rdquo;; we limit liability to the extent permitted by law. If your account is terminated for cause, no refund will be issued. If we terminate without cause, we will issue a pro-rated refund for unused prepaid time.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Governing law and jurisdiction</h2>
                <p>
                  These Terms are governed by the laws of the state of California, without regard to conflict of law principles. Any dispute arising under or related to these Terms will be subject to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Contact and changes</h2>
                <p>
                  For questions about these terms or your account, email{' '}
                  <a href="mailto:info@defrag.app" className="underline">info@defrag.app</a>.
                  We may update these terms; we will post changes and the effective date on this page. Continued use after changes constitutes acceptance.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}