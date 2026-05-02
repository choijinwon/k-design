import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { SprintPlayground } from "@/components/poc/SprintPlayground";

export const metadata: Metadata = {
  title: "POC · 2주 스프린트",
  description:
    "MVP 스프린트 단계별 체크리스트. 진행 상태는 브라우저에만 저장됩니다.",
  alternates: { canonical: "/poc/sprint" },
};

export default function PocSprintPage() {
  return (
    <PocShell>
      <SprintPlayground />
    </PocShell>
  );
}
