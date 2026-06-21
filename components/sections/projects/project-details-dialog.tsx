"use client";

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@szum-tech/design-system/components/dialog";
import { cn } from "@szum-tech/design-system/utils";
import { CheckIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import * as React from "react";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { urlFor } from "~/lib/sanity/image";
import type { ProjectData } from "./project-card";

export type ProjectDetailsDialogProps = {
  /** The project whose details are presented. */
  project: ProjectData;
  /** The element that opens the dialog (rendered as the dialog trigger). */
  children: React.ReactNode;
  /**
   * Pre-rendered Markdown lead. Rendered on the server by the caller so `react-markdown` and its
   * remark/micromark pipeline never ship to the client bundle (this dialog is a Client Component).
   */
  description?: React.ReactNode;
  /** Pre-rendered Markdown highlights (server-rendered by the caller, keyed by `id`). */
  highlights?: Array<{ id: string; content: React.ReactNode }>;
};

/**
 * Extended "Project Details" dialog opened from a project card (Claude Design "Cinematic Hero").
 *
 * Hero image carousel (prev/next, counter + dots, arrow keys; controls hidden for a single image),
 * the project title, a Markdown lead, a Highlights list, a Tech stack, and a Links section.
 * Purely client-side — no URL change. The same layout reflows responsively on mobile.
 */
export function ProjectDetailsDialog({ project, children, description, highlights = [] }: ProjectDetailsDialogProps) {
  const images = project.images ?? [];
  const technologies = project.technologies ?? [];
  const hasMultipleImages = images.length > 1;

  // Shared style for controls overlaid on the hero photos. Keeps a frosted fill visible on any
  // image in both themes — the DS `outline` button turns near-transparent in dark via
  // `dark:bg-input/30`, so the explicit `dark:` overrides below are required to restore contrast.
  const overlayControlClassName = cn(
    "border-border bg-background/80 shadow-sm backdrop-blur-sm",
    "hover:bg-background dark:border-border dark:bg-background/80 dark:hover:bg-background"
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // Sync `current` only from Embla's callbacks (external system), never synchronously in the effect
    // body — that lets the React Compiler optimize this component. `reInit` covers a non-zero start
    // index after the carousel re-initialises (e.g. when the image set changes).
    function handleSelect() {
      setCurrent(api?.selectedScrollSnap() ?? 0);
    }

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0" width="3xl">
        <DialogDescription className="sr-only">Detailed information about {project.title}</DialogDescription>
        <div className="relative shrink-0">
          <DialogClose asChild>
            <Button
              aria-label="Close"
              className={cn(overlayControlClassName, "absolute top-4 right-4 z-10")}
              size="icon"
              variant="outline"
            >
              <XIcon />
            </Button>
          </DialogClose>
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
                <CarouselPrevious className={cn(overlayControlClassName, "left-4")} />
                <CarouselNext className={cn(overlayControlClassName, "right-4")} />
              </>
            ) : null}
          </Carousel>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />

          <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-4 p-6">
            <DialogTitle className="text-display-md text-foreground">{project.title}</DialogTitle>
            {hasMultipleImages ? (
              <div className="flex flex-col items-end gap-2">
                <span className="font-code text-body-sm text-muted-foreground">
                  <span className="text-primary/90">{current + 1}</span> / {images.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {images.map((image, index) => (
                    <button
                      aria-current={index === current ? "true" : undefined}
                      aria-label={`Go to image ${index + 1}`}
                      className="flex h-6 items-center"
                      key={image.asset?._id ?? `${project._id}-dot-${index}`}
                      onClick={() => api?.scrollTo(index)}
                      type="button"
                    >
                      <span
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          index === current ? "w-9 bg-primary" : "w-6 bg-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto md:flex md:overflow-hidden">
          <div className="flex flex-1 flex-col gap-8 p-6 md:min-h-0 md:overflow-y-auto">
            {description}

            {highlights.length > 0 ? (
              <section className="flex flex-col gap-3">
                <p className="font-semibold text-body-xs text-muted-foreground uppercase">Highlights</p>
                <ul className="flex flex-col gap-3">
                  {highlights.map((highlight) => (
                    <li className="flex items-start gap-3 text-body-sm" key={highlight.id}>
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckIcon className="size-3 text-primary" />
                      </span>
                      {highlight.content}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {technologies.length > 0 ? (
              <section className="flex flex-col gap-3">
                <p className="font-semibold text-body-xs text-muted-foreground uppercase">Tech stack</p>
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

          <aside className="flex shrink-0 flex-col gap-3 border-border border-t bg-sidebar p-6 md:w-48 md:border-t-0 md:border-l">
            <p className="font-semibold text-body-xs text-muted-foreground uppercase">Links</p>
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
