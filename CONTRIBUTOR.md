# Contributing to LLM Prompt Debugger

👋 Thanks for considering a contribution! **LLM Prompt Debugger** is a developer-first UI for testing, tagging, and exporting LLM prompts — with built-in support for OpenAI, Claude, and Ollama. This guide will help you get started.

---

## Project Structure

```
llm-prompt-debugger/
├── app/                        # Next.js app directory (App Router)
│   ├── api/                   # API route handlers
│   │   ├── model-availability/
│   │   │   └── route.ts       # Model availability validator
│   │   └── llm/
│   │       ├── route.ts       # Legacy/main LLM route
│   │       └── stream/
│   │           └── route.ts   # Streaming response handler
│   ├── globals.css            # Global TailwindCSS styles
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Main LLM debugger UI
│
├── components/                # Modular UI components
│   ├── PromptHistory.tsx      # Tagging, export, delete prompt history
│   └── ui/                    # Reusable UI primitives
│       ├── BulkExportBar.tsx
│       ├── ExportPrompt.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── textarea.tsx
│
├── lib/                       # Core logic + utilities
│   ├── availability.ts        # Shared model availability logic
│   ├── formatPromptMarkdown.ts# Markdown formatter for exports
│   ├── useLLM.ts              # Hook to stream LLM responses
│   └── utils.ts               # Generic helpers
│
├── docs/                      # Markdown documentation
│   ├── E2E-GUIDE.md           # Local setup & usage walkthrough
│   └── KNOWN-WARNINGS.md      # Documented dependency warnings
│
├── scripts/                   # Internal utility scripts
│   └── generate-warnings-doc.ts
│
├── .github/                   # GitHub-specific configuration
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.yml     # Template for bug reporting
│   └── workflows/
│       ├── ci.yml             # CI lint/build/test workflow
│       └── warnings.yml       # Detects and logs dependency warnings
│
├── .editorconfig              # Editor formatting baseline
├── .env                       # Local environment secrets (not committed)
├── .env.example               # Reference .env values
├── .gitignore                 # Ignored files and folders
├── .prettierrc                # Prettier configuration
├── eslint.config.mjs          # ESLint config module
├── LICENSE                    # MIT License
├── README.md                  # Overview, usage, badges
├── CONTRIBUTOR.md             # You are here 🛠️
├── next-env.d.ts              # Auto-generated env typings
├── package.json               # Project metadata + scripts
├── pnpm-lock.yaml             # pnpm lockfile
├── postcss.config.js          # PostCSS config for Tailwind
├── tailwind.config.ts         # TailwindCSS config
├── tsconfig.json              # TypeScript project config
├── tsconfig.tsbuildinfo       # TypeScript build cache
├── llm-prompt-debugger.zip    # Packaged release artifact (optional)
│
├── node_modules/              # Dependencies (auto-managed)
└── .next/                     # Next.js build output (auto-generated)
```

---

## Getting Started

```bash
git clone https://github.com/Cre4T3Tiv3/llm-prompt-debugger.git
cd llm-prompt-debugger
pnpm install
pnpm dev
```

> ℹ️ We officially support **pnpm** as the package manager of choice.
>
> This project uses a `pnpm-lock.yaml` lockfile to ensure consistent, reproducible dependency installs across environments.
>
> If you choose to use **npm** or **yarn** instead:
>
> - First, delete the existing `pnpm-lock.yaml` file.
> - Then run your package manager’s install (`npm install` or `yarn install`) to regenerate a compatible lockfile (`package-lock.json` or `yarn.lock`).
> - ✅ Be sure to **update `.gitignore`** to ignore lockfiles from unused package managers (e.g., add `package-lock.json` if using `yarn`, or vice versa).
>
> For best compatibility and clean CI, we recommend sticking with **pnpm** unless you have a specific reason not to.

---

## Local Dev Tips

- This is a **Next.js 14** project using the `app/` directory structure.
- TailwindCSS is used for styling.
- Components are modular and designed for reusability.

### Inspect or preload prompt data

You can seed `localStorage` for testing:

```js
localStorage.setItem(
  "llm-debugger-history",
  JSON.stringify([
    /* your data */
  ])
);
```

---

## Code Standards

- TypeScript with `"strict": true` enforced via `tsconfig.json`
- TailwindCSS utility-first styling — no custom classes unless justified
- Modular, composable React components (`.tsx`)
- **Before committing or opening a PR**, run:

```bash
pnpm lint           # ESLint (with Prettier integration)
pnpm format         # Prettier formatting
pnpm tsc --noEmit   # TypeScript type check
```

---

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

| Type        | Description                          |
| ----------- | ------------------------------------ |
| `feat:`     | New feature                          |
| `fix:`      | Bug fix                              |
| `docs:`     | Documentation only                   |
| `refactor:` | Code changes without behavior change |
| `style:`    | Formatting, missing semi-colons, etc |
| `chore:`    | Other changes (tooling, CI, etc)     |

---

## Supported LLMs

| Provider  | Model Name        | API Required        |
| --------- | ----------------- | ------------------- |
| OpenAI    | `gpt-4`, `gpt-4o` | ✅ `OPENAI_API_KEY` |
| Anthropic | `claude-3-opus`   | ✅ `CLAUDE_API_KEY` |
| Ollama    | `llama3`          | ❌ Local-only       |

---

## Feature Contributions

We welcome contributions for:

- 🔌 Model plugin support
- 🧠 Configurable UI for local LLMs
- 🧪 Prompt input validation tooling
- 📤 New export options (e.g., PDF, Notion)

Open a discussion if you're exploring a larger feature or integration.

---

## How to Contribute

1. Fork this repo
2. Create a new feature branch
3. Make your changes
4. Submit a pull request with clear, conventional commits

> 💬 Feel free to ask for early feedback before diving deep!

---

## License

MIT © 2025 [@Cre4T3Tiv3](https://github.com/Cre4T3Tiv3)

---
