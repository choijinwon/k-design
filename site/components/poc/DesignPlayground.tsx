"use client";

import type { CSSProperties } from "react";
import { useCallback, useMemo, useState } from "react";

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

/** monetization/references/ui-frameworks.md — 행: 스택 열 순서 */
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

type PresetTokens = {
  "--background": string;
  "--foreground": string;
  "--muted": string;
  "--card": string;
  "--border": string;
  "--accent": string;
  "--accent-dim": string;
};

type DesignPreset = {
  id: string;
  label: string;
  tagline: string;
  /** 영감·유사 레퍼런스 (브랜드명은 비공식 느낌으로만 안내) */
  ref?: string;
  refUrl?: string;
  tokens: PresetTokens;
  /** Primary 버튼 위 글자색 */
  primaryOnAccent: string;
  /** 미리보기 패널 폰트만 변경 */
  font?: string;
};

const DESIGN_PRESETS: readonly DesignPreset[] = [
  {
    id: "studio",
    label: "Studio",
    tagline: "K-Design 기본 · 시안 다크",
    ref: "이 사이트 기본값",
    tokens: {
      "--background": "#070b12",
      "--foreground": "#e8eaef",
      "--muted": "#8b93a7",
      "--card": "#0f1623",
      "--border": "#1e2a3d",
      "--accent": "#22d3ee",
      "--accent-dim": "#0891b2",
    },
    primaryOnAccent: "#041016",
  },
  {
    id: "paper",
    label: "Paper",
    tagline: "SaaS·문서형 라이트",
    ref: "일반 B2B 랜딩",
    tokens: {
      "--background": "#f8fafc",
      "--foreground": "#0f172a",
      "--muted": "#64748b",
      "--card": "#ffffff",
      "--border": "#e2e8f0",
      "--accent": "#0e7490",
      "--accent-dim": "#155e75",
    },
    primaryOnAccent: "#f8fafc",
  },
  {
    id: "geist",
    label: "Geist",
    tagline: "바이올렛 · 미니멀 다크",
    ref: "Vercel Geist",
    refUrl: "https://vercel.com/geist",
    tokens: {
      "--background": "#000000",
      "--foreground": "#fafafa",
      "--muted": "#a3a3a3",
      "--card": "#0a0a0a",
      "--border": "#262626",
      "--accent": "#8b5cf6",
      "--accent-dim": "#7c3aed",
    },
    primaryOnAccent: "#fafafa",
    font: "ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: "linear",
    label: "Indigo",
    tagline: "딥 그레이 · 인디고 포인트",
    ref: "프로덕트 툴 톤 참고",
    tokens: {
      "--background": "#09090b",
      "--foreground": "#f4f4f5",
      "--muted": "#a1a1aa",
      "--card": "#18181b",
      "--border": "#27272a",
      "--accent": "#5e6ad2",
      "--accent-dim": "#4f46e5",
    },
    primaryOnAccent: "#fafafa",
  },
  {
    id: "rose",
    label: "Rose",
    tagline: "로즈·웜 다크",
    ref: "크리에이티브·브랜드",
    tokens: {
      "--background": "#1a1014",
      "--foreground": "#fdf2f8",
      "--muted": "#b58393",
      "--card": "#2d1b22",
      "--border": "#4c1d31",
      "--accent": "#fb7185",
      "--accent-dim": "#f43f5e",
    },
    primaryOnAccent: "#1f1317",
  },
  {
    id: "forest",
    label: "Forest",
    tagline: "딥 그린 · 자연 톤",
    ref: "웰니스·교육·ESG",
    tokens: {
      "--background": "#0c1410",
      "--foreground": "#ecfdf5",
      "--muted": "#6ee7b7",
      "--card": "#13281e",
      "--border": "#14532d",
      "--accent": "#34d399",
      "--accent-dim": "#059669",
    },
    primaryOnAccent: "#042f1a",
  },
  {
    id: "sunset",
    label: "Sunset",
    tagline: "앰버·코랄 · 에너지",
    ref: "이벤트·프로모",
    tokens: {
      "--background": "#1c1410",
      "--foreground": "#fff7ed",
      "--muted": "#d6b196",
      "--card": "#292018",
      "--border": "#7c2d12",
      "--accent": "#fb923c",
      "--accent-dim": "#ea580c",
    },
    primaryOnAccent: "#1c1410",
  },
  {
    id: "mono",
    label: "Mono",
    tagline: "흑백 · 에디토리얼",
    ref: "포트폴리오·블로그",
    tokens: {
      "--background": "#0a0a0a",
      "--foreground": "#fafafa",
      "--muted": "#a3a3a3",
      "--card": "#171717",
      "--border": "#404040",
      "--accent": "#fafafa",
      "--accent-dim": "#e5e5e5",
    },
    primaryOnAccent: "#0a0a0a",
  },
  {
    id: "nord",
    label: "Nord",
    tagline: "차가운 북유럽 팔레트",
    ref: "Nord Theme",
    refUrl: "https://www.nordtheme.com/",
    tokens: {
      "--background": "#2e3440",
      "--foreground": "#eceff4",
      "--muted": "#d8dee9",
      "--card": "#3b4252",
      "--border": "#4c566a",
      "--accent": "#88c0d0",
      "--accent-dim": "#5e81ac",
    },
    primaryOnAccent: "#2e3440",
  },
] as const;

