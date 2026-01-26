"use client";

import * as React from "react";

import { cn } from "@szum-tech/design-system/utils";

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  gridColor?: string;
  fade?: boolean;
}

export function GridBackground({
  className,
  gridSize = 40,
  gridColor = "var(--border)",
  fade = true
}: GridBackgroundProps) {
  return (
    <div
      data-testid="grid-background-container"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={
        {
          "--grid-size": `${gridSize}px`,
          "--grid-color": gridColor
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
      {fade ? <div className="from-background to-background absolute inset-0 bg-linear-to-b via-transparent" /> : null}
    </div>
  );
}
