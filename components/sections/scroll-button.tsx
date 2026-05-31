"use client";

import { Button } from "@szum-tech/design-system/components/button";
import type * as React from "react";
import type { Section } from "~/constants/sections";
import { scrollToSection } from "~/lib/scroll-to-section";

type ScrollButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  targetSection: Section;
};

export function ScrollButton({ targetSection, ...props }: ScrollButtonProps) {
  return <Button onClick={() => scrollToSection(targetSection)} {...props} />;
}
