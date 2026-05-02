import { NextResponse } from "next/server";
import type { PocOutline } from "@/lib/poc-types";

export const runtime = "nodejs";

const MAX_CHARS = 28_000;

function mockOutline(raw: string): PocOutline {
  const lines = raw
    .trim()
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 12);
  const head = lines[0]?.slice(0, 120) ?? "교육 스크립트";
  return {
    mode: "mock",
    learningObjectives: [
      `「${head.slice(0, 40)}${head.length > 40 ? "…" : ""}」의 목적을 설명할 수 있다.`,
      "문서에 나온 주요 절차·역할을 순서대로 구분할 수 있다.",
      "안전·준수·주의사항을 최소 2가지 이상 나열할 수 있다.",
    ],
    sections: (lines.length ? lines : ["(붙여넣은 내용이 비어 있습니다)"])
      .slice(0, 6)
      .map((line, i) => ({
        title: `모듈 ${i + 1}`,
        summary: line.slice(0, 280),
        interactionIdea:
          i % 2 === 0
            ? "핵심 용어 객관식 3문항"
            : "절차 순서 드래그·드롭 (데모)",
      })),
    quizIdeas: [
      "학습 목표 3개에 매핑되는 객관식 문항 초안",
      "오개념을 가른 시나리오형 1문항 (데모)",
    ],
    note: "ANTHROPIC_API_KEY가 없어 데모 구조만 생성했습니다. 키를 넣으면 Claude가 실제로 분석합니다.",
  };
}

async function liveOutline(raw: string): Promise<PocOutline> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return mockOutline(raw);

  const system = `You are an instructional designer for workplace CBT. Always respond with ONLY valid JSON, no markdown fence, no extra text. Keys: learningObjectives (array of 3-5 short strings, Korean), sections (array of objects with title, summary, interactionIdea in Korean), quizIdeas (array of 2-4 short strings, Korean).`;

  const user = `다음은 교육용 스크립트 초안이다. CBT 모듈 설계 관점에서 구조화해라.\n\n---\n${raw}\n---`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model:
        process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    content: Array<{ type: string; text?: string }>;
  };
  const text =
    data.content.find((b) => b.type === "text")?.text?.trim() ?? "";

  try {
    const parsed = JSON.parse(text) as Omit<PocOutline, "mode" | "note">;
    return {
      mode: "live",
      learningObjectives: parsed.learningObjectives ?? [],
      sections: (parsed.sections ?? []).map((s) => ({
        title: String(s.title ?? ""),
        summary: String(s.summary ?? ""),
        interactionIdea: s.interactionIdea
          ? String(s.interactionIdea)
          : undefined,
      })),
      quizIdeas: parsed.quizIdeas ?? [],
      note: "Claude 응답을 JSON으로 파싱했습니다. 필요 시 문구를 다듬으세요.",
    };
  } catch {
    return {
      mode: "live",
      learningObjectives: ["(JSON 파싱 실패 — 원문 확인 필요)"],
      sections: [{ title: "Raw", summary: text.slice(0, 2000), interactionIdea: undefined }],
      quizIdeas: [],
      note: "모델이 순수 JSON을 반환하지 않았습니다. 프롬프트나 모델을 조정하세요.",
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { text?: unknown };
    const text = typeof body.text === "string" ? body.text : "";
    if (text.length < 20) {
      return NextResponse.json(
        { error: "교안 텍스트를 20자 이상 붙여 넣어 주세요." },
        { status: 400 },
      );
    }
    if (text.length > MAX_CHARS) {
      return NextResponse.json(
        { error: `최대 ${MAX_CHARS.toLocaleString()}자까지 지원합니다.` },
        { status: 400 },
      );
    }

    const hasKey = Boolean(process.env.ANTHROPIC_API_KEY);
    const result = hasKey ? await liveOutline(text) : mockOutline(text);

    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
