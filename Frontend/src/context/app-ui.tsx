"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppUIContextValue = {
  loadingOverlay: boolean;
  setLoadingOverlay: (v: boolean) => void;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
  activeProfileId: string | null;
  setActiveProfileId: (id: string | null) => void;
};

const AppUIContext = createContext<AppUIContextValue | null>(null);

export function AppUIProvider({ children }: { children: ReactNode }) {
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  const withLoading = useCallback(async <T,>(fn: () => Promise<T>) => {
    setLoadingOverlay(true);
    try {
      return await fn();
    } finally {
      setLoadingOverlay(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      loadingOverlay,
      setLoadingOverlay,
      withLoading,
      activeProfileId,
      setActiveProfileId,
    }),
    [loadingOverlay, withLoading, activeProfileId],
  );

  return (
    <AppUIContext.Provider value={value}>{children}</AppUIContext.Provider>
  );
}

export function useAppUI() {
  const ctx = useContext(AppUIContext);
  if (!ctx) throw new Error("useAppUI must be used within AppUIProvider");
  return ctx;
}
