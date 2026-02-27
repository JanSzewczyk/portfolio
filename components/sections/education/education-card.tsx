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
  CardTitle
} from "@szum-tech/design-system";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

type EducationCardProps = {
  education: NonNullable<NonNullable<NonNullable<PortfolioPageQueryResult>["education"]>["education"]>[number];
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

/**
 * EducationCard component displays a single education entry with comprehensive details.
 * Shows degree, institution, location, thesis information, achievements, and coursework.
 *
 * @component
 * @example
 * ```tsx
 * <EducationCard education={educationData} />
 * ```
 */
export function EducationCard({ education }: EducationCardProps) {
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
              href={education.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
            >
              {education.institution}
            </a>
          ) : (
            education.institution
          )}
          {education.location && (
            <>
              {" · "}
              {education.location}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.thesis ? (
          <div className="bg-muted/50 rounded border p-4">
            <h3 className="text-body-lg mb-2 font-semibold">Master&apos;s Thesis</h3>
            <p className="text-body-md text-primary mb-1 font-medium">{education.thesis.title}</p>
            <p className="text-body-sm text-muted-foreground mb-3">{education.thesis.description}</p>
            {education.thesis.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {education.thesis.technologies.map((tech, techIndex) => (
                  <Badge
                    key={`${education._id}-thesis-${tech._id}-${techIndex}`}
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
          {education.achievements && education.achievements.length > 0 ? (
            <AccordionItem value="achievements">
              <AccordionTrigger>Key Achievements</AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                  {education.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) : null}

          {education.coursework && education.coursework.length > 0 ? (
            <AccordionItem value="coursework">
              <AccordionTrigger>Relevant Coursework</AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                  {education.coursework.map((course, i) => (
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
