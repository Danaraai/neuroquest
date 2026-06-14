"use client";

import { useEffect, useMemo, useState } from "react";

// ─── Colors ────────────────────────────────────────────────
const C_FUNC = "#FF4B4B"; // function — red
const C_DERIV = "#1CB0F6"; // derivative — blue
const C_INTEG = "#58CC02"; // integral — green

// ─── Function library ──────────────────────────────────────
type FnKey = "linear" | "quadratic" | "cubic" | "sine" | "exponential" | "sigmoid";

interface FnDef {
  key: FnKey;
  label: string;
  expr: string; // human-readable
  f: (t: number) => number;
}

const FUNCTIONS: FnDef[] = [
  { key: "linear", label: "Linear", expr: "f(t) = t", f: (t) => t },
  { key: "quadratic", label: "Quadratic", expr: "f(t) = t²", f: (t) => t * t },
  { key: "cubic", label: "Cubic", expr: "f(t) = t³", f: (t) => t * t * t },
  { key: "sine", label: "Sine", expr: "f(t) = sin(t)", f: (t) => Math.sin(t) },
  { key: "exponential", label: "Exponential", expr: "f(t) = e^(0.6t)", f: (t) => Math.exp(0.6 * t) },
  { key: "sigmoid", label: "Sigmoid", expr: "f(t) = 1 / (1 + e^−t)", f: (t) => 1 / (1 + Math.exp(-t)) },
];

// ─── Plain-English formula explanations ────────────────────
interface Explain {
  formula: string;
  why: string;
}

const DERIV_INFO: Record<FnKey, Explain> = {
  linear: {
    formula: "d/dt [ t ] = 1",
    why: "A straight line has the SAME steepness everywhere — so its slope is just a constant. That's why the derivative is a flat line at 1.",
  },
  quadratic: {
    formula: "d/dt [ t² ] = 2t",
    why: "The curve gets steeper the further right you go, so the slope keeps climbing — a straight diagonal line (2t).",
  },
  cubic: {
    formula: "d/dt [ t³ ] = 3t²",
    why: "A cubic is shallow near zero and steep at both edges, so its slope is an upward parabola (3t²) — bigger the further out you go.",
  },
  sine: {
    formula: "d/dt [ sin(t) ] = cos(t)",
    why: "A sine wave is steepest where it crosses the middle and flat at its peaks. That pattern of steepness is exactly a cosine wave — so the slope of sine is cosine.",
  },
  exponential: {
    formula: "d/dt [ e^(0.6t) ] = 0.6 · e^(0.6t)",
    why: "The taller it gets, the faster it climbs — its slope is proportional to its own height. That's why the derivative looks just like the function itself.",
  },
  sigmoid: {
    formula: "d/dt [ σ(t) ] = σ(t)·(1 − σ(t))",
    why: "The S-curve is flat, then steep, then flat again. So its slope is a little hill — near zero at the edges, biggest in the middle.",
  },
};

const INTEG_INFO: Record<FnKey, Explain> = {
  linear: {
    formula: "∫ t dt = t² / 2  (+ C)",
    why: "You're adding up a value that grows steadily, so the total piles up faster and faster — that's a parabola.",
  },
  quadratic: {
    formula: "∫ t² dt = t³ / 3  (+ C)",
    why: "Area under a rising curve stacks up even quicker, so the running total grows as a cubic.",
  },
  cubic: {
    formula: "∫ t³ dt = t⁴ / 4  (+ C)",
    why: "Stacking up the area under a cubic grows faster still — a steep U-shaped quartic.",
  },
  sine: {
    formula: "∫ sin(t) dt = −cos(t)  (+ C)",
    why: "Adding up the area under a sine wave traces out another wave, shifted over. It works out to be negative cosine.",
  },
  exponential: {
    formula: "∫ e^(0.6t) dt = (1/0.6) · e^(0.6t)  (+ C)",
    why: "Same magic in reverse: the area under an exponential is just a scaled copy of the exponential itself.",
  },
  sigmoid: {
    formula: "∫ σ(t) dt = ln(1 + e^t)  (+ C)",
    why: "Adding up an S-curve gives a line that's flat at first, then rises steadily — a gentle ramp (engineers call it 'softplus').",
  },
};

