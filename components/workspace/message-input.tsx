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

type MessageInputProps = {
  compact?: boolean
  onSubmit?: (message: string) => Promise<void> | void
  isSubmitting?: boolean
  disabled?: boolean
  helperText?: string
}

export function MessageInput({
  compact = false,
  onSubmit,
  isSubmitting = false,
  disabled = false,
  helperText,
}: MessageInputProps) {
  const [message, setMessage] = useState('')

  // Minimal attachment actions to avoid undefined reference in this component.
  // These are UI-only placeholders; real handlers are implemented elsewhere.
  const attachmentActions = [
    { label: 'Image', hint: 'Attach an image' },
    { label: 'Document', hint: 'Attach a file' },
    { label: 'Voice', hint: 'Record voice' },
  ]

  const handleSend = async () => {
    if (!message.trim() || isSubmitting) return

    try {
      await onSubmit?.(message.trim())
      setMessage('')
    } catch (err) {
      console.error('Message send failed', err)
    }
  }

  const composer = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            disabled={disabled || isSubmitting}
            className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 px-0 text-white/68 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
          >
            +
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 border-white/10 bg-[#10131d]/96 text-white">
          {attachmentActions.map((action) => (
            <DropdownMenuItem key={action.label}>
              <div>
                <div className="text-sm font-medium">{action.label}</div>
                <div className="text-xs text-white/50">{action.hint}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your moment…"
        disabled={disabled || isSubmitting}
        className="flex-1 bg-white/5 focus:bg-white/10 px-5 py-4 text-base text-white/90 rounded-xl"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSend()
          }
        }}
      />

      <Button
        onClick={handleSend}
        disabled={!message.trim() || isSubmitting}
        className="h-11 px-6 rounded-2xl bg-emerald-500/90 text-white"
      >
        {isSubmitting ? 'Reading…' : 'Next move'}
      </Button>
    </>
  )

  if (compact) {
    return (
        <div className="space-y-3 rounded-[1.4rem] border border-white/8 bg-white/4 p-3 sm:p-3.5">
        <div className="flex flex-col gap-1 px-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">Bring the moment in</p>
          <span className="text-[11px] text-white/28">Plain language works best</span>
        </div>

        <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-end">{composer}</div>

        <div className="flex flex-col gap-1 px-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <p className="text-xs leading-5 text-white/34">{helperText ?? 'Image, document, and voice input stay available when the moment needs more context.'}</p>
          <span className="text-[11px] font-medium text-white/28">iPhone-ready</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-[1.6rem] border border-white/8 bg-white/4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">Bring the moment in</p>
          <p className="mt-1 text-xs text-white/30">Keep it direct. Defrag will translate the pressure into clearer context.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/46">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Live field
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">{composer}</div>

      <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/34">{helperText ?? 'Add screenshots, documents, or voice when the moment needs more context.'}</p>
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">Context-ready</div>
      </div>
    </div>
  )
}
