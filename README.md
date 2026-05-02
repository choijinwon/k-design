# k-design

[Harness Engineering](https://github.com/revfactory/harness) 관점을 반영한 바이브코딩 수익화·에이전트 설계 문서.

## 랜딩 사이트 (수익·문의)

- 경로: [`site/`](site/)
- 로컬: `cd site && npm install && cp .env.example .env.local` 후 `.env.local`에 `NEXT_PUBLIC_CONTACT_EMAIL` 설정 → `npm run dev`
- **Harness 설계 샘플 페이지**: `/sample` ([로컬](http://localhost:3000/sample))
- **CBT 설계 POC** (교안 텍스트 → 목표·모듈 초안): `/poc` — `ANTHROPIC_API_KEY` 선택
- 콘텐츠: [`site/content/harness-design-sample.md`](site/content/harness-design-sample.md) — `monetization/samples/` 와 내용 동기화
- 프로덕션: [Vercel](https://vercel.com) 등에서 **Root Directory** 를 `site` 로 지정해 배포

## 진입점

- [monetization/DESIGN.md](monetization/DESIGN.md) — 전략 허브
- [monetization/references/harness-engineering.md](monetization/references/harness-engineering.md) — Harness 적용 가이드

## 라이선스

저장소 루트의 [LICENSE](LICENSE)를 따른다.
