import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";
import { PricingPlayground } from "@/components/poc/PricingPlayground";

export const metadata: Metadata = {
  title: "POC · 가격 시뮬 | K-Design Studio",
  description:
    "MVP·앱 단가·SaaS 티어 조합으로 월 매출(만원)을 시뮬레이션합니다.",
};

export default function PocPricingPage() {
  return (
    <PocShell>
      <PricingPlayground />
    </PocShell>
  );
}
