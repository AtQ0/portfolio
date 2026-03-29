"use client";

import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon, Circle } from "lucide-react";
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
    <Card>
      {/* SLIDER */}
      <ul>
        {slides.map((slide) => (
          <li key={slide.key}>
            <figure>
              <blockquote>
                {"quoteDoc" in slide ? (
                  <StoryblokRichText doc={slide.quoteDoc} />
                ) : (
                  <p>{slide.fallbackQuote}</p>
                )}
              </blockquote>

              <figcaption className="flex flex-col">
                <cite>{slide.authorName}</cite>
                <span>{slide.authorPosition}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* NAVIGATION */}
      <div className="flex items-center justify-between">
        <div>
          {slides.map((slide, index) => (
            <button key={slide.key} type="button">
              <span className="sr-only">Go to item {index + 1}</span>
              <span>
                <Circle className="text-fg-primary bg-bg-tertiary size-3 rounded-full" />
              </span>
            </button>
          ))}
        </div>

        <div>
          <button type="button" className="cursor-pointer">
            <span className="sr-only">Go to previous item</span>
            <ChevronLeftIcon className="text-fg-secondary size-6" />
          </button>

          <button type="button" className="cursor-pointer">
            <span className="sr-only">Go to next item</span>
            <ChevronRightIcon className="text-fg-secondary size-6" />
          </button>
        </div>
      </div>
    </Card>
  );
}
