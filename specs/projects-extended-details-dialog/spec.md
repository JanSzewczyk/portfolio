# Feature: Improve Projects Presentation Using Extended Details Dialog

**Branch:** feat/projects-extended-details-dialog
**Status:** draft
**Type:** feat  <!-- feat | fix | chore | refactor | docs -->
**Owner:** JanSzewczyk
**Created:** 2026-06-14

---

## Summary (business)

<!-- What problem are we solving and for whom. DO NOT write HOW. -->

Visitors browsing the portfolio's projects can only see a limited summary of each project, so they cannot explore the full story, context, and outcomes of a project without leaving the listing — this feature lets a visitor open an extended details view for a project to richly present its information in place.

## User stories

- As a **portfolio visitor**, I want to open an extended details view for a project directly from
  the projects listing, so that I can explore its full story, images, and context without leaving
  the page.
- As a **portfolio visitor**, I want project descriptions to be richly formatted (headings, lists,
  emphasis, links), so that the content is easy to read and scan.
- As a **portfolio visitor**, I want to browse several images of a project, so that I get a fuller
  visual impression of the work.
- As a **portfolio visitor**, I want a concise list of a project's standout points (highlights), so
  that I can grasp what makes it notable at a glance.
- As the **portfolio owner (content author)**, I want to attach more than one image to a project,
  write its description with formatting, and list its highlights, so that each project is presented
  richly in the CMS.

## Functional requirements

<!-- All resolved against the Claude Design "Project Details" ("Cinematic Hero" variant) and the
     owner's clarifications. -->

- [x] FR1 (confirmed): The project `description` field stores **Markdown** and is **rendered as
  formatted content** wherever it is displayed (project card and the details dialog).
- [x] FR2 (confirmed): A project supports an **ordered collection of images** (each with its own
  alternative text), **minimum one** image, instead of a single thumbnail.
- [x] FR3 (confirmed): The project card displays the **first image** from the project's image
  collection as its thumbnail.
- [x] FR4 (confirmed): The unused **`longDescription`** field is **removed** from the project model.
- [x] FR5 (confirmed): A project has a new **`highlights`** field — an ordered **list of short
  texts**, each authored and **rendered as inline Markdown** (so a phrase can be emphasised).
- [x] FR6 (confirmed): The project card **no longer shows the Live/Code/NPM buttons**. Instead it
  shows a **"View details"** affordance, and **activating the card opens the details dialog**; the
  project's links live inside the dialog.
- [ ] FR7: A visitor can **open** the details dialog from a project card and **close** it (close
  button, Escape, or clicking the backdrop), returning to the listing. The dialog is **purely
  client-side** — it does **not** change the URL.
- [ ] FR8: The dialog presents a **hero image carousel** over the project's images with
  **previous/next** controls, a **position indicator** (current/total counter and dots), and
  **left/right arrow-key** navigation. With a single image, the carousel controls are hidden.
- [ ] FR9: The dialog body presents, per the design: the project **title** (over the hero), a
  **lead** (the Markdown `description`), a **Highlights** section (each highlight with a check mark
  and its inline-Markdown text), a **Tech stack** section (all technologies as labelled badges with
  icons), and a **Links** section (Live / Source / NPM, each shown only when present).
- [ ] FR10: The dialog uses the **same design responsively on mobile** (no separate bottom-sheet
  variant) — the same content reflows to small screens.

## Acceptance criteria

<!-- Concrete, measurable. Each AC maps to one test. -->

- [ ] AC1: Given a project whose `description` contains Markdown (heading, bulleted list, bold span,
  link) → both the card and the dialog render the corresponding formatted elements, not raw Markdown
  characters, and raw HTML in the content is **not** executed.
- [ ] AC2: Given a project with N images (N ≥ 1) → the project card thumbnail shows the **first**
  image in the collection.
- [ ] AC3: Given the project model after this change → it has **no** `longDescription` and **no**
  single `thumbnail` field; it has an `images` collection (≥1, each with alt) and a `highlights`
  list; existing documents are migrated with their former thumbnail as the first image and no loss
  of remaining fields.
- [ ] AC4: Given a project card → it shows a "View details" affordance and **no** Live/Code/NPM
  buttons; activating the card opens the details dialog for that project.
- [ ] AC5: Given the open dialog → close button, Escape, and backdrop click each close it; on close,
  focus returns to the card that opened it; the URL is unchanged throughout.
- [ ] AC6: Given a dialog for a project with ≥2 images → next/previous controls and arrow keys move
  the carousel, and the position indicator (counter + dots) reflects the current image; given a
  project with exactly 1 image → the carousel controls are hidden.
