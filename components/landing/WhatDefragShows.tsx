import React from 'react'

export function WhatDefragShows() {
  const items = [
    { title: 'How it may be landing', desc: 'A concise read of emotional impact and likely interpretation.' },
    { title: 'The bigger picture', desc: 'Context and patterns that matter over time.' },
    { title: 'Try a better approach', desc: 'A verbatim next move you can actually say.' },
    { title: 'When timing matters', desc: 'Guidance on whether to act now or wait.' },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border border-white/6 bg-[#0b0c10]/60 p-5">
            <h4 className="text-sm font-semibold text-white/90">{it.title}</h4>
            <p className="mt-2 text-sm text-white/60">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

