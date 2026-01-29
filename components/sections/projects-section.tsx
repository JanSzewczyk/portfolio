"use client";

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
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import Image from "next/image";
import { ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { urlFor } from "~/lib/sanity/image";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

type ProjectData =
  NonNullable<NonNullable<NonNullable<PortfolioPageQueryResult>["projects"]>["allProjects"]> extends (infer T)[]
    ? T
    : never;

type ProjectCardProps = {
  project: ProjectData;
  dataSanity?: string;
};

function ProjectCard({ project, dataSanity }: ProjectCardProps) {
  const thumbnailUrl = project.thumbnail?.asset?.url
    ? urlFor(project.thumbnail).auto("format").width(800).height(450).url()
    : null;

  return (
    <Card
      className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      data-sanity={dataSanity}
    >
      <CardHeader>
        <div className="bg-muted mb-4 aspect-video overflow-hidden rounded">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={stegaClean(project.title) || "Project thumbnail"}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={800}
              height={450}
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
          {project.technologies?.slice(0, 4).map((tech: { _id: string; name: string | null }) => (
            <Badge key={tech._id} variant="secondary">
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
      </CardFooter>
    </Card>
  );
}

type ProjectCategoryTab = {
  value: string;
  label: string;
};

type ProjectsSectionProps = {
  projects: NonNullable<PortfolioPageQueryResult>["projects"];
  documentId: string;
  documentType: string;
};

export function ProjectsSection({ projects, documentId, documentType }: ProjectsSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({ documentId, documentType });

  // Build project categories from available projects
  const allProjects = projects?.allProjects ?? [];
  const featuredProjects = projects?.featuredProjects ?? [];

  // Extract unique categories from all projects
  const uniqueCategories = Array.from(
    new Set(allProjects.map((p) => p.category).filter((c): c is NonNullable<typeof c> => c !== null))
  );

  const projectCategories: ProjectCategoryTab[] = [
    { value: "all", label: "Featured" },
    ...uniqueCategories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    }))
  ];

  const filterProjects = (category: string): ProjectData[] => {
    if (category === "all") {
      return featuredProjects;
    }
    return allProjects.filter((p) => p.category === category);
  };

  return (
    <section id={Section.PROJECTS} className="py-24">
      <div className="container">
        <SectionHeading
          title={projects?.heading?.title ?? ""}
          description={projects?.heading?.description ?? ""}
          data-sanity={createSanityAttribute("projects.heading")}
        />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mx-auto mb-8">
            {projectCategories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {projectCategories.map((category) => {
            const categoryProjects = filterProjects(category.value);

            return (
              <TabsContent key={category.value} value={category.value}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProjects.map((project, index) => {
                    const projectArrayPath =
                      category.value === "all" ? "projects.featuredProjects" : "projects.allProjects";
                    return (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        dataSanity={createSanityAttribute(`${projectArrayPath}[${index}]`)}
                      />
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
