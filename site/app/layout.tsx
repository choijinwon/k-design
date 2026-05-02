import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "K-Design Studio | 바이브코딩 × Harness 에이전트 팀",
  description:
    "1인 개발자 + AI 에이전트 팀으로 에이전시급 속도와 품질. MVP 스프린트, CBT·교육 SaaS, Electron. Next.js · Harness Engineering.",
  openGraph: {
    title: "K-Design Studio | 바이브코딩 × Harness",
    description:
      "MVP 2주 패키지, SCORM·오프라인 CBT, 풀스택 개발. Harness Engineering 기반 에이전트 운용.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
