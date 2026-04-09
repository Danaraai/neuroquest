"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const customTheme = EditorView.theme({
  "&": {
    backgroundColor: "#0D0E1A",
    height: "100%",
    fontSize: "13px",
  },
  ".cm-scroller": {
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    lineHeight: "1.7",
    overflowY: "auto",
  },
  ".cm-content": {
    padding: "12px 0",
    caretColor: "#58CC02",
  },
  ".cm-line": { padding: "0 12px" },
  ".cm-gutters": {
    backgroundColor: "#0D0E1A",
    borderRight: "1px solid #3A3D5C",
    color: "#3A3D5C",
  },
  ".cm-activeLineGutter": { backgroundColor: "#1A1B2E" },
  ".cm-activeLine": { backgroundColor: "rgba(88,204,2,0.04)" },
  ".cm-cursor": { borderLeftColor: "#58CC02" },
  ".cm-selectionBackground": { backgroundColor: "rgba(28,176,246,0.2) !important" },
  "&.cm-focused .cm-selectionBackground": { backgroundColor: "rgba(28,176,246,0.25) !important" },
  ".cm-matchingBracket": { backgroundColor: "rgba(255,215,0,0.2)", color: "#FFD700 !important" },
});

export default function CodeMirrorEditor({ value, onChange }: CodeMirrorEditorProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[python(), customTheme]}
      theme={oneDark}
      style={{ height: "100%" }}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        bracketMatching: true,
        autocompletion: true,
        indentOnInput: true,
        tabSize: 4,
      }}
    />
  );
}
