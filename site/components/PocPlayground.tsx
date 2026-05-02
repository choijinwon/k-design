"use client";

import { useCallback, useState } from "react";
import type { PocOutline } from "@/lib/poc-types";

type ApiError = { error: string };

export function PocPlayground() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PocOutline | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/poc/outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as PocOutline | ApiError;
      if (!res.ok) {
        setError("error" in data ? data.error : "요청 실패");
        return;
      }
      if ("learningObjectives" in data) setResult(data);
    } catch {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }, [text]);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        Proof of concept
      </p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
        교안 → CBT 설계 초안 (POC)
      </h1>
      <p className="mb-8 max-w-2xl text-[var(--muted)] leading-relaxed">
        PDF 대신 <strong className="text-[var(--foreground)]">텍스트 붙여넣기</strong>
        로 빠르게 검증합니다. Vercel 등에{" "}
        <code className="text-[var(--accent)]">ANTHROPIC_API_KEY</code>를 넣으면
        Claude가 분석하고, 없으면 <strong className="text-[var(--foreground)]">데모</strong>
        구조가 나옵니다. 실제 납품 파이프라인·SCORM·Electron은 별도 협의입니다.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-4 sm:p-6">
        <label className="block text-sm font-medium text-[var(--foreground)]">
          교육 스크립트 (텍스트)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder={`예) 1장 안전 수칙…\n2장 점검 절차…\n`}
          className="mt-2 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            disabled={loading || text.trim().length < 20}
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 font-semibold text-[#041016] transition hover:brightness-110 disabled:opacity-40"
          >
            {loading ? "생성 중…" : "학습목표·모듈 초안 만들기"}
          </button>
          <span className="self-center text-xs text-[var(--muted)]">
            최소 20자 · 최대 약 28,000자
          </span>
        </div>
      </div>

      {error ? (
        <div
          className="mt-6 rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-10 space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                result.mode === "live"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-200"
              }`}
            >
              {result.mode === "live" ? "Claude 응답" : "데모 (mock)"}
            </span>
            {result.note ? (
              <span className="text-sm text-[var(--muted)]">{result.note}</span>
            ) : null}
          </div>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              학습 목표
            </h2>
            <ol className="list-inside list-decimal space-y-2 text-[var(--muted)]">
              {result.learningObjectives.map((o, i) => (
                <li key={i} className="leading-relaxed">
                  {o}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              모듈 · 시나리오 단위
            </h2>
            <div className="space-y-4">
              {result.sections.map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
                >
                  <h3 className="font-semibold text-[var(--accent)]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {s.summary}
                  </p>
                  {s.interactionIdea ? (
                    <p className="mt-2 text-xs text-[var(--foreground)]/80">
                      <span className="text-[var(--muted)]">인터랙션 아이디어: </span>
                      {s.interactionIdea}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              평가·퀴즈 아이디어
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--muted)]">
              {result.quizIdeas.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>

          <details className="rounded-lg border border-[var(--border)] bg-[#050810] p-4 font-mono text-xs text-[var(--foreground)]/80">
            <summary className="cursor-pointer text-[var(--accent)]">Raw JSON</summary>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      ) : null}
    </main>
  );
}
