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
import { EDUCATION, type DegreeType } from "~/constants/portfolio";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

function formatDegree(degree: DegreeType): string {
  const degreeMap: Record<DegreeType, string> = {
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: "Ph.D."
  };
  return degreeMap[degree];
}

export function EducationSection() {
  return (
    <section id="education" className="py-24">
      <div className="container">
        <SectionHeading
          title="Education"
          description="My academic journey and the knowledge that built my foundation."
        />

        <div className="mx-auto max-w-3xl">
          <Timeline activeIndex={0}>
            {EDUCATION.map((edu) => (
              <TimelineItem key={edu.id}>
                <TimelineDot />
                <TimelineConnector />
                <TimelineContent>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{formatPeriod(edu.startDate, edu.endDate)}</Badge>
                        <Badge variant="secondary">{formatDegree(edu.degree)}</Badge>
                        {edu.grade && <Badge variant="secondary">GPA: {edu.grade}</Badge>}
                      </div>
                      <CardTitle className="mt-2">{edu.fieldOfStudy}</CardTitle>
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
                        {" · "}
                        {edu.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {edu.thesis && (
                        <div className="bg-muted/50 rounded-lg border p-4">
                          <h4 className="mb-2 font-semibold">Master&apos;s Thesis</h4>
                          <p className="text-primary mb-1 font-medium">{edu.thesis.title}</p>
                          <p className="text-muted-foreground mb-3 text-sm">{edu.thesis.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.thesis.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Accordion type="single" collapsible>
                        {edu.achievements && edu.achievements.length > 0 && (
                          <AccordionItem value="achievements" className="border-none">
                            <AccordionTrigger className="py-2 text-sm">Key Achievements</AccordionTrigger>
                            <AccordionContent>
                              <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                                {edu.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        )}

                        {edu.coursework && edu.coursework.length > 0 && (
                          <AccordionItem value="coursework" className="border-none">
                            <AccordionTrigger className="py-2 text-sm">Relevant Coursework</AccordionTrigger>
                            <AccordionContent>
                              <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                                {edu.coursework.map((course, i) => (
                                  <li key={i}>{course}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        )}
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
