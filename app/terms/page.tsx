import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)] pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
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
                  Defrag is not a substitute for professional medical, legal, or mental health advice. The reads and recommendations are informational and interpretive; they are not diagnostic or prescriptive treatment plans.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Payments and subscriptions</h2>
                <p>
                  Paid plans (Base, Core, Studio) provide access to levels of continuity and retention. Payment, cancellation, and refund policies will be handled through the billing portal. For Studio configurations, we may arrange custom terms. Contact <a href="mailto:hello@defrag.com" className="underline">hello@defrag.com</a> for details.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Acceptable use</h2>
                <p>
                  You agree not to use Defrag to attempt to defame, harass, or harm others. Avoid sharing material that violates third-party rights. We reserve the right to suspend accounts for abusive or illegal activity.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Termination and service limitations</h2>
                <p>
                  We may suspend or terminate accounts for violations of these terms. Defrag is provided "as is"; we limit liability to the extent permitted by law. Please see the contact section for questions.
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
                  For questions about these terms, email <a href="mailto:legal@defrag.com" className="underline">legal@defrag.com</a>. We may update these terms; we will post changes and the effective date on this page.
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
