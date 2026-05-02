"use client";

import { useMemo, useState } from "react";

const MVP = 350; // 만원
const SAAS = { off: 0, starter: 49, pro: 149 } as const;

export function PricingPlayground() {
  const [mvpCount, setMvpCount] = useState(1);
  const [appCount, setAppCount] = useState(0);
  const [appPrice, setAppPrice] = useState(800);
  const [saas, setSaas] = useState<keyof typeof SAAS>("off");

  const totals = useMemo(() => {
    const agency = mvpCount * MVP + appCount * appPrice;
    const saasM = SAAS[saas];
    return { agency, saasM, total: agency + saasM };
  }, [mvpCount, appCount, appPrice, saas]);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        POC · 가격
      </p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">월 매출 시뮬 (만원)</h1>
      <p className="mb-8 text-[var(--muted)] leading-relaxed">
        <a
          href="https://github.com/choijinwon/k-design/blob/main/monetization/references/pricing-model.md"
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          pricing-model.md
        </a>
        의 에이전시·SaaS 티어를 단순화해 봅니다. 앱 단가는 700~1,200만원 범위에서
        조정합니다.
      </p>

      <div className="space-y-8 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 p-6">
        <label className="block">
          <span className="text-sm font-medium text-[var(--foreground)]">
            MVP Sprint 건수 / 월 (건당 {MVP}만원)
          </span>
          <input
            type="range"
            min={0}
            max={5}
            value={mvpCount}
            onChange={(e) => setMvpCount(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-sm text-[var(--accent)]">{mvpCount}건</p>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-[var(--foreground)]">
            앱·풀스택 프로젝트 / 월
          </span>
          <input
            type="range"
            min={0}
            max={3}
            value={appCount}
            onChange={(e) => setAppCount(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-sm text-[var(--accent)]">{appCount}건</p>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-[var(--foreground)]">
            앱 1건당 가격 (만원)
          </span>
          <input
            type="range"
            min={700}
            max={1200}
            step={50}
            value={appPrice}
            onChange={(e) => setAppPrice(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-sm text-[var(--accent)]">
            {appPrice.toLocaleString()}만원
          </p>
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--foreground)]">
            CBT SaaS 티어 (월, 만원)
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {(
              [
                ["off", "없음"],
                ["starter", "Starter · 49"],
                ["pro", "Pro · 149"],
              ] as const
            ).map(([k, label]) => (
              <label
                key={k}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  saas === k
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                <input
                  type="radio"
                  name="saas"
                  checked={saas === k}
                  onChange={() => setSaas(k)}
                  className="accent-[var(--accent)]"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-10 rounded-xl border border-[var(--accent)]/30 bg-[var(--background)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">합계 (만원/월)</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-[var(--muted)]">
            <dt>에이전시 (MVP + 앱)</dt>
            <dd className="font-mono text-[var(--foreground)]">
              {totals.agency.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between text-[var(--muted)]">
            <dt>SaaS 구독</dt>
            <dd className="font-mono text-[var(--foreground)]">
              {totals.saasM.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base font-semibold text-[var(--accent)]">
            <dt>대략 합계</dt>
            <dd className="font-mono">{totals.total.toLocaleString()}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-[var(--muted)]">
          참고용이며 VAT·실제 범위·할인은 미반영입니다.
        </p>
      </div>
    </main>
  );
}
