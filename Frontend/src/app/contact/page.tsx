import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { PageContainer } from "@/components/page-container";

export const metadata = {
  title: "Contact Us · Fear to Faith",
  description: "Get in touch with the Fear to Faith team.",
};

export default function ContactPage() {
  return (
    <PageContainer>
      <section className="surface-card surface-card--elevated">
        <div className="surface-card__body">
          <p className="type-label font-semibold text-[#9440DD]">Contact Us</p>
          <h1 className="type-h1 mt-2 font-black text-slate-900">
            We&apos;d love to hear from you
          </h1>
          <p className="type-body-lg mt-5 max-w-3xl text-slate-700">
            Questions about IQRA, Safe Space, or partnering with Fear to Faith?
            Send us a note and a member of our team will respond when they can.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 md:p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 ring-1 ring-[#9440DD]/15">
                <Mail className="size-5 text-[#9440DD]" aria-hidden />
              </div>
              <div>
                <p className="type-h3 font-bold text-slate-900">Email</p>
                <a
                  href="mailto:hello@dawa-hi.org"
                  className="type-body mt-1 block text-[#9440DD] hover:underline"
                >
                  hello@dawa-hi.org
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 md:p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 ring-1 ring-[#9440DD]/15">
                <MapPin className="size-5 text-[#9440DD]" aria-hidden />
              </div>
              <div>
                <p className="type-h3 font-bold text-slate-900">For families</p>
                <p className="type-body mt-1 text-slate-600">
                  Parents and educators — tell us how we can support your learners.
                </p>
              </div>
            </div>
          </div>

          <form className="mt-8 space-y-5 md:mt-10 lg:max-w-2xl" action="#" method="post">
            <div>
              <label htmlFor="contact-name" className="type-body block font-semibold text-slate-900">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="btn-touch mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[0.9375rem] outline-none ring-[#9440DD]/30 focus:border-[#9440DD]/40 focus:ring-2 md:text-base"
                placeholder="How should we address you?"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="type-body block font-semibold text-slate-900">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="btn-touch mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[0.9375rem] outline-none ring-[#9440DD]/30 focus:border-[#9440DD]/40 focus:ring-2 md:text-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="type-body block font-semibold text-slate-900">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="type-body mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-[#9440DD]/30 focus:border-[#9440DD]/40 focus:ring-2 lg:min-h-[9rem]"
                placeholder="What would you like to share?"
              />
            </div>
            <button
              type="submit"
              className="btn-touch btn-primary w-full px-8 text-[0.9375rem] md:w-auto md:text-base"
            >
              Send message
            </button>
            <p className="type-body text-slate-500">
              This demo form does not send email yet — connect your mail service when ready.
            </p>
          </form>

          <Link
            href="/"
            className="btn-touch mt-8 inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 text-[0.9375rem] font-semibold text-slate-700 hover:bg-slate-50 md:text-base"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
