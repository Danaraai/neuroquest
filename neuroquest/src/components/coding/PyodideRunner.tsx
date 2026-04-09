"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PyodideRunnerProps {
  code: string;
  testCode?: string;
  onTestPass?: () => void;
  onTestFail?: (error: string) => void;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (pkg: string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
    pyodide?: PyodideInterface;
  }
}

export interface RunResult {
  stdout: string;
  stderr: string;
  success: boolean;
  testPassed?: boolean;
}

export function usePyodide() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const pyodideRef = useRef<PyodideInterface | null>(null);
  const stdoutRef = useRef<string[]>([]);

  const load = useCallback(async () => {
    if (pyodideRef.current || loading) return;
    setLoading(true);

    try {
      // Load Pyodide script
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide"));
          document.head.appendChild(script);
        });
      }

      const pyodide = await window.loadPyodide!({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      // Redirect stdout
      await pyodide.runPythonAsync(`
import sys
import io

class CaptureOutput(io.StringIO):
    def __init__(self):
        super().__init__()
        self._lines = []

    def write(self, s):
        super().write(s)
        if s.strip():
            self._lines.append(s)

_capture = CaptureOutput()
sys.stdout = _capture
sys.stderr = _capture
      `);

      // Load numpy and matplotlib (async, may take a moment)
      await pyodide.loadPackage(["numpy", "matplotlib"]);

      pyodideRef.current = pyodide;
      window.pyodide = pyodide;
      setReady(true);
    } catch (err) {
      console.error("Pyodide load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const run = useCallback(async (code: string, testCode?: string): Promise<RunResult> => {
    if (!pyodideRef.current) {
      return { stdout: "Python not loaded yet. Click Run again.", stderr: "", success: false };
    }

    const py = pyodideRef.current;

    try {
      // Clear output buffer
      await py.runPythonAsync(`
_capture = CaptureOutput()
sys.stdout = _capture
sys.stderr = _capture
      `);

      // Run user code
      await py.runPythonAsync(code);

      // Get stdout
      const stdout = await py.runPythonAsync(`"\\n".join(_capture._lines)`) as string;

      let testPassed: boolean | undefined;
      let testError = "";

      // Run test code if provided
      if (testCode) {
        try {
          await py.runPythonAsync(testCode);
          testPassed = true;
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          // Check for assertion errors
          if (msg.includes("AssertionError") || msg.includes("assert")) {
            testPassed = false;
            testError = msg.split("\n").pop() ?? msg;
          } else if (msg.includes("NameError") || msg.includes("not defined")) {
            testPassed = false;
            testError = "Function not found — make sure your function is defined correctly.";
          } else {
            testPassed = false;
            testError = msg;
          }
        }
      }

      return { stdout: stdout || "(no output)", stderr: testError, success: true, testPassed };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const cleanMsg = msg.split("\n").slice(-3).join("\n");
      return { stdout: "", stderr: cleanMsg, success: false };
    }
  }, []);

  return { ready, loading, load, run };
}
