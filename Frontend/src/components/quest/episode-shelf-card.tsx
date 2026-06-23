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
    v.preload = "auto";
    v.load();
    void v.play().catch(() => {});
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
    <article
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(148,64,221,0.12)]",
        accentClass,
        "border-t-[3px] border-t-[#FFDE59]",
      )}
    >
      <div
        className="p-4 sm:p-5 lg:p-6 xl:p-8 tv:p-10"
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#9440DD]/20 ring-1 ring-[#9440DD]/25">
          <Image
            src={thumbnailSrc}
            alt={`${episode.title} — IQRA episode artwork`}
            width={1024}
            height={1024}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 512px, (max-width: 1920px) 672px, 960px"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              preview ? "opacity-0" : "opacity-100",
            )}
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

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="type-label font-semibold text-[#9440DD]">Chapter 1</p>
            <h4 className="type-h3 mt-0.5 font-black text-slate-900">{episode.title}</h4>
          </div>
          <span className="badge-yellow type-label font-bold normal-case tracking-normal">
            1 episode
          </span>
        </div>

        <p className="type-body mt-3 text-slate-600">{episode.synopsis}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="type-label font-semibold text-slate-600">Fun meter</p>
          <FunMeter level={episode.funLevel} />
        </div>

        <Link
          href={`/watch/${episode.slug}`}
          className="btn-touch btn-primary mt-5 flex w-full text-[0.9375rem] md:mt-6 md:text-base lg:text-lg tv:mt-8 tv:min-h-[3.75rem] tv:text-xl"
        >
          Watch episode
        </Link>
      </div>
    </article>
  );
}
