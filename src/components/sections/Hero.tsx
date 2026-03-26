"use client";
import type { HeroBlock } from "@/types/storyblok";
import AvailabilityBadge from "../ui/AvailabilityBadge";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { StoryblokRichText } from "@storyblok/react";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { GlowButton } from "../ui/GlowButton";
import Image from "next/image";
import { getBgClass } from "@/lib/cmsTheme";

type HeroProps = {
  blok: HeroBlock;
  ctaTarget: string;
};

export default function Hero({ blok, ctaTarget }: HeroProps) {
  const background = blok.background ?? "bg-secondary";
  const isOpen = blok.signal ?? true;
  const closedText =
    blok.signalClosedText?.trim() || "Unavailable for new projects";
  const headline =
    blok.headline?.trim() ||
    "Crafted experiences, designed to be beautiful and built to last.";

  const fallbackBodyText =
    "I’m a freelance fullstack developer building with modern web technologies from my studio in Sweden.";
  const hasBodyRichText =
    blok.text?.type === "doc" &&
    Array.isArray(blok.text.content) &&
    blok.text.content.length > 0;

  const ctaLabel = blok.cta?.trim() || "Find out more";

  const imageSrc =
    typeof blok.media?.filename === "string" ? blok.media.filename : null;
  const imageAlt =
    (typeof blok.media?.alt === "string" && blok.media.alt.trim()) ||
    (typeof blok.media?.title === "string" && blok.media.title.trim()) ||
    "Portrait image";

  const hasFootnoteRichText =
    blok.footnote?.type === "doc" &&
    Array.isArray(blok.footnote.content) &&
    blok.footnote.content.length > 0;

  const fallbackFootnote = (
    <>
      Find me at{" "}
      <a
        href="https://github.com/AtQ0"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:no-underline"
      >
        GitHub
      </a>{" "}
      and{" "}
      <a
        href="https://www.linkedin.com/in/atkobabic/"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:no-underline"
      >
        LinkedIn
      </a>
      .
      <br />
      Download my{" "}
      <a
        href="/files/resume-atko-babic.pdf"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:no-underline"
      >
        resume
      </a>{" "}
      (PDF 918kb)
    </>
  );

  const sectionRef = useRef<HTMLElement>(null);
  const availabilityBadgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const footnoteRef = useRef<HTMLDivElement>(null);
  const bodyTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Patch rendered footnote links: external links open in new tab.
  useEffect(() => {
    const root = footnoteRef.current;
    if (!root) return;
    const links = root.querySelectorAll<HTMLAnchorElement>("a");
    links.forEach((a) => {
      const href = a.getAttribute("href") ?? "";
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//");
      if (isExternal) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }, [blok.footnote]);

  // Hero animation
  useHeroAnimation({
    sectionRef,
    availabilityBadgeRef,
    headingRef,
    bodyTextRef,
    ctaRef,
    footnoteRef,
    imageOverlayRef,
    imageRef,
    charsSelector: ".hero-char",
  });

  const headlineWords = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "grid w-full overflow-hidden lg:grid-cols-2",
        getBgClass(background, "bg-secondary"),
      )}
    >
      {/* Left column */}
      <div className="p-gutter flex h-screen flex-col justify-between gap-10">
        {/* Availability badge */}
        <div ref={availabilityBadgeRef} className="hero-availability-badge">
          <AvailabilityBadge isOpen={isOpen} closedText={closedText} />
        </div>

        {/* Content container */}
        <div className="@container/hero-content my-auto flex flex-col gap-7">
          {/* Headline */}
          <h1
            className="text-fluid-36-64 max-w-[18ch] font-light text-pretty"
            ref={headingRef}
            aria-label={headline}
          >
            {headlineWords.map((word, wi) => (
              <span key={wi} aria-hidden="true" className="inline-block">
                {word.split("").map((char, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                    aria-hidden="true"
                    className={cn("hero-char inline-block")}
                  >
                    {char}
                  </span>
                ))}
                {wi < headlineWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          {/* Body text */}
          <div
            ref={bodyTextRef}
            className="@md/hero-content:text-18 text-16 hero-body-text text-fg-secondary max-w-[32ch] min-[500px]:max-w-[40ch]"
          >
            {hasBodyRichText && blok.text ? (
              <StoryblokRichText doc={blok.text} />
            ) : (
              <p>{fallbackBodyText}</p>
            )}
          </div>

          {/* CTA button */}
          <div ref={ctaRef} className="hero-cta mt-3 w-fit">
            <GlowButton type="button" asChild>
              {/* Hero CTA */}
              <a href={`#${ctaTarget}`}>{ctaLabel}</a>
            </GlowButton>
          </div>
        </div>

        {/* Footnote */}
        <div
          ref={footnoteRef}
          className="richtext-links hero-footnote text-fg-secondary text-[12px] leading-[1.4]"
        >
          {hasFootnoteRichText && blok.footnote ? (
            <StoryblokRichText doc={blok.footnote} />
          ) : (
            fallbackFootnote
          )}
        </div>
      </div>

      {/* Right column */}
      <div className="bg-bg-primary relative w-full overflow-hidden lg:max-h-screen">
        {/* Profile image */}
        {imageSrc ? (
          <Image
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            width={1000}
            height={1334}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
            priority
          />
        ) : (
          <div className="text-fg-secondary flex min-h-[320px] items-center justify-center">
            No image selected
          </div>
        )}

        {/* Profile image overlay */}
        <div
          ref={imageOverlayRef}
          className="bg-bg-secondary pointer-events-none absolute inset-0 z-10 block"
        />
      </div>
    </section>
  );
}