const PRESET_MAP: Record<string, DesignPreset> = Object.fromEntries(
  DESIGN_PRESETS.map((p) => [p.id, p]),
);

const DOC_HREF =
  "https://github.com/choijinwon/k-design/blob/main/monetization/references/ui-frameworks.md";

const REFERENCE_GROUPS: {
  title: string;
  items: { name: string; href: string; hint?: string }[];
}[] = [
  {
    title: "디자인 시스템 · 가이드",
    items: [
      {
        name: "Apple HIG",
        href: "https://developer.apple.com/design/human-interface-guidelines/",
      },
      {
        name: "Material Design 3",
        href: "https://m3.material.io/",
        hint: "스펙·토큰",
      },
      {
        name: "Fluent 2",
        href: "https://fluent2.microsoft.design/",
      },
      {
        name: "Atlassian Design",
        href: "https://atlassian.design/",
      },
      {
        name: "Primer",
        href: "https://primer.style/",
      },
      {
        name: "Carbon (IBM)",
        href: "https://carbondesignsystem.com/",
      },
      {
        name: "Gov.uk Design",
        href: "https://design-system.service.gov.uk/",
      },
    ],
  },
  {
    title: "스크린 · 플로우 레퍼런스",
    items: [
      { name: "Mobbin", href: "https://mobbin.com/", hint: "앱 UI 스크린" },
      {
        name: "Pageflows",
        href: "https://pageflows.com/",
      },
      {
        name: "Landingfolio",
        href: "https://www.landingfolio.com/",
      },
      {
        name: "Land-book",
        href: "https://land-book.com/",
      },
      {
        name: "Dribbble",
        href: "https://dribbble.com/",
      },
      {
        name: "Behance",
        href: "https://www.behance.net/",
      },
      {
        name: "Awwwards",
        href: "https://www.awwwards.com/",
      },
    ],
  },
  {
    title: "색 · 타이포 · 레이아웃 도구",
    items: [
      { name: "Coolors", href: "https://coolors.co/", hint: "팔레트" },
      {
        name: "Happy Hues",
        href: "https://www.happyhues.co/",
        hint: "시맨틱 색 조합",
      },
      {
        name: "Realtime Colors",
        href: "https://www.realtimecolors.com/",
        hint: "라이브 프리뷰",
      },
      {
        name: "Type Scale",
        href: "https://typescale.com/",
      },
      {
        name: "Open Props",
        href: "https://open-props.style/",
        hint: "CSS 변수",
      },
    ],
  },
];

