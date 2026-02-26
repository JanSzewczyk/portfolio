import { ExternalLinkIcon } from "lucide-react";
import { stegaClean } from "next-sanity";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import Image from "next/image";
import { ReactIcon } from "~/components/ui/react-icon";
import { urlFor } from "~/lib/sanity/image";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

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
        <div className="bg-muted mb-4 aspect-video overflow-hidden rounded">
          {project.thumbnail ? (
            <Image
              src={urlFor(project.thumbnail).auto("format").width(800).height(450).url()}
              alt={stegaClean(project.thumbnail?.alt) || "Project thumbnail"}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={800}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center",
                "from-primary/10 to-primary/5 bg-linear-to-br",
                "text-primary/20 text-4xl font-bold"
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
          {project.technologies?.slice(0, 4).map((tech: { _id: string; name: string | null }, techIndex: number) => (
            <Badge key={`${project._id}-${tech._id}-${techIndex}`} variant="secondary">
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
          <Button size="sm" startIcon={<ExternalLinkIcon />} asChild>
            <a href={stegaClean(project.links.live)} target="_blank" rel="noopener noreferrer">
              Live
            </a>
          </Button>
        )}
        {project.links?.github && (
          <Button startIcon={<ReactIcon name="SiGithub" />} size="sm" variant="outline" asChild>
            <a href={stegaClean(project.links.github)} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          </Button>
        )}
        {project.links?.npm && (
          <Button startIcon={<ReactIcon name="SiNpm" />} size="sm" variant="outline" asChild>
            <a href={stegaClean(project.links.npm)} target="_blank" rel="noopener noreferrer">
              NPM
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
