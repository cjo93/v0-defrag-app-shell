# DEFRAG agent instructions

## Source of truth
Work only in this repository.
Do not rely on old Xcode zip copies as active working state.
If older local work appears stronger, port it intentionally into this repo.

## Product identity
DEFRAG is a premium relational intelligence platform.
It must not drift into generic SaaS or generic chatbot UX.

## Brand
- DEFRAG for the mark/logo only
- Defrag in narrative text
- calm, premium, emotionally mature, plain-language tone

## UI rules
- no backend jargon in UI
- no walls of text
- prefer visual grouping, cards, drawers, disclosure, indicators
- desktop and iPhone must both feel intentional and premium
- workspace must feel alive and product-specific

## Product priorities
1. landing hero and cinematic workspace visual
2. workspace canvas visibility, statefulness, and interaction clarity
3. dashboard as a relational command center
4. onboarding / natal collection clarity and trust
5. educational layer integration
6. invite / privacy / relationship overlay polish
7. auth / billing / deployment readiness

## Safety
- preserve graceful handling for missing OPENAI_API_KEY
- preserve graceful handling for missing Supabase env vars
- do not introduce build-time crashes from missing secrets
- keep server-only secrets server-only
 - preserve graceful handling for missing AI gateway env vars (e.g. AI_GATEWAY_API_KEY, AI_GATEWAY_BASE_URL)
 - do not commit service-role keys (SUPABASE_SERVICE_ROLE_KEY) or gateway secrets to the repo or logs

## Working style
- audit briefly, then implement immediately
- prefer small, high-impact changes
- keep route structure intact unless fix is required
- ask specifically if Stripe, Supabase, or deployment details are missing

Agent-specific patterns (project):
- Use the project's existing SDK wrappers and schema-first pattern for AI calls. Example: `lib/defrag/agent.ts` uses `createOpenAI` from `@ai-sdk/openai` and `generateObject` with `DefragStructuredResponseSchema` (see `lib/defrag/schemas`). Prefer adding or reusing similar wrappers rather than swapping in a different OpenAI client.
- Supabase is wrapped with safe fallbacks during build: `lib/supabase/client.ts` returns a dummy client when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing. Do not convert this to a hard failure; keep build-time safety.
- Server-only admin access is handled in `lib/supabase/admin.ts` and requires `SUPABASE_SERVICE_ROLE_KEY`; treat that key as server-only and avoid using it in client code or committing it to env examples.
- Audio and TTS code checks `OPENAI_API_KEY` at runtime (see `app/api/audio/tts/route.ts`). Preserve that graceful check and the 503 response when absent.

## Definition of done
A task is not done unless:
- the visual result is materially stronger
- mobile/iPhone quality is considered
- build/env safety is preserved
- code is clean enough to commit
