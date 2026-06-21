import { Badge } from "@szum-tech/design-system/components/badge";
import { BadgeOverflow } from "@szum-tech/design-system/components/badge-overflow";
import { Card, CardContent, CardHeader, CardTitle } from "@szum-tech/design-system/components/card";
import { cn } from "@szum-tech/design-system/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { Markdown } from "~/components/ui/markdown";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { urlFor } from "~/lib/sanity/image";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

import { ProjectDetailsDialog } from "./project-details-dialog";

type ProjectGroupData =
  NonNullable<NonNullable<NonNullable<PortfolioPageQueryResult>["projects"]>["projectGroups"]> extends Array<infer T>
    ? T
    : never;

export type ProjectData = NonNullable<ProjectGroupData["projects"]> extends Array<infer T> ? T : never;

export type ProjectCardProps = {
  project: ProjectData;
  dataSanity?: string;
};

export function ProjectCard({ project, dataSanity }: ProjectCardProps) {
  const coverImage = project.images?.[0];

  return (
    <ProjectDetailsDialog project={project}>
      <Card
        className="group flex h-full cursor-pointer flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        data-sanity={dataSanity}
      >
        <CardHeader>
          <div className="mb-4 aspect-video overflow-hidden rounded bg-muted">
            {coverImage ? (
              <Image
                alt={stegaClean(coverImage?.alt) || "Project thumbnail"}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                height={450}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={urlFor(coverImage).auto("format").width(800).height(450).url()}
                width={800}
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center",
                  "bg-linear-to-br from-primary/10 to-primary/5",
                  "text-display-sm text-primary/20"
                )}
              >
                {project.title?.charAt(0)}
              </div>
            )}
          </div>
          <CardTitle className="text-heading-h4">{project.title}</CardTitle>
          <div className="line-clamp-5 text-body-sm text-muted-foreground">
            <Markdown content={project.description ?? ""} inline />
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-end gap-4">
          <BadgeOverflow
            getBadgeLabel={(tech) => tech.name ?? ""}
            items={project.technologies ?? []}
            renderBadge={(tech, label) => (
              <Badge className="font-code" key={`${project._id}-${tech._id}`} variant="secondary">
                <ReactIcon name={tech.icon as IconName} />
                {label}
              </Badge>
            )}
            renderOverflow={(count) => <Badge variant="secondary">+{count}</Badge>}
          />

          <span className="flex items-center gap-1 font-semibold text-body-sm text-primary">
            View details
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </ProjectDetailsDialog>
  );
}
