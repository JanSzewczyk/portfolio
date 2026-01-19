"use client";

// TODO: [DESIGN-SYSTEM] Add TypingText component from ReUI
// Source: https://reui.io/docs
// Temporary implementation - replace with @szum-tech/design-system/TypingText

import { useEffect, useState } from "react";

import { cn } from "@szum-tech/design-system/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  cursorClassName?: string;
  showCursor?: boolean;
}

export function TypingText({
  text,
  className,
  typingSpeed = 100,
  startDelay = 500,
  cursorClassName,
  showCursor = true
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, text, typingSpeed]);

  return (
    <span className={cn("inline-flex", className)}>
      {displayedText}
      {showCursor && (
        <span className={cn("ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-current", cursorClassName)} />
      )}
    </span>
  );
}
