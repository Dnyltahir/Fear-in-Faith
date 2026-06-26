"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, Shield, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAppUI } from "@/context/app-ui";

const AVATARS = [
  { id: "markhor", label: "Mountain Markhor", emoji: "🐐" },
  { id: "sheep", label: "Gentle Sheep", emoji: "🐑" },
  { id: "gur", label: "Gur Buddy", emoji: "🧸" },
];

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function JoinModal({ open, onOpenChange }: Props) {
  const { withLoading } = useAppUI();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [answer, setAnswer] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]!.id);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setAnswer("");
    setAvatar(AVATARS[0]!.id);
  }, [open]);

  const challenge = useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 3;
    const b = Math.floor(Math.random() * 8) + 2;
    return { a, b, sum: a + b };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="join"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-title"
            layout
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-[#9440DD] bg-white shadow-xl shadow-slate-300/40 ring-1 ring-slate-200"
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-300/40">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <div className="flex items-center gap-3 pr-12">
                <div className="text-3xl" aria-hidden>
                  🦊
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-slate-900">
                    <span className="rounded-md bg-[#FFDE59] px-2 py-0.5 ring-1 ring-[#e6cf3a]/80">
                      Mascot walkthrough
                    </span>
                  </p>
                  <h2 id="join-title" className="text-2xl font-black text-slate-900">
                    Join DAWA-HI — always free
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.div
                    key="gate"
                    initial={{ x: 28, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="mt-8 space-y-5"
                  >
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <Shield className="mt-1 size-6 shrink-0 text-[#9440DD]" aria-hidden />
                      <div>
                        <p className="text-lg font-bold text-slate-900">Parental gate</p>
                        <p className="mt-1 text-lg text-slate-600">
                          A grown-up nearby should help with this tiny math check.
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-slate-600">
                      What is{" "}
                      <span className="rounded bg-[#FFDE59] px-1.5 font-black text-slate-900">
                        {challenge.a}
                      </span>{" "}
                      +{" "}
                      <span className="rounded bg-[#FFDE59] px-1.5 font-black text-slate-900">
                        {challenge.b}
                      </span>
                      ?
                    </p>
                    <input
                      inputMode="numeric"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 outline-none ring-[#9440DD]/35 focus:ring-2"
                      placeholder="Your answer"
                    />
                    <button
                      type="button"
                      disabled={Number(answer) !== challenge.sum}
                      onClick={() => setStep(1)}
                      className="h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white transition-colors hover:bg-[#7a32bd] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </motion.div>
                ) : null}

                {step === 1 ? (
                  <motion.div
                    key="mascot"
                    initial={{ x: 28, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="mt-8 space-y-5"
                  >
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <Sparkles className="size-7 text-[#9440DD]" />
                      <p className="text-lg text-slate-600">
                        Hi explorer! I&apos;m Quest the Fox. We keep things kind, curious,
                        and calm here.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white transition-colors hover:bg-[#7a32bd]"
                    >
                      Pick my avatar
                    </button>
                  </motion.div>
                ) : null}

                {step === 2 ? (
                  <motion.div
                    key="avatar"
                    initial={{ x: 28, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="mt-8 space-y-5"
                  >
                    <p className="text-lg text-slate-600">
                      Tap a buddy — no photos needed, just friendly faces.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {AVATARS.map((a) => {
                        const active = avatar === a.id;
                        return (
                          <motion.button
                            key={a.id}
                            type="button"
                            layout
                            onClick={() => setAvatar(a.id)}
                            whileTap={{ scale: 0.96 }}
                            className={
                              active
                                ? "rounded-2xl ring-2 ring-[#9440DD] ring-offset-2 ring-offset-white shadow-lg shadow-[#9440DD]/30"
                                : "rounded-2xl ring-2 ring-transparent ring-offset-2 ring-offset-white"
                            }
                          >
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                              <div className="text-4xl">{a.emoji}</div>
                              <p className="mt-3 text-sm font-semibold text-slate-800">
                                {a.label}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white transition-colors hover:bg-[#7a32bd]"
                    >
                      Almost there
                    </button>
                  </motion.div>
                ) : null}

                {step === 3 ? (
                  <motion.div
                    key="done"
                    initial={{ x: 28, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="mt-8 space-y-5 text-center"
                  >
                    <PartyPopper className="mx-auto size-12 text-[#FFDE59] drop-shadow-[0_1px_2px_rgba(15,23,42,0.35)]" />
                    <p className="text-2xl font-black text-slate-900">You&apos;re in!</p>
                    <p className="text-lg text-slate-600">
                      Your DAWA-HI space is free forever. Be kind, ask big questions,
                      and use Report if something feels off.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        void withLoading(async () => {
                          await new Promise((r) => setTimeout(r, 500));
                          onOpenChange(false);
                        })
                      }
                      className="h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white transition-colors hover:bg-[#7a32bd]"
                    >
                      Start exploring
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
