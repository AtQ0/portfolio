"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";

type UseHeroAnimationParams = {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  imageColRef: RefObject<HTMLDivElement | null>;
  charsSelector?: string;
};

export function useHeroAnimation({
  sectionRef,
  headingRef,
  imageColRef,
  charsSelector = ".hero-char",
}: UseHeroAnimationParams) {
  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Scope character selection to this heading to avoid cross-section collisions.
      const chars = Array.from(
        headingRef.current?.querySelectorAll<HTMLElement>(charsSelector) || [],
      );

      // Defensive guard: nothing to animate.
      if (!chars.length) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      const animateCharsOnly = () => {
        // Non-desktop: only animate headline characters.
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
      };

      const animateDesktopTimeline = () => {
        // If image column is missing, gracefully fallback to text-only animation.
        if (!imageColRef.current) {
          animateCharsOnly();
          return;
        }

        const tl = gsap.timeline();

        // Animate right column from offscreen.
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

        // Animate headline characters.
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
      };

      if (isDesktop) {
        animateDesktopTimeline();
      } else {
        animateCharsOnly();
      }
    }, sectionRef); // scoped GSAP context for safer cleanup

    // context-based cleanup
    return () => ctx.revert();
  }, [charsSelector, headingRef, imageColRef, sectionRef]);
}
