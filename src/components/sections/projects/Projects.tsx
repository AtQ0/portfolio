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
              <article className="flex h-[418px] w-full min-w-0 flex-col items-center justify-center rounded-2xl bg-[#D9D9D9] p-2">
                <a href={slide.link} target="_blank" rel="noreferrer">
                  <Image
                    src={slide.media}
                    alt={slide.headline}
                    width={100}
                    height={100}
                  />
                </a>
                <a href={slide.link} target="_blank" rel="noreferrer">
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
