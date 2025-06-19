import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...js.configs.recommended.languageOptions?.globals,
        window: true,
        document: true,
        navigator: true,
        localStorage: true,
        setTimeout: true,
        clearTimeout: true,
        alert: true,
        fetch: true,
        console: true,
        process: true,
        module: true,
        require: true,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
        localStorage: true,
        setTimeout: true,
        clearTimeout: true,
        alert: true,
        fetch: true,
        console: true,
        process: true,
        module: true,
        require: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  prettier,
  {
    ignores: ["node_modules", ".next", "public"],
  },
];
