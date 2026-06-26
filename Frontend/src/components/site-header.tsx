"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollChrome } from "@/context/scroll-chrome";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function navClass(active: boolean) {
  return active
    ? "btn-touch rounded-lg bg-[#9440DD] px-3.5 py-1.5 text-sm font-bold text-white shadow-sm shadow-[#9440DD]/25 md:px-4 md:text-[0.9375rem] lg:px-5 lg:text-base xl:px-6 xl:text-lg tv:px-7 tv:text-xl"
    : "btn-touch rounded-lg px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-[#9440DD] md:px-4 md:text-[0.9375rem] lg:px-5 lg:text-base xl:px-6 xl:text-lg tv:px-7 tv:text-xl";
}

export function SiteHeader() {
  const pathname = usePathname();
  const { chromeVisible } = useScrollChrome();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(148,64,221,0.06),0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-lg transition-transform duration-300 ease-in-out",
          chromeVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="h-0.5 bg-gradient-to-r from-[#9440DD] via-[#FFDE59] to-[#9440DD]" aria-hidden />
        <div className="site-container flex h-[var(--site-header-height)] items-center justify-between gap-3 md:gap-5">
          <Link
            href="/"
            className="flex h-full min-w-0 flex-1 items-center justify-start md:max-w-[58%]"
          >
            <Image
              src="/images/wordmark.png"
              alt="DAWA-HI"
              width={720}
              height={180}
              priority
              className="block h-[3.25rem] w-auto max-h-[3.25rem] max-w-[min(78vw,420px)] object-contain object-left sm:h-[3.75rem] sm:max-h-[3.75rem] sm:max-w-[min(72vw,480px)] md:h-[4.5rem] md:max-h-[4.5rem] md:max-w-[540px] lg:h-20 lg:max-h-20 lg:max-w-[620px] xl:h-[5.5rem] xl:max-h-[5.5rem] xl:max-w-[700px] 2xl:h-24 2xl:max-h-24 2xl:max-w-[780px] tv:h-28 tv:max-h-28 tv:max-w-[900px] tv-xl:h-32 tv-xl:max-h-32 tv-xl:max-w-[1000px]"
            />
          </Link>

          <nav
            className="flex items-center rounded-xl bg-slate-100/90 p-1 ring-1 ring-slate-200/80 md:rounded-2xl md:p-1.5"
            aria-label="Main"
          >
            {NAV.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} className={navClass(active)}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <div
        className="shrink-0"
        style={{ height: "var(--site-header-height)" }}
        aria-hidden
      />
    </>
  );
}
