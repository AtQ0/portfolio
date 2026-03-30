"use client";

import { cn } from "@/lib/utils";
import type { KeenSliderOptions } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

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
  classesControls?: string;
  classesSlide?: string;
};

export function Carousel<T>({
  items,
  renderSlide,
  options: extraOptions,
  perView = 1,
  spacing = 16,
  controlsPosition = "top",
  classesControls = "",
  classesSlide = "",
}: CarouselProps<T>) {
  const [ready, setReady] = useState(false);
  const [collection, setCollection] = useState(1);
  const [progress, setProgress] = useState(0);

  const amount = items.length;
  const groups = useMemo(
    () => computeGroups(amount, perView),
    [amount, perView],
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

  useEffect(() => {
    sliderRef.current?.update({
      defaultAnimation: {
        duration: 2000,
      },
      slides: {
        perView,
        spacing,
      },
    });
  }, [perView, spacing, sliderRef]);

  useEffect(() => {
    sliderRef.current?.update();
  }, [amount, sliderRef]);

  return (
    <div
      className={cn(
        "@container/carousel flex size-full flex-col justify-between gap-8 bg-gray-300 transition-opacity duration-500 ease-in-out",
        !ready && "opacity-0",
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

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="size-6 shrink-0 cursor-pointer opacity-30 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100"
              onClick={() => sliderRef.current?.prev()}
            >
              <span className="sr-only">Go to previous item</span>
              <ChevronLeftIcon className="text-fg-secondary size-full" />
            </button>

            <button
              type="button"
              className="size-6 shrink-0 cursor-pointer opacity-30 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100"
              onClick={() => sliderRef.current?.next()}
            >
              <span className="sr-only">Go to next item</span>
              <ChevronRightIcon className="text-fg-secondary size-full" />
            </button>
          </div>
        </div>
      )}

      <ul
        ref={containerRef}
        className={cn("group/carousel keen-slider h-full overflow-visible!")}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={cn("keen-slider__slide w-fit", classesSlide)}
          >
            {renderSlide(item, index, { progress })}
          </li>
        ))}
      </ul>
    </div>
  );
}