// ─── Numerical calculus ────────────────────────────────────
const T_MIN = -4;
const T_MAX = 4;
const N = 161;

function sampleT(): number[] {
  const out: number[] = [];
  const step = (T_MAX - T_MIN) / (N - 1);
  for (let i = 0; i < N; i++) out.push(T_MIN + i * step);
  return out;
}

function sampleF(f: (t: number) => number, ts: number[]): number[] {
  return ts.map(f);
}

// central-difference derivative
function derivative(f: (t: number) => number, ts: number[]): number[] {
  const h = 1e-4;
  return ts.map((t) => (f(t + h) - f(t - h)) / (2 * h));
}

// cumulative trapezoid integral, shifted so integral[0] = 0
function integral(ys: number[], ts: number[]): number[] {
  const out = [0];
  for (let i = 1; i < ys.length; i++) {
    const dt = ts[i] - ts[i - 1];
    out.push(out[i - 1] + ((ys[i] + ys[i - 1]) / 2) * dt);
  }
  return out;
}

// ─── SVG Plot ──────────────────────────────────────────────
interface Series {
  ys: number[];
  color: string;
  label: string;
}

interface PlotProps {
  ts: number[];
  series: Series[];
  height?: number;
  showLegend?: boolean;
}

function Plot({ ts, series, height = 240, showLegend = true }: PlotProps) {
  const W = 340;
  const H = height;
  const padL = 30;
  const padR = 14;
  const padT = 14;
  const padB = 22;

  // y-range across all visible series
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const s of series) {
    for (const v of s.ys) {
      if (Number.isFinite(v)) {
        if (v < yMin) yMin = v;
        if (v > yMax) yMax = v;
      }
    }
  }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
    yMin = -1;
    yMax = 1;
  }
  // Floor the range so a near-constant curve (e.g. derivative of a line = 1)
  // renders as a flat line instead of amplifying floating-point noise into wiggles.
  const mid = (yMin + yMax) / 2;
  const minRange = Math.max(0.5, Math.abs(mid) * 0.2);
  if (yMax - yMin < minRange) {
    yMin = mid - minRange / 2;
    yMax = mid + minRange / 2;
  }
  const pad = (yMax - yMin) * 0.12;
  yMin -= pad;
  yMax += pad;

  const xOf = (t: number) => padL + ((t - T_MIN) / (T_MAX - T_MIN)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - (y - yMin) / (yMax - yMin)) * (H - padT - padB);

  const pathOf = (ys: number[]) =>
    ys
      .map((y, i) => `${i === 0 ? "M" : "L"}${xOf(ts[i]).toFixed(1)},${yOf(y).toFixed(1)}`)
      .join(" ");

  const y0 = yOf(0); // x-axis position (y=0)
  const x0 = xOf(0); // y-axis position (t=0)
  const axisInY = 0 >= yMin && 0 <= yMax;
  const axisInX = 0 >= T_MIN && 0 <= T_MAX;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        {/* frame */}
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
        {/* gridlines (vertical at integer t) */}
        {[-4, -2, 0, 2, 4].map((t) => (
          <line
            key={`gx${t}`}
            x1={xOf(t)}
            x2={xOf(t)}
            y1={padT}
            y2={H - padB}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}
        {/* zero axes */}
        {axisInY && (
          <line x1={padL} x2={W - padR} y1={y0} y2={y0} stroke="rgba(255,255,255,0.22)" strokeWidth={1} />
        )}
        {axisInX && (
          <line x1={x0} x2={x0} y1={padT} y2={H - padB} stroke="rgba(255,255,255,0.22)" strokeWidth={1} />
        )}
        {/* t-axis ticks */}
        {[-4, -2, 2, 4].map((t) => (
          <text key={`tx${t}`} x={xOf(t)} y={H - padB + 14} fill="#5A5F80" fontSize={9} textAnchor="middle">
            {t}
          </text>
        ))}
        {/* curves */}
        {series.map((s, i) => (
          <path key={i} d={pathOf(s.ys)} fill="none" stroke={s.color} strokeWidth={2.4} strokeLinejoin="round" />
        ))}
      </svg>
      {showLegend && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 6 }}>
          {series.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 14, height: 3, background: s.color, borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: "#9EA3BD", fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Explorer (free-play, matches NMA demo) ────────────────
export function CalculusExplorer() {
  const [fnKey, setFnKey] = useState<FnKey>("linear");
  const [showD, setShowD] = useState(false);
  const [showI, setShowI] = useState(false);

  const fn = FUNCTIONS.find((f) => f.key === fnKey)!;
  const ts = useMemo(() => sampleT(), []);
  const ys = useMemo(() => sampleF(fn.f, ts), [fn, ts]);
  const dys = useMemo(() => derivative(fn.f, ts), [fn, ts]);
  const iys = useMemo(() => integral(ys, ts), [ys, ts]);

  const series: Series[] = [{ ys, color: C_FUNC, label: "Function" }];
  if (showD) series.push({ ys: dys, color: C_DERIV, label: "Derivative" });
  if (showI) series.push({ ys: iys, color: C_INTEG, label: "Integral" });

  return (
    <div
      style={{
        background: "#15183A",
        border: "1px solid rgba(124,130,248,0.18)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      {/* function selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {FUNCTIONS.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setFnKey(f.key);
              setShowD(false);
              setShowI(false);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              border: fnKey === f.key ? "1px solid #7C82F8" : "1px solid rgba(255,255,255,0.1)",
              background: fnKey === f.key ? "rgba(124,130,248,0.22)" : "rgba(255,255,255,0.04)",
              color: fnKey === f.key ? "#C7CAFF" : "#9EA3BD",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* expression */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: C_FUNC, fontFamily: "var(--font-code)" }}>{fn.expr}</span>
      </div>

      <Plot ts={ts} series={series} />

      {/* toggles */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Toggle on={showD} color={C_DERIV} label="Show derivative" onClick={() => setShowD((v) => !v)} />
        <Toggle on={showI} color={C_INTEG} label="Show integral" onClick={() => setShowI((v) => !v)} />
      </div>

      {/* formula explanations — appear when toggled on */}
      {showD && <ExplainBox color={C_DERIV} title="Derivative" info={DERIV_INFO[fnKey]} />}
      {showI && <ExplainBox color={C_INTEG} title="Integral" info={INTEG_INFO[fnKey]} />}

      <p style={{ margin: "12px 2px 0", fontSize: 12, color: "#6A6F90", fontStyle: "italic", lineHeight: 1.5 }}>
        Tip: look at the function first. Predict what the derivative (slope) and integral (area) will look like —
        <em> then</em> toggle them on and check.
      </p>
    </div>
  );
}

function Toggle({ on, color, label, onClick }: { on: boolean; color: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        borderRadius: 12,
        cursor: "pointer",
        border: on ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.1)",
        background: on ? `${color}1F` : "rgba(255,255,255,0.03)",
        color: on ? color : "#9EA3BD",
        fontSize: 12.5,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          border: `2px solid ${on ? color : "#5A5F80"}`,
          background: on ? color : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {on && (
          <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#15183A" strokeWidth={4}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function ExplainBox({ color, title, info }: { color: string; title: string; info: Explain }) {
  return (
    <div
      style={{
        marginTop: 10,
        padding: "12px 14px",
        borderRadius: 12,
        background: `${color}12`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 0.4, textTransform: "uppercase" }}>
          {title}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#EEEDF6",
            fontFamily: "var(--font-code)",
            background: "rgba(0,0,0,0.25)",
            padding: "3px 9px",
            borderRadius: 7,
          }}
        >
          {info.formula}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, color: "#C8CADF", lineHeight: 1.6 }}>{info.why}</p>
    </div>
  );
}

// ─── Predict mini-game ─────────────────────────────────────
// Exponential is excluded on purpose: its function, derivative, and integral
// are all the same shape (scaled), so they're visually identical options —
// an impossible "spot the derivative" question. Its special property is taught
// in the explorer instead. These all have distinct-shaped derivatives.
const PREDICT_POOL: FnKey[] = ["linear", "quadratic", "cubic", "sine", "sigmoid"];
const ROUNDS_PER_GAME = 4;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface GameRound {
  fnKey: FnKey;
  order: number[]; // shuffle of [0,1,2] = which raw option goes in each slot
}

function buildGame(): GameRound[] {
  // a fresh random subset of functions, each with its options shuffled
  return shuffle(PREDICT_POOL)
    .slice(0, ROUNDS_PER_GAME)
    .map((fnKey) => ({ fnKey, order: shuffle([0, 1, 2]) }));
}

// Deterministic starting game so server and client render identically
// (avoids a hydration mismatch from Math.random). We shuffle on the client
// after mount via useEffect.
const DEFAULT_GAME: GameRound[] = PREDICT_POOL.slice(0, ROUNDS_PER_GAME).map((fnKey) => ({
  fnKey,
  order: [0, 1, 2],
}));

export function CalculusPredict() {
  const [game, setGame] = useState<GameRound[]>(DEFAULT_GAME);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  // Shuffle once on the client, after hydration, so the first paint matches SSR.
  useEffect(() => {
    setGame(buildGame());
  }, []);

  const ts = useMemo(() => sampleT(), []);
  const roundDef = game[idx];
  const fn = FUNCTIONS.find((f) => f.key === roundDef.fnKey)!;
  const ys = useMemo(() => sampleF(fn.f, ts), [fn, ts]);

  // option curves: correct = derivative; distractors = function itself + integral
  const options = useMemo(() => {
    const dys = derivative(fn.f, ts);
    const iys = integral(ys, ts);
    const raw = [
      { ys: dys, kind: "derivative" as const, label: "The slope at every point" },
      { ys, kind: "function" as const, label: "The function itself" },
      { ys: iys, kind: "integral" as const, label: "The running area (integral)" },
    ];
    return roundDef.order.map((i) => raw[i]);
  }, [fn, ts, ys, roundDef]);

  const correctIdx = options.findIndex((o) => o.kind === "derivative");
  const answered = picked !== null;
  const isLastRound = idx === game.length - 1;

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === correctIdx) setCorrectCount((c) => c + 1);
  }

  function playAgain() {
    setGame(buildGame());
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setDone(false);
  }

  // ── completion screen ──
  if (done) {
    const perfect = correctCount === game.length;
    return (
      <div
        style={{
          background: "#15183A",
          border: "1px solid rgba(124,130,248,0.18)",
          borderRadius: 16,
          padding: 24,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>{perfect ? "🏆" : "🎉"}</div>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#EEEDF6" }}>
          {correctCount} / {game.length} correct
        </p>
        <p style={{ margin: "6px 0 16px", fontSize: 13.5, color: "#9EA3BD", lineHeight: 1.6 }}>
          {perfect
            ? "Perfect — you can spot a derivative on sight. That's real calculus intuition."
            : "Nice work. Play again for a fresh set of functions in a new order."}
        </p>
        <button
          onClick={playAgain}
          style={{
            padding: "11px 24px",
            borderRadius: 10,
            border: "none",
            background: "#7C82F8",
            color: "#0E1124",
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          🔄 Play again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#15183A",
        border: "1px solid rgba(124,130,248,0.18)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#7C82F8", letterSpacing: 0.4 }}>
          🎯 ROUND {idx + 1} / {game.length}
        </span>
        <span style={{ fontSize: 12, color: "#6A6F90" }}>Which graph is the derivative?</span>
      </div>

      {/* the function */}
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C_FUNC, fontFamily: "var(--font-code)" }}>{fn.expr}</span>
      </div>
      <Plot ts={ts} series={[{ ys, color: C_FUNC, label: "Function" }]} height={170} showLegend={false} />

      <p style={{ margin: "10px 2px 10px", fontSize: 13, color: "#9EA3BD", textAlign: "center" }}>
        The derivative is the <strong style={{ color: C_DERIV }}>slope</strong> of this curve at every point. Which one is it?
      </p>

      {/* options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {options.map((opt, i) => {
          const isCorrect = i === correctIdx;
          const isPicked = i === picked;
          let border = "1px solid rgba(255,255,255,0.1)";
          let bg = "rgba(255,255,255,0.03)";
          if (answered) {
            if (isCorrect) {
              border = `2px solid ${C_INTEG}`;
              bg = `${C_INTEG}14`;
            } else if (isPicked) {
              border = "2px solid #FF4B4B";
              bg = "rgba(255,75,75,0.08)";
            }
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={answered}
              style={{
                padding: 6,
                borderRadius: 12,
                border,
                background: bg,
                cursor: answered ? "default" : "pointer",
              }}
            >
              <Plot ts={ts} series={[{ ys: opt.ys, color: answered && isCorrect ? C_INTEG : "#8B8FB0", label: "" }]} height={90} showLegend={false} />
              {answered && (isCorrect || isPicked) && (
                <span style={{ fontSize: 16 }}>{isCorrect ? "✅" : "❌"}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* feedback */}
      {answered && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            borderRadius: 12,
            background: picked === correctIdx ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.08)",
            border: `1px solid ${picked === correctIdx ? "rgba(88,204,2,0.3)" : "rgba(255,75,75,0.25)"}`,
          }}
        >
          <p style={{ margin: 0, fontSize: 13.5, color: "#C8CADF", lineHeight: 1.6 }}>
            {picked === correctIdx ? "✅ Correct! " : "❌ Not quite. "}
            The derivative is <strong style={{ color: C_DERIV }}>{options[correctIdx].label}</strong>.{" "}
            {explainDerivative(roundDef.fnKey)}
          </p>
          <button
            onClick={() => {
              if (isLastRound) {
                setDone(true);
              } else {
                setPicked(null);
                setIdx((n) => n + 1);
              }
            }}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px",
              borderRadius: 10,
              border: "none",
              background: "#7C82F8",
              color: "#0E1124",
              fontWeight: 800,
              fontSize: 13.5,
              cursor: "pointer",
            }}
          >
            {isLastRound ? "See results →" : "Next function →"}
          </button>
        </div>
      )}
    </div>
  );
}

