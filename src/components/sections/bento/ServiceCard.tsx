"use client";

import Image from "next/image";
import { StoryblokRichText } from "@storyblok/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBgClass } from "@/lib/cmsTheme";
import { cn } from "@/lib/utils";
import { useServiceOverlayAnimation } from "@/hooks/useServiceOverlayAnimation";
import type { ServiceCard as ServiceCardBlok } from "@/types/storyblok";

type ServiceCardProps = {
  blok?: ServiceCardBlok;
};

const FALLBACK_HEADLINE = "Web design";
const FALLBACK_TEXT =
  "Using tools such as Figma I can create bespoke pixel-perfect web design.";
const FALLBACK_OVERLAY_LABEL = "Atko B.";
const FALLBACK_ARTWORK_SVG =
  "/icons/logotypes/atkobabic/logo-marked-light-coral.svg";
const OVERLAY_ICON = "/icons/logotypes/figma/figma-pointer.svg";
const POINTER_SIZE = 20;

export default function ServiceCard({ blok }: ServiceCardProps) {
  const background = blok?.background ?? "bg-secondary";
  const headline = blok?.headline?.trim() ?? FALLBACK_HEADLINE;
  const text = blok?.text;

  const artwork = blok?.artworkSVG;
  const artworkSrc = artwork?.filename ?? FALLBACK_ARTWORK_SVG;
  const artworkAlt = artwork?.alt ?? "";
  const overlayLabel = blok?.overlayLabel?.trim() ?? FALLBACK_OVERLAY_LABEL;

  const { containerRef, position, durationMs } = useServiceOverlayAnimation({
    pointerSize: POINTER_SIZE,
    minIntervalMs: 1000,
    maxIntervalMs: 3000,
    minDurationMs: 250,
    startDelayMs: 800,
  });

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

      <CardContent className="flex flex-col gap-6 md:gap-7">
        <div className="text-fg-secondary">
          {text ? <StoryblokRichText doc={text} /> : <p>{FALLBACK_TEXT}</p>}
        </div>

        <div ref={containerRef} className="relative mx-auto w-fit">
          <Image src={artworkSrc} alt={artworkAlt} width={150} height={150} />

          <div
            className="pointer-events-none absolute top-0 left-0 flex w-fit items-start gap-2 drop-shadow-md transition-transform ease-in-out"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              transitionDuration: `${durationMs}ms`,
            }}
          >
            <Image
              src={OVERLAY_ICON}
              alt=""
              width={POINTER_SIZE}
              height={POINTER_SIZE}
            />
            <span className="text-12 text-fg-tertiary mt-5 -ml-2 inline-block rounded-[4px] bg-[#f1e067] px-1.5 py-0 font-semibold">
              {overlayLabel}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
