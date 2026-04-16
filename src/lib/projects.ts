import type { ProjectItem } from "@/types/storyblok";
import { hasRichTextContent } from "@/lib/storyblokRichText";

export type FallbackProject = {
  id: string;
  headline: string;
  description: string;
  media: string;
  link: string;
};

export const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    headline: "Project 1",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/project-1.jpg",
    link: "https://trailsync.app",
  },
  {
    id: "fallback-2",
    headline: "Project 2",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/project-2.jpg",
    link: "https://northstar-studio.com",
  },
  {
    id: "fallback-3",
    headline: "Project 3",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/project-3.jpg",
    link: "https://lumaops.io",
  },
  {
    id: "fallback-4",
    headline: "Project 4",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/project-4.jpg",
    link: "https://fieldnote-cloud.com",
  },
  {
    id: "fallback-5",
    headline: "Project 5",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/project-5.jpg",
    link: "https://harborhq.dev",
  },
] as const satisfies readonly FallbackProject[];

export type ResolvedProjectSlide =
  | {
      key: string;
      headline: string;
      description: string;
      media: string;
      link: string;
    }
  | {
      key: string;
      headline: string;
      description: string;
      media: string;
      link: string;
    };

function isCompleteCmsProject(
  row: ProjectItem | undefined,
): row is ProjectItem & {
  headline: string;
  description: string;
  media: string;
  link: string;
} {
  if (!row?._uid) return false;
  if (
    !row.headline?.trim() ||
    !hasRichTextContent(row.description) ||
    !row.media?._uid ||
    !row.link?.trim()
  )
    return false;
  return true;
}

export function mergeCmsProjectsWithFallbacks(
  cms: ProjectItem[] | undefined,
  fallbacks: readonly FallbackProject[],
): ResolvedProjectSlide[] {
  return fallbacks.map((fb, index) => {
    const row = cms?.[index];

    if (isCompleteCmsProject(row)) {
      return {
        key: row._uid,
        headline: row.headline,
        description: row.description,
        media: row.media,
        link: row.link,
      };
    }

    return {
      key: fb.id,
      headline: fb.headline,
      description: fb.description,
      media: fb.media,
      link: fb.link,
    };
  });
}
