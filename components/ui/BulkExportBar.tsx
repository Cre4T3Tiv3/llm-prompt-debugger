import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { formatPromptMarkdown } from "@/lib/formatPromptMarkdown";

interface BulkExportBarProps {
  prompts: {
    prompt: string;
    response: string;
    model: string;
    timestamp: string;
    tags?: string[];
  }[];
}

export const BulkExportBar = ({ prompts }: BulkExportBarProps) => {
  const download = (type: "json" | "md") => {
    const content =
      type === "json" ? JSON.stringify(prompts, null, 2) : formatPromptMarkdown(prompts);

    const blob = new Blob([content], {
      type: type === "json" ? "application/json" : "text/markdown",
    });

    const url = URL.createObjectURL(blob);
    const filename = `prompt-session-${Date.now()}.${type}`;
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 mb-4 justify-end">
      <Button variant="outline" onClick={() => download("md")}>
        <FileText className="mr-2 w-4 h-4" /> Export All as Markdown
      </Button>
      <Button variant="outline" onClick={() => download("json")}>
        <Download className="mr-2 w-4 h-4" /> Export All as JSON
      </Button>
    </div>
  );
};
