"use client";

import { useState } from "react";

import { Badge, Card, CardHeader, Marquee, Tooltip, TooltipContent, TooltipTrigger } from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import { ReactIcon, type IconName } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { type Skill, type SkillGroup } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

function TechLogo({ tech }: { tech: Skill }) {
  return (
    <div className="bg-background/80 hover:bg-muted group relative flex h-24 w-28 flex-col items-center gap-2 rounded border px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
      <div className="text-primary absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:bg-current group-hover:opacity-10" />

      <div>
        <ReactIcon
          name={tech.icon}
          className="text-primary relative z-10 size-8 opacity-40 transition-opacity duration-300 group-hover:opacity-70"
        />
      </div>

      <span className="text-foreground text-body-xs relative z-10 text-center">{tech.name}</span>
    </div>
  );
}

function SkillCard({
  name,
  description,
  featured,
  icon
}: {
  name: string;
  description?: string;
  featured?: boolean;
  icon: IconName;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "bg-card group relative overflow-hidden rounded border transition-all duration-300",
            "hover:shadow-primary/10 hover:-translate-y-1 hover:shadow-lg",
            featured ? "col-span-2 row-span-2 p-6 lg:col-span-1" : "hover:border-primary/50 p-4"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient background */}
          <div
            className={cn(
              "from-primary/5 to-primary/10 bg-linear-to-br via-transparent",
              "absolute inset-0 opacity-0 transition-opacity duration-500",
              "group-hover:opacity-100"
            )}
          />

          {/* Animated border shine effect */}
          <div
            className={cn(
              "absolute inset-0 rounded opacity-0 transition-opacity duration-300",
              "via-primary/20",
              "group-hover:opacity-100",
              isHovered ? "animate-pulse" : null
            )}
            style={{
              backgroundSize: "200% 100%"
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {featured ? (
              <>
                <div className="mb-4">
                  <ReactIcon
                    name={icon}
                    className="text-primary/50 group-hover:text-primary/70 mb-3 size-16 transition-colors duration-300"
                  />
                  <h3 className="text-2xl font-bold">{name}</h3>
                </div>
                {description ? <p className="text-muted-foreground text-sm leading-relaxed">{description}</p> : null}
              </>
            ) : (
              <>
                <ReactIcon
                  name={icon}
                  className="text-primary/30 group-hover:text-primary/60 mb-2 size-8 transition-colors duration-300"
                />
                <h3 className="text-foreground group-hover:text-primary text-sm font-semibold transition-colors duration-300">
                  {name}
                </h3>
              </>
            )}
          </div>
        </div>
      </TooltipTrigger>
      {description && !featured && (
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{description}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

type SkillsSectionProps = {
  skillGroups: Array<SkillGroup>;
  techLogos: Array<Skill>;
};

export function SkillsSection({ skillGroups, techLogos }: SkillsSectionProps) {
  return (
    <section id={Section.SKILLS} className="py-24">
      <div className="container">
        <SectionHeading
          title="Skills & Technologies"
          description="The tools and technologies I work with to bring ideas to life."
        />

        {/* Tech logos marquee with enhanced styling */}
        <div className="relative -mx-4 mb-20 sm:-mx-6 lg:-mx-8">
          <Marquee pauseOnHover className="[--duration:50s]">
            {techLogos.map((tech) => (
              <TechLogo key={tech.name} tech={tech} />
            ))}
          </Marquee>
          <div className="from-background/95 pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r to-transparent" />
          <div className="from-background/95 pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l to-transparent" />
        </div>

        {/* Desktop: Bento Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {skillGroups.map((group) => {
              // Create a bento-style layout with different sized cards
              const featuredSkillIndex = 0; // First skill in each category is featured

              return (
                <div key={group.category} className="col-span-1 space-y-6">
                  {/* Category header */}
                  <Card className="from-primary/10 to-primary/5 border-primary/20 bg-linear-to-br">
                    <CardHeader>
                      <Badge variant="primary">{group.label}</Badge>
                    </CardHeader>
                  </Card>

                  {/* Skills in bento grid pattern */}
                  <div className="grid grid-cols-2 gap-4">
                    {group.skills.map((skill, index) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        description={skill.description}
                        featured={index === featuredSkillIndex}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Stacked Categories */}
        <div className="space-y-8 lg:hidden">
          {skillGroups.map((group) => (
            <div key={group.category} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <Badge variant="primary" className="text-sm">
                  {group.label}
                </Badge>
                <div className="bg-border h-px flex-1" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.skills.map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="bg-card hover:border-primary/50 hover:bg-primary/5 flex flex-col gap-2 rounded-lg border p-4 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <ReactIcon name={skill.icon} className="text-primary/60 size-6 shrink-0" />
                        <span className="text-foreground text-sm font-semibold">{skill.name}</span>
                      </div>
                      {skill.description ? (
                        <p className="text-muted-foreground text-xs leading-relaxed">{skill.description}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative bottom text */}
        <div className="text-muted-foreground/50 mt-16 text-center">
          <p className="text-sm">Always learning and exploring new technologies to stay at the cutting edge</p>
        </div>
      </div>
    </section>
  );
}
