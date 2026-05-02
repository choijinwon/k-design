---
name: saas-boilerplate
description: "CBT/교육 SaaS용 Next.js+Supabase+Auth 초기 골격, 스토리지, AI 호출 경로 스텁, Electron 연동 지점. 신규 SaaS 레포 부트스트랩, 온프레미스 옵션 설계, POC 폴더 구조가 필요할 때 사용. 스택 변경·부분 재생성·문서만 갱신 요청에도 적용한다."
---

# SaaS Boilerplate (교육/CBT 방향)

## 목표

[references/tech-stack.md](../../references/tech-stack.md)에 맞는 **배포 가능한 최소 SaaS 뼈대**를 만든다. 도메인 로직은 얇게 유지한다.

## Phase 0: 제약 확인

1. 클라우드만인지, 온프레미스 옵션이 필요한지 기록한다.
2. SCORM/Electron 결과물이 MVP에 포함되는지 bool로 고정한다.

산출: `_workspace/saas/00_constraints.md`

## Phase 1: 레포 구조

권장 디렉터리(필요 시 조정):

```text
apps/web/          # Next.js
packages/core/     # 공유 타입·유틸
electron/          # (선택) 데스크톱 셸
_workspace/        # 에이전트 산출물 (gitignore 가능)
```

산출: `_workspace/saas/01_structure.md`

## Phase 2: 인증·DB·스토리지

1. Auth: NextAuth.js(or 동등)와 역할(관리자/작성자/뷰어) 초안.
2. DB: Supabase 스키마 초안 — `projects`, `uploads`, `generated_modules`, `export_jobs`.
3. Storage: 원본 스크립트(PDF/Docx) 버킷 정책.

산출: `schema.sql` 또는 마이그레이션 초안 경로를 `01_structure.md`에 링크.

## Phase 3: AI 파이프라인 스텁

1. 입력: 업로드 ID.
2. 단계: 파싱 → 목차/학습목표 → 시나리오 초안 → 퀴즈 초안 (각각 job 테이블 행).
3. 실제 모델 호출은 인터페이스 뒤로 숨긴다 (`lib/ai/*`).

산출: `_workspace/saas/03_pipeline.md` (시퀀스 다이어그램 또는 bullet 파이프라인)

## Phase 4: 내보내기

1. HTML5 패키지 zip 또는 SCORM 2004 **스켈레톤** 디렉터리를 생성하는 CLI/스크립트 자리만 잡는다.
2. Electron이 필요하면 “웹에서 생성·웹에서 다운로드·오프라인 뷰어” 플로를 문서화한다.

## Phase 5: 운영

1. 환경 변수 목록 `.env.example`.
2. 로깅·PII 마스킹 원칙 한 단락.

## 검증 기준

- 로컬에서 웹 앱이 뜨고, 업로드→job 행 생성까지 최소 경로가 동작한다(모의 데이터 허용).
- AI 호출 실패 시 재시도·dead-letter 정책이 문서화돼 있다.
- 온프레미스 모드일 때 SQLite 전환 포인트가 `00_constraints.md`에 적혀 있다.

## 에러 핸들링

- 스택을 실제 레포와 맞출 수 없으면 차이를 `01_structure.md` 상단에 “의도적 편차”로 기록한다.
