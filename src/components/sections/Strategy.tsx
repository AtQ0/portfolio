import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import type { StrategyBlock } from "@/types/storyblok";
import { StoryblokRichText } from "@storyblok/react";
import { resolveRichTextOrTextFallback } from "@/lib/richTextResolver";

type StrategyProps = {
  blok: StrategyBlock;
};

const FALLBACK_HEADLINE = "Strategy";
const FALLBACK_TEXT = `
I build websites that are fast, accessible, and made to last.
Using modern web technologies and standards, I make sure they work smoothly across all browsers and devices.

Whether it’s a marketing site, an MVP for a new idea, or a custom web app,
I design and develop with a focus on performance and usability.
`;

export default function Strategy({ blok }: StrategyProps) {
  const background = blok.background ?? "bg-secondary";
  const headline = blok.headline?.trim() || FALLBACK_HEADLINE;

  // Normalize CMS rich text once; keep render branch simple.
  const resolvedText = resolveRichTextOrTextFallback(blok.text, FALLBACK_TEXT);

  return (
    <section
      className={cn(
        "px-gutter flex flex-col gap-7 py-[calc(var(--spacing-gutter)*3)] md:gap-10 md:py-[calc(var(--spacing-gutter)*2)] lg:gap-13",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <h2 className="text-fg-secondary max-w-[18ch] text-2xl text-pretty">
        {headline}
      </h2>
      <div className="text-fg-secondary text-fluid-30-56 [&_p+p]:mt-10">
        {resolvedText.kind === "richtext" ? (
          <StoryblokRichText doc={resolvedText.doc} />
        ) : (
          <p>{resolvedText.text}</p>
        )}
      </div>
    </section>
  );
}
