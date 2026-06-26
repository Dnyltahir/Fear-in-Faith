import Link from "next/link";
import { MessageCircle, Sparkles, Tv } from "lucide-react";
import { PageContainer } from "@/components/page-container";

export const metadata = {
  title: "About · Fear to Faith",
  description: "Learn about the Fear to Faith family experience.",
};

const FEATURES = [
  {
    icon: Tv,
    title: "Story Mode",
    body: "Watch episodes built for families learning together.",
  },
  {
    icon: MessageCircle,
    title: "Safe Space",
    body: "Connect with scholars in a moderated Q&A space.",
  },
  {
    icon: Sparkles,
    title: "Safe by design",
    body: "Verified guides, reporting tools, and family-first tips.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageContainer>
      <section className="surface-card surface-card--elevated">
        <div className="surface-card__body">
          <p className="type-label font-semibold text-[#9440DD]">About</p>
          <h1 className="type-h1 mt-2 font-black text-slate-900">
            Fear to Faith
          </h1>
          <p className="type-body-lg mt-5 max-w-3xl text-slate-700">
            Fear to Faith is a gentle home for families exploring faith together. We
            combine IQRA storytelling with a moderated Safe Space where children
            and parents can ask big questions and hear from verified guides.
          </p>
          <p className="type-body mt-4 max-w-3xl text-slate-600">
            Every part of the experience is designed to feel warm, clear, and
            safe — with kindness at the center and room for honest wonder.
          </p>

          <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 md:p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 ring-1 ring-[#9440DD]/15 md:size-11">
                  <Icon className="size-5 text-[#9440DD] md:size-[1.375rem]" aria-hidden />
                </div>
                <div>
                  <p className="type-h3 font-bold text-slate-900">{title}</p>
                  <p className="type-body mt-1 text-slate-600">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="btn-touch btn-primary mt-8 inline-flex px-6 text-[0.9375rem] md:mt-10 md:px-8 md:text-base"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
