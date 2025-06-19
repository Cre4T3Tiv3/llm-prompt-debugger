import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, model } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OpenAI API key", { status: 401 });
  }

  const modelId = model?.split(":")[1] || "gpt-4";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelId,
      stream: true,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // eslint-disable-next-line no-console
    console.error("OpenAI stream error:", response.status, errorText);
    return new Response("OpenAI stream failed", { status: response.status });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
