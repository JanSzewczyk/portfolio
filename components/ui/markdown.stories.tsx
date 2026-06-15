/**
 * Test Plan — Markdown component (T3.2 Contract-First Tests)
 *
 * These tests are written against the SKELETON and MUST FAIL until T3.3 ships
 * react-markdown rendering. Each failure must be a meaningful assertion error
 * (element not found / text mismatch), NOT a module-not-found error.
 *
 * Story: BlockMarkdown (default, no inline prop)
 *   1. Bold: content "**bold**" renders a <strong> containing "bold" — NOT the literal "**bold**" text.
 *   2. Bulleted list: "- one\n- two" renders <li> items with accessible names "one" and "two".
 *   3. Link: "[site](https://example.com)" renders an anchor (role="link", name="site")
 *            with href https://example.com.
 *   4. Raw HTML not executed: "<script>window.__x=1</script>" and "<img src=x onerror=...>"
 *            do NOT create those elements in the DOM (HTML is inert / escaped).
 *   5. Block paragraph: default variant wraps text in a <p>, not a <span>.
 *
 * Story: InlineMarkdown (inline=true)
 *   6. Inline variant: "**hi**" renders text content within a <span>, NOT a block <p>.
 */

import { expect } from "storybook/test";

import preview from "~/.storybook/preview";

import { Markdown } from "./markdown";

const meta = preview.meta({
  component: Markdown,
  parameters: {
    layout: "centered"
  },
  title: "Components/UI/Markdown"
});

// ---------------------------------------------------------------------------
// Story 1 — Block (default) variant
// ---------------------------------------------------------------------------

/**
 * Default block rendering: tests bold, list, link, and raw-HTML safety.
 */
export const BlockMarkdown = meta.story({
  args: {
    content: "Hello **world**"
  },
  name: "Block Markdown"
});

BlockMarkdown.test("Renders bold text as a <strong> element, not raw asterisks", async ({ canvas }) => {
  // The skeleton renders raw text, so "**world**" appears as-is — this MUST FAIL until T3.3.
  const container = canvas.getByTestId("markdown");
  const strongEl = container.querySelector("strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("world");
});

BlockMarkdown.test("Does not render raw Markdown asterisks as literal text", async ({ canvas }) => {
  // The full content is "Hello **world**". After rendering, the literal "**" chars must NOT appear.
  const container = canvas.getByTestId("markdown");
  await expect(container).not.toHaveTextContent("**");
});

// ---------------------------------------------------------------------------
// Bold — dedicated content
// ---------------------------------------------------------------------------

export const BoldContent = meta.story({
  args: {
    content: "**bold**"
  },
  name: "Bold Content"
});

BoldContent.test("Bold syntax produces a <strong> element containing 'bold'", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const strongEl = container.querySelector("strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("bold");
});

BoldContent.test("Literal '**' asterisks are NOT present in the rendered output", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  await expect(container).not.toHaveTextContent("**");
});

// ---------------------------------------------------------------------------
// Bulleted list
// ---------------------------------------------------------------------------

export const BulletedList = meta.story({
  args: {
    content: "- one\n- two"
  },
  name: "Bulleted List"
});

BulletedList.test("List items are rendered as <li> elements with text 'one' and 'two'", async ({ canvas }) => {
  const items = canvas.getAllByRole("listitem");
  await expect(items.length).toBeGreaterThanOrEqual(2);
  await expect(items[0]).toHaveTextContent("one");
  await expect(items[1]).toHaveTextContent("two");
});

BulletedList.test("A <ul> list element is present in the DOM", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const ul = container.querySelector("ul");
  await expect(ul).not.toBeNull();
});

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

export const LinkContent = meta.story({
  args: {
    content: "[site](https://example.com)"
  },
  name: "Link Content"
});

LinkContent.test("Link syntax renders an anchor with accessible name 'site'", async ({ canvas }) => {
  const link = canvas.getByRole("link", { name: "site" });
  await expect(link).toBeVisible();
});

LinkContent.test("Anchor href matches the URL in the Markdown source", async ({ canvas }) => {
  const link = canvas.getByRole("link", { name: "site" });
  await expect(link).toHaveAttribute("href", "https://example.com");
});

// ---------------------------------------------------------------------------
// Raw HTML safety (AC1 — HTML must NOT be executed)
// ---------------------------------------------------------------------------

export const RawHtmlScript = meta.story({
  args: {
    content: "<script>window.__xss=1</script>"
  },
  name: "Raw HTML — Script Tag"
});

RawHtmlScript.test("<script> tag in content is NOT inserted into the DOM as an element", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const scriptEl = container.querySelector("script");
  // Must be null — the skeleton renders raw text so the skeleton actually PASSES this one,
  // but the full implementation must also keep it null (no rehype-raw).
  await expect(scriptEl).toBeNull();
});

RawHtmlScript.test("window.__xss is not set by the content", async () => {
  await expect((window as unknown as Record<string, unknown>).__xss).toBeUndefined();
});

export const RawHtmlImg = meta.story({
  args: {
    content: '<img src="x" onerror="window.__onerror=1" />'
  },
  name: "Raw HTML — Img onerror"
});

RawHtmlImg.test("<img> with onerror is NOT inserted into the DOM", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const imgEl = container.querySelector("img");
  // react-markdown without rehype-raw must not render the img element at all.
  await expect(imgEl).toBeNull();
});

RawHtmlImg.test("window.__onerror is not set by the onerror attribute", async () => {
  await expect((window as unknown as Record<string, unknown>).__onerror).toBeUndefined();
});

// ---------------------------------------------------------------------------
// Block paragraph (default variant renders <p>)
// ---------------------------------------------------------------------------

export const BlockParagraph = meta.story({
  args: {
    content: "Hello paragraph"
  },
  name: "Block Paragraph"
});

BlockParagraph.test("Default (block) variant wraps text in a <p> element", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const p = container.querySelector("p");
  await expect(p).not.toBeNull();
  await expect(p).toHaveTextContent("Hello paragraph");
});

BlockParagraph.test("Default variant does NOT render a <span> as the paragraph wrapper", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  // The outermost text wrapper should be <p>, not <span>.
  // We assert that there is no <span> wrapping the paragraph text directly.
  const spanEl = container.querySelector("p > span");
  await expect(spanEl).toBeNull();
});

// ---------------------------------------------------------------------------
// Story 2 — Inline variant (inline=true)
// ---------------------------------------------------------------------------

/**
 * Inline rendering: bold text must be in a <span>, never in a block <p>.
 */
export const InlineMarkdown = meta.story({
  args: {
    content: "**hi**",
    inline: true
  },
  name: "Inline Markdown"
});

InlineMarkdown.test("Inline variant renders text inside a <span>, not a block <p>", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  // The inline variant must produce a <span> wrapper instead of a <p>.
  const spanEl = container.querySelector("span");
  await expect(spanEl).not.toBeNull();
});

InlineMarkdown.test("Inline variant does NOT render a block <p> element", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const pEl = container.querySelector("p");
  // Must be null — inline maps paragraph to <span>, not <p>.
  await expect(pEl).toBeNull();
});

InlineMarkdown.test("Inline bold produces a <strong> element inside the <span>", async ({ canvas }) => {
  const container = canvas.getByTestId("markdown");
  const strongEl = container.querySelector("span strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("hi");
});
