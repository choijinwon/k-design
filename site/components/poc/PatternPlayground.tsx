"use client";

import { useMemo, useState } from "react";

type ScenarioKey =
  | "parallel"
  | "pipeline"
  | "supervisor"
  | "pool"
  | "education";

const SCENARIOS: Record<
  ScenarioKey,
  { label: string; patterns: string[]; detail: string }
> = {
  parallel: {
    label: "랜딩·카피·구현을 동시에 돌리고 한 번에 합친다",
    patterns: ["팬아웃/팬인", "생성-검증"],
    detail:
      "서로 다른 산출물이 같은 입력에서 나올 때. 통합 단계에서 품질을 맞춥니다.",
  },
  pipeline: {
    label: "스크립트 → 구조화 → 모듈 → 패키지 순서가 명확하다",
    patterns: ["파이프라인"],
    detail: "앞 단계 산출이 없으면 다음이 진행되지 않는 CBT·배치 플로우.",
  },
  supervisor: {
    label: "마감·우선순위가 바뀌며 작업을 계속 재배치한다",
    patterns: ["감독자(Supervisor)", "생성-검증"],
    detail:
      "에이전시 납품처럼 공유 작업 목록·클레임에 가깝게 돌릴 때.",
  },
  pool: {
    label: "교안 유형·보안 요건에 따라 다른 하위 플로를 탄다",
    patterns: ["계층적 위임", "전문가 풀"],
    detail:
      "입력 분류 후 전문 파이프라인만 호출. 엔터프라이즈 CBT에 가깝습니다.",
  },
  education: {
    label: "강의 단원·자료·퀴즈를 나눠 만든 뒤 하나의 커리큘럼으로 합친다",
    patterns: ["팬아웃/팬인"],
    detail: "콘텐츠 제작 병렬화 후 편집 통합.",
  },
};

export function PatternPlayground() {
  const [scenario, setScenario] = useState<ScenarioKey>("parallel");
  const [needReview, setNeedReview] = useState(true);

  const extra = useMemo(() => {
    if (!needReview) return [] as string[];
    return ["생성-검증(Producer–Reviewer)"];
  }, [needReview]);

  const row = SCENARIOS[scenario];
  const patterns = [...new Set([...row.patterns, ...extra])];

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        POC · Harness
      </p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
        패턴 매칭 플레이그라운드
      </h1>
      <p className="mb-8 text-[var(--muted)] leading-relaxed">
        상황을 고르면{" "}
        <a
          href="https://github.com/revfactory/harness/blob/main/skills/harness/references/agent-design-patterns.md"
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Harness
        </a>{" "}
        용어로 추천 조합을 보여 줍니다. 실제 실행은 오케스트레이터가 Phase로
        나눕니다.
      </p>

      <div className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <label className="block">
          <span className="text-sm font-medium text-[var(--foreground)]">
            상황
          </span>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as ScenarioKey)}
            className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          >
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
              <option key={k} value={k}>
                {SCENARIOS[k].label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={needReview}
            onChange={(e) => setNeedReview(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          코드·교안·제안서에 <strong>리뷰·재시도 루프</strong>가 필요하다
        </label>
      </div>

      <div className="mt-10 rounded-xl border border-[var(--accent)]/25 bg-[var(--background)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          추천 패턴
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {patterns.map((p) => (
            <li
              key={p}
              className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-sm font-medium text-[var(--accent)]"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          {row.detail}
        </p>
      </div>
    </main>
  );
}
