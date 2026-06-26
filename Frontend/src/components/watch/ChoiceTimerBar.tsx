"use client";

type Props = {
  /** Remaining time as 0–100 (100 = full yellow bar) */
  progressPct: number;
};

export function ChoiceTimerBar({ progressPct }: Props) {
  const clampedPct = Math.max(0, Math.min(100, progressPct));

  return (
    <div
      className="relative w-full"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clampedPct)}
      aria-label="Time left to choose"
    >
      <div className="relative z-[1] h-4 w-full sm:h-5 lg:h-6 xl:h-7 tv:h-8 tv-xl:h-10">
      >
        <div className="absolute inset-0 rounded-full bg-[#FFDE59]" />
        <div
          className="absolute inset-y-0 right-0 rounded-full bg-[#9440DD] transition-[left] duration-75 ease-linear"
          style={{ left: `${clampedPct}%` }}
        />
      </div>
    </div>
  );
}
