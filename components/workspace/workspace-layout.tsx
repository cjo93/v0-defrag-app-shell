'use client'

import { ChatThread } from './chat-thread'
import { BranchThread } from './branch-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
import { useState } from 'react'
import { IconChat, IconField, IconBranches, IconFamily, IconBrief } from '@/components/icons/DefragIcons'

const mobileDestinations = [
  { id: 'Chat', label: 'Chat', icon: IconChat },
  { id: 'Field', label: 'Field', icon: IconField },
  { id: 'Branches', label: 'Branches', icon: IconBranches },
  { id: 'Family', label: 'Family', icon: IconFamily },
  { id: 'Brief', label: 'Brief', icon: IconBrief },
]

export function WorkspaceLayout() {
  const [activeDestination, setActiveDestination] = useState('Chat')
  const [isBranchOpen, setIsBranchOpen] = useState(true)

  const desktopLayout = (
    <div className="hidden h-screen overflow-hidden bg-[#161717] text-stone-100 md:flex">
      <div className="flex min-w-0 flex-[0_0_auto] border-r border-white/8 bg-[#131415]">
        <div className={`flex min-w-0 transition-all duration-300 ${isBranchOpen ? 'w-[760px]' : 'w-[380px]'}`}>
          <div className="flex w-[380px] min-w-0 flex-col border-r border-white/8">
            <div className="border-b border-white/8 bg-white/[0.03] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Primary thread</p>
                  <h2 className="mt-1 text-sm font-medium text-stone-100">Interpretation</h2>
                  <p className="mt-1 text-xs leading-5 text-stone-400">What may be happening and where the split began.</p>
                </div>
                <button
                  onClick={() => setIsBranchOpen(!isBranchOpen)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-stone-200 transition hover:bg-white/[0.08]"
                  title={isBranchOpen ? 'Close branch lane' : 'Open branch lane'}
                >
                  {isBranchOpen ? '−' : '+'}
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto">
                <ChatThread />
              </div>
              <div className="border-t border-white/8">
                <MessageInput compact />
              </div>
            </div>
          </div>

          {isBranchOpen && (
            <div className="flex w-[380px] min-w-0 flex-col bg-[#151718]">
              <div className="border-b border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Branch lane</p>
                <h2 className="mt-1 text-sm font-medium text-stone-100">Simulation branch</h2>
                <p className="mt-1 text-xs leading-5 text-stone-400">Compare alternate framings without dropping the source thread.</p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <BranchThread />
                </div>
                <div className="border-t border-white/8">
                  <MessageInput compact />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 overflow-hidden">
        <CanvasPanel />
      </div>
    </div>
  )

  const mobileLayout = (
    <div className="flex h-screen flex-col overflow-hidden bg-[#141516] text-stone-100 md:hidden">
      <div className="border-b border-white/8 bg-[#151617]/90 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Defrag</p>
            <p className="text-sm font-medium text-stone-100">Live workspace</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Live
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeDestination === 'Chat' && (
          <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ChatThread />
            </div>
            <div className="border-t border-white/8">
              <MessageInput compact />
            </div>
          </div>
        )}

        {activeDestination === 'Field' && <CanvasPanel mobile />}

        {activeDestination === 'Branches' && (
          <div className="flex h-full flex-col bg-[#151718]">
            <div className="border-b border-white/8 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Branch lane</p>
              <h2 className="mt-1 text-lg font-medium text-stone-100">Alternate framings</h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <BranchThread />
            </div>
          </div>
        )}

        {activeDestination === 'Family' && (
          <div className="h-full overflow-y-auto px-5 py-5">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">System view</p>
                <h2 className="mt-1 text-xl font-medium text-stone-100">Family pressure around the moment</h2>
              </div>
              {[
                'They learned to prepare for criticism before it arrives.',
                'Going quiet may be self-protection, not indifference.',
                'Timing is amplifying the reaction more than content alone.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-stone-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeDestination === 'Brief' && (
          <div className="flex h-full flex-col justify-between px-5 py-6">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Daily brief</p>
              <h2 className="text-2xl font-medium text-stone-100">Lower pressure first, then ask for clarity.</h2>
              <p className="text-sm leading-6 text-stone-300">
                The current field suggests repair becomes more likely if you signal safety before content and avoid compressed timing.
              </p>
            </div>

            <div className="space-y-3">
              {['Best opening: reassurance first.', 'Best window: after decompression.', 'Best branch: validation before request.'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-stone-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex border-t border-white/8 bg-[#151617]/95 backdrop-blur-lg">
        {mobileDestinations.map((dest) => {
          const IconComponent = dest.icon
          const isActive = activeDestination === dest.id

          return (
            <button
              key={dest.id}
              onClick={() => setActiveDestination(dest.id)}
              className={`flex flex-1 flex-col items-center justify-center px-2 py-4 text-[11px] font-medium transition ${
                isActive ? 'text-stone-50' : 'text-stone-500'
              }`}
            >
              <span className={`mb-1.5 rounded-full p-2 ${isActive ? 'bg-white/[0.08]' : 'bg-transparent'}`}>
                <IconComponent className="h-5 w-5" />
              </span>
              {dest.label}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  )
}
