import type { StoryblokRichTextNode as SbRichTextNode } from "@storyblok/react";
import type { ReactElement } from "react";

export type PageContent = {
  body?: Array<HeroBlock | BentoBlock | UnknownBlock>;
  component: "page";
  _editable?: string;
  _uid: string;
};

export type HeroBlock = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "block_hero";
  cta?: string;
  ctaLink?: string;
  footnote?: StoryblokRichText;
  headline?: string;
  media?: StoryblokAsset;
  signal?: boolean;
  signalClosedText?: string;
  text?: StoryblokRichText;
  _uid: string;
  _editable?: string;
};

export type BentoBlock = {
  background?: "bg-primary" | "bg-tertiary";
  component: "block_bento";
  sections?: Array<IntroCard | TestimonialsCard | TechStackCard | ServicesCard>;
  _editable?: string;
  _uid: string;
};

export type IntroCard = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "IntroCard";
  ctaLink?: string;
  ctaText?: string;
  dateClock?: Array<DateClock>;
  description?: StoryblokRichText;
  headline?: string;
  _editable?: string;
  _uid: string;
};

export type DateClock = {
  component: "DateClock";
  dateFormat?: string;
  timeFormat?: string;
  timezone?: string;
  _editable?: string;
  _uid: string;
};

export type TestimonialsCard = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "TestimonialsCard";
  testimonials?: TestimonialItem[];
  _editable?: string;
  _uid: string;
};

export type TestimonialItem = {
  component: "TestimonialItem";
  quote?: StoryblokRichText;
  authorName?: string;
  authorPosition?: string;
  _editable?: string;
  _uid: string;
};

export type TechStackCard = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "TechStackCard";
  headline?: string;
  tech_items?: Array<TechItem>;
  text?: StoryblokRichText;
  _editable?: string;
  _uid: string;
};

export type TechItem = {
  background?: "bg-primary" | "bg-tertiary";
  component: "TechItem";
  icon?: StoryblokAsset;
  stroke?: "fg-secondary" | "tea-green";
  _editable?: string;
  _uid: string;
};

export type ServicesCard = {
  animationSVG?: StoryblokAsset;
  background?: "bg-secondary" | "bg-quaternary";
  component: "ServicesCard";
  headline?: string;
  text?: StoryblokRichText;
  _editable?: string;
  _uid: string;
};

export type StoryblokRichText = SbRichTextNode<ReactElement>;

export type StoryblokAsset = {
  alt?: string;
  copyright?: string;
  fieldtype?: string;
  filename?: string;
  focus?: string;
  id?: number;
  name?: string;
  source?: string;
  title?: string;
  [key: string]: unknown;
};

export type UnknownBlock = {
  _uid: string;
  component: string;
  [key: string]: unknown;
};

export const isHeroBlock = (
  block: HeroBlock | UnknownBlock,
): block is HeroBlock => block.component === "block_hero";

export const isBentoBlock = (
  block: BentoBlock | UnknownBlock,
): block is BentoBlock => block.component === "block_bento";
