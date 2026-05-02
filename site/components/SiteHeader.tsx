"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/#positioning", label: "포지션" },
  { href: "/#method", label: "방식" },
  { href: "/#services", label: "서비스" },
  { href: "/#pricing", label: "가격" },
  { href: "/sample", label: "Harness 샘플" },
  { href: "/poc", label: "CBT POC" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          K-Design <span className="text-[var(--accent)]">Studio</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-[var(--muted)] sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-[var(--foreground)] ${
                (item.href === "/sample" && pathname === "/sample") ||
                (item.href === "/poc" && pathname === "/poc")
                  ? "text-[var(--accent)]"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[#041016] transition hover:brightness-110"
        >
          프로젝트 문의
        </Link>
      </div>
    </header>
  );
}
