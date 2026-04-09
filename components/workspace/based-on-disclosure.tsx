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
    <div className="pt-3 mt-3 border-t border-border/20">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-medium text-primary/65 hover:text-primary/85 transition-all flex items-center gap-1.5 group"
      >
        <span className={`inline-block w-3 h-3 flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
            <path d="M 1 1 L 5 5 L 1 9" />
          </svg>
        </span>
        <span>What this is based on</span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-3 pl-4 text-xs animate-in fade-in-50 duration-200">
          {sources.map((source, idx) => (
            <div key={idx} className="border-l border-primary/20 pl-3">
              <p className="font-semibold text-foreground/90">{source.name}</p>
              <p className="text-muted-foreground/80 mt-0.5 leading-relaxed">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
