// TODO: [DESIGN-SYSTEM] Add Status component from DiceUI
// Source: https://www.diceui.com/docs/introduction
// Temporary implementation - replace with @szum-tech/design-system/Status

import { cn } from "@szum-tech/design-system/utils";

interface StatusProps {
  status: "available" | "busy" | "away";
  label?: string;
  className?: string;
  showPing?: boolean;
}

const statusConfig = {
  available: {
    color: "bg-green-500",
    label: "Available"
  },
  busy: {
    color: "bg-red-500",
    label: "Busy"
  },
  away: {
    color: "bg-yellow-500",
    label: "Away"
  }
};

export function Status({ status, label, className, showPing = true }: StatusProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex size-2.5">
        {showPing && status === "available" && (
          <span
            className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", config.color)}
          />
        )}
        <span className={cn("relative inline-flex size-2.5 rounded-full", config.color)} />
      </span>
      <span className="text-muted-foreground text-sm">{displayLabel}</span>
    </div>
  );
}
