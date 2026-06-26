"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

const PROMPTS = [
  "What is one big question you have about kindness in the world?",
  "If you could ask an astronaut anything about space, what would it be?",
  "What story from your week felt confusing — and what would help you understand it?",
  "What would you like grown-ups to explain more clearly about faith or hope?",
];

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPost?: (text: string) => void;
};

export function AskQuestionModal({ open, onOpenChange, onPost }: Props) {
  const [text, setText] = useState("");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="ask"
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/25 p-4 backdrop-blur-md sm:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-title"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-[#9440DD] bg-white shadow-xl shadow-slate-300/50 ring-1 ring-slate-200 lg:max-w-3xl lg:rounded-3xl xl:max-w-4xl"
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="btn-touch absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 md:size-12"
                aria-label="Close"
              >
                <X className="size-5 md:size-6" />
              </button>
              <div className="flex items-center gap-3 pr-12 md:gap-4">
                <Sparkles className="size-8 text-[#FFDE59] drop-shadow-[0_1px_2px_rgba(15,23,42,0.35)] md:size-9 lg:size-10" aria-hidden />
                <div>
                  <p className="type-label font-semibold uppercase text-[#9440DD]">
                    Ask a Big Question
                  </p>
                  <h2 id="ask-title" className="type-h2 font-black text-slate-900">
                    Your wonder matters here
                  </h2>
                </div>
              </div>
              <p className="type-body mt-4 text-slate-600">
                Pick a starter sentence, then make it your own. A friendly guide
                may reply when they see your post.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:gap-4">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setText(p + " ")}
                    className="btn-touch rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left leading-snug text-slate-800 ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:border-[#9440DD]/45 hover:ring-[#9440DD]/25 md:p-5 type-body"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <label className="type-body mt-8 block font-semibold text-slate-900" htmlFor="big-q">
                Your question
              </label>
              <textarea
                id="big-q"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="type-body mt-3 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none ring-[#9440DD]/35 placeholder:text-slate-400 focus:ring-2 lg:min-h-[10rem]"
                placeholder="Type here — short is okay!"
              />
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="btn-touch flex-1 rounded-2xl border border-slate-200 text-base font-semibold text-slate-800 hover:bg-slate-50 md:text-lg"
                >
                  Maybe later
                </button>
                <button
                  type="button"
                  disabled={text.trim().length < 6}
                  onClick={() => {
                    const trimmed = text.trim();
                    if (trimmed.length >= 6) onPost?.(trimmed);
                    setText("");
                    onOpenChange(false);
                  }}
                  className="btn-touch flex-1 rounded-2xl bg-[#9440DD] text-base font-bold text-white shadow-lg shadow-[#9440DD]/25 transition-colors hover:bg-[#7a32bd] disabled:cursor-not-allowed disabled:opacity-50 md:text-lg lg:text-xl"
                >
                  Post to Safe Space
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
