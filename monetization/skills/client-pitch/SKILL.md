---
name: client-pitch
description: "고객 제안서·견적·패키지 비교표·커버 이메일 생성. 바이브코딩 에이전시, CBT SaaS 파일럿 제안, 방 교육 담당자 대상 B2B 제안이 필요할 때 사용. 수정·재생성·특정 섹션만 갱신·이전 버전 개선 요청 시에도 이 스킬을 따른다."
---

# Client Pitch — 제안서 생성

## 목적

제공된 사실(PR stack, 일정, 가격)을 왜곡하지 않고 **한 번에 결정 가능한 제안서**로 만든다.

## Phase 0: 입력 수집

필수 입력:

- 고객 이름·산업·연락 경로
- 문제 정의(고객 언어 3~5문장)
- 제안 범위(MVP Sprint / 앱 / SaaS 파일럿)
- 가격·일정: [references/pricing-model.md](../../references/pricing-model.md)에서 복사해 숫자를 확정

저장: `_workspace/pitch/00_inputs.md`

## Phase 1: 서사 구조

고정 목차:

1. 요약 (배경·제안·기대효과)
2. 이해한 요구사항
3. 접근 방식 (바이브코딩 + 에이전트 팀 운영 원리 한 단락)
4. 범위·산출물 (표)
5. 일정·마일스톤
6. 투자(가격)·옵션
7. 다음 단계 (승인·킥오프)

산출: `_workspace/pitch/01_outline.md`

## Phase 2: 초안 작성

1. content-marketer 톤: 과장 금지, 오프라인·보안 요구는 명시.
2. **증거** 섹션: 관련 경력·유사 프로젝트는 사실만.

산출: `_workspace/pitch/02_proposal.md`

## Phase 3: 검증 (생성-검증)

1. revenue-optimizer와 숫자·패키지명을 대조한다.
2. product-analyst PRD와 기능 불일치를 제거한다.

산출: `_workspace/pitch/03_review-checklist.md` (통과/수정 항목)

## Phase 4: 납품 묶음

최종 파일:

- `02_proposal.md` (본문)
- `cover-email.md` (5~8문장)
- `one-pager.md` (선택, 1페이지 요약)

## 검증 기준

- 가격·일정·산출물이 서로 모순되지 않는다.
- “AI가 알아서” 같은 문구 대신 **프로세스·검증**을 쓴다.
- 고객이 회신해야 할 액션(일정 잡기, 계약)이 명확하다.
