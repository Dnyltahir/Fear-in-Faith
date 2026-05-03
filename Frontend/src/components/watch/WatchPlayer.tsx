"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WatchEpisode } from "@/lib/content";
import { InteractiveChoiceOverlay } from "@/components/watch/InteractiveChoiceOverlay";

const BREAK_MS = 20 * 60 * 1000;

export function WatchPlayer({ episode }: { episode: WatchEpisode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [showBreak, setShowBreak] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const watchedMs = useRef(0);

  useEffect(() => {
    watchedMs.current = 0;
    setShowChoices(false);
    setShowBreak(false);
    setPlaying(true);
  }, [episode.slug]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const id = window.setInterval(() => {
      if (!v.paused) {
        watchedMs.current += 1000;
        if (watchedMs.current >= BREAK_MS) {
          setShowBreak(true);
          v.pause();
          watchedMs.current = 0;
        }
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [episode.slug]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function onVideoEnded() {
    setPlaying(false);
    if (episode.afterChoices?.length) {
      setShowChoices(true);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[18px] text-slate-900">
      <div className="relative mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-lg font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="size-5" aria-hidden />
            Home
          </Link>
          <div className="text-right">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9440DD]">
              IQRA
            </p>
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">{episode.title}</h1>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl ring-2 ring-[#9440DD]/40 shadow-xl shadow-[#9440DD]/20">
          <video
            key={episode.slug}
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            src={episode.videoSrc}
            autoPlay
            playsInline
            controls={false}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={onVideoEnded}
          />
          <AnimatePresence>
            {showChoices && episode.afterChoices?.length ? (
              <motion.div
                key="iqra-branch-choices"
                className="absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                <InteractiveChoiceOverlay choices={episode.afterChoices} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">{episode.synopsis}</p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-16 min-w-[12rem] items-center justify-center gap-3 rounded-2xl bg-[#9440DD] px-10 text-xl font-black text-white shadow-lg shadow-[#9440DD]/35 transition-colors hover:bg-[#7a32bd] active:scale-[0.99]"
          >
            {playing ? (
              <>
                <Pause className="size-7" aria-hidden /> Pause
              </>
            ) : (
              <>
                <Play className="size-7 fill-current" aria-hidden /> Play
              </>
            )}
          </button>
        </div>
      </div>

      {showBreak ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-6 backdrop-blur-md">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-2xl ring-1 ring-[#9440DD]/25">
            <p className="text-2xl font-black text-slate-900">Stretch break</p>
            <p className="mt-3 text-lg text-slate-600">
              You&apos;ve been watching for about 20 minutes. Wiggle your fingers,
              roll your shoulders, and grab some water.
            </p>
            <button
              type="button"
              className="mt-8 h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white transition-colors hover:bg-[#7a32bd]"
              onClick={() => {
                watchedMs.current = 0;
                setShowBreak(false);
                void videoRef.current?.play();
              }}
            >
              I stretched — keep going
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}
