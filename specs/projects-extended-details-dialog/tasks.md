# Tasks: Improve Projects Presentation Using Extended Details Dialog

**Spec:** `specs/projects-extended-details-dialog/spec.md`
**Plan:** `specs/projects-extended-details-dialog/plan.md`

## Epic E1: Sanity data model & content

### Story S1: Project schema, query & generated types

```yaml
- id: T1.1
  title: Update `project` schema — markdown description, images[] collection, highlights, remove longDescription
  type: generic
  agent: orchestrator
  skills: []
  status: review
  acceptance: |
    spec.md AC3. In lib/sanity/configuration/schema-types/project.ts:
    `description` is type `markdown` (required); `longDescription` removed; `thumbnail`
    replaced by `images` (array of image objects, each with required-when-asset `alt` + hotspot,
    validation required().min(1)); new `highlights` (array of string, inline-markdown note);
    `preview.select.media` = `images.0`. Sanity Studio loads with no schema errors.
  files: [lib/sanity/configuration/schema-types/project.ts]

- id: T1.2
  title: Update portfolio GROQ projection for projects (images[] + highlights, drop thumbnail/longDescription)
  type: generic
  agent: orchestrator
  skills: []
  status: review
  acceptance: |
    In lib/sanity/queries/portfolio-page.ts the projects projection selects `images[]`
    ({asset->{_id,url,metadata{dimensions,lqip}}, hotspot, crop, alt}) and `highlights`,
    and no longer selects `thumbnail` or `longDescription`. Query parses.
  files: [lib/sanity/queries/portfolio-page.ts]

- id: T1.3
  title: Regenerate Sanity types
  type: generic
  agent: orchestrator
  skills: []
  status: review
  acceptance: |
    `npm run sanity:typegen` regenerates lib/sanity/types.ts; `Project` and
    `PortfolioPageQueryResult` reflect images[]/highlights and drop thumbnail/longDescription.
    `npm run type-check` passes (no hand edits to types.ts).
  files: [lib/sanity/types.ts]
```

### Story S2: Data migration (owner-run)

```yaml
- id: T2.1
  title: Write idempotent `sanity exec` migration (thumbnail → images[0], drop longDescription)
  type: generic
  agent: orchestrator
  skills: []
  status: review
  acceptance: |
    spec.md AC3. scripts/migrations/project-images.ts iterates all `project` docs: sets
    `images = [thumbnail]` preserving alt/hotspot/crop, unsets `thumbnail` and `longDescription`;
    skips already-migrated docs (idempotent). Documented run command:
    `npx sanity exec scripts/migrations/project-images.ts --with-user-token`. (Owner executes it.)
  files: [scripts/migrations/project-images.ts]
```

## Epic E2: Shared Markdown renderer

### Story S3: `Markdown` component (contract-first)

```yaml
- id: T3.1
  title: Markdown contract + skeleton
  type: ui-contract
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    Inline props interface in components/ui/markdown.tsx: `{ content: string; inline?: boolean }`.
    Skeleton exports `Markdown` returning <div data-testid="markdown" />. TypeScript compiles.
  files: [components/ui/markdown.tsx]

- id: T3.2
  title: Markdown tests + story
  type: ui-component-test
  agent: storybook-tester
  skills: [storybook-testing, design-system]
  status: draft
  acceptance: |
    spec.md AC1. Story + interaction tests import Markdown (no module-not-found) and assert:
    bold/list/link render as elements; raw HTML in content is NOT executed (no injected node);
    `inline` variant renders text in a <span>, not a block <p>. Tests fail meaningfully against
    the skeleton.
  files: [components/ui/markdown.stories.tsx]

- id: T3.3
  title: Markdown implementation
  type: ui-component
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    All T3.2 tests green. Renders via react-markdown + remark-gfm with DS-token element overrides
    (reuse the about/bio-markdown.tsx pattern); `inline` maps p→span. No raw HTML executed.
  files: [components/ui/markdown.tsx]

- id: T3.4
  title: Repoint BioMarkdown to shared Markdown
  type: refactor
  agent: orchestrator
  skills: []
  status: draft
  acceptance: |
    components/sections/about/bio-markdown.tsx delegates to components/ui/markdown.tsx; existing
    about story/tests stay green; no visual regression.
  files: [components/sections/about/bio-markdown.tsx]
```

## Epic E3: Project card rework

### Story S4: `ProjectCard` — first image, markdown, "View details", dialog trigger (contract-first)

