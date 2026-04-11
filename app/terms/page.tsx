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
                  By using Defrag, you agree to these terms. Defrag provides relational intelligence tools for personal and professional growth.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Intended Use</h2>
                <p>
                  Defrag is not a diagnostic tool or a substitute for professional therapy or legal advice. The insights provided are based on structured analysis of the interactions you input.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-stone-50">Account Responsibility</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
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
