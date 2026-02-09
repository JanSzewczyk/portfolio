"use client";

import { stegaClean } from "next-sanity";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@szum-tech/design-system";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";
import { buildSanityAttribute } from "~/lib/sanity/utils";

import { ProjectCard, type ProjectData } from "./project-card";

type ProjectWithPath = {
  data: ProjectData;
  sanityPath: string;
};

type ProjectCategoryTab = {
  value: string;
  label: string;
  projects: ProjectWithPath[];
};

export type ProjectsSectionProps = {
  projects: NonNullable<PortfolioPageQueryResult>["projects"];
  documentId: string;
  documentType: string;
};

export function ProjectsSection({ projects, documentId, documentType }: ProjectsSectionProps) {
  const { createSanityAttribute } = buildSanityAttribute({ documentId, documentType });

  // Get project groups from the data
  const projectGroups = projects?.projectGroups ?? [];

  const tabs: ProjectCategoryTab[] = [];

  // Collect featured projects with their original paths
  const featuredProjects: ProjectWithPath[] = [];
  projectGroups.forEach((group, groupIndex) => {
    group.projects?.forEach((project, projectIndex) => {
      if (project.featured) {
        featuredProjects.push({
          data: project,
          sanityPath: `projects.projectGroups[${groupIndex}].projects[${projectIndex}]`
        });
      }
    });
  });

  // Add "Featured" tab if there are featured projects
  if (featuredProjects.length > 0) {
    tabs.push({
      value: "featured",
      label: "Featured",
      projects: featuredProjects
    });
  }

  // Add standard group tabs
  projectGroups.forEach((group, groupIndex) => {
    const groupProjects =
      group.projects?.map((project, projectIndex) => ({
        data: project,
        sanityPath: `projects.projectGroups[${groupIndex}].projects[${projectIndex}]`
      })) ?? [];

    tabs.push({
      value: `group-${groupIndex}`,
      label: stegaClean(group.label) ?? `Group ${groupIndex + 1}`,
      projects: groupProjects
    });
  });

  return (
    <section id={Section.PROJECTS} className="py-24">
      <div className="container">
        <SectionHeading
          title={projects?.heading?.title ?? ""}
          description={projects?.heading?.description ?? ""}
          data-sanity={createSanityAttribute("projects.heading")}
        />

        <Tabs defaultValue={tabs[0]?.value} className="w-full">
          <TabsList className="mx-auto mb-8">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tab.projects.map((item) => (
                  <ProjectCard
                    key={item.data._id}
                    project={item.data}
                    dataSanity={createSanityAttribute(item.sanityPath)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
