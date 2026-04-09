"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type UseServiceOverlayAnimationParams = {
  pointerSize?: number;
  minIntervalMs?: number;
  maxIntervalMs?: number;
  minDurationMs?: number;
  startDelayMs?: number;
};

type UseServiceOverlayAnimationReturn = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  position: Position;
  durationMs: number;
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useServiceOverlayAnimation(
  params: UseServiceOverlayAnimationParams = {},
): UseServiceOverlayAnimationReturn {
  const {
    pointerSize = 20,
    minIntervalMs = 1000,
    maxIntervalMs = 3000,
    minDurationMs = 250,
    startDelayMs = 800,
  } = params;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [durationMs, setDurationMs] = useState<number>(500);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNextMove = useCallback(
    function scheduleNextMoveInternal() {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const maxX = Math.max(0, bounds.width - pointerSize);
      const maxY = Math.max(0, bounds.height - pointerSize);

      const nextX = Math.random() * maxX;
      const nextY = Math.random() * maxY;
      const nextInterval = getRandomNumber(minIntervalMs, maxIntervalMs);
      const nextDuration = getRandomNumber(
        minDurationMs,
        Math.max(minDurationMs, nextInterval),
      );

      setPosition({ x: nextX, y: nextY });
      setDurationMs(nextDuration);

      timeoutRef.current = setTimeout(scheduleNextMoveInternal, nextInterval);
    },
    [maxIntervalMs, minDurationMs, minIntervalMs, pointerSize],
  );

  useEffect(() => {
    clearTimer();

    timeoutRef.current = setTimeout(() => {
      scheduleNextMove();
    }, startDelayMs);

    return () => clearTimer();
  }, [clearTimer, scheduleNextMove, startDelayMs]);

  return {
    containerRef,
    position,
    durationMs,
  };
}
