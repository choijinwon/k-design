/** 시나리오 가이드 선택 값 — 라이브 화면·요약과 공유 */

export type Screen =
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

export const SCENARIO_OPTIONS: { group: string; id: Screen; label: string }[] =
  [
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

export const SCENARIO_SUMMARY_LABEL: Record<Screen, string> = Object.fromEntries(
  SCENARIO_OPTIONS.map((o) => [
    o.id,
    o.label.split(" — ")[0]?.trim() ?? o.label,
  ]),
) as Record<Screen, string>;
