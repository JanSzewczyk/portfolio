import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem
} from "@szum-tech/design-system";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

type EducationSectionProps = {
  education: NonNullable<PortfolioPageQueryResult>["education"];
  documentId: string;
  documentType: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

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
                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{formatPeriod(edu.startDate ?? "", edu.endDate ?? undefined)}</Badge>
                        <Badge variant="secondary">{edu.degree}</Badge>
                        <Badge variant="secondary">GPA: {edu.grade}</Badge>
                      </div>
                      <CardTitle>{edu.fieldOfStudy}</CardTitle>
                      <CardDescription>
                        {edu.institutionUrl ? (
                          <a
                            href={edu.institutionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {edu.institution}
                          </a>
                        ) : (
                          edu.institution
                        )}
                        {edu.location && (
                          <>
                            {" · "}
                            {edu.location}
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {edu.thesis ? (
                        <div className="bg-muted/50 rounded border p-4">
                          <h3 className="text-body-lg mb-2 font-semibold">Master&apos;s Thesis</h3>
                          <p className="text-body-md text-primary mb-1 font-medium">{edu.thesis.title}</p>
                          <p className="text-body-sm text-muted-foreground mb-3">{edu.thesis.description}</p>
                          {edu.thesis.technologies && (
                            <div className="flex flex-wrap gap-1.5">
                              {edu.thesis.technologies.map((tech, techIndex) => (
                                <Badge
                                  key={`${edu._id}-thesis-${tech._id}-${techIndex}`}
                                  variant="outline"
                                  className="text-body-xs"
                                >
                                  {tech.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null}

                      <Accordion type="single" collapsible>
                        {edu.achievements && edu.achievements.length > 0 ? (
                          <AccordionItem value="achievements">
                            <AccordionTrigger>Key Achievements</AccordionTrigger>
                            <AccordionContent>
                              <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                                {edu.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ) : null}

                        {edu.coursework && edu.coursework.length > 0 ? (
                          <AccordionItem value="coursework">
                            <AccordionTrigger>Relevant Coursework</AccordionTrigger>
                            <AccordionContent>
                              <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                                {edu.coursework.map((course, i) => (
                                  <li key={i}>{course}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ) : null}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