const OFFICIAL: { name: string; href: string }[] = [
  { name: "Tailwind", href: "https://tailwindcss.com/" },
  { name: "Bootstrap", href: "https://getbootstrap.com/" },
  { name: "M3", href: "https://m3.material.io/" },
  { name: "MUI", href: "https://mui.com/" },
  { name: "shadcn/ui", href: "https://ui.shadcn.com/" },
  { name: "Ant Design", href: "https://ant.design/" },
  { name: "Bulma", href: "https://bulma.io/" },
  { name: "Materialize", href: "https://materializecss.com/" },
  { name: "Nuxt UI", href: "https://ui.nuxt.com/" },
];

type Screen = "mpa" | "dash" | "embed" | "material";

type CellTone = "good" | "ok" | "ref" | "bad";

function cellTone(text: string): CellTone {
  if (text.includes("비권장") || text.includes("신규 비권장")) return "bad";
  if (text.includes("참고")) return "ref";
  if (text === "권장" || (text.includes("권장") && !text.includes("비권장")))
    return "good";
  return "ok";
}

function toneClasses(tone: CellTone, active: boolean): string {
  const base = "rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:text-xs";
  const ring = active ? " ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--card)]" : "";
  switch (tone) {
    case "good":
      return `${base} bg-emerald-500/15 text-emerald-300${ring}`;
    case "bad":
      return `${base} bg-rose-500/15 text-rose-300${ring}`;
    case "ref":
      return `${base} bg-sky-500/15 text-sky-300${ring}`;
    default:
      return `${base} bg-amber-500/15 text-amber-200${ring}`;
  }
}