```yaml
- id: T4.1
  title: ProjectCard contract update (new data shape, dialog-trigger surface)
  type: ui-contract
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    project-card.tsx props/skeleton account for `project.images` + `highlights` (no `thumbnail`/
    `longDescription`) and a card-level dialog trigger affordance. TypeScript compiles against the
    regenerated types.
  files: [components/sections/projects/project-card.tsx]

- id: T4.2
  title: ProjectCard tests + story update
  type: ui-component-test
  agent: storybook-tester
  skills: [storybook-testing, design-system]
  status: draft
  acceptance: |
    spec.md AC2, AC4. Story/tests assert: thumbnail = first image; description rendered as markdown;
    a "View details" affordance present; NO Live/Code/NPM buttons; activating the card opens the
    details dialog. Tests fail meaningfully before T4.3.
  files: [components/sections/projects/project-card.stories.tsx]

- id: T4.3
  title: ProjectCard implementation (first image, markdown, View details, ternary fix)
  type: ui-component
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    All T4.2 tests green. Card shows images[0] (with existing initial-letter fallback), markdown
    description (clamped), "View details" affordance, opens ProjectDetailsDialog as trigger; former
    `&&` link conditionals removed/converted to ternary per constitution §5.
  files: [components/sections/projects/project-card.tsx]
```

## Epic E4: Project details dialog

### Story S5: `ProjectDetailsDialog` (contract-first)

```yaml
- id: T5.1
  title: ProjectDetailsDialog contract + skeleton
  type: ui-contract
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    Inline props in components/sections/projects/project-details-dialog.tsx (project data +
    trigger children/open state). Skeleton exports the dialog returning a DS Dialog with
    <div data-testid="project-details-dialog" />. TypeScript compiles.
  files: [components/sections/projects/project-details-dialog.tsx]

- id: T5.2
  title: ProjectDetailsDialog tests + story
  type: ui-component-test
  agent: storybook-tester
  skills: [storybook-testing, design-system]
  status: draft
  acceptance: |
    spec.md AC5, AC6, AC7, AC8. Story variants (many images / single image / with+without links /
    with+without highlights / markdown). Interaction tests assert: opens from trigger; hero carousel
    next/prev + counter/dots update (≥2 images); carousel controls hidden for 1 image; title, lead
    markdown, highlights (✓ + inline markdown), all tech badges, and only-present links render;
    close button + Escape close and return focus. Tests fail meaningfully before T5.3.
  files: [components/sections/projects/project-details-dialog.stories.tsx]

- id: T5.3
  title: ProjectDetailsDialog implementation
  type: ui-component
  agent: orchestrator
  skills: [design-system]
  status: draft
  acceptance: |
    All T5.2 tests green; spec.md FR7–FR10. DS Dialog + Carousel hero (urlFor images, prev/next,
    counter+dots via carousel api, arrow keys, title overlay, scrim); body Lead (Markdown), Highlights
    (✓ + inline Markdown), Tech stack (Badge + ReactIcon), Links (Live/Source/NPM, ternary-guarded);
    client-only (no URL change); responsive on mobile.
  files: [components/sections/projects/project-details-dialog.tsx]

- id: T5.4
  title: Accessibility audit of the details dialog
  type: a11y-audit
  agent: orchestrator
  skills: [accessibility-audit]
  status: draft
  acceptance: |
    spec.md "A11y". Dialog has accessible name, focus trap, Escape-to-close, focus return to the
    card, background scroll lock; carousel controls keyboard-operable; images have alt text. No
    blocking WCAG violations.
  files: [components/sections/projects/project-details-dialog.tsx]
```

## Epic E5: Test data & end-to-end

### Story S6: Test builder update

```yaml
- id: T6.1
  title: Update projectBuilder for images[] + highlights
  type: generic
  agent: orchestrator
  skills: [builder-factory]
  status: review
  acceptance: |
    tests/builders/portfolio-page.builder.ts `projectBuilder` produces `images` (≥1, each with alt)
    and `highlights`, and no longer `thumbnail`/`longDescription`; existing stories/tests compile.
  files: [tests/builders/portfolio-page.builder.ts]
```

### Story S7: E2E

```yaml
- id: T7.1
  title: Update main-page E2E for dialog-hosted links
  type: e2e-test
  agent: orchestrator
  skills: [playwright-cli]
  status: draft
  acceptance: |
    tests/e2e/main-page.e2e.ts updated: card no longer exposes a GitHub "Code" link; open the
    details dialog first, then assert the external link. Suite green via `npm run test:e2e`.
  files: [tests/e2e/main-page.e2e.ts]

- id: T7.2
  title: New E2E for project details dialog
  type: e2e-test
  agent: orchestrator
  skills: [playwright-cli]
  status: draft
  acceptance: |
    spec.md AC4–AC7. tests/e2e/project-details.e2e.ts: open dialog from a card → hero + Lead +
    Highlights + Tech stack + Links visible → carousel advances → Escape closes → focus returns.
  files: [tests/e2e/project-details.e2e.ts]
```
