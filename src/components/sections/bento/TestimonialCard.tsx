"use client";

import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";
import type { TestimonialsCard as TestimonialsCardBlok } from "@/types/storyblok";
import {
  FALLBACK_TESTIMONIALS,
  mergeCmsTestimonialsWithFallbacks,
} from "@/lib/testimonials";
import { StoryblokRichText } from "@storyblok/react";
import { getBgClass } from "@/lib/cmsTheme";

type TestimonialCardProps = {
  blok?: TestimonialsCardBlok;
};

export default function TestimonialCard({ blok }: TestimonialCardProps) {
  const slides = mergeCmsTestimonialsWithFallbacks(
    blok?.testimonials,
    FALLBACK_TESTIMONIALS,
  );
  const background = blok?.background ?? "bg-secondary";

  return (
    <Card
      className={cn(
        "col-span-1 min-[800px]:order-1 min-[800px]:col-span-2 min-[1200px]:col-span-1 min-[1200px]:col-start-2",
        "overflow-x-hidden px-6 py-6 md:px-14 md:py-10",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <Carousel
        items={slides}
        controlsPosition="bottom"
        perView={1}
        spacing={60}
        renderSlide={(slide) => (
          <figure className="@container/testimonial flex h-full min-h-[380px] flex-col items-start justify-between min-[500px]:min-h-[320px]">
            <blockquote className="text-fg-secondary">
              <div
                className={cn(
                  "max-w-[40ch] text-2xl text-pretty",
                  "@md/testimonial:text-[26px] @lg/testimonial:text-3xl",
                  "[&_p:not(:last-child)]:mb-4",
                  "[&_p]:text-fg-primary",
                )}
              >
                {"quoteDoc" in slide ? (
                  <StoryblokRichText doc={slide.quoteDoc} />
                ) : (
                  <p>{slide.fallbackQuote}</p>
                )}
              </div>
            </blockquote>

            <figcaption className="flex flex-col items-start pb-8">
              <cite className="text-fg-primary block text-lg not-italic">
                {slide.authorName}
              </cite>
              <span className="text-fg-secondary block text-sm">
                {slide.authorPosition}
              </span>
            </figcaption>
          </figure>
        )}
      />
    </Card>
  );
}
