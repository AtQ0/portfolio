"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";

type UseHeroAnimationParams = {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  bodyTextRef: RefObject<HTMLDivElement | null>;
  imageOverlayRef: RefObject<HTMLDivElement | null>;
  charsSelector?: string;
};

export function useHeroAnimation({
  sectionRef,
  headingRef,
  bodyTextRef,
  imageOverlayRef,
  charsSelector = ".hero-char",
}: UseHeroAnimationParams) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      const animateAlways = () => {
        // Scope character selection to the specific heading to avoid cross-section collisions.
        const chars = Array.from(
          headingRef.current?.querySelectorAll<HTMLElement>(charsSelector) ||
            [],
        );
        const animateHeading = (chars: HTMLElement[]) => {
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

        const animateBodyText = (root: HTMLDivElement) => {
          const lines = Array.from(root.querySelectorAll<HTMLElement>("p, li"));
          if (!lines.length) return;
          gsap.fromTo(
            lines,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              delay: 1.5,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
            },
          );
        };

        if (chars.length) animateHeading(chars);
        if (bodyTextRef.current) animateBodyText(bodyTextRef.current);
      };

      const animateDesktopAndAbove = () => {
        const tl = gsap.timeline();

        // Defensive guard for image overlay animation
        if (!imageOverlayRef.current) {
          return;
        } else {
          // Ensure overlay starts as full cover on desktop.
          gsap.set(imageOverlayRef.current, {
            scaleX: 1,
            transformOrigin: "left center",
          });

          // Reveal Image by shrinking overlay right -> left.
          tl.to(
            imageOverlayRef.current,
            {
              scaleX: 0,
              duration: 1.1,
              ease: "power2.inOut",
            },
            0,
          );
        }
      };

      if (isDesktop) {
        animateDesktopAndAbove();
        animateAlways();
      } else {
        // Hide overlay on non-desktop so image is visible.
        if (imageOverlayRef.current) {
          gsap.set(imageOverlayRef.current, { scaleX: 0 });
        }
        animateAlways();
      }
    }, sectionRef); // scoped GSAP context for safer cleanup

    // context-based cleanup
    return () => ctx.revert();
  }, [charsSelector, headingRef, imageOverlayRef, bodyTextRef, sectionRef]);
}
