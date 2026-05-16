"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  MessageSquare,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AskQuestionModal } from "@/components/quest/ask-question-modal";

type Comment = {
  id: string;
  author: string;
  avatar: string;
  body: string;
  tags: string[];
  verified?: boolean;
  isSelf?: boolean;
  likes: number;
  comments: number;
};

const THREAD: Comment[] = [
  {
    id: "1",
    author: "Nova",
    avatar: "🪐",
    body: "Why do some people feel far away from God when bad things happen?",
    tags: ["#Storytime", "#BigFeelings"],
    likes: 12,
    comments: 4,
  },
  {
    id: "2",
    author: "Verified Guide · Ms. Amina",
    avatar: "🌙",
    body: "That is a tender question. Many stories in scripture sit with sadness without rushing answers. You are not alone in asking it.",
    tags: ["#Faith", "#Kindness"],
    verified: true,
    likes: 40,
    comments: 28,
  },
];

const QUICK_CHIPS = [
  "As-salamu alaykum 👋",
  "I have a question about faith",
  "Can a scholar help me understand this?",
  "#Kindness",
];

const SCHOLAR_REPLIES = [
  "Thank you for sharing that. Scholars read every message here — give us a little time and someone will walk with your question.",
  "What a thoughtful message. Would you like to tell us more about what sparked this wonder?",
  "We hear you. Your question belongs at this table — a guide may reply with stories, kindness, and gentle clarity.",
];

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-center gap-3 rounded-2xl border border-[#9440DD]/25 bg-purple-50/80 px-4 py-3"
      aria-live="polite"
      aria-label="A scholar is typing"
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-white text-xl ring-1 ring-[#9440DD]/30">
        🌙
      </span>
      <motion.div
        className="flex gap-1.5"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2.5 rounded-full bg-[#9440DD]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </motion.div>
      <p className="text-sm font-semibold text-[#9440DD]">A scholar is typing…</p>
    </motion.div>
  );
}

function BubbleCard({
  c,
  onLike,
  onComment,
}: {
  c: Comment;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={
        c.isSelf
          ? "ml-6 rounded-2xl border border-[#9440DD]/35 bg-gradient-to-br from-purple-50 to-white p-5 shadow-md shadow-[#9440DD]/10 ring-1 ring-[#9440DD]/20"
          : "rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/50 backdrop-blur-md"
      }
    >
      <motion.div
        className="flex gap-4"
        whileHover={{ x: c.isSelf ? -2 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl ring-1 ring-slate-200"
          aria-hidden
          whileTap={{ scale: 0.92, rotate: -6 }}
        >
          {c.avatar}
        </motion.div>
        <motion.div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-slate-900">{c.author}</p>
            {c.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#9440DD]/12 px-3 py-1 text-sm font-semibold text-[#9440DD] ring-1 ring-[#9440DD]/35">
                <ShieldCheck className="size-4" aria-hidden />
                Verified Guide
              </span>
            ) : null}
            {c.isSelf ? (
              <span className="rounded-full bg-[#FFDE59]/50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-800">
                You
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">{c.body}</p>
          <motion.div
            className="mt-3 flex flex-wrap gap-2"
            initial="hidden"
            animate="visible"
          >
            {c.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#FFDE59]/35 px-3 py-1 text-sm font-semibold text-slate-900 ring-1 ring-[#9440DD]/30"
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              onClick={() => onLike(c.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg font-semibold text-slate-800 ring-1 ring-slate-200/80 hover:bg-slate-100"
            >
              <Heart className="size-5 text-[#9440DD]" aria-hidden />
              Like
              <span className="text-slate-500">({c.likes})</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onComment(c.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg font-semibold text-slate-800 ring-1 ring-slate-200/80 hover:bg-slate-100"
            >
              <MessageSquare className="size-5 text-[#9440DD]" aria-hidden />
              Comment
              <span className="text-slate-500">({c.comments})</span>
            </motion.button>
            <button
              type="button"
              className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-3 text-sm font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-100"
            >
              <Shield className="size-4" aria-hidden />
              Report
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function RoundTable() {
  const [askOpen, setAskOpen] = useState(false);
  const [comments, setComments] = useState(THREAD);
  const [draft, setDraft] = useState("");
  const [scholarTyping, setScholarTyping] = useState(false);
  const [onlineCount] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments, scholarTyping, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  function onLike(id: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
    );
  }

  function onComment(id: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, comments: c.comments + 1 } : c)),
    );
  }

  function scheduleScholarReply() {
    if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    setScholarTyping(true);
    replyTimeoutRef.current = setTimeout(() => {
      setScholarTyping(false);
      const reply =
        SCHOLAR_REPLIES[Math.floor(Math.random() * SCHOLAR_REPLIES.length)];
      setComments((prev) => [
        ...prev,
        {
          id: `scholar-${Date.now()}`,
          author: "Verified Guide · Imam Yusuf",
          avatar: "📖",
          body: reply,
          tags: ["#ScholarReply", "#Faith"],
          verified: true,
          likes: 0,
          comments: 0,
        },
      ]);
    }, 1800);
  }

  function postMessage(body: string, tags: string[] = ["#RoundTable"]) {
    const trimmed = body.trim();
    if (trimmed.length < 1) return;

    setComments((prev) => [
      ...prev,
      {
        id: `you-${Date.now()}`,
        author: "You",
        avatar: "✨",
        body: trimmed,
        tags,
        isSelf: true,
        likes: 0,
        comments: 0,
      },
    ]);
    scheduleScholarReply();
  }

  function handleSend() {
    if (draft.trim().length < 1) return;
    postMessage(draft);
    setDraft("");
    inputRef.current?.focus();
  }

  return (
    <motion.div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex min-h-0 flex-col gap-6">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.01 }}
        >
          <MessageCircle className="size-8 text-[#9440DD]" aria-hidden />
          <motion.div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-900">
              <span className="rounded-md bg-[#FFDE59] px-2 py-0.5 ring-1 ring-[#e6cf3a]/80">
                The Round Table
              </span>
            </p>
            <h2 className="text-2xl font-black text-slate-900">Live scholar chat</h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#9440DD]/25 bg-gradient-to-r from-purple-50/90 to-[#FFDE59]/20 px-4 py-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
          </span>
          <Users className="size-5 text-[#9440DD]" aria-hidden />
          <p className="text-lg font-semibold text-slate-800">
            <span className="text-[#9440DD]">{onlineCount} scholars</span> online now
          </p>
          <p className="text-sm text-slate-600">Likes and comments update live</p>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setAskOpen(true)}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          className="flex w-full flex-col items-start gap-2 rounded-2xl border border-dashed border-[#9440DD]/45 bg-purple-50/60 px-5 py-5 text-left ring-1 ring-slate-200/80 transition-colors hover:bg-purple-50"
        >
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#9440DD]">
            <Sparkles className="size-4" aria-hidden />
            Ask a Big Question
          </p>
          <p className="text-xl font-bold text-slate-900">
            Tap Here To Connect With Scholars
          </p>
          <p className="text-lg text-slate-600">
            Or type in the chat bar below — scholars often reply within moments.
          </p>
        </motion.button>

        <div
          ref={scrollRef}
          className="max-h-[min(52vh,520px)] space-y-4 overflow-y-auto scroll-smooth rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 ring-1 ring-slate-100"
          role="log"
          aria-label="Round Table conversation"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {comments.map((c) => (
              <BubbleCard
                key={c.id}
                c={c}
                onLike={onLike}
                onComment={onComment}
              />
            ))}
            {scholarTyping ? <TypingIndicator key="typing" /> : null}
          </AnimatePresence>
        </div>

        <motion.div
          className="sticky bottom-0 z-10 rounded-2xl border border-[#9440DD]/35 bg-white/95 p-4 shadow-lg shadow-[#9440DD]/10 ring-1 ring-slate-200/90 backdrop-blur-xl"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9440DD]">
            Chat with scholars
          </p>
          <motion.div
            className="mb-3 flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Quick messages"
          >
            {QUICK_CHIPS.map((chip) => (
              <motion.button
                key={chip}
                type="button"
                onClick={() => {
                  setDraft(chip);
                  inputRef.current?.focus();
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:border-[#9440DD]/40 hover:bg-purple-50"
              >
                {chip}
              </motion.button>
            ))}
          </motion.div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <label htmlFor="round-table-chat" className="sr-only">
              Message scholars at the Round Table
            </label>
            <input
              ref={inputRef}
              id="round-table-chat"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Say hello or ask a question…"
              autoComplete="off"
              className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 outline-none ring-[#9440DD]/30 placeholder:text-slate-400 focus:ring-2"
            />
            <motion.button
              type="submit"
              disabled={draft.trim().length < 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#9440DD] text-white shadow-lg shadow-[#9440DD]/25 transition-colors hover:bg-[#7a32bd] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Send message"
            >
              <Send className="size-6" aria-hidden />
            </motion.button>
          </form>
          <p className="mt-2 text-center text-sm text-slate-500">
            Press Enter to send · Be kind — guides are listening
          </p>
        </motion.div>
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

      <AskQuestionModal
        open={askOpen}
        onOpenChange={setAskOpen}
        onPost={(text) => postMessage(text, ["#BigQuestion", "#Scholars"])}
      />
    </motion.div>
  );
}
