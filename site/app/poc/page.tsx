import Link from "next/link";
import type { Metadata } from "next";
import { PocShell } from "@/components/PocShell";

export const metadata: Metadata = {
  title: "실행 POC | K-Design Studio",
  description:
    "디자인·UI 키 매트릭스, 교안 CBT 초안, 가격 시뮬, 패턴 매칭, MVP 스프린트를 브라우저에서 확인합니다.",
};

const cards = [
  {
    href: "/poc/design",
    title: "디자인 · UI 키",
    description:
      "ui-frameworks.md와 동기화한 적합성 매트릭스, 시나리오 가이드, 토큰·버튼 등 납품 UI 미리보기.",
  },
  {
    href: "/poc/cbt",
    title: "교안 → CBT 초안",
    description:
      "교육 스크립트를 붙여 넣으면 학습목표·모듈·퀴즈 초안을 생성합니다. Claude API 키가 없으면 데모 응답으로 동작합니다.",
  },
  {
    href: "/poc/pricing",
    title: "가격 시뮬",
    description:
      "pricing-model.md를 바탕으로 MVP·앱 단가·SaaS 티어 조합별 월 매출(만원)을 슬라이더로 확인합니다.",
  },
  {
    href: "/poc/patterns",
    title: "패턴 매칭",
    description:
      "납품·CBT 시나리오 설명에 맞는 오케스트레이션 패턴(팬아웃, 파이프라인, 감독자 등)을 골라 봅니다.",
  },
  {
    href: "/poc/sprint",
    title: "2주 스프린트",
    description:
      "mvp-sprint 스킬을 단순화한 체크리스트입니다. 진행률은 이 브라우저 localStorage에만 저장됩니다.",
  },
];

export default function PocHubPage() {
  return (
    <PocShell>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          실행 POC
        </p>
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
          브라우저에서 바로 써 보기
        </h1>
        <p className="mb-10 max-w-2xl text-[var(--muted)] leading-relaxed">
          아래 카드에서 데모를 고릅니다. 상단 탭으로 언제든 다른 POC로 이동할 수
          있습니다.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block h-full rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6 transition hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/70"
              >
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {c.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
                  열기 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </PocShell>
  );
}
