"use client";

import type { CSSProperties } from "react";
import type { Screen } from "@/components/poc/scenario-screen";

export type LiveScreenTokens = {
  "--background": string;
  "--foreground": string;
  "--muted": string;
  "--card": string;
  "--border": string;
  "--accent": string;
  "--accent-dim": string;
};

function shellRadius(guideId: string): string {
  switch (guideId) {
    case "m3":
      return "1rem";
    case "govuk":
      return "0.125rem";
    case "apple-hig":
      return "0.75rem";
    case "fluent":
    case "carbon":
      return "0.25rem";
    default:
      return "0.5rem";
  }
}

type ShellKind = "app" | "marketing" | "docs" | "mobile";

function shellKindForScenario(scenario: Screen): ShellKind {
  if (scenario === "marketing" || scenario === "mpa") return "marketing";
  if (scenario === "docs_devportal") return "docs";
  if (scenario === "mobile_pwa") return "mobile";
  return "app";
}

function scenarioHeadline(label: string): { kicker: string; detail: string } {
  const parts = label.split(" — ");
  return {
    kicker: parts[0]?.trim() ?? label,
    detail: parts[1]?.trim() ?? "",
  };
}

/** 사이드 네비에서 강조할 인덱스 (데모용) */
const NAV_ACTIVE: Record<Screen, number> = {
  mpa: 0,
  marketing: 0,
  mobile_pwa: 0,
  dash: 0,
  data_viz: 0,
  forms_wizard: 3,
  content_editorial: 1,
  docs_devportal: 0,
  embed: 0,
  prototype_spike: 0,
  cbt_edu: 1,
  marketplace: 1,
  realtime_collab: 2,
  white_label: 3,
  material: 0,
  a11y_public: 3,
};

type Props = {
  tokens: LiveScreenTokens;
  primaryOnAccent: string;
  guideId: string;
  guideName: string;
  libLabel: string;
  stackLabel: string;
  fontFamily?: string;
  scenario: Screen;
  /** SCENARIO_OPTIONS 항목의 전체 label */
  scenarioLabel: string;
};

