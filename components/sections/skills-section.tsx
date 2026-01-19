import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Progress,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@szum-tech/design-system";
import { Marquee } from "~/components/ui/marquee";
import { SectionHeading } from "~/components/ui/section-heading";
import { SKILL_GROUPS, TECH_LOGOS } from "~/constants/portfolio";

function TechLogo({ name }: { name: string }) {
  return (
    <div className="bg-background/50 hover:bg-muted flex h-16 w-24 flex-col items-center justify-center gap-2 rounded-lg border px-4 py-2 transition-colors">
      <span className="text-primary/30 text-2xl font-bold">{name.charAt(0)}</span>
      <span className="text-muted-foreground text-xs">{name}</span>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="container">
        <SectionHeading
          title="Skills & Technologies"
          description="The tools and technologies I work with to bring ideas to life."
        />

        {/* Tech logos marquee */}
        <div className="-mx-4 mb-16 overflow-hidden sm:-mx-6 lg:-mx-8">
          <Marquee pauseOnHover speed="slow" gap="1.5rem">
            {TECH_LOGOS.map((tech) => (
              <TechLogo key={tech.name} name={tech.name} />
            ))}
          </Marquee>
        </div>

        {/* Skill categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.category}>
              <CardHeader className="pb-4">
                <Badge variant="outline" className="w-fit">
                  {group.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {group.skills.map((skill) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className="cursor-help space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="h-1.5" />
                      </div>
                    </TooltipTrigger>
                    {skill.description && (
                      <TooltipContent>
                        <p className="max-w-xs">{skill.description}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
