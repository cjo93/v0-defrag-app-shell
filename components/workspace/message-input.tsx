'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('')
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  const shellClass = compact ? 'p-3' : 'p-4'
  const inputClass = compact ? 'h-10 text-xs' : 'h-11 text-sm'

  return (
    <div className={`bg-[#151617] ${shellClass}`}>
      <div className="rounded-[22px] border border-white/8 bg-[#111213] p-3">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full border border-white/8 bg-white/[0.03] p-0 text-stone-300 hover:bg-white/[0.08]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Upload image</DropdownMenuItem>
              <DropdownMenuItem>Upload document</DropdownMenuItem>
              <DropdownMenuItem>Voice input</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={compact ? 'Describe the moment or ask for another angle...' : 'Describe the moment, the pressure, or what you wanted them to hear...'}
            aria-label="Message input"
            className={inputClass + ' border-white/8 bg-transparent text-stone-100 placeholder:text-stone-500'}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                handleSend()
              }
            }}
          />

          <Button
            onClick={() => setIsVoiceActive((active) => !active)}
            size="sm"
            variant="ghost"
            className={`h-9 w-9 rounded-full border border-white/8 p-0 ${
              isVoiceActive ? 'bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/20' : 'bg-white/[0.03] text-stone-300 hover:bg-white/[0.08]'
            }`}
            title="Voice input"
            aria-pressed={isVoiceActive}
          >
            <svg className={`h-4 w-4 ${isVoiceActive ? 'animate-pulse' : ''}`} fill={isVoiceActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
            </svg>
          </Button>

          <Button
            onClick={handleSend}
            size="sm"
            className="h-9 rounded-full bg-stone-100 px-4 text-xs font-semibold text-slate-950 hover:bg-white"
          >
            Send
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-[11px] leading-5 text-stone-500">Defrag keeps intent, impact, and pressure visible in the same workspace.</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
            Based on 4 signals
          </span>
        </div>
      </div>
    </div>
  )
}
