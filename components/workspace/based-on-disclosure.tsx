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
    <div className="mt-1 border-t border-white/8 pt-3">
      <button
        onClick={handleToggle}
        className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38 transition-colors hover:text-white/62"
      >
        <span className={`inline-flex h-4 w-4 items-center justify-center transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 6 10">
            <path d="M 1 1 L 5 5 L 1 9" />
          </svg>
        </span>
        <span>{compactLabel}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3 animate-in fade-in-50 duration-200">
          {sources.map((source, idx) => (
            <div key={idx} className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3">
              <p className="text-xs font-semibold text-white/84">{source.name}</p>
              <p className="mt-1 text-xs leading-6 text-white/58">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
