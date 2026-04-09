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
    <div className="pt-3 mt-3">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-medium text-primary/60 hover:text-primary/80 transition flex items-center gap-1.5 group"
      >
        <span className={`inline-block transition-transform duration-200 w-3 h-3 flex items-center justify-center ${isExpanded ? 'rotate-90' : ''}`}>
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 6 10">
            <path d="M 1 1 L 5 5 L 1 9" />
          </svg>
        </span>
        <span>What this is based on</span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2.5 pl-4 text-xs">
          {sources.map((source, idx) => (
            <div key={idx} className="text-muted-foreground/85 leading-relaxed">
              <p className="font-medium text-foreground/80">{source.name}</p>
              <p className="text-muted-foreground/70 text-xs mt-0.5">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
