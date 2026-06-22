"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { IQRA_EPISODE_THUMBNAIL, IQRA_SHOW, WATCH_BY_SLUG } from "@/lib/content";
import { EpisodeShelfCard } from "@/components/quest/episode-shelf-card";
import { WanderingMascot } from "@/components/quest/wandering-mascot";

const HERO_ILLUSTRATION = "/images/iqra-illustration.jpeg";

async function loadShelf() {
  await new Promise((r) => setTimeout(r, 800));
  return { main: WATCH_BY_SLUG.theodicy };
}

export function DiscoveryZone() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["iqra-shelf"], queryFn: loadShelf });

  const visible = useMemo(() => {
    if (!data) return null;
    const needle = q.trim().toLowerCase();
    if (!needle) return data.main;
    const hay = `${data.main.title} iqra theodicy episode`.toLowerCase();
    return hay.includes(needle) ? data.main : null;
  }, [data, q]);

  return (
    <div className="section-stack">
      <section
        aria-labelledby="discovery-welcome-title"
        className="surface-card surface-card--elevated overflow-hidden"
      >
        <div className="surface-card__body bg-[#FFDE59] pb-0 text-center text-[#9440DD] md:pb-2">
          <p className="type-label font-semibold">Discovery Zone</p>
          <h2
            id="discovery-welcome-title"
            className="type-hero mt-2 font-black"
          >
            Welcome, explorer
          </h2>
          <p className="type-body mx-auto mt-3 max-w-2xl text-[#7a32bd]">
            Watch IQRA episodes made for families learning faith together.
          </p>
        </div>
        <div className="overflow-hidden border-t border-[#e6cf3a]/80">
          <Image
            src={HERO_ILLUSTRATION}
            alt={`${IQRA_SHOW.name} — welcoming illustration for young explorers`}
            width={2752}
            height={2064}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, (max-width: 1920px) 1200px, 1600px"
            className="h-auto w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="surface-card">
        <div className="surface-card__body">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="min-w-0">
              <p className="type-label font-semibold text-[#9440DD]">Search shows</p>
              <h3 className="type-h2 mt-1 font-bold text-slate-900">Find IQRA fast</h3>
              <p className="type-body mt-2 hidden text-slate-600 md:block">
                Search by show name or episode topic.
              </p>
            </div>
            <label className="relative block w-full shrink-0 md:max-w-sm lg:max-w-md xl:max-w-lg tv:max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-[1.125rem] -translate-y-1/2 text-[#9440DD] md:size-5 lg:size-6 tv:size-7"
                aria-hidden
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='Try "IQRA" or "Theodicy"'
                className="btn-touch w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-[0.9375rem] text-slate-900 outline-none ring-[#9440DD]/30 placeholder:text-slate-400 focus:border-[#9440DD]/40 focus:ring-2 md:pl-12 md:text-base lg:pl-14 lg:text-lg tv:min-h-[3.5rem] tv:pl-16 tv:text-xl"
              />
            </label>
          </div>
        </div>
      </section>

      <section aria-label="Show shelf" className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 md:pb-6">
          <div>
            <p className="type-label font-semibold">
              <span className="badge-yellow">Your shelf</span>
            </p>
            <h3 className="type-h2 mt-2 font-black text-white drop-shadow-sm">{IQRA_SHOW.name}</h3>
            <p className="type-body mt-1 text-white/85">Episodes ready to watch</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-white backdrop-blur-sm">
            <Sparkles className="size-4" aria-hidden />
            <span className="type-label font-bold normal-case tracking-normal text-white">
              1 show
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10 md:py-14">
            <WanderingMascot label="Loading IQRA" />
          </div>
        ) : !visible ? (
          <div className="mt-2 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/40 bg-white/10 px-6 py-12 text-center backdrop-blur-sm md:py-16">
            <div className="text-4xl md:text-5xl" aria-hidden>
              🧭
            </div>
            <p className="type-h2 mt-5 font-black text-white">
              Let&apos;s try another path
            </p>
            <p className="type-body mt-2 max-w-md text-white/85">
              We couldn&apos;t find that search. Try &quot;IQRA&quot;, &quot;Theodicy&quot;, or clear
              the box to see your episode.
            </p>
            <button
              type="button"
              onClick={() => setQ("")}
              className="btn-touch btn-primary mt-6 px-7 text-[0.9375rem] md:text-base"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="mt-2 flex justify-center md:mt-4">
            <motion.div
              layout
              whileHover={{ scale: 1.015, y: -3 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl tv:max-w-3xl tv-xl:max-w-4xl"
            >
              <EpisodeShelfCard
                episode={visible}
                thumbnailSrc={IQRA_EPISODE_THUMBNAIL}
                accentClass={IQRA_SHOW.accent}
              />
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}
