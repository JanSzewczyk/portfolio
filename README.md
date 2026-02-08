<div align="center">

# 🚀 Portfolio

[![GitHub stars](https://img.shields.io/github/stars/JanSzewczyk/portfolio?style=social)](https://github.com/JanSzewczyk/portfolio/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=portfolio)

**Personal portfolio website for Jan Szewczyk - Frontend Engineer & Open Source Creator**

[Live Demo](https://janszewczyk.com) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## 👋 About

This is the personal portfolio website of **Jan Szewczyk**, a Frontend Engineer from Cracow, Poland, specializing in React, Next.js, TypeScript, and React Native. The site showcases professional experience, projects, skills, and provides a contact form for inquiries.

### Portfolio Sections

- **Hero** - Introduction and call-to-action
- **About** - Professional background and personal story
- **Experience** - Work history and professional achievements
- **Education** - Academic background
- **Projects** - Featured open source and professional projects
- **Skills** - Technical expertise and technologies
- **Contact** - Contact form powered by Resend email service

---

## ✨ Features

### 🎨 Modern Design
- Responsive design optimized for all devices
- Dark/Light theme with system preference detection
- Smooth animations and micro-interactions
- [Szum-Tech Design System](https://www.npmjs.com/package/@szum-tech/design-system) components

### 📝 Content Management
- **Sanity CMS** integration for dynamic content
- Embedded Sanity Studio at `/studio`
- Draft mode for content preview
- Type-safe content queries

### 📧 Contact Form
- Server-side form processing with Server Actions
- Email delivery via **Resend**
- Form validation with **Zod** schemas
- React Hook Form integration

### 🔍 SEO Optimized
- Structured data (JSON-LD)
- Open Graph and Twitter meta tags
- Dynamic sitemap and robots.txt
- Perfect Lighthouse scores

### 🧪 Comprehensive Testing
- Unit tests with **Vitest** and React Testing Library
- Component tests with **Storybook** interaction testing
- E2E tests with **Playwright**

---

## 🛠 Tech Stack

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | [Next.js](https://nextjs.org/) | 16.1 |
| UI Library | [React](https://react.dev/) | 19.2 |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 4.1 |
| CMS | [Sanity](https://www.sanity.io/) | 5.6 |
| Email | [Resend](https://resend.com/) | 6.9 |

### Developer Tools

| Category | Technology | Version |
|----------|------------|---------|
| Design System | [@szum-tech/design-system](https://www.npmjs.com/package/@szum-tech/design-system) | 3.11 |
| Testing | [Vitest](https://vitest.dev/) | 4.0 |
| E2E Testing | [Playwright](https://playwright.dev/) | 1.58 |
| Component Dev | [Storybook](https://storybook.js.org/) | 10.2 |
| Forms | [React Hook Form](https://react-hook-form.com/) | 7.71 |
| Validation | [Zod](https://zod.dev/) | 4.3 |
| Logging | [Pino](https://getpino.io/) | 10.3 |
| Env Validation | [T3 Env](https://env.t3.gg/) | 0.13 |

---

## 🎯 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/JanSzewczyk/portfolio.git
cd portfolio

# Install dependencies
npm ci

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Resend Email
RESEND_API_KEY=your_resend_api_key

# Optional
LOG_LEVEL=info
```

---

## 📃 Scripts Overview

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run prettier:check   # Check formatting
npm run prettier:write   # Fix formatting
npm run type-check   # TypeScript type checking
```

### Testing

```bash
npm run test         # Run all tests
npm run test:unit    # Unit tests with coverage
npm run test:storybook   # Storybook component tests
npm run test:e2e     # Playwright E2E tests
npm run test:e2e:ui  # E2E tests with UI
```

### Storybook

```bash
npm run storybook:dev    # Start Storybook (port 6006)
npm run storybook:build  # Build static Storybook
```

### Sanity CMS

```bash
npm run sanity:dev       # Start Sanity Studio
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:typegen   # Generate TypeScript types
```

### Analysis

```bash
npm run analyze      # Bundle size analysis
```

---

## 📁 Project Structure

```
portfolio/
├── .claude/              # Claude AI agent configuration
│   ├── agents/           # Specialized AI agents
│   └── skills/           # Reusable AI skills
├── .github/
│   └── workflows/        # GitHub Actions (CI/CD)
├── .storybook/           # Storybook configuration
├── app/                  # Next.js App Router
│   ├── (app)/            # Main app routes
│   ├── api/              # API routes (health, draft-mode)
│   └── studio/           # Sanity Studio
├── components/
│   ├── layout/           # Layout components (header, footer)
│   ├── providers/        # React context providers
│   ├── sections/         # Page sections (hero, about, etc.)
│   ├── seo/              # SEO components
│   └── ui/               # Reusable UI components
├── constants/            # Static constants and navigation
├── data/
│   └── env/              # T3 Env configuration
├── features/
│   └── contact/          # Contact feature module
│       ├── components/   # Contact form components
│       ├── schemas/      # Zod validation schemas
│       └── server/       # Server actions
├── lib/
│   ├── sanity/           # Sanity client and queries
│   └── logger.ts         # Pino logger configuration
├── tests/
│   ├── e2e/              # Playwright E2E tests
│   └── unit/             # Vitest unit tests
└── types/                # TypeScript type definitions
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=portfolio)

1. Click "Deploy with Vercel"
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

---

## 🤖 AI Development Tools

This project includes comprehensive AI agent configuration in `.claude/`:

- **8 specialized agents** for different development tasks
- **15 skills** (10 active + 5 optional) for technical guidance
- **4 MCP servers** for enhanced tooling

See [.claude/README.md](.claude/README.md) for details.

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
