"use client";

// TODO: [DESIGN-SYSTEM] Add Accordion component from shadcn/ui
// Source: https://ui.shadcn.com/docs/components/accordion
// Temporary implementation - replace with @szum-tech/design-system/Accordion

import * as React from "react";

import { ChevronDownIcon } from "lucide-react";

import { cn } from "@szum-tech/design-system/utils";

interface AccordionContextValue {
  value: string | null;
  onValueChange: (value: string | null) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion provider");
  }
  return context;
}

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string;
  collapsible?: boolean;
  className?: string;
}

export function Accordion({ children, type = "single", defaultValue, className }: AccordionProps) {
  const [value, setValue] = React.useState<string | null>(defaultValue ?? null);

  const onValueChange = React.useCallback((newValue: string | null) => {
    setValue((prev) => (prev === newValue ? null : newValue));
  }, []);

  return (
    <AccordionContext.Provider value={{ value, onValueChange, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const AccordionItemContext = React.createContext<string | null>(null);

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn("border-b", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { value: selectedValue, onValueChange } = useAccordion();
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = selectedValue === itemValue;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(
        "flex w-full flex-1 items-center justify-between py-4 font-medium transition-all",
        "hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => onValueChange(itemValue)}
    >
      {children}
      <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200" />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { value: selectedValue } = useAccordion();
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = selectedValue === itemValue;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up hidden",
        className
      )}
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  );
}
