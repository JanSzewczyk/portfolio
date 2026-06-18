"use client";

import { Separator } from "@szum-tech/design-system";
import { Badge } from "@szum-tech/design-system/components/badge";
import { Button } from "@szum-tech/design-system/components/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@szum-tech/design-system/components/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@szum-tech/design-system/components/dialog";
import { cn } from "@szum-tech/design-system/utils";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import * as React from "react";
import { Markdown } from "~/components/ui/markdown";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { urlFor } from "~/lib/sanity/image";
import type { ProjectData } from "./project-card";

export type ProjectDetailsDialogProps = {
  /** The project whose details are presented. */
  project: ProjectData;
  /** The element that opens the dialog (rendered as the dialog trigger). */
  children: React.ReactNode;
};

/**
 * Extended "Project Details" dialog opened from a project card (Claude Design "Cinematic Hero").
 *
 * Hero image carousel (prev/next, counter + dots, arrow keys; controls hidden for a single image),
 * the project title, a Markdown lead, a Highlights list, a Tech stack, and a Links section.
 * Purely client-side — no URL change. The same layout reflows responsively on mobile.
 */
export function ProjectDetailsDialog({ project, children }: ProjectDetailsDialogProps) {
  const images = project.images ?? [];
  const technologies = project.technologies ?? [];
  const highlights = project.highlights ?? [];
  const hasMultipleImages = images.length > 1;

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    function handleSelect() {
      setCurrent(api?.selectedScrollSnap() ?? 0);
    }

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[95dvh] gap-0 overflow-hidden p-0" showCloseButton width="3xl">
        <DialogDescription className="sr-only">Detailed information about {project.title}</DialogDescription>
        <div className="relative">
          <Carousel aria-label={`${stegaClean(project.title) ?? "Project"} images`} setApi={setApi}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem className="pl-0" key={image.asset?._id ?? `${project._id}-image-${index}`}>
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      alt={stegaClean(image.alt) || "Project image"}
                      className="size-full object-cover"
                      height={675}
                      sizes="(max-width: 768px) 100vw, 768px"
                      src={urlFor(image).auto("format").width(1200).height(675).url()}
                      width={1200}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {hasMultipleImages ? (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            ) : null}
          </Carousel>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />

          <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-4 p-6">
            <DialogTitle className="text-display-sm text-foreground">{project.title}</DialogTitle>
            {hasMultipleImages ? (
              <div className="flex flex-col items-end gap-2">
                <span className="font-code text-body-sm text-muted-foreground">
                  <span className="text-primary/90">{current + 1}</span> / {images.length}
                </span>
                <div className="flex gap-1.5">
                  {images.map((image, index) => (
                    <button
                      aria-current={index === current ? "true" : undefined}
                      aria-label={`Go to image ${index + 1}`}
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full",
                        "before:size-2 before:rounded-full before:transition-colors before:content-['']",
                        index === current ? "before:bg-primary" : "before:bg-muted-foreground/30"
                      )}
                      key={image.asset?._id ?? `${project._id}-dot-${index}`}
                      onClick={() => api?.scrollTo(index)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto_200px]">
          <div className="flex flex-col gap-8">
            <Markdown content={project.description ?? ""} />

            {highlights.length > 0 ? (
              <section className="flex flex-col gap-3">
                <p className="font-semibold text-heading-h4">Highlights</p>
                <ul className="flex flex-col gap-2">
                  {highlights.map((highlight) => (
                    <li className="flex items-start gap-2" key={highlight}>
                      <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                      <Markdown content={highlight} inline />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {technologies.length > 0 ? (
              <section className="flex flex-col gap-3">
                <p className="font-semibold text-heading-h4">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge className="font-code" key={`${project._id}-${tech._id}`} variant="secondary">
                      <ReactIcon name={tech.icon as IconName} />
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <Separator orientation="vertical" />

          <aside className="flex flex-col gap-3">
            <p className="font-semibold text-heading-h4">Links</p>
            <div className="flex flex-col gap-2">
              {project.links?.live ? (
                <Button asChild startIcon={<ExternalLinkIcon />}>
                  <a href={stegaClean(project.links.live)} rel="noopener noreferrer" target="_blank">
                    Visit live site
                  </a>
                </Button>
              ) : null}
              {project.links?.github ? (
                <Button asChild startIcon={<ReactIcon name="SiGithub" />} variant="outline">
                  <a href={stegaClean(project.links.github)} rel="noopener noreferrer" target="_blank">
                    View source
                  </a>
                </Button>
              ) : null}
              {project.links?.npm ? (
                <Button asChild startIcon={<ReactIcon name="SiNpm" />} variant="outline">
                  <a href={stegaClean(project.links.npm)} rel="noopener noreferrer" target="_blank">
                    NPM
                  </a>
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
