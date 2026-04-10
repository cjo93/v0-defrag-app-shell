'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('')
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  const attachmentActions = [
    { label: 'Upload image', hint: 'Screenshots or photo context' },
    { label: 'Upload document', hint: 'Messages, notes, or transcripts' },
    { label: 'Voice note', hint: 'Capture tone and pacing' },
  ]

  const composer = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] px-0 text-white/68 hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60 border-white/10 bg-[#10131d]/96 text-white">
          {attachmentActions.map((action) => (
            <DropdownMenuItem key={action.label} className="cursor-pointer py-3 focus:bg-white/[0.08]">
              <div>
                <div className="text-sm font-medium text-white/86">{action.label}</div>
                <div className="text-xs text-white/48">{action.hint}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="min-w-0 flex-1 rounded-[1.45rem] border border-white/10 bg-black/22 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the moment as it happened..."
          className="h-11 border-0 bg-transparent px-0 text-[15px] text-white/84 placeholder:text-white/30 focus-visible:ring-0 sm:h-12"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
      </div>

      <Button
        onClick={() => setIsVoiceActive((value) => !value)}
        size="sm"
        variant="ghost"
        className={`h-11 w-11 rounded-2xl border px-0 sm:h-12 sm:w-12 ${
          isVoiceActive
            ? 'border-primary/18 bg-primary/10 text-primary'
            : 'border-white/10 bg-white/[0.05] text-white/68 hover:border-white/16 hover:bg-white/[0.08] hover:text-white'
        }`}
        title="Voice input"
      >
        <svg className={`h-4 w-4 ${isVoiceActive ? 'animate-pulse' : ''}`} fill={isVoiceActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
        </svg>
      </Button>

      <Button
        onClick={handleSend}
        size="sm"
        className="h-11 rounded-2xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/92 sm:h-12 sm:px-5"
      >
        Send
      </Button>
    </>
  )

  if (compact) {
    return (
      <div className="space-y-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">Bring the moment in</p>
          <span className="text-[11px] text-white/28">Plain language works best</span>
        </div>
        <div className="flex items-end gap-2">{composer}</div>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-[1.7rem] border border-white/8 bg-white/[0.04] p-4 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">Bring the moment in</p>
          <p className="mt-1 text-xs text-white/30">Keep it direct. Defrag will translate the pressure into clearer context.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/46">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Live field
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">{composer}</div>
    </div>
  )
}