export function DesignSystemLiveScreen({
  tokens,
  primaryOnAccent,
  guideId,
  guideName,
  libLabel,
  stackLabel,
  fontFamily,
  scenario,
  scenarioLabel,
}: Props) {
  const r = shellRadius(guideId);
  const shellStyle = {
    "--background": tokens["--background"],
    "--foreground": tokens["--foreground"],
    "--muted": tokens["--muted"],
    "--card": tokens["--card"],
    "--border": tokens["--border"],
    "--accent": tokens["--accent"],
    "--accent-dim": tokens["--accent-dim"],
    borderRadius: r,
    fontFamily: fontFamily ?? undefined,
  } as CSSProperties;

  const kind = shellKindForScenario(scenario);
  const { kicker, detail } = scenarioHeadline(scenarioLabel);

  const metaLine = [stackLabel, libLabel, detail || kicker].filter(Boolean).join(" · ");

  if (kind === "marketing") {
    return (
      <div
        className="min-h-[440px] overflow-hidden border-2 border-[var(--border)] shadow-2xl"
        style={shellStyle}
      >
        <MarketingShell
          r={r}
          guideName={guideName}
          title={kicker}
          metaLine={metaLine}
          primaryOnAccent={primaryOnAccent}
          scenario={scenario}
        />
      </div>
    );
  }

  if (kind === "docs") {
    return (
      <div
        className="min-h-[440px] overflow-hidden border-2 border-[var(--border)] shadow-2xl"
        style={shellStyle}
      >
        <DocsShell
          r={r}
          guideName={guideName}
          title={kicker}
          metaLine={metaLine}
          primaryOnAccent={primaryOnAccent}
        />
      </div>
    );
  }

  if (kind === "mobile") {
    return (
      <div
        className="min-h-[440px] overflow-hidden border-2 border-[var(--border)] shadow-2xl"
        style={shellStyle}
      >
        <MobileShell
          r={r}
          guideName={guideName}
          title={kicker}
          metaLine={metaLine}
        />
      </div>
    );
  }

  const nav = ["대시보드", "프로젝트", "팀", "설정"];
  const navActive = NAV_ACTIVE[scenario] ?? 0;

  return (
    <div
      className="min-h-[440px] overflow-hidden border-2 border-[var(--border)] shadow-2xl"
      style={shellStyle}
    >
      <div className="flex min-h-[440px]">
        <aside className="hidden w-44 shrink-0 border-r border-[var(--border)] bg-[var(--card)] sm:block sm:w-52">
          <div className="border-b border-[var(--border)] p-3">
            <p className="text-xs font-semibold tracking-tight text-[var(--foreground)]">
              Acme
            </p>
            <p className="mt-0.5 text-[10px] text-[var(--muted)]">{guideName}</p>
          </div>
          <nav className="p-2">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item}>
                  <span
                    className={`block cursor-default px-3 py-2 text-xs font-medium ${
                      i === navActive
                        ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                    style={{ borderRadius: r }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--card)]/80 px-3 py-3 sm:px-4">
            <div>
              <h1 className="text-sm font-semibold text-[var(--foreground)]">
                {kicker}
              </h1>
              <p className="text-[10px] text-[var(--muted)]">{metaLine}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="hidden rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-[10px] text-[var(--muted)] sm:inline"
                style={{ borderRadius: r }}
              >
                검색…
              </span>
              <span
                className="flex size-8 items-center justify-center bg-[var(--accent)]/25 text-xs font-bold text-[var(--accent)]"
                style={{ borderRadius: r }}
              >
                U
              </span>
            </div>
          </header>

          <main className="relative flex-1 space-y-4 overflow-auto bg-[var(--background)] p-3 sm:p-5">
            <ScenarioMain
              scenario={scenario}
              r={r}
              primaryOnAccent={primaryOnAccent}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

function ScenarioMain({
  scenario,
  r,
  primaryOnAccent,
}: {
  scenario: Screen;
  r: string;
  primaryOnAccent: string;
}) {
  switch (scenario) {
    case "dash":
      return <DashboardMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "material":
      return (
        <div className="relative pb-14">
          <DashboardMain r={r} primaryOnAccent={primaryOnAccent} />
          <button
            type="button"
            className="absolute bottom-0 right-0 flex size-12 items-center justify-center text-lg font-light shadow-lg"
            style={{
              borderRadius: "9999px",
              background: "var(--accent)",
              color: primaryOnAccent,
            }}
            aria-label="새로 만들기"
          >
            +
          </button>
          <p className="absolute bottom-14 right-0 max-w-[200px] text-[9px] text-[var(--muted)]">
            M3 스타일 FAB 데모
          </p>
        </div>
      );
    case "marketplace":
      return <CatalogMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "forms_wizard":
      return <FormsWizardMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "data_viz":
      return <DataVizMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "content_editorial":
      return <EditorialMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "embed":
      return <EmbedMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "prototype_spike":
      return <PrototypeSpikeMain r={r} />;
    case "cbt_edu":
      return <CbtEduMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "realtime_collab":
      return <CollabMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "white_label":
      return <WhiteLabelMain r={r} primaryOnAccent={primaryOnAccent} />;
    case "a11y_public":
      return <A11yPublicMain r={r} primaryOnAccent={primaryOnAccent} />;
    default:
      return <DashboardMain r={r} primaryOnAccent={primaryOnAccent} />;
  }
}

/* ——— 마케팅 / MPA 셸 ——— */

function MarketingShell({
  r,
  guideName,
  title,
  metaLine,
  primaryOnAccent,
  scenario,
}: {
  r: string;
  guideName: string;
  title: string;
  metaLine: string;
  primaryOnAccent: string;
  scenario: Screen;
}) {
  const isMpa = scenario === "mpa";

  return (
    <div className="flex min-h-[440px] flex-col">
      <header
        className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3"
        style={{ borderRadius: `${r} ${r} 0 0` }}
      >
        <span className="text-xs font-semibold text-[var(--foreground)]">
          Acme · {guideName}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="border border-[var(--border)] px-3 py-1.5 text-[10px] text-[var(--muted)]"
            style={{ borderRadius: r }}
          >
            로그인
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-[10px] font-semibold"
            style={{
              borderRadius: r,
              background: "var(--accent)",
              color: primaryOnAccent,
            }}
          >
            시작하기
          </button>
        </div>
      </header>
      <main className="flex-1 space-y-6 bg-[var(--background)] px-4 py-6 sm:px-8">
        <p className="text-[10px] text-[var(--muted)]">{metaLine}</p>
        {isMpa ? (
          <>
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              서비스 소개
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              MPA·정적 페이지에 가까운 밀도입니다. 섹션은 서버 템플릿으로
              나누고, 상호작용은 최소화하는 패턴을 가정했습니다.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-[var(--foreground)]">
              <li>SEO 친화적 마크업</li>
              <li>점진적 향상</li>
              <li>캐시·배포 단순화</li>
            </ul>
            <button
              type="button"
              className="border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--foreground)]"
              style={{ borderRadius: r }}
            >
              문서 더 보기
            </button>
          </>
        ) : (
          <>
            <div
              className="border border-[var(--border)] bg-[var(--card)]/40 px-6 py-10 text-center"
              style={{ borderRadius: r }}
            >
              <p className="text-xs font-medium text-[var(--accent)]">
                캠페인 2026
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                팀이 쓰기 좋은 제품을 빠르게
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--muted)]">
                히어로·전환 CTA·신뢰 지표 블록을 한 화면에 묶은 랜딩형 레이아웃
                데모입니다.
              </p>
              <button
                type="button"
                className="mt-6 px-6 py-2.5 text-xs font-semibold"
                style={{
                  borderRadius: r,
                  background: "var(--accent)",
                  color: primaryOnAccent,
                }}
              >
                무료로 시작
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["빠른 온보딩", "보안 기본값", "확장 가능"].map((t) => (
                <div
                  key={t}
                  className="border border-[var(--border)] bg-[var(--card)]/30 p-4"
                  style={{ borderRadius: r }}
                >
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    {t}
                  </p>
                  <p className="mt-2 text-[10px] leading-relaxed text-[var(--muted)]">
                    짧은 설명 copy가 들어가는 카드입니다.
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="text-[10px] text-[var(--muted)]">시나리오: {title}</p>
      </main>
    </div>
  );
}

/* ——— 문서 포털 셸 ——— */

function DocsShell({
  r,
  guideName,
  title,
  metaLine,
  primaryOnAccent,
}: {
  r: string;
  guideName: string;
  title: string;
  metaLine: string;
  primaryOnAccent: string;
}) {
  const toc = ["개요", "시작하기", "API 참조", "SDK", "변경 내역"];

  return (
    <div className="flex min-h-[440px]">
      <aside className="hidden w-36 shrink-0 border-r border-[var(--border)] bg-[var(--card)] sm:block">
        <div className="border-b border-[var(--border)] p-2">
          <p className="text-[10px] font-semibold text-[var(--foreground)]">
            Docs
          </p>
          <p className="text-[9px] text-[var(--muted)]">{guideName}</p>
        </div>
        <nav className="p-2">
          <ul className="space-y-0.5">
            {toc.map((t, i) => (
              <li key={t}>
                <span
                  className={`block px-2 py-1.5 text-[10px] ${
                    i === 1
                      ? "font-medium text-[var(--accent)]"
                      : "text-[var(--muted)]"
                  }`}
                  style={{ borderRadius: r }}
                >
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--card)]/80 px-3 py-2">
          <span className="text-[10px] text-[var(--muted)]">{metaLine}</span>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-[var(--muted)]">버전</span>
            <select
              className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-[10px] text-[var(--foreground)]"
              style={{ borderRadius: r }}
              aria-label="문서 버전"
            >
              <option>v2</option>
              <option>v1</option>
            </select>
          </div>
        </header>
        <main className="flex-1 space-y-4 overflow-auto bg-[var(--background)] p-4">
          <div>
            <p className="text-[10px] font-medium uppercase text-[var(--muted)]">
              {title}
            </p>
            <h2 className="mt-1 text-lg font-bold text-[var(--foreground)]">
              첫 API 호출하기
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
              개발자 포털에서는 검색·버전 스위치·코드 샘플 대비가 중요합니다.
            </p>
          </div>
          <pre
            className="overflow-x-auto border border-[var(--border)] bg-[var(--card)]/50 p-3 text-[10px] text-[var(--accent)]"
            style={{ borderRadius: r }}
          >
            <code>{`curl -H "Authorization: Bearer \\$TOKEN" \\
  https://api.example.com/v2/resources`}</code>
          </pre>
          <button
            type="button"
            className="px-4 py-2 text-[10px] font-semibold"
            style={{
              borderRadius: r,
              background: "var(--accent)",
              color: primaryOnAccent,
            }}
          >
            콘솔에서 시도
          </button>
        </main>
      </div>
    </div>
  );
}

