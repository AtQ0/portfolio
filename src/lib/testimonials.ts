import type { StoryblokRichText, TestimonialItem } from "@/types/storyblok";
import { hasRichTextContent } from "@/lib/storyblokRichText";

export type FallbackTestimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorPosition: string;
};

export const FALLBACK_TESTIMONIALS = [
  {
    id: "fallback-1",
    quote:
      "Atko consistently delivers high-quality work with a sharp analytical mindset. He’s proactive, thorough, and quick to learn, and a reliable fullstack developer who elevates any team.",
    authorName: "Petter Melin-Higgins",
    authorPosition: "Software Developer at Etraveli Group",
  },
  {
    id: "fallback-2",
    quote:
      "Collaborating with Atko is always smooth and productive. He brings a proactive, structured approach and strong fullstack skills, making complex features feel simple and well executed.",
    authorName: "Karina Sivolap",
    authorPosition: "People & Culture Manager at Humblebee",
  },
  {
    id: "fallback-3",
    quote:
      "Atko took on fullstack responsibilities, from database design to React components. He’s curious, independent, and collaborative, making him a strong addition to any team.",
    authorName: "Igor Vasiljevic",
    authorPosition: "Technical Lead at Etraveli Group",
  },
] as const satisfies readonly FallbackTestimonial[];

/* CMS rich text doc vs static fallback copy - mutually exclusive quote fields. */
export type ResolvedTestimonialSlide =
  | {
      key: string;
      quoteDoc: StoryblokRichText;
      authorName: string;
      authorPosition: string;
    }
  | {
      key: string;
      fallbackQuote: string;
      authorName: string;
      authorPosition: string;
    };

function isCompleteCmsTestimonial(
  row: TestimonialItem | undefined,
): row is TestimonialItem & {
  quote: NonNullable<TestimonialItem["quote"]>;
  authorName: string;
  authorPosition: string;
} {
  if (!row?._uid) return false;
  if (!row.authorName?.trim() || !row.authorPosition?.trim()) return false;
  if (!hasRichTextContent(row.quote)) return false;
  return true;
}

export function mergeCmsTestimonialsWithFallbacks(
  cms: TestimonialItem[] | undefined,
  fallbacks: readonly FallbackTestimonial[],
): ResolvedTestimonialSlide[] {
  return fallbacks.map((fb, index) => {
    const row = cms?.[index];

    if (isCompleteCmsTestimonial(row)) {
      return {
        key: row._uid,
        quoteDoc: row.quote,
        authorName: row.authorName,
        authorPosition: row.authorPosition,
      };
    }

    return {
      key: fb.id,
      fallbackQuote: fb.quote,
      authorName: fb.authorName,
      authorPosition: fb.authorPosition,
    };
  });
}
