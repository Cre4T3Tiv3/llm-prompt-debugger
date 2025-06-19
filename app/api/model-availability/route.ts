import { config } from "dotenv";
config();

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");

  if (!model) {
    return NextResponse.json(
      { available: false, error: "Missing model parameter" },
      { status: 400 }
    );
  }

  if (model.startsWith("openai:")) {
    return NextResponse.json({ available: !!process.env.OPENAI_API_KEY });
  }

  if (model.startsWith("claude:")) {
    return NextResponse.json({ available: !!process.env.CLAUDE_API_KEY });
  }

  if (model.startsWith("ollama:")) {
    try {
      const res = await fetch("http://localhost:11434/api/tags");
      return NextResponse.json({ available: res.ok });
    } catch {
      return NextResponse.json({ available: false });
    }
  }

  return NextResponse.json({ available: false, error: "Unknown model prefix" }, { status: 400 });
}
