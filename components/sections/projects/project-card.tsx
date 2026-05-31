import { Badge } from "@szum-tech/design-system/components/badge";
import { Button } from "@szum-tech/design-system/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@szum-tech/design-system/components/card";
import { cn } from "@szum-tech/design-system/utils";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { ReactIcon } from "~/components/ui/react-icon";
import { urlFor } from "~/lib/sanity/image";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

type ProjectGroupData =
  NonNullable<NonNullable<NonNullable<PortfolioPageQueryResult>["projects"]>["projectGroups"]> extends (infer T)[]
    ? T
    : never;

export type ProjectData = NonNullable<ProjectGroupData["projects"]> extends (infer T)[] ? T : never;

export type ProjectCardProps = {
  project: ProjectData;
  dataSanity?: string;
};

export function ProjectCard({ project, dataSanity }: ProjectCardProps) {
  return (
    <Card
      className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      data-sanity={dataSanity}
    >
      <CardHeader>
        <div className="mb-4 aspect-video overflow-hidden rounded bg-muted">
          {project.thumbnail ? (
            <Image
              alt={stegaClean(project.thumbnail?.alt) || "Project thumbnail"}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={urlFor(project.thumbnail).auto("format").width(800).height(450).url()}
              width={800}
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                "bg-linear-to-br from-primary/10 to-primary/5",
                "font-bold text-4xl text-primary/20"
              )}
            >
              {project.title?.charAt(0)}
            </div>
          )}
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 4).map((tech: { _id: string; name: string | null }) => (
            <Badge key={`${project._id}-${tech._id}`} variant="secondary">
              {tech.name}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <Badge variant="secondary">+{project.technologies.length - 4}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {project.links?.live && (
          <Button asChild size="sm" startIcon={<ExternalLinkIcon />}>
            <a href={stegaClean(project.links.live)} rel="noopener noreferrer" target="_blank">
              Live
            </a>
          </Button>
        )}
        {project.links?.github && (
          <Button asChild size="sm" startIcon={<ReactIcon name="SiGithub" />} variant="outline">
            <a href={stegaClean(project.links.github)} rel="noopener noreferrer" target="_blank">
              Code
            </a>
          </Button>
        )}
        {project.links?.npm && (
          <Button asChild size="sm" startIcon={<ReactIcon name="SiNpm" />} variant="outline">
            <a href={stegaClean(project.links.npm)} rel="noopener noreferrer" target="_blank">
              NPM
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
