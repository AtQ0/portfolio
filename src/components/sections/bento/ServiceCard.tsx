import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBgClass } from "@/lib/cmsTheme";
import { cn } from "@/lib/utils";
import type { ServiceCard as ServicesCardBlok } from "@/types/storyblok";
import { StoryblokRichText } from "@storyblok/react";
import Image from "next/image";

type ServiceCardProps = {
  blok?: ServicesCardBlok;
};

const FALLBACK_HEADLINE = "Web design";
const FALLBACK_TEXT =
  "Using tools such as Figma I can create bespoke pixel-perfect web design.";
const FALLBACK_OVERLAY_LABEL = "Atko B.";
const FALLBACK_ARTWORK_SVG = "/icons/logotypes/logo-marked-light-coral.svg";

export default function ServiceCard({ blok }: ServiceCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline?.trim() ?? FALLBACK_HEADLINE;
  const text = blok?.text;
  const artwork = blok?.artworkSVG;
  const artworkSrc = artwork?.filename ?? FALLBACK_ARTWORK_SVG;
  const artworkAlt = artwork?.alt ?? "";
  const overlayLabel = blok?.overlayLabel?.trim() ?? FALLBACK_OVERLAY_LABEL;
  const overlayIcon = "icons/logotypes/figma-pointer.svg";

  console.log(blok);
  console.log("artwork", artwork);
  console.log("artworkSrc", artworkSrc);
  console.log("artworkAlt", artworkAlt);
  console.log("overlayLabel", overlayLabel);

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
        <div className="relative flex justify-center">
          <div>
            <Image src={artworkSrc} alt={artworkAlt} width={150} height={150} />
          </div>
          <div className="absolute right-0 bottom-[-10px] flex w-fit items-start gap-2 bg-pink-300 drop-shadow-md transition-transform ease-in-out">
            <Image src={overlayIcon} alt="" width={20} height={20} />
            <span className="bg-light-coral text-12 text-fg-tertiary mt-5 -ml-2 inline-block rounded-sm px-1.5 py-0 font-semibold">
              {overlayLabel}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
