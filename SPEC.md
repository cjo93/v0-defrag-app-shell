# Defrag Locked Workspace Spec

## Scope
This repository implements the desktop workspace foundation for the locked Defrag revision.

## Locked desktop contract
- Persistent main thread is always visible and input-ready.
- Far-left rail holds sessions and branch navigation.
- Branch opens only when user selects a branch from the far-left rail.
- Selected branch renders as a split pane beside the main thread.
- Center stage shows launcher tiles only when no center mode is selected.
- Center launcher modes:
  - Live System State
  - Video Explainer
  - Audio Overview
  - Visual Infographic
- Right rail is reserved for utilities, summary, save actions, and educational save hooks.
- Session scope is people only from saved roster records (role + name).
- Branches are suggested by analysis but are user-triggered.
- Center modes are alternate renderers of one shared structured session-analysis object.
- Workspace does not open directly to a system map by default.

## Data contract
Workspace contract centers on:
- conversations
- conversation_threads
- messages
- analyses
- canvas_snapshots

Required hydration behavior:
- restore active conversation
- restore primary thread
- restore chronological messages
- restore analyses
- restore snapshots (if present)
- restore branches list

## Out of scope for this phase
- Full media generation pipelines.
- Mobile parity for desktop-specific workspace foundation.
