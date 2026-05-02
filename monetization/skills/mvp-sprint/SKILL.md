---
name: mvp-sprint
description: "2주 MVP 스프린트 실행 표준. 바이브코딩 에이전시 납품, 랜딩+핵심기능 1개, Next.js/Vercel 배포, Harness/Cursor 병렬 작업이 필요할 때 사용. 수정·재실행·스코프 축소·다음 스프린트 계획 요청 시에도 이 스킬을 적용한다."
---

# MVP Sprint (2주)

2주 안에 **데모 가능한 MVP**를 납품한다. 오케스트레이터는 본 스킬의 Phase 순서를 따른다.

## 사전 조건

- 브리프 또는 PRD 초안 경로가 있다 (`_workspace/product/prd-draft.md` 권장).
- 스택은 [references/tech-stack.md](../../references/tech-stack.md)에 맞출 수 있으면 맞춘다.

## Phase 0: 컨텍스트

1. `_workspace/` 존재 여부 확인.
2. 새 브리프면 기존 `_workspace/`가 있으면 타임스탬프 백업 후 새 작업 공간을 연다.
3. 입력을 `_workspace/00_input/brief.md`에 저장한다.

## Phase 1: 스코프 고정

1. **In/Out** 테이블 작성: 반드시 “2주 후 데모 시나리오” 1개를 정의한다.
2. 기술 스파이크(최대 0.5일) 목록만 허용한다.
3. 산출: `_workspace/01_scope.md`

## Phase 2: 병렬 작업 (팬아웃)

오케스트레이터는 가능하면 다음을 동시에 진행한다.

| 트랙 | 담당 역할 | 산출 |
|------|-----------|------|
| 제품/위험 | product-analyst | PRD diff, 오픈 이슈 |
| 구현 | fullstack-builder | 코드·환경 변수 README |
| 대외 메시지 | content-marketer | 랜딩 초안·데모 스크립트 |

각 산출은 `_workspace/02_*` 접두어로 저장한다.

## Phase 3: 통합 (팬인)

1. 데모 시나리오대로 E2E 클릭 테스트를 수행한다.
2. **생성-검증**: fullstack-builder 산출에 대해 최소 1회 코드 리뷰 체크리스트를 적용한다.
3. 산출: `_workspace/03_release-notes.md`

## Phase 4: 배포·핸드오프

1. 프로덕션 URL·테스트 계정·알려진 이슈를 정리한다.
2. 고객에게 전달할 **다음 2주 옵션**(유지보수·Phase2) 한 줄 제안을 적는다.

## 검증 기준 (통과 조건)

- 데모 시나리오가 스테이징/프로덕션에서 재현된다.
- README에 로컬 실행과 배포가 10분 내 따라 할 수 있게 적혀 있다.
- 스코프 밖 요청은 `01_scope.md`에 backlog로 이동했다.

## 에러 핸들링

- 스코프 초과 징후가 보이면 오케스트레이터는 즉시 `01_scope.md`를 갱신하고 고객 승인을 요청한다.
- 블로커는 `_workspace/blockers.md`에 기록한다.
