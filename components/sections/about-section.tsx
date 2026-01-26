"use client";

import { Card, CardContent, CountingNumber } from "@szum-tech/design-system";
import { SectionHeading } from "~/components/ui/section-heading";
import { type PersonalInfo, type SectionHeadingContent, type Stat } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

type AboutSectionProps = {
  personalInfo: PersonalInfo;
  stats: Array<Stat>;
  heading: SectionHeadingContent;
};

export function AboutSection({ personalInfo, stats, heading }: AboutSectionProps) {
  return (
    <section id={Section.ABOUT} className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeading title={heading.title} description={heading.description} />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {personalInfo.bio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex flex-1 flex-col items-center justify-center text-center">
                  <div className="text-display-sm text-primary">
                    <CountingNumber
                      to={stat.value}
                      duration={2}
                      format={(value) => `${Math.round(value)}${stat.suffix ?? ""}`}
                      once
                    />
                  </div>
                  <p className="text-muted-foreground text-body-lg mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
