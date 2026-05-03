"use client";

import { motion } from "framer-motion";
import {
  HandMetal,
  Lightbulb,
  MessageCircle,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AskQuestionModal } from "@/components/quest/ask-question-modal";
import { JoinModal } from "@/components/quest/join-modal";

type Comment = {
  id: string;
  author: string;
  avatar: string;
  body: string;
  tags: string[];
  verified?: boolean;
  highFives: number;
  lightbulbs: number;
};

const THREAD: Comment[] = [
  {
    id: "1",
    author: "Nova",
    avatar: "🪐",
    body: "Why do some people feel far away from God when bad things happen?",
    tags: ["#Storytime", "#BigFeelings"],
    highFives: 12,
    lightbulbs: 4,
  },
  {
    id: "2",
    author: "Verified Guide · Ms. Amina",
    avatar: "🌙",
    body: "That is a tender question. Many stories in scripture sit with sadness without rushing answers. You are not alone in asking it.",
    tags: ["#Faith", "#Kindness"],
    verified: true,
    highFives: 40,
    lightbulbs: 28,
  },
];

function BubbleCard({
  c,
  onHighFive,
  onLightbulb,
}: {
  c: Comment;
  onHighFive: (id: string) => void;
  onLightbulb: (id: string) => void;
}) {
  return (
    <motion.article
      layout
      className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/50 backdrop-blur-md"
    >
      <div className="flex gap-4">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl ring-1 ring-slate-200"
          aria-hidden
        >
          {c.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-slate-900">{c.author}</p>
            {c.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#9440DD]/12 px-3 py-1 text-sm font-semibold text-[#9440DD] ring-1 ring-[#9440DD]/35">
                <ShieldCheck className="size-4" aria-hidden />
                Verified Guide
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">{c.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#FFDE59]/35 px-3 py-1 text-sm font-semibold text-slate-900 ring-1 ring-[#9440DD]/30"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onHighFive(c.id)}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg font-semibold text-slate-800 ring-1 ring-slate-200/80 transition-transform hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.99]"
            >
              <HandMetal className="size-5 text-[#9440DD]" aria-hidden />
              High-five
              <span className="text-slate-500">({c.highFives})</span>
            </button>
            <button
              type="button"
              onClick={() => onLightbulb(c.id)}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg font-semibold text-slate-800 ring-1 ring-slate-200/80 transition-transform hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.99]"
            >
              <Lightbulb className="size-5 text-[#9440DD]" aria-hidden />
              Lightbulb
              <span className="text-slate-500">({c.lightbulbs})</span>
            </button>
            <button
              type="button"
              className="ml-auto inline-flex h-12 items-center gap-2 rounded-2xl border border-red-300 bg-red-50 px-4 text-lg font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-100"
            >
              <Shield className="size-5" aria-hidden />
              Report
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function RoundTable() {
  const [askOpen, setAskOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [comments, setComments] = useState(THREAD);

  function onHighFive(id: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, highFives: c.highFives + 1 } : c)),
    );
  }

  function onLightbulb(id: string) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, lightbulbs: c.lightbulbs + 1 } : c,
      ),
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MessageCircle className="size-8 text-[#9440DD]" aria-hidden />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-900">
                <span className="rounded-md bg-[#FFDE59] px-2 py-0.5 ring-1 ring-[#e6cf3a]/80">
                  The Round Table
                </span>
              </p>
              <h2 className="text-2xl font-black text-slate-900">Bubble-chat Q&A</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setJoinOpen(true)}
            className="h-12 rounded-2xl border border-slate-200 bg-white px-5 text-lg font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Join free
          </button>
        </div>

        <button
          type="button"
          onClick={() => setAskOpen(true)}
          className="flex w-full flex-col items-start gap-2 rounded-2xl border border-dashed border-[#9440DD]/45 bg-purple-50/60 px-5 py-5 text-left ring-1 ring-slate-200/80 transition-transform hover:-translate-y-0.5 hover:bg-purple-50"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#9440DD]">
            Ask a Big Question
          </p>
          <p className="text-xl font-bold text-slate-900">Tap to open the colorful idea helper</p>
          <p className="text-lg text-slate-600">
            We&apos;ll offer gentle writing prompts so you never start with a blank page.
          </p>
        </button>

        <div className="space-y-5">
          {comments.map((c) => (
            <BubbleCard
              key={c.id}
              c={c}
              onHighFive={onHighFive}
              onLightbulb={onLightbulb}
            />
          ))}
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-slate-200/90 bg-white/85 p-5 shadow-md shadow-slate-200/60 ring-1 ring-slate-100 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9440DD]">
            Community compass
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-900">Safe-Cosmos tips</h3>
          <p className="mt-2 text-lg leading-relaxed text-slate-600">
            Guides with the badge are adults checked by your team. Everyone can
            use Report — it is big, bright, and always okay to tap.
          </p>
          <Accordion type="single" collapsible className="mt-4 w-full">
            <AccordionItem value="one">
              <AccordionTrigger>What makes a good question?</AccordionTrigger>
              <AccordionContent>
                Start with how you feel, what you noticed, or what you wonder about
                kindness, science, or story. Short questions are great.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="two">
              <AccordionTrigger>What happens when I report?</AccordionTrigger>
              <AccordionContent>
                In this demo, nothing is sent online yet — wire your moderation
                queue here. In production, a trusted adult reviews every report.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>

      <AskQuestionModal open={askOpen} onOpenChange={setAskOpen} />
      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}
