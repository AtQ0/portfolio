import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBgClass } from "@/lib/cmsTheme";
import { cn } from "@/lib/utils";
import type { ServicesCard as ServicesCardBlok } from "@/types/storyblok";
import { StoryblokRichText } from "@storyblok/react";

type ServiceCardProps = {
  blok?: ServicesCardBlok;
};

const FALLBACK_HEADLINE = "Web design";
const FALLBACK_TEXT =
  "I offer a range of services to help you with your web development needs.";

export default function ServiceCard({ blok }: ServiceCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline?.trim() ?? FALLBACK_HEADLINE;
  const text = blok?.text;

  return (
    <Card
      className={cn(
        "flex w-full flex-col gap-2",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <CardHeader>
        <CardTitle className="text-fg-primary font-regular text-[18px]">
          <h2>{headline}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="text-fg-secondary">
          {text ? <StoryblokRichText doc={text} /> : <p>{FALLBACK_TEXT}</p>}
        </div>
        <div>IMAGE</div>
      </CardContent>
    </Card>
  );
}
