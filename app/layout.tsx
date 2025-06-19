import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LLM Prompt Debugger",
  description: "Visualize, test, and stream prompt interactions with OpenAI, Claude, and Ollama.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen antialiased">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
