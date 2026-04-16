'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  LiveSystemStateRenderer,
  type LiveSystemViewState,
} from '@/components/workspace/live-system-state-renderer'
import { AudioOverviewRenderer } from '@/components/workspace/audio-overview-renderer'
import { VideoExplainerRenderer } from '@/components/workspace/video-explainer-renderer'
import { VisualInfographicRenderer } from '@/components/workspace/visual-infographic-renderer'
import {
  CenterModeSchema,
  type CenterMode,
  type CanvasSnapshot,
  type AudioOverviewGenerated,
  AudioOverviewSnapshotPayloadSchema,
  type GenerateRendererRequest,
  type GenerateRendererResponse,
  LiveSystemSnapshotPayloadSchema,
  type VideoExplainerGenerated,
  VideoExplainerSnapshotPayloadSchema,
  VisualInfographicSnapshotPayloadSchema,
  type AudioOverviewViewStateSnapshot,
  type VideoExplainerViewStateSnapshot,
  type VisualInfographicViewStateSnapshot,
  type WorkspaceSession,
  type WorkspaceMessage,
  type AnalysisRecord,
  type SharedSessionAnalysis,
  type SaveSnapshotResponse,
} from '@/lib/workspace/contracts'
import { getEmptySharedAnalysis } from '@/lib/workspace/defaults'

const CENTER_MODES: { id: CenterMode; label: string; subtitle: string }[] = [
  {
    id: 'live_system_state',
    label: 'Live System State',
    subtitle: 'Real-time structured read of the interaction spine.',
  },
  {
    id: 'video_explainer',
    label: 'Video Explainer',
    subtitle: 'Storyboard scaffold only. No media generation in this phase.',
  },
  {
    id: 'audio_overview',
    label: 'Audio Overview',
    subtitle: 'Narration outline scaffold only. No audio generation in this phase.',
  },
  {
    id: 'visual_infographic',
    label: 'Visual Infographic',
    subtitle: 'Visual schema scaffold backed by shared session analysis.',
  },
]

type ModeDraftState = Record<CenterMode, { notes: string; title: string }>

const DEFAULT_DRAFTS: ModeDraftState = {
  live_system_state: { notes: '', title: 'Live System State' },
  video_explainer: { notes: '', title: 'Video Explainer' },
  audio_overview: { notes: '', title: 'Audio Overview' },
  visual_infographic: { notes: '', title: 'Visual Infographic' },
}

