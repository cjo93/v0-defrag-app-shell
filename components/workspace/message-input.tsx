'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('')
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  const handleVoiceStart = () => {
    setIsVoiceActive(true)
    // Backend voice input will be wired in GitHub
  }

  const handleVoiceStop = () => {
    setIsVoiceActive(false)
  }

  if (compact) {
    return (
      <div className="border-t border-border/30 bg-background p-3 space-y-2">
        <div className="flex gap-2">
          {/* Upload Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="px-2 h-8 text-muted-foreground hover:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <span className="text-sm">Upload image</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-sm">Upload document</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-sm">Voice input</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add message..."
            className="bg-background border-border/40 text-foreground text-xs font-light placeholder:text-muted-foreground/40"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button 
            onClick={isVoiceActive ? handleVoiceStop : handleVoiceStart} 
            size="sm" 
            variant={isVoiceActive ? "default" : "ghost"}
            className="px-2 h-8 text-muted-foreground hover:text-foreground"
            title="Voice input"
          >
            <svg className={`w-4 h-4 ${isVoiceActive ? 'animate-pulse' : ''}`} fill={isVoiceActive ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
            </svg>
          </Button>
          <Button onClick={handleSend} size="sm" className="px-3 h-8 text-xs bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium">
            Send
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border/30 bg-background p-4 space-y-3">
      <div className="flex gap-2">
        {/* Upload Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="px-2 text-muted-foreground hover:text-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <span className="text-sm">Upload image</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-sm">Upload document</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-sm">Voice input</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe a moment..."
          className="bg-background border-border/40 text-foreground text-sm font-light placeholder:text-muted-foreground/50"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button 
          onClick={isVoiceActive ? handleVoiceStop : handleVoiceStart} 
          size="sm" 
          variant={isVoiceActive ? "default" : "ghost"}
          className="px-2 text-muted-foreground hover:text-foreground"
          title="Voice input (beta)"
        >
          <svg className={`w-4 h-4 ${isVoiceActive ? 'animate-pulse' : ''}`} fill={isVoiceActive ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
          </svg>
        </Button>
        <Button onClick={handleSend} size="sm" className="px-4 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium">
          Send
        </Button>
      </div>
      
      {/* Supporting Text + Framework Expansion */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground/60 font-light">
          Defrag shows relational context and other perspectives
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground/70 hover:text-foreground h-auto py-0.5 px-2">
              Based on <span className="ml-1 text-primary/80 font-medium">4 signals</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 text-xs font-semibold text-foreground/70 tracking-wider">Analysis Sources</div>
            <DropdownMenuItem className="text-xs py-2">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">♈</span>
                <div>
                  <div className="font-medium text-foreground">Astrology</div>
                  <div className="text-muted-foreground/70 font-light">Birth chart influences</div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs py-2">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">◇</span>
                <div>
                  <div className="font-medium text-foreground">Human Design</div>
                  <div className="text-muted-foreground/70 font-light">Energy type &amp; profile</div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs py-2">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">6</span>
                <div>
                  <div className="font-medium text-foreground">Numerology</div>
                  <div className="text-muted-foreground/70 font-light">Life path dynamics</div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs py-2">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">☰</span>
                <div>
                  <div className="font-medium text-foreground">I Ching</div>
                  <div className="text-muted-foreground/70 font-light">Situation hexagram</div>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
