# Renderer Contracts

## Launcher behavior
- Show launcher only when no mode selected.
- Launcher includes four modes:
  - Live System State
  - Video Explainer
  - Audio Overview
  - Visual Infographic

## Mode behavior
- Each mode renders from shared session-analysis state.
- Unsaved mode-local draft UI state persists in memory during active workspace session.

## Layout behavior
- Far-left rail for sessions + branches.
- Main thread always present.
- Optional branch split pane beside main thread.
- Right utility rail for summary/save/education hooks.
