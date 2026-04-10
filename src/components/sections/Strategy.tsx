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
        "h-screen bg-pink-300",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <div className="p-gutter flex h-screen flex-col justify-between gap-10">
        <h2 className="text-fluid-36-64 max-w-[18ch] font-light text-pretty">
          {headline}
        </h2>
        <div className="text-fg-secondary">
          {resolvedText.kind === "richtext" ? (
            <StoryblokRichText doc={resolvedText.doc} />
          ) : (
            <p>{resolvedText.text}</p>
          )}
        </div>
      </div>
    </section>
  );
}
