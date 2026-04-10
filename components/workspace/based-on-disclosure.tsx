'use client'

import { useState } from 'react'

interface BasedOnProps {
  compactLabel?: string
  expanded?: boolean
  onToggle?: () => void
  sources: {
    name: string
    description: string
    detail: string
  }[]
}

export function BasedOnDisclosure({
  compactLabel = 'Signals in view',
  expanded,
  onToggle,
  sources,
}: BasedOnProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const open = expanded ?? isExpanded
  const handleToggle = onToggle ?? (() => setIsExpanded(!isExpanded))

  return (
    <div className="mt-2 rounded-[1.3rem] border border-white/8 bg-black/16 px-4 py-3">
      <button
        onClick={handleToggle}
        className="group flex w-full items-center justify-between gap-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42 transition-colors hover:text-white/68"
      >
        <span>{compactLabel}</span>
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 6 10">
            <path d="M1 1L5 5L1 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-3 animate-in fade-in-50 duration-200">
          {sources.map((source, idx) => (
            <div key={idx} className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-white/84">{source.name}</p>
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/34">{source.description}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-white/58">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
