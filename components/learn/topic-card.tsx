'use client'

import { useState } from 'react'

interface TopicCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  explainer: string
  keywords?: string[]
}

export function TopicCard({ title, description, icon: Icon, explainer, keywords }: TopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border/60 hover:border-primary/40 bg-card hover:bg-card/80 transition-all group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6"
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <Icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-xs text-muted-foreground/80 leading-relaxed">{description}</p>

            {/* Expandable Drawer Indicator */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className={`inline-block w-3 h-3 flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                <svg className="w-2.5 h-2.5 text-primary/60" fill="currentColor" viewBox="0 0 6 10">
                  <path d="M 1 1 L 5 5 L 1 9" />
                </svg>
              </span>
              <span className="text-xs text-primary/60 font-medium">Learn more</span>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable Drawer */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 space-y-3 animate-in fade-in-50 duration-200 border-t border-border/30 mt-2">
          {/* Short Explainer (max 3-4 sentences) */}
          <div className="text-xs text-muted-foreground/90 leading-relaxed">
            {explainer}
          </div>

          {/* Keywords/Tags */}
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {keywords.map((keyword, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-primary/8 text-primary/80 border border-primary/15">
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* Media Shell Buttons */}
          <div className="flex gap-2 pt-1">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium bg-secondary/12 border border-secondary/25 text-secondary/90 hover:bg-secondary/20 transition-colors"
            >
              <span className="inline-block w-3 h-3">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M 3 2 L 3 10 L 9 6 Z" />
                </svg>
              </span>
              Listen
            </button>

            <button 
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium bg-primary/12 border border-primary/25 text-primary/90 hover:bg-primary/20 transition-colors"
            >
              <span className="inline-block w-3 h-3">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                  <rect x="1" y="2" width="10" height="8" />
                </svg>
              </span>
              Watch
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
