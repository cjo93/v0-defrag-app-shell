'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

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
    <div className="border-t border-border/20 pt-3 mt-3">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-medium text-primary/70 hover:text-primary transition flex items-center gap-1 group"
      >
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
        <span>Based on: {sources.length} insight layers</span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2.5 pl-3 border-l border-primary/20">
          {sources.map((source, idx) => (
            <div key={idx} className="text-xs">
              <p className="font-semibold text-foreground/90">{source.name}</p>
              <p className="text-muted-foreground/80 font-light text-xs mt-1">{source.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