function scenarioBlurb(stack: (typeof STACKS)[number], screen: Screen): string {
  const isHtml = stack === "HTML";
  const isVueFamily = stack === "Vue" || stack === "Nuxt";

  if (screen === "mpa" && isHtml) {
    return "마크업 위주·정적 페이지라면 Bootstrap 또는 Bulma로 빠르게 골격을 잡는 편이 문서상 자연스럽습니다.";
  }
  if (screen === "dash" && (stack === "React" || stack === "Next.js")) {
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

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const srgb = [rgb.r, rgb.g, rgb.b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(fgHex: string, bgHex: string): number {
  const L1 = relativeLuminance(fgHex);
  const L2 = relativeLuminance(bgHex);
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
}

function wcagLabel(ratio: number, large: boolean): string {
  const aa = large ? 3 : 4.5;
  const aaa = large ? 4.5 : 7;
  if (ratio >= aaa) return "AAA";
  if (ratio >= aa) return "AA";
  return "미달";
}

const SECTIONS = [
  { id: "samples", label: "샘플·레퍼런스" },
  { id: "tokens", label: "토큰" },
  { id: "components", label: "컴포넌트" },
  { id: "matrix", label: "매트릭스" },
  { id: "scenario", label: "시나리오" },
  { id: "links", label: "문서·링크" },
] as const;

export function DesignPlayground() {
  const [stackIdx, setStackIdx] = useState(3);
  const [libId, setLibId] = useState<(typeof UI_LIBS)[number]["id"]>("shadcn");
  const [screen, setScreen] = useState<Screen>("dash");
  const [presetId, setPresetId] = useState<string>(DESIGN_PRESETS[0].id);
  const [copied, setCopied] = useState<string | null>(null);

  const stack = STACKS[stackIdx];
  const cell = MATRIX[libId][stackIdx];
  const blurb = useMemo(() => scenarioBlurb(stack, screen), [stack, screen]);
  const currentPreset = PRESET_MAP[presetId] ?? DESIGN_PRESETS[0];
  const previewVars = currentPreset.tokens;

  const contrastBody = contrastRatio(
    previewVars["--foreground"],
    previewVars["--background"],
  );
  const contrastAccent = contrastRatio(
    previewVars["--accent"],
    previewVars["--background"],
  );
  const contrastMuted = contrastRatio(
    previewVars["--muted"],
    previewVars["--background"],
  );

  const summaryText = useMemo(() => {
    const lib = UI_LIBS.find((x) => x.id === libId)?.label ?? libId;
    const screenLabel =
      {
        mpa: "정적·MPA",
        dash: "대시보드·데이터 밀도",
        embed: "임베디드·뷰어",
        material: "Material 톤",
      }[screen] ?? screen;
    return [
      "K-Design Studio · UI 선택 메모",
      `샘플 팔레트: ${currentPreset.label} (${currentPreset.tagline})`,
      `스택: ${stack}`,
      `UI 도구: ${lib}`,
      `매트릭스: ${cell}`,
      `시나리오: ${screenLabel}`,
      "",
      blurb,
      "",
      `출처: ${DOC_HREF}`,
    ].join("\n");
  }, [stack, libId, cell, screen, blurb, currentPreset]);

  const copyCssRoot = useCallback(async () => {
    const block = `:root {\n${Object.entries(previewVars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n")}\n}`;
    try {
      await navigator.clipboard.writeText(block);
      setCopied("css");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }, [previewVars]);

  const copySummary = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied("summary");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }, [summaryText]);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pt-10">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            POC · 디자인
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            UI 키 · 토큰 · 컴포넌트 · 매트릭스
          </h1>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            <a
              href={DOC_HREF}
              className="text-[var(--accent)] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ui-frameworks.md
            </a>
            와 적합성 표를 그리드로 보고, 샘플 팔레트·외부 레퍼런스·납품 컴포넌트를
            한 페이지에서 점검합니다.
          </p>
        </div>
        <nav
          aria-label="섹션 이동"
          className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end"
        >
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copyCssRoot}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)]/50 px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
        >
          {copied === "css"
            ? "복사됨 · 선택 샘플 :root"
            : "선택 샘플 :root CSS 복사"}
        </button>
        <button
          type="button"
          onClick={copySummary}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)]/50 px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
        >
          {copied === "summary" ? "복사됨 · 선택 요약" : "선택 요약(메모) 복사"}
        </button>
      </div>

      <section
        id="samples"
        className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold">샘플 · 레퍼런스 허브</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--muted)] leading-relaxed">
          아래는 영감용 링크 모음입니다. 브랜드·상표는 각 사이트의 정책을
          따르고, 실제 납품 시에는 라이선스·가이드 준수 여부를 별도 확인하세요.
        </p>
        <div className="mt-6 space-y-8">
          {REFERENCE_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    >
                      {item.name}
                      {item.hint ? (
                        <span className="font-normal text-[var(--muted)]">
                          · {item.hint}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 토큰 */}
      <section
        id="tokens"
        className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)]/80 to-[var(--card)]/30 p-6 sm:p-8"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold">디자인 토큰 · 샘플 팔레트</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            미리보기·복사는 선택한 샘플만 바뀝니다. 실제 사이트 글로벌 테마는
            그대로입니다.
          </p>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            팔레트 고르기
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGN_PRESETS.map((p) => {
              const active = p.id === presetId;
              const t = p.tokens;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setPresetId(p.id)}
                    className={`flex w-full flex-col rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_0_1px_var(--accent)]"
                        : "border-[var(--border)] bg-[var(--background)]/40 hover:border-[var(--accent)]/30"
                    }`}
                  >
                    <div className="mb-3 flex gap-1">
                      {[
                        t["--background"],
                        t["--card"],
                        t["--accent"],
                        t["--muted"],
                      ].map((c, i) => (
                        <span
                          key={`${p.id}-swatch-${i}`}
                          className="h-6 min-w-0 flex-1 rounded-md border border-black/20"
                          style={{ background: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {p.label}
                    </span>
                    <span className="mt-0.5 text-xs text-[var(--muted)]">
                      {p.tagline}
                    </span>
                    {p.ref ? (
                      <span className="mt-2 text-[10px] text-[var(--muted)]">
                        참고: {p.ref}
                        {p.refUrl ? (
                          <>
                            {" · "}
                            <a
                              href={p.refUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] underline-offset-2 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              링크
                            </a>
                          </>
                        ) : null}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              팔레트 · {currentPreset.label}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(
                [
                  ["Background", "--background"],
                  ["Foreground", "--foreground"],
                  ["Muted", "--muted"],
                  ["Card", "--card"],
                  ["Border", "--border"],
                  ["Accent", "--accent"],
                ] as const
              ).map(([label, key]) => {
                const hex = previewVars[key as keyof typeof previewVars];
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)]/50 p-3"
                  >
                    <span
                      className="size-10 shrink-0 rounded-lg border border-[var(--border)] shadow-inner"
                      style={{ background: hex }}
                      title={hex}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-[var(--foreground)]">
                        {label}
                      </p>
                      <p className="truncate font-mono text-[10px] text-[var(--muted)]">
                        {hex}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)]/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                대비 (WCAG 2.1)
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex flex-wrap justify-between gap-2">
                  <span className="text-[var(--muted)]">본문 / 배경</span>
                  <span className="font-mono text-[var(--foreground)]">
                    {contrastBody.toFixed(2)} : 1 ·{" "}
                    <span
                      className={
                        wcagLabel(contrastBody, false) === "미달"
                          ? "text-rose-400"
                          : "text-emerald-400"
                      }
                    >
                      {wcagLabel(contrastBody, false)} (본문)
                    </span>
                  </span>
                </li>
                <li className="flex flex-wrap justify-between gap-2">
                  <span className="text-[var(--muted)]">강조 / 배경</span>
                  <span className="font-mono text-[var(--foreground)]">
                    {contrastAccent.toFixed(2)} : 1 ·{" "}
                    <span className="text-amber-300">
                      {wcagLabel(contrastAccent, true)} (큰 글자·UI)
                    </span>
                  </span>
                </li>
                <li className="flex flex-wrap justify-between gap-2">
                  <span className="text-[var(--muted)]">보조 / 배경</span>
                  <span className="font-mono text-[var(--foreground)]">
                    {contrastMuted.toFixed(2)} : 1 · 보조 텍스트
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                spacing · 4px 기준
              </p>
              <div className="flex items-end gap-2">
                {[4, 8, 12, 16, 24, 32].map((px) => (
                  <div key={px} className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 rounded-t bg-[var(--accent)]/40"
                      style={{ height: px }}
                      title={`${px}px`}
                    />
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      {px}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border border-[var(--border)] p-6 shadow-lg"
            style={
              {
                background: previewVars["--background"],
                color: previewVars["--foreground"],
                borderColor: previewVars["--border"],
                fontFamily: currentPreset.font,
              } as CSSProperties
            }
          >
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: previewVars["--muted"] }}
            >
              미리보기 패널
            </p>
            <p
              className="mt-3 text-2xl font-bold tracking-tight"
              style={{ color: previewVars["--foreground"] }}
            >
              Hero 제목
            </p>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: previewVars["--muted"] }}
            >
              본문과 캡션 색이 프리셋에서 어떻게 보이는지 확인합니다.
            </p>
            <div
              className="mt-4 rounded-xl border p-4"
              style={{
                background: previewVars["--card"],
                borderColor: previewVars["--border"],
              }}
            >
              <p className="text-sm font-semibold">카드 영역</p>
              <p
                className="mt-1 text-xs"
                style={{ color: previewVars["--muted"] }}
              >
                카드 배경·테두리 토큰
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{
                  background: previewVars["--accent"],
                  color: currentPreset.primaryOnAccent,
                }}
              >
                Primary
              </button>
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{
                  borderColor: previewVars["--border"],
                  color: previewVars["--foreground"],
                }}
              >
                Outline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 컴포넌트 */}
      <section
        id="components"
        className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold">컴포넌트 스트립 (사이트 테마)</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          실제 납품 페이지와 동일한 CSS 변수를 씁니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
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
          <button
            type="button"
            disabled
            className="rounded-lg border border-[var(--border)]/60 px-4 py-2 text-sm text-[var(--muted)] opacity-60"
          >
            Disabled
          </button>
          <span className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-2 py-1 text-xs font-medium text-[var(--accent)]">
            Badge
          </span>
          <span className="rounded-md bg-[var(--muted)]/20 px-2 py-1 text-xs text-[var(--muted)]">
            Muted
          </span>
          <input
            type="text"
            placeholder="입력 필드"
            className="min-w-[11rem] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
          />
        </div>
        <div
          role="tablist"
          className="mt-6 inline-flex rounded-lg border border-[var(--border)] p-0.5"
        >
          <span
            role="tab"
            aria-selected
            className="rounded-md bg-[var(--accent)]/20 px-3 py-1.5 text-xs font-medium text-[var(--accent)]"
          >
            탭 A
          </span>
          <span
            role="tab"
            className="px-3 py-1.5 text-xs text-[var(--muted)]"
          >
            탭 B
          </span>
        </div>
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--foreground)]">
          <strong className="text-[var(--accent)]">알림</strong>
          {" — "}인라인 알림·배너 톤 샘플입니다.
        </div>
        <div className="mt-6 space-y-1 border-t border-[var(--border)] pt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            타이포 스케일
          </p>
          <p className="text-xs text-[var(--muted)]">caption · 보조</p>
          <p className="text-sm text-[var(--foreground)]">body · 폼·본문</p>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            section title
          </p>
          <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Hero
          </p>
        </div>
      </section>

      {/* 매트릭스 */}
      <section
        id="matrix"
        className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold">적합성 매트릭스</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          셀을 눌러 스택·UI 키트를 맞춥니다. 색: 권장(녹)·주의(황)·참고(청)·비권장(적).
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
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

        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--background)]/50">
          <table className="min-w-[640px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="sticky left-0 z-10 bg-[var(--background)] px-3 py-2 font-medium text-[var(--muted)]">
                  UI 키트
                </th>
                {STACKS.map((s) => (
                  <th
                    key={s}
                    className={`px-2 py-2 font-medium ${
                      STACKS[stackIdx] === s
                        ? "text-[var(--accent)]"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UI_LIBS.map((L) => (
                <tr
                  key={L.id}
                  className={`border-b border-[var(--border)]/80 ${
                    L.id === libId ? "bg-[var(--accent)]/5" : ""
                  }`}
                >
                  <th className="sticky left-0 z-10 bg-[var(--card)]/95 px-3 py-2 text-left font-medium text-[var(--foreground)] backdrop-blur-sm">
                    {L.label}
                  </th>
                  {STACKS.map((_, colIdx) => {
                    const c = MATRIX[L.id][colIdx];
                    const active = L.id === libId && colIdx === stackIdx;
                    return (
                      <td key={colIdx} className="p-1 align-middle">
                        <button
                          type="button"
                          onClick={() => {
                            setLibId(L.id);
                            setStackIdx(colIdx);
                          }}
                          className={`w-full text-left ${toneClasses(cellTone(c), active)}`}
                        >
                          <span className="line-clamp-2 leading-snug">{c}</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-4">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">{stack}</span>
            {" × "}
            <span className="font-medium text-[var(--foreground)]">
              {UI_LIBS.find((x) => x.id === libId)?.label}
            </span>
          </p>
          <p className="mt-2 text-xl font-semibold text-[var(--accent)]">{cell}</p>
        </div>
      </section>

      {/* 시나리오 */}
      <section
        id="scenario"
        className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold">시나리오 한 줄</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          문서의 「선택 가이드」를 짧게 재구성했습니다.
        </p>
        <label className="mt-6 block text-sm">
          <span className="mb-1 block font-medium text-[var(--foreground)]">
            화면·제품 성격
          </span>
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as Screen)}
            className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
          >
            <option value="mpa">정적·마크업 위주 (MPA 성향)</option>
            <option value="dash">관리·대시보드·데이터 밀도</option>
            <option value="embed">임베디드·Electron·가벼운 뷰어</option>
            <option value="material">Material 토큰·룩앤필 중시</option>
          </select>
        </label>
        <p className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/40 p-4 text-sm leading-relaxed text-[var(--muted)]">
          현재 스택{" "}
          <strong className="text-[var(--foreground)]">{stack}</strong>: {blurb}
        </p>
      </section>

      {/* 링크 */}
      <section
        id="links"
        className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold">공식 문서 · 확장</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          ui-frameworks.md 표와 동일 계열 링크입니다.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {OFFICIAL.map(({ name, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--background)]/50 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--muted)]">
          원본:{" "}
          <a
            href={DOC_HREF}
            className="text-[var(--accent)] underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            monetization/references/ui-frameworks.md
          </a>
        </p>
      </section>
    </main>
  );
}
