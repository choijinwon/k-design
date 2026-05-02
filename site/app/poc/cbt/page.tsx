import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { PocPlayground } from "@/components/PocPlayground";

export const metadata: Metadata = {
  title: "교안 → CBT 설계 POC | K-Design Studio",
  description:
    "교육 스크립트 텍스트로 학습목표·모듈·퀴즈 초안을 생성하는 데모. Claude API 또는 데모 모드.",
};

export default function PocCbtPage() {
  return (
    <PocShell>
      <PocPlayground />
    </PocShell>
  );
}
