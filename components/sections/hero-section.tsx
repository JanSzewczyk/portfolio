"use client";

import { ArrowDownIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Status,
  StatusIndicator,
  StatusLabel,
  TypingText,
  WordRotate
} from "@szum-tech/design-system";
import { GridBackground } from "~/components/ui/grid-background";
import { type PersonalInfo } from "~/constants/portfolio";
import { Section } from "~/constants/sections";
import { scrollToSection } from "~/lib/scroll-to-section";

type HeroSectionProps = {
  personalInfo: PersonalInfo;
};

export function HeroSection({ personalInfo }: HeroSectionProps) {
  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id={Section.HERO} className="relative min-h-[calc(100vh-4rem)] scroll-m-16 overflow-hidden">
      <GridBackground />

      <div className="container flex min-h-[calc(100vh-4rem)] items-center py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Avatar className="size-32">
            <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} />
            <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="mt-2 mb-4">
            <Status variant={personalInfo.isAvailable ? "success" : "error"}>
              <StatusIndicator />
              <StatusLabel>
                {personalInfo.isAvailable ? "Available for opportunities" : "Currently unavailable"}
              </StatusLabel>
            </Status>
          </div>

          <h1 className="text-display-lg mb-4">
            <TypingText text={`Hi, I'm ${personalInfo.name}`} speed={80} />
          </h1>

          <div className="text-primary text-heading-h1 mb-6">
            <WordRotate words={personalInfo.alternativeTitles} duration={3000} animationStyle={"slide-up"} />
          </div>

          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl">{personalInfo.tagline}</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection(Section.CONTACT)}>
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection(Section.PROJECTS)}
              endIcon={<ArrowDownIcon />}
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="text-muted-foreground size-6" />
      </div>
    </section>
  );
}
