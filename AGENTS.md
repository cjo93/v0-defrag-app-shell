# DEFRAG agent instructions

## Source of truth
Work only in this repository.
Do not create a parallel app.
Do not switch stacks.
Do not use zip exports as the implementation codebase.

## Canonical stack
- Next.js App Router
- Vercel deployment
- Supabase auth
- Stripe billing
- OpenAI integration
- API routes under /app/api

## Brand
- DEFRAG for the mark/logo only
- Defrag for narrative text
- calm, premium, emotionally mature, plain-language tone

## UI rules
- no backend jargon in UI
- no walls of text
- prioritize desktop and iPhone quality
- workspace must feel alive, premium, and product-specific

## Priorities
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
