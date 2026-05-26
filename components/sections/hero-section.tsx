"use client";

import {
  Avatar,
  AvatarFallback,
  Button,
  Status,
  StatusIndicator,
  StatusLabel,
  TypingText,
  WordRotate
} from "@szum-tech/design-system";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { GridBackground } from "~/components/ui/grid-background";
import { Section } from "~/constants/sections";
import { urlFor } from "~/lib/sanity/image";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";
import { scrollToSection } from "~/lib/scroll-to-section";

type HeroSectionProps = {
  personalInfo: NonNullable<PortfolioPageQueryResult>["personalInfo"];
  hero: NonNullable<PortfolioPageQueryResult>["hero"];
  documentId: string;
  documentType: string;
};

export function HeroSection({ personalInfo, hero, documentId, documentType }: HeroSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({
    documentId,
    documentType
  });

  const initials = personalInfo?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id={Section.HERO} className="relative min-h-[calc(100vh-4rem)] scroll-m-16 overflow-hidden">
      <GridBackground />

      <div className="container flex min-h-[calc(100vh-4rem)] items-center py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Avatar className="size-32">
            {/* Rendered via next/image so the browser fetches from /_next/image (same origin)
                instead of cdn.sanity.io directly, avoiding the third-party `sanitySession` cookie. */}
            {personalInfo?.avatar ? (
              <Image
                src={urlFor(personalInfo.avatar).width(128).height(128).url()}
                alt={personalInfo?.avatar?.alt ?? ""}
                width={128}
                height={128}
                priority
                className="aspect-square size-full object-cover"
              />
            ) : (
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="mt-2 mb-4">
            <Status
              variant={hero?.isAvailable ? "success" : "error"}
              data-sanity={createSanityAttribute("hero.isAvailable")}
            >
              <StatusIndicator />
              <StatusLabel>{hero?.isAvailable ? "Available for opportunities" : "Currently unavailable"}</StatusLabel>
            </Status>
          </div>

          <h1 className="mb-4 text-display-lg" data-sanity={createSanityAttribute("personalInfo.name")}>
            <TypingText text={`Hi I'm ${stegaClean(personalInfo?.name)}`} speed={80} />
          </h1>

          {hero?.alternativeTitles && hero.alternativeTitles.length > 0 && (
            <div className="mb-6 text-heading-h1 text-primary">
              <WordRotate words={hero.alternativeTitles} duration={3000} animationStyle={"slide-up"} />
            </div>
          )}

          <p className="mb-8 max-w-2xl text-body-lg text-muted-foreground">{hero?.tagline}</p>

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
        <ArrowDownIcon className="size-6 text-muted-foreground" />
      </div>
    </section>
  );
}
