import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPromptMarkdown } from "@/lib/formatPromptMarkdown";

interface ExportPromptProps {
  promptData: {
    prompt: string;
    response: string;
    model: string;
    timestamp: string;
    tags?: string[];
  };
  filenameJSON: string;
  filenameMD: string;
}

export const ExportPrompt = ({ promptData, filenameJSON, filenameMD }: ExportPromptProps) => {
  const download = (type: "json" | "md") => {
    const content =
      type === "json" ? JSON.stringify(promptData, null, 2) : formatPromptMarkdown(promptData);

    const blob = new Blob([content], {
      type: type === "json" ? "application/json" : "text/markdown",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = type === "json" ? filenameJSON : filenameMD;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 mt-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        onClick={() => download("md")}
        title="Export as Markdown"
      >
        <FileText className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={() => download("json")} title="Export as JSON">
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};
