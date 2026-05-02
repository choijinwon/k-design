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

type Screen =
  | "mpa"
  | "marketing"
  | "dash"
  | "data_viz"
  | "forms_wizard"
  | "docs_devportal"
  | "mobile_pwa"
  | "embed"
  | "cbt_edu"
  | "realtime_collab"
  | "marketplace"
  | "white_label"
  | "a11y_public"
  | "content_editorial"
  | "material"
  | "prototype_spike";

const SCENARIO_OPTIONS: { group: string; id: Screen; label: string }[] = [
  {
    group: "채널 · 화면 형태",
    id: "mpa",
    label: "정적·MPA — 마크업 위주, 서버 템플릿",
  },
  {
    group: "채널 · 화면 형태",
    id: "marketing",
    label: "마케팅·랜딩 — 전환, 히어로, 캠페인 페이지",
  },
  {
    group: "채널 · 화면 형태",
    id: "mobile_pwa",
    label: "모바일·PWA — 터치·세이프에어리어·오프라인 고려",
  },
  {
    group: "제품 · 밀도",
    id: "dash",
    label: "관리·백오피스 — 테이블·필터·폼 밀도 높음",
  },
  {
    group: "제품 · 밀도",
    id: "data_viz",
    label: "데이터·모니터링 — 차트, 실시간 지표, 드릴다운",
  },
  {
    group: "제품 · 밀도",
    id: "forms_wizard",
    label: "온보딩·위자드 — 단계 폼, 검증, 상태 보존",
  },
  {
    group: "제품 · 밀도",
    id: "content_editorial",
    label: "콘텐츠·에디토리얼 — 롱폼, 카탈로그, 미디어 블록",
  },
  {
    group: "개발자 · 지식",
    id: "docs_devportal",
    label: "문서·개발자 포털 — 검색, 코드블록, 버전 스위치",
  },
  {
    group: "배포 · 임베드",
    id: "embed",
    label: "임베디드·Electron·웹뷰 — 번들·오프라인 제약",
  },
  {
    group: "배포 · 임베드",
    id: "prototype_spike",
    label: "실험·스파이크 — 빠른 목업, 내구성보다 속도",
  },
  {
    group: "도메인",
    id: "cbt_edu",
    label: "교육·CBT·LMS — 진도, 모듈, 접근성·오프라인",
  },
  {
    group: "도메인",
    id: "marketplace",
    label: "마켓플레이스 — 멀티 벤더, 카트, 결제·정책 UI",
  },
  {
    group: "도메인",
    id: "realtime_collab",
    label: "실시간 협업 — 동시 편집, 커서, 알림·채널",
  },
  {
    group: "브랜딩 · 거버넌스",
    id: "white_label",
    label: "화이트라벨·멀티 테넌트 — 테마 스위치·토큰 주입",
  },
  {
    group: "브랜딩 · 거버넌스",
    id: "material",
    label: "Material 톤 — M3 스펙·컴포넌트 규격 맞추기",
  },
  {
    group: "브랜딩 · 거버넌스",
    id: "a11y_public",
    label: "접근성·공공 — 키보드, 대비, 고정 레이아웃 제약",
  },
];

