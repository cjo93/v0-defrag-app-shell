# Release Readiness Audit

Repository diagnosis

- The project has strong visual polish and a clear product voice focused on relational intelligence.
- Core AI agent wrapper is implemented (`lib/defrag/agent.ts`) and uses a schema-first approach.
- Many routes are implemented (landing, demo, pricing, onboarding, workspace, auth), but several backend-dependent flows are currently fragile or environment-dependent.
- Supabase client uses build-time dummy fallbacks — previously the dummy could cause silent or misleading behavior. This has been improved to avoid silent auth success.

Major architectural/product truths

- The product relies on Supabase for auth, profile persistence, and workspace data. Server-only admin operations require SUPABASE_SERVICE_ROLE_KEY.
- Agent generation uses an AI gateway pattern and a structured schema — this is a differentiator and must be preserved.
- The app must never imply successful persistence or auth when backend env vars are missing.

Top blockers

- Auth fallback previously risked either crashing or silently succeeding; must be honest when missing.
- Checkout resume flow (pricing → signup → checkout) used to rely on client query params and was fragile. Server-side guard was added to `/api/billing/checkout` to return 401 for unauthenticated requests so the resume cookie flow is invoked (short-lived HttpOnly cookie). This reduces silent checkout starts in unauthenticated previews.
- Onboarding assumed persistence; if backend missing the UX could mislead users into believing data saved.
- Workspace route must present explicit degraded/demo state when backend or entitlement checks fail.

Pass 1 updates (current pass work)

- login now calls `/api/billing/resume/continue` after successful sign-in to honor the HttpOnly resume cookie (parity with signup)
- signup already calls `/api/billing/resume/continue` after account creation to resume pricing checkout when applicable
- workspace now surfaces a visible "Retry workspace" affordance when composer or workspace creation errors occur; this provides a clear recovery path for degraded states
- server-side guard added to `/api/billing/checkout` to require server-side auth (returns 401 for guests) to force client resume behavior
- a minimal PR CI workflow was added at `.github/workflows/ci.yml` to run lint, typecheck, and build on PRs
Risk areas

- Conversion: fragile checkout flow and placeholder hero proof reduce trust and revenue.
- Trust: privacy claims need explicit UI presence in signup/onboarding/pricing.
- Release: no enforced preview smoke checks or visual gating in CI/Vercel.

Release recommendation state

- Current branch can be advanced to limited testers after completing Pass 1 (Platform Honesty) and adding the short follow-ups in Pass 2.
- Do not promote to production until checkout resume flow and preview smoke tests are in place.


