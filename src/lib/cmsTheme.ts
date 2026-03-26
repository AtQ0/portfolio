export type CmsBg =
  | "bg-primary"
  | "bg-secondary"
  | "bg-tertiary"
  | "bg-quaternary";

const BG_CLASS: Record<CmsBg, string> = {
  "bg-primary": "bg-bg-primary",
  "bg-secondary": "bg-bg-secondary",
  "bg-tertiary": "bg-bg-tertiary",
  "bg-quaternary": "bg-bg-quaternary",
};

/**
 * Resolve a CMS background token to a Tailwind class.
 *
 * @param bg - incoming value from Storyblok
 * @param fallback - section-specific default if bg is missing
 */

export function getBgClass(
  bg: CmsBg | undefined,
  fallback: CmsBg = "bg-primary",
): string {
  return BG_CLASS[bg ?? fallback];
}
