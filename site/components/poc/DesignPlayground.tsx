"use client";

import { useMemo, useState } from "react";

const STACKS = ["HTML", "React", "Vue", "Next.js", "Nuxt"] as const;

const UI_LIBS = [
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap" },
  { id: "m3", label: "Material Design 3 (스펙)" },
  { id: "mui", label: "MUI" },
  { id: "shadcn", label: "shadcn/ui" },
  { id: "ant", label: "Ant Design" },
  { id: "bulma", label: "Bulma" },
  { id: "materialize", label: "Materialize" },
] as const;

/** 행 순서: HTML · React · Vue · Next.js · Nuxt — monetization/references/ui-frameworks.md */
const MATRIX: Record<(typeof UI_LIBS)[number]["id"], readonly string[]> = {
  tailwind: ["권장", "권장", "권장", "권장", "권장"],
  bootstrap: ["권장", "가능", "가능", "가능", "가능"],
  m3: ["참고(스펙)", "참고(스펙)", "참고(스펙)", "참고(스펙)", "참고(스펙)"],
  mui: ["비권장", "권장", "비권장(React 전용)", "권장", "비권장 · React 아님"],
  shadcn: ["비권장", "권장", "별도 생태계", "권장(본류)", "별도 검증 · 커뮤니티 포트"],
  ant: ["비권장", "권장", "별도 · Ant Design Vue", "권장", "별도 · Vue 패키지"],
  bulma: ["권장", "가능", "가능", "가능", "가능"],
  materialize: [
    "가능 · 신규 비권장",
    "가능 · 신규 비권장",
    "가능 · 신규 비권장",
    "가능 · 신규 비권장",
    "가능 · 신규 비권장",
  ],
};

const DOC_HREF =
  "https://github.com/choijinwon/k-design/blob/main/monetization/references/ui-frameworks.md";

type Screen = "mpa" | "dash" | "embed" | "material";

function scenarioBlurb(stack: (typeof STACKS)[number], screen: Screen): string {
  const isNext = stack === "Next.js";
  const isHtml = stack === "HTML";
  const isVueFamily = stack === "Vue" || stack === "Nuxt";

  if (screen === "mpa" && isHtml) {
    return "마크업 위주·정적 페이지라면 Bootstrap 또는 Bulma로 빠르게 골격을 잡는 편이 문서상 자연스럽습니다.";
  }
  if (screen === "dash" && (stack === "React" || isNext)) {
    return "관리·테이블 밀도가 크면 MUI 또는 Ant Design으로 시간을 줄이고, 커스텀 소유권이 중요하면 Tailwind + shadcn/ui 조합을 검토합니다.";
  }
  if (screen === "dash" && isVueFamily) {
    return "Vue/Nuxt는 Tailwind + Nuxt UI 등 Vue 생태 키트를 우선하고, Ant는 Ant Design Vue 등 별도 패키지로 분기합니다.";
  }
  if (screen === "embed") {
    return "Electron·웹뷰·CBT 뷰어 등은 번들 제약이 있으면 유틸리티 CSS + 얇은 컴포넌트(Bulma만, 또는 Tailwind+소수 컴포넌트)를 후보에 둡니다.";
  }
  if (screen === "material") {
    return "“Material 룩”은 M3 문서로 토큰·접근성을 맞추고, 구현은 MUI·플랫폼 컴포넌트·자체 컴포넌트 중에서 고릅니다. M3 행 자체는 npm 한 방 설치가 아닙니다.";
  }
  if (isHtml) {
    return "정적 HTML에서는 Tailwind·Bootstrap·Bulma가 문서상 무난합니다. React 전용 라이브러리(MUI·shadcn 등)는 피합니다.";
  }
  return "스택에 맞는 열을 매트릭스에서 확인하고, 팀이 이미 익숙한 키트를 번들·중복 측면에서 한 번 더 짚으면 됩니다.";
}

