import { useState } from "react";

export function useLLM() {
  const [loading, setLoading] = useState(false);

  const streamPrompt = async (
    prompt: string,
    model: string,
    onChunk: (chunk: string) => void
  ): Promise<void> => {
    setLoading(true);

    try {
      if (model.startsWith("openai:")) {
        const res = await fetch("/api/llm/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model }),
        });

        if (!res.body) throw new Error("No stream received");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.trim().startsWith("data:")) {
              const jsonStr = line.replace(/^data:\s*/, "").trim();

              if (jsonStr === "[DONE]") return;

              try {
                const parsed = JSON.parse(jsonStr);
                const token = parsed.choices?.[0]?.delta?.content;
                if (token) onChunk(token);
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error("Failed to parse OpenAI stream chunk:", jsonStr, e);
              }
            }
          }
        }
      } else {
        const res = await fetch("/api/llm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model }),
        });

        const data = await res.json();
        onChunk(data.output ?? "[No response received]");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("LLM Error:", err);
      onChunk("\n[Error occurred]");
    } finally {
      setLoading(false);
    }
  };

  return { streamPrompt, loading };
}
