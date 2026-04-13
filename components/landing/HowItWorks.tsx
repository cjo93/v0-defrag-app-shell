import React from 'react'

export function HowItWorks() {
  const steps = [
    { title: 'Describe the moment', desc: 'Enter what happened in a short sentence.' },
    { title: 'See their side', desc: 'We show how it may be landing on the other side.' },
    { title: 'Choose what helps next', desc: 'We give a verbatim next move and a rewrite.' },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="rounded-xl border border-white/6 bg-[#0b0c10]/60 p-5">
            <h3 className="text-sm font-semibold text-white/90">{s.title}</h3>
            <p className="mt-2 text-sm text-white/60">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

