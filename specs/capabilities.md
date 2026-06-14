# Project Capabilities

> This file is auto-populated by `/sdd:doctor init` (auto-detect installed plugins
> plus project type detection). Sections marked `<!-- user-override -->` are NEVER
> overwritten on re-init — safe place for customizations.

## Specialist agents (delegate implementation work)

<!-- auto-generated -->
- **code-reviewer** (szum-tech/code-quality) — Comprehensive code review for Next.js/React/TypeScript code; reviews recent changes for quality, performance, type safety, security, and pattern compliance.
- **library-updater** (szum-tech/code-quality) — Update npm packages, investigate breaking changes, execute migrations, verify code quality after dependency updates.
- **performance-analyzer** (szum-tech/code-quality) — Analyze application performance, optimize bundle size, improve React rendering efficiency, debug slow queries.
- **nextjs-backend-engineer** (szum-tech/nextjs) — Implement backend logic: server actions, route handlers, API endpoints, database operations, authentication flows.
- **storybook-tester** (szum-tech/testing) — Write Storybook stories and interaction tests for React components, add play functions, test variants and edge cases.
- **testing-strategist** (szum-tech/testing) — Plan test strategies, analyze coverage, decide which types of tests to write.
- **unit-tester** (szum-tech/testing) — Write Vitest unit tests for TypeScript logic — utilities, pure functions, Zod schemas, hooks, server actions with mocked deps.
- **code-simplifier** (claude-plugins-official/code-simplifier) — Simplify and refine recently modified code for clarity, consistency, and maintainability while preserving functionality.

## Skills (load into context on demand)

<!-- auto-generated -->
- **szum-tech-design-system** (szum-tech/design) — `@szum-tech/design-system` tokens and components usage.
- **design-system-component** (szum-tech/design) — Build a new design-system component following project conventions.
- **implement-design** (szum-tech/design) — Implement a UI design into the project.
- **tailwind-css-4** (szum-tech/design) — Tailwind CSS v4 CSS-first config, `@theme` directive, design-system integration.
- **generate-feature-package** (szum-tech/nextjs) — Scaffold a new feature domain package under `features/<name>/`.
- **server-actions** (szum-tech/nextjs) — Next.js server action patterns.
- **error-handling** (szum-tech/nextjs) — Typed error-handling patterns.
- **structured-logging** (szum-tech/nextjs) — Structured logging with Pino — levels, context enrichment, child loggers.
- **t3-env-validation** (szum-tech/nextjs) — Type-safe env validation with `@t3-oss/env-nextjs` + Zod.
- **toast-notifications** (szum-tech/nextjs) — Toast notification patterns.
- **unit-testing** (szum-tech/testing) — Vitest unit tests — mocking, async, parameterized tests, server actions.
- **storybook-testing** (szum-tech/testing) — Storybook interaction tests and play functions.
- **playwright-cli** (szum-tech/testing) — Browser automation for E2E testing via Playwright CLI.
- **true-dom-tester** (szum-tech/testing) — Automated browser tests via Playwright CLI + accessibility tree snapshots.
- **api-test** (szum-tech/testing) — Test Next.js Route Handlers / API endpoints with real HTTP requests.
- **builder-factory** (szum-tech/testing) — Typed test-data builders with mimicry-js + Faker.
- **accessibility-audit** (szum-tech/testing) — WCAG accessibility audits on React components.
- **performance-optimization** (szum-tech/code-quality) — Next.js performance patterns — bundle analysis, React rendering optimization.
- **repository-documentation** (szum-tech/code-quality) — Generate/maintain repository documentation.
- **update-deps** (szum-tech/code-quality) — Dependency update workflow.
- **lighthouse-audit** (szum-tech/performance) — Automated Lighthouse audit (build + `@lhci/cli`) across key URLs.

## Stack profile

<!-- auto-generated -->
- **language**: TypeScript (strict)
- **framework**: Next.js 16 (App Router / RSC) + React 19 (React Compiler)
- **cms**: Sanity 5
- **ui**: Tailwind CSS 4 + `@szum-tech/design-system`
- **tests**: Vitest 4 + Playwright + Storybook 10
- **lint/format**: Biome 2
- **typecheck**: `tsc --noEmit` (via `next typegen && tsc`)
- **package-manager**: npm (committed `package-lock.json`)
- **monorepo**: no

## Task type → routing rules

<!-- user-override -->
| Task type           | Specialist agent          | Skills to load                          |
|---------------------|---------------------------|-----------------------------------------|
| ui-contract         | (orchestrator)            | design-system                           |
| ui-component-test   | storybook-tester          | storybook-testing, design-system        |
| ui-component        | (orchestrator)            | design-system                           |
| server-action       | nextjs-backend-engineer   | server-actions, error-handling          |
| route-handler       | nextjs-backend-engineer   | server-actions, structured-logging      |
| unit-test           | (orchestrator)            | unit-testing                            |
| e2e-test            | (orchestrator)            | playwright-cli                          |
| a11y-audit          | (orchestrator)            | accessibility-audit                     |
| test-strategy       | testing-strategist        | unit-testing, playwright-cli            |
| refactor            | (orchestrator)            | react-doctor (post)                     |
| generic             | (orchestrator)            | —                                       |

## Custom routing rules

<!-- user-override -->
<!-- Add your own task types and routing rules. /sdd:tasks uses these alongside the defaults above. -->
