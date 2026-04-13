import React from 'react'
import { BeforeYouSend } from './BeforeYouSend'
import { SplitRead } from './SplitRead'

export function HeroArtifact({ variant = 'before' }: { variant?: 'before' | 'split' }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b0c10]/60 to-[#0b0c10]/80 p-6 shadow-2xl">
        {variant === 'split' ? <SplitRead /> : <BeforeYouSend />}
      </div>
    </div>
  )
}

