# Release Gate Checklist

## Required local checks
- [ ] npm install / pnpm install
- [ ] npm run lint (no blocking errors)
- [ ] npm run build (production build succeeds)
- [ ] Run local dev and smoke the following routes at required viewports:
  - /
  - /pricing
  - /login
  - /signup
  - /onboarding
  - /dashboard
  - /workspace
  - /demo

## Required preview checks (on Vercel preview)
- [ ] Homepage loads without console runtime errors
- [ ] Pricing checkout starts and handles auth redirect gracefully
- [ ] Signup/login work or show clear "not configured" banner when envs missing
- [ ] Workspace loads and shows explicit degraded/demo state when backend not configured
- [ ] No major layout shift on hero
- [ ] Mobile breakpoints: 390x844 and 430x932 tested

## Required mobile checks
- [ ] Tap targets >= 44px for main CTAs
- [ ] No sticky header overlap on hero at both iPhone sizes
- [ ] Onboarding forms usable with keyboard and not obscured

## Required auth/onboarding/workspace checks
- [ ] Signup redirects to onboarding when account created
- [ ] Onboarding persists profile into Supabase (when configured)
- [ ] Onboarding creates a starter workspace via API (when configured)
- [ ] Dashboard shows at least one workspace or clear empty-state with CTA

## Blockers for merge
- [ ] Critical checkout resume flow not implemented
- [ ] No preview smoke checks in CI
- [ ] Missing visible privacy controls on pricing/onboarding when launching

> NOTE: server-side guard added to `/api/billing/checkout` to require auth (returns 401 for guests) — this addresses the critical checkout resume flow. Follow-up: add preview smoke checks in CI.

### Pass 1 completion notes

- Implemented server-side guard on `/api/billing/checkout` to require auth and enable the resume cookie flow.
- Login and signup now both consult `/api/billing/resume/continue` after successful auth to preserve plan-intent resume (HttpOnly cookie).
- Workspace shows a visible retry affordance and demo badges when using the dummy Supabase client or when composer errors occur.

Next required steps before merge:

- Create a Git branch for this pass and push the changes, then validate the Vercel preview.
- A minimal PR CI workflow was added at `.github/workflows/ci.yml` to run lint, typecheck, and build on PRs. Add a preview-smoke job next to hit key routes.
- Finish workspace degraded-state UI to clearly disable unavailable actions in demo mode.

## Blockers for production promotion
- [ ] All preview checks above are green on a production-like preview
- [ ] No critical runtime errors in Sentry (or equivalent)
- [ ] Manual QA: "no placeholder proof" pass
- [ ] Feature flags applied for any incomplete premium areas

## Features that must be flag-gated before broader rollout
- Workspace multi-actor editing
- Organization/Studio plan features
- Any export or retention UI that is not fully implemented server-side



