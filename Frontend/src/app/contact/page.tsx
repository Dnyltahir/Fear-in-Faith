import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
export const metadata = {
  title: "Contact Us · DAWA-HI",
  description: "Get in touch with the DAWA-HI team.",
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pb-6 sm:px-6 sm:pb-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9440DD]">
            Contact Us
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-800">
            Questions about IQRA, the Round Table, or partnering with DAWA-HI?
            Send us a note and a member of our team will respond when they can.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Mail className="size-6 shrink-0 text-[#9440DD]" aria-hidden />
              <div>
                <p className="font-bold text-slate-900">Email</p>
                <a
                  href="mailto:hello@dawa-hi.org"
                  className="mt-1 text-lg text-[#9440DD] hover:underline"
                >
                  hello@dawa-hi.org
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <MapPin className="size-6 shrink-0 text-[#9440DD]" aria-hidden />
              <div>
                <p className="font-bold text-slate-900">For families</p>
                <p className="mt-1 text-slate-800">
                  Parents and educators — tell us how we can support your
                  learners.
                </p>
              </div>
            </div>
          </div>

          <form className="mt-10 space-y-5" action="#" method="post">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-lg font-semibold text-slate-900"
              >
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg outline-none ring-[#9440DD]/30 focus:ring-2"
                placeholder="How should we address you?"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-lg font-semibold text-slate-900"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg outline-none ring-[#9440DD]/30 focus:ring-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-lg font-semibold text-slate-900"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg outline-none ring-[#9440DD]/30 focus:ring-2"
                placeholder="What would you like to share?"
              />
            </div>
            <button
              type="submit"
              className="h-14 w-full rounded-2xl bg-[#9440DD] text-lg font-bold text-white shadow-lg shadow-[#9440DD]/25 hover:bg-[#7a32bd] sm:w-auto sm:px-10"
            >
              Send message
            </button>
            <p className="text-sm text-slate-700">
              This demo form does not send email yet — connect your mail service
              when you are ready for production.
            </p>
          </form>

          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-2xl border border-slate-200 bg-white px-6 text-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </>
  );
}
