'use client'

import { useState } from 'react'

interface BasedOnProps {
  sources: {
    name: string
    description: string
    detail: string
  }[]
}

export function BasedOnDisclosure({ sources }: BasedOnProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-stone-200"
      >
        <span
          className={`inline-flex h-3 w-3 items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
        >
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 6 10">
            <path d="M 1 1 L 5 5 L 1 9" />
          </svg>
        </span>
        <span>What this is based on</span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3 pl-4 text-xs text-stone-300 animate-in fade-in-50 duration-200">
          {sources.map((source, idx) => (
            <div key={idx} className="border-l border-white/15 pl-3">
              <p className="font-semibold text-stone-100">{source.name}</p>
              <p className="mt-0.5 leading-relaxed text-stone-400">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
