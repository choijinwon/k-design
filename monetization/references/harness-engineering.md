# Harness Engineering — 적용 가이드 (본 레포)

[revfactory/harness](https://github.com/revfactory/harness)의 **스킬·레퍼런스**를 기준으로, 바이브코딩 수익화 번들(`monetization/`)을 설계·운용할 때 무엇을 가져다 쓰는지 정리한다. **도구 이름**(`TeamCreate`, `SendMessage` 등)은 Claude Code + Harness **런타임** 전제이며, Cursor에서는 서브에이전트·태스크·수동 오케스트레이션으로 **사상(mapping)** 하면 된다.

**설계 브리프 샘플(복붙용):** [samples/harness-design-sample.md](../samples/harness-design-sample.md)

## 공식 레퍼런스 (읽는 순서 권장)

| 문서 | URL | 본 레포에서의 용도 |
|------|-----|-------------------|
| 에이전트 팀 설계 패턴 | [agent-design-patterns.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/agent-design-patterns.md) | 6가지 아키텍처, 에이전트 팀 vs 서브에이전트, 복합 패턴 |
| 팀 예시 | [team-examples.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/team-examples.md) | 리서치·코드리뷰·감독자 등 워크플로, 에이전트 `.md` 필수 섹션 |
| 오케스트레이터 템플릿 | [orchestrator-template.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/orchestrator-template.md) | Phase 0–5, 팀/서브/하이브리드 모드 |
| 스킬 작성 가이드 | [skill-writing-guide.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/skill-writing-guide.md) | description 트리거, Why-first, Progressive Disclosure |
| QA 에이전트 | [qa-agent-guide.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/qa-agent-guide.md) | 검증·채점 패턴 참고 시 |
| 스킬 테스트 | [skill-testing-guide.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/skill-testing-guide.md) | 스킬 품질·eval 메타데이터 참고 시 |

상위 인덱스: [harness/skills/harness/references](https://github.com/revfactory/harness/tree/main/skills/harness/references).

## 핵심 개념 (용어)

### 에이전트 팀 vs 서브 에이전트

| 모드 | Harness에서의 의미 | 선택 힌트 |
|------|---------------------|-----------|
| **에이전트 팀** | `TeamCreate`로 팀원이 독립 인스턴스; `SendMessage`, 공유 작업 목록으로 **동료 간 소통** | 교차 검증·상충 정보 합의·리뷰 토론이 필요할 때 **기본** |
| **서브 에이전트** | 메인이 `Agent` 도구로 호출; 결과만 메인에 **반환**, 팀원 간 통신 없음 | 수집·생성-검증 2단 등 **통신 오버헤드가 낭비**일 때 |

공식 의사결정 트리는 [agent-design-patterns.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/agent-design-patterns.md)의 “모드 선택” 절을 본다.

### 자주 나오는 도구 (런타임)

- `TeamCreate` / 팀 정리 후 재구성  
- `SendMessage({ to })` — 특정 팀원 또는 필요 시 브로드캐스트(드묾)  
- `TaskCreate` / `TaskUpdate` — 공유 작업 큐, 의존성(`depends_on`), 클레임  
- 제약: 세션당 **활성 팀 1개** 등 — Phase마다 팀 해체 후 새 팀 구성 패턴이 문서화되어 있다.

본 전략의 **비즈니스 관점 패턴 매핑**(CBT·에이전시·교육)은 [agent-architecture.md](agent-architecture.md)에 둔다.

## 오케스트레이터 Phase 골격 (요약)

[orchestrator-template.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/orchestrator-template.md)와 맞춘다.

| Phase | 하는 일 |
|-------|---------|
| **0** | `_workspace/` 유무로 초기 실행 vs 부분 재실행 vs 새 입력 분기 |
| **1** | 입력 분석, `_workspace/`·`00_input/` 준비 |
| **2** | `TeamCreate` + `TaskCreate`(담당·의존성) 또는 서브 에이전트 병렬 호출 |
| **3** | 팀 자율 실행 / 서브 결과 수집, 산출물 경로 고정 |
| **4** | Read로 통합, 검증, 최종 산출물 |
| **5** | 팀 정리, `_workspace/` 보존(감사·재현) |

**하이브리드**: Phase마다 “팀 / 서브” 모드를 바꿀 수 있으나, **팀 전환 시 이전 팀 정리**가 전제다.

프로젝트 스킬 예시: [mvp-sprint/SKILL.md](../skills/mvp-sprint/SKILL.md), [client-pitch/SKILL.md](../skills/client-pitch/SKILL.md), [saas-boilerplate/SKILL.md](../skills/saas-boilerplate/SKILL.md).

## 에이전트 정의 파일 (Harness 권장 섹션)

Harness [team-examples.md](https://github.com/revfactory/harness/blob/main/skills/harness/references/team-examples.md) 기준, 각 에이전트 `.md`는 다음을 갖는다.

- YAML frontmatter: `name`, `description`(트리거·후속 키워드 풍부)  
- 본문: **핵심 역할**, **작업 원칙**, **입력/출력 프로토콜**, **팀 통신 프로토콜**(팀 모드), **에러 핸들링**, **협업**

본 레포 구현: [agents/product-analyst.md](../agents/product-analyst.md) 등 4종.

**런타임 경로 (참고):** Harness·Claude Code 관례는 `.claude/agents/{name}.md`. Cursor에서는 팀 규칙·스킬·서브에이전트 정의로 이식한다.

## 스킬 vs 에이전트 (Harness 구분)

| 구분 | 스킬 (Skill) | 에이전트 (Agent) |
|------|--------------|------------------|
| 정의 | 절차·워크플로·도구 번들 | 페르소나·원칙·행동 |
| 트리거 | 요청 키워드·description 매칭 | 명시적 호출·팀 구성 |
| 용도 | “어떻게 하는가” | “누가 하는가” |

스킬은 `references/`로 **Progressive Disclosure**([skill-writing-guide](https://github.com/revfactory/harness/blob/main/skills/harness/references/skill-writing-guide.md)) 할 수 있다.

## description·후속 작업 (스킬)

- 스킬의 `description`은 **유일한 트리거** 후보로 취급된다 — 트리거 상황·**비적용 경계**를 구체히 쓴다.  
- 오케스트레이터 스킬은 **재실행·수정·보완** 같은 **후속 키워드**를 description에 넣어 “한 번 쓰고 끝나는 문서”가 되지 않게 한다.

## 본 레포 디렉터리 ↔ Harness 관점

```text
monetization/agents/*.md     → 역할 스펙 (→ .claude/agents/ 등으로 복사 가능)
monetization/skills/*/SKILL.md → 절차 스펙 (→ .cursor/skills/ 또는 .claude/skills/)
monetization/references/agent-architecture.md → 수익화 시나리오별 패턴 매핑
```

## 목차

1. [공식 레퍼런스](#공식-레퍼런스-읽는-순서-권장)  
2. [핵심 개념](#핵심-개념-용어)  
3. [오케스트레이터 Phase](#오케스트레이터-phase-골격-요약)  
4. [에이전트 정의 파일](#에이전트-정의-파일-harness-권장-섹션)  
5. [스킬 vs 에이전트](#스킬-vs-에이전트-harness-구분)  
6. [description·후속 작업](#description후속-작업-스킬)  
7. [본 레포 디렉터리 매핑](#본-레포-디렉터리--harness-관점)
