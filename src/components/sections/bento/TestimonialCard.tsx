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

type TestimonialCardProps = {
  blok?: TestimonialsCardBlok;
};

export default function TestimonialCard({ blok }: TestimonialCardProps) {
  const slides = mergeCmsTestimonialsWithFallbacks(
    blok?.testimonials,
    FALLBACK_TESTIMONIALS,
  );

  return (
    <Card
      className={cn(
        "col-span-1 min-[800px]:max-[1199px]:order-1 min-[800px]:max-[1199px]:col-span-2 min-[1200px]:col-start-2",
        "overflow-x-hidden bg-white px-6 py-6 md:px-10 md:py-10",
      )}
    >
      <Carousel
        items={slides}
        controlsPosition="bottom"
        perView={1}
        spacing={40}
        renderSlide={(slide, _index, { progress: _progress }) => (
          <figure className="@container/testimonial flex h-full flex-col items-start justify-between bg-amber-700">
            <blockquote className="text-fg-secondary bg-pink-400">
              <div
                className={cn(
                  "max-w-[40ch] text-2xl text-pretty",
                  "@md/testimonial:text-[26px] @lg/testimonial:text-3xl",
                  "[&_p:not(:last-child)]:mb-4",
                )}
              >
                {"quoteDoc" in slide ? (
                  <StoryblokRichText doc={slide.quoteDoc} />
                ) : (
                  <p>{slide.fallbackQuote}</p>
                )}
              </div>
            </blockquote>

            <figcaption className="flex flex-col items-start bg-green-400">
              <cite className="text-fg-secondary block text-lg not-italic">
                {slide.authorName}
              </cite>
              <span className="block text-sm">{slide.authorPosition}</span>
            </figcaption>
          </figure>
        )}
      />
    </Card>
  );
}
