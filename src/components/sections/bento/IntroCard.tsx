import { cn } from "@/lib/utils";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { GlowButton } from "@/components/ui/GlowButton";
import { DateDisplay } from "@/components/ui/date-time/DateDisplay";
import { Clock } from "@/components/ui/date-time/Clock";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { IntroCard as IntroCardBlok } from "@/types/storyblok";

type IntroCardProps = {
  blok?: IntroCardBlok;
};

const FALLBACK_HEADLINE =
  "Fullstack developer with 2+ years of experience building thoughtful, well-crafted web applications built to last.";
const FALLBACK_DESCRIPTION =
  "If you are looking to start a new web project get in touch to discuss your requirements with me in more detail.";
const FALLBACK_CTA_LINK = "mail@atkobabic.com";
const FALLBACK_CTA_TEXT = "Say hello";

export default function IntroCard({ blok }: IntroCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline ?? FALLBACK_HEADLINE;
  const description = blok?.description;
  const ctaLink = blok?.ctaLink?.trim() || FALLBACK_CTA_LINK;
  const ctaText = (blok?.ctaText?.trim() || FALLBACK_CTA_TEXT) as string;

  return (
    <Card
      className={cn(
        "flex flex-col gap-9",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <div className="text-14 flex max-w-[40ch] flex-col gap-4">
        <CardHeader className="text-light-coral font-regular text-[24px]">
          <h2>{headline}</h2>
        </CardHeader>

        <CardContent className="flex flex-col">
          <div className="text-fg-secondary">
            {description ? (
              <StoryblokRichText doc={description} />
            ) : (
              <p>{FALLBACK_DESCRIPTION}</p>
            )}
          </div>
        </CardContent>
      </div>

      <div className="gap-gutter flex flex-col">
        <GlowButton
          innerClassName="text-[14px] font-medium px-8 py-3"
          className="w-fit"
          type="button"
          asChild
        >
          <a href={`mailto:${ctaLink}`}>{ctaText}</a>
        </GlowButton>

        <CardFooter className="flex w-fit flex-col items-start">
          <DateDisplay className="text-18 text-fg-secondary" />
          <Clock className="text-30 text-fg-primary" />
        </CardFooter>
      </div>
    </Card>
  );
}
