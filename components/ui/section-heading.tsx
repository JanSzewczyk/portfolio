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
      <span className="block text-heading-h4 text-primary uppercase">{title}</span>
      {description ? <h2 className="text-display-sm">{description}</h2> : null}
      {children}
    </div>
  );
}
