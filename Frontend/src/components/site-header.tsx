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
        <div className="site-container relative grid h-[var(--site-header-height)] grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-5">
          <Link
            href="/"
            className="relative z-10 flex h-full min-w-0 items-center justify-self-start"
          >
            <Image
              src="/images/fear-to-faith-wordmark.jpg"
              alt="Fear to Faith"
              width={1024}
              height={192}
              priority
              className="block h-[3.75rem] w-auto max-h-[3.75rem] max-w-[min(70vw,520px)] object-contain object-left sm:h-[4.5rem] sm:max-h-[4.5rem] sm:max-w-[min(65vw,620px)] md:h-[5.25rem] md:max-h-[5.25rem] md:max-w-[720px] lg:h-24 lg:max-h-24 lg:max-w-[820px] xl:h-28 xl:max-h-28 xl:max-w-[940px] 2xl:h-32 2xl:max-h-32 2xl:max-w-[1060px] tv:h-36 tv:max-h-36 tv:max-w-[1200px] tv-xl:h-40 tv-xl:max-h-40 tv-xl:max-w-[1340px]"
            />
          </Link>

          <nav
            className="relative z-20 flex items-center justify-self-center rounded-xl bg-slate-100/90 p-1 ring-1 ring-slate-200/80 md:rounded-2xl md:p-1.5"
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

          <Link
            href="/"
            className="relative z-10 flex h-full items-center justify-self-end rounded-xl p-1 transition-opacity hover:opacity-85 md:rounded-2xl"
            aria-label="DAWA-HI home"
          >
            <Image
              src="/images/icon.png"
              alt=""
              width={96}
              height={96}
              className="block size-12 object-contain sm:size-14 md:size-16 lg:size-[4.5rem] xl:size-20 2xl:size-[5.5rem] tv:size-24 tv-xl:size-28"
            />
          </Link>
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
