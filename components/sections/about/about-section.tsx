"use client";

import { CountingNumber } from "@szum-tech/design-system/components/counting-number";
import { MapPin, Terminal } from "lucide-react";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";
import { BioMarkdown } from "./bio-markdown";
import { CVDropdown } from "./cv-dropdown";
import { HobbyItem } from "./hobby-item";

type AboutSectionProps = {
  about: NonNullable<PortfolioPageQueryResult>["about"];
  documentId: string;
  documentType: string;
};

export function AboutSection({ about, documentId, documentType }: AboutSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({
    documentId,
    documentType
  });

  return (
    <section id={Section.ABOUT} className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeading
          title={about?.heading?.title ?? ""}
          description={about?.heading?.description ?? ""}
          align="left"
          data-sanity={createSanityAttribute("about.heading")}
        />

        {/* ── Two-column: bio left (1.3fr) + stats right (0.7fr) ── */}
        <div className="mb-16 grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Bio column */}
          <div className="flex flex-col gap-5" data-sanity={createSanityAttribute("about.bio")}>
            {about?.bioTagline ? (
              <div className="mb-1 flex items-center gap-2.5" data-sanity={createSanityAttribute("about.bioTagline")}>
                <Terminal className="size-4 shrink-0 text-primary" />
                <span className="text-body-sm">{about.bioTagline}</span>
              </div>
            ) : null}

            {about?.bio ? <BioMarkdown content={about.bio} /> : null}

            {about?.cvDownloads && about.cvDownloads.length > 0 ? (
              <div>
                <CVDropdown dataSanity={createSanityAttribute("about.cvDownloads")} downloads={about.cvDownloads} />
              </div>
            ) : null}
          </div>

          {/* Stats column — no card wrappers, DS typography */}
          <div className="grid grid-cols-2 content-start gap-x-8 gap-y-10 pt-1">
            {about?.stats?.map((stat, index) => (
              <div key={stat._key} data-sanity={createSanityAttribute(`about.stats[${index}]`)}>
                <div className="font-code text-display-sm text-foreground tabular-nums">
                  <CountingNumber
                    to={stat.value ?? 0}
                    duration={2}
                    format={(value) => `${Math.round(value)}${stat.suffix ?? ""}`}
                    once
                  />
                </div>
                <p className="mt-1.5 text-mute">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom row: location + hobbies ── */}
        <div className="grid gap-12 border-border border-t pt-12 sm:grid-cols-2">
          {/* Location */}
          {about?.location?.city ? (
            <div className="flex items-center gap-3.5" data-sanity={createSanityAttribute("about.location")}>
              <div className="relative shrink-0">
                <MapPin className="size-5 text-primary" />
                <span className="absolute -top-0.5 -right-0.5 size-2 animate-ping rounded-full bg-primary/60" />
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary" />
              </div>
              <div>
                <p className="font-semibold text-body-sm">{about.location.city}</p>
                {about.location.remoteWorkLabel ? <p className="text-small">{about.location.remoteWorkLabel}</p> : null}
              </div>
            </div>
          ) : null}

          {/* Hobbies */}
          {about?.hobbies?.items && about.hobbies.items.length > 0 ? (
            <div data-sanity={createSanityAttribute("about.hobbies")}>
              {about.hobbies.sectionLabel ? (
                <span className="mb-3 block text-small">{about.hobbies.sectionLabel}</span>
              ) : null}
              <div className="-mx-3 flex flex-wrap gap-1">
                {about.hobbies.items.map((hobby) => (
                  <HobbyItem key={hobby._key} iconType={hobby.icon ?? ""} label={hobby.label ?? ""} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
