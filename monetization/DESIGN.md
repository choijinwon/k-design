# 바이브코딩 수익화 프로젝트 설계서

**핵심 전제**: 1인 개발자 + AI 에이전트 팀 = 5인 팀 이상의 결과물. 이 격차를 상품으로 판다.

이 문서는 **요약·우선순위·링크 허브**다. 숫자·스택·시장·GTM 상세는 [`references/`](references/)를 읽는다.

## 디렉터리 맵

```text
monetization/
├── DESIGN.md                 # 본 파일
├── references/
│   ├── market-analysis.md
│   ├── pricing-model.md
│   ├── agent-architecture.md
│   ├── harness-engineering.md
│   ├── tech-stack.md
│   ├── ui-frameworks.md
│   ├── ai-assistants.md
│   └── go-to-market.md
├── agents/
│   ├── product-analyst.md
│   ├── fullstack-builder.md
│   ├── content-marketer.md
│   └── revenue-optimizer.md
├── samples/
│   └── harness-design-sample.md   # Harness 적용 설계 MD 샘플
└── skills/
    ├── mvp-sprint/SKILL.md
    ├── client-pitch/SKILL.md
    └── saas-boilerplate/SKILL.md
```

## Phase 1: 도메인 분석 — 무엇을 파는가

- 자산·포지셔닝·페르소나: [references/market-analysis.md](references/market-analysis.md)

## Phase 2: 에이전트 팀 아키텍처

- Harness Engineering 가이드(공식 문서 링크·용어·Phase·스킬/에이전트 구분): [references/harness-engineering.md](references/harness-engineering.md)
- 설계 브리프 **샘플 MD** (복사용): [samples/harness-design-sample.md](samples/harness-design-sample.md)
- 수익화 시나리오별 패턴 매핑, 팬아웃/팬인 + 생성-검증: [references/agent-architecture.md](references/agent-architecture.md)
- 역할 정의: [agents/](agents/)
- Cursor·Claude·Gemini·ChatGPT 역할 구분: [references/ai-assistants.md](references/ai-assistants.md)

## Phase 3: 수익화 아이디어 3선

Harness [6가지 패턴](https://github.com/revfactory/harness/blob/main/skills/harness/references/agent-design-patterns.md) 매핑 표는 [references/agent-architecture.md](references/agent-architecture.md#아이디어별-패턴-매칭-1줄-근거)에 둔다.

### 아이디어 A (추천): CBT 자동생성 SaaS

| 항목 | 내용 |
|------|------|
| 개요 | 방산·항공 인터랙티브 CBT 개발 경험을 SaaS화. 스크립트 업로드 → AI가 학습목표·시나리오·인터랙션·문항 생성 → Electron 패키지·SCORM 출력 |
| 주 패턴 | 계층적 위임 + 전문가 풀 |
| 가격·티어 | [references/pricing-model.md](references/pricing-model.md#아이디어-a-cbt-자동생성-saas-구독--구축) |
| 기술 | [references/tech-stack.md](references/tech-stack.md) |

### 아이디어 B: 바이브코딩 에이전시 (현금흐름)

| 항목 | 내용 |
|------|------|
| 개요 | MVP 2주 등 패키지로 빠른 납품. 슈퍼바이저(나) + AI 팀 |
| 주 패턴 | 감독자 |
| 가격 | [references/pricing-model.md](references/pricing-model.md#아이디어-b-바이브코딩-에이전시) |

### 아이디어 C: 하네스 교육 플랫폼

| 항목 | 내용 |
|------|------|
| 개요 | 강의·디스코드·1:1 컨설팅으로 노하우 판매 |
| 주 패턴 | 팬아웃/팬인 |
| 가격 | [references/pricing-model.md](references/pricing-model.md#아이디어-c-교육커뮤니티컨설팅) |

## Phase 4: 추천 실행 순서

[references/go-to-market.md](references/go-to-market.md#권장-실행-순서-요약)

## Phase 5: 수익 목표 시나리오

월별 표: [references/pricing-model.md](references/pricing-model.md#월별-합산-시나리오-만원)

## Phase 6: 검증 체크리스트

### 아이디어 A — 기술

- [ ] Claude API로 PDF → CBT 스크립트 변환 성공
- [ ] SCORM 2004 패키지 LMS 업로드 테스트
- [ ] Electron 오프라인 실행 검증

### 아이디어 A — 시장

- [ ] 잠재 고객 5명 인터뷰 완료
- [ ] “지금 당장 50만원 내겠다” 긍정 2명 이상
- [ ] 경쟁 대비 차별점 명확화

### 아이디어 A — 재무

- [ ] MVP 개발 비용 < 300만원(시간 기준)
- [ ] 첫 유료 고객 M3 이전
- [ ] CAC < LTV × 0.3

인터뷰·포지셔닝 문맥: [references/market-analysis.md](references/market-analysis.md)

## 다음 액션

[references/go-to-market.md](references/go-to-market.md#다음-액션-운영-체크리스트)

## Harness 참조

- 로컬 요약 허브: [references/harness-engineering.md](references/harness-engineering.md)
- [skill-writing-guide](https://github.com/revfactory/harness/blob/main/skills/harness/references/skill-writing-guide.md)
- [agent-design-patterns](https://github.com/revfactory/harness/blob/main/skills/harness/references/agent-design-patterns.md)
- [team-examples](https://github.com/revfactory/harness/blob/main/skills/harness/references/team-examples.md)
- [orchestrator-template](https://github.com/revfactory/harness/blob/main/skills/harness/references/orchestrator-template.md)
