"use client";

import { useEffect, useRef, useState } from "react";

const HEAD_SRC = "/images/choice-timer-head.png";

type Props = {
  /** Remaining time as 0–100 (100 = full yellow bar) */
  progressPct: number;
};

export function ChoiceTimerBar({ progressPct }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => setTrackWidth(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clampedPct = Math.max(0, Math.min(100, progressPct));
  const headWidth = trackWidth > 0 ? Math.max(64, trackWidth * 0.135) : 72;

  return (
    <div
      className="relative w-full min-h-[3.75rem] sm:min-h-[4.25rem] lg:min-h-[5rem] tv:min-h-[6rem]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clampedPct)}
      aria-label="Time left to choose"
    >
      <div
        ref={trackRef}
        className="absolute inset-x-0 bottom-0 z-[1] h-4 w-full sm:h-5 lg:h-6 xl:h-7 tv:h-8 tv-xl:h-10"
      >
        <div className="absolute inset-0 bg-[#FFDE59]" />
        <div
          className="absolute inset-y-0 right-0 bg-[#9440DD] transition-[left] duration-75 ease-linear"
          style={{ left: `${clampedPct}%` }}
        />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HEAD_SRC}
        alt=""
        width={953}
        height={1024}
        className="pointer-events-none absolute bottom-0 z-[2] h-auto max-w-none -translate-x-1/2 translate-y-[18%] transition-[left] duration-75 ease-linear"
        style={{
          left: `${clampedPct}%`,
          width: headWidth,
        }}
        draggable={false}
      />
    </div>
  );
}
