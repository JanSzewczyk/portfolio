// TODO: [DESIGN-SYSTEM] Add Timeline component from DiceUI
// Source: https://www.diceui.com/docs/introduction
// Temporary implementation - replace with @szum-tech/design-system/Timeline

import { type ReactNode } from "react";

import { cn } from "@szum-tech/design-system/utils";

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

interface TimelineIndicatorProps {
  className?: string;
  active?: boolean;
}

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
}

interface TimelineSeparatorProps {
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("relative space-y-8", className)}>{children}</div>;
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return <div className={cn("relative flex gap-6", className)}>{children}</div>;
}

export function TimelineIndicator({ className, active = false }: TimelineIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "flex size-3 shrink-0 items-center justify-center rounded-full border-2",
          active ? "border-primary bg-primary" : "border-muted-foreground/30 bg-background",
          className
        )}
      />
      <TimelineSeparator />
    </div>
  );
}

export function TimelineSeparator({ className }: TimelineSeparatorProps) {
  return <div className={cn("bg-border h-full w-px flex-1", className)} />;
}

export function TimelineContent({ children, className }: TimelineContentProps) {
  return <div className={cn("flex-1 pb-8", className)}>{children}</div>;
}
