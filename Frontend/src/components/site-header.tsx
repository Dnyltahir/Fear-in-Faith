"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollChrome } from "@/context/scroll-chrome";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const ICON_SRC = "/images/icon@4x.png";
const WORDMARK_SRC = "/images/wordmark.png";

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
          "site-header fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(148,64,221,0.06),0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-lg transition-transform duration-300 ease-in-out",
          chromeVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="site-header__accent" aria-hidden />

        <div className="site-header__bar site-container">
          {/* Left — question-mark icon */}
          <div className="site-header__slot site-header__slot--start">
            <Link href="/" className="site-header__icon-link" aria-label="DAWA-HI home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ICON_SRC}
                alt=""
                width={4320}
                height={4321}
                decoding="async"
                className="site-header__icon"
                draggable={false}
              />
            </Link>
          </div>

          {/* Center — main navigation */}
          <nav className="site-header__nav" aria-label="Main">
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

          {/* Right — DAWA-HI wordmark */}
          <div className="site-header__slot site-header__slot--end">
            <Link href="/" className="site-header__wordmark-link" aria-label="DAWA-HI">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WORDMARK_SRC}
                alt="DAWA-HI"
                width={4320}
                height={4321}
                decoding="async"
                className="site-header__wordmark"
                draggable={false}
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="site-header__spacer" aria-hidden />
    </>
  );
}
