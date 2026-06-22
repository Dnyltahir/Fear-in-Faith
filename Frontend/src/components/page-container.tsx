import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Responsive page shell — scales from phone → iPad → laptop → large TV. */
export function PageContainer({ children, className }: Props) {
  return (
    <div className={cn("site-container pb-8 pt-4 sm:pb-10 md:pt-6 lg:pb-12", className)}>
      {children}
    </div>
  );
}
