/**
 * Test Plan — Markdown component
 *
 * Tests assert against the rendered DOM via role/text queries and `canvasElement`
 * (no `data-testid` — user-facing queries are preferred).
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

BlockMarkdown.test("Renders bold text as a <strong> element, not raw asterisks", async ({ canvasElement }) => {
  const strongEl = canvasElement.querySelector("strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("world");
});

BlockMarkdown.test("Does not render raw Markdown asterisks as literal text", async ({ canvasElement }) => {
  // The full content is "Hello **world**". After rendering, the literal "**" chars must NOT appear.
  await expect(canvasElement).not.toHaveTextContent("**");
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

BoldContent.test("Bold syntax produces a <strong> element containing 'bold'", async ({ canvasElement }) => {
  const strongEl = canvasElement.querySelector("strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("bold");
});

BoldContent.test("Literal '**' asterisks are NOT present in the rendered output", async ({ canvasElement }) => {
  await expect(canvasElement).not.toHaveTextContent("**");
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

BulletedList.test("A <ul> list element is present in the DOM", async ({ canvasElement }) => {
  const ul = canvasElement.querySelector("ul");
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

RawHtmlScript.test("<script> tag in content is NOT inserted into the DOM as an element", async ({ canvasElement }) => {
  const scriptEl = canvasElement.querySelector("script");
  // Must be null — there is no rehype-raw, so raw HTML is rendered inert (escaped) text.
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

RawHtmlImg.test("<img> with onerror is NOT inserted into the DOM", async ({ canvasElement }) => {
  const imgEl = canvasElement.querySelector("img");
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

BlockParagraph.test("Default (block) variant wraps text in a <p> element", async ({ canvasElement }) => {
  const p = canvasElement.querySelector("p");
  await expect(p).not.toBeNull();
  await expect(p).toHaveTextContent("Hello paragraph");
});

BlockParagraph.test("Default variant does NOT render a <span> as the paragraph wrapper", async ({ canvasElement }) => {
  // The outermost text wrapper should be <p>, not <span>.
  // We assert that there is no <span> wrapping the paragraph text directly.
  const spanEl = canvasElement.querySelector("p > span");
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

InlineMarkdown.test("Inline variant renders text inside a <span>, not a block <p>", async ({ canvasElement }) => {
  // The inline variant must produce a <span> wrapper instead of a <p>.
  const spanEl = canvasElement.querySelector("span");
  await expect(spanEl).not.toBeNull();
});

InlineMarkdown.test("Inline variant does NOT render a block <p> element", async ({ canvasElement }) => {
  const pEl = canvasElement.querySelector("p");
  // Must be null — inline maps paragraph to <span>, not <p>.
  await expect(pEl).toBeNull();
});

InlineMarkdown.test("Inline bold produces a <strong> element inside the <span>", async ({ canvasElement }) => {
  const strongEl = canvasElement.querySelector("span strong");
  await expect(strongEl).not.toBeNull();
  await expect(strongEl).toHaveTextContent("hi");
});
