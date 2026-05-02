# k-design

[Harness Engineering](https://github.com/revfactory/harness) 관점을 반영한 바이브코딩 수익화·에이전트 설계 문서.

## 랜딩 사이트 (수익·문의)

- 경로: [`site/`](site/)
- 로컬: `cd site && npm install && cp .env.example .env.local` 후 `.env.local`에 `NEXT_PUBLIC_CONTACT_EMAIL` 설정 → `npm run dev`
- 프로덕션: [Vercel](https://vercel.com) 등에서 **Root Directory** 를 `site` 로 지정해 배포

## 진입점

- [monetization/DESIGN.md](monetization/DESIGN.md) — 전략 허브
- [monetization/references/harness-engineering.md](monetization/references/harness-engineering.md) — Harness 적용 가이드

## 라이선스

저장소 루트의 [LICENSE](LICENSE)를 따른다.
