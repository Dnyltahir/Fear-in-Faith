import Link from "next/link";
import { MessageCircle, Sparkles, Tv } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const HIGHLIGHTS = [
  { icon: Tv, label: "Discovery Zone" },
  { icon: MessageCircle, label: "Round Table" },
  { icon: Sparkles, label: "Safe by design" },
] as const;

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-20 mt-8 shrink-0 pb-8 sm:mt-10 lg:mt-12 lg:pb-10 tv:mt-14 tv:pb-12">
      <div className="site-container">
        <div className="surface-card overflow-hidden">
          <div className="h-1 bg-[#FFDE59]" aria-hidden />
          <div className="surface-card__body">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
              <div className="min-w-0 max-w-lg">
                <p className="type-label font-semibold text-[#9440DD]">About</p>
                <h2 className="type-h2 mt-1 font-black text-slate-900">
                  DAWA-HI · Fear to Faith
                </h2>
                <p className="type-body mt-2 text-slate-600">
                  A gentle space for families — IQRA stories, scholar chat, and
                  kindness-first community.
                </p>
              </div>
              <nav
                className="flex shrink-0 flex-wrap gap-2 md:justify-end"
                aria-label="Footer"
              >
                {LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="btn-touch rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-slate-700 transition-colors hover:border-[#9440DD]/35 hover:bg-purple-50 hover:text-[#9440DD] md:text-sm lg:text-base tv:text-lg"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.8125rem] font-semibold text-slate-700 md:text-sm"
                >
                  <Icon className="size-3.5 text-[#9440DD] md:size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="type-label border-t border-slate-100 bg-slate-50/90 px-5 py-3 text-center font-medium normal-case tracking-normal text-slate-500">
            © {new Date().getFullYear()} DAWA-HI · Made with care for curious hearts
          </p>
        </div>
      </div>
    </footer>
  );
}
