"use client";

import { ExternalLinkIcon } from "lucide-react";

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
import { ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { type Project } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="bg-muted mb-4 aspect-video overflow-hidden rounded-md">
          <div
            className={cn(
              "flex h-full w-full items-center justify-center",
              "from-primary/10 to-primary/5 bg-gradient-to-br",
              "text-primary/20 text-4xl font-bold"
            )}
          >
            {project.title.charAt(0)}
          </div>
        </div>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-4">
        {project.links.live && (
          <Button size="sm" asChild>
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="mr-2 size-4" />
              Live
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button size="sm" variant="outline" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <ReactIcon name={"SiGithub"} className="mr-2 size-4" />
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
  projects: Project[];
  projectCategories: ReadonlyArray<ProjectCategoryTab>;
};

export function ProjectsSection({ projects, projectCategories }: ProjectsSectionProps) {
  const filterProjects = (category: string): Project[] => {
    if (category === "all") {
      return projects.filter((p) => p.featured);
    }
    return projects.filter((p) => p.category === category);
  };

  return (
    <section id={Section.PROJECTS} className="py-24">
      <div className="container">
        <SectionHeading
          title="Featured Projects"
          description="A selection of projects I've worked on, from open source libraries to full-stack applications."
        />

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList>
              {projectCategories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {projectCategories.map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filterProjects(category.value).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
