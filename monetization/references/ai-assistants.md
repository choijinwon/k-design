# Cursor · Claude · Gemini · ChatGPT — 역할 정리

바이브코딩·1인+에이전트 운용 시 **무엇이 IDE이고 무엇이 모델/서비스인지** 구분하면 도구 선택이 단순해진다.

*English:* When orchestrating vibe coding or a one-person + agents workflow, separating **the IDE** from **models/services** keeps tool choice straightforward.

## Comparison at a glance (English)

| Name | What it is | What it does |
|------|------------|--------------|
| **Cursor** | AI-native **IDE** (VS Code–family) | Edit with repo, terminal, and Git attached; refactor, agents, chat. **Switch the underlying model** in settings. |
| **Claude** | Anthropic **models + API + chat** | Long context, instruction following, code/docs. Cursor, **claude.ai**, **Claude API** (see [tech-stack.md](tech-stack.md)). |
| **Gemini** | Google **models + services** | Multimodal, search/Workspace context. Gemini app/web, **Gemini API**, some editor plugins. |
| **ChatGPT** | OpenAI **chat + API + models** | General Q&A, drafts, snippets. **chatgpt.com**, API, many third-party integrations. |

## 한눈에 비교

| 이름 | 정체 | 하는 일 |
|------|------|---------|
| **Cursor** | AI 네이티브 **IDE**(VS Code 계열) | 프로젝트 **소스·터미널·Git**과 붙은 채로 편집, 리팩터, 에이전트/챗. **여기서 쓸 모델**을 설정으로 바꿀 수 있음. |
| **Claude** | Anthropic **모델·API·챗 제품** | 긴 맥락, 지시 준수, 코드·문서·분석. Cursor 내장, **claude.ai**, **Claude API**(본 레포 [tech-stack.md](tech-stack.md)의 파이프라인)로 접근. |
| **Gemini** | Google **모델·서비스** | 멀티모달, 검색·구글 워크스페이스 맥락. **Gemini** 앱/웹, API, 일부 에디터·플러그인 연동. |
| **ChatGPT** | OpenAI **챗·API·모델** | 범용 질의, 초안, 코드 스니펫. **chatgpt.com**, API, 다양한 서드파티 연동. |

## MCP · API · 웹(소비자) 접근

**MCP(Model Context Protocol)** 는 주로 **IDE·서버가 “툴 목록”을 노출**해 AI가 호출하는 방식이다. **REST/스트리밍 API**는 **백엔드·배치**에서 키로 모델을 부를 때 쓴다. 완전히 다른 계층이므로 혼동하지 않는다.

*English:* **MCP** exposes **callable tools** to the agent (often inside an IDE). **REST/streaming vendor APIs** are for **server-side / batch** calls with API keys. They solve different layers.

### 접근 방식 요약

| 접근 | 한국어 | English |
|------|--------|---------|
| **MCP** | 로컬/원격 **MCP 서버**를 에디터 등에 연결, DB·이슈 트래커·문서 등을 **툴**로 호출 | Connect **MCP servers** so the agent can invoke **tools** (DB, trackers, docs, etc.). |
| **Vendor API** | 앱 서버에서 HTTP로 토큰·요청, 응답을 비즈니스 로직에 합류 | App server calls the provider **HTTP API**; fold responses into product logic. |
| **Consumer chat** | 브라우저/앱 UI, 사람이 직접 대화 | Human uses **web/app chat** for quick iteration. |

### 제품별 (대표적이지 전부가 아님)

| 제품 | MCP (예시) | HTTP API | 소비자 챗 |
|------|------------|----------|-----------|
| **Cursor** | 사용자 구성 MCP 서버 연결 가능 | 모델 호출 자체는 Cursor 요금/키 정책에 따름 | 에디터 내 Chat / Agent |
| **Claude** | 일부 클라이언트·통합에서 MCP 사용 사례 존재 | **Claude API**(Messages 등) | claude.ai |
| **Gemini** | 플랫폼·버전에 따라 상이 | **Gemini API** | Gemini 웹/앱 |
| **ChatGPT** | 제품·통합에 따라 상이 | **OpenAI API** | ChatGPT |

보안·과금은 **API 키는 서버 env**, **MCP는 신뢰하는 서버만** 연결하는 식으로 나누어 관리한다.

## IDE vs 모델 vs 워크플로

```text
[Cursor] = 편집기 “상자” / IDE “shell”
    └── 내부에서 Claude / GPT 계열 / 기타 제공 모델 선택
        └── picks models inside the shell

[Claude · ChatGPT · Gemini] = 각각 다른 회사의 “두뇌” / different vendors’ “brains”
    └── 정책·강점·툴 연결이 다름 / policies, strengths, tool wiring differ
```

- **코드베이스 단위 작업**(전체 검색, 일괄 수정, PR 단위)은 **Cursor 같은 IDE**가 기본 무대다. *Repo-scale work lives in an IDE like Cursor.*
- **서비스 백엔드·배치**(교안 파싱, SCORM 생성 등)는 **API(예: Claude API)** 로 모델을 고정해 붙이는 경우가 많다. *Product pipelines usually pin a **vendor API**.*
- **빠른 브레인스토밍·카피**는 **웹 챗**을 병행해도 된다. *Consumer chat is fine for brainstorming and copy.*

## 바이브코딩에서의 조합 예

| 목적 | 추천 조합 |
|------|-----------|
| 기능 구현·리팩터·디버그 | Cursor + 팀에서 쓰는 기본 모델(Claude 또는 GPT 등) |
| 긴 스펙·PRD·다문서 유지 | Claude(맥락 길이·구조화에 유리한 편) |
| 최신 정보·웹과 섞은 질문 | Gemini 또는 해당 기능이 있는 챗/에이전트 |
| 짧은 질문·프롬프트 실험 | ChatGPT·클로드 웹 등 무엇이든 편한 것 |

*English mapping:* implementation/refactors → **Cursor**; long specs → **Claude**; search-heavy prompts → **Gemini**; quick experiments → any **consumer chat** you prefer.

## 본 레포 스택과의 연결

- **제품 AI 파이프라인**(CBT 생성 등)은 [tech-stack.md](tech-stack.md)에 정의된 **Claude API** 중심으로 설계한다. Cursor 안에서 쓰는 모델과 **반드시 동일할 필요는 없음**(개발용 vs 프로덕션용 분리).  
  *Product AI uses **Claude API** per tech-stack; the IDE model can differ (dev vs prod).*
- **Harness/Cursor 에이전트**는 “오케스트레이터 + 역할 md + 스킬”로 운용하고, 각 단계에 붙는 **모델은 툴 설정**으로 맞춘다. 상세는 [agent-architecture.md](agent-architecture.md).  
  *Harness/Cursor agents: orchestrator + role markdown + skills; **pick models in tool/settings**.*

## 목차

1. [Comparison at a glance (English)](#comparison-at-a-glance-english)  
2. [한눈에 비교](#한눈에-비교)  
3. [MCP · API · 웹 접근](#mcp--api--웹소비자-접근)  
4. [IDE vs 모델 vs 워크플로](#ide-vs-모델-vs-워크플로)  
5. [바이브코딩에서의 조합 예](#바이브코딩에서의-조합-예)  
6. [본 레포 스택과의 연결](#본-레포-스택과의-연결)
