"use client";

import { resolveRichTextOrTextFallback } from "@/lib/richTextResolver";
import type { ProjectsBlock } from "@/types/storyblok";
import {
  mergeCmsProjectsWithFallbacks,
  FALLBACK_PROJECTS,
  type ResolvedProjectSlide,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { Carousel } from "@/components/ui/Carousel";
import Image from "next/image";
import { useCallback, useMemo } from "react";

type ProjectsProps = {
  blok: ProjectsBlock;
};

const FALLBACK_HEADLINE = "Projects";
const FALLBACK_TEXT = `I’ve been helping brands realize their online potential
from small and medium sized enterprises to large corporate entities,
as a solo developer or as part of a larger team.`;

export default function Projects({ blok }: ProjectsProps) {
  const background = blok.background ?? "bg-primary";
  const headline = blok.headline?.trim() || FALLBACK_HEADLINE;
  const resolvedText = resolveRichTextOrTextFallback(blok.text, FALLBACK_TEXT);

  const slides = useMemo(
    () => mergeCmsProjectsWithFallbacks(blok.projects, FALLBACK_PROJECTS),
    [blok.projects],
  );

  const getSlideKey = useCallback(
    (slide: ResolvedProjectSlide) => slide.key,
    [],
  );

  return (
    <section
      className={cn(
        "px-gutter flex flex-col gap-7 overflow-hidden py-[calc(var(--spacing-gutter)*3)] md:py-[calc(var(--spacing-gutter)*2)]",
        getBgClass(background, "bg-primary"),
      )}
    >
      <h2 className="text-40 md:text-48 text-fg-primary">{headline}</h2>

      <div className="flex flex-col gap-20">
        <div className="text-fg-secondary text-18 pretty max-w-[40ch]">
          {resolvedText.kind === "richtext" ? (
            <StoryblokRichText doc={resolvedText.doc} />
          ) : (
            <p>{resolvedText.text}</p>
          )}
        </div>
        <div className="w-full">
          <Carousel
            className="w-full gap-10"
            classesSlide="min-h-0"
            getItemKey={getSlideKey}
            items={slides}
            controlsPosition="top"
            options={{
              mode: "free-snap",
              defaultAnimation: { duration: 850 },
              slides: {
                perView: 1,
                spacing: 16,
              },
              breakpoints: {
                "(min-width: 768px)": {
                  slides: { perView: 2, spacing: 16 },
                },
                "(min-width: 1024px)": {
                  slides: { perView: 3, spacing: 16 },
                },
                "(min-width: 1280px)": {
                  slides: { perView: 4, spacing: 16 },
                },
              },
            }}
            renderSlide={(slide) => (
              <article className="flex h-[550px] w-full min-w-0 flex-col bg-[#D9D9D9] md:h-[418px]">
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block min-h-0 flex-1 overflow-hidden rounded-xl"
                >
                  <Image
                    src={slide.media}
                    alt={slide.headline}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </a>

                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block w-fit"
                >
                  <h3 className="text-fg-primary text-20 md:text-24">
                    {slide.headline}
                  </h3>
                </a>
              </article>
            )}
          />
        </div>
      </div>
    </section>
  );
}
