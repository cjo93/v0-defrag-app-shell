'use client'

import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
import { Sidebar } from '@/components/layout/sidebar'
import { useState } from 'react'

const tabs = ['Chat', 'Field', 'Branches', 'Family', 'Brief']

export function WorkspaceLayout() {
  const [activeTab, setActiveTab] = useState('Chat')
  const [showBranchPanel, setShowBranchPanel] = useState(false)

  // Desktop layout
  const desktopLayout = (
    <div className="hidden md:flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col border-r border-border">
            <ChatThread />
            <MessageInput />
          </div>
          <CanvasPanel />
          {showBranchPanel && (
            <div className="w-64 border-r border-border bg-card flex flex-col p-6">
              <h3 className="font-semibold text-foreground text-sm mb-4">Branches</h3>
              <p className="text-xs text-muted-foreground">
                Alternative conversation threads appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Mobile layout
  const mobileLayout = (
    <div className="md:hidden flex flex-col h-screen bg-background">
      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Chat' && (
          <div className="flex flex-col h-full">
            <ChatThread />
            <MessageInput />
          </div>
        )}
        {activeTab === 'Field' && (
          <div className="p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Field</h2>
            <p className="text-sm text-muted-foreground">Field information and context.</p>
          </div>
        )}
        {activeTab === 'Branches' && (
          <div className="p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Branches</h2>
            <p className="text-sm text-muted-foreground">Alternative conversation threads.</p>
          </div>
        )}
        {activeTab === 'Family' && (
          <div className="p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Family</h2>
            <p className="text-sm text-muted-foreground">Related interactions and context.</p>
          </div>
        )}
        {activeTab === 'Brief' && (
          <div className="p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Brief</h2>
            <p className="text-sm text-muted-foreground">Summary and key insights.</p>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="border-t border-border bg-card flex gap-1 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded transition ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
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
