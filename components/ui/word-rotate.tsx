"use client";

// TODO: [DESIGN-SYSTEM] Add WordRotate component from ReUI
// Source: https://reui.io/docs
// Temporary implementation - replace with @szum-tech/design-system/WordRotate

import { useEffect, useState } from "react";

import { cn } from "@szum-tech/design-system/utils";

interface WordRotateProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function WordRotate({ words, className, duration = 3000 }: WordRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <span
        className={cn(
          "inline-block transition-all duration-300",
          isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
}
