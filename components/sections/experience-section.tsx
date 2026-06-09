"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@szum-tech/design-system/components/accordion";
import { Avatar, AvatarFallback } from "@szum-tech/design-system/components/avatar";
import { Badge } from "@szum-tech/design-system/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@szum-tech/design-system/components/card";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem
} from "@szum-tech/design-system/components/timeline";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { urlFor } from "~/lib/sanity/image";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
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
  const { createSanityAttribute } = buildSanityAttribute({
    documentId,
    documentType
  });

  if (!experience?.experiences || experience.experiences.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-24" id={Section.EXPERIENCE}>
      <div className="container">
        <SectionHeading
          data-sanity={createSanityAttribute("experience.heading")}
          description={experience.heading?.description ?? ""}
          title={experience.heading?.title ?? ""}
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
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].startDate`)}
                              variant="outline"
                            >
                              {formatPeriod(exp.startDate, exp.endDate)}
                            </Badge>
                          )}
                          {exp.type && (
                            <Badge
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].type`)}
                              variant="secondary"
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
                              className="size-10"
                              data-sanity={createSanityAttribute(`experience.experiences[${index}].companyLogo`)}
                            >
                              {/* next/image proxies the logo through /_next/image (same origin),
                                  avoiding the third-party `sanitySession` cookie from cdn.sanity.io. */}
                              {companyLogoUrl ? (
                                <Image
                                  alt={`${stegaClean(exp.company)} logo`}
                                  className="size-full object-cover"
                                  height={40}
                                  src={companyLogoUrl}
                                  width={40}
                                />
                              ) : (
                                <AvatarFallback>{companyInitial}</AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex flex-col">
                              <div data-sanity={createSanityAttribute(`experience.experiences[${index}].company`)}>
                                {exp.companyUrl ? (
                                  <a
                                    className="hover:text-primary hover:underline"
                                    href={exp.companyUrl}
                                    rel="noopener noreferrer"
                                    target="_blank"
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

                        <Accordion collapsible type="single">
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <AccordionItem value="responsibilities">
                              <AccordionTrigger>Key Responsibilities</AccordionTrigger>
                              <AccordionContent>
                                <ul
                                  className="ml-4 list-disc space-y-1 text-muted-foreground"
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
                                  className="ml-4 list-disc space-y-1 text-muted-foreground"
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
                              <Badge className="font-code" key={tech._id} variant="secondary">
                                <ReactIcon name={tech.icon as IconName} />
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
