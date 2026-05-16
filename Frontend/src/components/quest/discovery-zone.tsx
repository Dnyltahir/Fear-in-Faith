"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { IQRA_EPISODE_THUMBNAIL, IQRA_SHOW, WATCH_BY_SLUG } from "@/lib/content";
import { EpisodeShelfCard } from "@/components/quest/episode-shelf-card";
import { WanderingMascot } from "@/components/quest/wandering-mascot";

/** Served from `public/images/` (synced from repo `images/`). Replace file to update art. */
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
    <div className="space-y-12">
      <section
        aria-labelledby="discovery-welcome-title"
        className="rounded-2xl ring-1 ring-slate-200"
      >
        <h2
          id="discovery-welcome-title"
          className="mb-4 text-center text-4xl font-black tracking-tight text-slate-900 drop-shadow-sm sm:text-5xl"
        >
          Welcome
        </h2>
        <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
          <Image
            src={HERO_ILLUSTRATION}
            alt={`${IQRA_SHOW.name} — welcoming illustration for young explorers`}
            width={2752}
            height={2064}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="h-auto w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9440DD]">
              Search shows
            </p>
            <h3 className="text-xl font-bold text-slate-900">Find IQRA fast</h3>
          </div>
          <label className="relative block w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9440DD]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “IQRA” or “Theodicy”"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-lg text-slate-900 outline-none ring-[#9440DD]/35 placeholder:text-slate-400 focus:ring-2"
            />
          </label>
        </div>
      </section>

      <section aria-label="Show shelf">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-900">
              <span className="rounded-md bg-[#FFDE59] px-2 py-0.5 ring-1 ring-[#e6cf3a]/80">
                Your shelf
              </span>
            </p>
            <h3 className="text-2xl font-black text-slate-900">{IQRA_SHOW.name}</h3>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 flex justify-center py-6">
            <WanderingMascot label="Loading IQRA" />
          </div>
        ) : !visible ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#9440DD]/45 bg-slate-50 px-6 py-16 text-center ring-1 ring-slate-200">
            <div className="text-6xl" aria-hidden>
              🧭
            </div>
            <p className="mt-6 text-2xl font-black text-slate-900">Oops! Let&apos;s try another path!</p>
            <p className="mt-3 max-w-md text-lg text-slate-800">
              We couldn&apos;t find that search. Try &quot;IQRA&quot;, &quot;Theodicy&quot;, or clear the box
              to see your episode.
            </p>
            <button
              type="button"
              onClick={() => setQ("")}
              className="mt-8 h-14 rounded-2xl bg-[#9440DD] px-8 text-lg font-bold text-white shadow-lg shadow-[#9440DD]/30 transition-colors hover:bg-[#7a32bd]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <motion.div
              layout
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="w-full max-w-md"
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
