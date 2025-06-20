<p align="center">
  <a href="https://github.com/Cre4T3Tiv3/llm-prompt-debugger" target="_blank">
    <img src="https://raw.githubusercontent.com/Cre4T3Tiv3/llm-prompt-debugger/main/docs/assets/llm_prompt_debugger_v0.1.0.gif" alt="LLM Prompt Debugger social preview" width="640"/>
  </a>
</p>

<p align="center"><em>
A developer-first UI for testing, tagging, and exporting LLM prompts. With built-in support for OpenAI, Claude, and Ollama.
</em></p>

<p align="center">
  <a href="https://github.com/Cre4T3Tiv3/llm-prompt-debugger/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/Cre4T3Tiv3/llm-prompt-debugger/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI">
  </a>
  <a href="https://nextjs.org" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  </a>
  <a href="https://github.com/Cre4T3Tiv3/llm-prompt-debugger/tags" target="_blank">
    <img src="https://img.shields.io/github/v/tag/Cre4T3Tiv3/llm-prompt-debugger" alt="Latest Tag">
  </a>
  <a href="https://github.com/Cre4T3Tiv3/llm-prompt-debugger/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/Cre4T3Tiv3/llm-prompt-debugger/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/Cre4T3Tiv3/llm-prompt-debugger?style=social" alt="GitHub Stars">
  </a>
  <a href="#contributing" target="_blank">
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg" alt="Contributions welcome">
  </a>
</p>

---

## About

**LLM Prompt Debugger** is a playground for evaluating and labeling LLM outputs.

Features:

- Prompt input + response viewing
- Model selection (OpenAI, Claude, Ollama)
- Tagging UI for prompt categorization
- JSON + Markdown export support
- Hotkey: `Cmd+Enter` or `Ctrl+Enter` to run

---

## Getting Started

> ℹ️ Requires `Node.js 18+` and [`pnpm`](https://pnpm.io)

If you don’t have `pnpm` installed:

```bash
npm install -g pnpm
```

Then clone and run the project locally:

```bash
git clone https://github.com/Cre4T3Tiv3/llm-prompt-debugger.git
cd llm-prompt-debugger
pnpm install
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## Lockfile Strategy

This project uses a `pnpm-lock.yaml` file to ensure **deterministic installs** across contributors and CI environments.

- Use `pnpm` to install dependencies and preserve the lockfile
- If you prefer `npm` or `yarn`, delete `pnpm-lock.yaml` before running `install`
- **Officially supported**: `pnpm` (fast, efficient, and CI-friendly)

---

## Tagging System

Apply semantic and stylistic tags to each prompt-response pair.

### Built-in tags:

- `code`, `debug`, `refactor`, `summarization`, `technical`, `marketing`, `LLM`, `simulation`
- `tone:professional`, `tone:casual`, `tone:funny`, `tone:neutral`

Custom tags are supported via input field.

---

## Exporting

Export history to:

- JSON for programmatic analysis
- Markdown for docs or knowledge sharing

> ℹ️ Markdown output is grouped by model and time-stamped

---

## Model Support

| Provider  | Example Model     | Usage Notes               |
| --------- | ----------------- | ------------------------- |
| OpenAI    | `gpt-4`, `gpt-4o` | Requires `OPENAI_API_KEY` |
| Anthropic | `claude-3-opus`   | Requires `CLAUDE_API_KEY` |
| Ollama    | `llama3`          | Local model support       |

Set these API keys in `.env.local`

---

## End-to-End Usage Guide

Looking to test prompts from start to finish?

See the full walkthrough for testing, tagging, exporting, and sharing prompts across supported LLM providers:

[E2E-GUIDE.md](./docs/E2E-GUIDE.md)

---

## Deployment

To deploy statically:

```bash
pnpm build
pnpm start
```

Supports Vercel, Netlify, Docker, and self-hosting.

---

## Contributing

PRs are welcome! Open an issue or discussion to propose ideas.

See [`CONTRIBUTOR.md`](./CONTRIBUTOR.md) for setup and guidelines.

---

## License

MIT © 2025 [@Cre4T3Tiv3](https://github.com/Cre4T3Tiv3)

---

## ⚠️ Known Installation Warnings

This project includes some development dependencies with upstream deprecation warnings (e.g., `eslint@8.x`, `node-domexception@2.0.2`). These are **non-breaking** and safe to ignore.

For detailed context and updates:

[KNOWN-WARNINGS.md](./docs/KNOWN-WARNINGS.md)

---
