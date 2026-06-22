"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { AppUIProvider } from "@/context/app-ui";
import { ScrollChromeProvider } from "@/context/scroll-chrome";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollChromeProvider>
        <AppUIProvider>{children}</AppUIProvider>
      </ScrollChromeProvider>
    </QueryClientProvider>
  );
}
