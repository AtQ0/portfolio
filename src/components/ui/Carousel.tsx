"use client";

import { cn } from "@/lib/utils";
import type { KeenSliderOptions } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CarouselRenderContext = {
  progress: number;
};

type Group = {
  start: number;
  collection: number;
};

function computeGroups(amount: number, perView: number): Group[] {
  if (amount <= 0) return [];
  const totalGroups = Math.ceil(amount / perView);

  return Array.from({ length: totalGroups }, (_, idx) => {
    const index = idx * perView;
    return {
      start: index + perView > amount ? amount - perView : index,
      collection: idx + 1,
    };
  });
}

function getGroup(num: number, groups: Group[]): Group | undefined {
  if (groups.length === 0) return undefined;

  for (let i = 0; i < groups.length; i++) {
    const current = groups[i];
    const next = groups[i + 1];

    if (next && current) {
      if (num >= current.start && num < next.start) {
        return current;
      }
    } else if (current) {
      if (num >= current.start) {
        return current;
      }
    }
  }

  return groups[0];
}

function readNumericPerView(
  slides: KeenSliderOptions["slides"] | undefined,
): number | undefined {
  if (!slides || typeof slides !== "object") return undefined;
  const pv = slides.perView;
  return typeof pv === "number" && Number.isFinite(pv) ? pv : undefined;
}

export type CarouselProps<T> = {
  items: T[];
  renderSlide: (
    item: T,
    index: number,
    ctx: CarouselRenderContext,
  ) => ReactNode;
  options?: KeenSliderOptions;
  perView?: number;
  spacing?: number;
  controlsPosition?: "top" | "bottom";
  className?: string;
  classesControls?: string;
  classesSlide?: string;
  /** Stable key per slide (e.g. row id when items are chunked rows). Defaults to index. */
  getItemKey?: (item: T, index: number) => string | number;
};

export function Carousel<T>({
  items,
  renderSlide,
  options: extraOptions,
  perView = 1,
  spacing = 16,
  controlsPosition = "top",
  className = "",
  classesControls = "",
  classesSlide = "",
  getItemKey,
}: CarouselProps<T>) {
  const [ready, setReady] = useState(false);
  const [collection, setCollection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(perView);

  const hasBreakpoints = Boolean(extraOptions?.breakpoints);
  const amount = items.length;

  /** When chunking keeps same slide count but changes row composition, re-update Keen. */
  const itemsLayoutSignature = useMemo(
    () =>
      items
        .map((item, index) => String(getItemKey?.(item, index) ?? index))
        .join("|"),
    [items, getItemKey],
  );

  const groups = useMemo(
    () => computeGroups(amount, slidesPerView),
    [amount, slidesPerView],
  );

  const groupsRef = useRef<Group[]>(groups);
  useEffect(() => {
    groupsRef.current = groups;
  }, [groups]);

  const [containerRef, sliderRef] = useKeenSlider<HTMLUListElement>(
    {
      loop: false,
      mode: "free-snap",
      dragSpeed: 0.5,
      rubberband: true,
      defaultAnimation: {
        duration: 2000,
      },
      slides: {
        perView,
        spacing,
      },
      created(slider) {
        slider.on("detailsChanged", (s) => {
          const details = s.track?.details;
          if (!details) return;

          const pv = readNumericPerView(s.options.slides);
          if (pv != null) setSlidesPerView(pv);

          const p = details.progress;
          if (p != null) setProgress(p);

          const rel = details.rel;
          if (rel != null) {
            const group = getGroup(rel, groupsRef.current);
            if (group) setCollection(group.collection);
          }
        });

        setReady(true);
      },
      ...extraOptions,
    },
    [],
  );

  // Real DOM ref for ResizeObserver (containerRef is callback ref from Keen).
  const trackRef = useRef<HTMLUListElement | null>(null);

  // When using breakpoints, Keen owns slides.* — do not overwrite with props.
  useEffect(() => {
    if (hasBreakpoints) return;
    sliderRef.current?.update({
      defaultAnimation: {
        duration: 2000,
      },
      slides: {
        perView,
        spacing,
      },
    });
  }, [hasBreakpoints, perView, spacing, sliderRef]);

  // After DOM updates, before paint.
  useLayoutEffect(() => {
    sliderRef.current?.update();
  }, [amount, itemsLayoutSignature, sliderRef]);

  // Re-measure whenever the slider container actually resizes.
  useEffect(() => {
    const el = trackRef.current;
    const slider = sliderRef.current;
    if (!el || !slider) return;

    const ro = new ResizeObserver(() => {
      slider.update();
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [sliderRef, amount, itemsLayoutSignature]);

  return (
    <div
      className={cn(
        "@container/carousel flex size-full w-full min-w-0 flex-col transition-opacity duration-500 ease-in-out",
        !ready && "opacity-0",
        className,
      )}
    >
      {ready && (
        <div
          className={cn(
            "flex justify-between",
            controlsPosition === "bottom" && "order-last",
            classesControls,
          )}
        >
          <div className="-ml-1 flex justify-start">
            {groups.map((group, idx) => (
              <button
                key={idx}
                className="px-1"
                type="button"
                onClick={() => sliderRef.current?.moveToIdx(group.start)}
              >
                <span className="sr-only">Go to group {group.collection}</span>
                <span
                  className={cn(
                    "bg-bg-tertiary block size-2 shrink-0 rounded-full transition-opacity duration-200 ease-out",
                    group.collection !== collection && "opacity-30",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex translate-x-1.5 items-center justify-end gap-2">
            <button
              type="button"
              className="size-6 shrink-0 cursor-pointer"
              onClick={() => sliderRef.current?.prev()}
            >
              <span className="sr-only">Go to previous item</span>
              <ChevronLeftIcon className="text-fg-secondary hover:text-fg-primary focus-visible:text-fg-primary size-full transition-colors duration-200 ease-out" />
            </button>

            <button
              type="button"
              className="size-6 shrink-0 cursor-pointer"
              onClick={() => sliderRef.current?.next()}
            >
              <span className="sr-only">Go to next item</span>
              <ChevronRightIcon className="text-fg-secondary hover:text-fg-primary focus-visible:text-fg-primary size-full transition-colors duration-200 ease-out" />
            </button>
          </div>
        </div>
      )}

      <ul
        ref={(node) => {
          trackRef.current = node;
          containerRef(node);
        }}
        className={cn(
          "group/carousel keen-slider h-full w-full min-w-0 overflow-visible!",
        )}
      >
        {items.map((item, index) => (
          <li
            key={getItemKey?.(item, index) ?? index}
            className={cn("keen-slider__slide min-w-0", classesSlide)}
          >
            {renderSlide(item, index, { progress })}
          </li>
        ))}
      </ul>
    </div>
  );
}
