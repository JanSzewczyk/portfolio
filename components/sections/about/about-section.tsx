"use client";

import { Card, CardContent } from "@szum-tech/design-system/components/card";
import { CountingNumber } from "@szum-tech/design-system/components/counting-number";
import { Skeleton } from "@szum-tech/design-system/components/skeleton";
import dynamic from "next/dynamic";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

// pigeon-maps is heavy and the map sits below the fold, so it is loaded lazily
// (client-only) to keep it out of the initial bundle. The h-48 skeleton matches
// the rendered map height to avoid layout shift (CLS).
const LocationCard = dynamic(() => import("~/components/sections/about/location-card").then((m) => m.LocationCard), {
  ssr: false,
  loading: () => <Skeleton className="h-48 w-full rounded-xl" />
});

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
          data-sanity={createSanityAttribute("about.heading")}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6" data-sanity={createSanityAttribute("about.bio")}>
            {about?.bio?.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {about?.stats?.map((stat, index) => (
              <Card key={stat._key} data-sanity={createSanityAttribute(`about.stats[${index}]`)}>
                <CardContent className="flex flex-1 flex-col items-center justify-center text-center">
                  <div className="text-display-sm text-primary">
                    <CountingNumber
                      to={stat.value ?? 0}
                      duration={2}
                      format={(value) => `${Math.round(value)}${stat.suffix ?? ""}`}
                      once
                    />
                  </div>
                  <p className="mt-2 text-body-lg text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}

            {/* Location Card */}
            {about?.location ? (
              <div className="col-span-2" data-sanity={createSanityAttribute("about.location")}>
                <LocationCard city={about.location.city ?? ""} coordinates={about.location.coordinates ?? {}} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
