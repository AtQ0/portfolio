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
import { useCallback, useEffect, useMemo, useState } from "react";

type ProjectsProps = {
  blok: ProjectsBlock;
};

export default function Projects({ blok }: ProjectsProps) {
  const background = blok.background ?? "bg-primary";
  const headline = blok.headline?.trim() || "Projects";
  const resolvedText = resolveRichTextOrTextFallback(
    blok.text,
    `I’ve been helping brands realize their online potential
from small and medium sized enterprises to large corporate entities,
as a solo developer or as part of a larger team.`,
  );

  const slides = useMemo(
    () => mergeCmsProjectsWithFallbacks(blok.projects, FALLBACK_PROJECTS),
    [blok.projects],
  );

  console.log("projects blok: ", blok.projects);
  console.log("slides: ", slides);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // safe browser-only debug
    const imgs = Array.from(document.querySelectorAll('img[data-nimg="fill"]'));
    console.log("img count", imgs.length);
  }, []);

  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

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
              slides: { perView: 1, spacing: 24 },
              breakpoints: {
                "(min-width: 768px)": { slides: { perView: 2, spacing: 24 } },
                "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
                "(min-width: 1280px)": { slides: { perView: 4, spacing: 24 } },
              },
            }}
            renderSlide={(slide, index) => {
              const fallbackMedia =
                FALLBACK_PROJECTS[index]?.media ?? FALLBACK_PROJECTS[0].media;
              const imageSrc = failedSlides[index]
                ? fallbackMedia
                : slide.media;

              return (
                <article className="flex h-[500px] w-full min-w-0 flex-col transition-transform duration-300 ease-out hover:scale-[0.98] md:h-[450px]">
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block min-h-0 flex-1 overflow-hidden rounded-md"
                  >
                    <Image
                      src={imageSrc}
                      alt={slide.headline}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-100"
                      onError={() =>
                        setFailedSlides((prev) =>
                          prev[index] ? prev : { ...prev, [index]: true },
                        )
                      }
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
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
