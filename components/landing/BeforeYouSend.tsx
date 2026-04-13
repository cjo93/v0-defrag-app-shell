import React from 'react'

export function BeforeYouSend() {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f1114]/80 p-5 max-w-md">
      <div className="text-[11px] font-semibold uppercase text-white/50">Before You Send</div>
      <div className="mt-3 space-y-3">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Signal</p>
          <p className="text-white/90 text-sm mt-1">"We need to talk about your time management."</p>
        </div>

        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Risk</p>
          <p className="text-white/75 text-sm mt-1">May sound like criticism and trigger defensiveness.</p>
        </div>

        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Next move</p>
          <div className="mt-1 rounded-xl bg-emerald-500/10 border border-emerald-400/20 p-3">
            <p className="text-white text-sm font-medium">Start with: "I noticed we’re missing time; can we find a moment to align on expectations?"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

