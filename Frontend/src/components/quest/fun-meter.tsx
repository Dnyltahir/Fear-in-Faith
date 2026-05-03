"use client";

import { Zap } from "lucide-react";
import { motion } from "framer-motion";

/** “Fun meter” — five lightning bolts instead of star ratings */
export function FunMeter({ level }: { level: 0 | 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Fun level ${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < level;
        return (
          <motion.span
            key={i}
            initial={false}
            animate={{ scale: on ? 1.08 : 1, y: on ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <Zap
              className={
                on
                  ? "size-7 fill-[#FFDE59] text-[#FFDE59] drop-shadow-[0_0_10px_rgba(255,222,89,0.55)]"
                  : "size-7 text-slate-300"
              }
              aria-hidden
            />
          </motion.span>
        );
      })}
    </div>
  );
}
