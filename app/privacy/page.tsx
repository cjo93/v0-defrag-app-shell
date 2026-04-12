import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(199,160,92,0.12),transparent_32%),linear-gradient(180deg,#101113_0%,#0b0c0e_100%)] pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
              Privacy Policy
            </div>
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
                <ul className="list-disc pl-5 space-y-1 text-stone-400">
                  <li>Account identifiers: email address, display name</li>
                  <li>Workspace content: sessions, reads, notes you create</li>
                  <li>Baseline signals: optional data you provide about your context</li>
                  <li>Usage and error logs for service reliability</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">How we use data</h2>
                <p>
                  We use your data to provide the service: generating reads, preserving continuity across moments, and helping you track patterns over time. We may use aggregated, de-identified metrics to improve the product, but we do not use your identifiable interactive content to train public models.
                </p>
              </section>

              {/* Retention Timeline */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Retention Timeline</h2>
                <ul className="list-disc ml-6 text-stone-300">
                  <li>By default, your workspace interactions are retained to enable continuity and pattern recognition.</li>
                  <li>You may request deletion of specific interactions or your entire account at any time via Settings.</li>
                  <li>After a verified deletion request, associated content is removed within <span className="font-semibold text-stone-50">30 days</span>, subject to legal retention requirements.</li>
                  <li>Inactive accounts may be purged after 12 months of inactivity following advance notice.</li>
                </ul>
              </section>

              {/* Deletion Expectations */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Deletion Expectations</h2>
                <ul className="list-disc ml-6 text-stone-300">
                  <li>You can access, correct, export, or request deletion of your data from the Settings panel.</li>
                  <li>Deletion requests are processed promptly and completed within 30 days of verification.</li>
                  <li>Some data may be retained as required by law or for security purposes, but will not be used for any other purpose.</li>
                </ul>
              </section>

              {/* Contact */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Contact</h2>
                <p>
                  For privacy questions, data requests, or concerns, contact us at <a href="mailto:info@defrag.app" className="underline">info@defrag.app</a>. We are a small team and respond personally.
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