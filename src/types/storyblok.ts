import type { StoryblokRichTextNode as SbRichTextNode } from "@storyblok/react";
import type { ReactElement } from "react";

export type PageContent = {
  body?: Array<
    | HeroBlock
    | BentoBlock
    | StrategyBlock
    | ProjectsBlock
    | FaqBlock
    | UnknownBlock
  >;
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
  sections?: Array<
    IntroCard | TestimonialsCard | TechStackCard | ServiceCard | ClientLogos
  >;
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
  title?: string;
  icon?: StoryblokAsset;
  stroke?: "fg-secondary" | "tea-green";
  _editable?: string;
  _uid: string;
};

export type ServiceCard = {
  animationSVG?: StoryblokAsset;
  background?: "bg-secondary" | "bg-quaternary";
  component: "ServiceCard";
  artworkSVG?: StoryblokAsset;
  overlayLabel?: string;
  headline?: string;
  text?: StoryblokRichText;
  _editable?: string;
  _uid: string;
};

export type ClientLogos = {
  background?: "bg-primary" | "bg-tertiary";
  component: "ClientLogos";
  client_logo_items?: Array<ClientLogoItem>;
  _editable?: string;
  _uid: string;
};

export type ClientLogoItem = {
  background?: "bg-primary" | "bg-tertiary";
  component: "ClientLogoItem";
  logo?: StoryblokAsset;
  link?: string;
  _editable?: string;
  _uid: string;
};

export type StrategyBlock = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "block_strategy";
  headline?: string;
  text?: StoryblokRichText;
  _editable?: string;
  _uid: string;
};

export type ProjectsBlock = {
  background?: "bg-primary" | "bg-tertiary";
  component: "block_projects";
  headline?: string;
  text?: StoryblokRichText;
  projects?: ProjectItem[];
  _editable?: string;
  _uid: string;
};

export type StoryblokMultilink = {
  id?: string;
  url?: string;
  cached_url?: string;
  linktype?: "url" | "story" | "asset" | "email";
  fieldtype?: "multilink";
  [key: string]: unknown;
};

export type ProjectItem = {
  headline?: string;
  description?: StoryblokRichText;
  media?: StoryblokAsset;
  link?: StoryblokMultilink;
  _editable?: string;
  _uid: string;
};

export type FaqBlock = {
  background?: "bg-secondary" | "bg-quaternary";
  component: "block_faq";
  questions?: FaqQuestion[];
  _editable?: string;
  _uid: string;
};

type FaqQuestion = {
  _uid: string;
  component: "faqQuestion";
  question: string;
  answer: StoryblokRichText;
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

export const isStrategyBlock = (
  block: StrategyBlock | UnknownBlock,
): block is StrategyBlock => block.component === "block_strategy";

export const isProjectsBlock = (
  block: ProjectsBlock | UnknownBlock,
): block is ProjectsBlock => block.component === "block_projects";

export const isFaqBlock = (block: FaqBlock | UnknownBlock): block is FaqBlock =>
  block.component === "block_faq";
