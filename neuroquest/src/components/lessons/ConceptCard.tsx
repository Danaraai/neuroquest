"use client";

import type { ConceptBlock } from "@/data/types";
import { ExecutableCodeBlock } from "./ExecutableCodeBlock";

interface ConceptCardProps {
  blocks: ConceptBlock[];
}

export function ConceptCard({ blocks }: ConceptCardProps) {
  return (
    <div className="space-y-5 animate-slide-up">
      {blocks.map((block, i) => {
        if (block.type === "highlight") {
          return (
            <div
              key={i}
              className="rounded-xl px-4 py-3 border-l-4"
              style={{
                background: "rgba(88, 204, 2, 0.07)",
                borderLeftColor: "#58CC02",
              }}
            >
              <p
                className="text-sm font-semibold leading-relaxed m-0"
                style={{ color: "#D8E8D0", fontFamily: "var(--font-display)" }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
              />
            </div>
          );
        }

        if (block.type === "executable-code") {
          return (
            <ExecutableCodeBlock
              key={i}
              code={block.content}
              annotations={block.annotations}
              caption={block.caption}
            />
          );
        }

        if (block.type === "code") {
          return (
            <div key={i} className="rounded-xl overflow-hidden">
              <div
                className="px-3 py-1.5 flex items-center gap-2"
                style={{ background: "#0D0F1E" }}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-[10px] text-[#5A6090] font-mono">python</span>
              </div>
              <pre
                className="px-4 py-3 overflow-x-auto text-sm leading-relaxed"
                style={{
                  background: "#080B14",
                  fontFamily: "var(--font-code)",
                  color: "#C8D0E0",
                }}
              >
                <code dangerouslySetInnerHTML={{ __html: formatCode(block.content) }} />
              </pre>
              {block.caption && (
                <div
                  className="px-4 py-2"
                  style={{ background: "#0D0F1E", borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs italic m-0" style={{ color: "#6A70A0" }}>{block.caption}</p>
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
              style={{ background: "#080B14", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="text-lg font-bold m-0"
                style={{ color: "#1CB0F6", fontFamily: "var(--font-code)" }}
              >
                {block.content}
              </p>
              {block.caption && (
                <p className="text-xs italic mt-2 m-0" style={{ color: "#6A70A0" }}>{block.caption}</p>
              )}
            </div>
          );
        }

        // Default: text block
        return (
          <div key={i}>
            <p
              className="text-[15px] leading-[1.75] m-0"
              style={{ color: "#D0D4F0" }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
            />
            {block.caption && (
              <p className="text-xs mt-1 italic m-0" style={{ color: "#6A70A0" }}>{block.caption}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderMarkdown(text: string): string {
  return text
    // Bold (must come before italic)
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#E8E8FF;font-weight:700">$1</strong>')
    // Italic (single asterisk, not adjacent to another *)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em style="color:#C8CCE8;font-style:italic">$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code style="background:rgba(0,220,255,0.08);color:#00DCFF;padding:2px 6px;border-radius:4px;font-size:13px;font-family:var(--font-code)">$1</code>')
    // Code blocks
    .replace(/```python\n([\s\S]*?)```/g, (_, code) =>
      `<pre style="margin-top:8px;padding:12px;border-radius:12px;background:#080B14;color:#C8D0E0;font-size:13px;font-family:var(--font-code);overflow-x:auto">${code.trimEnd()}</pre>`
    )
    // Newlines
    .replace(/\n/g, "<br/>");
}

function formatCode(content: string): string {
  const KEYWORDS = /\b(def|return|for|in|if|else|elif|import|from|as|True|False|None|and|or|not|pass)\b/g;
  const BUILTINS = /\b(print|len|range|append|type|str|int|float|bool|list|dict|set)\b/g;
  const NUMBERS  = /\b(\d+\.?\d*)\b/g;

  return content
    .split("\n")
    .map((line) => {
      let codePart = line;
      let commentPart = "";
      const commentMatch = line.match(/^([^"'#]*(?:(?:"[^"]*"|'[^']*')[^"'#]*)*)?(#.*)$/);
      if (commentMatch) {
        codePart = commentMatch[1] ?? "";
        commentPart = commentMatch[2] ?? "";
      }

      const strings: string[] = [];
      const codeNoStrings = codePart.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (m) => {
        strings.push(m);
        return `\x00STR${strings.length - 1}\x00`;
      });

      const highlighted = codeNoStrings
        .replace(KEYWORDS, '<span style="color:#C792EA">$1</span>')
        .replace(BUILTINS, '<span style="color:#82AAFF">$1</span>')
        .replace(NUMBERS,  '<span style="color:#F78C6C">$1</span>');

      const restored = highlighted.replace(/\x00STR(\d+)\x00/g, (_, idx) =>
        `<span style="color:#C3E88D">${strings[Number(idx)]}</span>`
      );

      const commentHtml = commentPart
        ? `<span style="color:#5A6090">${commentPart.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
        : "";

      return restored + commentHtml;
    })
    .join("\n");
}
