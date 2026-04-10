import type { ReactNode } from "react";
import type { StoryblokRichText } from "@/types/storyblok";
import { hasRichTextContent } from "@/lib/storyblokRichText";

export type ResolvedRichTextTextFallback =
  | { kind: "richtext"; doc: StoryblokRichText }
  | { kind: "fallbackText"; text: string };

export type ResolvedRichTextNodeFallback =
  | { kind: "richtext"; doc: StoryblokRichText }
  | { kind: "fallbackNode"; node: ReactNode };

export function resolveRichTextOrTextFallback(
  doc: StoryblokRichText | undefined,
  fallbackText: string,
): ResolvedRichTextTextFallback {
  if (hasRichTextContent(doc)) {
    return { kind: "richtext", doc };
  }
  return { kind: "fallbackText", text: fallbackText };
}

export function resolveRichTextOrNodeFallback(
  doc: StoryblokRichText | undefined,
  fallbackNode: ReactNode,
): ResolvedRichTextNodeFallback {
  if (hasRichTextContent(doc)) {
    return { kind: "richtext", doc };
  }
  return { kind: "fallbackNode", node: fallbackNode };
}
