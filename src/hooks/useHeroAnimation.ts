"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";

type UseHeroAnimationParams = {
  sectionRef: RefObject<HTMLElement | null>;
  availabilityBadgeRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  bodyTextRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  footnoteRef: RefObject<HTMLDivElement | null>;
  imageOverlayRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;
  charsSelector?: string;
};

export function useHeroAnimation({
  sectionRef,
  availabilityBadgeRef,
  headingRef,
  bodyTextRef,
  ctaRef,
  footnoteRef,
  imageOverlayRef,
  imageRef,
  charsSelector = ".hero-char",
}: UseHeroAnimationParams) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Scope character selection to the specific heading to avoid cross-section collisions.
      const chars = Array.from(
        headingRef.current?.querySelectorAll<HTMLElement>(charsSelector) || [],
      );

      const animateHeading = (chars: HTMLElement[]) => {
        gsap.fromTo(
          chars,
          { y: 8, autoAlpha: 0, rotate: -5 },
          {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.25,
            stagger: 0.03,
            ease: "power4.out",
          },
        );
      };

      const animateBodyText = (root: HTMLDivElement) => {
        gsap.fromTo(
          root,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            delay: 1.75,
            duration: 1.0,
            ease: "power2.out",
          },
        );
      };

      const animateCta = (root: HTMLDivElement) => {
        gsap.fromTo(
          root,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            delay: 2.0,
            duration: 1.0,
            ease: "power2.out",
          },
        );
      };

      const animateFootnote = (root: HTMLDivElement) => {
        gsap.fromTo(
          root,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            delay: 2.25,
            duration: 1.0,
            ease: "power2.out",
          },
        );
      };

      const animateAvailabilityBadge = (root: HTMLDivElement) => {
        gsap.fromTo(
          root,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            delay: 2.5,
            duration: 1.0,
            ease: "power2.out",
          },
        );
      };

      const animateImageOverlay = (root: HTMLDivElement) => {
        gsap.fromTo(
          root,
          { scaleX: 1, transformOrigin: "left center" },
          {
            scaleX: 0,
            duration: 1.0,
            ease: "power2.out",
          },
        );
      };

      const animateImage = (root: HTMLImageElement) => {
        gsap.fromTo(
          root,
          { scale: 1.1 },
          { scale: 1, duration: 1.35, ease: "power2.out" },
        );
      };

      if (availabilityBadgeRef.current)
        animateAvailabilityBadge(availabilityBadgeRef.current);
      if (chars.length) animateHeading(chars);
      if (bodyTextRef.current) animateBodyText(bodyTextRef.current);
      if (ctaRef.current) animateCta(ctaRef.current);
      if (footnoteRef.current) animateFootnote(footnoteRef.current);
      if (imageOverlayRef.current) animateImageOverlay(imageOverlayRef.current);
      if (imageRef.current) animateImage(imageRef.current);
    }, sectionRef); // scoped GSAP context for safer cleanup

    // context-based cleanup
    return () => ctx.revert();
  }, [
    charsSelector,
    headingRef,
    imageOverlayRef,
    bodyTextRef,
    sectionRef,
    ctaRef,
    footnoteRef,
    availabilityBadgeRef,
    imageRef,
  ]);
}
