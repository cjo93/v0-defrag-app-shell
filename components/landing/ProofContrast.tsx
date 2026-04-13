import React from 'react'

export function ProofContrast() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-xl border border-white/6 bg-[#0b0c10]/60 p-6 text-center">
        <p className="text-sm font-semibold text-white/90">Generic AI responds to the conversation. Defrag helps you make sense of the people inside it.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="text-sm text-white/60">Signal: direct quote of what matters</div>
          <div className="text-sm text-white/60">Risk: why it may land poorly</div>
          <div className="text-sm text-white/60">Next move: verbatim script to try</div>
        </div>
      </div>
    </section>
  )
}

