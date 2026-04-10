import type { StoryblokRichText } from "@/types/storyblok";

type RichTextNode = {
  type?: string;
  text?: string;
  content?: RichTextNode[];
};

type RichTextDoc = {
  type?: string;
  content?: RichTextNode[];
};

export function hasRichTextContent(
  doc: StoryblokRichText | null | undefined,
): doc is StoryblokRichText {
  const candidate = doc as RichTextDoc | null | undefined;
  if (!candidate?.content?.length) return false;

  const stack = [...candidate.content];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;

    if (node.type === "text" && node.text?.trim()) return true;
    if (node.content?.length) stack.push(...node.content);
  }

  return false;
}
