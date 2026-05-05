# k-design

[Harness Engineering](https://github.com/revfactory/harness) 관점을 반영한 바이브코딩 수익화·에이전트 설계 문서.

## 랜딩 사이트 (수익·문의)

- 경로: [`site/`](site/)
- 로컬: `cd site && npm install && cp .env.example .env.local` 후 `.env.local`에 `NEXT_PUBLIC_CONTACT_EMAIL` 설정 → `npm run dev`
- **Harness 설계 샘플 페이지**: `/sample` ([로컬](http://localhost:3000/sample))
- **CBT 설계 POC** (교안 텍스트 → 목표·모듈 초안): `/poc` — `ANTHROPIC_API_KEY` 선택
- 콘텐츠: [`site/content/harness-design-sample.md`](site/content/harness-design-sample.md) — `monetization/samples/` 와 내용 동기화
- 프로덕션
  - [Vercel](https://vercel.com): **Root Directory** → `site`
  - [Netlify](https://app.netlify.com/) (예: `k-design-studio`): 저장소 루트 연결 시 루트의 [`netlify.toml`](netlify.toml)이 `base = "site"`·`@netlify/plugin-nextjs`로 빌드합니다. 대시보드 **Environment variables**에 `NEXT_PUBLIC_SITE_URL`(배포 URL·커스텀 도메인), `NEXT_PUBLIC_CONTACT_EMAIL` 등을 넣으면 SEO·문의에 반영됩니다.

## Figma 디자인 한 번에 실행

처음 한 번만 `npm install --prefix site`로 의존성을 설치한 뒤, 저장소 루트에서 다음 명령을 실행합니다.

```bash
npm run design
```

이 명령은 Figma TalkToFigma WebSocket 서버를 `3055` 포트로 자동 실행하고, `site`의 Next 개발 서버를 `PORT` 기본값 `3060`으로 띄운 뒤, 브라우저에서 `/poc/design`을 엽니다. macOS에서는 Figma 앱도 함께 열려고 시도합니다. 포트를 바꾸려면 다음처럼 실행합니다.

```bash
PORT=3061 npm run design
```

Figma 플러그인에서는 WebSocket Server Port를 `3055`로 둔 뒤 Connect를 누릅니다. 작업 파일과 프레임을 연 뒤 플러그인 채널을 연결하고, Cursor에서 선택한 프레임 리뷰나 구현 요청을 이어서 진행합니다.

## 진입점

- [monetization/DESIGN.md](monetization/DESIGN.md) — 전략 허브
- [monetization/references/harness-engineering.md](monetization/references/harness-engineering.md) — Harness 적용 가이드

## 라이선스

저장소 루트의 [LICENSE](LICENSE)를 따른다.
