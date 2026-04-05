import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TechStackCard as TechStackCardBlok } from "@/types/storyblok";
import { TechStackItemIcon } from "./TechStackItemIcon";

type TechStackCardProps = {
  blok?: TechStackCardBlok;
};

const FALLBACK_HEADLINE = "Web development";
const FALLBACK_TEXT =
  "I’m a freelance fullstack developer focusing on modern web technologies.";

export default function TechStackCard({ blok }: TechStackCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline?.trim() ?? FALLBACK_HEADLINE;
  const text = blok?.text;

  console.log(blok);
  console.log("tech_items", blok?.tech_items);
  console.log("first item", blok?.tech_items?.[0]);

  return (
    <Card
      className={cn(
        "flex w-full flex-col",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <CardHeader>
        <h2 className="text-fg-primary font-regular text-[18px]">{headline}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="text-fg-secondary">
          {text ? <StoryblokRichText doc={text} /> : <p>{FALLBACK_TEXT}</p>}
        </div>

        <div>
          {blok?.tech_items?.length ? (
            <ul className="flex flex-wrap gap-2">
              {blok.tech_items.map((item) => (
                <li
                  key={item._uid}
                  className="bg-bg-primary rounded-sm border border-white/40 p-2"
                >
                  <TechStackItemIcon item={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
