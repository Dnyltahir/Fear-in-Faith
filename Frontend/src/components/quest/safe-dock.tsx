"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Tv } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscoveryZone } from "@/components/quest/discovery-zone";
import { RoundTable } from "@/components/quest/round-table";

export function SafeDock() {
  const [tab, setTab] = useState("discovery");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div className="sticky top-[var(--site-header-height)] z-40 border-b border-[#e6cf3a]/80 bg-[#FFDE59] py-3 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative rounded-xl bg-white/55 p-1.5 ring-1 ring-[#e6cf3a]/70">
            <motion.div
              layout
              layoutId="safe-dock-pill"
              aria-hidden
              className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-lg bg-[#9440DD] shadow-[0_8px_28px_rgba(148,64,221,0.35)]"
              initial={false}
              animate={{
                left: tab === "discovery" ? 6 : "calc(50% + 3px)",
                width: "calc(50% - 9px)",
              }}
              transition={{ type: "spring", stiffness: 460, damping: 36 }}
            />
            <TabsList className="relative z-10 flex w-full gap-1.5 bg-transparent p-0 ring-0">
              <TabsTrigger
                value="discovery"
                className="min-h-0 flex-1 gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold sm:gap-2 sm:px-3 sm:py-2.5 sm:text-base"
              >
                <Tv className="size-4 shrink-0 sm:size-[1.125rem]" aria-hidden />
                The Discovery Zone
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="min-h-0 flex-1 gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold sm:gap-2 sm:px-3 sm:py-2.5 sm:text-base"
              >
                <MessageCircle className="size-4 shrink-0 sm:size-[1.125rem]" aria-hidden />
                The Round Table
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10">
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
