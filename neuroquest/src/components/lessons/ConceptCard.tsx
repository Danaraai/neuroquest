"use client";

import type { ConceptBlock } from "@/data/types";
import { ExecutableCodeBlock } from "./ExecutableCodeBlock";

interface ConceptCardProps {
  blocks: ConceptBlock[];
}

export function ConceptCard({ blocks }: ConceptCardProps) {
  return (
    <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {blocks.map((block, i) => {
        if (block.type === "highlight") {
          return (
            <div
              key={i}
              style={{
                background: "#10201B",
                borderLeft: "3px solid #4F8F6A",
                borderRadius: "0 14px 14px 0",
                padding: "16px 20px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "#A8C8B0",
                  fontFamily: "var(--font-body)",
                }}
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
            <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div
                style={{ background: "#0D1117", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                </div>
                <span style={{ fontSize: 11, color: "#5A6090", fontFamily: "var(--font-code)" }}>python</span>
              </div>
              <pre
                style={{
                  background: "#080B14",
                  padding: "16px 18px",
                  margin: 0,
                  overflowX: "auto",
                  fontSize: 14,
                  lineHeight: 1.65,
                  fontFamily: "var(--font-code)",
                  color: "#C8D0E0",
                }}
              >
                <code dangerouslySetInnerHTML={{ __html: formatCode(block.content) }} />
              </pre>
              {block.caption && (
                <div style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 14px" }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#5A6090", fontStyle: "italic" }}>{block.caption}</p>
                </div>
              )}
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              <img
                src={block.content}
                alt={block.alt ?? ""}
                style={{ width: "100%", display: "block", objectFit: "contain", background: "#fff" }}
              />
              {block.caption && (
                <div style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 14px" }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#5A6090", fontStyle: "italic" }}>{block.caption}</p>
                </div>
              )}
            </div>
          );
        }

        if (block.type === "formula") {
          return (
            <div
              key={i}
              style={{
                background: "#0D1117",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "18px 24px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#6FB8D4", fontFamily: "var(--font-code)" }}>
                {block.content}
              </p>
              {block.caption && (
                <p style={{ margin: "8px 0 0", fontSize: 13, color: "#5A6090", fontStyle: "italic" }}>{block.caption}</p>
              )}
            </div>
          );
        }

        // Default: text block
        return (
          <div key={i}>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "#C8CAD8",
              }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
            />
            {block.caption && (
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "#5A6090", fontStyle: "italic" }}>{block.caption}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#D8D9E8;font-weight:650">$1</strong>')
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em style="color:#AEB2C8;font-style:italic">$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code style="background:rgba(111,175,122,0.12);color:#8FCC9A;padding:2px 7px;border-radius:5px;font-size:14px;font-family:var(--font-code)">$1</code>')
    // Code blocks
    .replace(/```python\n([\s\S]*?)```/g, (_, code) =>
      `<pre style="margin-top:12px;padding:14px 18px;border-radius:12px;background:#080B14;color:#C8D0E0;font-size:14px;font-family:var(--font-code);overflow-x:auto;line-height:1.65">${code.trimEnd()}</pre>`
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
        ? `<span style="color:#4A5060">${commentPart.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
        : "";

      return restored + commentHtml;
    })
    .join("\n");
}
