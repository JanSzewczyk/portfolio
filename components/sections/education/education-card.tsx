"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@szum-tech/design-system";
import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { stegaClean } from "next-sanity";
import { ReactIcon } from "~/components/ui/react-icon";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

type EducationData = NonNullable<NonNullable<NonNullable<PortfolioPageQueryResult>["education"]>["education"]>[number];

export type EducationCardProps = {
  education: EducationData;
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

export function EducationCard({ education }: EducationCardProps) {
  const thesisTechnologies = education.thesis?.project?.technologies ?? education.thesis?.technologies ?? [];
  const hasThesisActions =
    Boolean(education.thesis?.project?.links?.live) ||
    Boolean(education.thesis?.project?.links?.github) ||
    Boolean(education.thesis?.url);

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{formatPeriod(education.startDate ?? "", education.endDate ?? undefined)}</Badge>
          <Badge variant="secondary">{education.degree}</Badge>
          {education.grade && <Badge variant="secondary">GPA: {education.grade}</Badge>}
        </div>
        <CardTitle>{education.fieldOfStudy}</CardTitle>
        <CardDescription>
          {education.institutionUrl ? (
            <a
              href={stegaClean(education.institutionUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
            >
              {education.institution}
            </a>
          ) : (
            education.institution
          )}
          {education.location ? (
            <>
              {" | "}
              {education.location}
            </>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.thesis ? (
          <div className="rounded border bg-muted/50 p-4">
            <h3 className="text-mute">Thesis</h3>
            <p className="mb-2 text-heading-h3">{education.thesis.title}</p>
            <p className="mb-3 text-body-sm text-muted-foreground">{education.thesis.description}</p>
            {thesisTechnologies.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {thesisTechnologies.map((tech) => (
                  <Badge key={`${education._id}-thesis-${tech._id}`} variant="outline" className="text-body-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            )}
            {education.thesis.project ? (
              <div className="border-t pt-3">
                <h4 className="text-mute">Related Project</h4>
                <p className="mb-2 text-heading-h4">{education.thesis.project.title}</p>
                <p className="mb-2 text-body-xs text-muted-foreground">{education.thesis.project.description}</p>
              </div>
            ) : null}
            {hasThesisActions ? (
              <div className="flex justify-end gap-1.5 pt-3">
                {education.thesis.project?.links?.live ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" asChild>
                        <a
                          href={stegaClean(education.thesis.project.links.live)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open live project"
                        >
                          <ExternalLinkIcon className="size-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Live project</TooltipContent>
                  </Tooltip>
                ) : null}
                {education.thesis.project?.links?.github ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" asChild>
                        <a
                          href={stegaClean(education.thesis.project.links.github)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open source code"
                        >
                          <ReactIcon name="SiGithub" size={14} />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Source code</TooltipContent>
                  </Tooltip>
                ) : null}
                {education.thesis.url ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" asChild>
                        <a
                          href={stegaClean(education.thesis.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open thesis document"
                        >
                          <FileTextIcon className="size-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Thesis document</TooltipContent>
                  </Tooltip>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        <Accordion type="single" collapsible>
          {education.achievements && education.achievements.length > 0 ? (
            <AccordionItem value="achievements">
              <AccordionTrigger>Key Achievements</AccordionTrigger>
              <AccordionContent>
                <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                  {education.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) : null}

          {education.coursework && education.coursework.length > 0 ? (
            <AccordionItem value="coursework">
              <AccordionTrigger>Relevant Coursework</AccordionTrigger>
              <AccordionContent>
                <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                  {education.coursework.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      </CardContent>
    </Card>
  );
}