export function DesignPlayground() {
  const [stackIdx, setStackIdx] = useState(3);
  const [libId, setLibId] = useState<(typeof UI_LIBS)[number]["id"]>("tailwind");
  const [screen, setScreen] = useState<Screen>("dash");

  const stack = STACKS[stackIdx];
  const cell = MATRIX[libId][stackIdx];
  const blurb = useMemo(
    () => scenarioBlurb(stack, screen),
    [stack, screen],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        POC · 디자인
      </p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
        UI 키·토큰·컴포넌트 미리보기
      </h1>
      <p className="mb-8 text-[var(--muted)] leading-relaxed">
        레포의{" "}
        <a
          href={DOC_HREF}
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ui-frameworks.md
        </a>
        매트릭스를 그대로 조회하고, 이 사이트가 쓰는 CSS 변수로 납품 UI 톤을
        확인합니다.
      </p>

      <section className="mb-10 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <h2 className="text-lg font-semibold">디자인 토큰 (이 사이트)</h2>
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["Background", "var(--background)"],
              ["Foreground", "var(--foreground)"],
              ["Muted", "var(--muted)"],
              ["Card", "var(--card)"],
              ["Border", "var(--border)"],
              ["Accent", "var(--accent)"],
            ] as const
          ).map(([label, v]) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs"
            >
              <span
                className="size-8 shrink-0 rounded-md border border-[var(--border)]"
                style={{ background: v === "var(--foreground)" ? "#e8eaef" : v }}
                title={v}
              />
              <div>
                <p className="font-medium text-[var(--foreground)]">{label}</p>
                <p className="text-[var(--muted)]">{v}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-1 border-t border-[var(--border)] pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            타이포 단계
          </p>
          <p className="text-xs text-[var(--muted)]">caption</p>
          <p className="text-sm text-[var(--foreground)]">body · 폼·본문</p>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            section title
          </p>
          <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Hero
          </p>
        </div>
      </section>

      <section className="mb-10 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <h2 className="text-lg font-semibold">컴포넌트 스트립 (납품 톤 샘플)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#041016] transition hover:brightness-110"
          >
            Primary
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
          >
            Outline
          </button>
          <span className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-2 py-1 text-xs font-medium text-[var(--accent)]">
            Badge
          </span>
          <input
            type="text"
            readOnly
            placeholder="Input 예시"
            className="min-w-[10rem] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
          />
        </div>
      </section>

      <section className="mb-10 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <h2 className="text-lg font-semibold">적합성 매트릭스 (문서 동기화)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[var(--foreground)]">
              스택
            </span>
            <select
              value={stackIdx}
              onChange={(e) => setStackIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
            >
              {STACKS.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[var(--foreground)]">
              UI 키트 / 스펙
            </span>
            <select
              value={libId}
              onChange={(e) =>
                setLibId(e.target.value as (typeof UI_LIBS)[number]["id"])
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
            >
              {UI_LIBS.map((L) => (
                <option key={L.id} value={L.id}>
                  {L.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">{stack}</span>
            {" × "}
            <span className="font-medium text-[var(--foreground)]">
              {UI_LIBS.find((x) => x.id === libId)?.label}
            </span>
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--accent)]">{cell}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            표기 상세(권장·가능·비권장 등)는 문서 「프레임워크 적합성 매트릭스」와
            동일합니다.
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <h2 className="text-lg font-semibold">시나리오 한 줄 (선택 가이드)</h2>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[var(--foreground)]">
            화면·제품 성격
          </span>
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as Screen)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
          >
            <option value="mpa">정적·마크업 위주 (MPA 성향)</option>
            <option value="dash">관리·대시보드·데이터 밀도</option>
            <option value="embed">임베디드·Electron·가벼운 뷰어</option>
            <option value="material">Material 토큰·룩앤필 중시</option>
          </select>
        </label>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          현재 스택 <strong className="text-[var(--foreground)]">{stack}</strong>
          : {blurb}
        </p>
      </section>
    </main>
  );
}
