"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
] as const;

function navClass(active: boolean) {
  return active
    ? "rounded-lg bg-[#9440DD] px-2.5 py-1 text-xs font-bold text-white shadow-sm shadow-[#9440DD]/20 sm:text-sm"
    : "rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-white/90 hover:text-[#9440DD] sm:text-sm";
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-16 shrink-0 overflow-hidden border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md sm:h-[4.75rem]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-3 px-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex h-full min-w-0 shrink-0 items-center sm:max-w-[42%]"
        >
          <Image
            src="/images/wordmark.png"
            alt="DAWA-HI"
            width={220}
            height={56}
            priority
            className="block h-10 w-auto max-h-10 max-w-[min(52vw,200px)] object-contain object-left sm:h-12 sm:max-h-12 sm:max-w-[240px]"
          />
        </Link>

        <nav
          className="flex items-center justify-center gap-0.5 sm:gap-1"
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
          className="flex h-full shrink-0 items-center"
          aria-label="DAWA-HI home"
        >
          <Image
            src="/images/icon.png"
            alt=""
            width={56}
            height={56}
            className="block size-10 object-contain sm:size-12"
          />
        </Link>
      </div>
    </header>
  );
}
