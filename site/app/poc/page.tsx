import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { PocPlayground } from "@/components/PocPlayground";

export const metadata: Metadata = {
  title: "교안 → CBT 설계 POC | K-Design Studio",
  description:
    "교육 스크립트 텍스트로 학습목표·모듈·퀴즈 초안을 생성하는 데모. Claude API 또는 데모 모드.",
};

export default function PocPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <PocPlayground />
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          본 POC는{" "}
          <Link href="/" className="text-[var(--accent)] hover:underline">
            메인
          </Link>
          ·
          <Link href="/sample" className="text-[var(--accent)] hover:underline">
            Harness 샘플
          </Link>
          과 같은 스택으로 제공됩니다.
        </p>
        <p>© {new Date().getFullYear()} K-Design Studio</p>
      </footer>
    </div>
  );
}
