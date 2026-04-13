import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(199,160,92,0.12),_transparent_32%),linear-gradient(180deg,_#101113_0%,,_#0b0c0e_100%)] pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              About Defrag
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
              See the interaction from more than one side before it hardens.
            </h1>
            <div className="space-y-6 text-lg leading-8 text-stone-300">
              <p>
                Defrag is a relational intelligence platform designed for the moments where intent, timing, and reception split apart. We help you see how the moment may be landing on the other side, why it feels so different from your intent, and what to do next.
              </p>
              <p>
                Unlike generic AI or diagnostic tools, Defrag provides structured insights into the field of interaction—focusing on intent, impact, pressure, and timing. Our goal is to provide a calmer, clearer read on what is happening between people, helping you choose moves that match the field.
              </p>
            </div>
            <div className="space-y-6 text-lg leading-8 text-stone-300">
              <h3 className="text-xl font-semibold text-white/90">What Defrag is not</h3>
              <p>Defrag is not a therapy service, a generalized chat assistant, or a substitute for professional help. We focus on short, practical interaction guidance — clear, concise, and actionable.</p>

              <h3 className="text-xl font-semibold text-white/90">Who it's for</h3>
              <p>Defrag is for people who value communication clarity: managers, team leads, partners, and individuals who need to move sensitive conversations forward with less friction.</p>

              <h3 className="text-xl font-semibold text-white/90">How it works</h3>
              <p>Provide a short description of a moment. Defrag analyzes likely interpretations, surfaces a concise risk summary, and offers a direct next move you can say — plus a softer rewrite.</p>

              <div className="mt-6">
                <a href="/signup" className="inline-flex h-12 items-center justify-center rounded-full bg-stone-100 px-6 text-sm font-semibold text-stone-950">Get started</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
