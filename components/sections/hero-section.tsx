import { Avatar, AvatarFallback } from "@szum-tech/design-system/components/avatar";
import { Status, StatusIndicator, StatusLabel } from "@szum-tech/design-system/components/status";
import { TypingText } from "@szum-tech/design-system/components/typing-text";
import { WordRotate } from "@szum-tech/design-system/components/word-rotate";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { GridBackground } from "~/components/ui/grid-background";
import { Section } from "~/constants/sections";
import { urlFor } from "~/lib/sanity/image";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

import { ScrollButton } from "./scroll-button";

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
    <section className="relative min-h-[calc(100vh-4rem)] scroll-m-16 overflow-hidden" id={Section.HERO}>
      <GridBackground />

      <div className="container flex min-h-[calc(100vh-4rem)] items-center py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Avatar className="size-32">
            {/* Rendered via next/image so the browser fetches from /_next/image (same origin)
                instead of cdn.sanity.io directly, avoiding the third-party `sanitySession` cookie. */}
            {personalInfo?.avatar ? (
              <Image
                alt={personalInfo?.avatar?.alt ?? ""}
                className="aspect-square size-full object-cover"
                height={128}
                priority
                src={urlFor(personalInfo.avatar).width(128).height(128).url()}
                width={128}
              />
            ) : (
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="mt-2 mb-4">
            <Status
              data-sanity={createSanityAttribute("hero.isAvailable")}
              variant={hero?.isAvailable ? "success" : "error"}
            >
              <StatusIndicator />
              <StatusLabel>{hero?.isAvailable ? "Available for opportunities" : "Currently unavailable"}</StatusLabel>
            </Status>
          </div>

          <h1 className="mb-4 text-display-lg" data-sanity={createSanityAttribute("personalInfo.name")}>
            <TypingText speed={80} text={`Hi I'm ${stegaClean(personalInfo?.name)}`} />
          </h1>

          {hero?.alternativeTitles && hero.alternativeTitles.length > 0 ? (
            <div className="mb-6 text-heading-h1 text-primary">
              <WordRotate animationStyle={"slide-up"} duration={3000} words={hero.alternativeTitles} />
            </div>
          ) : null}

          <p className="mb-8 max-w-2xl text-body-lg text-muted-foreground">{hero?.tagline}</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <ScrollButton size="lg" targetSection={Section.CONTACT}>
              Get in Touch
            </ScrollButton>
            <ScrollButton endIcon={<ArrowDownIcon />} size="lg" targetSection={Section.PROJECTS} variant="outline">
              View Projects
            </ScrollButton>
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
