"use client";

import { Button, Header } from "@szum-tech/design-system";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { NAV_ITEMS } from "~/constants/navigation";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { scrollToSection } from "~/lib/scroll-to-section";

type NavigationProps = {
  personalInfo: NonNullable<PortfolioPageQueryResult>["personalInfo"];
};

export function Navigation({ personalInfo }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header>
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="text-heading-h3 transition-colors hover:text-primary">
            {personalInfo?.name}
          </Link>

          <div>
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    scrollToSection(item.section, {
                      onAfterScroll: () => setIsMobileMenuOpen(false)
                    })
                  }
                >
                  {item.label}
                </Button>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
              </Button>
            </div>
          </div>
        </div>
      </Header>

      {/* Mobile Menu */}
      {isMobileMenuOpen ? (
        <div className="fixed top-16 right-0 left-0 z-40 border-b bg-background md:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                className="justify-start"
                onClick={() =>
                  scrollToSection(item.section, {
                    onAfterScroll: () => setIsMobileMenuOpen(false)
                  })
                }
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
