import Link from "next/link";
import { MessageCircle, Sparkles, Tv } from "lucide-react";
export const metadata = {
  title: "About · DAWA-HI",
  description: "Learn about DAWA-HI and the Fear to Faith family experience.",
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pb-6 sm:px-6 sm:pb-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9440DD]">
            About
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            DAWA-HI · Fear to Faith
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-800">
            DAWA-HI is a gentle home for families exploring faith together. We
            combine IQRA storytelling with a moderated Round Table where children
            and parents can ask big questions and hear from verified guides.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-800">
            Every part of the experience is designed to feel warm, clear, and
            safe — with kindness at the center and room for honest wonder.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Tv className="size-6 shrink-0 text-[#9440DD]" aria-hidden />
              <div>
                <p className="font-bold text-slate-900">Discovery Zone</p>
                <p className="mt-1 text-sm text-slate-800">
                  Watch episodes built for families learning together.
                </p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <MessageCircle className="size-6 shrink-0 text-[#9440DD]" aria-hidden />
              <div>
                <p className="font-bold text-slate-900">Round Table</p>
                <p className="mt-1 text-sm text-slate-800">
                  Connect with scholars in a moderated Q&amp;A space.
                </p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Sparkles className="size-6 shrink-0 text-[#9440DD]" aria-hidden />
              <div>
                <p className="font-bold text-slate-900">Safe by design</p>
                <p className="mt-1 text-sm text-slate-800">
                  Verified guides, reporting tools, and family-first tips.
                </p>
              </div>
            </li>
          </ul>

          <Link
            href="/"
            className="mt-10 inline-flex h-12 items-center rounded-2xl bg-[#9440DD] px-6 text-lg font-bold text-white shadow-lg shadow-[#9440DD]/25 hover:bg-[#7a32bd]"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </>
  );
}
