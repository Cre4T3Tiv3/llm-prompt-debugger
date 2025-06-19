"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PromptHistory } from "@/components/PromptHistory";
import { useLLM } from "@/lib/useLLM";
import { ClipboardCopy } from "lucide-react";
import { validateModelAvailability } from "@/lib/availability";

const LOCAL_STORAGE_KEY = "llm-debugger-history";
const OUTPUT_KEY = "llm-debugger-last-output";
const VERSION = "v0.1.0-beta";

type PromptEntry = {
  text: string;
  model: string;
  timestamp: string;
  tags?: string[];
  response?: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [model, setModel] = useState("openai:gpt-4");
  const [history, setHistory] = useState<PromptEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const { streamPrompt, loading } = useLLM();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedOutput = localStorage.getItem(OUTPUT_KEY);

    if (stored) {
      const parsed = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        tags: entry.tags || (entry.tag ? [entry.tag] : []),
      }));
      setHistory(parsed);
    }

    if (storedOutput) {
      setOutput(storedOutput);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(OUTPUT_KEY, output);
    }
  }, [output, hydrated]);

  const handleRun = async () => {
    if (!prompt.trim()) {
      setErrorMessage("⚠️ Please enter a prompt before running.");
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    const available = await validateModelAvailability(model);
    if (!available) {
      setErrorMessage("⚠️ Model not available. Check your API key or configuration.");
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setErrorMessage("");
    setOutput("");
    let fullResponse = "";

    await streamPrompt(prompt, model, (chunk) => {
      fullResponse += chunk;
      setOutput((prev) => prev + chunk);
    });

    const entry: PromptEntry = {
      text: prompt,
      model,
      timestamp: new Date().toISOString(),
      response: fullResponse,
      tags: [],
    };

    setHistory((prev) => [entry, ...prev.slice(0, 49)]);
    setPrompt("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [prompt, model]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelectHistory = (text: string) => setPrompt(text);

  const handleDeletePrompt = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagUpdate = (index: number, tags: string[]) => {
    setHistory((prev) => {
      const updated = [...prev];
      updated[index].tags = tags;
      return updated;
    });
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleExportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt-history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const grouped = history.reduce<Record<string, PromptEntry[]>>((acc, p) => {
      acc[p.model] = acc[p.model] || [];
      acc[p.model].push(p);
      return acc;
    }, {});

    let md = `# 🧠 LLM Prompt Debugger History\n\n`;

    for (const [model, entries] of Object.entries(grouped)) {
      md += `## 🧩 Model: ${model}\n\n`;
      for (const entry of entries) {
        const ts = new Date(entry.timestamp).toLocaleString();
        md += `### Prompt\n- ⏱️ **${ts}**\n- 🏷️ **Tags**: ${(entry.tags || []).join(", ") || "_(none)_"}\n\n`;
        md += "```text\n" + entry.text + "\n```\n\n";
        md += "### Response\n";
        md += "```text\n" + (entry.response?.trim() || "[No response recorded]") + "\n```\n\n";
      }
    }

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt-history.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyOutput = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => alert("Output copied to clipboard!"))
      .catch(() => alert("Failed to copy output."));
  };

  return (
    <main className="px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-[length:300%] bg-clip-text text-transparent animate-gradient-slow gradient-text-fix">
            LLM Prompt Debugger
            <a
              href="https://github.com/Cre4T3Tiv3"
              className="ml-3 text-sm font-normal bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300 bg-[length:300%] bg-clip-text text-transparent animate-gradient-slow gradient-text-fix"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Cre4T3Tiv3
            </a>
          </h1>

          <select
            className="bg-zinc-800 border-zinc-700 text-white p-2 rounded"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <optgroup label="OpenAI">
              <option value="openai:gpt-4">GPT-4</option>
            </optgroup>
            <optgroup label="Anthropic">
              <option value="claude:claude-3-opus">Claude 3 Opus</option>
            </optgroup>
            <optgroup label="Ollama">
              <option value="ollama:llama3">LLaMA 3</option>
            </optgroup>
          </select>

          <div className="space-y-1">
            <Textarea
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              ref={textareaRef}
              className={shake ? "animate-shake" : ""}
            />
            {errorMessage && <div className="text-yellow-400 text-sm fade-in">{errorMessage}</div>}
          </div>

          <div className="space-y-2">
            <Button onClick={handleRun} disabled={loading} className="w-full sm:w-auto">
              {loading ? "Running..." : "▶ Run"}
            </Button>

            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-4 whitespace-pre-wrap">
                <div className="flex justify-between mb-2">
                  <button
                    onClick={handleCopyOutput}
                    title="Copy response to clipboard"
                    className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <ClipboardCopy className="w-4 h-4" /> Copy
                  </button>
                </div>
                {loading ? (
                  <div className="animate-pulse text-zinc-500">Running...</div>
                ) : (
                  output || ""
                )}
              </CardContent>
            </Card>
          </div>

          <footer className="mt-12 text-sm text-zinc-500 text-center">
            OSS tool maintained by{" "}
            <a
              href="https://github.com/Cre4T3Tiv3"
              className="bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-slow gradient-text-fix font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Cre4T3Tiv3
            </a>{" "}
            · <span className="text-zinc-400">{VERSION}</span>
          </footer>
        </div>

        <aside className="w-full lg:w-[400px] prompt-history-sticky">
          <PromptHistory
            prompts={history}
            onSelect={handleSelectHistory}
            onDelete={handleDeletePrompt}
            onTagChange={handleTagUpdate}
            onExport={handleExportHistory}
            onExportMarkdown={handleExportMarkdown}
          />
        </aside>
      </div>
    </main>
  );
}
