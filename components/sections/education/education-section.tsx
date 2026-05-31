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
    <section className="py-24" id={Section.EDUCATION}>
      <div className="container">
        <SectionHeading
          description={education?.heading?.description ?? ""}
          title={education?.heading?.title ?? "Education"}
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
