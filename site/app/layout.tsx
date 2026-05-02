import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { getSiteUrl } from "@/lib/site-config";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

const defaultDescription =
  "바이브코딩과 오케스트레이션으로 MVP·디자인 시스템·엔터프라이즈 UI를 납품합니다. Next.js·Harness Engineering·Electron. 견적·문의 환영.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "K-Design Studio | 바이브코딩 × Harness 에이전트 팀",
    template: "%s | K-Design Studio",
  },
  description: defaultDescription,
  keywords: [
    "바이브코딩",
    "MVP",
    "디자인 시스템",
    "UI 납품",
    "Next.js",
    "Harness Engineering",
    "AI 에이전트",
    "오케스트레이션",
    "Electron",
    "웹 에이전시",
    "풀스택",
  ],
  authors: [{ name: "K-Design Studio" }],
  creator: "K-Design Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "K-Design Studio",
    title: "K-Design Studio | 바이브코딩 × Harness 에이전트 팀",
    description: defaultDescription,
  },
  twitter: {
    card: "summary",
    title: "K-Design Studio | 바이브코딩 × Harness",
    description: defaultDescription,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
