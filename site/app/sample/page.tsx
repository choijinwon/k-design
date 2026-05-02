import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SampleMarkdown } from "@/components/SampleMarkdown";

const GITHUB_SAMPLE =
  "https://github.com/choijinwon/k-design/blob/main/monetization/samples/harness-design-sample.md";

export const metadata: Metadata = {
  title: "Harness 설계 브리프 샘플 | K-Design Studio",
  description:
    "Harness Engineering 오케스트레이션·에이전트 팀·Phase·TaskCreate 설계 브리프 예시. 복사해 프로젝트에 적용할 수 있습니다.",
};

export default function SamplePage() {
  const file = path.join(process.cwd(), "content", "harness-design-sample.md");
  const markdown = fs.readFileSync(file, "utf-8");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Design sample
        </p>
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
          Harness Engineering 적용 설계 문서 예시
        </h1>
        <div className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--card)]/50 p-4 text-sm leading-relaxed text-[var(--muted)]">
          웹에 보이는 본문은 저장소{" "}
          <code className="text-[var(--accent)]">site/content/harness-design-sample.md</code>{" "}
          입니다. 원본 마크다운은{" "}
          <a
            href={GITHUB_SAMPLE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            monetization/samples/
          </a>
          와 동기화해 두었습니다. 수정 시 두 파일을 맞춰 주세요.
        </div>
        <SampleMarkdown content={markdown} />
        <div className="mt-16 border-t border-[var(--border)] pt-10 text-center">
          <Link
            href="/"
            className="inline-flex rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40"
          >
            ← 메인으로
          </Link>
        </div>
      </main>
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        <p>© {new Date().getFullYear()} K-Design Studio · Harness Engineering 샘플</p>
      </footer>
    </div>
  );
}
