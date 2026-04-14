"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseStrategyCharScrollParams = {
  sectionRef: RefObject<HTMLElement | null>;
  charsSelector?: string;
  fromColor?: string;
  toColor: string;
  start?: string;
  end?: string;
  catchUpDuration?: number; // seconds
  featherChars?: number; // soft edge width in characters
  minEdgeOpacity?: number; // opacity at the very boundary on active side
};

export function useStrategyCharScroll({
  sectionRef,
  charsSelector = ".strategy-char",
  fromColor = "var(--color-fg-secondary)",
  toColor,
  start = "top 80%",
  end = "bottom 30%",
  catchUpDuration = 0.35,
  featherChars = 1.1,
  minEdgeOpacity = 0.9,
}: UseStrategyCharScrollParams) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const chars = Array.from(
        sectionRef.current?.querySelectorAll<HTMLElement>(charsSelector) || [],
      );
      if (!chars.length) return;

      const total = chars.length;
      const proxy = { progress: 0 };

      const paint = (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const boundary = clamped * total;
        const feather = Math.max(0.01, featherChars);
        const minOpacity = Math.max(0, Math.min(1, minEdgeOpacity));

        chars.forEach((char, index) => {
          const d = index - boundary;

          // Inactive side: keep gray crisp and fully opaque.
          if (d >= 0) {
            char.style.color = fromColor;
            char.style.opacity = "1";
            return;
          }

          // Active side far from boundary: full white.
          if (d <= -feather) {
            char.style.color = toColor;
            char.style.opacity = "1";
            return;
          }

          // Active-side feather only (white fades in near the boundary).
          const t = Math.abs(d) / feather; // 0 at boundary -> 1 deeper in active zone
          const eased = t * t * (3 - 2 * t); // smoothstep
          const alpha = minOpacity + (1 - minOpacity) * eased;

          char.style.color = toColor;
          char.style.opacity = String(alpha);
        });
      };

      // Initial state.
      paint(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start,
        end,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(proxy, {
            progress: self.progress,
            duration: catchUpDuration,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => paint(proxy.progress),
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [
    sectionRef,
    charsSelector,
    fromColor,
    toColor,
    start,
    end,
    catchUpDuration,
    featherChars,
    minEdgeOpacity,
  ]);
}
