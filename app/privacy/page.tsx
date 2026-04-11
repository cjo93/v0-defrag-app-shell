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
                  Defrag is built to handle sensitive interactions. We treat your data as yours alone. We do not sell your personal data, and we do not use your private interactions to train public models.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Data Security</h2>
                <p>
                  All interactions are encrypted in transit and at rest. Access to the workspace is restricted to your authenticated session.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Your Control</h2>
                <p>
                  You can delete your account and all associated interactions at any time through the settings panel.
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
