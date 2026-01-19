"use client";

// TODO: [DESIGN-SYSTEM] Add Marquee component from ReUI/DiceUI
// Source: https://reui.io/docs, https://www.diceui.com/docs/introduction
// Temporary implementation - replace with @szum-tech/design-system/Marquee

import { type ReactNode } from "react";

import { cn } from "@szum-tech/design-system/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  gap?: string;
}

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  direction = "left",
  speed = "normal",
  gap = "1rem"
}: MarqueeProps) {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s"
  };

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-duration": speedMap[speed]
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--marquee-gap)]",
          "animate-marquee",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--marquee-gap)]",
          "animate-marquee",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
