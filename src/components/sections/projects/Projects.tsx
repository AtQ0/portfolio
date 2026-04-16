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
        "px-gutter flex h-screen flex-col gap-7 py-[calc(var(--spacing-gutter)*3)] md:py-[calc(var(--spacing-gutter)*2)]",
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
        <div className="bg-amber-500">
          <Carousel
            items={slides}
            controlsPosition="bottom"
            perView={1}
            spacing={60}
            renderSlide={(slide) => (
              <article key={slide.key} className="bg-[#D9D9D9] p-10">
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
