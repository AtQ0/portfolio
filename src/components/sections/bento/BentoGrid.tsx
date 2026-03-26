import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type {
  BentoBlock,
  IntroCard,
  ServicesCard,
  TechStackCard,
  TestimonialsCard,
} from "@/types/storyblok";
import ClientLogos from "./ClientLogos";
import { getBgClass } from "@/lib/cmsTheme";
import { StoryblokRichText } from "@storyblok/react";
import { GlowButton } from "@/components/ui/GlowButton";

type BentoGridProps = {
  blok: BentoBlock;
  ctaTarget: string;
};

export default function BentoGrid({ blok, ctaTarget }: BentoGridProps) {
  // Type the sections array in blok
  const introCardBlok = blok.sections?.find(
    (s): s is IntroCard => s.component === "IntroCard",
  );

  const testimonialsCardBlok = blok.sections?.find(
    (s): s is TestimonialsCard => s.component === "TestimonialsCard",
  );

  const techStackCardBlok = blok.sections?.find(
    (s): s is TechStackCard => s.component === "TechStackCard",
  );

  const servicesCardBlok = blok.sections?.find(
    (s): s is ServicesCard => s.component === "ServicesCard",
  );

  // Get background classs
  const bgBlockBento = blok.background ?? "bg-primary";
  const bgIntroCard = introCardBlok?.background ?? "bg-secondary";

  // Fallsback for text from CMS
  const FALLBACK_HEADLINE =
    "Fullstack developer with over 2+ years of experience building end-to-end applications across the entire stack.";
  const FALLBACK_DESCRIPTION =
    "If you are looking to start a new web project get in touch to discuss your requirements with me in more detail.";
  const FALLBACK_CTA_LINK = "mail@atkobabic.com";
  const FALLBACK_CTA_TEXT = "Say hello";
  const headline = introCardBlok?.headline ?? FALLBACK_HEADLINE;
  const description = introCardBlok?.description;
  const ctaLink = introCardBlok?.ctaLink ?? FALLBACK_CTA_LINK;
  const ctaText = introCardBlok?.ctaText ?? FALLBACK_CTA_TEXT;

  console.log("blok", blok);

  console.log("bgIntroCard", bgIntroCard);

  return (
    <section
      id={ctaTarget}
      className={cn(
        "gap-gutter-md flex flex-col py-25 lg:py-40",
        getBgClass(bgBlockBento, "bg-primary"),
      )}
    >
      <div className="p-gutter grid grid-cols-1 gap-4 py-0 lg:grid-cols-3">
        <Card className={cn("", getBgClass(bgIntroCard, "bg-secondary"))}>
          <CardHeader className="text-light-coral text-[24px] font-medium">
            {headline}
          </CardHeader>
          <CardContent>
            <div className="text-fg-secondary">
              {description ? (
                <StoryblokRichText doc={description} />
              ) : (
                FALLBACK_DESCRIPTION
              )}
            </div>

            <div>
              <GlowButton type="button" asChild>
                <a href={`mailto:${ctaLink}`}>{ctaText}</a>
              </GlowButton>
            </div>
          </CardContent>
        </Card>
        <Card>TESTIMONIALS</Card>
        <div className="grid grid-rows-2 gap-4">
          <Card className="w-full">TECH STACK</Card>
          <Card className="w-full">SERVICES</Card>
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