const SCENARIO_SUMMARY_LABEL: Record<Screen, string> = Object.fromEntries(
  SCENARIO_OPTIONS.map((o) => [o.id, o.label.split(" — ")[0]?.trim() ?? o.label]),
) as Record<Screen, string>;

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
  const isReactFamily = stack === "React" || stack === "Next.js";
  const isNext = stack === "Next.js";

  switch (screen) {
    case "mpa":
      if (isHtml) {
        return "마크업 위주·정적 배포라면 Bootstrap·Bulma·Tailwind 중 팀 속도에 맞는 한 가지로 그리드를 고정하고, JS는 점진적으로만 붙입니다.";
      }
      if (isVueFamily) {
        return "Vue/Nuxt도 SSG·서버 렌더 패턴으로 정적 층을 두면 MPA에 가깝게 운용할 수 있습니다. Nuxt UI·Tailwind가 흔한 조합입니다.";
      }
      if (isReactFamily) {
        return "React/Next라도 서버·정적 경로를 우선하면 MPA 친화적입니다. 하이드레이션 범위를 줄일수록 뷰어·문서에 유리합니다.";
      }
      return "정적 층을 두고 상호작용은 최소화하는 쪽이 번들·캐시·오프라인 정책에 유리합니다. 매트릭스에서 스택별 UI 키트를 다시 확인하세요.";

    case "marketing":
      if (isHtml) {
        return "캠페인 랜딩은 Tailwind·Bootstrap로 섹션을 빠르게 잡고, 폼·UTM·개인화는 필요한 블록만 작은 스크립트로 붙이는 편이 안전합니다.";
      }
      if (isNext) {
        return "Next.js는 SEO·OG·성능·실험 플래그와 궁합이 좋습니다. shadcn으로 커스텀 톤을, 일정이 촉박하면 MUI 블록을 일부 혼용해도 됩니다.";
      }
      if (isReactFamily) {
        return "CRA/Vite SPA 랜딩은 메타·프리렌더를 별도 설계해야 합니다. 가능하면 Next·Remix류 메타·라우팅 툴링을 우선 검토하세요.";
      }
      if (isVueFamily) {
        return "Nuxt는 콘텐츠·SEO에 익숙한 팀에 유리합니다. Tailwind + Nuxt UI 또는 팀 표준 컴포넌트로 히어로·요금·FAQ 블록을 모듈화하세요.";
      }
      return "전환·실험을 반복한다면 토큰·섹션 컴포넌트를 먼저 고정하고, 디자인 키트는 한 열로 통일하는 편이 A/B에 유리합니다.";

    case "dash":
      if (isHtml) {
        return "순정 HTML만으로 고밀도 백오피스는 한계가 큽니다. 테이블·필터는 React/Vue 앱 셸 안에서 구현하는 전제를 권합니다.";
      }
      if (isReactFamily) {
        return "테이블·필터·폼 밀도가 높으면 MUI·Ant로 시간을 줄이고, 브랜딩이 강하면 Tailwind+shadcn로 그리드·히어로만 커스텀하는 혼합도 흔합니다.";
      }
      if (isVueFamily) {
        return "Vue/Nuxt 백오피스는 Nuxt UI·Vuetify·Ant Design Vue 등을 비교하세요. 데이터 테이블 플러그인 생태가 선택을 좌우합니다.";
      }
      return "대시보드는 상태·권한·테이블 가상화까지 묶이므로 ‘한 세트로 쓸 컴포넌트’를 먼저 정하는 것이 재작업을 줄입니다.";

    case "data_viz":
      if (isReactFamily) {
        return "차트·대시보드는 차트 라이브러리와 MUI/Ant 레이아웃·폼을 분리해 번들을 관리합니다. 다크 테마 토큰을 먼저 잡으세요.";
      }
      if (isVueFamily) {
        return "Vue는 차트 래퍼 생태가 성숙합니다. 실시간 소켓 레이어와 차트 업데이트 주기를 UI 키트와 별도로 설계하세요.";
      }
      if (isHtml) {
        return "정적 HTML만으로는 실시간·대량 포인트 렌더에 한계가 있습니다. 차트 영역만 SPA 또는 Web Worker로 분리하는 편이 낫습니다.";
      }
      return "모니터링 UI는 색(경고등)·밀도·시간축이 브랜드보다 기능 우선입니다. 접근성 대비색을 WCAG 기준으로 따로 검증하세요.";

    case "forms_wizard":
      if (isReactFamily) {
        return "다단계 폼은 검증 스키마·에러 요약 UX가 핵심입니다. MUI/Ant Form+RHF 또는 shadcn+커스텀 중 팀 경험에 맞게 고릅니다.";
      }
      if (isVueFamily) {
        return "Vue는 검증·스텝퍼 라이브러리를 먼저 정하고, 스텝 상태와 라우터 동기화를 설계에 포함하세요.";
      }
      if (isHtml) {
        return "위자드를 순정 폼만으로 만들면 접근성·뒤로가기·상태 복원이 어렵습니다. 최소 스펙이면 HTMX·경량 프레임워크를 검토하세요.";
      }
      return "온보딩은 이탈 구간 로그와 연결됩니다. 필드·스텝 수를 줄이는 정보 설계가 키트 선택보다 먼저일 때가 많습니다.";

    case "docs_devportal":
      if (isNext) {
        return "문서·블로그는 MDX·검색을 염두에 두세요. 다크 기본·코드 하이라이트 테마가 브랜드 토큰과 충돌하지 않게 맞춥니다.";
      }
      if (isVueFamily) {
        return "Nuxt Content·VitePress류는 사이드바·버전 스위치가 수월합니다. Tailwind로 코드블록 대비를 통일하세요.";
      }
      if (isHtml) {
        return "정적 문서는 11ty·템플릿만으로도 충분한 경우가 많습니다. 긴 표·앵커·인쇄 스타일 요구를 먼저 정합니다.";
      }
      if (isReactFamily) {
        return "Docusaurus·Starlight 등 문서 전용 스택이 있으면 내비·검색·i18n을 재발명하지 않아도 됩니다.";
      }
      return "개발자 포털은 API 키·샌드박스·쿼터 UI까지 포함할 수 있습니다. ‘문서 읽기’와 ‘콘솔 작업’ 화면을 설계 단계에서 분리하세요.";

    case "mobile_pwa":
      if (isHtml) {
        return "모바일 퍼스트 정적 페이지는 터치 타깃·뷰포트·스크롤 락을 CSS 위주로 잡고, PWA는 매니페스트·서비스워커로 보완합니다.";
      }
      if (isReactFamily) {
        return "모바일 웹앱은 라우터 전환·세이프 영역(padding)을 키트 기본값과 맞춰야 합니다. 토큰에 터치 최소 크기를 명시하세요.";
      }
      if (isVueFamily) {
        return "Nuxt PWA 모듈·하이브리드 앱 연계를 염두에 두면 스토어·웹 배포를 같이 설계할 수 있습니다. Bottom sheet 지원 여부를 확인하세요.";
      }
      return "모바일은 번들·이미지·폰트 예산이 곧 UX입니다. UI 키트 전체보다 실제 화면만 트리 셰이킹하는 전략을 우선하세요.";

    case "embed":
      return "Electron·웹뷰·오프라인 패키지는 번들·CSP·로컬 파일 프로토콜 제약이 있습니다. Bulma·얇은 Tailwind 또는 소수 컴포넌트만 번들하는 전략을 검토하세요.";

    case "prototype_spike":
      return "스파이크는 Tailwind+최소 컴포넌트나 키트 프리셋만 써서 속도를 내고, 검증 후 토큰·폴더는 런칭용으로 재정리할 계획을 세웁니다.";

    case "cbt_edu":
      if (isReactFamily) {
        return "CBT·LMS는 모듈·진도·퀴즈·오프라인 동기가 겹칩니다. 키보드·스크린리더 경로를 먼저 확정하고, Electron이면 로컬 저장·동기 정책을 UI와 분리하세요.";
      }
      if (isVueFamily) {
        return "Vue/Nuxt로도 동일하게 진도·평가 상태를 설계하고, 오프라인이면 서비스워커·로컬 캐시 범위를 화면 단위로 제한하세요.";
      }
      if (isHtml) {
        return "순정 HTML만으로 인터랙티브 CBT는 한계가 큽니다. 최소한 퀴즈·분기는 경량 스크립트 또는 웹컴포넌트 셸을 검토하세요.";
      }
      return "교육 도메인은 접근성·국제화·콘텐츠 갱신 워크플로가 UI 키트와 동급 과제입니다. 역할 기반 내비를 초기에 고정하세요.";

    case "marketplace":
      if (isReactFamily) {
        return "마켓플레이스는 카드 그리드·필터·신뢰 UI(리뷰·정책)가 중심입니다. Ant/MUI의 리스트·태그·steps와 결제SDK의 모달 흐름을 맞춰야 합니다.";
      }
      if (isVueFamily) {
        return "Vue 쇼핑몰 패턴도 유사합니다. 다국가·세금·배송 상태 문구는 디자인 시스템 문자열 테이블로 빼 두는 편이 안전합니다.";
      }
      return "멀티 벤더면 대시보드(판매자)와 스토어프론트(구매자) UI 키트를 분리해 번들을 나누는 전략을 검토하세요.";

    case "realtime_collab":
      if (isReactFamily) {
        return "실시간 편집은 리스트 가상화·낙관적 UI·충돌 메시지 복구가 필요합니다. Radix/shadcn 대화상자·토스트와 소켓 레이어를 분리 설계하세요.";
      }
      if (isVueFamily) {
        return "Vue에서도 동일하게 상태 소스(스토어·composable)와 전송 계층을 분리합니다. Presence 아바타는 UI 키트 배지·툴팁과 조합합니다.";
      }
      return "협업 제품은 ‘누가 지금 이 블록을 보는지’ 같은 메타 UI가 추가됩니다. 키트의 오버레이·드롭다운 z-index 정책을 초기에 테스트하세요.";

    case "white_label":
      if (isReactFamily) {
        return "멀티 테넌트는 CSS 변수·런타임 테마 주입이 핵심입니다. MUI·Ant는 테마 API로, shadcn은 토큰 파일 스위치로 대응하는 경우가 많습니다.";
      }
      if (isVueFamily) {
        return "Vue는 루트 provide/inject나 CSS 변수로 테넌트 브랜드를 오버레이합니다. 기본 컴포넌트는 중립 토큰에만 의존하게 두세요.";
      }
      if (isHtml) {
        return "정적 멀티사이트는 빌드 타임 테마 치환이 단순합니다. 런타임 스위치가 필요하면 작은 스크립트로 :root 변수만 바꾸는 패턴도 가능합니다.";
      }
      return "화이트라벨은 로고·포인트색 외에 버튼 모서리·폰트까지 고객사 가이드를 수용해야 합니다. 토큰 계층을 문서화해 두세요.";

    case "a11y_public":
      if (isHtml) {
        return "공공·행정 HTML은 의미 마크업·키보드 포커스 순서·대비가 법·가이드와 직결됩니다. 컴포넌트 키트보다 감사 체크리스트를 먼저 고릅니다.";
      }
      if (isReactFamily) {
        return "React는 포커스 트랩·라이브 리전·모달 시퀀스를 Radix 등에서 보완합니다. 디자인 토큰의 포커스 링 색을 키보드 전용으로 분리하세요.";
      }
      if (isVueFamily) {
        return "Vue도 동일하게 헤드리스 패턴·ARIA 속성 바인딩을 점검합니다. 색만으로 상태를 구분하지 않는 규칙을 컴포넌트 가이드에 박아 두세요.";
      }
      return "공공 접근성은 WCAG 등급·감사 범위가 계약에 들어가기도 합니다. 컴포넌트 단위 스냅 테스트보다 실사용자 시나리오 E2E가 설득력이 큽니다.";

    case "content_editorial":
      if (isNext) {
        return "에디토리얼·미디어 사이트는 타이포 스케일·그리드·이미지 lazy·CLS가 핵심입니다. shadcn·Tailwind로 조판 유틸을 만들고 본문은 prose 클래스로 통일하세요.";
      }
      if (isVueFamily) {
        return "Nuxt는 콘텐츠 라우팅·이미지 최적화 모듈을 활용하세요. 카드 + 리스트 레이아웃 반복을 디자인 토큰으로만 바꿀 수 있게 컴포넌트화합니다.";
      }
      if (isHtml) {
        return "롱폼 정적 사이트는 읽기 폭·행간·제목 위계만 잡아도 품질이 올라갑니다. 인쇄 CSS까지 요구되는지 확인하세요.";
      }
      if (isReactFamily) {
        return "React 블로그·뉴스룸은 리치 텍스트·임베드·광고 슬롯까지 고려하면 레이아웃 시프트가 생깁니다. 슬롯 높이 예약이 우선입니다.";
      }
      return "콘텐츠 제품은 검색·태그·관련 글 추천이 내비게이션과 경쟁합니다. 정보 구조를 먼저 고정한 뒤 키트를 고르세요.";

    case "material":
      return "Material 룩은 M3 문서로 토큰·모션·접근성을 맞추고, 구현은 MUI·플랫폼 컴포넌트·자체 컴포넌트 중에서 고릅니다. ‘M3’ 자체는 npm 한 패키지가 아닙니다.";

    default:
      return "스택에 맞는 열을 매트릭스에서 확인하고, 팀이 익숙한 키트를 번들·중복 측면에서 한 번 더 짚으면 됩니다.";
  }
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
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoRadio, setDemoRadio] = useState<"a" | "b" | "c">("b");
  const [demoChecks, setDemoChecks] = useState({ agree: true, promo: false });
  const [galleryTab, setGalleryTab] = useState<
    "overview" | "members" | "billing"
  >("overview");
  const [galleryBilling, setGalleryBilling] = useState<"month" | "year">(
    "month",
  );
  const [galleryPage, setGalleryPage] = useState(2);
  const [demoPlan, setDemoPlan] = useState("pro");
  const [galleryTableRow, setGalleryTableRow] = useState<string | null>(
    "김민수",
  );

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
    const screenLabel = SCENARIO_SUMMARY_LABEL[screen] ?? screen;
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
        <h2 className="text-lg font-semibold">컴포넌트 갤러리 (사이트 테마)</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          납품 시 자주 쓰는 패턴을 CSS 변수 기준으로 묶었습니다. 라이브러리
          없이 마크업·상태 패턴만 참고용으로 보시면 됩니다.
        </p>

        <div className="mt-8 space-y-10">
          {/* 버튼 · 링크 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              버튼 · 링크
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
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
                Secondary
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
              >
                Ghost
              </button>
              <button
                type="button"
                className="rounded-lg border border-rose-400/50 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
              >
                Destructive
              </button>
              <button
                type="button"
                disabled
                className="rounded-lg border border-[var(--border)]/60 px-4 py-2 text-sm text-[var(--muted)] opacity-60"
              >
                Disabled
              </button>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--border)] text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
                aria-label="아이콘 자리"
              >
                +
              </button>
              <a
                href="#components"
                className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                텍스트 링크
              </a>
            </div>
          </div>

          {/* 배지 · 칩 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              배지 · 칩
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-2 py-1 text-xs font-medium text-[var(--accent)]">
                Accent
              </span>
              <span className="rounded-md bg-[var(--muted)]/20 px-2 py-1 text-xs text-[var(--muted)]">
                Muted
              </span>
              <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs text-[var(--foreground)]">
                Outline
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)]/80 py-1 pl-3 pr-1 text-xs text-[var(--foreground)]">
                필터
                <span className="rounded-full bg-[var(--muted)]/25 px-1.5 text-[10px] text-[var(--muted)]">
                  ×
                </span>
              </span>
              <span className="rounded text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                Live
              </span>
            </div>
          </div>

          {/* 브레드크럼 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              브레드크럼
            </h3>
            <nav
              aria-label="breadcrumb"
              className="mt-3 flex flex-wrap items-center gap-1 text-sm text-[var(--muted)]"
            >
              <a
                href="#components"
                className="text-[var(--accent)] hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                홈
              </a>
              <span aria-hidden>/</span>
              <a
                href="#components"
                className="hover:text-[var(--foreground)]"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                프로젝트
              </a>
              <span aria-hidden>/</span>
              <span className="text-[var(--foreground)]">설정</span>
            </nav>
          </div>

          {/* 탭 · 세그먼트 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              탭 · 세그먼트
            </h3>
            <div
              role="tablist"
              aria-label="샘플 탭"
              className="mt-3 inline-flex rounded-lg border border-[var(--border)] p-0.5"
            >
              {(
                [
                  ["overview", "개요"],
                  ["members", "멤버"],
                  ["billing", "빌링"],
                ] as const
              ).map(([id, label]) => {
                const selected = galleryTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setGalleryTab(id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      selected
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex max-w-md rounded-lg bg-[var(--background)] p-1">
              {(
                [
                  { id: "month" as const, label: "월간" },
                  { id: "year" as const, label: "연간", badge: "-17%" as const },
                ] as const
              ).map((item) => {
                const badge = "badge" in item ? item.badge : undefined;
                return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGalleryBilling(item.id)}
                  className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    galleryBilling === item.id
                      ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                  {badge && galleryBilling === item.id ? (
                    <span className="ml-1 text-[10px] text-emerald-400">
                      {badge}
                    </span>
                  ) : null}
                </button>
                );
              })}
            </div>
          </div>

          {/* 폼 필드 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              폼 필드
            </h3>
            <div className="mt-3 grid max-w-xl gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--muted)]">텍스트</span>
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--muted)]">검색</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 text-[var(--muted)] -translate-y-1/2">
                    ⌕
                  </span>
                  <input
                    type="search"
                    placeholder="검색…"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-9 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                </div>
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block text-[var(--muted)]">텍스트영역</span>
                <textarea
                  rows={3}
                  placeholder="설명을 입력하세요."
                  className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block text-[var(--muted)]">셀렉트</span>
                <select
                  value={demoPlan}
                  onChange={(e) => setDemoPlan(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
                >
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <p className="mt-1 text-xs text-[var(--accent)]">
                  선택됨: {demoPlan}
                </p>
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block text-rose-300">에러 상태</span>
                <input
                  type="email"
                  aria-invalid
                  defaultValue="not-an-email"
                  className="w-full rounded-lg border border-rose-400/60 bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-rose-400/50"
                />
                <p className="mt-1 text-xs text-rose-300">
                  올바른 이메일 형식이 아닙니다.
                </p>
              </label>
            </div>
          </div>

          {/* 토글 · 체크 · 라디오 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              토글 · 체크 · 라디오
            </h3>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={demoSwitch}
                  onClick={() => setDemoSwitch((v) => !v)}
                  className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    demoSwitch ? "bg-[var(--accent)]" : "bg-[var(--muted)]/30"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute top-1 size-5 rounded-full bg-[var(--background)] shadow transition ${
                      demoSwitch ? "left-6" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-[var(--foreground)]">
                  푸시 알림 {demoSwitch ? "켜짐" : "꺼짐"}
                </span>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={demoChecks.agree}
                  onChange={(e) =>
                    setDemoChecks((c) => ({ ...c, agree: e.target.checked }))
                  }
                  className="size-4 cursor-pointer rounded border-[var(--border)] accent-[var(--accent)]"
                />
                <span className="text-[var(--foreground)]">이용약관 동의</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={demoChecks.promo}
                  onChange={(e) =>
                    setDemoChecks((c) => ({ ...c, promo: e.target.checked }))
                  }
                  className="size-4 cursor-pointer rounded border-[var(--border)] accent-[var(--accent)]"
                />
                <span className="text-[var(--foreground)]">프로모 메일 수신</span>
              </label>
            </div>
            <fieldset className="mt-4 space-y-2 border-none p-0">
              <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                플랜
              </legend>
              {(
                [
                  ["a", "무료"],
                  ["b", "팀"],
                  ["c", "엔터프라이즈"],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="design-poc-gallery-plan"
                    checked={demoRadio === id}
                    onChange={() => setDemoRadio(id)}
                    className="size-4 cursor-pointer border-[var(--border)] accent-[var(--accent)]"
                  />
                  <span className="text-[var(--foreground)]">{label}</span>
                </label>
              ))}
            </fieldset>
          </div>

          {/* 피드백 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              피드백 · 상태
            </h3>
            <div className="mt-3 space-y-3">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--foreground)]">
                <strong className="text-[var(--accent)]">정보</strong>
                {" — "}배포가 큐에 등록되었습니다.
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                <strong>성공</strong>
                {" — "}저장이 완료되었습니다.
              </div>
              <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <strong>경고</strong>
                {" — "}쿼터 80%에 도달했습니다.
              </div>
              <div className="rounded-lg border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                <strong>오류</strong>
                {" — "}결제 수단을 확인해 주세요.
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="size-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
                  aria-hidden
                />
                <span className="text-sm text-[var(--muted)]">로딩 중…</span>
                <div
                  className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-[var(--border)]"
                  role="progressbar"
                  aria-valuenow={66}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all"
                    style={{ width: "66%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 카드 · 리스트 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              카드 · 리스트
            </h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-sm font-semibold text-[var(--accent)]"
                    aria-hidden
                  >
                    JD
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--foreground)]">
                      Jane Doe
                    </p>
                    <p className="text-xs text-[var(--muted)]">Product · 서울</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      마지막 활동 2시간 전
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg border border-[var(--border)] py-2 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
                >
                  프로필 보기
                </button>
              </div>
              <ul className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--background)]/40">
                {["알림 설정", "API 키", "감사 로그"].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[var(--foreground)] transition hover:bg-[var(--card)]/50"
                    >
                      {item}
                      <span className="text-[var(--muted)]">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 테이블 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              테이블 (밀도 샘플)
            </h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="border-b border-[var(--border)] bg-[var(--card)]/50 text-xs uppercase tracking-wide text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-2 font-medium">이름</th>
                    <th className="px-4 py-2 font-medium">역할</th>
                    <th className="px-4 py-2 font-medium text-right">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    ["김민수", "Admin", "활성"],
                    ["Lee", "Editor", "초대됨"],
                    ["Park", "Viewer", "활성"],
                  ].map(([name, role, status]) => (
                    <tr
                      key={name}
                      aria-selected={galleryTableRow === name}
                      tabIndex={0}
                      onClick={() => setGalleryTableRow(name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setGalleryTableRow(name);
                        }
                      }}
                      className={`cursor-pointer text-[var(--foreground)] transition focus-visible:bg-[var(--card)]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] ${
                        galleryTableRow === name
                          ? "bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15"
                          : "hover:bg-[var(--card)]/30"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-medium">{name}</td>
                      <td className="px-4 py-2.5 text-[var(--muted)]">{role}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className={
                            status === "활성"
                              ? "text-emerald-400"
                              : "text-amber-300"
                          }
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">
              행을 클릭(또는 포커스 후 Enter)하면 선택이 바뀝니다. 현재:{" "}
              <span className="font-medium text-[var(--accent)]">
                {galleryTableRow}
              </span>
            </p>
          </div>

          {/* 스켈레톤 · 아코디언 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              스켈레톤 · 접기
            </h3>
            <div className="mt-3 flex flex-col gap-4 md:flex-row">
              <div className="flex-1 space-y-2 rounded-xl border border-[var(--border)] p-4">
                <div className="h-4 w-3/4 max-w-[12rem] animate-pulse rounded bg-[var(--muted)]/25" />
                <div className="h-3 w-full max-w-md animate-pulse rounded bg-[var(--muted)]/15" />
                <div className="h-3 w-5/6 max-w-sm animate-pulse rounded bg-[var(--muted)]/15" />
              </div>
              <details className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)]/40 px-4 py-2">
                <summary className="cursor-pointer py-2 text-sm font-medium text-[var(--foreground)]">
                  자주 묻는 질문 (native details)
                </summary>
                <p className="border-t border-[var(--border)] pb-3 pt-2 text-sm text-[var(--muted)] leading-relaxed">
                  브라우저 기본 접기/펼치기입니다. 키보드 포커스만 별도로 다듬으면
                  접근성 요구에 맞출 수 있습니다.
                </p>
              </details>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              페이지네이션
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setGalleryPage((p) => Math.max(1, p - 1))}
                className="cursor-pointer rounded-lg border border-[var(--border)] px-2 py-1.5 text-xs text-[var(--muted)] transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                이전
              </button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGalleryPage(n)}
                  className={`min-w-8 cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    galleryPage === n
                      ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                      : "text-[var(--muted)] hover:bg-[var(--card)]/50 hover:text-[var(--foreground)]"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setGalleryPage((p) => Math.min(5, p + 1))}
                className="cursor-pointer rounded-lg border border-[var(--border)] px-2 py-1.5 text-xs text-[var(--muted)] transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                다음
              </button>
              <span className="ml-2 text-xs text-[var(--muted)]">
                페이지 {galleryPage}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-1 border-t border-[var(--border)] pt-8">
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
        <h2 className="text-lg font-semibold">시나리오 가이드</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          채널·제품 밀도·도메인·거버넌스 등{" "}
          {SCENARIO_OPTIONS.length}가지 시나리오를 골라, 스택별로 한 줄씩
          정리합니다. ui-frameworks.md 「선택 가이드」와 함께 보세요.
        </p>
        <label className="mt-6 block text-sm">
          <span className="mb-1 block font-medium text-[var(--foreground)]">
            시나리오
          </span>
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as Screen)}
            className="w-full max-w-2xl rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
          >
            {(
              [...new Set(SCENARIO_OPTIONS.map((o) => o.group))] as string[]
            ).map((group) => (
              <optgroup key={group} label={group}>
                {SCENARIO_OPTIONS.filter((o) => o.group === group).map(
                  (o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ),
                )}
              </optgroup>
            ))}
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
