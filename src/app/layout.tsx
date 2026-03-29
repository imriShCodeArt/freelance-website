import { Geist, Geist_Mono, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansHebrew = Noto_Sans_Hebrew({
  variable: "--font-noto-sans",
  subsets: ["hebrew"],
});

const fontClasses = `${geistSans.variable} ${geistMono.variable} ${notoSansHebrew.variable}`;

/**
 * Default `lang` / `dir` here; `DocumentHtmlLocale` in `app/[locale]/layout.tsx` updates
 * `<html>` on the client from the route param (avoids relying on `headers()` in the root
 * for SSG and avoids inline `<script>` in React, which triggers a console warning).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={fontClasses} lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
