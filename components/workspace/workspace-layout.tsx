'use client'

import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
import { Sidebar } from '@/components/layout/sidebar'
import { useState } from 'react'

const tabs = [
  { id: 'Chat', label: 'Chat' },
  { id: 'Field', label: 'Field' },
  { id: 'Branches', label: 'Branches' },
  { id: 'Family', label: 'Family' },
  { id: 'Brief', label: 'Brief' },
]

export function WorkspaceLayout() {
  const [activeTab, setActiveTab] = useState('Chat')
  const [showBranchPanel, setShowBranchPanel] = useState(false)

  // Desktop layout: narrow left rail + large center canvas + optional right panel
  const desktopLayout = (
    <div className="hidden md:flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      {/* Main workspace area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top action bar (minimal) */}
        <div className="flex-shrink-0 border-b border-border bg-background/50 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-foreground">Workspace</h1>
          </div>
          <button
            onClick={() => setShowBranchPanel(!showBranchPanel)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showBranchPanel ? 'Hide' : 'Show'} Branch
          </button>
        </div>

        {/* Main content: thread (smaller) + canvas (dominant) */}
        <div className="flex-1 flex overflow-hidden gap-6 p-6">
          {/* Left: Thread (subordinate, occupies less visual weight) */}
          <div className="w-72 flex flex-col border border-border rounded-lg bg-card overflow-hidden">
            <div className="flex-1 flex flex-col">
              <ChatThread />
              <div className="flex-shrink-0 border-t border-border">
                <MessageInput />
              </div>
            </div>
          </div>

          {/* Center: Canvas (DOMINANT - heart of product) */}
          <div className="flex-1 flex flex-col border border-border rounded-lg overflow-hidden bg-card">
            <CanvasPanel />
          </div>

          {/* Right: Branch panel (optional, secondary) */}
          {showBranchPanel && (
            <div className="w-80 border border-border rounded-lg bg-card overflow-hidden flex flex-col">
              <div className="flex-shrink-0 border-b border-border px-6 py-5 bg-background/50">
                <h2 className="text-sm font-semibold text-foreground tracking-wide">Branches</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Alternative conversations and perspectives
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Branch analysis appears here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Mobile layout: iOS-first with bottom tab bar
  const mobileLayout = (
    <div className="md:hidden flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/50 px-4 py-3">
        <h1 className="text-sm font-semibold text-foreground">Defrag</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Workspace</p>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col min-w-0">
        {activeTab === 'Chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <ChatThread />
            </div>
            <div className="flex-shrink-0 border-t border-border">
              <MessageInput />
            </div>
          </div>
        )}

        {activeTab === 'Field' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-20 h-20 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <p className="text-xs font-medium text-muted-foreground">Field</p>
            </div>
            <h2 className="text-sm font-semibold text-foreground text-center mb-2">Relational Canvas</h2>
            <p className="text-sm text-muted-foreground text-center">
              Map relationships and context in this view.
            </p>
          </div>
        )}

        {activeTab === 'Branches' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-20 h-20 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <p className="text-xs font-medium text-muted-foreground">Branches</p>
            </div>
            <h2 className="text-sm font-semibold text-foreground text-center mb-2">Alternative Threads</h2>
            <p className="text-sm text-muted-foreground text-center">
              Explore different conversation paths.
            </p>
          </div>
        )}

        {activeTab === 'Family' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-20 h-20 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <p className="text-xs font-medium text-muted-foreground">Family</p>
            </div>
            <h2 className="text-sm font-semibold text-foreground text-center mb-2">Relationships</h2>
            <p className="text-sm text-muted-foreground text-center">
              Understand connected interactions.
            </p>
          </div>
        )}

        {activeTab === 'Brief' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-20 h-20 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <p className="text-xs font-medium text-muted-foreground">Brief</p>
            </div>
            <h2 className="text-sm font-semibold text-foreground text-center mb-2">Summary & Insights</h2>
            <p className="text-sm text-muted-foreground text-center">
              Key takeaways and next steps.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar - iOS Style */}
      <div className="flex-shrink-0 border-t border-border bg-card flex gap-1 p-1.5 safe-area-inset-bottom">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 rounded text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
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
