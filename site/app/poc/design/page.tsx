import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { DesignPlayground } from "@/components/poc/DesignPlayground";

export const metadata: Metadata = {
  title: "POC · 디자인 · UI 키",
  description:
    "샘플 팔레트·레퍼런스 허브(HIG·Mobbin 등), UI 적합성 매트릭스, 토큰·WCAG·컴포넌트·시나리오 라이브 미리보기.",
  alternates: { canonical: "/poc/design" },
};

export default function PocDesignPage() {
  return (
    <PocShell>
      <DesignPlayground />
    </PocShell>
  );
}
