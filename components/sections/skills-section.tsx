"use client";

import { useState } from "react";

import { Badge, Card, CardHeader, Marquee, Tooltip, TooltipContent, TooltipTrigger } from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import { ReactIcon, type IconName } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

type Technology = {
  _id: string;
  name: string | null;
  icon: string | null;
  description: string | null;
};

function TechLogo({ tech, dataSanity }: { tech: Technology; dataSanity?: string }) {
  return (
    <div
      className="bg-background/80 hover:bg-muted group relative flex h-24 w-28 flex-col items-center gap-2 rounded border px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
      data-sanity={dataSanity}
    >
      <div className="text-primary absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:bg-current group-hover:opacity-10" />

      <div>
        {tech.icon ? (
          <ReactIcon
            name={tech.icon as IconName}
            className="text-primary relative z-10 size-8 opacity-40 transition-opacity duration-300 group-hover:opacity-70"
          />
        ) : null}
      </div>

      <span className="text-foreground text-body-xs relative z-10 text-center">{tech.name}</span>
    </div>
  );
}

function SkillCard({
  name,
  description,
  featured,
  icon,
  dataSanity
}: {
  name: string;
  description?: string | null;
  featured?: boolean;
  icon: IconName;
  dataSanity?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "bg-card group relative overflow-hidden rounded border transition-all duration-300",
            "hover:shadow-primary/10 hover:-translate-y-1 hover:shadow-lg",
            featured ? "col-span-2 row-span-3 p-6 lg:col-span-1" : "hover:border-primary/50 p-4"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-sanity={dataSanity}
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
                  {icon ? (
                    <ReactIcon
                      name={icon}
                      className="text-primary/50 group-hover:text-primary/70 mb-3 size-16 transition-colors duration-300"
                    />
                  ) : null}
                  <h3 className="text-2xl font-bold">{name}</h3>
                </div>
                {description ? <p className="text-muted-foreground text-sm leading-relaxed">{description}</p> : null}
              </>
            ) : (
              <>
                {icon ? (
                  <ReactIcon
                    name={icon}
                    className="text-primary/30 group-hover:text-primary/60 mb-2 size-8 transition-colors duration-300"
                  />
                ) : null}
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
  skills: NonNullable<PortfolioPageQueryResult>["skills"];
  documentId: string;
  documentType: string;
};

export function SkillsSection({ skills, documentId, documentType }: SkillsSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({ documentId, documentType });

  // Collect all technologies from all groups for the marquee
  const allTechnologies =
    skills?.technologyGroups?.flatMap((group) => group.technologies?.filter((tech) => tech.name) ?? []) ?? [];

  return (
    <section id={Section.SKILLS} className="py-24">
      <div className="container">
        <SectionHeading
          title={skills?.heading?.title ?? ""}
          description={skills?.heading?.description ?? ""}
          data-sanity={createSanityAttribute("skills.heading")}
        />

        {/* Tech logos marquee with enhanced styling */}
        {allTechnologies.length > 0 && (
          <div className="relative -mx-4 mb-20 sm:-mx-6 lg:-mx-8">
            <Marquee pauseOnHover className="[--duration:50s]">
              {allTechnologies.map((tech, index) => (
                <TechLogo
                  key={tech._id}
                  tech={tech}
                  dataSanity={createSanityAttribute(`skills.technologyGroups[_key=="${tech._id}"]`)}
                />
              ))}
            </Marquee>
            <div className="from-background/95 pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r to-transparent" />
            <div className="from-background/95 pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l to-transparent" />
          </div>
        )}

        {/* Desktop: Bento Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {skills?.technologyGroups?.map((group, groupIndex) => {
              // Create a bento-style layout with different sized cards
              const featuredSkillIndex = 0; // First skill in each category is featured

              return (
                <div key={group._id} className="col-span-1 space-y-6">
                  {/* Category header */}
                  <Card
                    className="from-primary/10 to-primary/5 border-primary/20 bg-linear-to-br"
                    data-sanity={createSanityAttribute(`skills.technologyGroups[${groupIndex}]`)}
                  >
                    <CardHeader>
                      <Badge variant="primary">{group.label}</Badge>
                    </CardHeader>
                  </Card>

                  {/* Skills in bento grid pattern */}
                  <div className="grid grid-cols-2 gap-4">
                    {group.technologies?.map((skill, skillIndex) => (
                      <SkillCard
                        key={skill._id}
                        name={skill.name ?? ""}
                        description={skill.description}
                        featured={skillIndex === featuredSkillIndex}
                        icon={skill.icon as IconName}
                        dataSanity={createSanityAttribute(
                          `skills.technologyGroups[${groupIndex}].technologies[${skillIndex}]`
                        )}
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
          {skills?.technologyGroups?.map((group, groupIndex) => (
            <div key={group._id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <Badge variant="primary" className="text-sm">
                  {group.label}
                </Badge>
                <div className="bg-border h-px flex-1" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.technologies?.map((skill, skillIndex) => {
                  return (
                    <div
                      key={skill._id}
                      className="bg-card hover:border-primary/50 hover:bg-primary/5 flex flex-col gap-2 rounded-lg border p-4 transition-all duration-200"
                      data-sanity={createSanityAttribute(
                        `skills.technologyGroups[${groupIndex}].technologies[${skillIndex}]`
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {skill.icon ? (
                          <ReactIcon name={skill.icon as IconName} className="text-primary/60 size-6 shrink-0" />
                        ) : null}
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
