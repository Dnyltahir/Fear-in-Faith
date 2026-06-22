"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Minimize, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AfterChoice, WatchEpisode } from "@/lib/content";
import { WATCH_BY_SLUG, getEpisodeVideoSegments } from "@/lib/content";
import { InteractiveChoiceOverlay } from "@/components/watch/InteractiveChoiceOverlay";
import { cn } from "@/lib/utils";

const BREAK_MS = 20 * 60 * 1000;
const CONTROLS_HIDE_MS = 2500;

export function WatchPlayer({ episode: initialEpisode }: { episode: WatchEpisode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<number | null>(null);
  const [activeEpisode, setActiveEpisode] = useState(initialEpisode);
  const segments = useMemo(() => getEpisodeVideoSegments(activeEpisode), [activeEpisode]);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const currentSrc = segments[segmentIndex] ?? "";
  const hasVideoSrc = Boolean(currentSrc.trim());
  const [playing, setPlaying] = useState(() => hasVideoSrc);
  const [showBreak, setShowBreak] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const watchedMs = useRef(0);

  const clearHideControlsTimer = useCallback(() => {
    if (hideControlsTimerRef.current !== null) {
      window.clearTimeout(hideControlsTimerRef.current);
      hideControlsTimerRef.current = null;
    }
  }, []);

  const scheduleHideControls = useCallback(() => {
    clearHideControlsTimer();
    hideControlsTimerRef.current = window.setTimeout(() => {
      const v = videoRef.current;
      if (v && !v.paused) {
        setShowControls(false);
      }
    }, CONTROLS_HIDE_MS);
  }, [clearHideControlsTimer]);

  const revealControls = useCallback(() => {
    setShowControls(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  useEffect(() => {
    setActiveEpisode(initialEpisode);
  }, [initialEpisode]);

  useEffect(() => {
    setSegmentIndex(0);
    watchedMs.current = 0;
    setShowChoices(false);
    setShowBreak(false);
    setShowControls(false);
    setPlaying(segments.length > 0);
  }, [activeEpisode.slug, segments.length]);

  useEffect(() => {
    return () => clearHideControlsTimer();
  }, [clearHideControlsTimer]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !hasVideoSrc || showChoices) return;

    const onPointerActivity = () => revealControls();

    player.addEventListener("mousemove", onPointerActivity);
    player.addEventListener("touchstart", onPointerActivity, { passive: true });

    return () => {
      player.removeEventListener("mousemove", onPointerActivity);
      player.removeEventListener("touchstart", onPointerActivity);
    };
  }, [hasVideoSrc, showChoices, revealControls]);

  useEffect(() => {
    if (!playing) {
      clearHideControlsTimer();
      setShowControls(true);
      return;
    }
    if (showControls) {
      scheduleHideControls();
    }
  }, [playing, showControls, clearHideControlsTimer, scheduleHideControls]);

  useEffect(() => {
    if (!showChoices) return;
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.max(0, v.duration - 0.05);
    v.pause();
  }, [showChoices]);

  useEffect(() => {
    if (!hasVideoSrc || showChoices) return;
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
    setPlaying(true);
  }, [segmentIndex, hasVideoSrc, showChoices]);

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
  }, [activeEpisode.slug, hasVideoSrc, segmentIndex]);

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
    const v = videoRef.current;
    if (v && Number.isFinite(v.duration)) {
      v.currentTime = Math.max(0, v.duration - 0.05);
      v.pause();
    }
    setPlaying(false);
    const nextIndex = segmentIndex + 1;
    if (nextIndex < segments.length) {
      setSegmentIndex(nextIndex);
      return;
    }
    if (activeEpisode.afterChoices?.length) {
      setShowChoices(true);
    }
  }

  function handleChoiceSelect(choice: AfterChoice) {
    const next = WATCH_BY_SLUG[choice.slug];
    if (!next) return;
    setShowChoices(false);
    setShowControls(false);
    setActiveEpisode(next);
  }

  const controlsVisible = showControls || !playing;
  const controlsClassName = cn(
    "transition-opacity duration-300",
    controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
  );

  return (
    <div className="min-h-screen text-slate-900">
      <div className="site-container relative pb-24 pt-2 md:pb-28 lg:pb-32 tv:pb-36">
        <div className="watch-layout">
        <div className="surface-card mb-6 text-right md:mb-8 tv:mb-10">
          <div className="surface-card__body py-4 md:py-5">
            <p className="type-label font-semibold text-[#9440DD]">IQRA</p>
            <h1 className="type-h1 font-black text-slate-900">{activeEpisode.title}</h1>
          </div>
        </div>

        <div
          ref={playerRef}
          className={cn(
            "surface-card surface-card--elevated relative bg-black",
            showChoices ? "overflow-visible" : "overflow-hidden",
            isFullscreen && "flex h-full w-full items-center justify-center",
          )}
        >
          {hasVideoSrc ? (
            <>
              <video
                key={`${activeEpisode.slug}-${segmentIndex}`}
                ref={videoRef}
                className={cn(
                  "aspect-video w-full bg-black object-cover",
                  showChoices && "pointer-events-none",
                  isFullscreen && "aspect-auto h-full max-h-full w-full object-cover",
                )}
                src={currentSrc}
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
                className={cn(
                  "btn-touch absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/75 md:size-12 lg:rounded-2xl lg:size-14 tv:size-16 tv:rounded-3xl",
                  isFullscreen && "hidden",
                  controlsClassName,
                )}
                aria-label="Enter fullscreen"
              >
                <Maximize className="size-5 md:size-6 lg:size-7 tv:size-8" aria-hidden />
              </button>

              {isFullscreen && !showChoices ? (
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pointer-events-none",
                    controlsClassName,
                  )}
                >
                  <div className="h-14 shrink-0 sm:h-16 lg:h-20 tv:h-24" aria-hidden />
                  <div
                    className={cn(
                      "flex w-full items-center justify-center gap-3 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-4 pb-4 pt-2 sm:gap-4 sm:pb-5 sm:pt-3 lg:gap-6 lg:pb-8 lg:pt-4 tv:gap-8 tv:pb-10 tv:pt-5",
                      controlsVisible ? "pointer-events-auto" : "pointer-events-none",
                    )}
                  >
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="btn-touch inline-flex min-w-[9rem] items-center justify-center gap-2.5 rounded-xl bg-[#9440DD] px-5 py-3 text-base font-bold text-white shadow-lg shadow-[#9440DD]/30 hover:bg-[#7a32bd] sm:min-w-[10rem] sm:text-lg lg:min-w-[12rem] lg:px-8 lg:py-4 lg:text-xl tv:min-w-[14rem] tv:px-10 tv:py-5 tv:text-2xl"
                  >
                    {playing ? (
                      <>
                        <Pause className="size-5 sm:size-6 lg:size-7 tv:size-8" aria-hidden />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-5 fill-current sm:size-6 lg:size-7 tv:size-8" aria-hidden />
                        Play
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => void toggleFullscreen()}
                    className="btn-touch inline-flex min-w-[9rem] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/15 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/25 sm:min-w-[10rem] sm:text-lg lg:min-w-[12rem] lg:px-8 lg:py-4 lg:text-xl tv:min-w-[14rem] tv:px-10 tv:py-5 tv:text-2xl"
                    aria-label="Exit fullscreen"
                  >
                    <Minimize className="size-5 sm:size-6 lg:size-7 tv:size-8" aria-hidden />
                    Exit full screen
                  </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="type-body flex aspect-video w-full items-center justify-center bg-slate-900 px-6 text-center text-white">
              This episode has no video URL configured yet.
            </div>
          )}
          <AnimatePresence>
            {showChoices && activeEpisode.afterChoices?.length ? (
              <motion.div
                key="iqra-branch-choices"
                className="absolute inset-0 z-20 overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                <InteractiveChoiceOverlay
                  choices={activeEpisode.afterChoices}
                  onSelect={handleChoiceSelect}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <p className="type-body mt-4 text-white md:mt-6 lg:max-w-4xl xl:max-w-5xl tv:mt-8">{activeEpisode.synopsis}</p>

        {hasVideoSrc && !isFullscreen ? (
          <div
            className={cn(
              "mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4 lg:mt-12 lg:gap-5 tv:mt-14",
              controlsClassName,
            )}
            onMouseMove={revealControls}
            onTouchStart={revealControls}
          >
            <button
              type="button"
              onClick={togglePlay}
              className="btn-touch btn-primary min-w-[11rem] gap-2.5 px-7 text-[0.9375rem] md:min-w-[12rem] md:px-9 md:text-base lg:min-w-[14rem] lg:text-lg tv:min-w-[16rem] tv:px-12 tv:text-xl"
            >
              {playing ? (
                <>
                  <Pause className="size-6 md:size-7 lg:size-8 tv:size-9" aria-hidden /> Pause
                </>
              ) : (
                <>
                  <Play className="size-6 fill-current md:size-7 lg:size-8 tv:size-9" aria-hidden /> Play
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="btn-touch inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-800 shadow-sm hover:bg-slate-50 md:text-lg lg:px-8 lg:text-xl tv:min-w-[16rem] tv:px-12 tv:text-2xl"
            >
              <Maximize className="size-5 md:size-6 lg:size-7 tv:size-8" aria-hidden />
              Full screen
            </button>
          </div>
        ) : null}
        </div>
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
