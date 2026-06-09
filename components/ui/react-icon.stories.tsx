import { expect } from "storybook/test";
import preview from "~/.storybook/preview";

import { type IconName, ReactIcon } from "./react-icon";

const meta = preview.meta({
  component: ReactIcon,
  parameters: {
    layout: "centered"
  },
  title: "Components/UI/React Icon"
});

/**
 * A known icon name — verifies the SVG is rendered in the DOM.
 */
export const KnownIcon = meta.story({
  args: {
    className: "text-primary",
    name: "SiReact" as IconName,
    size: 32
  }
});

KnownIcon.test("Renders an SVG element for a known icon name", async ({ canvasElement }) => {
  const svgEl = canvasElement.querySelector("svg");
  await expect(svgEl).not.toBeNull();
});

KnownIcon.test("Forwards className to the SVG element", async ({ canvasElement }) => {
  const svgEl = canvasElement.querySelector("svg");
  await expect(svgEl?.classList.contains("text-primary")).toBe(true);
});

/**
 * An unknown icon name — verifies the component renders nothing (returns null).
 */
export const UnknownIcon = meta.story({
  args: {
    name: "SiThisIconDoesNotExist" as IconName
  }
});

UnknownIcon.test("Renders nothing when the icon name is not in the registry", async ({ canvasElement }) => {
  const svgEl = canvasElement.querySelector("svg");
  await expect(svgEl).toBeNull();
});
