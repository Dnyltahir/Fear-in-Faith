"use client";

import { motion } from "framer-motion";
import { BookOpen, MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { AfterChoice } from "@/lib/content";
import { cn } from "@/lib/utils";

const CHOICE_SECONDS = 18;

function ChoiceIcon({ type }: { type: AfterChoice["icon"] }) {
  const cls =
    "size-9 shrink-0 text-[#141109] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:size-10";
  if (type === "book") return <BookOpen className={cls} strokeWidth={2} aria-hidden />;
  return <MessagesSquare className={cls} strokeWidth={2} aria-hidden />;
}

type Props = {
  choices: AfterChoice[];
  onSelect: (choice: AfterChoice) => void;
};

/**
 * “Choose your adventure” overlay inspired by interactive-video UI:
 * parchment choice tiles, wood-framed lime timer bar, motion entrance.
 */
export function InteractiveChoiceOverlay({ choices, onSelect }: Props) {
  const [timeLeftPct, setTimeLeftPct] = useState(100);
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const durationMs = CHOICE_SECONDS * 1000;
    const t0 = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Date.now() - t0;
      const pct = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setTimeLeftPct(pct);
      if (pct < 28) setUrgent(true);
      if (elapsed >= durationMs) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="choice-title"
      className="pointer-events-auto absolute inset-0 flex h-full w-full flex-col"
    >
      <div className="min-h-0 flex-1" aria-hidden />

      <div className="shrink-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 pb-4 pt-10 sm:px-5 sm:pb-6 sm:pt-14">
        <motion.p
          id="choice-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="mb-3 text-center text-base font-black tracking-tight text-white drop-shadow sm:mb-4 sm:text-lg"
        >
          What happens next?
        </motion.p>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
          {choices.map((choice, i) => (
            <motion.div
              key={choice.slug}
              initial={{ opacity: 0, y: 56, rotate: i === 0 ? -2 : 2 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: i === 0 ? -0.6 : 0.6,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 26,
                delay: 0.08 + i * 0.12,
              }}
              className="flex-1"
            >
              <button
                type="button"
                onClick={() => onSelect(choice)}
                className={cn(
                  "group flex h-full w-full min-h-[5.25rem] flex-col items-center justify-center gap-2 rounded-sm px-3 py-3 text-center shadow-[0_5px_0_#5a3d24,0_10px_24px_rgba(0,0,0,0.4)] transition-transform active:scale-[0.98] sm:min-h-[5.5rem] sm:flex-row sm:justify-start sm:gap-3 sm:px-4 sm:py-3.5",
                  "border-2 border-[#a28455] bg-[#efe4cf]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE59]/90",
                  urgent && "motion-safe:animate-choice-wiggle",
                )}
                style={{
                  clipPath:
                    "polygon(2% 4%, 98% 1%, 100% 96%, 1% 100%, 0% 40%)",
                }}
              >
                <ChoiceIcon type={choice.icon} />
                <div className="min-w-0 text-left sm:flex-1">
                  <p className="text-base font-black leading-tight text-[#141109] sm:text-lg">
                    {choice.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug text-[#3d2f20] sm:text-[0.9375rem]">
                    {choice.caption}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.35 }}
          className="mx-auto mt-4 w-full max-w-2xl px-1 sm:mt-5"
        >
          <p className="mb-1.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#e8dcc8] sm:text-xs">
            Choose before the trail cools
          </p>
          <div className="rounded-md border-[3px] border-[#4a3222] bg-[#2d1c12] p-1.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] sm:border-4 sm:p-2">
            <div className="relative h-2.5 overflow-hidden rounded-sm bg-[#120b08] ring-1 ring-black/60 sm:h-3">
              <div
                className="absolute inset-y-0 left-0 rounded-sm bg-[#FFDE59] transition-[width] duration-75 ease-linear"
                style={{ width: `${timeLeftPct}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
