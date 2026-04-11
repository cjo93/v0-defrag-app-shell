# DEFRAG Agent Instructions & System Context

This document serves as the source of truth for AI agents working on the Defrag codebase to prevent feature drift and maintain product integrity.

## AI Architecture
- **AI Gateway Integration**: All workspace AI calls must route through the Vercel AI Gateway via `@ai-sdk/openai`.
- **Core Files**:
  - `lib/defrag/agent.ts`: The primary logic for prompt construction and schema-based generation.
  - `lib/defrag/schemas.ts`: Zod schemas ensuring structured, reliable AI responses.
  - `app/api/defrag/generate/route.ts`: API endpoint for AI interactions.
  - `components/workspace/chat-thread.tsx`: Renders structured AI output (Interpretation, Next Move, Rewrite).

## Environment Variables (Required for Production AI)
- `AI_GATEWAY_API_KEY`: API key for Vercel AI Gateway.
- `AI_GATEWAY_BASE_URL`: Base URL for the AI Gateway.
- `OPENAI_MODEL_PRIMARY`: Primary model name (e.g., `gpt-4o-mini`).

## Product Principles
- **Plain Language**: Avoid clinical diagnosis or jargon. Use human-centric, anti-stigma framing.
- **Structured Insights**: AI output must categorize responses into:
  1. **Interpretation**: What the person may be reacting to.
  2. **Next Move**: Concrete, helpful next steps.
  3. **Rewrite**: Softer framing or alternative wording for the user's input.
- **No Drifting**: Defrag is a relational intelligence platform, not a generic chatbot. Maintain the cinematic, stateful workspace visual.

## Code Constraints
- **Graceful Fallbacks**: Always maintain `buildResponse` (demo behavior) as a fallback in the UI if the AI call fails or environment variables are missing.
- **Canvas Isolation**: Keep `canvas-renderer.tsx` decoupled from chat logic unless explicitly refactoring the visualization layer.
