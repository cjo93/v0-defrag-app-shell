# Defrag Backend Implementation - Phase 1 Complete

## Structure Created

```
lib/
  ├── supabase/
  │   ├── server.ts          (Supabase server client)
  │   └── admin.ts           (Supabase admin client for backend)
  └── defrag/
      ├── schemas.ts         (Zod schemas for structured outputs)
      └── agent.ts           (OpenAI agent orchestration)

app/api/
  ├── workspaces/route.ts                    (Create workspace + primary thread)
  ├── threads/[threadId]/messages/route.ts   (Post message, get AI response with structured output)
  ├── artifacts/generate/route.ts            (Generate artifact seeds)
  └── audio/tts/route.ts                     (Text-to-speech via OpenAI)

supabase/migrations/
  └── 0001_defrag_core.sql                   (Full schema with RLS policies)

components/workspace/
  └── canvas-renderer.tsx                    (Production canvas renderer for artifacts)
```

## Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=
OPENAI_MODEL_PRIMARY=gpt-4.1-mini
OPENAI_TTS_MODEL=gpt-4o-mini-tts
```

## Dependencies to Install

```bash
pnpm add @supabase/supabase-js @supabase/ssr openai ai @ai-sdk/openai zod
```

## Database Schema

Tables created:
- **profiles** - User profiles
- **workspaces** - User workspaces
- **threads** - Primary and branch threads
- **messages** - User and assistant messages with structured_output
- **artifacts** - Generated relational maps, simulations, briefs, etc.
- **rationale_blocks** - Supporting evidence for AI responses
- **briefs** - Daily briefs with audio status
- **baseline_profiles** - User baseline profiles with plain-language + frameworks

All tables include Row Level Security (RLS) policies ensuring users can only access their own data.

## API Routes Ready

### POST /api/workspaces
Create a workspace and primary thread
- Returns: `{ workspace }`

### POST /api/threads/[threadId]/messages
Post a user message, get Defrag response with structured output
- Input: `{ content }`
- Returns: `{ userMessage, assistantMessage, structured }`
- Structured output includes:
  - `responseText` - Plain language response
  - `relationalStatus` - aligned/diverging/uncertain
  - `suggestedNextStep` - Action guidance
  - `rationale` - Supporting evidence blocks
  - `suggestedArtifact` - relational_map/timing_view/etc

### POST /api/artifacts/generate
Generate artifact with seed payload
- Input: `{ workspaceId, threadId, kind, title }`
- Returns: `{ artifact }` with status: "ready" and seed payload

### POST /api/audio/tts
Generate MP3 audio from text via OpenAI
- Input: `{ text }`
- Returns: MP3 audio blob

## Frontend Wiring Checklist

Next tasks (in order):
1. ✓ Migration created
2. ✓ Supabase clients ready
3. ✓ Schemas defined
4. ✓ Agent orchestration ready
5. → **Wire workspace page** - Create/load workspace, load primary thread
6. → **Wire chat thread** - POST to messages route, render structured outputs, "Based on" disclosure
7. → **Wire canvas panel** - Generate artifact button, render with CanvasRenderer
8. → **Wire briefs audio** - POST to TTS route, play audio blob
9. → **Database validation** - Test Supabase migration, RLS policies

## Next Step

Send the current `app/workspace/page.tsx` so I can provide exact frontend wiring for phase 2.
