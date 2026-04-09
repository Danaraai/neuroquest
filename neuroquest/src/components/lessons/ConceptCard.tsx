"use client";

import type { ConceptBlock } from "@/data/types";
import { cn } from "@/lib/utils";

interface ConceptCardProps {
  blocks: ConceptBlock[];
}

export function ConceptCard({ blocks }: ConceptCardProps) {
  return (
    <div className="space-y-4 animate-slide-up">
      {blocks.map((block, i) => {
        if (block.type === "highlight") {
          return (
            <div
              key={i}
              className="rounded-xl px-4 py-3 border-l-4"
              style={{
                background: "rgba(88, 204, 2, 0.08)",
                borderLeftColor: "#58CC02",
              }}
            >
              <p
                className="text-sm font-semibold text-white leading-relaxed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {block.content}
              </p>
            </div>
          );
        }

        if (block.type === "code") {
          return (
            <div key={i} className="rounded-xl overflow-hidden">
              <div
                className="px-3 py-1.5 flex items-center gap-2"
                style={{ background: "#1A1B2E" }}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-[10px] text-[#6B7094] font-mono">python</span>
              </div>
              <pre
                className="px-4 py-3 overflow-x-auto text-sm leading-relaxed"
                style={{
                  background: "#0D0E1A",
                  fontFamily: "var(--font-code)",
                  color: "#E0E0E0",
                }}
              >
                <code dangerouslySetInnerHTML={{ __html: formatCode(block.content) }} />
              </pre>
              {block.caption && (
                <div
                  className="px-4 py-2"
                  style={{ background: "#1A1B2E", borderTop: "1px solid #3A3D5C" }}
                >
                  <p className="text-xs text-[#AFAFAF] italic">{block.caption}</p>
                </div>
              )}
            </div>
          );
        }

        if (block.type === "formula") {
          return (
            <div
              key={i}
              className="rounded-xl px-4 py-4 text-center"
              style={{ background: "#0D0E1A", border: "1px solid #3A3D5C" }}
            >
              <p
                className="text-lg font-bold text-[#1CB0F6]"
                style={{ fontFamily: "var(--font-code)" }}
              >
                {block.content}
              </p>
              {block.caption && (
                <p className="text-xs text-[#AFAFAF] mt-2 italic">{block.caption}</p>
              )}
            </div>
          );
        }

        // Default: text block (supports **bold** and inline code)
        return (
          <div key={i}>
            <p
              className="text-[15px] text-white leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
            />
            {block.caption && (
              <p className="text-xs text-[#AFAFAF] mt-1 italic">{block.caption}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Simple markdown-like rendering for concept text
function renderMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-[#0D0E1A] text-[#58CC02] px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>')
    // Code blocks embedded in text
    .replace(/```python\n([\s\S]*?)```/g, (_, code) =>
      `<pre class="mt-2 p-3 rounded-xl bg-[#0D0E1A] text-[#E0E0E0] text-sm font-mono overflow-x-auto">${code.trimEnd()}</pre>`
    )
    // Newlines to breaks
    .replace(/\n/g, "<br/>");
}

function formatCode(content: string): string {
  // Tokenize first to avoid regex matches inside already-generated span attributes.
  // We collect tokens in order, then join them.
  const KEYWORDS = /\b(def|return|for|in|if|else|elif|import|from|as|True|False|None|and|or|not|pass)\b/g;
  const BUILTINS = /\b(print|len|range|append|type|str|int|float|bool|list|dict|set)\b/g;
  const NUMBERS  = /\b(\d+\.?\d*)\b/g;

  // Process one line at a time so # comments don't bleed across lines
  return content
    .split("\n")
    .map((line) => {
      // Find the first # that's not inside a string → split into code + comment
      let codePart = line;
      let commentPart = "";
      const commentMatch = line.match(/^([^"'#]*(?:(?:"[^"]*"|'[^']*')[^"'#]*)*)?(#.*)$/);
      if (commentMatch) {
        codePart = commentMatch[1] ?? "";
        commentPart = commentMatch[2] ?? "";
      }

      // Extract string literals from codePart, replace with placeholders
      const strings: string[] = [];
      const codeNoStrings = codePart.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (m) => {
        strings.push(m);
        return `\x00STR${strings.length - 1}\x00`;
      });

      // Apply keyword and builtin coloring to placeholder-safe code
      const highlighted = codeNoStrings
        .replace(KEYWORDS, '<span style="color:#C792EA">$1</span>')
        .replace(BUILTINS, '<span style="color:#82AAFF">$1</span>')
        .replace(NUMBERS,  '<span style="color:#F78C6C">$1</span>');

      // Restore strings with their color
      const restored = highlighted.replace(/\x00STR(\d+)\x00/g, (_, idx) =>
        `<span style="color:#C3E88D">${strings[Number(idx)]}</span>`
      );

      // Escape the comment and wrap it
      const commentHtml = commentPart
        ? `<span style="color:#6B7094">${commentPart.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
        : "";

      return restored + commentHtml;
    })
    .join("\n");
}
