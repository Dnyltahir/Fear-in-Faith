"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ScrollChromeContextValue = {
  chromeVisible: boolean;
};

const ScrollChromeContext = createContext<ScrollChromeContextValue | null>(null);

const SCROLL_THRESHOLD = 10;
const TOP_REVEAL = 24;

export function ScrollChromeProvider({ children }: { children: ReactNode }) {
  const [chromeVisible, setChromeVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;

      if (y <= TOP_REVEAL) {
        setChromeVisible(true);
      } else if (y > lastY.current + SCROLL_THRESHOLD) {
        setChromeVisible(false);
      } else if (y < lastY.current - SCROLL_THRESHOLD) {
        setChromeVisible(true);
      }

      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const value = useMemo(() => ({ chromeVisible }), [chromeVisible]);

  return (
    <ScrollChromeContext.Provider value={value}>
      {children}
    </ScrollChromeContext.Provider>
  );
}

export function useScrollChrome() {
  const ctx = useContext(ScrollChromeContext);
  if (!ctx) {
    throw new Error("useScrollChrome must be used within ScrollChromeProvider");
  }
  return ctx;
}
