'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  }

  const handleVoiceStop = () => {
    setIsVoiceActive(false)
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="min-w-0 flex-1 rounded-[1.35rem] border border-white/10 bg-black/18 px-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the moment as it happened..."
          className="h-11 sm:h-12 border-0 bg-transparent px-0 text-[15px] text-white/84 placeholder:text-white/30 focus-visible:ring-0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
      </div>

      <Button
        onClick={isVoiceActive ? handleVoiceStop : handleVoiceStart}
        size="sm"
        variant="ghost"
        className={`h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border px-0 ${
          isVoiceActive
            ? 'border-primary/18 bg-primary/10 text-primary'
            : 'border-white/10 bg-white/[0.05] text-white/68 hover:border-white/16 hover:bg-white/[0.08] hover:text-white'
        }`}
        title="Voice input"
      >
        <svg className={`w-4 h-4 ${isVoiceActive ? 'animate-pulse' : ''}`} fill={isVoiceActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
        </svg>
      </Button>

      <Button
        onClick={handleSend}
        size="sm"
        className="h-11 sm:h-12 rounded-2xl bg-white px-4 sm:px-5 text-sm font-semibold text-black hover:bg-white/92"
      >
        Send
      </Button>
    </>
  )

  if (compact) {
    return (
      <div className="space-y-3 rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-3 sm:p-3.5">
        <div className="flex flex-col gap-1 px-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">Bring the moment in</p>
          <span className="text-[11px] text-white/28">Plain language works best</span>
        </div>

        <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-end">{composer}</div>

        <div className="flex flex-col gap-1 px-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <p className="text-xs leading-5 text-white/34">Image, document, and voice shells stay available here without changing backend behavior.</p>
          <span className="text-[11px] font-medium text-white/28">iPhone-ready</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-4">
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

      <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/34">Add screenshots, documents, or voice when the moment needs more context.</p>
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">No backend changes in this pass</div>
      </div>
    </div>
  )
}
