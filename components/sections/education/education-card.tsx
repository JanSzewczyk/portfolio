import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { stegaClean } from "next-sanity";

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
  CardTitle
} from "@szum-tech/design-system";
import { ReactIcon } from "~/components/ui/react-icon";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

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

export function EducationCard({ education: edu }: EducationCardProps) {
  const thesisTechnologies = edu.thesis?.project?.technologies ?? edu.thesis?.technologies ?? [];

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{formatPeriod(edu.startDate ?? "", edu.endDate ?? undefined)}</Badge>
          <Badge variant="secondary">{edu.degree}</Badge>
          {edu.grade && <Badge variant="secondary">GPA: {edu.grade}</Badge>}
        </div>
        <CardTitle>{edu.fieldOfStudy}</CardTitle>
        <CardDescription>
          {edu.institutionUrl ? (
            <a
              href={stegaClean(edu.institutionUrl)}
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
            <h3 className="text-body-lg mb-2 font-semibold">Thesis</h3>
            <p className="text-body-md text-primary mb-1 font-medium">{edu.thesis.title}</p>
            <p className="text-body-sm text-muted-foreground mb-3">{edu.thesis.description}</p>
            {thesisTechnologies.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {thesisTechnologies.map((tech, techIndex) => (
                  <Badge key={`${edu._id}-thesis-${tech._id}-${techIndex}`} variant="outline" className="text-body-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            )}
            {edu.thesis.project && (
              <div className="border-t pt-3">
                <h4 className="text-body-sm mb-1 font-semibold">Related Project</h4>
                <p className="text-body-sm font-medium">{edu.thesis.project.title}</p>
                <p className="text-body-xs text-muted-foreground mb-2">{edu.thesis.project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.thesis.project.links?.live && (
                    <Button size="sm" startIcon={<ExternalLinkIcon />} asChild>
                      <a href={stegaClean(edu.thesis.project.links.live)} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    </Button>
                  )}
                  {edu.thesis.project.links?.github && (
                    <Button startIcon={<ReactIcon name="SiGithub" />} size="sm" variant="outline" asChild>
                      <a href={stegaClean(edu.thesis.project.links.github)} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                  )}
                  {edu.thesis.url && (
                    <Button startIcon={<FileTextIcon />} size="sm" variant="outline" asChild>
                      <a href={stegaClean(edu.thesis.url)} target="_blank" rel="noopener noreferrer">
                        Thesis
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
            {!edu.thesis.project && edu.thesis.url && (
              <div className="flex flex-wrap gap-2">
                <Button startIcon={<FileTextIcon />} size="sm" variant="outline" asChild>
                  <a href={stegaClean(edu.thesis.url)} target="_blank" rel="noopener noreferrer">
                    Thesis
                  </a>
                </Button>
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
  );
}
