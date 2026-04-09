'use client'

import { ChatThread } from './chat-thread'
import { MessageInput } from './message-input'
import { CanvasPanel } from './canvas-panel'
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

  // Desktop layout: THREE-COLUMN operating environment (no sidebar)
  // Left thread | Center dominant canvas | Right branch thread
  const desktopLayout = (
    <div className="hidden md:flex h-screen bg-background overflow-hidden">
      {/* LEFT: Primary Thread */}
      <div className="w-96 border-r border-border flex flex-col bg-background">
        {/* Thread header */}
        <div className="flex-shrink-0 border-b border-border px-6 py-4 bg-background/50">
          <h2 className="text-sm font-semibold text-foreground tracking-wide">Conversation</h2>
          <p className="text-xs text-muted-foreground mt-1">Primary thread</p>
        </div>
        
        {/* Thread content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ChatThread />
          </div>
          <div className="flex-shrink-0 border-t border-border">
            <MessageInput />
          </div>
        </div>
      </div>

      {/* CENTER: Dominant AI Canvas (Heart of Product) */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <CanvasPanel />
      </div>

      {/* RIGHT: Secondary Branch Thread */}
      <div className="w-96 border-l border-border flex flex-col bg-background">
        {/* Branch header */}
        <div className="flex-shrink-0 border-b border-border px-6 py-4 bg-background/50">
          <h2 className="text-sm font-semibold text-foreground tracking-wide">Branches</h2>
          <p className="text-xs text-muted-foreground mt-1">Alternate perspectives</p>
        </div>
        
        {/* Branch content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-4">
              <span className="text-xs font-medium text-muted-foreground">Branch</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Alternative threads and analysis appear here.
            </p>
          </div>
          <div className="flex-shrink-0 border-t border-border">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile layout: iOS-first with bottom tab bar
  const mobileLayout = (
    <div className="md:hidden flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/50 px-4 py-4">
        <h1 className="text-base font-semibold text-foreground">Defrag</h1>
        <p className="text-xs text-muted-foreground mt-1">AI Workspace</p>
      </div>

      {/* Tab Content - Full Screen */}
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
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-24 h-24 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <span className="text-xs font-medium text-muted-foreground">Field</span>
            </div>
            <h2 className="text-base font-semibold text-foreground text-center mb-3">Relational Canvas</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Map relationships and context between people, moments, and patterns.
            </p>
          </div>
        )}

        {activeTab === 'Branches' && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-24 h-24 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <span className="text-xs font-medium text-muted-foreground">Branch</span>
            </div>
            <h2 className="text-base font-semibold text-foreground text-center mb-3">Alternative Threads</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Explore different interpretations and responses to the same moment.
            </p>
          </div>
        )}

        {activeTab === 'Family' && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-24 h-24 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <span className="text-xs font-medium text-muted-foreground">Family</span>
            </div>
            <h2 className="text-base font-semibold text-foreground text-center mb-3">Related Interactions</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              See how this moment connects to other conversations and patterns.
            </p>
          </div>
        )}

        {activeTab === 'Brief' && (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-24 h-24 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-center mb-6">
              <span className="text-xs font-medium text-muted-foreground">Brief</span>
            </div>
            <h2 className="text-base font-semibold text-foreground text-center mb-3">Summary & Insights</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Key takeaways, patterns, and suggestions for next steps.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar - iOS Style */}
      <div className="flex-shrink-0 border-t border-border bg-card flex gap-0.5 p-1 safe-area-inset-bottom">
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
