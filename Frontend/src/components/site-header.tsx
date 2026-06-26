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
            className="relative z-10 flex h-full items-center justify-self-start"
            aria-label="DAWA-HI home"
          >
            <Image
              src="/images/icon@4x.png"
              alt=""
              width={4320}
              height={4321}
              priority
              unoptimized
              className="block h-12 w-auto max-h-12 object-contain object-left sm:h-14 sm:max-h-14 md:h-16 md:max-h-16 lg:h-[4.5rem] lg:max-h-[4.5rem] xl:h-20 xl:max-h-20 2xl:h-[5.5rem] 2xl:max-h-[5.5rem] tv:h-24 tv:max-h-24 tv-xl:h-28 tv-xl:max-h-28"
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
            className="relative z-10 flex h-full min-w-0 items-center justify-self-end"
            aria-label="DAWA-HI"
          >
            <Image
              src="/images/wordmark.png"
              alt="DAWA-HI"
              width={4320}
              height={4321}
              priority
              unoptimized
              className="block h-[2.25rem] w-auto max-h-[2.25rem] max-w-[min(42vw,312px)] object-contain object-right sm:h-[2.7rem] sm:max-h-[2.7rem] sm:max-w-[min(39vw,372px)] md:h-[3.15rem] md:max-h-[3.15rem] md:max-w-[432px] lg:h-[3.6rem] lg:max-h-[3.6rem] lg:max-w-[492px] xl:h-[4.2rem] xl:max-h-[4.2rem] xl:max-w-[564px] 2xl:h-[4.8rem] 2xl:max-h-[4.8rem] 2xl:max-w-[636px] tv:h-[5.4rem] tv:max-h-[5.4rem] tv:max-w-[720px] tv-xl:h-24 tv-xl:max-h-24 tv-xl:max-w-[804px]"
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
