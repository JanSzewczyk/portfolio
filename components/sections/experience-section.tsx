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
import { EXPERIENCES } from "~/constants/portfolio";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeading title="Experience" description="My professional journey and the roles that shaped my career." />

        <div className="mx-auto max-w-3xl">
          <Timeline>
            {EXPERIENCES.map((exp, index) => (
              <TimelineItem key={exp.id}>
                <TimelineDot className={index === 0 ? "border-primary bg-primary" : undefined} />
                <TimelineConnector />
                <TimelineContent>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{formatPeriod(exp.startDate, exp.endDate)}</Badge>
                        <Badge variant="secondary">{exp.type}</Badge>
                      </div>
                      <CardTitle className="mt-2">{exp.role}</CardTitle>
                      <CardDescription>
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
                        {" · "}
                        {exp.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{exp.summary}</p>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="responsibilities" className="border-none">
                          <AccordionTrigger className="py-2 text-sm">Key Responsibilities</AccordionTrigger>
                          <AccordionContent>
                            <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                              {exp.responsibilities.map((responsibility, i) => (
                                <li key={i}>{responsibility}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {exp.achievements && exp.achievements.length > 0 && (
                          <AccordionItem value="achievements" className="border-none">
                            <AccordionTrigger className="py-2 text-sm">Key Achievements</AccordionTrigger>
                            <AccordionContent>
                              <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </Accordion>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
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
