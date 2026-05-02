import { ContactForm } from "@/components/ContactForm";

const GITHUB = "https://github.com/choijinwon/k-design";

function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "your-email@example.com";
}

const nav = [
  { href: "#positioning", label: "포지션" },
  { href: "#method", label: "방식" },
  { href: "#services", label: "서비스" },
  { href: "#pricing", label: "가격" },
  { href: "#contact", label: "문의" },
];

export default function Home() {
  const contactEmail = getContactEmail();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#" className="text-lg font-semibold tracking-tight">
            K-Design <span className="text-[var(--accent)]">Studio</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] sm:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[#041016] transition hover:brightness-110"
          >
            프로젝트 문의
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
            Harness Engineering · Next.js · Electron
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            1인 개발자와 AI 에이전트 팀이{" "}
            <span className="text-[var(--accent)]">5인 팀 이상</span>의 속도로
            만듭니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            바이브코딩과 정해진 오케스트레이션으로 MVP·CBT·엔터프라이즈 UI를
            납품합니다. 프리랜서보다 안정적으로, 대형 에이전시보다 빠르게.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-[#041016] transition hover:brightness-110"
            >
              견적 · 미팅 요청
            </a>
            <a
              href="#pricing"
              className="rounded-lg border border-[var(--border)] px-6 py-3 font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
            >
              패키지 보기
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-4 py-3 text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              GitHub
            </a>
          </div>
        </section>

        <section
          id="positioning"
          className="border-t border-[var(--border)] bg-[var(--card)]/40 py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">왜 우리인가</h2>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              프로젝트 설계에 정리해 둔 포지셔닝을 그대로 전합니다.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "일반 프리랜서",
                  items: ["단가는 낮을 수 있음", "품질 편차 · 1인 한계"],
                  tone: "muted" as const,
                },
                {
                  title: "대형 에이전시",
                  items: ["단가 높고 느린 경우 많음", "커뮤니케이션 오버헤드"],
                  tone: "muted" as const,
                },
                {
                  title: "K-Design Studio",
                  items: [
                    "중~고 단가 · 빠른 납기",
                    "AI 에이전트 팀 + 검증 루프",
                  ],
                  tone: "accent" as const,
                },
              ].map((col) => (
                <div
                  key={col.title}
                  className={`rounded-2xl border p-6 ${
                    col.tone === "accent"
                      ? "border-[var(--accent)]/40 bg-[var(--background)] shadow-[0_0_0_1px_rgba(34,211,238,0.12)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  }`}
                >
                  <h3
                    className={
                      col.tone === "accent"
                        ? "font-semibold text-[var(--accent)]"
                        : "font-semibold text-[var(--foreground)]"
                    }
                  >
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                    {col.items.map((line) => (
                      <li key={line}>· {line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">운용 방식</h2>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              <a
                href="https://github.com/revfactory/harness"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                revfactory/harness
              </a>{" "}
              레퍼런스에 맞춘 에이전트 패턴 — 팬아웃/팬인, 생성-검증, 감독자 모드를
              업무에 매핑합니다.
            </p>
            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 font-mono text-sm leading-relaxed text-[var(--muted)]">
              <pre className="whitespace-pre text-[var(--foreground)]/90">
{`                [오케스트레이터 · 당신과 나]
                          |
          +---------------+---------------+
          v               v               v
   [분석]            [풀스택 빌드]      [콘텐츠·마케]
          +---------------+---------------+
                          v
                  [수익 · 품질 최적화]`}
              </pre>
              <p className="mt-6 text-[var(--muted)]">
                산출물은 스킬·체크리스트로 고정해, 같은 품질을 반복 납품할 수
                있게 합니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="border-t border-[var(--border)] bg-[var(--card)]/40 py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">서비스</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <article className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  제품 · SaaS
                </span>
                <h3 className="mt-2 text-xl font-bold">CBT 자동생성 SaaS</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  교안 업로드 → 학습목표·시나리오·문항 초안 → SCORM · Electron
                  등 패키지. 망분리·오프라인 요구를 전제로 설계합니다.
                </p>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  문의 시 로드맵 · 파일럿 조건 협의
                </p>
              </article>
              <article className="flex flex-col rounded-2xl border border-[var(--accent)]/30 bg-[var(--background)] p-6 ring-1 ring-[var(--accent)]/15">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  에이전시 · 현금흐름
                </span>
                <h3 className="mt-2 text-xl font-bold">바이브코딩 에이전시</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  MVP 스프린트, Next·React 풀스택, Electron 오프라인 앱. Harness
                  기반으로 리뷰·테스트 루프를 포함합니다.
                </p>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  2주 MVP 패키지부터
                </p>
              </article>
              <article className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  교육
                </span>
                <h3 className="mt-2 text-xl font-bold">강의 · 컨설팅</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  Claude / Cursor / Harness로 &quot;혼자 팀&quot; 만드는 방법,
                  엔터프라이즈 CBT 제작 노하우. 커뮤니티·1:1 가능.
                </p>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  일정 · 형태는 협의
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">가격 안내</h2>
            <p className="mt-2 text-[var(--muted)]">
              VAT·범위에 따라 달라질 수 있습니다. 아래는 설계 기준 표시 가격입니다.
            </p>

            <h3 className="mt-12 text-lg font-semibold text-[var(--accent)]">
              에이전시 패키지
            </h3>
            <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-[var(--card)] text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">패키지</th>
                    <th className="px-4 py-3 font-medium">기간</th>
                    <th className="px-4 py-3 font-medium">가격(원)</th>
                    <th className="px-4 py-3 font-medium">비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="px-4 py-3 font-medium">MVP Sprint</td>
                    <td className="px-4 py-3">2주</td>
                    <td className="px-4 py-3">3,500,000</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      랜딩 + 핵심 기능 1
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">앱 개발</td>
                    <td className="px-4 py-3">4~6주</td>
                    <td className="px-4 py-3">7,000,000 ~ 12,000,000</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      React / Next 풀스택
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Electron 앱</td>
                    <td className="px-4 py-3">협의</td>
                    <td className="px-4 py-3">10,000,000 ~</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      오프라인 엔터프라이즈
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-12 text-lg font-semibold text-[var(--accent)]">
              CBT SaaS (구독 · 구축)
            </h3>
            <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-[var(--card)] text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium">가격(원)</th>
                    <th className="px-4 py-3 font-medium">포함</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="px-4 py-3 font-medium">Starter</td>
                    <td className="px-4 py-3">월 490,000</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      콘텐츠 5개/월, 클라우드
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Professional</td>
                    <td className="px-4 py-3">월 1,490,000</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      무제한, 온프레미스 옵션
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Enterprise</td>
                    <td className="px-4 py-3">연 12,000,000+</td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      전용 서버, 커스텀 AI
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]">
              맞춤 구축: 프로젝트당 약 5,000,000 ~ 20,000,000원 부터 협의.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-[var(--border)] bg-[var(--card)]/40 py-20"
        >
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">프로젝트 문의</h2>
            <p className="mx-auto mt-2 max-w-xl text-[var(--muted)]">
              폼을 제출하면 메일 앱이 열립니다.{" "}
              <code className="rounded bg-[var(--background)] px-2 py-0.5 text-[var(--accent)]">
                NEXT_PUBLIC_CONTACT_EMAIL
              </code>{" "}
              로 실제 연락처를 설정하세요.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              현재 표시: <strong>{contactEmail}</strong>
            </p>
            <div className="mt-10">
              <ContactForm email={contactEmail} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-10 text-center text-sm text-[var(--muted)]">
        <p>
          <a
            href={GITHUB}
            className="underline-offset-4 hover:text-[var(--foreground)] hover:underline"
          >
            choijinwon/k-design
          </a>
          · 설계 문서는 저장소의{" "}
          <code className="text-[var(--accent)]">monetization/</code> 참고
        </p>
        <p className="mt-2">© {new Date().getFullYear()} K-Design Studio</p>
      </footer>
    </div>
  );
}