function explainDerivative(key: FnKey): string {
  switch (key) {
    case "linear":
      return "A straight line has the SAME slope everywhere, so its derivative is a flat horizontal line.";
    case "quadratic":
      return "t² gets steeper as you move right, so its slope keeps increasing — a straight diagonal line (2t).";
    case "cubic":
      return "t³ is shallow near zero and steep at both edges, so its slope is an upward parabola (3t²).";
    case "sine":
      return "A sine wave's slope is steepest at the zero-crossings and flat at the peaks — that traces out a cosine wave.";
    case "exponential":
      return "The exponential is special: its slope equals its own height, so the derivative looks just like the function!";
    case "sigmoid":
      return "The sigmoid is flat-steep-flat, so its slope is a bump: near-zero at the ends, biggest in the middle.";
  }
}

// ─── Neuron transfer function & gain playground ────────────
const TF_IMIN = 0;
const TF_IMAX = 10;
const TF_N = 200;

function sigmoidRate(I: number, a: number, theta: number): number {
  // firing rate as a function of injected current (NMA sigmoid transfer function)
  return 1 / (1 + Math.exp(-a * (I - theta)));
}

// small self-contained plotter for the 0–10 input-current domain
function TFPlot({
  xs,
  ys,
  color,
  theta,
  title,
}: {
  xs: number[];
  ys: number[];
  color: string;
  theta: number;
  title: string;
}) {
  const W = 340;
  const H = 150;
  const padL = 14;
  const padR = 14;
  const padT = 10;
  const padB = 22;

  let yMax = -Infinity;
  for (const v of ys) if (Number.isFinite(v) && v > yMax) yMax = v;
  if (!Number.isFinite(yMax) || yMax <= 0) yMax = 1;
  yMax *= 1.12;

  const xOf = (x: number) => padL + ((x - TF_IMIN) / (TF_IMAX - TF_IMIN)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - y / yMax) * (H - padT - padB);
  const path = ys.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(xs[i]).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 11.5, color: "#9EA3BD", fontWeight: 600, marginBottom: 2, marginLeft: 2 }}>{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
        {/* baseline */}
        <line x1={padL} x2={W - padR} y1={yOf(0)} y2={yOf(0)} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
        {/* threshold marker */}
        <line x1={xOf(theta)} x2={xOf(theta)} y1={padT} y2={H - padB} stroke="#FF9600" strokeWidth={1.3} strokeDasharray="4 3" opacity={0.7} />
        <text x={xOf(theta) + 3} y={padT + 10} fill="#FF9600" fontSize={9}>θ</text>
        {/* x ticks */}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <text key={t} x={xOf(t)} y={H - padB + 14} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
        ))}
        <path d={path} fill="none" stroke={color} strokeWidth={2.6} strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  color,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color: string;
  display: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12.5, color: "#C8CADF", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 12.5, color, fontWeight: 800, fontFamily: "var(--font-code)" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: color, cursor: "pointer" }}
      />
    </div>
  );
}

