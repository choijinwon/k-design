# 샘플: Harness Engineering 적용 설계 브리프

> 이 문서는 **가상 시나리오** 예시다. 실제 프로젝트에 복사해 제목·범위·경로만 바꿔 쓰면 된다. Harness 공식 레퍼런스는 [harness-engineering.md](references/harness-engineering.md)와 [revfactory/harness](https://github.com/revfactory/harness/tree/main/skills/harness/references)를 본다.

---

## 0. 메타

| 항목 | 샘플 값 |
|------|---------|
| 브리프 이름 | `landing-revamp-q2` |
| 목표 산출물 | 반응형 랜딩 1페이지 + 문의 CTA + 배포 URL |
| 실행 모드 | **에이전트 팀** (분석·구현·카피 간 메시지 조율 필요) |
| 주 패턴 | **팬아웃/팬인** + **생성-검증** |
| 작업 루트 | `_workspace/landing-revamp-q2/` |

---

## 1. 패턴 선택 근거 (한 문단)

랜딩은 **카피·정보구조·구현**이 동시에 맞아야 해서, 초기에 **팬아웃**으로 병렬 초안을 만든 뒤 **팬인**으로 오케스트레이터가 한 흐름으로 합친다. 배포 전에는 **생성-검증**으로 접근성·브라우저 스모크 기준을 한 번 통과시킨다.

---

## 2. 에이전트 구성 (샘플)

| 팀원 id | 역할 | Harness 타입(참고) | 스킬(예시) | 산출물 |
|---------|------|-------------------|------------|--------|
| `ia-copy` | 정보구조·헤드라인 초안 | general-purpose | `client-pitch` 일부 | `_workspace/.../02_ia-copy.md` |
| `ui-build` | 컴포넌트·스타일 구현 | 커스텀 | `mvp-sprint` | 저장소 내 `app/page.tsx` 등 |
| `qa-lite` | 스모크·문구 최소 검수 | Explore 또는 커스텀 | — | `_workspace/.../04_qa-report.md` |

오케스트레이터(사람 + 리드 에이전트)는 **통합·승인**만 담당한다.

---

## 3. Phase 시나리오 (오케스트레이터 골격)

아래는 [orchestrator-template](https://github.com/revfactory/harness/blob/main/skills/harness/references/orchestrator-template.md)를 줄인 **샘플 타임라인**이다.

| Phase | 행동 | 비고 |
|-------|------|------|
| **0** | 기존 `_workspace/` 있으면 백업 후 새 버전 | 부분 재실행 시 해당 에이전트만 재호출 |
| **1** | 입력을 `00_input/brief.md`에 저장 | 목표 URL, 톤, 금지 표현, deadline |
| **2** | `TeamCreate` + `TaskCreate` | 작업 3~5개, `depends_on` 명시 |
| **3** | 팀원 병렬 작업, 필요 시 `SendMessage` | 예: 카피 확정 전 UI는 플레이스홀더 |
| **4** | 산출 Read → 통합 → 스테이징 배포 확인 | 생성-검증: QA 체크리스트 PASS |
| **5** | 팀 정리, `_workspace/` 보존 | 감사·재현용 |

---

## 4. TaskCreate 예시 (의사 코드)

실제 Harness 런타임이 아닌 **설계 메모** 형식이다.

```text
TaskCreate([
  { title: "IA + 헤드라인 v1", assignee: "ia-copy" },
  { title: "히어로·가격 섹션 마크업", assignee: "ui-build", depends_on: ["IA + 헤드라인 v1"] },
  { title: "스모크 + 문구 최소 검수", assignee: "qa-lite", depends_on: ["히어로·가격 섹션 마크업"] },
])
```

---

## 5. 생성-검증 루프 (샘플 기준)

| 검증 항목 | 통과 조건 |
|-----------|-----------|
| CTA | 문의 섹션 id·링크 1곳 이상 명확 |
| 반응형 | `sm` / `md` 브레이크포인트에서 레이아웃 깨짐 없음 |
| 접근성 | 주요 버튼·링크에 포커스 링 가능 |
| 재시도 | FAIL 시 최대 **2회**까지 수정 루프 |

---

## 6. 스킬 `description` 샘플 (YAML)

에이전트가 스킬을 고를 때 쓰는 **트리거 문구** 예시다. ([skill-writing-guide](https://github.com/revfactory/harness/blob/main/skills/harness/references/skill-writing-guide.md))

```yaml
description: >-
  2주 이내 랜딩 1페이지 리뉴얼. 히어로·사회적 증거·가격·문의 CTA 포함.
  배포 URL·문구 수정·섹션 추가·다시 실행·특정 섹션만 재생성 요청 시
  반드시 이 스킬을 사용한다. Electron·SCORM은 범위에서 제외.
```

---

## 7. 에이전트 정의 스니펫 (최소)

새 팀원 파일을 만들 때 넣을 **최소 블록** 샘플이다.

```markdown
---
name: ia-copy
description: "랜딩 정보구조·헤드라인·섹션 순서. brief 또는 기존 사이트 URL이 주어지면 호출."
---

# IA Copy — 랜딩 구조·카피 v1

## 핵심 역할
1. 섹션 목차·한 줄 메시지 per 섹션
2. 금지 표현·톤 가이드 준수

## 입력/출력 프로토콜
- 입력: `_workspace/.../00_input/brief.md`
- 출력: `_workspace/.../02_ia-copy.md`

## 팀 통신 프로토콜
- ui-build에게: 섹션 제목·문단 요약 SendMessage
```

---

## 8. 런타임 매핑 메모

| 이 샘플의 산출 | Cursor/Claude Code에서 |
|----------------|-------------------------|
| `../agents/*.md` | `.claude/agents/` 로 복사 또는 규칙으로 주입 |
| 스킬 | `.cursor/skills/` 또는 프로젝트 스킬 디렉터리 |
| `_workspace/` | 레포 내 gitignored 폴더 또는 CI 아티팩트 |

---

**끝.** 실제 수익화·에이전트 정의 풀세트는 [../DESIGN.md](../DESIGN.md), [agents/](../agents/), [skills/](../skills/)를 본다.
