import { cn } from "@szum-tech/design-system/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  "data-sanity"?: string;
  description?: string;
  title: string;
}

/**
 * Section heading with overline label + display heading pattern.
 *
 * - `title`       → small uppercase overline label (primary color)
 * - `description` → main section h2 (display-sm, bold)
 */
export function SectionHeading({
  title,
  description,
  children,
  className,
  align = "center",
  "data-sanity": dataSanity
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 space-y-3.5",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
      data-sanity={dataSanity}
    >
      <span className="block text-body-xs text-primary uppercase">{title}</span>
      {description ? <h2 className="text-display-sm">{description}</h2> : null}
      {children}
    </div>
  );
}
