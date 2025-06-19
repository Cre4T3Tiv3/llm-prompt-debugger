# ⚠️ Known Installation Warnings

This project uses several LLM provider SDKs and modern tooling dependencies that may include subdependencies or outdated packages triggering install-time warnings. This document tracks known issues, their sources, and whether they require intervention.

---

## Deprecated Subdependencies

### You may see warnings like:

```sh
 WARN  1 deprecated subdependencies found: node-domexception@2.0.2
```

### What causes this?

This deprecated subpackage is **not directly used** in your code. It is a transitive dependency from upstream packages such as:

- `formdata-node`
- `@anthropic-ai/sdk`
- `openai`

They persist because upstream maintainers have not yet updated or removed these references.

---

### Should I worry?

No — unless you are publishing a package or targeting environments with strict security scans, this **does not impact functionality**.

---

### `node-domexception@2.0.2`

```sh
 WARN  deprecated subdependency found: node-domexception@2.0.2
```

### What causes this?

This warning originates from the `formdata-node` package, which is a shared subdependency of:

- `@anthropic-ai/sdk`
- `openai`

`formdata-node@4.4.1` currently depends on `node-domexception@2.0.2`, which is marked deprecated.

---

### Should I worry?

No — this warning **does not affect functionality** or runtime stability. The deprecated package is still functional and used by upstream LLM SDKs.

---

### How can I silence this?

This is a known limitation from upstream package maintainers. Once `@anthropic-ai/sdk` or `openai` update their internal dependencies, this warning will go away automatically.

For now:

- You may **ignore this warning**
- You should **not override** or manually dedupe this subdependency unless you fully test compatibility

---

## Ignored Build Scripts (esbuild)

```sh
╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯
```

### What causes this?

`pnpm` is blocking post-install build scripts (like those from `esbuild`) for security reasons in your local environment.

---

### Should I worry?

No — this is only relevant if you are building native binaries or publishing. Since `esbuild` is used as a dependency for dev tooling, this **does not affect normal installs or runtime**.

You can approve it manually if needed:

```sh
pnpm approve-builds
```

---

## Last Verified

**June 18, 2025**

Confirmed safe and non-breaking under:

- `@anthropic-ai/sdk@0.6.8`
- `openai@4.104.0`
- `pnpm@10.12.1`

---

## License

MIT © 2025 [@Cre4T3Tiv3](https://github.com/Cre4T3Tiv3)

---
