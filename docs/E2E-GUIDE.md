# End-to-End Guide: Using LLM Prompt Debugger

This guide walks you through how to set-up and use **LLM Prompt Debugger**.

---

## Prerequisites

Before getting started, ensure the following:

- Node.js 18 or higher
- `pnpm` installed (recommended)
- One or more of the following:
  - OpenAI API Key
  - Claude API Key
  - Local Ollama installation (for running `llama3`)

---

## 1. Installation

Clone the repo and install dependencies using `pnpm`:

```bash
git clone https://github.com/Cre4T3Tiv3/llm-prompt-debugger.git
cd llm-prompt-debugger
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Configure API Keys

Create a `.env.local` file in the project root and add your keys:

```env
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
```

> ℹ️ You can use either or both — or none if only using local models (via Ollama)

---

## 3. Choose a Model and Enter a Prompt

1. Select a model (OpenAI, Claude, or Ollama) using the dropdown
2. Type your prompt into the input field
3. Hit `Cmd+Enter` (Mac) or `Ctrl+Enter` (Windows/Linux) to run it

---

## 4. Tagging Your Prompt

Use the tagging interface below each response to label it:

- Built-in tags: `code`, `debug`, `refactor`, `summarization`, `LLM`, etc.
- Tone tags: `tone:professional`, `tone:casual`, etc.
- Add custom tags as needed

> Tags are saved with each entry for export and filtering

---

## 5. Working with Prompt History

All prompts are saved to `localStorage` in your browser under the key:

```js
llm-debugger-history
```

This allows you to:

- Scroll through past interactions
- Filter by model or tag
- Clear history from the UI or dev tools

---

## 6. Exporting Your Results

Click the **Export** button to download your prompt history:

- JSON: structured data for programmatic use
- Markdown: grouped by model, time-stamped for easy reading

---

## 7. Advanced Tips

### Simulate a Session

You can prefill history manually via browser console:

```js
localStorage.setItem(
  "llm-debugger-history",
  JSON.stringify([
    {
      prompt: "Summarize this code...",
      response: "...",
      model: "gpt-4o",
      tags: ["summarization", "LLM"],
    },
  ])
);
```

### Switching Models Quickly

Click the dropdown model selector to toggle between OpenAI, Claude, and local Ollama models.

### Changing Tone and Instruction Style

Try giving your prompt a tone direction (e.g., "make this funny" or "respond like a senior engineer").

---

## Done!

You’ve now got **LLM Prompt Debugger** up and running.

Use it to:

- Compare LLM responses
- Build and label prompt datasets
- Export outputs for benchmarking or documentation

> Contributions welcome — check out [`CONTRIBUTOR.md`](../CONTRIBUTOR.md) for more.

---

## License

MIT © 2025 [@Cre4T3Tiv3](https://github.com/Cre4T3Tiv3)

---
