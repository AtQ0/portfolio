"use client";
import { HeroBlock } from "@/types/storyblok";
import AvailabilityBadge from "../ui/AvailabilityBadge";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

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

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  const headlineWords = headline.split(" ");

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      // Animate right column from offscreen
      if (isDesktop && imageColRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          imageColRef.current,
          { xPercent: 100, autoAlpha: 0 },
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0,
        );

        // Animate headline characters
        tl.fromTo(
          chars,
          { y: 8, autoAlpha: 0, rotate: -5 },
          {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.75,
            stagger: 0.025,
            ease: "power2.out",
          },
          0.1,
        );
      } else {
        // Non-desktop: only animate characters
        gsap.fromTo(
          chars,
          { y: 8, autoAlpha: 0, rotate: -5 },
          {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.75,
            stagger: 0.025,
            ease: "power2.out",
          },
        );
      }
    }, sectionRef); // scoped GSAP context for safer cleanup

    // context-based cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg-secondary grid w-full overflow-hidden lg:grid-cols-2"
    >
      <div className="p-gutter flex h-screen flex-col justify-between">
        {/* Content */}
        <AvailabilityBadge isOpen={isOpen} closedText={closedText} />

        <div className="@container/hero-content">
          <h1
            className="text-fluid-36-64 max-w-[18ch] font-light text-pretty"
            ref={headingRef}
            aria-label={
              headline?.trim() ||
              "Crafted experiences, designed to be beautiful and built to last."
            }
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
          <div>
            <p>
              I’m a freelance web designer and developer building with modern
              web technologies from my studio in Sweden.
            </p>
          </div>
        </div>
        <div>
          <p>FOOTNOTE</p>
        </div>
      </div>

      {/* Profile image */}
      <div ref={imageColRef} className="bg-bg-primary w-full">
        {/* image here */}
      </div>
    </section>
  );
}
