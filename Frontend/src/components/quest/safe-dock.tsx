"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Tv } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscoveryZone } from "@/components/quest/discovery-zone";
import { RoundTable } from "@/components/quest/round-table";
import { useScrollChrome } from "@/context/scroll-chrome";
import { cn } from "@/lib/utils";

export function SafeDock() {
  const [tab, setTab] = useState("discovery");
  const { chromeVisible } = useScrollChrome();

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div
        className={cn(
          "fixed left-0 right-0 z-40 border-b border-[#e6cf3a]/70 bg-[#FFDE59]/95 py-3 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out md:py-3.5 lg:py-4 tv:py-5",
          chromeVisible
            ? "top-[var(--site-header-height)] translate-y-0"
            : "top-[var(--site-header-height)] -translate-y-[calc(var(--site-header-height)+var(--site-dock-height))]",
        )}
      >
        <div className="site-container">
          <div className="relative overflow-hidden rounded-xl bg-white/60 p-1.5 shadow-sm ring-1 ring-[#e6cf3a]/60 md:rounded-2xl md:p-2">
            <motion.div
              layout
              layoutId="safe-dock-pill"
              aria-hidden
              className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-lg bg-[#9440DD] shadow-[0_6px_20px_rgba(148,64,221,0.32)] md:bottom-2 md:top-2 md:rounded-xl"
              initial={false}
              animate={{
                left: tab === "discovery" ? 6 : "calc(50% + 3px)",
                width: "calc(50% - 9px)",
              }}
              transition={{ type: "spring", stiffness: 460, damping: 36 }}
            />
            <TabsList className="relative z-10 flex w-full gap-1 bg-transparent p-0 ring-0 md:gap-1.5">
              <TabsTrigger
                value="discovery"
                className="btn-touch min-h-[2.625rem] flex-1 gap-1.5 rounded-lg px-2 py-2 text-[0.8125rem] font-semibold md:min-h-[2.875rem] md:gap-2 md:px-4 md:py-2.5 md:text-[0.9375rem] lg:min-h-[3rem] lg:text-base xl:min-h-[3.25rem] xl:text-lg tv:min-h-[3.75rem] tv:gap-3 tv:text-xl"
              >
                <Tv className="size-4 shrink-0 md:size-[1.125rem] lg:size-5 xl:size-6 tv:size-7" aria-hidden />
                <span className="truncate">Story Mode</span>
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="btn-touch min-h-[2.625rem] flex-1 gap-1.5 rounded-lg px-2 py-2 text-[0.8125rem] font-semibold md:min-h-[2.875rem] md:gap-2 md:px-4 md:py-2.5 md:text-[0.9375rem] lg:min-h-[3rem] lg:text-base xl:min-h-[3.25rem] xl:text-lg tv:min-h-[3.75rem] tv:gap-3 tv:text-xl"
              >
                <MessageCircle className="size-4 shrink-0 md:size-[1.125rem] lg:size-5 xl:size-6 tv:size-7" aria-hidden />
                <span className="truncate">Safe Space</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>

      <div
        className="shrink-0"
        style={{ height: "var(--site-dock-height)" }}
        aria-hidden
      />

      <div className="site-container pb-8 pt-5 sm:pb-10 md:pt-7 lg:pb-12 lg:pt-8 tv:pb-14 tv:pt-10">
        <TabsContent
          value="discovery"
          forceMount
          className="mt-0 data-[state=inactive]:hidden"
        >
          <DiscoveryZone />
        </TabsContent>
        <TabsContent
          value="community"
          forceMount
          className="mt-0 data-[state=inactive]:hidden"
        >
          <RoundTable />
        </TabsContent>
      </div>
    </Tabs>
  );
}
