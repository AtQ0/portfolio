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
  pauseOnHover?: boolean;
  direction?: "left" | "right";
};

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      className,
      children,
      durationSeconds = 40,
      loopSeamClassName = "pe-2",
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

    const syncPointerAndFocusFromDom = React.useCallback(() => {
      const root = containerRef.current;
      if (!root) return;
      setPointerInside(root.matches(":hover"));
      setFocusInside(
        typeof document !== "undefined" &&
          document.activeElement instanceof Node &&
          root.contains(document.activeElement),
      );
    }, []);

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

    React.useEffect(() => {
      if (reduceMotion || !pauseOnHover) return;

      const onReturnToTab = () => {
        if (document.visibilityState !== "visible") return;
        requestAnimationFrame(() => {
          const root = containerRef.current;
          if (!root) return;

          const ae = document.activeElement;
          if (
            ae instanceof HTMLAnchorElement &&
            root.contains(ae) &&
            ae.target === "_blank"
          ) {
            ae.blur();
          }
          syncPointerAndFocusFromDom();
        });
      };

      document.addEventListener("visibilitychange", onReturnToTab);
      window.addEventListener("pageshow", onReturnToTab);

      return () => {
        document.removeEventListener("visibilitychange", onReturnToTab);
        window.removeEventListener("pageshow", onReturnToTab);
      };
    }, [reduceMotion, pauseOnHover, syncPointerAndFocusFromDom]);

    if (reduceMotion) {
      return (
        <div
          ref={containerRef}
          className={cn("flex w-full flex-wrap", className)}
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
    const stripClassName = cn("flex shrink-0", loopSeamClassName);

    return (
      <div
        ref={containerRef}
        className={cn("min-w-0 overflow-hidden", className)}
        onClickCapture={(e) => {
          const a = (e.target as HTMLElement | null)?.closest("a");
          if (!(a instanceof HTMLAnchorElement) || a.target !== "_blank")
            return;
          queueMicrotask(() => {
            a.blur();
            setPointerInside(false);
          });
        }}
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
          className="flex w-max shrink-0"
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${durationSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
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
