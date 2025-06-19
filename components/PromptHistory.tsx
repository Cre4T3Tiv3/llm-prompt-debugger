"use client";

import { Card } from "@/components/ui/card";
import { Download, X } from "lucide-react";
import { useState, useEffect } from "react";

const COMMON_TAGS = [
  "code",
  "refactor",
  "summarization",
  "debug",
  "tone:funny",
  "tone:professional",
  "tone:casual",
  "tone:neutral",
  "technical",
  "social",
  "marketing",
  "LLM",
  "simulation",
  "agent",
  "workflow",
  "contextual",
  "few-shot",
  "zero-shot",
  "retrieval",
  "embedding",
  "vectorstore",
  "langchain",
  "crewai",
  "openai",
  "claude",
  "llama3",
  "prompt-injection",
  "guardrails",
  "evaluation",
  "telemetry",
  "json",
  "api",
  "finetuning",
  "ollama",
];

const TAG_COLOR_MAP: Record<string, string> = {
  code: "bg-indigo-600",
  refactor: "bg-blue-600",
  debug: "bg-rose-600",
  summarization: "bg-amber-600",
  technical: "bg-green-700",
  LLM: "bg-purple-700",
  marketing: "bg-pink-600",
  simulation: "bg-teal-600",
  "tone:funny": "bg-yellow-500",
  "tone:casual": "bg-orange-500",
  "tone:professional": "bg-cyan-700",
  "tone:neutral": "bg-gray-500",
  social: "bg-fuchsia-700",
  embedding: "bg-emerald-700",
  evaluation: "bg-blue-700",
  "prompt-injection": "bg-red-700",
  telemetry: "bg-sky-600",
  langchain: "bg-violet-700",
  crewai: "bg-purple-800",
  openai: "bg-gray-700",
  claude: "bg-yellow-600",
  llama3: "bg-pink-500",
  agent: "bg-lime-700",
  workflow: "bg-slate-600",
};

type PromptEntry = {
  text: string;
  model: string;
  timestamp: string;
  tags?: string[];
  response?: string;
};

type Props = {
  prompts: PromptEntry[];
  onSelect: (text: string) => void;
  onDelete: (index: number) => void;
  onTagChange: (index: number, tags: string[]) => void;
  onExport: () => void;
  onExportMarkdown: () => void;
};

export function PromptHistory({
  prompts,
  onSelect,
  onDelete,
  onTagChange,
  onExport,
  onExportMarkdown,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [focusedPrompt, setFocusedPrompt] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  if (prompts.length === 0) return null;

  const grouped = prompts.reduce<Record<string, PromptEntry[]>>((acc, p) => {
    acc[p.model] = acc[p.model] || [];
    acc[p.model].push(p);
    return acc;
  }, {});

  const handleAddTag = (index: number, tag: string) => {
    if (!tag.trim()) return;
    const trimmed = tag.trim();
    const existing = prompts[index].tags || [];
    if (existing.length >= 5) {
      setToastMessage("⚠️ You can only add up to 5 tags per prompt.");
      return;
    }
    if (!existing.includes(trimmed)) {
      onTagChange(index, [...existing, trimmed]);
    }
    setInputValue("");
  };

  const handleRemoveTag = (promptIndex: number, tagToRemove: string) => {
    const updatedTags = (prompts[promptIndex].tags || []).filter((t) => t !== tagToRemove);
    onTagChange(promptIndex, updatedTags);
  };

  return (
    <Card className="bg-zinc-900 border-zinc-700 p-4 space-y-4">
      {toastMessage && (
        <div className="mb-3 text-sm text-yellow-300 bg-yellow-900/40 border border-yellow-800 rounded px-3 py-2">
          {toastMessage}
        </div>
      )}

      <div className="flex items-center justify-between mb-2 gap-2">
        <h2 className="font-semibold text-lg">Prompt History</h2>
        <div className="flex gap-2 text-xs text-zinc-400">
          <button
            onClick={onExport}
            className="hover:text-white underline inline-flex items-center gap-1"
            title="Download all prompts as JSON"
          >
            <Download className="w-4 h-4" /> JSON
          </button>
          <button
            onClick={onExportMarkdown}
            className="hover:text-white underline inline-flex items-center gap-1"
            title="Download all prompts as Markdown"
          >
            <Download className="w-4 h-4" /> MD
          </button>
        </div>
      </div>

      {Object.entries(grouped).map(([model, entries]) => (
        <div key={model}>
          <h3 className="text-sm font-medium text-zinc-300 mb-1">{model}</h3>
          <ul className="text-sm text-zinc-400 space-y-2">
            {entries.map((entry) => {
              const globalIndex = prompts.indexOf(entry);
              const hasCustom = entry.tags?.some((tag) => !COMMON_TAGS.includes(tag));

              return (
                <li key={globalIndex} className="flex flex-col gap-1 border-b border-zinc-700 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <div
                      onClick={() => onSelect(entry.text)}
                      className="hover:text-white cursor-pointer flex-1"
                    >
                      "{entry.text}"
                    </div>
                    <button
                      onClick={() => onDelete(globalIndex)}
                      className="text-red-400 text-xs hover:text-red-300"
                      title="Delete this prompt"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="text-xs text-zinc-500 flex items-center justify-between">
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    {entry.tags && entry.tags.length > 0 && (
                      <span className="text-zinc-400">🏷️ {entry.tags.length}/5 tags</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {(entry.tags || []).map((tag) => {
                      const tagColor = TAG_COLOR_MAP[tag] || "bg-zinc-700";
                      const isCustom = !COMMON_TAGS.includes(tag);
                      return (
                        <span
                          key={tag}
                          className={`${tagColor} text-white text-xs px-2 py-1 rounded-full inline-flex items-center`}
                        >
                          {tag}
                          {isCustom && (
                            <span
                              title="This is a custom tag."
                              className="ml-1 text-[10px] bg-zinc-800 px-1 py-0.5 rounded text-yellow-300"
                            >
                              ✨
                            </span>
                          )}
                          <button
                            onClick={() => handleRemoveTag(globalIndex, tag)}
                            className="ml-1 text-white hover:text-zinc-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {hasCustom && (
                    <div className="text-xs italic text-zinc-400 mt-1">
                      ✨ Custom tags are supported — use them freely to organize your workflow.
                    </div>
                  )}

                  <input
                    type="text"
                    list="common-tags"
                    value={focusedPrompt === globalIndex ? inputValue : ""}
                    onFocus={() => setFocusedPrompt(globalIndex)}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag(globalIndex, inputValue);
                      }
                    }}
                    placeholder="Add a tag"
                    className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded outline-none border border-zinc-700 focus:border-white"
                  />
                  <datalist id="common-tags">
                    {COMMON_TAGS.filter((t) => t.includes(inputValue.toLowerCase())).map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>

                  {!entry.tags?.length && (
                    <div className="mt-1 flex flex-wrap gap-1 text-xs">
                      {COMMON_TAGS.slice(0, 6).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleAddTag(globalIndex, tag)}
                          className="bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-1 rounded transition"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </Card>
  );
}
