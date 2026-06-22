"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Minimize, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { WatchEpisode } from "@/lib/content";
import { InteractiveChoiceOverlay } from "@/components/watch/InteractiveChoiceOverlay";
import { cn } from "@/lib/utils";

const BREAK_MS = 20 * 60 * 1000;

export function WatchPlayer({ episode }: { episode: WatchEpisode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const hasVideoSrc = Boolean(episode.videoSrc?.trim());
  const [playing, setPlaying] = useState(() => hasVideoSrc);
  const [showBreak, setShowBreak] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const watchedMs = useRef(0);

  useEffect(() => {
    watchedMs.current = 0;
    setShowChoices(false);
    setShowBreak(false);
    setPlaying(hasVideoSrc);
  }, [episode.slug, hasVideoSrc]);

  useEffect(() => {
    if (!hasVideoSrc) return;
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
  }, [episode.slug, hasVideoSrc]);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await player.requestFullscreen();
      }
    } catch {
      /* Fullscreen may be blocked by the browser */
    }
  }, []);

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
    <div className="min-h-screen text-slate-900">
      <div className="site-container relative pb-24 pt-2 md:pb-28 lg:pb-32">
        <div className="surface-card mb-6 text-right md:mb-8">
          <div className="surface-card__body py-4 md:py-5">
            <p className="type-label font-semibold text-[#9440DD]">IQRA</p>
            <h1 className="type-h1 font-black text-slate-900">{episode.title}</h1>
          </div>
        </div>

        <div
          ref={playerRef}
          className={cn(
            "surface-card surface-card--elevated relative overflow-hidden bg-black",
            isFullscreen && "flex h-full w-full items-center justify-center",
          )}
        >
          {hasVideoSrc ? (
            <>
              <video
                key={episode.slug}
                ref={videoRef}
                className={cn(
                  "aspect-video w-full bg-black object-cover",
                  isFullscreen && "aspect-auto h-full max-h-full w-full object-contain",
                )}
                src={episode.videoSrc}
                autoPlay
                playsInline
                controls={false}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={onVideoEnded}
              />
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="btn-touch absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/75 md:size-12 lg:size-14 lg:rounded-2xl"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="size-5 md:size-6" aria-hidden />
                ) : (
                  <Maximize className="size-5 md:size-6" aria-hidden />
                )}
              </button>
            </>
          ) : (
            <div className="type-body flex aspect-video w-full items-center justify-center bg-slate-900 px-6 text-center text-white">
              This episode has no video URL configured yet.
            </div>
          )}
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

        <p className="type-body mt-4 text-white md:mt-6 lg:max-w-4xl">{episode.synopsis}</p>

        {hasVideoSrc ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="btn-touch btn-primary min-w-[11rem] gap-2.5 px-7 text-[0.9375rem] md:min-w-[12rem] md:px-9 md:text-base"
            >
              {playing ? (
                <>
                  <Pause className="size-6 md:size-7" aria-hidden /> Pause
                </>
              ) : (
                <>
                  <Play className="size-6 fill-current md:size-7" aria-hidden /> Play
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="btn-touch inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-800 shadow-sm hover:bg-slate-50 md:text-lg lg:px-8 lg:text-xl"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="size-5 md:size-6" aria-hidden />
                  Exit full screen
                </>
              ) : (
                <>
                  <Maximize className="size-5 md:size-6" aria-hidden />
                  Full screen
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>

      {showBreak ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-6 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-2xl ring-1 ring-[#9440DD]/25 md:max-w-lg md:p-10 lg:max-w-xl lg:rounded-3xl lg:p-12">
            <p className="type-h2 font-black text-slate-900">Stretch break</p>
            <p className="type-body mt-3 text-slate-600">
              You&apos;ve been watching for about 20 minutes. Wiggle your fingers,
              roll your shoulders, and grab some water.
            </p>
            <button
              type="button"
              className="btn-touch mt-8 w-full rounded-2xl bg-[#9440DD] text-base font-bold text-white transition-colors hover:bg-[#7a32bd] md:text-lg lg:text-xl"
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
