"use client";

import type { ReactNode } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";

type Props = {
  children: ReactNode;
};

/** Client shell: header + main + overlay. Footer stays in root layout as a sibling. */
export function AppShell({ children }: Props) {
  return (
    <Providers>
      <div className="flex min-h-0 flex-1 flex-col">
        <SiteHeader />
        <div
          className="shrink-0"
          style={{ height: "var(--content-gap)" }}
          aria-hidden
        />
        <main className="relative z-0 min-h-0 flex-1">{children}</main>
        <LoadingOverlay />
      </div>
    </Providers>
  );
}
