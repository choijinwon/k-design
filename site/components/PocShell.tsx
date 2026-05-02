import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PocSubnav } from "@/components/PocSubnav";

export function PocShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <PocSubnav />
      {children}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <Link href="/" className="text-[var(--accent)] hover:underline">
            메인
          </Link>
          {" · "}
          <Link href="/sample" className="text-[var(--accent)] hover:underline">
            Harness 샘플
          </Link>
        </p>
        <p>© {new Date().getFullYear()} K-Design Studio</p>
      </footer>
    </div>
  );
}
