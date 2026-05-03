"use client";

import { motion } from "framer-motion";

/** Tiny “mascot” strolling across a progress track while content loads */
export function WanderingMascot({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="relative w-56 overflow-hidden rounded-full bg-slate-100 py-3 ring-1 ring-slate-200"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <div className="mx-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full w-1/3 rounded-full bg-[#9440DD]"
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      </div>
      <motion.div
        className="absolute bottom-2 left-0 text-2xl"
        animate={{ x: [8, 160, 8] }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: "easeInOut",
        }}
        aria-hidden
      >
        🦊
      </motion.div>
    </div>
  );
}
