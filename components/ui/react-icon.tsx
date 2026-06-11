"use client";

import type { IconType } from "react-icons";

// Curated, tree-shakeable icon map. Avoids the `import * as X from "react-icons/*"` barrel that
// pulled the whole icon sets (~4.7 MB) into the client bundle. Add new icons in icon-registry.ts.
import { ICONS, type IconName } from "./icon-registry";

export type { IconName };

export type DynamicIconProps = {
  name: IconName;
  className?: string;
  size?: number;
  /**
   * Accessible label exposed to assistive technology. When provided, the icon renders a
   * `<title>` and is announced with this name. When omitted, the icon is treated as
   * decorative and hidden from the accessibility tree (`aria-hidden`).
   *
   * Many react-icons sets (e.g. Simple Icons) hard-code `role="img"` in their data, which
   * makes axe flag them via `svg-img-alt` unless they carry an accessible name. Defaulting
   * to `aria-hidden` keeps purely visual icons out of the a11y tree.
   */
  title?: string;
};

export function ReactIcon({ name, className, size, title }: DynamicIconProps) {
  const Icon = ICONS[name] as IconType | undefined;
  if (!Icon) {
    // biome-ignore lint/suspicious/noConsole: for dev exp
    console.warn(`Icon "${name}" not found in react-icons`);
    return null;
  }
  return (
    <Icon
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      focusable={false}
      size={size}
      title={title}
    />
  );
}
