"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/poc", label: "모음" },
  { href: "/poc/design", label: "디자인" },
  { href: "/poc/cbt", label: "교안 → CBT" },
  { href: "/poc/pricing", label: "가격 시뮬" },
  { href: "/poc/patterns", label: "패턴 매칭" },
  { href: "/poc/sprint", label: "2주 스프린트" },
];

export function PocSubnav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--card)]/30">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-4 py-3 sm:px-6">
        <span className="self-center pr-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          POC
        </span>
        {links.map(({ href, label }) => {
          const active =
            href === "/poc" ? pathname === "/poc" : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                active
                  ? "bg-[var(--accent)]/20 font-semibold text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--border)]/50 hover:text-[var(--foreground)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
