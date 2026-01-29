import { type ReactNode } from "react";

import { cn } from "@szum-tech/design-system/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  "data-sanity"?: string;
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
      className={cn("mb-12 space-y-4", align === "center" && "text-center", align === "left" && "text-left", className)}
      data-sanity={dataSanity}
    >
      <h2 className="text-heading-h2">{title}</h2>
      {description ? <p className="text-body-lg text-muted-foreground mx-auto max-w-2xl">{description}</p> : null}
      {children}
    </div>
  );
}
