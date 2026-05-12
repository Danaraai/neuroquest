"use client";

import React from "react";
import type { ConceptBlock } from "@/data/types";
import { ExecutableCodeBlock } from "./ExecutableCodeBlock";

interface ConceptCardProps {
  blocks: ConceptBlock[];
}

export function ConceptCard({ blocks }: ConceptCardProps) {
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const next = blocks[i + 1];

    // Side-by-side: small image immediately followed by a text block
    if (block.type === "image" && block.size === "small" && next?.type === "text") {
      nodes.push(
        <div
          key={i}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            background: "#191C3B",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div style={{ flexShrink: 0, width: "44%", minWidth: 0 }}>
            <div
              style={{
                background: "#13162E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: 6,
              }}
            >
              <img
                src={block.content}
                alt={block.alt ?? ""}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "contain",
                  borderRadius: 6,
                  filter: "brightness(0.88) saturate(0.92)",
                }}
              />
            </div>
            {block.caption && (
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "#6A6F90", fontStyle: "italic", textAlign: "center" }}>
                {block.caption}
              </p>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{ margin: 0, fontSize: 15, lineHeight: 1.72, color: "#B8BBCF" }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(next.content) }}
            />
          </div>
        </div>
      );
      i += 2;
      continue;
    }

    nodes.push(<SingleBlock key={i} block={block} />);
    i++;
  }

  return (
    <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {nodes}
    </div>
  );
}

function SingleBlock({ block }: { block: ConceptBlock }) {
  if (block.type === "highlight") {
    return (
      <div
        style={{
          background: "#1C1F42",
          borderRadius: "0 14px 14px 0",
          padding: "18px 22px 18px 20px",
          borderTop: "1px solid rgba(124,130,248,0.12)",
          borderRight: "1px solid rgba(124,130,248,0.12)",
          borderBottom: "1px solid rgba(124,130,248,0.12)",
          borderLeft: "3px solid #7C82F8",
        }}
      >
        <p
          style={{ margin: 0, fontSize: 16, lineHeight: 1.72, color: "#BFC2D6", fontFamily: "var(--font-body)" }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
        />
      </div>
    );
  }

  if (block.type === "executable-code") {
    return (
      <ExecutableCodeBlock
        code={block.content}
        annotations={block.annotations}
        caption={block.caption}
      />
    );
  }

  if (block.type === "code") {
    return (
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ background: "#0D1117", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          </div>
          <span style={{ fontSize: 11, color: "#5A5F80", fontFamily: "var(--font-code)" }}>python</span>
        </div>
        <pre
          style={{
            background: "#080B14",
            padding: "16px 20px",
            margin: 0,
            overflowX: "auto",
            fontSize: 13.5,
            lineHeight: 1.7,
            fontFamily: "var(--font-code)",
            color: "#C8D0E0",
          }}
        >
          <code dangerouslySetInnerHTML={{ __html: formatCode(block.content) }} />
        </pre>
        {block.caption && (
          <div style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "8px 14px" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#5A5F80", fontStyle: "italic" }}>{block.caption}</p>
          </div>
        )}
      </div>
    );
  }

  if (block.type === "image") {
    // Full-width image (default)
    return (
      <div
        style={{
          background: "#13162E",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: 12,
        }}
      >
        <img
          src={block.content}
          alt={block.alt ?? ""}
          style={{
            width: "100%",
            display: "block",
            objectFit: "contain",
            borderRadius: 10,
            filter: "brightness(0.88) saturate(0.92)",
          }}
        />
        {block.caption && (
          <p style={{ margin: "10px 4px 2px", fontSize: 12, color: "#6A6F90", fontStyle: "italic", textAlign: "center" }}>
            {block.caption}
          </p>
        )}
      </div>
    );
  }

  if (block.type === "formula") {
    return (
      <div
        style={{
          background: "#1C1F42",
          border: "1px solid rgba(124,130,248,0.18)",
          borderRadius: 14,
          padding: "20px 28px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "#A5A9FA", fontFamily: "var(--font-code)" }}>
          {block.content}
        </p>
        {block.caption && (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6A6F90", fontStyle: "italic" }}>{block.caption}</p>
        )}
      </div>
    );
  }

  // Default: text block
  return (
    <div
      style={{
        background: "#191C3B",
        border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      <p
        style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: "#B8BBCF" }}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
      />
      {block.caption && (
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6A6F90", fontStyle: "italic" }}>{block.caption}</p>
      )}
    </div>
  );
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#EEEDF6;font-weight:700">$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em style="color:#9EA3BD;font-style:italic">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:rgba(124,130,248,0.13);color:#A5A9FA;padding:2px 7px;border-radius:5px;font-size:13px;font-family:var(--font-code)">$1</code>')
    .replace(/```python\n([\s\S]*?)```/g, (_, code) =>
      `<pre style="margin-top:12px;padding:14px 18px;border-radius:12px;background:#080B14;color:#C8D0E0;font-size:13px;font-family:var(--font-code);overflow-x:auto;line-height:1.65">${code.trimEnd()}</pre>`
    )
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
