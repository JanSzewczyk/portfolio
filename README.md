<div align="center">

# 🚀 Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=portfolio)
[![GitHub stars](https://img.shields.io/github/stars/JanSzewczyk/portfolio?style=social)](https://github.com/JanSzewczyk/portfolio/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-5.26-F03E2F?logo=sanity&logoColor=white)](https://www.sanity.io/)

**Personal portfolio website for Jan Szewczyk — Frontend Engineer & Open Source Creator**

[Live Demo](https://janszewczyk.com) • [Features](#-features) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 👋 Hello there!

This is the personal portfolio website of **Jan Szewczyk**, a Frontend Engineer from Cracow, Poland, specializing in
React, Next.js, TypeScript, and React Native. The site showcases professional experience, projects, skills, and provides
a contact form for inquiries — fully content-managed via Sanity CMS and shipped on Next.js 16 with the React Compiler.

### Portfolio Sections

- **Hero** — Introduction and call-to-action
- **About** — Professional background, personal story and location map
- **Experience** — Work history and professional achievements
- **Education** — Academic background
- **Projects** — Featured open source and professional projects
- **Skills** — Technical expertise and technologies
- **Contact** — Contact form powered by Resend email service

---

## ✨ Features

### 🏗️ Core Technologies

- **Next.js 16.2** with the App Router and React Server Components
- **React 19.2** with **React Compiler** for automatic memoization
- **TypeScript 6.0** with strict mode and `@total-typescript/ts-reset`
- **Tailwind CSS 4.3** with CSS-first configuration and PostCSS integration
- **Sanity 5.26** headless CMS with embedded Studio at `/studio`
- **Resend 6.12** for transactional email delivery
- **React Hook Form 7.76** + **Zod 4** for type-safe form validation
- **pigeon-maps** for a lightweight interactive location map

### 🎨 Design & UX

- Responsive design optimized for all devices
- Dark/Light theme with system preference detection (`next-themes`)
- [Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system) 3.21 — shadcn/ui based component library
- Smooth animations and micro-interactions

### 📝 Content Management

- **Sanity CMS** with structured schemas for experience, education, projects and SEO
- Embedded Sanity Studio at `/studio`
- Draft mode for content preview
- Type-safe content queries with auto-generated types (`sanity:typegen`)
- On-demand path revalidation via `/api/revalidate/path`

### 🔍 SEO Optimized

- Structured data (JSON-LD) — Person, Organization, WebSite, WebPage, ProfilePage, BreadcrumbList schemas
- Open Graph and Twitter meta tags
- Dynamic sitemap and robots.txt
- PWA manifest for mobile installability
- React `cache()` for per-request SEO data fetching

### 🧪 Testing & Quality

- **Vitest 4.0** unit tests with V8 coverage reporting
- **Storybook 10.4** component tests with Playwright browser runner and `@storybook/addon-a11y`
- **Playwright 1.60** end-to-end testing
- **Biome 2.4** for linting and formatting (single-tool replacement for ESLint + Prettier)
- **Testing Library** suite (React, DOM, user-event, jest-dom)

### 🤖 Automation & DevOps

- **GitHub Actions** for CI (CodeQL security scanning)
- **Dependabot** for automated dependency updates
- **Semantic Release** via `@szum-tech/semantic-release-config` — automated versioning and CHANGELOG
- **Conventional Commits** for clean commit history
- **Vercel Analytics** for traffic insights

### 🔧 Developer Experience

- **T3 Env** (`@t3-oss/env-nextjs`) for build-time validated environment variables
- **Pino 10** structured logging with request ID tracking via `proxy.ts`
- Built-in health check endpoint at `/api/health` (aliases: `/healthz`, `/health`, `/ping`)
- Bundle analysis via `next experimental-analyze`
- Path alias `~/*` for clean absolute imports

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Getting Started](#-getting-started)
- [🚀 Deployment](#-deployment)
- [📃 Scripts Overview](#-scripts-overview)
- [🧪 Testing](#-testing)
- [🎨 Styling](#-styling)
- [💻 Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🤖 AI Development Tools](#-ai-development-tools)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📧 Contact & Support](#-contact--support)

---

## 🎯 Getting Started

### 📋 Prerequisites

- **Node.js** 20.x or higher
- **npm** package manager
- **Git** for version control

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/JanSzewczyk/portfolio.git
cd portfolio
```

#### 2. Install Dependencies

```bash
npm ci
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the root directory (see [Environment Variables](#-environment-variables) below).

#### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=portfolio)

1. Click **Deploy with Vercel**
2. Connect your GitHub repository
3. Configure the environment variables in the Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

---

## 📃 Scripts Overview

### Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run analyze      # Bundle analyzer (next experimental-analyze)
```

### Code Quality (Biome)

```bash
npm run biome:check       # Lint + format check
npm run biome:fix         # Lint + format auto-fix
npm run biome:lint        # Lint only
npm run biome:lint:fix    # Lint auto-fix
npm run biome:format      # Format check
npm run biome:format:fix  # Format auto-fix
npm run biome:ci          # CI reporter
npm run type-check        # next typegen && tsc --noEmit
```

### Testing

```bash
npm run test                  # Run all Vitest tests
npm run test:unit             # Unit tests (project=unit)
npm run test:unit:coverage    # Unit tests with coverage
npm run test:storybook        # Storybook component tests
npm run test:storybook:coverage  # Storybook tests with coverage
npm run test:watch            # Watch mode
npm run test:ui               # Vitest UI
npm run test:coverage         # Coverage for all projects
npm run test:e2e              # Playwright E2E tests
npm run test:e2e:ui           # Playwright UI mode
```

### Storybook

```bash
npm run storybook:dev    # Start Storybook (port 6006)
npm run storybook:build  # Build static Storybook
npm run storybook:serve  # Serve built Storybook
```

### Sanity CMS

```bash
npm run sanity:dev       # Start Sanity Studio in dev mode
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:typegen   # Extract schema and generate TypeScript types
```

---

## 🧪 Testing

Vitest is configured with two project modes:

- **`unit`** — Node environment for unit tests (`*.test.ts`) under `tests/unit/`, feature modules, and `lib/`
- **`storybook`** — Browser environment (Playwright) for Storybook component tests with accessibility checks via `@storybook/addon-a11y`

E2E tests live under `tests/e2e/` and run against a production build:

```bash
npm run build && npm run test:e2e
```

Use the `test-only` story tag for stories that should be excluded from docs but still run in tests.

---

## 🎨 Styling

- **Tailwind CSS 4.3** with the `@theme` CSS-first configuration directive
- **PostCSS** integration via `@tailwindcss/postcss`
- **Design System**: [@szum-tech/design-system](https://www.npmjs.com/package/@szum-tech/design-system) (shadcn/ui based)
- **Dark mode** via `next-themes` with system preference detection
- **styled-components** for select dynamic styling needs

Import components directly:

```typescript
import { Button } from "@szum-tech/design-system";
```

---

## 💻 Environment Variables

All environment variables are validated at build time using **T3 Env**:

- Server variables: `data/env/server.ts`
- Client variables: `data/env/client.ts` (must be prefixed with `NEXT_PUBLIC_`)
- Bypass validation locally with `SKIP_ENV_VALIDATION=true`

Create a `.env.local` file with:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Resend Email
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=you@example.com

# Optional
LOG_LEVEL=info
```

---

## 📁 Project Structure

```
portfolio/
├── .claude/              # Claude Code agent & skill configuration
├── .github/
│   ├── workflows/        # GitHub Actions (CodeQL)
│   └── dependabot.yml
├── .storybook/           # Storybook configuration
├── app/                  # Next.js App Router
│   ├── (app)/            # Main public routes
│   ├── api/              # Route handlers (health, draft-mode, revalidate)
│   ├── studio/           # Embedded Sanity Studio
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── manifest.ts       # PWA manifest
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/           # Header, footer, navigation
│   ├── providers/        # React context providers (theme)
│   ├── sections/         # Page sections (hero, about, experience…)
│   ├── seo/              # JSON-LD structured data
│   └── ui/               # Reusable UI components
├── constants/            # Static constants and navigation maps
├── data/
│   └── env/              # T3 Env (server.ts, client.ts)
├── features/
│   └── contact/          # Contact feature module
│       ├── components/   # Form + email template
│       ├── schemas/      # Zod validation
│       └── server/       # Server actions
├── lib/
│   ├── sanity/           # Sanity client, queries, schema types
│   ├── seo/              # SEO utilities, structured data builders
│   ├── logger.ts         # Pino logger
│   └── server-action.ts  # Server action helpers
├── tests/
│   ├── e2e/              # Playwright E2E tests
│   ├── integration/      # Storybook test setup
│   └── unit/             # Vitest unit setup
├── types/                # TypeScript declarations & resets
├── public/               # Static assets
├── proxy.ts              # Edge request logging with request IDs
├── biome.json            # Biome lint/format config
├── next.config.ts        # Next.js config (React Compiler, Pino externals)
└── vitest.config.ts      # Vitest projects (unit + storybook)
```

### Key Directories

- **`app/`** — Routes, layouts, route handlers, and Sanity Studio mount point
- **`features/`** — Domain-scoped modules with `components/`, `schemas/`, `server/`
- **`lib/sanity/`** — Schemas, queries and the Sanity client (`live.ts` for live queries)
- **`lib/seo/`** — Structured data builders and site URL helpers
- **`data/env/`** — Type-safe environment variable validation (T3 Env)

### Important Configuration Files

- **`next.config.ts`** — Enables React Compiler, externalizes Pino, bundle analyzer
- **`proxy.ts`** — Request logging middleware with request ID propagation
- **`biome.json`** — Lint + format ruleset (replaces ESLint + Prettier)
- **`release.config.js`** — Semantic-release configuration
- **`vitest.config.ts`** — Dual-project setup (unit + storybook browser tests)

---

## 🤖 AI Development Tools

This project includes comprehensive Claude Code configuration in `.claude/`:

- Specialized agents for different development tasks
- Skills for project-specific technical guidance (Next.js, Tailwind, design system, testing)
- MCP server integrations for enhanced tooling

See `.claude/README.md` for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [Sanity](https://www.sanity.io/) — Headless CMS with the embedded Studio experience
- [Resend](https://resend.com/) — Modern email API for transactional mail
- [Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system) — Shared UI library
- [Vercel](https://vercel.com/) — Hosting and deployment platform

---

## 📧 Contact & Support

- 🌐 Website: [janszewczyk.com](https://janszewczyk.com)
- 🐛 [Open an issue](https://github.com/JanSzewczyk/portfolio/issues)
- ⭐ [Star this repository](https://github.com/JanSzewczyk/portfolio)
- 👨‍💻 [GitHub Profile](https://github.com/JanSzewczyk)

---

<div align="center">

**Made with ❤️ by [Jan Szewczyk](https://github.com/JanSzewczyk)**

If you found this helpful, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-portfolio)

</div>
