"use client";

import { motion } from "framer-motion";
import { BookOpen, MessagesSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AfterChoice } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChoiceTimerBar } from "@/components/watch/ChoiceTimerBar";

const CHOICE_SECONDS = 18;

function ChoiceIcon({ type, className }: { type: AfterChoice["icon"]; className?: string }) {
  const cls = cn(
    "choice-box__icon size-9 shrink-0 sm:size-10 lg:size-11 tv:size-[3.25rem]",
    className,
  );
  if (type === "book") return <BookOpen className={cls} strokeWidth={2.25} aria-hidden />;
  return <MessagesSquare className={cls} strokeWidth={2.25} aria-hidden />;
}

type Props = {
  choices: AfterChoice[];
  onSelect: (choice: AfterChoice) => void;
};

/**
 * Branching choice overlay: yellow face + purple 3D base tiles, countdown bar.
 */
export function InteractiveChoiceOverlay({ choices, onSelect }: Props) {
  const [timeLeftPct, setTimeLeftPct] = useState(100);
  const [urgent, setUrgent] = useState(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!choices.length) return;

    const durationMs = CHOICE_SECONDS * 1000;
    const t0 = Date.now();
    let autoSelected = false;

    const id = window.setInterval(() => {
      const elapsed = Date.now() - t0;
      const pct = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setTimeLeftPct(pct);
      if (pct < 28) setUrgent(true);
      if (elapsed >= durationMs && !autoSelected) {
        autoSelected = true;
        window.clearInterval(id);
        onSelectRef.current(choices[0]);
      }
    }, 40);

    return () => window.clearInterval(id);
  }, [choices]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="choice-title"
      className="pointer-events-auto absolute inset-0 flex h-full w-full flex-col"
    >
      <div className="min-h-0 flex-1" aria-hidden />

      <div className="shrink-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 pb-5 pt-8 sm:px-5 sm:pb-6 sm:pt-12 lg:px-8 lg:pb-8 lg:pt-14 tv:px-12 tv:pb-10 tv:pt-16">
        <motion.p
          id="choice-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="type-h3 mb-3 text-center font-black tracking-tight text-white drop-shadow sm:mb-4 lg:text-2xl tv:mb-6 tv:text-3xl"
        >
          What happens next?
        </motion.p>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5 lg:max-w-4xl lg:gap-6 tv:max-w-5xl tv:gap-8">
          {choices.map((choice, i) => (
            <motion.div
              key={choice.slug}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 26,
                delay: 0.08 + i * 0.12,
              }}
              className={cn("flex-1", urgent && "motion-safe:animate-choice-wiggle")}
            >
              <button
                type="button"
                onClick={() => onSelect(choice)}
                className={cn(
                  "choice-box w-full outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#FFDE59]/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                )}
              >
                <span className="choice-box__face">
                  <ChoiceIcon type={choice.icon} />
                  <span className="min-w-0 sm:flex-1">
                    <span className="choice-box__label block text-base font-black leading-tight sm:text-lg lg:text-xl tv:text-2xl">
                      {choice.label}
                    </span>
                    <span className="choice-box__caption mt-0.5 block text-sm font-semibold leading-snug sm:text-[0.9375rem] lg:text-base tv:text-lg">
                      {choice.caption}
                    </span>
                  </span>
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-3 w-full max-w-2xl pb-1 sm:mt-4 lg:max-w-4xl lg:pb-2 tv:max-w-5xl tv:mt-6">
          <p className="type-label mb-2 text-center font-bold text-[#FFDE59] sm:mb-3 lg:text-sm tv:mb-4 tv:text-base">
            Choose before the trail cools
          </p>
          <ChoiceTimerBar progressPct={timeLeftPct} />
        </div>
      </div>
    </div>
  );
}
