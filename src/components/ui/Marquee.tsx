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
  durationSeconds?: number;
  loopSeamClassName?: string;
  direction?: "left" | "right";
};

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      className,
      children,
      durationSeconds = 40,
      loopSeamClassName = "pe-2",
      direction = "left",
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
    const reduceMotion = usePrefersReducedMotion();

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

    if (reduceMotion) {
      return (
        <div
          ref={containerRef}
          className={cn("flex w-full flex-wrap", className)}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        >
          {children}
        </div>
      );
    }

    const stripClassName = cn("flex shrink-0", loopSeamClassName);

    return (
      <div
        ref={containerRef}
        className={cn("marquee-root min-w-0 overflow-hidden", className)}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      >
        <div
          className="marquee-track flex w-max shrink-0"
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${durationSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          <div className={stripClassName}>{children}</div>
          <div className={stripClassName} aria-hidden>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