export function TransferFunctionWidget() {
  const [a, setA] = useState(1.2);
  const [theta, setTheta] = useState(5);

  const { Is, rates, gains } = useMemo(() => {
    const Is: number[] = [];
    const rates: number[] = [];
    const step = (TF_IMAX - TF_IMIN) / (TF_N - 1);
    for (let i = 0; i < TF_N; i++) {
      const I = TF_IMIN + i * step;
      Is.push(I);
      rates.push(sigmoidRate(I, a, theta));
    }
    const gains = rates.map((_, i) => {
      if (i === 0) return (rates[1] - rates[0]) / step;
      if (i === rates.length - 1) return (rates[i] - rates[i - 1]) / step;
      return (rates[i + 1] - rates[i - 1]) / (2 * step);
    });
    return { Is, rates, gains };
  }, [a, theta]);

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="a — gain (how steep the curve is)"
        value={a}
        min={0.3}
        max={3}
        step={0.1}
        onChange={setA}
        color="#1CB0F6"
        display={`a = ${a.toFixed(1)}`}
      />
      <SliderRow
        label="θ — threshold (the wake-up point)"
        value={theta}
        min={2}
        max={8}
        step={0.5}
        onChange={setTheta}
        color="#FF9600"
        display={`θ = ${theta.toFixed(1)}`}
      />

      <TFPlot xs={Is} ys={rates} color={C_FUNC} theta={theta} title="Transfer function — firing rate vs injected current (I)" />
      <TFPlot xs={Is} ys={gains} color={C_INTEG} theta={theta} title="Gain — how sensitive the rate is (slope of the curve above)" />

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.55 }}>
        Drag the sliders. <strong style={{ color: "#FF9600" }}>θ</strong> slides the whole S-curve left/right — the gain
        bump moves with it (the neuron is most sensitive right at its wake-up point).{" "}
        <strong style={{ color: "#1CB0F6" }}>a</strong> makes the S-curve steeper — the gain bump grows taller and narrower.
      </p>
    </div>
  );
}
