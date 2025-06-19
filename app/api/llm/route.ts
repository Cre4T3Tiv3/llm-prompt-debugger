import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt, model } = await req.json();

  try {
    if (model.startsWith("openai:")) {
      const modelId = model.split(":")[1];
      const completion = await openai.chat.completions.create({
        model: modelId,
        messages: [{ role: "user", content: prompt }],
      });

      return NextResponse.json({
        output: completion.choices[0]?.message?.content || "",
      });
    }

    if (model.startsWith("claude:")) {
      const claudeModelMap: Record<string, string> = {
        "claude:claude-3-opus": "claude-3-opus-20240229",
        "claude:claude-3-sonnet": "claude-3-sonnet-20240229",
        "claude:claude-3-haiku": "claude-3-haiku-20240307",
      };

      const claudeModel = claudeModelMap[model] || "claude-3-opus-20240229";

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: claudeModel,
          max_tokens: 1024,
          temperature: 0.7,
          system: "You are a helpful assistant.",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        // eslint-disable-next-line no-console
        console.error("Claude API error:", res.status, errText);
        return NextResponse.json({ output: "Claude API error." }, { status: res.status });
      }

      const data = await res.json();
      const content = Array.isArray(data.content)
        ? data.content.map((c: any) => c.text).join("\n")
        : "";

      return NextResponse.json({ output: content });
    }

    if (model.startsWith("ollama:")) {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model.split(":")[1],
          prompt,
          stream: false,
        }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);
        return NextResponse.json({ output: data.response || "" });
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.error("Ollama JSON parse error:", text);
        return NextResponse.json({ output: "Failed to parse Ollama response." }, { status: 500 });
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("LLM handler error:", err);
    return NextResponse.json({ output: "Internal server error." }, { status: 500 });
  }

  return NextResponse.json({ output: "Unsupported model" }, { status: 400 });
}