export function WorkspaceLayout() {
  const [session, setSession] = useState<WorkspaceSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [farRailCollapsed, setFarRailCollapsed] = useState(false)
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  const [activeMode, setActiveMode] = useState<CenterMode | null>(null)
  const [modeDrafts, setModeDrafts] = useState<ModeDraftState>(DEFAULT_DRAFTS)
  const [mainInput, setMainInput] = useState('')
  const [branchInput, setBranchInput] = useState('')
  const [sendingMain, setSendingMain] = useState(false)
  const [sendingBranch, setSendingBranch] = useState(false)
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null)
  const [creatingBranch, setCreatingBranch] = useState(false)
  const [savingSnapshot, setSavingSnapshot] = useState(false)
  const [generatingMode, setGeneratingMode] = useState<'audio_overview' | 'video_explainer' | null>(null)
  const [audioGenerated, setAudioGenerated] = useState<AudioOverviewGenerated | null>(null)
  const [videoGenerated, setVideoGenerated] = useState<VideoExplainerGenerated | null>(null)
  const [audioGenerationError, setAudioGenerationError] = useState<string | null>(null)
  const [videoGenerationError, setVideoGenerationError] = useState<string | null>(null)
  const [liveSystemViewState, setLiveSystemViewState] = useState<LiveSystemViewState>({
    zoom: 1,
    panX: 0,
    panY: 0,
    highlightedNodeId: null,
  })
  const [visualInfographicViewState, setVisualInfographicViewState] =
    useState<VisualInfographicViewStateSnapshot>({
      focusPanel: 'what_seems_off',
      emphasisLevel: 'balanced',
      expandedPanelIds: [],
    })
  const [audioOverviewViewState, setAudioOverviewViewState] = useState<AudioOverviewViewStateSnapshot>({
    pace: 'steady',
    selectedSegment: 'summary',
    includeSupportNotes: true,
  })
  const [videoExplainerViewState, setVideoExplainerViewState] = useState<VideoExplainerViewStateSnapshot>({
    pace: 'balanced',
    emphasis: 'standard',
    transitionStyle: 'flow',
    selectedBeat: 'context',
    showOrbCues: true,
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const personId = params.get('personId')
    if (personId) {
      setSelectedPersonId(personId)
    }
  }, [])

  useEffect(() => {
    void loadWorkspaceSession(selectedPersonId)
  }, [selectedPersonId])

  const mainThread = useMemo(
    () => session?.threads.find((thread) => thread.kind === 'primary') ?? null,
    [session]
  )

  const branchThreads = useMemo(
    () => session?.threads.filter((thread) => thread.kind === 'branch') ?? [],
    [session]
  )

  const selectedBranchThread = useMemo(
    () => branchThreads.find((thread) => thread.id === selectedBranchId) ?? null,
    [branchThreads, selectedBranchId]
  )

  const latestAnalysis = useMemo(
    () => (session?.analyses.length ? session.analyses[session.analyses.length - 1] : null),
    [session]
  )

  useEffect(() => {
    setAudioGenerated(null)
    setVideoGenerated(null)
    setAudioGenerationError(null)
    setVideoGenerationError(null)
  }, [latestAnalysis?.id])

  const sharedState = latestAnalysis?.sharedSessionState ?? getEmptySharedAnalysis()
  const liveSystemSnapshots = useMemo(
    () => (session?.snapshots ?? []).filter((snapshot) => snapshot.mode === 'live_system_state'),
    [session]
  )
  const visualInfographicSnapshots = useMemo(
    () => (session?.snapshots ?? []).filter((snapshot) => snapshot.mode === 'visual_infographic'),
    [session]
  )
  const audioOverviewSnapshots = useMemo(
    () => (session?.snapshots ?? []).filter((snapshot) => snapshot.mode === 'audio_overview'),
    [session]
  )
  const videoExplainerSnapshots = useMemo(
    () => (session?.snapshots ?? []).filter((snapshot) => snapshot.mode === 'video_explainer'),
    [session]
  )

  const mainMessages = useMemo(
    () =>
      mainThread
        ? session?.messages.filter((message) => message.threadId === mainThread.id) ?? []
        : [],
    [mainThread, session]
  )

  const selectedBranchMessages = useMemo(
    () =>
      selectedBranchThread
        ? session?.messages.filter((message) => message.threadId === selectedBranchThread.id) ?? []
        : [],
    [selectedBranchThread, session]
  )

  async function loadWorkspaceSession(personId: string | null) {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams()
    if (personId) {
      params.set('personId', personId)
    }

    try {
      const response = await fetch(`/api/workspace/session?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load workspace session')
      }

      const data = (await response.json()) as WorkspaceSession
      setSession(data)
      setSelectedPersonId(data.conversation.activePersonId)
      hydrateLiveSystemStateFromSnapshots(data.snapshots)
      hydrateAudioOverviewStateFromSnapshots(data.snapshots)
      hydrateVideoExplainerStateFromSnapshots(data.snapshots)
      hydrateVisualInfographicStateFromSnapshots(data.snapshots)

      if (selectedBranchId && !data.threads.some((thread) => thread.id === selectedBranchId)) {
        setSelectedBranchId(null)
      }
    } catch {
      setError('Workspace session unavailable. Ensure auth and migration setup are ready.')
    } finally {
      setLoading(false)
    }
  }

  function hydrateLiveSystemStateFromSnapshots(snapshots: CanvasSnapshot[]) {
    const latest = [...snapshots]
      .reverse()
      .find((snapshot) => snapshot.mode === 'live_system_state')

    if (!latest) return

    const parsed = LiveSystemSnapshotPayloadSchema.safeParse(latest.payload)
    if (!parsed.success) return

    setLiveSystemViewState(parsed.data.mapViewState)
  }

  function hydrateVisualInfographicStateFromSnapshots(snapshots: CanvasSnapshot[]) {
    const latest = [...snapshots]
      .reverse()
      .find((snapshot) => snapshot.mode === 'visual_infographic')

    if (!latest) return

    const parsed = VisualInfographicSnapshotPayloadSchema.safeParse(latest.payload)
    if (!parsed.success) return

    setVisualInfographicViewState(parsed.data.infographicViewState)
  }

  function hydrateAudioOverviewStateFromSnapshots(snapshots: CanvasSnapshot[]) {
    const latest = [...snapshots]
      .reverse()
      .find((snapshot) => snapshot.mode === 'audio_overview')

    if (!latest) return

    const parsed = AudioOverviewSnapshotPayloadSchema.safeParse(latest.payload)
    if (!parsed.success) return

    setAudioOverviewViewState(parsed.data.audioViewState)
  }

  function hydrateVideoExplainerStateFromSnapshots(snapshots: CanvasSnapshot[]) {
    const latest = [...snapshots]
      .reverse()
      .find((snapshot) => snapshot.mode === 'video_explainer')

    if (!latest) return

    const parsed = VideoExplainerSnapshotPayloadSchema.safeParse(latest.payload)
    if (!parsed.success) return

    setVideoExplainerViewState(parsed.data.videoViewState)
  }

  async function sendToThread(threadId: string, content: string, branch: boolean) {
    const input = content.trim()
    if (!input || !session) {
      return
    }

    if (branch) {
      setSendingBranch(true)
    } else {
      setSendingMain(true)
    }

    try {
      const response = await fetch(`/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, content: input }),
      })

      if (!response.ok) {
        throw new Error('Message send failed')
      }

      const payload = (await response.json()) as {
        userMessage: WorkspaceMessage
        assistantMessage: WorkspaceMessage
        analysis: AnalysisRecord | null
      }

      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: [...prev.messages, payload.userMessage, payload.assistantMessage],
          analyses: payload.analysis ? [...prev.analyses, payload.analysis] : prev.analyses,
        }
      })

      if (branch) {
        setBranchInput('')
      } else {
        setMainInput('')
      }
    } catch {
      setError('Could not send message. Try again.')
    } finally {
      if (branch) {
        setSendingBranch(false)
      } else {
        setSendingMain(false)
      }
    }
  }

  async function createBranchFromSuggestion() {
    if (!session || !mainThread || !sharedState.branchSuggestion || creatingBranch) {
      return
    }

    setCreatingBranch(true)
    try {
      const response = await fetch('/api/workspace/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: session.conversation.id,
          parentThreadId: mainThread.id,
          title: sharedState.branchSuggestion.title,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create branch')
      }

      const branch = (await response.json()) as {
        id: string
        conversationId: string
        kind: 'branch'
        parentThreadId: string | null
        title: string
        createdAt: string
      }

      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          threads: [...prev.threads, branch],
        }
      })
    } catch {
      setError('Could not create branch suggestion.')
    } finally {
      setCreatingBranch(false)
    }
  }

  function updateModeDraft(mode: CenterMode, patch: Partial<{ notes: string; title: string }>) {
    setModeDrafts((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        ...patch,
      },
    }))
  }

  async function saveLiveSystemSnapshot() {
    if (!session || !mainThread || !latestAnalysis) return

    setSavingSnapshot(true)
    setError(null)

    const activeThreadId = selectedBranchThread?.id ?? mainThread.id
    const payload = {
      rendererType: 'live_system_state' as const,
      conversationId: session.conversation.id,
      threadId: activeThreadId,
      analysisId: latestAnalysis.id,
      selectedPeopleScope: sharedState.selectedPeopleScope,
      mapViewState: liveSystemViewState,
      focusState: { highlightedNodeId: liveSystemViewState.highlightedNodeId },
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/workspace/snapshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: session.conversation.id,
          sourceThreadId: activeThreadId,
          analysisId: latestAnalysis.id,
          mode: 'live_system_state',
          title: modeDrafts.live_system_state.title || 'Live System Snapshot',
          payload,
        }),
      })

      if (!response.ok) {
        throw new Error('Snapshot save failed')
      }

      const snapshot = (await response.json()) as SaveSnapshotResponse
      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          snapshots: [...prev.snapshots, snapshot],
        }
      })
    } catch {
      setError('Could not save Live System snapshot.')
    } finally {
      setSavingSnapshot(false)
    }
  }

  async function saveVisualInfographicSnapshot() {
    if (!session || !mainThread || !latestAnalysis) return

    setSavingSnapshot(true)
    setError(null)

    const activeThreadId = selectedBranchThread?.id ?? mainThread.id
    const payload = {
      rendererType: 'visual_infographic' as const,
      conversationId: session.conversation.id,
      threadId: activeThreadId,
      analysisId: latestAnalysis.id,
      selectedPeopleScope: sharedState.selectedPeopleScope,
      infographicViewState: visualInfographicViewState,
      focusState: { selectedPanel: visualInfographicViewState.focusPanel },
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/workspace/snapshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: session.conversation.id,
          sourceThreadId: activeThreadId,
          analysisId: latestAnalysis.id,
          mode: 'visual_infographic',
          title: modeDrafts.visual_infographic.title || 'Visual Infographic Snapshot',
          payload,
        }),
      })

      if (!response.ok) {
        throw new Error('Snapshot save failed')
      }

      const snapshot = (await response.json()) as SaveSnapshotResponse
      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          snapshots: [...prev.snapshots, snapshot],
        }
      })
    } catch {
      setError('Could not save Visual Infographic snapshot.')
    } finally {
      setSavingSnapshot(false)
    }
  }

  async function saveAudioOverviewSnapshot() {
    if (!session || !mainThread || !latestAnalysis) return

    setSavingSnapshot(true)
    setError(null)

    const activeThreadId = selectedBranchThread?.id ?? mainThread.id
    const payload = {
      rendererType: 'audio_overview' as const,
      conversationId: session.conversation.id,
      threadId: activeThreadId,
      analysisId: latestAnalysis.id,
      selectedPeopleScope: sharedState.selectedPeopleScope,
      audioViewState: audioOverviewViewState,
      focusState: { selectedSegment: audioOverviewViewState.selectedSegment },
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/workspace/snapshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: session.conversation.id,
          sourceThreadId: activeThreadId,
          analysisId: latestAnalysis.id,
          mode: 'audio_overview',
          title: modeDrafts.audio_overview.title || 'Audio Overview Snapshot',
          payload,
        }),
      })

      if (!response.ok) {
        throw new Error('Snapshot save failed')
      }

      const snapshot = (await response.json()) as SaveSnapshotResponse
      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          snapshots: [...prev.snapshots, snapshot],
        }
      })
    } catch {
      setError('Could not save Audio Overview snapshot.')
    } finally {
      setSavingSnapshot(false)
    }
  }

  async function saveVideoExplainerSnapshot() {
    if (!session || !mainThread || !latestAnalysis) return

    setSavingSnapshot(true)
    setError(null)

    const activeThreadId = selectedBranchThread?.id ?? mainThread.id
    const payload = {
      rendererType: 'video_explainer' as const,
      conversationId: session.conversation.id,
      threadId: activeThreadId,
      analysisId: latestAnalysis.id,
      selectedPeopleScope: sharedState.selectedPeopleScope,
      videoViewState: videoExplainerViewState,
      focusState: { selectedBeat: videoExplainerViewState.selectedBeat },
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/workspace/snapshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: session.conversation.id,
          sourceThreadId: activeThreadId,
          analysisId: latestAnalysis.id,
          mode: 'video_explainer',
          title: modeDrafts.video_explainer.title || 'Video Explainer Snapshot',
          payload,
        }),
      })

      if (!response.ok) {
        throw new Error('Snapshot save failed')
      }

      const snapshot = (await response.json()) as SaveSnapshotResponse
      setSession((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          snapshots: [...prev.snapshots, snapshot],
        }
      })
    } catch {
      setError('Could not save Video Explainer snapshot.')
    } finally {
      setSavingSnapshot(false)
    }
  }

  async function generateRendererContent(mode: 'audio_overview' | 'video_explainer') {
    if (!session || !latestAnalysis) return

    setError(null)
    setGeneratingMode(mode)
    if (mode === 'audio_overview') {
      setAudioGenerationError(null)
    } else {
      setVideoGenerationError(null)
    }

    const request: GenerateRendererRequest =
      mode === 'audio_overview'
        ? {
            conversationId: session.conversation.id,
            analysisId: latestAnalysis.id,
            mode: 'audio_overview',
            viewState: audioOverviewViewState,
          }
        : {
            conversationId: session.conversation.id,
            analysisId: latestAnalysis.id,
            mode: 'video_explainer',
            viewState: videoExplainerViewState,
          }

    try {
      const response = await fetch('/api/workspace/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const payload = (await response.json()) as GenerateRendererResponse
      if (payload.mode === 'audio_overview') {
        setAudioGenerated(payload.content)
      } else {
        setVideoGenerated(payload.content)
      }
    } catch {
      if (mode === 'audio_overview') {
        setAudioGenerationError('Could not generate audio overview content.')
      } else {
        setVideoGenerationError('Could not generate video explainer content.')
      }
    } finally {
      setGeneratingMode(null)
    }
  }

  function restoreLiveSystemSnapshot(snapshot: CanvasSnapshot) {
    const parsed = LiveSystemSnapshotPayloadSchema.safeParse(snapshot.payload)
    if (!parsed.success) {
      setError('Snapshot payload is invalid and cannot be restored.')
      return
    }

    setActiveMode('live_system_state')
    setLiveSystemViewState(parsed.data.mapViewState)
  }

  function restoreVisualInfographicSnapshot(snapshot: CanvasSnapshot) {
    const parsed = VisualInfographicSnapshotPayloadSchema.safeParse(snapshot.payload)
    if (!parsed.success) {
      setError('Snapshot payload is invalid and cannot be restored.')
      return
    }

    setActiveMode('visual_infographic')
    setVisualInfographicViewState(parsed.data.infographicViewState)
  }

  function restoreAudioOverviewSnapshot(snapshot: CanvasSnapshot) {
    const parsed = AudioOverviewSnapshotPayloadSchema.safeParse(snapshot.payload)
    if (!parsed.success) {
      setError('Snapshot payload is invalid and cannot be restored.')
      return
    }

    setActiveMode('audio_overview')
    setAudioOverviewViewState(parsed.data.audioViewState)
  }

  function restoreVideoExplainerSnapshot(snapshot: CanvasSnapshot) {
    const parsed = VideoExplainerSnapshotPayloadSchema.safeParse(snapshot.payload)
    if (!parsed.success) {
      setError('Snapshot payload is invalid and cannot be restored.')
      return
    }

    setActiveMode('video_explainer')
    setVideoExplainerViewState(parsed.data.videoViewState)
  }

  const desktopOnlyShell = (
    <div className="hidden md:flex h-screen bg-background text-foreground overflow-hidden">
      <aside
        className={`border-r border-border/40 bg-card/30 transition-all duration-200 ${
          farRailCollapsed ? 'w-16' : 'w-72'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-3 border-b border-border/40 flex items-center justify-between gap-2">
            {!farRailCollapsed && <p className="text-xs font-semibold tracking-wide">Workspace Rail</p>}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setFarRailCollapsed((prev) => !prev)}
              className="h-7 px-2"
              aria-label="Toggle workspace rail"
            >
              {farRailCollapsed ? '»' : '«'}
            </Button>
          </div>

          <div className="p-3 space-y-4 overflow-y-auto">
            <section className="space-y-2">
              {!farRailCollapsed && (
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Session</p>
              )}
              <button
                type="button"
                className="w-full rounded border border-primary/30 bg-primary/10 px-2 py-2 text-left text-xs"
              >
                {farRailCollapsed ? 'M' : session?.conversation.title ?? 'Main Workspace Session'}
              </button>
            </section>

            <section className="space-y-2">
              {!farRailCollapsed && (
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Branches</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-[11px] px-2"
                    onClick={createBranchFromSuggestion}
                    disabled={creatingBranch || !sharedState.branchSuggestion || !session || !mainThread}
                    title="Create branch from suggestion"
                  >
                    +
                  </Button>
                </div>
              )}

              {branchThreads.length === 0 && !farRailCollapsed && (
                <div className="rounded border border-dashed border-border px-2 py-2 text-[11px] text-muted-foreground">
                  No branches yet.
                </div>
              )}

              {branchThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setSelectedBranchId((prev) => (prev === thread.id ? null : thread.id))}
                  className={`w-full rounded px-2 py-2 text-left text-xs border transition-colors ${
                    selectedBranchId === thread.id
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-border/40 hover:bg-muted/40'
                  }`}
                  title={thread.title}
                >
                  {farRailCollapsed ? 'B' : thread.title}
                </button>
              ))}
            </section>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 min-w-0">
        <section className="w-[30rem] min-w-[28rem] border-r border-border/40 bg-background flex flex-col">
          <header className="px-4 py-3 border-b border-border/30 space-y-3">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase">Main Thread</p>
              <p className="text-xs text-muted-foreground">Always open and input-ready</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="person-scope" className="text-[11px] uppercase tracking-wide text-muted-foreground">
                People Scope
              </label>
              <select
                id="person-scope"
                className="w-full h-8 rounded border border-border/40 bg-background px-2 text-xs"
                value={selectedPersonId ?? ''}
                onChange={(event) => setSelectedPersonId(event.target.value || null)}
              >
                <option value="">Select person scope</option>
                {(session?.roster ?? []).map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.role}: {person.name}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mainMessages.map((message) => (
              <MessageBubble key={message.id} role={message.role} content={message.content} />
            ))}
          </div>

          <div className="border-t border-border/30 p-3 space-y-2">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (mainThread) {
                  void sendToThread(mainThread.id, mainInput, false)
                }
              }}
              className="flex gap-2"
            >
              <Input
                value={mainInput}
                onChange={(event) => setMainInput(event.target.value)}
                placeholder="Describe a moment..."
                autoFocus
              />
              <Button type="submit" size="sm" disabled={!mainThread || sendingMain}>
                {sendingMain ? 'Sending' : 'Send'}
              </Button>
            </form>

            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => setShowDisclosure((prev) => !prev)}
            >
              What this is based on
            </button>

            {showDisclosure && (
              <div className="rounded border border-border/40 bg-card/50 px-3 py-2 text-xs space-y-2">
                {(sharedState.supportNotes.length > 0
                  ? sharedState.supportNotes
                  : sharedState.rationaleBlocks
                ).length > 0 ? (
                  (sharedState.supportNotes.length > 0
                    ? sharedState.supportNotes
                    : sharedState.rationaleBlocks
                  ).map((block) => (
                    <div key={block.label}>
                      <p className="font-semibold">{block.label}</p>
                      <p className="text-muted-foreground">{block.detail}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No rationale blocks yet.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {selectedBranchThread && (
          <section className="w-[24rem] min-w-[22rem] border-r border-border/40 bg-card/20 flex flex-col">
            <header className="px-4 py-3 border-b border-border/30">
              <p className="text-xs font-semibold tracking-wide uppercase">{selectedBranchThread.title}</p>
              <p className="text-xs text-muted-foreground">Branch split pane</p>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedBranchMessages.map((message) => (
                <MessageBubble key={message.id} role={message.role} content={message.content} />
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (selectedBranchThread) {
                  void sendToThread(selectedBranchThread.id, branchInput, true)
                }
              }}
              className="border-t border-border/30 p-3 flex gap-2"
            >
              <Input
                value={branchInput}
                onChange={(event) => setBranchInput(event.target.value)}
                placeholder="Branch message..."
              />
              <Button type="submit" size="sm" disabled={sendingBranch}>
                {sendingBranch ? 'Sending' : 'Send'}
              </Button>
            </form>
          </section>
        )}

        <section className="flex-1 min-w-0 border-r border-border/40 bg-background/60 flex flex-col">
          <header className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase">Center Stage</p>
              <p className="text-xs text-muted-foreground">Shared session-state renderers</p>
            </div>
            {activeMode && (
              <Button size="sm" variant="outline" onClick={() => setActiveMode(null)}>
                Back To Launcher
              </Button>
            )}
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            {!activeMode ? (
              <div className="grid grid-cols-2 gap-3 max-w-2xl">
                {CENTER_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode.id)}
                    className="rounded-lg border border-border/40 bg-card/40 p-4 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-xs font-semibold tracking-wide uppercase">{mode.label}</p>
                    <p className="text-xs text-muted-foreground mt-2">{mode.subtitle}</p>
                  </button>
                ))}
              </div>
            ) : (
              <ModeRenderer
                mode={activeMode}
                sharedState={sharedState}
                draft={modeDrafts[activeMode]}
                onDraftChange={(patch) => updateModeDraft(activeMode, patch)}
                liveViewState={liveSystemViewState}
                onLiveViewStateChange={(patch) =>
                  setLiveSystemViewState((prev) => ({ ...prev, ...patch }))
                }
                infographicViewState={visualInfographicViewState}
                onInfographicViewStateChange={(patch) =>
                  setVisualInfographicViewState((prev) => ({ ...prev, ...patch }))
                }
                audioOverviewViewState={audioOverviewViewState}
                onAudioOverviewViewStateChange={(patch) =>
                  setAudioOverviewViewState((prev) => ({ ...prev, ...patch }))
                }
                videoExplainerViewState={videoExplainerViewState}
                onVideoExplainerViewStateChange={(patch) =>
                  setVideoExplainerViewState((prev) => ({ ...prev, ...patch }))
                }
                audioGenerated={audioGenerated}
                videoGenerated={videoGenerated}
                audioGenerationError={audioGenerationError}
                videoGenerationError={videoGenerationError}
                generatingMode={generatingMode}
                onGenerateAudio={() => void generateRendererContent('audio_overview')}
                onGenerateVideo={() => void generateRendererContent('video_explainer')}
              />
            )}
          </div>
        </section>

        <aside className="w-80 min-w-[20rem] bg-card/30 flex flex-col">
          <header className="px-4 py-3 border-b border-border/30">
            <p className="text-xs font-semibold tracking-wide uppercase">Utility Rail</p>
            <p className="text-xs text-muted-foreground">Summaries, saves, and educational hooks</p>
          </header>

          <div className="p-4 space-y-4 overflow-y-auto">
            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Session Summary</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{sharedState.summary}</p>
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Save Actions</p>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={saveLiveSystemSnapshot}
                  disabled={savingSnapshot || !session || !mainThread || !latestAnalysis}
                >
                  {savingSnapshot ? 'Saving...' : 'Save Live System Snapshot'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={saveVideoExplainerSnapshot}
                  disabled={savingSnapshot || !session || !mainThread || !latestAnalysis}
                >
                  {savingSnapshot ? 'Saving...' : 'Save Video Explainer Snapshot'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={saveAudioOverviewSnapshot}
                  disabled={savingSnapshot || !session || !mainThread || !latestAnalysis}
                >
                  {savingSnapshot ? 'Saving...' : 'Save Audio Overview Snapshot'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={saveVisualInfographicSnapshot}
                  disabled={savingSnapshot || !session || !mainThread || !latestAnalysis}
                >
                  {savingSnapshot ? 'Saving...' : 'Save Visual Infographic Snapshot'}
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Save Summary Hook (Scaffold)
                </Button>
              </div>
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Live System Snapshots</p>
              {liveSystemSnapshots.length === 0 ? (
                <p className="text-xs text-muted-foreground">No Live System snapshots yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...liveSystemSnapshots]
                    .reverse()
                    .map((snapshot) => (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => restoreLiveSystemSnapshot(snapshot)}
                        className="w-full text-left rounded border border-border/40 px-2 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <p className="text-xs font-medium">{snapshot.title ?? 'Live System Snapshot'}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(snapshot.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))}
                </div>
              )}
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Video Explainer Snapshots</p>
              {videoExplainerSnapshots.length === 0 ? (
                <p className="text-xs text-muted-foreground">No Video Explainer snapshots yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...videoExplainerSnapshots]
                    .reverse()
                    .map((snapshot) => (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => restoreVideoExplainerSnapshot(snapshot)}
                        className="w-full text-left rounded border border-border/40 px-2 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <p className="text-xs font-medium">{snapshot.title ?? 'Video Explainer Snapshot'}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(snapshot.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))}
                </div>
              )}
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Audio Overview Snapshots</p>
              {audioOverviewSnapshots.length === 0 ? (
                <p className="text-xs text-muted-foreground">No Audio Overview snapshots yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...audioOverviewSnapshots]
                    .reverse()
                    .map((snapshot) => (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => restoreAudioOverviewSnapshot(snapshot)}
                        className="w-full text-left rounded border border-border/40 px-2 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <p className="text-xs font-medium">{snapshot.title ?? 'Audio Overview Snapshot'}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(snapshot.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))}
                </div>
              )}
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Visual Infographic Snapshots</p>
              {visualInfographicSnapshots.length === 0 ? (
                <p className="text-xs text-muted-foreground">No Visual Infographic snapshots yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...visualInfographicSnapshots]
                    .reverse()
                    .map((snapshot) => (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => restoreVisualInfographicSnapshot(snapshot)}
                        className="w-full text-left rounded border border-border/40 px-2 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <p className="text-xs font-medium">{snapshot.title ?? 'Visual Infographic Snapshot'}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(snapshot.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))}
                </div>
              )}
            </section>

            <section className="rounded border border-border/40 bg-background/80 p-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide">Educational Hook</p>
              <p className="text-xs text-muted-foreground">
                Saveable educational snippets will connect here once media/snapshot persistence is expanded.
              </p>
            </section>

            {sharedState.branchSuggestion && (
              <section className="rounded border border-primary/30 bg-primary/10 p-3 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide">Branch Suggestion</p>
                <p className="text-xs">{sharedState.branchSuggestion.title}</p>
                <p className="text-xs text-muted-foreground">{sharedState.branchSuggestion.reason}</p>
                <Button size="sm" variant="outline" onClick={createBranchFromSuggestion} disabled={creatingBranch}>
                  {creatingBranch ? 'Creating...' : 'Create Branch'}
                </Button>
              </section>
            )}
          </div>
        </aside>
      </div>
    </div>
  )

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-sm">Loading workspace…</div>
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <div className="rounded border border-destructive/40 bg-destructive/10 p-4 max-w-md space-y-2">
          <p className="text-sm font-semibold">Workspace unavailable</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {desktopOnlyShell}
      <div className="md:hidden h-screen flex items-center justify-center p-6 text-sm text-muted-foreground">
        Desktop workspace foundation is enabled. Mobile workspace is intentionally deferred.
      </div>
    </>
  )
}

function MessageBubble({ role, content }: { role: WorkspaceMessage['role']; content: string }) {
  const isAssistant = role === 'assistant'
  const isSystem = role === 'system'

  return (
    <div
      className={`rounded-md border px-3 py-2 text-xs leading-relaxed ${
        isAssistant
          ? 'border-primary/30 bg-primary/10'
          : isSystem
          ? 'border-amber-500/30 bg-amber-500/10'
          : 'border-border/40 bg-background'
      }`}
    >
      <p className="uppercase text-[10px] tracking-wide mb-1 text-muted-foreground">{role}</p>
      <p>{content}</p>
    </div>
  )
}

function ModeRenderer({
  mode,
  sharedState,
  draft,
  onDraftChange,
  liveViewState,
  onLiveViewStateChange,
  infographicViewState,
  onInfographicViewStateChange,
  audioOverviewViewState,
  onAudioOverviewViewStateChange,
  videoExplainerViewState,
  onVideoExplainerViewStateChange,
  audioGenerated,
  videoGenerated,
  audioGenerationError,
  videoGenerationError,
  generatingMode,
  onGenerateAudio,
  onGenerateVideo,
}: {
  mode: CenterMode
  sharedState: SharedSessionAnalysis
  draft: { notes: string; title: string }
  onDraftChange: (patch: Partial<{ notes: string; title: string }>) => void
  liveViewState: LiveSystemViewState
  onLiveViewStateChange: (patch: Partial<LiveSystemViewState>) => void
  infographicViewState: VisualInfographicViewStateSnapshot
  onInfographicViewStateChange: (patch: Partial<VisualInfographicViewStateSnapshot>) => void
  audioOverviewViewState: AudioOverviewViewStateSnapshot
  onAudioOverviewViewStateChange: (patch: Partial<AudioOverviewViewStateSnapshot>) => void
  videoExplainerViewState: VideoExplainerViewStateSnapshot
  onVideoExplainerViewStateChange: (patch: Partial<VideoExplainerViewStateSnapshot>) => void
  audioGenerated: AudioOverviewGenerated | null
  videoGenerated: VideoExplainerGenerated | null
  audioGenerationError: string | null
  videoGenerationError: string | null
  generatingMode: 'audio_overview' | 'video_explainer' | null
  onGenerateAudio: () => void
  onGenerateVideo: () => void
}) {
  const parsedMode = CenterModeSchema.parse(mode)

  if (parsedMode === 'live_system_state') {
    return (
      <LiveSystemStateRenderer
        sharedState={sharedState}
        draft={draft}
        onDraftChange={onDraftChange}
        viewState={liveViewState}
        onViewStateChange={onLiveViewStateChange}
      />
    )
  }

  if (parsedMode === 'visual_infographic') {
    return (
      <VisualInfographicRenderer
        sharedState={sharedState}
        draft={draft}
        onDraftChange={onDraftChange}
        viewState={infographicViewState}
        onViewStateChange={onInfographicViewStateChange}
      />
    )
  }

  if (parsedMode === 'audio_overview') {
    return (
      <AudioOverviewRenderer
        sharedState={sharedState}
        draft={draft}
        onDraftChange={onDraftChange}
        viewState={audioOverviewViewState}
        onViewStateChange={onAudioOverviewViewStateChange}
        generatedContent={audioGenerated}
        isGenerating={generatingMode === 'audio_overview'}
        onGenerate={onGenerateAudio}
        generationError={audioGenerationError}
      />
    )
  }

  if (parsedMode === 'video_explainer') {
    return (
      <VideoExplainerRenderer
        sharedState={sharedState}
        draft={draft}
        onDraftChange={onDraftChange}
        viewState={videoExplainerViewState}
        onViewStateChange={onVideoExplainerViewStateChange}
        generatedContent={videoGenerated}
        isGenerating={generatingMode === 'video_explainer'}
        onGenerate={onGenerateVideo}
        generationError={videoGenerationError}
      />
    )
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide">{labelForMode(parsedMode)}</p>
        <p className="text-sm text-muted-foreground">All mode renderers consume one shared session-analysis object.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded border border-border/40 bg-card/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2">Spine</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>Event: {sharedState.spine.event}</li>
            <li>Filter: {sharedState.spine.filter}</li>
            <li>Distortion: {sharedState.spine.distortion}</li>
            <li>Defense: {sharedState.spine.defense}</li>
            <li>Outcome: {sharedState.spine.outcome}</li>
            <li>Repair lever: {sharedState.spine.repairLever}</li>
          </ul>
        </div>

        <div className="rounded border border-border/40 bg-card/50 p-3 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide">Mode Draft (Unsaved)</p>
          <Input
            value={draft.title}
            onChange={(event) => onDraftChange({ title: event.target.value })}
            placeholder="Draft title"
          />
          <Textarea
            value={draft.notes}
            onChange={(event) => onDraftChange({ notes: event.target.value })}
            placeholder="Temporary mode notes preserved while switching modes"
            rows={6}
          />
        </div>
      </div>

      <div className="rounded border border-border/40 bg-background p-3 text-xs text-muted-foreground">
        {renderModeSpecificHint(parsedMode)}
      </div>
    </div>
  )
}

function labelForMode(mode: CenterMode) {
  if (mode === 'live_system_state') return 'Live System State'
  if (mode === 'video_explainer') return 'Video Explainer'
  if (mode === 'audio_overview') return 'Audio Overview'
  return 'Visual Infographic'
}

function renderModeSpecificHint(mode: CenterMode) {
  if (mode === 'live_system_state') {
    return 'Live renderer scaffold: structured thread summary and status overlays will mount here.'
  }

  if (mode === 'video_explainer') {
    return 'Video renderer scaffold: scene sequencing uses shared session state, no generation invoked yet.'
  }

  if (mode === 'audio_overview') {
    return 'Audio renderer scaffold: spoken script and segment timing use shared session state, no TTS generation yet.'
  }

  return 'Infographic renderer scaffold: visual blocks and captions use shared session state, no export flow yet.'
}
