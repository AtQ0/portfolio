"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import type { StrategyBlock } from "@/types/storyblok";
import { resolveRichTextOrTextFallback } from "@/lib/richTextResolver";
import SplitText from "@/components/ui/SplitText";
import { useStrategyCharScroll } from "@/hooks/useStrategyCharScroll";

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

type RichTextNode = {
  type?: string;
  text?: string;
  content?: RichTextNode[];
};

// “flattens” a richtext subtree into a normal string.
function nodeToText(node: RichTextNode): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hard_break") return "\n";
  if (!node.content?.length) return "";
  return node.content.map(nodeToText).join("");
}

// Extract top-level richtext paragraphs and flatten each to plain text.
function getParagraphsFromStoryblok(doc: unknown): string[] {
  const root = doc as RichTextNode | undefined;
  if (!root?.content?.length) return [];

  return root.content
    .filter((n) => n.type === "paragraph")
    .map((p) => nodeToText(p).trim())
    .filter(Boolean);
}

export default function Strategy({ blok }: StrategyProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const background = blok.background ?? "bg-secondary";
  const headline = blok.headline?.trim() || FALLBACK_HEADLINE;
  const resolvedText = resolveRichTextOrTextFallback(blok.text, FALLBACK_TEXT);

  const paragraphs =
    resolvedText.kind === "richtext"
      ? getParagraphsFromStoryblok(resolvedText.doc)
      : resolvedText.text
          .trim()
          .split(/\n\s*\n/)
          .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
          .filter(Boolean);

  useStrategyCharScroll({
    sectionRef,
    charsSelector: ".strategy-char",
    fromColor: "var(--color-fg-secondary)",
    toColor: "var(--color-fg-primary)",
    start: "top 38%", // start the animation when the section is XX% visible
    end: "bottom 75%", // end the animation when the section is XX% visible
    catchUpDuration: 0.75, // delay between the scroll and the animation
    featherChars: 1.25, // soft edge width in characters
    minEdgeOpacity: 0.4, // opacity at the very boundary on active side
  });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "px-gutter flex flex-col gap-7 py-[calc(var(--spacing-gutter)*3)] md:gap-10 md:py-[calc(var(--spacing-gutter)*2)] lg:gap-13",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <h2 className="text-fg-secondary max-w-[18ch] text-2xl text-pretty">
        {headline}
      </h2>

      <div
        data-strategy-text
        className="text-fg-secondary text-fluid-30-56 font-light [&_p+p]:mt-10"
      >
        {paragraphs.map((paragraph, i) => (
          <p key={`strategy-p-${i}`} aria-label={paragraph}>
            <SplitText text={paragraph} charClassName="strategy-char" />
          </p>
        ))}
      </div>
    </section>
  );
}
