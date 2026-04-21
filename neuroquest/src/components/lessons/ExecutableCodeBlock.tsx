"use client";

import { useState, useEffect } from "react";
import { usePyodide } from "@/components/coding/PyodideRunner";
import { Play, Copy, Check } from "lucide-react";

interface ExecutableCodeBlockProps {
  code: string;
  annotations?: { line: number; text: string }[]; // Line numbers with explanations
  caption?: string;
}

export function ExecutableCodeBlock({
  code,
  annotations = [],
  caption,
}: ExecutableCodeBlockProps) {
  const { ready, loading, load, run } = usePyodide();
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load Pyodide on mount
  useEffect(() => {
    load();
  }, [load]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError("");

    const result = await run(code);

    if (result.success) {
      setOutput(result.stdout);
      setError("");
    } else {
      setError(result.stderr);
      setOutput("");
    }

    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split code into lines for annotations
  const codeLines = code.split("\n");
  const annotationMap = new Map(annotations.map((a) => [a.line, a.text]));

  return (
    <div className="space-y-2">
      {/* Code with Annotations */}
      <div className="rounded-xl overflow-hidden">
        <div
          className="px-3 py-2 flex items-center gap-2 justify-between"
          style={{ background: "#1A1B2E" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-[10px] text-[#6B7094] font-mono">python</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-[#0D0E1A] rounded transition-colors text-[#6B7094] hover:text-white"
              title="Copy code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button
              onClick={handleRun}
              disabled={!ready || isRunning}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#58CC02] text-[#0D0E1A] text-xs font-semibold hover:bg-[#6FFF1F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={ready ? "Run code" : "Loading Python..."}
            >
              <Play size={14} />
              {isRunning ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        {/* Annotated Code */}
        <div
          className="px-4 py-3 overflow-x-auto text-sm leading-relaxed space-y-2"
          style={{
            background: "#0D0E1A",
            fontFamily: "var(--font-code)",
          }}
        >
          {codeLines.map((line, idx) => (
            <div key={idx}>
              {/* Code line */}
              <pre
                className="text-[#E0E0E0]"
                style={{
                  fontFamily: "var(--font-code)",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                <code
                  dangerouslySetInnerHTML={{
                    __html: formatCode(line),
                  }}
                />
              </pre>

              {/* Annotation for this line (if exists) */}
              {annotationMap.has(idx) && (
                <div
                  className="text-xs text-[#58CC02] ml-4 mt-1 italic"
                  style={{ color: "#C3E88D" }}
                >
                  → {annotationMap.get(idx)}
                </div>
              )}
            </div>
          ))}
        </div>

        {caption && (
          <div
            className="px-4 py-2"
            style={{ background: "#1A1B2E", borderTop: "1px solid #3A3D5C" }}
          >
            <p className="text-xs text-[#AFAFAF] italic">{caption}</p>
          </div>
        )}
      </div>

      {/* Output Section */}
      {output && (
        <div className="rounded-xl overflow-hidden">
          <div
            className="px-3 py-2"
            style={{ background: "#1A1B2E" }}
          >
            <span className="text-[10px] text-[#6B7094] font-mono">Output</span>
          </div>
          <pre
            className="px-4 py-3 text-sm leading-relaxed overflow-x-auto"
            style={{
              background: "#0D0E1A",
              fontFamily: "var(--font-code)",
              color: "#58CC02",
            }}
          >
            {output}
          </pre>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <div className="rounded-xl overflow-hidden">
          <div
            className="px-3 py-2"
            style={{ background: "#8B0000" }}
          >
            <span className="text-[10px] text-white font-mono">Error</span>
          </div>
          <pre
            className="px-4 py-3 text-sm leading-relaxed overflow-x-auto"
            style={{
              background: "#3D0000",
              fontFamily: "var(--font-code)",
              color: "#FF6B6B",
            }}
          >
            {error}
          </pre>
        </div>
      )}
    </div>
  );
}

// Code formatting function (same as ConceptCard)
function formatCode(content: string): string {
  const KEYWORDS = /\b(def|return|for|in|if|else|elif|import|from|as|True|False|None|and|or|not|pass)\b/g;
  const BUILTINS = /\b(print|len|range|append|type|str|int|float|bool|list|dict|set|np|plt|figure|plot|axhline|xlabel|ylabel|title|legend|show|linspace|sin)\b/g;
  const NUMBERS = /\b(\d+\.?\d*)\b/g;

  let codePart = content;
  let commentPart = "";
  const commentMatch = content.match(
    /^([^"'#]*(?:(?:"[^"]*"|'[^']*')[^"'#]*)*)?(#.*)$/
  );
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
    .replace(NUMBERS, '<span style="color:#F78C6C">$1</span>');

  const restored = highlighted.replace(/\x00STR(\d+)\x00/g, (_, idx) =>
    `<span style="color:#C3E88D">${strings[Number(idx)]}</span>`
  );

  const commentHtml = commentPart
    ? `<span style="color:#6B7094">${commentPart.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
    : "";

  return restored + commentHtml;
}
