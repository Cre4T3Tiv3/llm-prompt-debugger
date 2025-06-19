type PromptEntry = {
  prompt: string;
  response: string;
  model: string;
  timestamp: string;
  tags?: string[];
};

export function formatPromptMarkdown(entries: PromptEntry[] | PromptEntry): string {
  const list = Array.isArray(entries) ? entries : [entries];

  return (
    `# 🧠 LLM Prompt Debugger History\n\n` +
    list
      .map(({ prompt, response, model, timestamp, tags }) => {
        const date = new Date(timestamp).toLocaleString();
        const tagLine = tags?.length ? `- 🏷️ **Tags**: ${tags.join(", ")}\n` : "";

        return `## 🧩 Model: ${model}

### Prompt
- ⏱️ **${date}**
${tagLine}
\`\`\`text
${prompt}
\`\`\`

### Response
\`\`\`text
${response?.trim() || "[No response recorded]"}
\`\`\`
`;
      })
      .join("\n")
  );
}
