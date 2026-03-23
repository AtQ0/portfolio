"use client";
import { HeroBlock } from "@/types/storyblok";
import AvailabilityBadge from "../ui/AvailabilityBadge";

import { useLayoutEffect, useRef, useState } from "react";
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { y: 8, autoAlpha: 0, rotate: -5 },
      {
        y: 0,
        autoAlpha: 1,
        rotate: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: "power2.out",
        onStart: () => setReady(true),
      },
    );
  }, [headline]);

  if (!headline) return null;

  return (
    <section className="bg-bg-secondary grid w-full lg:grid-cols-2">
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
            {headline.split(" ").map((word, wi) => (
              <span key={wi} aria-hidden="true" className="inline-block">
                {word.split("").map((char, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                    aria-hidden="true"
                    className={cn(
                      "hero-char inline-block",
                      !ready && "opacity-0",
                    )}
                  >
                    {char}
                  </span>
                ))}
                {wi < headline.split(" ").length - 1 ? "\u00A0" : ""}
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
      <div className="bg-bg-primary w-full">
        {/* image here */}

        <p>Image</p>
      </div>
    </section>
  );
}
