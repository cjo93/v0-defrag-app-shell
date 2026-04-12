import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,_#0b0c0e_100%)] pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
              Privacy Policy
            </h1>
            <div className="prose prose-invert prose-stone max-w-none space-y-6 text-stone-300">
              <p className="text-sm uppercase tracking-widest text-stone-500 font-semibold">Last Updated: April 11, 2026</p>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Private by Design</h2>
                <p>
                  Defrag is designed to keep your interactions private and under your control. We do not sell personal data. Any interaction content you add to your workspace stays private to your account and is not used to train public models.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">What we collect</h2>
                <p>
                  When you create an account and use Defrag, we collect account information (email, name), baseline signals you choose to provide, and the interaction content you add to the workspace. We also collect minimal operational data necessary to provide and secure the service (logs, usage metrics, error reports).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">How we use data</h2>
                <p>
                  We use your data to provide the service: generating reads, preserving continuity across moments, and helping you track patterns over time. We may use aggregated, de-identified metrics to improve the product, but we do not use your identifiable interactive content to train public models.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Retention and deletion</h2>
                <p>
                  You control retention. By default, Defrag retains workspace interactions to enable continuity and pattern recognition. You can request deletion of specific interactions or your entire account through Settings. After a deletion request, we will remove associated content within 30 days, subject to legal retention requirements.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Security</h2>
                <p>
                  We encrypt data in transit and at rest, follow industry best practices for authentication and access control, and continuously monitor for unusual activity. While we strive to protect your information, no service can guarantee absolute security—see our Terms for service limits.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">User control and requests</h2>
                <p>
                  You can access, correct, export, or request deletion of your data from the Settings panel. For privacy inquiries, email us at <a href="mailto:privacy@defrag.com" className="underline">privacy@defrag.com</a>. We will respond to verified requests within a reasonable timeframe.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Model usage and AI</h2>
                <p>
                  Defrag uses models to power reads and explainers. We do not expose your identifiable interaction content to public model training. Models may be updated and improved using aggregated, de-identified signals.
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
