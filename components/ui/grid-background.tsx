"use client";

import { cn } from "@szum-tech/design-system/utils";
import type * as React from "react";

interface GridBackgroundProps {
  className?: string;
  fade?: boolean;
  gridColor?: string;
  gridSize?: number;
}

export function GridBackground({
  className,
  gridSize = 40,
  gridColor = "var(--border)",
  fade = true
}: GridBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      data-testid="grid-background-container"
      style={
        {
          "--grid-color": gridColor,
          "--grid-size": `${gridSize}px`
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "var(--grid-size) var(--grid-size)"
        }}
      />
      {fade ? <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" /> : null}
    </div>
  );
}
