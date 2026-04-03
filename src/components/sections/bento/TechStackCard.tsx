import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TechStackCard as TechStackCardBlok } from "@/types/storyblok";
import Image from "next/image";

type TechStackCardProps = {
  blok?: TechStackCardBlok;
};

const FALLBACK_HEADLINE = "Web development";
const FALLBACK_TEXT =
  "I’m a freelance fullstack developer focusing on modern web technologies.";

export default function TechStackCard({ blok }: TechStackCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline ?? FALLBACK_HEADLINE;
  const text = blok?.text;
  console.log(blok);
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
        {/* rich text */}
        <div className="text-fg-secondary">
          {text ? <StoryblokRichText doc={text} /> : <p>{FALLBACK_TEXT}</p>}
        </div>

        {/* marquee row */}
        <div>
          {blok?.tech_items?.length ? (
            <ul className="flex flex-wrap gap-2">
              {blok.tech_items.map((item) => (
                <li key={item._uid}>
                  {item.icon?.filename ? (
                    <Image
                      src={item.icon.filename}
                      alt={item.icon.alt ?? ""}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
