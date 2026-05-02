"use client";

import { useCallback, useState } from "react";

type Props = {
  email: string;
};

export function ContactForm({ email }: Props) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sentHint, setSentHint] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const subject = encodeURIComponent(
        `[문의] ${company || "개인"} / ${name || "이름 미입력"}`,
      );
      const body = encodeURIComponent(
        `이름: ${name}\n회사/소속: ${company}\n\n${message}\n`,
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setSentHint(true);
    },
    [email, name, company, message],
  );

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-lg flex-col gap-4 text-left"
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[var(--muted)]">이름</span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)]"
          placeholder="홍길동"
          autoComplete="name"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[var(--muted)]">회사 · 소속 (선택)</span>
        <input
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)]"
          placeholder="(주)〇〇"
          autoComplete="organization"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-[var(--muted)]">문의 내용</span>
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="resize-y rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)]"
          placeholder="원하시는 패키지, 일정, 망분리·오프라인 요구 등을 적어 주세요."
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-[#041016] transition hover:brightness-110"
      >
        메일 앱으로 보내기
      </button>
      {sentHint ? (
        <p className="text-center text-sm text-[var(--muted)]">
          메일 앱이 열리지 않으면 <strong>{email}</strong> 로 직접 보내 주세요.
        </p>
      ) : null}
    </form>
  );
}
