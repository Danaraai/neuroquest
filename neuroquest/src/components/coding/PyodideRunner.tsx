"use client";

import { useState, useRef, useCallback } from "react";

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (pkg: string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

export interface RunResult {
  stdout: string;
  stderr: string;
  success: boolean;
  testPassed?: boolean;
}

// ── Module-level singleton ─────────────────────────────────────────────────
// Pyodide is ~10 MB + package downloads. We load it once for the whole app
// session and reuse the same instance across all pages/components.
let _pyodideInstance: PyodideInterface | null = null;
let _pyodideInitPromise: Promise<PyodideInterface> | null = null;

async function getPyodide(): Promise<PyodideInterface> {
  // Already initialised — return immediately
  if (_pyodideInstance) return _pyodideInstance;

  // Initialisation already in flight — wait for it
  if (_pyodideInitPromise) return _pyodideInitPromise;

  // First call — kick off the full init
  _pyodideInitPromise = (async () => {
    // Load the CDN script if not already on the page
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide script"));
        document.head.appendChild(script);
      });
    }

    const pyodide = await window.loadPyodide!({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
    });

    // Set up stdout capture
    await pyodide.runPythonAsync(`
import sys, io

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

    // Load numpy and matplotlib once
    await pyodide.loadPackage(["numpy", "matplotlib"]);

    // Force the non-interactive Agg backend so plt.show() never injects
    // a canvas element into the DOM. We capture figures manually after each run.
    await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as _plt
_plt.show = lambda *a, **kw: None  # no-op: we capture figures ourselves
    `);

    _pyodideInstance = pyodide;
    return pyodide;
  })();

  return _pyodideInitPromise;
}
// ──────────────────────────────────────────────────────────────────────────

export function usePyodide() {
  const [ready, setReady] = useState(() => _pyodideInstance !== null);
  const [loading, setLoading] = useState(false);
  // Keep a ref so run() always has the latest instance
  const pyodideRef = useRef<PyodideInterface | null>(_pyodideInstance);

  const load = useCallback(async () => {
    // Already ready in this component or globally — nothing to do
    if (pyodideRef.current) return;

    setLoading(true);
    try {
      const py = await getPyodide();
      pyodideRef.current = py;
      setReady(true);
    } catch (err) {
      console.error("Pyodide load failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

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

      // Run test code BEFORE closing figures so tests can inspect matplotlib state
      if (testCode) {
        try {
          await py.runPythonAsync(testCode);
          testPassed = true;
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          testPassed = false;
          // Extract the last meaningful line (usually the assertion message)
          const lines = msg.split("\n").filter((l) => l.trim());
          testError = lines[lines.length - 1] ?? msg;
        }
      }

      // Capture any matplotlib figures as base64 PNGs and embed as HTML
      const figuresHtml = await py.runPythonAsync(`
import io as _io, base64 as _b64
_figs = []
try:
    import matplotlib.pyplot as _plt
    for _i, _fn in enumerate(_plt.get_fignums()):
        _fig = _plt.figure(_fn)
        _buf = _io.BytesIO()
        _fig.savefig(_buf, format='png', bbox_inches='tight', dpi=96)
        _buf.seek(0)
        _enc = _b64.b64encode(_buf.getvalue()).decode('utf-8')
        _figs.append(
            '<div style="text-align:center;margin:8px 0">'
            f'<img src="data:image/png;base64,{_enc}" '
            'style="max-width:100%;max-height:280px;object-fit:contain"/>'
            '</div>'
        )
        _plt.close(_fig)
except Exception:
    pass
''.join(_figs)
      `) as string;

      const combinedOutput = [
        figuresHtml,
        stdout && stdout !== "(no output)" ? `<pre style="margin:0">${stdout}</pre>` : "",
      ]
        .filter(Boolean)
        .join("\n") || "(no output)";

      return { stdout: combinedOutput, stderr: testError, success: true, testPassed };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const cleanMsg = msg.split("\n").slice(-3).join("\n");
      return { stdout: "", stderr: cleanMsg, success: false };
    }
  }, []);

  return { ready, loading, load, run };
}
