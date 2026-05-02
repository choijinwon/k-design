import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { DesignPlayground } from "@/components/poc/DesignPlayground";

export const metadata: Metadata = {
  title: "POC · 디자인 | K-Design Studio",
  description:
    "UI 프레임워크 적합성 매트릭스, 시나리오 가이드, 토큰·컴포넌트 미리보기.",
};

export default function PocDesignPage() {
  return (
    <PocShell>
      <DesignPlayground />
    </PocShell>
  );
}
