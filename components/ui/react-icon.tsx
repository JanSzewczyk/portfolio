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
};

export function ReactIcon({ name, className, size }: DynamicIconProps) {
  const Icon = ICONS[name] as IconType | undefined;
  if (!Icon) {
    // biome-ignore lint/suspicious/noConsole: for dev exp
    console.warn(`Icon "${name}" not found in react-icons`);
    return null;
  }
  return <Icon className={className} size={size} />;
}
