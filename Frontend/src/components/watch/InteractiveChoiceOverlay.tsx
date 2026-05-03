"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { AfterChoice } from "@/lib/content";
import { cn } from "@/lib/utils";

const CHOICE_SECONDS = 18;

function ChoiceIcon({ type }: { type: AfterChoice["icon"] }) {
  const cls =
    "size-14 shrink-0 text-[#141109] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:size-16";
  if (type === "book") return <BookOpen className={cls} strokeWidth={2.25} aria-hidden />;
  return <MessagesSquare className={cls} strokeWidth={2.25} aria-hidden />;
}

type Props = {
  choices: AfterChoice[];
};

/**
 * “Choose your adventure” overlay inspired by interactive-video UI:
 * parchment choice tiles, wood-framed lime timer bar, motion entrance.
 */
export function InteractiveChoiceOverlay({ choices }: Props) {
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
      className="pointer-events-auto absolute inset-0 flex h-full w-full flex-col bg-black/62"
    >
      <div
        className="h-2.5 w-full shrink-0 bg-[#3d2818] shadow-[inset_0_-2px_6px_rgba(0,0,0,0.45)]"
        aria-hidden
      />

      <div className="flex min-h-0 flex-1 flex-col justify-end px-3 pb-6 pt-4 sm:px-8 sm:pb-10">
        <motion.p
          id="choice-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="mb-6 text-center text-xl font-black tracking-tight text-white drop-shadow sm:text-2xl"
        >
          What happens next?
        </motion.p>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 sm:flex-row sm:items-stretch sm:justify-center sm:gap-8">
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
              <Link
                href={`/watch/${choice.slug}`}
                className={cn(
                  "group flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-3 rounded-sm px-5 py-6 text-center shadow-[0_8px_0_#5a3d24,0_18px_40px_rgba(0,0,0,0.45)] transition-transform active:scale-[0.98] sm:min-h-[10rem] sm:flex-row sm:justify-start sm:gap-5 sm:px-8 sm:py-7",
                  "border-[3px] border-[#a28455] bg-[#efe4cf]",
                  "outline-none focus-visible:ring-4 focus-visible:ring-[#FFDE59]/90",
                  urgent && "motion-safe:animate-choice-wiggle",
                )}
                style={{
                  clipPath:
                    "polygon(2% 4%, 98% 1%, 100% 96%, 1% 100%, 0% 40%)",
                }}
              >
                <ChoiceIcon type={choice.icon} />
                <div className="min-w-0 text-left sm:flex-1">
                  <p className="text-xl font-black leading-tight text-[#141109] sm:text-2xl">
                    {choice.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug text-[#3d2f20]">
                    {choice.caption}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.35 }}
          className="mx-auto mt-8 w-full max-w-4xl px-1"
        >
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#e8dcc8]">
            Choose before the trail cools
          </p>
          <div className="rounded-lg border-[6px] border-[#4a3222] bg-[#2d1c12] p-2 shadow-[inset_0_4px_12px_rgba(0,0,0,0.65)]">
            <div className="relative h-4 overflow-hidden rounded-sm bg-[#120b08] ring-1 ring-black/60">
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