/* ——— 모바일 셸 ——— */

function MobileShell({
  r,
  guideName,
  title,
  metaLine,
}: {
  r: string;
  guideName: string;
  title: string;
  metaLine: string;
}) {
  const tabs = ["홈", "검색", "알림", "프로필"];
  return (
    <div className="flex min-h-[440px] items-stretch justify-center bg-[var(--card)]/20 py-3">
      <div
        className="flex w-full max-w-[300px] flex-col overflow-hidden border-2 border-[var(--border)] bg-[var(--background)] shadow-xl"
        style={{ borderRadius: r }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/60 px-3 py-2">
          <span className="text-[10px] font-semibold text-[var(--foreground)]">
            9:41
          </span>
          <span className="text-[9px] text-[var(--muted)]">{guideName}</span>
        </div>
        <div className="shrink-0 border-b border-[var(--border)] px-3 py-2">
          <p className="text-[10px] text-[var(--muted)]">{metaLine}</p>
          <p className="mt-1 text-xs font-semibold text-[var(--foreground)]">
            {title}
          </p>
        </div>
        <main className="min-h-[280px] flex-1 space-y-2 overflow-auto p-3">
          {["오프라인 모드 캐시됨", "새 메시지 2건", "다운로드 완료"].map(
            (row) => (
              <div
                key={row}
                className="flex items-center justify-between border border-[var(--border)] bg-[var(--card)]/30 px-3 py-2.5"
                style={{ borderRadius: r }}
              >
                <span className="text-[10px] text-[var(--foreground)]">
                  {row}
                </span>
                <span className="text-[var(--muted)]">›</span>
              </div>
            ),
          )}
        </main>
        <nav className="flex shrink-0 border-t border-[var(--border)] bg-[var(--card)]/80">
          {tabs.map((t, i) => (
            <div
              key={t}
              className={`flex flex-1 flex-col items-center py-2 text-[9px] ${
                i === 0 ? "text-[var(--accent)]" : "text-[var(--muted)]"
              }`}
            >
              <span className="mb-0.5 size-4 rounded bg-[var(--accent)]/20" />
              {t}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ——— 시나리오 메인 블록들 ——— */

function DashboardMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          오늘
        </p>
        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
          대시보드 개요
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          KPI와 테이블로 자주 쓰는 관리 화면 패턴입니다.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["전환", "3.2%", "+0.4"],
          ["활성 사용자", "1,204", "+128"],
          ["미처리", "12", "−3"],
        ].map(([t, v, d]) => (
          <div
            key={t}
            className="border border-[var(--border)] bg-[var(--card)]/50 p-3"
            style={{ borderRadius: r }}
          >
            <p className="text-[10px] text-[var(--muted)]">{t}</p>
            <p className="mt-1 text-xl font-semibold text-[var(--foreground)]">
              {v}
            </p>
            <p className="text-[10px] text-emerald-400">{d}</p>
          </div>
        ))}
      </div>
      <div
        className="overflow-hidden border border-[var(--border)]"
        style={{ borderRadius: r }}
      >
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[var(--border)] bg-[var(--card)]/60 text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2 font-medium">작업</th>
              <th className="px-3 py-2 font-medium">담당</th>
              <th className="px-3 py-2 font-medium text-right">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-[var(--foreground)]">
            {[
              ["디자인 토큰 정리", "민수", "진행"],
              ["API 스펙 검토", "지우", "대기"],
            ].map(([a, b, c]) => (
              <tr key={a} className="bg-[var(--background)]">
                <td className="px-3 py-2 font-medium">{a}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{b}</td>
                <td className="px-3 py-2 text-right">
                  <span
                    className={
                      c === "진행"
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)]"
                    }
                  >
                    {c}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="px-4 py-2 text-xs font-semibold"
          style={{
            borderRadius: r,
            background: "var(--accent)",
            color: primaryOnAccent,
          }}
        >
          주요 작업
        </button>
        <button
          type="button"
          className="border border-[var(--border)] bg-transparent px-4 py-2 text-xs font-medium text-[var(--foreground)]"
          style={{ borderRadius: r }}
        >
          보조
        </button>
      </div>
    </>
  );
}

function CatalogMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  const chips = ["전체", "신상", "세일", "디지털"];
  const items = [
    { name: "무선 헤드셋", price: "₩189,000", tag: "인기" },
    { name: "기계식 키보드", price: "₩149,000", tag: null },
    { name: "USB-C 허브", price: "₩72,000", tag: "신상" },
    { name: "노트 세트", price: "₩24,000", tag: null },
  ];
  return (
    <>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          마켓플레이스
        </p>
        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
          이번 주 추천
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          멀티 벤더·카트·결제 UI의 목록 단을 가정했습니다.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <span
            key={c}
            className={`cursor-default border px-3 py-1.5 text-[10px] font-medium ${
              i === 0
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--border)] bg-[var(--card)]/40 text-[var(--muted)]"
            }`}
            style={{ borderRadius: r }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex gap-3 border border-[var(--border)] bg-[var(--card)]/40 p-3"
            style={{ borderRadius: r }}
          >
            <div
              className="size-16 shrink-0 bg-[var(--accent)]/20"
              style={{ borderRadius: r }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-[var(--foreground)]">
                  {item.name}
                </p>
                {item.tag ? (
                  <span
                    className="shrink-0 bg-[var(--accent)]/15 px-1.5 py-0.5 text-[9px] font-medium text-[var(--accent)]"
                    style={{ borderRadius: r }}
                  >
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {item.price}
              </p>
              <button
                type="button"
                className="mt-2 w-full border border-[var(--border)] py-1.5 text-[10px] font-medium text-[var(--foreground)] sm:w-auto sm:px-3"
                style={{ borderRadius: r }}
              >
                장바구니
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="px-4 py-2 text-xs font-semibold"
          style={{
            borderRadius: r,
            background: "var(--accent)",
            color: primaryOnAccent,
          }}
        >
          결제로 이동
        </button>
        <button
          type="button"
          className="border border-[var(--border)] bg-transparent px-4 py-2 text-xs font-medium text-[var(--foreground)]"
          style={{ borderRadius: r }}
        >
          정책 및 배송
        </button>
      </div>
    </>
  );
}

function FormsWizardMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  const steps = ["계정", "조직", "결제"];
  return (
    <>
      <div>
        <p className="text-xs font-medium text-[var(--muted)]">
          온보딩 · 2 / 3 단계
        </p>
        <div className="mt-2 flex gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-1">
              <span
                className={`flex size-6 items-center justify-center border text-[10px] font-bold ${
                  i <= 1
                    ? "border-[var(--border)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-transparent text-[var(--muted)]"
                }`}
                style={{
                  borderRadius: r,
                }}
              >
                {i + 1}
              </span>
              <span className="hidden text-[10px] text-[var(--muted)] sm:inline">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="space-y-3 border border-[var(--border)] bg-[var(--card)]/30 p-4"
        style={{ borderRadius: r }}
      >
        <label className="block">
          <span className="text-[10px] text-[var(--muted)]">회사 이름</span>
          <div
            className="mt-1 border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs text-[var(--foreground)]"
            style={{ borderRadius: r }}
          >
            주식회사 예시
          </div>
        </label>
        <label className="block">
          <span className="text-[10px] text-[var(--muted)]">팀 규모</span>
          <div
            className="mt-1 border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs text-[var(--muted)]"
            style={{ borderRadius: r }}
          >
            10–50명
          </div>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="px-4 py-2 text-xs font-semibold"
          style={{
            borderRadius: r,
            background: "var(--accent)",
            color: primaryOnAccent,
          }}
        >
          다음 단계
        </button>
        <button
          type="button"
          className="border border-[var(--border)] px-4 py-2 text-xs text-[var(--foreground)]"
          style={{ borderRadius: r }}
        >
          이전
        </button>
      </div>
    </>
  );
}

function DataVizMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  const bars = [40, 72, 55, 88, 48, 95, 62];
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[var(--muted)]">실시간 요약</p>
          <p className="text-lg font-bold text-[var(--foreground)]">
            트래픽 · 지난 24시간
          </p>
        </div>
        <button
          type="button"
          className="text-[10px] font-medium text-[var(--accent)]"
        >
          드릴다운
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-4">
        {[
          ["p99 지연", "120ms", "정상"],
          ["에러율", "0.02%", "경고"],
          ["처리량", "4.2k/s", "↑"],
          ["큐 적체", "3", "정상"],
        ].map(([a, b, c]) => (
          <div
            key={a}
            className="border border-[var(--border)] bg-[var(--card)]/40 p-2"
            style={{ borderRadius: r }}
          >
            <p className="text-[9px] text-[var(--muted)]">{a}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {b}
            </p>
            <p className="text-[9px] text-[var(--accent)]">{c}</p>
          </div>
        ))}
      </div>
      <div
        className="flex h-32 items-end gap-1 border border-[var(--border)] bg-[var(--card)]/20 px-3 pb-0 pt-3"
        style={{ borderRadius: r }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-[var(--accent)]/50"
            style={{ height: `${h}%`, borderRadius: `${r} ${r} 0 0` }}
          />
        ))}
      </div>
      <button
        type="button"
        className="px-4 py-2 text-xs font-semibold"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        리포트 내보내기
      </button>
    </>
  );
}

function EditorialMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <p className="text-[10px] text-[var(--muted)]">
        에디토리얼 · 약 8분 읽기
      </p>
      <h2 className="text-xl font-bold text-[var(--foreground)]">
        디자인 토큰으로 브랜드와 제품 UI 맞추기
      </h2>
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        롱폼 본문과 인용, 관련 읽기 리스트를 같은 토캔 위에서 구성한
        예시입니다.
      </p>
      <div
        className="border-l-4 border-[var(--accent)] bg-[var(--card)]/30 py-2 pl-4 text-sm italic text-[var(--foreground)]"
        style={{ borderRadius: `0 ${r} ${r} 0` }}
      >
        “토큰을 먼저 고정하면 마케팅과 제품 UI가 같은 언어를 쓰게 됩니다.”
      </div>
      <div
        className="aspect-[21/9] max-h-24 w-full bg-[var(--accent)]/15"
        style={{ borderRadius: r }}
        aria-hidden
      />
      <div>
        <p className="text-[10px] font-semibold text-[var(--foreground)]">
          함께 읽기
        </p>
        <ul className="mt-2 space-y-1">
          {["접근성 체크리스트", "컴포넌트 인벤토리", "브랜드 가이드"].map(
            (t) => (
              <li key={t}>
                <span
                  className="text-xs text-[var(--accent)] underline-offset-2"
                  style={{ textDecoration: "underline" }}
                >
                  {t}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
      <button
        type="button"
        className="px-4 py-2 text-xs font-semibold"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        구독하기
      </button>
    </>
  );
}

function EmbedMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold text-[var(--foreground)]">
          위젯 · 주문 요약
        </h2>
        <span className="text-[9px] text-[var(--muted)]">Electron / 웹뷰</span>
      </div>
      <div
        className="overflow-hidden border border-[var(--border)] text-[10px]"
        style={{ borderRadius: r }}
      >
        <table className="w-full text-left">
          <thead className="border-b border-[var(--border)] bg-[var(--card)]/60 text-[var(--muted)]">
            <tr>
              <th className="px-2 py-1.5 font-medium">SKU</th>
              <th className="px-2 py-1.5 font-medium">수량</th>
              <th className="px-2 py-1.5 text-right font-medium">금액</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-[var(--foreground)]">
            {[
              ["A-100", "2", "₩40,000"],
              ["B-220", "1", "₩12,500"],
              ["C-015", "5", "₩8,000"],
            ].map(([a, b, c]) => (
              <tr key={a}>
                <td className="px-2 py-1">{a}</td>
                <td className="px-2 py-1">{b}</td>
                <td className="px-2 py-1 text-right">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="w-full px-2 py-1.5 text-[10px] font-semibold sm:w-auto"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        동기화
      </button>
    </>
  );
}

function PrototypeSpikeMain({ r }: { r: string }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--muted)]">
        스파이크용 저해상도 와이어 — 내구성보다 속도
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {["Nav", "List", "Detail"].map((z) => (
          <div
            key={z}
            className="flex h-24 items-center justify-center border-2 border-dashed border-[var(--border)] text-[10px] text-[var(--muted)]"
            style={{ borderRadius: r }}
          >
            {z}
            <span className="sr-only"> placeholder</span>
          </div>
        ))}
      </div>
      <div
        className="h-8 border border-dashed border-[var(--border)] bg-[var(--card)]/20"
        style={{ borderRadius: r }}
      />
      <p className="text-[10px] text-rose-400">TODO: 데이터 연동</p>
    </div>
  );
}

function CbtEduMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-[var(--muted)]">모듈 2 / 5</p>
        <p className="text-[10px] text-[var(--accent)]">진행률 40%</p>
      </div>
      <div
        className="h-2 overflow-hidden bg-[var(--border)]/40"
        style={{ borderRadius: r }}
      >
        <div
          className="h-full w-2/5 bg-[var(--accent)]"
          style={{ borderRadius: r }}
        />
      </div>
      <div
        className="border border-[var(--border)] bg-[var(--card)]/40 p-4"
        style={{ borderRadius: r }}
      >
        <p className="text-xs font-semibold text-[var(--foreground)]">
          퀴즈: WCAG 2에서 대비 기준으로 맞는 것은?
        </p>
        <div className="mt-3 space-y-2">
          {["일반 텍스트 3:1", "일반 텍스트 4.5:1", "아이콘만 2:1"].map(
            (opt, i) => (
              <label
                key={opt}
                className={`flex cursor-default items-center gap-2 border px-3 py-2 text-[10px] ${
                  i === 1
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)]"
                }`}
                style={{ borderRadius: r }}
              >
                <span className="size-3 rounded-full border border-[var(--border)]" />
                {opt}
              </label>
            ),
          )}
        </div>
      </div>
      <button
        type="button"
        className="px-4 py-2 text-xs font-semibold"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        제출하고 다음
      </button>
    </>
  );
}

function CollabMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {["A", "B", "C"].map((x) => (
            <span
              key={x}
              className="flex size-7 items-center justify-center border-2 border-[var(--background)] bg-[var(--accent)]/25 text-[10px] font-bold text-[var(--accent)]"
              style={{ borderRadius: "9999px" }}
            >
              {x}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[var(--muted)]">3명이 이 문서 편집 중</p>
      </div>
      <div
        className="space-y-2 border border-[var(--border)] bg-[var(--card)]/30 p-3 font-mono text-[10px] leading-relaxed text-[var(--foreground)]"
        style={{ borderRadius: r }}
      >
        <p># 제목</p>
        <p className="bg-[var(--accent)]/15 text-[var(--accent)]">
          | 커서 위치가 겹치는 줄
        </p>
        <p className="text-[var(--muted)]">본문 텍스트…</p>
      </div>
      <div
        className="space-y-2 border border-[var(--border)] p-3"
        style={{ borderRadius: r }}
      >
        <p className="text-[10px] font-semibold text-[var(--foreground)]">
          댓글
        </p>
        {[
          ["민수", "이 문단만 다크모드 대비 확인 부탁"],
          ["지우", "동의합니다."],
        ].map(([a, b]) => (
          <div key={a} className="text-[10px]">
            <span className="font-medium text-[var(--accent)]">{a}</span>
            <span className="text-[var(--muted)]"> · </span>
            <span className="text-[var(--foreground)]">{b}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="px-4 py-2 text-xs font-semibold"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        초대 링크 복사
      </button>
    </>
  );
}

function WhiteLabelMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <p className="text-xs text-[var(--muted)]">
        테넌트별 토큰 주입 · 미리보기
      </p>
      <div className="flex flex-wrap gap-2">
        {["Tenant A", "Tenant B", "Tenant C"].map((t, i) => (
          <button
            key={t}
            type="button"
            className={`border px-3 py-1.5 text-[10px] font-medium ${
              i === 0
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted)]"
            }`}
            style={{ borderRadius: r }}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        className="border border-[var(--border)] bg-[var(--background)] p-4"
        style={{ borderRadius: r }}
      >
        <div className="h-1 w-16 bg-[var(--accent)]" style={{ borderRadius: r }} />
        <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
          브랜딩 프리뷰
        </p>
        <p className="mt-1 text-[10px] text-[var(--muted)]">
          로고·액센트·배경이 테넌트 설정에서 덮어씌워진 상태를 가정합니다.
        </p>
        <button
          type="button"
          className="mt-3 px-3 py-1.5 text-[10px] font-semibold"
          style={{
            borderRadius: r,
            background: "var(--accent)",
            color: primaryOnAccent,
          }}
        >
          테마 저장
        </button>
      </div>
    </>
  );
}

function A11yPublicMain({
  r,
  primaryOnAccent,
}: {
  r: string;
  primaryOnAccent: string;
}) {
  return (
    <>
      <button
        type="button"
        className="mb-2 px-3 py-1.5 text-[10px] font-medium text-[var(--foreground)] outline outline-2 outline-offset-2 outline-[var(--accent)]"
        style={{ borderRadius: r }}
      >
        본문으로 건너뛰기
      </button>
      <p className="text-xs text-[var(--muted)]">
        공공·고대비 UI: 레이블 명시, 포커스 가시성, 대비 검증을 강조한
        폼입니다.
      </p>
      <div
        className="space-y-3 border border-[var(--border)] bg-[var(--card)]/30 p-4"
        style={{ borderRadius: r }}
      >
        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            신청인 이름 <span className="text-rose-400">*</span>
          </span>
          <div
            className="mt-1 border-2 border-[var(--foreground)]/30 bg-[var(--background)] px-3 py-2 text-xs text-[var(--foreground)]"
            style={{ borderRadius: r }}
          >
            홍길동
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            주민등록번호 <span className="sr-only">(필수)</span>
          </span>
          <span className="mb-1 block text-[10px] text-[var(--muted)]">
            하이픈 없이 입력. 서식 오류 시 오류 메시지를 제목에 연결합니다.
          </span>
          <div
            className="border-2 border-[var(--foreground)]/30 bg-[var(--background)] px-3 py-2 text-xs text-[var(--muted)]"
            style={{ borderRadius: r }}
          >
            900101…
          </div>
        </label>
      </div>
      <p className="text-[10px] text-[var(--muted)]">
        일반 텍스트 대비 권장: WCAG AA 4.5:1 이상
      </p>
      <button
        type="button"
        className="px-4 py-2 text-xs font-semibold"
        style={{
          borderRadius: r,
          background: "var(--accent)",
          color: primaryOnAccent,
        }}
      >
        신청서 제출
      </button>
    </>
  );
}
