"use client";

import { useEffect, useRef, useState } from "react";

type ClockProps = {
  timeZone?: string;
  className?: string;
};

export function Clock({
  timeZone = "Europe/Stockholm",
  className = "block",
}: ClockProps) {
  const rafRef = useRef<number | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateClock = () => {
      setTime(formatter.format(new Date()));
      rafRef.current = window.requestAnimationFrame(updateClock);
    };

    rafRef.current = window.requestAnimationFrame(updateClock);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [timeZone]);

  return <time className={className}>{time}</time>;
}
