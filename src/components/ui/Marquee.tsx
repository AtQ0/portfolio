"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export type MarqueeProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  durationSeconds?: number; /* Seconds for one full loop */
  gapClassName?: string; /* Gap between items */
  pauseOnHover?: boolean;
  direction?: "left" | "right";
};

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      className,
      children,
      durationSeconds = 40,
      gapClassName = "gap-2",
      pauseOnHover = true,
      direction = "left",
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
    const reduceMotion = usePrefersReducedMotion();
    const [pointerInside, setPointerInside] = React.useState(false);
    const [focusInside, setFocusInside] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const el = containerRef.current;

      if (typeof ref === "function") {
        ref(el);
        return () => {
          ref(null);
        };
      }

      if (ref != null) {
        const objectRef = ref as React.MutableRefObject<HTMLDivElement | null>;
        objectRef.current = el;
        return () => {
          objectRef.current = null;
        };
      }

      return undefined;
    }, [ref]);

    React.useEffect(() => {
      if (reduceMotion || !pauseOnHover) return;
      const el = containerRef.current;
      if (!el) return;

      const onFocusIn = () => setFocusInside(true);
      const onFocusOut = (e: FocusEvent) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !el.contains(next)) {
          setFocusInside(false);
        }
      };

      el.addEventListener("focusin", onFocusIn);
      el.addEventListener("focusout", onFocusOut);
      return () => {
        el.removeEventListener("focusin", onFocusIn);
        el.removeEventListener("focusout", onFocusOut);
      };
    }, [reduceMotion, pauseOnHover]);

    if (reduceMotion) {
      return (
        <div
          ref={containerRef}
          className={cn("flex w-full flex-wrap", gapClassName, className)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        >
          {children}
        </div>
      );
    }

    const paused = pauseOnHover && (pointerInside || focusInside);

    return (
      <div
        ref={containerRef}
        className={cn("min-w-0 overflow-hidden", className)}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (pauseOnHover) setPointerInside(true);
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          setPointerInside(false);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      >
        <div
          className={cn("flex w-max shrink-0", gapClassName)}
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${durationSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div className={cn("flex shrink-0", gapClassName)}>{children}</div>
          <div className={cn("flex shrink-0", gapClassName)} aria-hidden>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
