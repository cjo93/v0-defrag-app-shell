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

## Working style
- audit briefly, then implement immediately
- prefer small, high-impact changes
- keep route structure intact unless fix is required
- ask specifically if Stripe, Supabase, or deployment details are missing

## Definition of done
A task is not done unless:
- the visual result is materially stronger
- mobile/iPhone quality is considered
- build/env safety is preserved
- code is clean enough to commit
