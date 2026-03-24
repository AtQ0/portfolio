"use client";
import { HeroBlock } from "@/types/storyblok";
import AvailabilityBadge from "../ui/AvailabilityBadge";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { StoryblokRichText } from "@storyblok/react";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { GlowButton } from "../ui/GlowButton";

type HeroProps = {
  blok: HeroBlock;
};

export default function Hero({ blok }: HeroProps) {
  const isOpen = blok.signal ?? true;
  const closedText =
    blok.signal_closed_text?.trim() || "Unavailable for new projects";
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    sectionRef,
    headingRef,
    imageColRef,
    charsSelector: ".hero-char",
  });

  const headlineWords = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="bg-bg-secondary grid w-full overflow-hidden lg:grid-cols-2"
    >
      <div className="p-gutter flex h-screen flex-col justify-between gap-10">
        {/* Content */}
        <AvailabilityBadge isOpen={isOpen} closedText={closedText} />

        <div className="@container/hero-content my-auto flex flex-col gap-7">
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
          <div className="@md/hero-content:text-18 text-16 text-fg-secondary max-w-[32ch] min-[500px]:max-w-[40ch]">
            {hasBodyRichText && blok.text ? (
              <StoryblokRichText doc={blok.text} />
            ) : (
              <p>{fallbackBodyText}</p>
            )}
          </div>
          <div className="mt-3 w-fit">
            <GlowButton type="button" asChild>
              <a href="#about">{ctaLabel}</a>
            </GlowButton>
          </div>
        </div>
        <div className="richtext-links text-fg-secondary text-[12px] leading-[1.4]">
          {hasFootnoteRichText && blok.footnote ? (
            <StoryblokRichText doc={blok.footnote} />
          ) : (
            fallbackFootnote
          )}
        </div>
      </div>

      {/* Profile image */}
      <div ref={imageColRef} className="bg-bg-primary w-full">
        {/* image here */}
        IMAGE
      </div>
    </section>
  );
}
