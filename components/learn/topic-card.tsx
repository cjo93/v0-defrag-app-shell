'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface TopicCardProps {
  title: string
  description: string
  fullContent: string
  icon?: React.ReactNode
}

export function TopicCard({ title, description, fullContent, icon }: TopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border border-border/60 rounded-lg overflow-hidden transition-all hover:border-border/100">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 hover:bg-muted/5 transition-colors flex items-start justify-between gap-4"
      >
        <div className="space-y-2 flex-1">
          <div className="flex items-start gap-3">
            {icon && <div className="flex-shrink-0 mt-0.5 text-primary">{icon}</div>}
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronDown className={`w-4 h-4 text-muted-foreground/60 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border/40 bg-muted/3 p-6 space-y-4 animate-in fade-in-50 duration-200">
          <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
            {fullContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
