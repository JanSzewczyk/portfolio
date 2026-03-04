"use client";

import { stegaClean } from "next-sanity";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { urlFor } from "~/lib/sanity/image";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

type ExperienceSectionProps = {
  experience: NonNullable<PortfolioPageQueryResult>["experience"];
  documentId: string;
  documentType: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(startDate: string, endDate?: string | null): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

export function ExperienceSection({ experience, documentId, documentType }: ExperienceSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({ documentId, documentType });

  if (!experience?.experiences || experience.experiences.length === 0) {
    return null;
  }

  return (
    <section id={Section.EXPERIENCE} className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeading
          title={experience.heading?.title ?? ""}
          description={experience.heading?.description ?? ""}
          data-sanity={createSanityAttribute("experience.heading")}
        />

        <div className="mx-auto max-w-3xl">
          <Timeline>
            {experience.experiences.map((exp, index) => {
              const companyLogoUrl = exp.companyLogo?.asset?.url
                ? urlFor(exp.companyLogo).auto("format").width(40).height(40).url()
                : undefined;

              const companyInitial = exp.company ? stegaClean(exp.company).charAt(0).toUpperCase() : "?";

              return (
                <TimelineItem key={exp._id}>
                  <TimelineDot className={index === 0 ? "border-primary bg-primary" : undefined} />
                  <TimelineConnector />
                  <TimelineContent>
                    <Card data-sanity={createSanityAttribute(`experience.experiences[${index}]`)}>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          {exp.startDate && (
                            <Badge
                              variant="outline"
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].startDate`)}
                            >
                              {formatPeriod(exp.startDate, exp.endDate)}
                            </Badge>
                          )}
                          {exp.type && (
                            <Badge
                              variant="secondary"
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].type`)}
                            >
                              {exp.type}
                            </Badge>
                          )}
                        </div>
                        <CardTitle
                          className="mt-2"
                          data-sanity={createSanityAttribute(`experience.experiences[${index}].role`)}
                        >
                          {exp.role}
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-3">
                            <Avatar
                              className="size-10 rounded-lg"
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].companyLogo`)}
                            >
                              <AvatarImage src={companyLogoUrl} alt={`${stegaClean(exp.company)} logo`} />
                              <AvatarFallback className="rounded-lg">{companyInitial}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <div data-sanity={createSanityAttribute(`experience.experiences[${index}].company`)}>
                                {exp.companyUrl ? (
                                  <a
                                    href={exp.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary hover:underline"
                                  >
                                    {exp.company}
                                  </a>
                                ) : (
                                  exp.company
                                )}
                              </div>
                              <div
                                className="text-sm"
                                data-sanity={createSanityAttribute(`experience.experiences[${index}].location`)}
                              >
                                {exp.location}
                              </div>
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p
                          className="text-muted-foreground"
                          data-sanity={createSanityAttribute(`experience.experiences[${index}].summary`)}
                        >
                          {exp.summary}
                        </p>

                        <Accordion type="single" collapsible>
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <AccordionItem value="responsibilities">
                              <AccordionTrigger>Key Responsibilities</AccordionTrigger>
                              <AccordionContent>
                                <ul
                                  className="text-muted-foreground ml-4 list-disc space-y-1"
                                  data-sanity={createSanityAttribute(
                                    `experience.experiences[${index}].responsibilities`
                                  )}
                                >
                                  {exp.responsibilities.map((responsibility) => (
                                    <li key={responsibility}>{responsibility}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}

                          {exp.achievements && exp.achievements.length > 0 && (
                            <AccordionItem value="achievements">
                              <AccordionTrigger>Key Achievements</AccordionTrigger>
                              <AccordionContent>
                                <ul
                                  className="text-muted-foreground ml-4 list-disc space-y-1"
                                  data-sanity={createSanityAttribute(`experience.experiences[${index}].achievements`)}
                                >
                                  {exp.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div
                            className="flex flex-wrap gap-1.5 pt-2"
                            data-sanity={createSanityAttribute(`experience.experiences[${index}].technologies`)}
                          >
                            {exp.technologies.map((tech) => (
                              <Badge key={tech._id} variant="secondary" className="text-xs">
                                {tech.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
