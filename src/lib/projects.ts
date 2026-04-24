import type { ProjectItem, StoryblokRichText } from "@/types/storyblok";
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
    headline: "Park Ping",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/parkping.jpg",
    link: "https://github.com/callepersson-lab/parkping/pull/9",
  },
  {
    id: "fallback-2",
    headline: "MovieDB",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/moviedb.jpg",
    link: "https://github.com/AtQ0/moviedb-react-angular-aspnet",
  },
  {
    id: "fallback-3",
    headline: "Book Tracker",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/booktracker.jpg",
    link: "https://github.com/AtQ0/book-tracker",
  },
  {
    id: "fallback-4",
    headline: "15 Puzzle Game",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/gaming.jpg",
    link: "https://atq0.github.io/15-puzzle-game/",
  },
  {
    id: "fallback-5",
    headline: "E-commerce",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    media: "/images/projects/e-commerce.jpg",
    link: "https://github.com/AtQ0",
  },
] as const satisfies readonly FallbackProject[];

export type ResolvedProjectSlide = {
  key: string;
  headline: string;
  description: string | StoryblokRichText;
  media: string;
  link: string;
};

function getMediaUrl(row: ProjectItem | undefined): string {
  const filename = row?.media?.filename;
  return typeof filename === "string" ? filename.trim() : "";
}

function getLinkUrl(row: ProjectItem | undefined): string {
  const link = row?.link;
  if (!link || typeof link !== "object") return "";

  const cached =
    typeof link.cached_url === "string" ? link.cached_url.trim() : "";
  const direct = typeof link.url === "string" ? link.url.trim() : "";

  return cached || direct;
}

function isCompleteCmsProject(
  row: ProjectItem | undefined,
): row is ProjectItem & {
  media: NonNullable<ProjectItem["media"]>;
  link: NonNullable<ProjectItem["link"]>;
} {
  if (!row?._uid) return false;

  const hasMediaUrl = Boolean(getMediaUrl(row));
  const hasLinkUrl = Boolean(getLinkUrl(row));

  return hasMediaUrl && hasLinkUrl;
}

export function mergeCmsProjectsWithFallbacks(
  cms: ProjectItem[] | undefined,
  fallbacks: readonly FallbackProject[],
): ResolvedProjectSlide[] {
  return fallbacks.map((fb, index) => {
    const row = cms?.[index];

    if (isCompleteCmsProject(row)) {
      const richDescription = hasRichTextContent(row.description)
        ? row.description
        : fb.description;

      return {
        key: row._uid,
        headline: row.headline?.trim() || fb.headline,
        description: richDescription,
        media: getMediaUrl(row),
        link: getLinkUrl(row),
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
