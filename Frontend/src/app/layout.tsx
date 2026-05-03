import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Providers } from "@/components/providers";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full min-h-full antialiased text-[18px]`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          {children}
          <LoadingOverlay />
        </Providers>
      </body>
    </html>
  );
}
