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
import { PERSONAL_INFO } from "~/constants/portfolio";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const initials = PERSONAL_INFO.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] scroll-m-16 overflow-hidden">
      <GridBackground />

      <div className="container flex min-h-[calc(100vh-4rem)] items-center py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Avatar className="border-background mb-8 size-32 border-4 shadow-xl">
            <AvatarImage src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} />
            <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="mb-4">
            <Status variant={PERSONAL_INFO.isAvailable ? "success" : "error"}>
              <StatusIndicator />
              <StatusLabel>
                {PERSONAL_INFO.isAvailable ? "Available for opportunities" : "Currently unavailable"}
              </StatusLabel>
            </Status>
          </div>

          <h1 className="text-display-md md:text-display-lg mb-4 font-bold tracking-tight">
            <TypingText text={`Hi, I'm ${PERSONAL_INFO.name}`} speed={80} />
          </h1>

          <div className="text-primary mb-6 h-12 text-2xl font-medium md:text-3xl">
            <WordRotate words={PERSONAL_INFO.alternativeTitles} duration={3000} />
          </div>

          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl">{PERSONAL_INFO.tagline}</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={scrollToContact}>
              Get in Touch
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToProjects}>
              View Projects
              <ArrowDownIcon className="ml-2 size-4" />
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
