import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { SiteBackground } from "@/components/site-background";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAWA-HI",
  description: "IQRA streaming and a gentle Q&A space for families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-transparent text-[var(--foreground)]">
        <SiteBackground />
        <div className="flex min-h-dvh flex-1 flex-col">
          <AppShell>{children}</AppShell>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
