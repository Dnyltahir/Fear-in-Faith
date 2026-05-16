import Link from "next/link";
import { MessageCircle, Sparkles, Tv } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
] as const;

const HIGHLIGHTS = [
  { icon: Tv, label: "Discovery Zone" },
  { icon: MessageCircle, label: "Round Table" },
  { icon: Sparkles, label: "Safe by design" },
] as const;

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative z-20 mt-10 shrink-0 pb-8 sm:mt-12 sm:pb-10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-[#9440DD]/25 bg-white shadow-md shadow-[#9440DD]/12 ring-1 ring-slate-200/90">
          <div className="h-1 bg-[#FFDE59]" aria-hidden />
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9440DD]">
                  About
                </p>
                <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                  DAWA-HI · Fear to Faith
                </h2>
                <p className="mt-1.5 max-w-md text-sm leading-snug text-slate-800">
                  A gentle space for families — IQRA stories, scholar chat, and
                  kindness-first community.
                </p>
              </div>
              <nav
                className="flex shrink-0 flex-wrap gap-2"
                aria-label="Footer"
              >
                {LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800 transition-colors hover:border-[#9440DD]/40 hover:bg-purple-50 hover:text-[#9440DD]"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800"
                >
                  <Icon className="size-3.5 text-[#9440DD]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-slate-100 bg-slate-50/90 px-5 py-2.5 text-center text-xs font-medium text-slate-700">
            © {new Date().getFullYear()} DAWA-HI · Made with care for curious hearts
          </p>
        </div>
      </div>
    </footer>
  );
}
