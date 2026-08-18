# CLAUDE.md

## Project

This repo root is the **Next.js web app for ZenniFit** — the marketing site and
web dashboard, deployed to Vercel. It was split out from the mobile app: the
actual product experience now lives in `zenni-app/` (Expo / React Native),
which has its own `CLAUDE.md`/`AGENTS.md` and is a separate build entirely.

> Note: `README.md` currently describes this root project as an "unused
> scaffold" in favor of `zenni-app/`. That's stale — this root project is the
> active web app (marketing site + dashboard). Worth fixing the README in a
> follow-up, but that's out of scope for this file.

## Current repo state

- **Root Next.js app (this project)** — what `npm run build` / Vercel builds:
  - `app/page.tsx` — lean ZenniFitness parent homepage, links to `/zennifit`
  - `app/zennifit/page.tsx` — the ZenniFit product/marketing page
  - `app/signup/page.tsx` — Supabase email/password signup + login
  - `app/dashboard/page.tsx` — authenticated dashboard (redirects to `/signup`
    if not logged in), renders `GoalForm`
  - `lib/readiness.ts`, `lib/plan-engine.ts` — readiness scoring and adaptive
    plan generation logic; written but **not yet wired into any page UI**
  - `components/ui/*` — shadcn primitives; `components/goal-form.tsx`
  - Auth/data backend: Supabase (`NEXT_PUBLIC_SUPABASE_URL`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, gitignored)
- **`zenni-app/`** — Expo/React Native mobile app. Separate project, separate
  docs, not part of this build.
- **`fitness-tracker/`** — old Vite scaffold, unused, kept for reference only.

Both `zenni-app/` and `fitness-tracker/` are excluded via `.gitignore` and
`.vercelignore`.

## Guardrails

1. **Build only the root Next.js project.** `npm run build` targets this
   project alone. `zenni-app/` and `fitness-tracker/` must never be part of
   the Next.js/Vercel build.
2. **Never re-track `zenni-app/` or `fitness-tracker/`.** They're excluded in
   both `.gitignore` and `.vercelignore` on purpose (see commit history: the
   Vercel build broke until these were untracked). Don't `git add -f` them or
   otherwise pull them back into this repo's tracked files.
3. **Run `npm run build` before every push.** Confirm it passes locally first;
   don't push on a broken build.
4. **No secrets in source.** Supabase keys are read from env vars via
   `.env.local` (gitignored). Never hardcode credentials, API keys, or tokens
   into committed files.
5. **Naming convention:** the product/company brand is **"ZenniFit"** — use it
   in app name, marketing copy, and package/project naming. The in-app AI
   feature surface is labelled **"AI Coach"** in UI copy — never expose
   internal model/vendor names to users.

## Brand

- Primary red: `#B01020`
- Salmon accent: `#C94A3F`
- Headings: italic, heavy weight, approximating **Barlow Black Italic**.
  Barlow isn't wired via `next/font` yet — current pages use inline
  `fontStyle`/`fontWeight` as a stand-in. If adopting the real font:
  ```ts
  import { Barlow } from 'next/font/google';
  const barlow = Barlow({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-barlow',
  });
  ```
  add `${barlow.variable}` to the `<body>` className in `app/layout.tsx`, then
  swap inline `fontFamily` for `var(--font-barlow)`.

## Phased build plan

> Phases 1+ are inferred from current code state, not a confirmed roadmap —
> refine as the actual plan solidifies.

- **Phase 0 — Menu restructure** *(done, 2026-08-18)*: moved the ZenniFit
  landing page from `/` to `/zennifit`; added a lean parent homepage at `/`;
  nav uses a real `<Link>` instead of a static span.
- **Phase 1 — Auth & onboarding**: Supabase email/password signup + login
  (`app/signup`), authenticated dashboard redirect (`app/dashboard`). Exists,
  needs hardening (validation, error states, session polish).
- **Phase 2 — Readiness & plan engine surfaced**: wire `lib/readiness.ts` and
  `lib/plan-engine.ts` into the dashboard so users see a real readiness score
  and an adapted plan, not just the goal form.
- **Phase 3 — AI Coach surface**: build the chat/coach UI teased on the
  `/zennifit` marketing page, labelled "AI Coach" per the naming guardrail
  above.
- **Phase 4 — Polish & launch**: wearable sync, nutrition tracking, full nav
  (Pricing / About / FAQ), production hardening.
