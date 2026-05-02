# 기술 스택 선택 근거

## UI·CSS 프레임워크 선택

웹 UI는 HTML / React / Vue / Next / Nuxt에 따라 후보가 달라진다. 비교표·매트릭스·의사결정 요약은 [ui-frameworks.md](ui-frameworks.md)를 본다. 이 레포의 Next 기준 후보는 예를 들어 **Tailwind + shadcn/ui** 또는 **MUI · Ant Design**(관리형 화면) 조합이다.

## AI 코딩·챗 도구 (Cursor · Claude · Gemini · ChatGPT)

**IDE(Cursor)**와 **클라우드 모델/서비스(Claude, Gemini, ChatGPT)**의 차이, 바이브코딩에서의 역할 분담은 [ai-assistants.md](ai-assistants.md)를 본다. 제품 백엔드의 Claude API와 로컬 개발용 모델은 분리해 생각할 수 있다.

## 아이디어 A (CBT SaaS) 기준 스택

```yaml
frontend: React + TypeScript + Electron
backend: Next.js API Routes + Supabase
ai: Claude API (claude-sonnet-4-20250514)
output: SCORM 2004, HTML5 패키지
storage: Supabase Storage (클라우드) / 로컬 SQLite (온프레미스)
auth: NextAuth.js
```

### Why-first 요약

- **React + TypeScript**: 컴포넌트 재사용과 CBT 화면·상태 복잡도에 적합. 장기 유지보수에 유리하다.
- **Electron**: 방산·교육 현장에서 요구되는 **오프라인 실행**과 로컬 리소스 접근을 만족시키기 쉽다.
- **Next.js API Routes**: 단일 레포에서 웹·API·배포 스토리를 단순화. MVP에 유리하다.
- **Supabase**: Auth·DB·Storage를 빠르게 붙이되, Enterprise 옵션에서 온프레미스/대체 저장소 설계로 이행 가능하다.
- **SCORM 2004**: 기존 LMS 업로드·이수 데이터 연동을 위한 **사실상 표준**에 가깝다.
- **Claude API**: 긴 교안 파싱, 구조화, 문항 생성 같은 **긴 맥락 작업**에 강점이 있다.

## 아이디어 B (에이전시) 기준

- **Vercel + Next.js**: 랜딩·MVP 배포 속도.
- **Harness/Cursor 워크플로**: 산출물 일관성·리뷰 루프.

## 공통 원칙

- 스택은 “데모 속도”보다 **고객 환경(망분리, 오프라인)** 제약을 먼저 검증한다.
- AI 호출은 비용·로그·감사 가능성을 전제로 설계한다.
