"use client";

import { Card, CardContent, CountingNumber } from "@szum-tech/design-system";
import { SectionHeading } from "~/components/ui/section-heading";
import { PERSONAL_INFO, STATS } from "~/constants/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeading title="About Me" description="Get to know me a little better." />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {PERSONAL_INFO.bio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-body-default text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-display-sm text-primary font-bold">
                    <CountingNumber
                      from={0}
                      to={stat.value}
                      duration={2}
                      format={(value) => `${Math.round(value)}${stat.suffix ?? ""}`}
                      once
                    />
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
