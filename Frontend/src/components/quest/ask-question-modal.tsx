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
};

export function AskQuestionModal({ open, onOpenChange }: Props) {
  const [text, setText] = useState("");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="ask"
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/25 p-4 backdrop-blur-md sm:items-center"
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
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-[#9440DD] bg-white shadow-xl shadow-slate-300/50 ring-1 ring-slate-200"
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <div className="flex items-center gap-3 pr-12">
                <Sparkles className="size-8 text-[#FFDE59] drop-shadow-[0_1px_2px_rgba(15,23,42,0.35)]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#9440DD]">
                    Ask a Big Question
                  </p>
                  <h2 id="ask-title" className="text-2xl font-black text-slate-900">
                    Your wonder matters here
                  </h2>
                </div>
              </div>
              <p className="mt-4 text-lg text-slate-600">
                Pick a starter sentence, then make it your own. A friendly guide
                may reply when they see your post.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setText(p + " ")}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-lg leading-snug text-slate-800 ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:border-[#9440DD]/45 hover:ring-[#9440DD]/25"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <label className="mt-8 block text-lg font-semibold text-slate-900" htmlFor="big-q">
                Your question
              </label>
              <textarea
                id="big-q"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="mt-3 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-lg text-slate-900 outline-none ring-[#9440DD]/35 placeholder:text-slate-400 focus:ring-2"
                placeholder="Type here — short is okay!"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="h-14 flex-1 rounded-2xl border border-slate-200 text-lg font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Maybe later
                </button>
                <button
                  type="button"
                  disabled={text.trim().length < 6}
                  onClick={() => {
                    setText("");
                    onOpenChange(false);
                  }}
                  className="h-14 flex-1 rounded-2xl bg-[#9440DD] text-lg font-bold text-white shadow-lg shadow-[#9440DD]/25 transition-colors hover:bg-[#7a32bd] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Post to the Round Table
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
