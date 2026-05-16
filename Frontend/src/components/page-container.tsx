import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Standard page width for About, Contact, and similar pages. */
export function PageContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl px-4 pb-6 sm:px-6 sm:pb-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
