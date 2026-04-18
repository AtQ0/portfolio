"use client";
import { resolveRichTextOrTextFallback } from "@/lib/richTextResolver";
import type { ProjectsBlock } from "@/types/storyblok";
import {
  mergeCmsProjectsWithFallbacks,
  FALLBACK_PROJECTS,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { Carousel } from "@/components/ui/Carousel";
import Image from "next/image";

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

  const slides = mergeCmsProjectsWithFallbacks(
    blok.projects,
    FALLBACK_PROJECTS,
  );

  console.log("slides", slides);

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
        <div>
          <Carousel
            className="gap-10"
            classesControls="bg-red-500"
            classesSlide="bg-green-500 h-[300px] flex flex-col items-center justify-center"
            items={slides}
            controlsPosition="top"
            perView={1}
            spacing={15}
            options={{
              breakpoints: {
                "(max-width: 501px)": {
                  slides: { perView: 1, spacing: 12 },
                },
                "(min-width: 640px)": {
                  slides: { perView: 1.5, spacing: 16 },
                },
                "(min-width: 1024px)": {
                  slides: { perView: 3, spacing: 24 },
                },
              },
            }}
            renderSlide={(slide) => (
              <article
                key={slide.key}
                className="h-full w-full rounded-2xl bg-[#D9D9D9]"
              >
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
