import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TechStackCard as TechStackCardBlok } from "@/types/storyblok";
import { TechStackItemIcon } from "./TechStackItemIcon";
import { Marquee } from "@/components/ui/Marquee";
import { resolveRichTextOrTextFallback } from "@/lib/richTextResolver";

type TechStackCardProps = {
  blok?: TechStackCardBlok;
};

const FALLBACK_HEADLINE = "Web development";
const FALLBACK_TEXT =
  "I’m a freelance fullstack developer focusing on modern web technologies.";

export default function TechStackCard({ blok }: TechStackCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline?.trim() ?? FALLBACK_HEADLINE;
  const resolvedText = resolveRichTextOrTextFallback(blok?.text, FALLBACK_TEXT);

  return (
    <Card
      className={cn(
        "flex w-full flex-col gap-2",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <CardHeader>
        <h2 className="text-fg-primary font-regular text-[18px]">{headline}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <div className="text-fg-secondary">
          {resolvedText.kind === "richtext" ? (
            <StoryblokRichText doc={resolvedText.doc} />
          ) : (
            <p>{resolvedText.text}</p>
          )}
        </div>

        {/* Negative margin to bleed the marquee past the edges */}
        <div className="-mx-6">
          {blok?.tech_items?.length ? (
            <Marquee
              loopSeamClassName="pe-3"
              durationSeconds={35}
              className="marquee-fade"
            >
              <ul className="flex shrink-0 flex-nowrap gap-3">
                {blok.tech_items.map((item) => (
                  <li
                    key={item._uid}
                    className={cn(
                      "bg-bg-primary rounded-sm border border-white/40 p-2",
                      "transition-[border-color] duration-200",
                      "hover:border-fg-primary",
                    )}
                  >
                    <TechStackItemIcon item={item} />
                  </li>
                ))}
              </ul>
            </Marquee>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
