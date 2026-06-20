# Claude Code Loader

> **Full project constitution:** [`specs/constitution.md`](specs/constitution.md)
> Edit it with `/sdd:constitution`. This file is the lightweight operational loader Claude
> reads each session. Keep it under 2,500 tokens — when in doubt, move detail to the
> constitution instead of growing this file.

## Tech stack (one-liner)
- Next.js 16 (App Router/RSC) + React 19 (React Compiler) · TypeScript 6 strict · Sanity 5 CMS · Tailwind 4 + `@szum-tech/design-system` · Vitest 4 + Playwright + Storybook 10 · Biome 2 · **npm** (not pnpm)

## Run/build commands
- `dev`: `next dev`
- `build`: `next build`
- `test`: `vitest run --passWithNoTests` (scope: `test:unit`, `test:storybook`, `test:e2e`)
- `typecheck`: `npm run type-check` (`next typegen && tsc --noEmit`)
- `lint`: `npm run biome:check` (autofix: `biome:fix`)

## Architecture (one sentence)
Single Next.js App-Router app — public site in `app/(app)/`, Sanity Studio in `app/studio/`, route handlers in `app/api/`; domain logic in self-contained `features/<name>/` packages, shared code in `lib/` (sanity, logger, seo, server-action), `services/`, and validated env in `data/env/`.

## Most-broken rules (top WHAT-NOT-TO-DO items)

These are the operational anti-patterns Claude most often violates. The full catalogue with WHY each rule exists is in [`specs/constitution.md`](specs/constitution.md) section 5.

- DO NOT use arrow functions for named functions — use the `function` keyword (inline callbacks excepted)
- DO NOT use `&&` for conditional rendering — use a ternary with explicit `: null`
- DO NOT use raw Tailwind colors/typography or import `@radix-ui/*` — use `@szum-tech/design-system` tokens + components
- DO NOT use `import React` / named React imports — use `import * as React from "react"`
- DO NOT use `Type[]` — use `Array<Type>`
- DO NOT create barrel files (`index.ts` re-export aggregators)
- DO NOT call the Sanity client directly from components — go through `lib/sanity`
- DO NOT use pnpm/yarn — this project uses **npm** (committed `package-lock.json`)
- DO NOT commit without going through `/sdd:review`

## SDD flow
- Start any feature with `/sdd:doctor check`.
- Per feature: `/sdd:spec` → `/sdd:clarify` → `/sdd:plan` → `/sdd:tasks` → `/sdd:implement <id>` → `/sdd:review`.
- Specs live in `specs/<feature-slug>/`; the full project constitution is at [`specs/constitution.md`](specs/constitution.md).
