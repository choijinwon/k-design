# 프론트 UI·디자인 레퍼런스

## 목적

[HTML](https://developer.mozilla.org/docs/Web/HTML) 정적 페이지, [React](https://react.dev/), [Vue](https://vuejs.org/), [Next.js](https://nextjs.org/), [Nuxt](https://nuxt.com/) 중 어떤 스택을 쓰든 **스타일·UI 컴포넌트**를 고를 때 빠르게 비교한다. 본 문서는 공식 문서로 대체하지 않으며, **선택 시 체크포인트**용이다.

## 공식 링크

| 이름 | URL | 비고 |
|------|-----|------|
| Tailwind CSS | [tailwindcss.com](https://tailwindcss.com/) | 유틸리티 퍼스트 CSS |
| Bootstrap | [getbootstrap.com](https://getbootstrap.com/) | CSS/JS 컴포넌트 툴킷 |
| Material Design 3 | [m3.material.io](https://m3.material.io/) | 디자인 스펙·가이드 (구현체 아님) |
| MUI | [mui.com](https://mui.com/) | React 중심, Material 구현 |
| shadcn/ui | [ui.shadcn.com](https://ui.shadcn.com/) | React + Tailwind, 코드 복사 방식 |
| Ant Design | [ant.design](https://ant.design/) | React 본류; Vue·Angular는 별도 제품 |
| Bulma | [bulma.io](https://bulma.io/) | Flexbox 기반 CSS (JS 불필요) |
| Materialize | [materializecss.com](https://materializecss.com/) | Material 스타일 프론트 프레임워크 |

## 유형 분류

### 유틸리티 퍼스트 CSS

- **Tailwind**: 클래스 조합으로 레이아웃·타이포·색을 직접 잡는다. 프레임워크에 **종속되지 않으며**, Next·Nuxt·Vite 등과 함께 쓰는 패턴이 매우 흔하다. 프로덕션 빌드에서 미사용 CSS 제거([Tailwind 문서](https://tailwindcss.com/) 기준)로 번들을 줄이는 전제를 둔다.

### CSS + 선택적 JS 컴포넌트

- **Bootstrap**: 그리드·컴포넌트· Sass 변수·선택적 JS 플러그인. **마크업 중심·MPA**에 잘 맞는다. React/Vue에서는 클래스만 쓰거나 [공식 가이드에 안내된 번들/어댑터](https://getbootstrap.com/)를 쓰며, 이미 해당 프레임워크의 **headless/네이티브 컴포넌트**와 역할이 겹치지 않게 정한다.

### 디자인 스펙 (구현체 아님)

- **Material Design 3 (M3)**: 토큰·컴포넌트 원칙·접근성 지침이 정리된 **가이드**다. 화면에 바로 import 하는 단일 npm 패키지가 아니라, **MUI·Android·Flutter 등 구현체**로 흩어져 반영한다. “M3 쓴다”는 말은 보통 **토큰/컴포넌트 규격을 따른다**는 의미로 쓴다.

### React 중심 컴포넌트 라이브러리

- **MUI**: [Material UI](https://mui.com/) 등으로 React 생태에서 널리 쓰인다. 테마·컴포넌트 API가 무겁지만 **엔터프라이즈 UI**에 강하다.
- **shadcn/ui**: Radix UI 등에 기반한 **복사 가능한 컴포넌트**와 Tailwind 스타일이 특징이다. **Next.js 문서와 궁합이 좋고**, 공식 사이트도 React·Next 중심이다.
- **Ant Design (React)**: 관리/데이터 밀도 높은 화면·테이블 중심 제품에 자주 쓰인다. Vue는 **[Ant Design Vue](https://antdv.com/)** 등 **별도 패키지**로 본다.

### CSS 위주·JS 최소

- **Bulma**: **CSS만**으로 그리드·폼·컴포넌트 클래스를 제공하는 편이라, JS 프레임워크와 **역할 분리**가 쉽다. “JS 의견이 거의 없는” 레이아웃 계층에 잘 맞는다.

### 레거시 머티리얼 스타일

- **Materialize**: Material Design 계열의 **구형 통합 프레임워크**에 가깝다. **신규 프로젝트**는 유지보수·생태·보안 패치 주기를 보고 **MUI / M3 토큰 + Tailwind / 플랫폼 공식 컴포넌트** 등으로 **대체 검토**하는 편이 안전하다.

## 프레임워크 적합성 매트릭스

행: 스택 / 열: **HTML(일반)** · **React** · **Vue** · **Next.js** · **Nuxt**

|  | HTML | React | Vue | Next.js | Nuxt |
|---|------|-------|-----|---------|------|
| **Tailwind CSS** | 권장 | 권장 | 권장 | 권장 | 권장 |
| **Bootstrap** | 권장 | 가능 | 가능 | 가능 | 가능 |
| **Material Design 3** | 참고(스펙) | 참고(스펙) | 참고(스펙) | 참고(스펙) | 참고(스펙) |
| **MUI** | 비권장 | 권장 | 비권장(React 전용) | 권장 | 비권장 · React 아님 |
| **shadcn/ui** | 비권장 | 권장 | 별도 생태계 | 권장(본류) | 별도 검증 · 커뮤니티 포트 |
| **Ant Design** | 비권장 | 권장 | 별도 · Ant Design Vue | 권장 | 별도 · Vue 패키지 |
| **Bulma** | 권장 | 가능 | 가능 | 가능 | 가능 |
| **Materialize** | 가능 · 신규 비권장 | 가능 · 신규 비권장 | 가능 · 신규 비권장 | 가능 · 신규 비권장 | 가능 · 신규 비권장 |

**표기 설명**

- **권장**: 공식 문서·관례·통합 도구가 해당 조합에서 자연스럽다.
- **가능**: 기술적으로는 붙일 수 있으나, 래퍼·중복·번들 정책을 직접 설계해야 한다.
- **별도 생태계 / 별도 검증**: 이름이 비슷해도 **패키지·문서가 다름**이거나, 커뮤니티 포트라 **장기 지원을 별도 확인**해야 한다.
- **비권장**: 라이브러리가 타깃 플랫폼이 아니거나, 신규 도입 시 리스크가 큰 편이다.
- **M3 행**: 어디서든 “디자인 규격 참고”이지, HTML/React 열에 패키지를 깔는 의미가 아니다.

## 선택 가이드 (의사결정)

1. **마크업 위주·빠른 프로토타입 (MPA·정적 HTML)**  
   Bootstrap 또는 Bulma + 필요 시 소량 JS.

2. **React·Next에서 디자인 시스템을 빠르게 통일**  
   - 토큰·컴포넌트 일괄 제공: **MUI** 또는 **Ant Design**.  
   - 세밀한 커스텀·소유권(코드가 내 레포에 있음): **Tailwind + shadcn/ui**.

3. **Vue·Nuxt**  
   **Tailwind + [Nuxt UI](https://ui.nuxt.com/)** 또는 [Vue](https://vuejs.org/) 생태의 공식/Vue 전용 키트를 우선 검토. shadcn은 **React 본류**이므로 Nuxt에서는 **포트·대안 문서를 따로 읽는다**. Ant는 **Ant Design Vue** 등으로 분기.

4. **“Material 룩”이지만 스펙만 맞추고 싶다**  
   M3 문서로 토큰·모션·접근성을 맞추고, 구현은 MUI·플랫폼 컴포넌트·자체 컴포넌트 중 선택.

5. **Electron·CBT 뷰어 등 임베디드 웹뷰**  
   번들 크기·오프라인·성능 제약이 크면, **유틸리티 CSS + 얇은 컴포넌트** 조합(Bulma만, 또는 Tailwind+소수 컴포넌트)을 후보에 둔다.

## 본 레포 기술 스택과의 연결

[tech-stack.md](tech-stack.md)는 **React + TypeScript + Next.js** 전제다. CBT SaaS 웹 UI 후보로는 현실적인 조합이 예를 들어 다음과 같다.

- **Next + Tailwind + shadcn/ui**: 랜딩·내부 툴·대시보드까지 일관된 커스텀 UI.  
- **Next + MUI 또는 Ant Design**: 관리 화면·폼·테이블 비중이 클 때 시간 절약.

Electron 셸 안의 같은 React 트리에서는 위 선택을 그대로 이어갈 수 있으나, **번들 크기**와 **오프라인 리소스**만 별도 점검한다.

## 목차

1. [목적](#목적)  
2. [공식 링크](#공식-링크)  
3. [유형 분류](#유형-분류)  
4. [프레임워크 적합성 매트릭스](#프레임워크-적합성-매트릭스)  
5. [선택 가이드](#선택-가이드-의사결정)  
6. [본 레포 기술 스택과의 연결](#본-레포-기술-스택과의-연결)
