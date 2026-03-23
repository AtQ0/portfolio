export type StoryblokRichText = {
  type: "doc";
  content?: unknown[];
};

export type StoryblokAsset = {
  id?: number;
  alt?: string;
  name?: string;
  title?: string;
  filename?: string;
  focus?: string;
  [key: string]: unknown;
};

export type HeroBlock = {
  background: "bg-primary" | "bg-secondary";
  component: "block_hero";
  cta?: string;
  footnote?: StoryblokRichText;
  headline?: string;
  media?: StoryblokAsset;
  signal?: boolean;
  signal_closed_text?: string;
  text?: StoryblokRichText;
  _uid: string;
  _editable?: string;
};

export type UnknownBlock = {
  _uid: string;
  component: string;
  [key: string]: unknown;
};

export type PageContent = {
  _uid: string;
  _editable?: string;
  component: "page";
  body?: Array<HeroBlock | UnknownBlock>;
};

export const isHeroBlock = (
  block: HeroBlock | UnknownBlock,
): block is HeroBlock => block.component === "block_hero";
