"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { WatchEpisode } from "@/lib/content";
import { FunMeter } from "@/components/quest/fun-meter";
import { cn } from "@/lib/utils";

type Props = {
  episode: WatchEpisode;
  thumbnailSrc: string;
  accentClass: string;
};

export function EpisodeShelfCard({ episode, thumbnailSrc, accentClass }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [preview, setPreview] = useState(false);
  const hasVideoSrc = Boolean(episode.videoSrc?.trim());

  const startPreview = useCallback(() => {
    if (!hasVideoSrc) return;
    setPreview(true);
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {
      /* autoplay policies — ignore */
    });
  }, [hasVideoSrc]);

  const stopPreview = useCallback(() => {
    if (!hasVideoSrc) return;
    setPreview(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, [hasVideoSrc]);

  return (
    <div
      className={cn(
        "rounded-2xl border-2 bg-white shadow-[0_20px_60px_rgba(148,64,221,0.2)]",
        accentClass,
        "border-t-4 border-t-[#FFDE59]",
      )}
    >
      <div
        className="p-5 sm:p-7"
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
          <Image
            src={thumbnailSrc}
            alt={`${episode.title} — IQRA episode artwork`}
            width={1024}
            height={768}
            sizes="(max-width: 768px) 100vw, 448px"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              preview ? "opacity-0" : "opacity-100",
            )}
            priority={false}
          />
          {hasVideoSrc ? (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                preview ? "opacity-100" : "opacity-0",
              )}
              src={episode.videoSrc}
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden
            />
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#9440DD]">Chapter 1</p>
            <h4 className="text-2xl font-black text-slate-900 sm:text-3xl">{episode.title}</h4>
          </div>
          <span className="rounded-full bg-[#FFDE59] px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-[#e6cf3a]/90">
            1 episode
          </span>
        </div>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">{episode.synopsis}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Fun meter
          </p>
          <FunMeter level={episode.funLevel} />
        </div>

        <Link
          href={`/watch/${episode.slug}`}
          className="mt-7 flex h-14 w-full items-center justify-center rounded-2xl bg-[#9440DD] text-lg font-bold text-white shadow-md shadow-[#9440DD]/35 ring-1 ring-[#9440DD]/30 transition-colors hover:bg-[#7a32bd] active:scale-[0.99]"
        >
          Watch episode
        </Link>
      </div>
    </div>
  );
}
