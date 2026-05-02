import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { PatternPlayground } from "@/components/poc/PatternPlayground";

export const metadata: Metadata = {
  title: "POC · 패턴 매칭 | K-Design Studio",
  description:
    "프로젝트 시나리오에 맞는 AI 오케스트레이션 패턴을 선택해 확인합니다.",
};

export default function PocPatternsPage() {
  return (
    <PocShell>
      <PatternPlayground />
    </PocShell>
  );
}
