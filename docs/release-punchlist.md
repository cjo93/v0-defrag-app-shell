# Release Punchlist

This file lists issues grouped by pass. Each item includes severity, status, file targets, and the required action.

## Pass 1 — Platform Honesty (in-progress)

- [x] Improve Supabase dummy client to avoid silent auth success
  - severity: critical
  - status: done
  - files: `lib/supabase/client.ts`
  - action: implement

- [x] Make login surface honest when Supabase missing
  - severity: critical
  - status: done
  - files: `app/login/page.tsx`
  - action: implement (shows banner and prevents fake signin)

- [x] Make signup surface honest when Supabase missing
  - severity: critical
  - status: done
  - files: `app/signup/page.tsx`
  - action: implement (shows banner and prevents fake signup)

- [x] Make onboarding avoid silent persistence and surface preview limitations
  - severity: critical
  - status: done
  - files: `app/onboarding/page.tsx`
  - action: implement (skip upsert when backend missing, show banner)

- [ ] Ensure workspace route shows degraded/demo state when backend not available
  - severity: critical
  - status: not done
  - files: `app/workspace/page.tsx`, `components/workspace/*`
  - action: implement

- [ ] Harden pricing -> signup -> checkout resume server-side
  - severity: critical
  - status: done
  - files: `app/pricing/page.tsx`, `app/api/billing/*`, `app/signup/page.tsx`
  - action: implement server-side resume cookie and resume handler

## Pass 2 — Product Cohesion

- [ ] Replace decorative hero with reusable product-proof + metadata
  - severity: high
  - status: partial
  - files: `app/page.tsx`, `components/landing/HeroArtifact.tsx`
  - action: add timestamp/private badge + open CTA

- [ ] Add privacy panel in pricing and onboarding
  - severity: high
  - status: not done
  - files: `app/pricing/page.tsx`, `app/onboarding/page.tsx`, `components/ui/privacy-panel.tsx`
  - action: implement

- [ ] Add saved-artifact list UI in workspace
  - severity: medium
  - status: not done
  - files: `app/workspace/*`, `components/workspace/*`
  - action: implement

## Pass 3 — Public-use Readiness

- [ ] Mobile/touch fixes across hero, pricing, onboarding
  - severity: high
  - status: not done
  - files: multiple
  - action: adjust spacing and tappable targets

- [ ] Add explicit degraded/demo labeling across demo & workspace
  - severity: high
  - status: not done
  - files: `app/demo/*`, `app/workspace/*`
  - action: implement

## Pass 4 — Release Gates

- [ ] Add GitHub Actions: lint, typecheck, build, preview smoke
  - severity: critical
  - status: not done
  - files: `.github/workflows/preview-smoke.yml`
  - action: implement

- [ ] Add Vercel deployment checks and manual QA checklist
  - severity: high
  - status: not done
  - files: docs/release-gate-checklist.md
  - action: implement




