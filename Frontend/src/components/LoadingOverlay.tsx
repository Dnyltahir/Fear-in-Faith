"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppUI } from "@/context/app-ui";
import { WanderingMascot } from "@/components/quest/wandering-mascot";

export function LoadingOverlay() {
  const { loadingOverlay } = useAppUI();

  return (
    <AnimatePresence>
      {loadingOverlay ? (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <WanderingMascot label="Loading" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