- [ ] AC7: Given the open dialog → it shows the title, the Markdown lead, each highlight with a check
  mark + inline-Markdown text, all technologies as badges, and a Links section containing only the
  links that are present (Live / Source / NPM).
- [ ] AC8: Given a small (mobile) viewport → the dialog renders the same sections, reflowed and
  scrollable, without horizontal overflow.

## Edge cases

<!-- What if: no network, race condition, invalid input, concurrent users, ... -->

- Project with exactly **one** image → card shows it; dialog hides carousel nav/indicator (no
  empty/broken gallery state).
- Project description is **empty** or contains only whitespace → no broken formatting; sensible
  empty state.
- Project has **no highlights** → the Highlights section is omitted, not rendered empty.
- Description/highlight Markdown contains **untrusted/raw HTML** → rendering must be safe (no script
  injection from CMS content).
- Project has a **very long** description or **many** images → content scrolls within the dialog
  rather than overflowing the viewport.
- A project missing optional data (no live/GitHub/NPM links) → the corresponding controls are simply
  absent, not rendered empty.

## Non-goals (out of scope)

<!-- What this feature does NOT do. Protects against scope creep. -->

- **No deep-linking / no standalone project page or route** — the details view is purely
  client-side and does not change the URL (decided: client-only).
- No separate mobile/bottom-sheet layout — the same dialog reflows responsively (decided).
- No project filtering, search, or sorting on the listing.
- No image upload/editing UX beyond what the CMS already provides for adding images.
- No changes to which projects are shown or to the "featured" logic.
- No extra project metadata beyond `images` + `highlights` (e.g. no date/role/outcomes fields) in
  this iteration.

## Open questions

<!-- The /sdd:clarify phase fills these in. The owner answers them BEFORE /plan. -->

- _All resolved._ Decisions captured above: design read (Claude Design "Project Details", Cinematic
  Hero variant); `highlights` = list of inline-Markdown texts; `images` = ordered collection, each
  with alt, minimum one; card drops link buttons and opens the dialog; details view is client-only;
  same dialog responsively on mobile; Sanity data migrated via a `sanity exec` script run by the
  owner.

## Testing guidelines

<!-- Test framework, test file locations, what to test at each layer -->

- **TDD strategy:**
  - **Logic** (server actions, route handlers, hooks, utilities) → classic strict TDD: write failing test first, then implementation.
  - **UI components** (React/Next.js) → contract-first TDD in 3 phases: contract + skeleton (props interface inline in `.tsx`), then tests + Storybook story, then full implementation. This is required because a test importing a non-existent component fails with "Module not found" instead of a meaningful red.
- Unit: Markdown rendering helper (formats expected elements; strips/escapes unsafe HTML);
  "first image" selection logic for the card thumbnail.
- Integration: project card renders formatted description + first image from the collection;
  details view opens with the correct project data.
- E2E (Playwright): from the projects listing, activate a project's details trigger → details view
  visible with that project's content → close via button and via Escape → focus returns to trigger.
- A11y: details view has an accessible name, focus trap, Escape-to-close, focus return to trigger,
  and background scroll lock; gallery controls are keyboard-operable.

## Dependencies & prerequisites

<!-- What must be ready beforehand (other features, env vars, infra). -->

- Sanity `project` schema change: `description` → Markdown; remove `longDescription`; replace the
  single `thumbnail` with an ordered `images` collection (each with alt, min 1); add `highlights`
  (list of texts). Regenerate Sanity types (`npm run sanity:typegen`).
- **Data migration** of existing project documents (former thumbnail → first image; drop
  `longDescription`) via a `sanity exec` script that **the owner runs** against the dataset.
- A safe Markdown rendering capability for `description` and `highlights` (technical choice deferred
  to the plan phase).

## Notes

<!-- Links to Figma, design docs, ADRs -->

- Source design: Claude Design project **"portfolio"**, file **`Project Details.html`**
  (`https://claude.ai/design/p/025fa7b8-ea06-440f-ad89-85d438dc6030?file=Project+Details.html`) —
  "Cinematic Hero" variant: card opens a modal whose hero is an image carousel (prev/next, dots,
  NN/TT counter, title overlay), with body sections Lead, Highlights (✓ list), Tech stack (icon
  badges), and a Links sidebar (Live / Source / NPM).
- Current implementation touchpoints: `components/sections/projects/project-card.tsx`,
  `components/sections/projects/projects-section.tsx`, and the Sanity schema
  `lib/sanity/configuration/schema-types/project.ts`.
