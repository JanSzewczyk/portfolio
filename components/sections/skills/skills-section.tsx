import { Badge } from "@szum-tech/design-system/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@szum-tech/design-system/components/card";
import { cn } from "@szum-tech/design-system/utils";
import { ArrowDownIcon } from "lucide-react";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

import { TechMarquee } from "./tech-marquee";

type SkillsSectionProps = {
  skills: NonNullable<PortfolioPageQueryResult>["skills"];
  documentId: string;
  documentType: string;
};

/** Cap the marquee logos — every technology still appears in the grouped grid below. */
const MAX_MARQUEE_TECHS = 16;

export function SkillsSection({ skills, documentId, documentType }: SkillsSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({
    documentId,
    documentType
  });

  // Collect all technologies from all groups for the marquee (deduplicated by _id)
  const allTechnologies =
    skills?.technologyGroups?.flatMap((group) => group.technologies?.filter((tech) => tech.name) ?? []) ?? [];
  const uniqueTechnologies = Array.from(new Map(allTechnologies.map((tech) => [tech._id, tech])).values());
  const marqueeItems = uniqueTechnologies.slice(0, MAX_MARQUEE_TECHS).map((tech) => ({
    dataSanity: createSanityAttribute(`skills.technologyGroups[_key=="${tech._id}"]`),
    tech
  }));

  return (
    <section className="py-24" id={Section.SKILLS}>
      <div className="container">
        <SectionHeading
          data-sanity={createSanityAttribute("skills.heading")}
          description={skills?.heading?.description ?? ""}
          title={skills?.heading?.title ?? ""}
        />

        {/* Tech logos marquee with enhanced styling */}
        {marqueeItems.length > 0 ? (
          <div
            className="relative -mx-4 mb-20 sm:-mx-6 lg:-mx-8"
            data-sanity={createSanityAttribute("skills.technologyGroups")}
          >
            <TechMarquee items={marqueeItems} />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background/95 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background/95 to-transparent" />
          </div>
        ) : null}

        <div
          className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-3"
          data-sanity={createSanityAttribute("skills.technologyGroups")}
        >
          {skills?.technologyGroups?.map((group, groupIndex) => {
            const isFeatured = group.featured;
            const groupIcon = group.icon as IconName;

            return (
              <Card
                className={cn(
                  isFeatured ? "md:col-span-2" : "md:col-span-1",
                  "group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                )}
                data-sanity={createSanityAttribute(`skills.technologyGroups[${groupIndex}]`)}
                key={group._id}
              >
                <CardHeader className="relative">
                  <div className="absolute top-0 right-4">
                    {isFeatured && (
                      <ArrowDownIcon
                        className="text-muted-foreground transition-transform group-hover:-rotate-45 group-hover:text-foreground"
                        size={20}
                      />
                    )}
                  </div>
                  <div className="mb-2 flex size-10 items-center justify-center rounded bg-muted">
                    {groupIcon ? <ReactIcon className="size-6" name={groupIcon} /> : null}
                  </div>
                  <CardTitle className="text-heading-h4">{group.label}</CardTitle>

                  {isFeatured && group.description ? (
                    <CardDescription className="">{group.description}</CardDescription>
                  ) : null}
                </CardHeader>

                <CardContent className="flex flex-wrap gap-4">
                  {group.technologies &&
                    group.technologies.length > 0 &&
                    group.technologies.map((tech, techIndex) => (
                      <Badge
                        className="font-code"
                        data-sanity={createSanityAttribute(
                          `skills.technologyGroups[${groupIndex}].technologies[${techIndex}]`
                        )}
                        key={tech._id}
                        variant="outline"
                      >
                        <ReactIcon name={tech.icon as IconName} />
                        {tech.name}
                      </Badge>
                    ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Decorative bottom text */}
        <div className="mt-16 text-center">
          <p className="text-body-sm text-muted-foreground">{skills?.decorativeBottomText}</p>
        </div>
      </div>
    </section>
  );
}
