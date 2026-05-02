"use client";

import { useEffect, useState } from "react";

const STORAGE = "k-design-poc-sprint-v1";

type Task = { id: string; label: string; phase: string };

const TASKS: Task[] = [
  { id: "0-1", label: "Phase 0: 기존 _workspace 백업 여부 결정", phase: "Day 1–2" },
  { id: "0-2", label: "00_input/brief.md 저장", phase: "Day 1–2" },
  { id: "1-1", label: "Phase 1: In/Out 스코프 · 데모 시나리오 1개", phase: "Day 2–3" },
  { id: "1-2", label: "01_scope.md 확정", phase: "Day 2–3" },
  { id: "2-1", label: "Phase 2: 분석·구현·카피 병렬 (팬아웃)", phase: "Day 4–8" },
  { id: "2-2", label: "02_* 산출물 접두어 규칙 지키기", phase: "Day 4–8" },
  { id: "3-1", label: "Phase 3: E2E 데모 경로 클릭 테스트", phase: "Day 9–10" },
  { id: "3-2", label: "생성-검증: 코드 리뷰 체크리스트 1회", phase: "Day 9–10" },
  { id: "3-3", label: "03_release-notes.md", phase: "Day 9–10" },
  { id: "4-1", label: "Phase 4: 스테이징/프로덕 URL·테스트 계정", phase: "Day 11–12" },
  { id: "4-2", label: "다음 2주 옵션 한 줄 제안", phase: "Day 11–12" },
];

export function SprintPlayground() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const reset = () => {
    setDone({});
    try {
      localStorage.removeItem(STORAGE);
    } catch {
      /* ignore */
    }
  };

  const total = TASKS.length;
  const count = TASKS.filter((t) => done[t.id]).length;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        POC · MVP Sprint
      </p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">2주 스프린트 체크리스트</h1>
      <p className="mb-6 text-[var(--muted)] leading-relaxed">
        <a
          href="https://github.com/choijinwon/k-design/blob/main/monetization/skills/mvp-sprint/SKILL.md"
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          mvp-sprint/SKILL.md
        </a>
        를 체험용으로 단순화했습니다. 체크 상태는 이 브라우저{" "}
        <code className="text-[var(--accent)]">localStorage</code>에만 저장됩니다.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)]/50 px-4 py-2 text-sm">
          진행:{" "}
          <span className="font-semibold text-[var(--accent)]">
            {count}/{total}
          </span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          초기화
        </button>
      </div>

      <ul className="space-y-3">
        {TASKS.map((t) => (
          <li
            key={t.id}
            className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 sm:p-4"
          >
            <input
              type="checkbox"
              checked={Boolean(done[t.id])}
              onChange={() => toggle(t.id)}
              className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
              aria-label={t.label}
            />
            <div>
              <span className="text-xs text-[var(--muted)]">{t.phase}</span>
              <p
                className={`text-sm leading-relaxed ${
                  done[t.id]
                    ? "text-[var(--muted)] line-through"
                    : "text-[var(--foreground)]"
                }`}
              >
                {t.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
