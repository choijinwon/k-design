"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

type Props = {
  content: string;
};

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-12 border-b border-[var(--border)] pb-2 text-xl font-semibold text-[var(--foreground)] first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-semibold text-[var(--foreground)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-[var(--muted)]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-inside list-disc space-y-2 text-[var(--muted)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-inside list-decimal space-y-2 text-[var(--muted)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-6 border-l-4 border-[var(--accent)]/50 bg-[var(--card)]/60 py-2 pl-4 pr-2 text-[var(--muted)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-[var(--border)]" />,
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[28rem] text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--card)] text-[var(--foreground)]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2.5 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-[var(--border)] px-3 py-2.5 text-[var(--muted)]">
      {children}
    </td>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-[var(--card)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--accent)]"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[#050810] p-4 font-mono text-sm leading-relaxed text-[var(--foreground)]/90">
      {children}
    </pre>
  ),
};

export function SampleMarkdown({ content }: Props) {
  return (
    <article>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
