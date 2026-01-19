"use client";

import { useState } from "react";

import { MenuIcon, XIcon } from "lucide-react";

import { Button, Header } from "@szum-tech/design-system";
import Link from "next/link";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { NAV_ITEMS, PERSONAL_INFO } from "~/constants/portfolio";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Header>
        <div className="flex w-full justify-between">
          <Link href="/" className="hover:text-primary text-lg font-semibold tracking-tight transition-colors">
            {PERSONAL_INFO.name}
          </Link>

          <div>
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <Button key={item.href} variant="ghost" size="sm" onClick={() => scrollToSection(item.href)}>
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
      {isMobileMenuOpen && (
        <div className="bg-background fixed top-16 right-0 left-0 z-40 border-b md:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
