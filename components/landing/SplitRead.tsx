import React from 'react'

export function SplitRead() {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f1114]/80 p-4 max-w-md grid grid-cols-2 gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase text-white/50">Your side</p>
        <p className="text-white/90 mt-2">"We need to talk about your time management."</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase text-white/50">Their side</p>
        <p className="text-white/75 mt-2">May feel accused and shut down.</p>
      </div>
      <div className="col-span-2 mt-2 text-sm text-white/60">Gap: The message focuses on performance, not care or support.</div>
    </div>
  )
}

