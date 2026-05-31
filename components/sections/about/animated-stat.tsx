"use client";

import { CountingNumber } from "@szum-tech/design-system/components/counting-number";

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  label?: string;
  dataSanity?: string;
};

export function AnimatedStat({ value, suffix, label, dataSanity }: AnimatedStatProps) {
  return (
    <div data-sanity={dataSanity}>
      <div className="font-code text-display-sm text-foreground tabular-nums">
        <CountingNumber to={value} duration={2} format={(value) => `${Math.round(value)}${suffix ?? ""}`} once />
      </div>
      <p className="mt-1.5 text-mute">{label}</p>
    </div>
  );
}
