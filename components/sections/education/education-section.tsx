import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem
} from "@szum-tech/design-system/components/timeline";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

import { EducationCard } from "./education-card";

type EducationSectionProps = {
  education: NonNullable<PortfolioPageQueryResult>["education"];
  documentId: string;
  documentType: string;
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id={Section.EDUCATION} className="py-24">
      <div className="container">
        <SectionHeading
          title={education?.heading?.title ?? "Education"}
          description={education?.heading?.description ?? ""}
        />

        <div className="mx-auto max-w-3xl">
          <Timeline activeIndex={2}>
            {education?.education?.map((edu) => (
              <TimelineItem key={edu._id}>
                <TimelineDot />
                <TimelineConnector />
                <TimelineContent>
                  <EducationCard education={edu} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
