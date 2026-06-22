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

// self-contained plotter for the transfer function / gain (x = injected current I)
function TFPlot({
  xs,
  ys,
  color,
  theta,
  title,
  yLabel,
}: {
  xs: number[];
  ys: number[];
  color: string;
  theta: number;
  title: string;
  yLabel: string;
}) {
  const W = 340;
  const H = 170;
  const padL = 16;
  const padR = 14;
  const padT = 10;
  const padB = 42; // room for axis labels

  let yMax = -Infinity;
  for (const v of ys) if (Number.isFinite(v) && v > yMax) yMax = v;
  if (!Number.isFinite(yMax) || yMax <= 0) yMax = 1;
  yMax *= 1.12;

  const xOf = (x: number) => padL + ((x - TF_IMIN) / (TF_IMAX - TF_IMIN)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - y / yMax) * (H - padT - padB);
  const path = ys.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(xs[i]).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");
  const baseY = H - padB;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12.5, color: "#C8CADF", fontWeight: 700, marginBottom: 3, marginLeft: 2 }}>{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <rect x={padL} y={padT} width={W - padL - padR} height={baseY - padT} fill="#0E1124" rx={6} />
        {/* y-axis label */}
        <text x={padL + 3} y={padT + 11} fill="#9EA3BD" fontSize={9.5}>↑ {yLabel}</text>
        {/* baseline */}
        <line x1={padL} x2={W - padR} y1={yOf(0)} y2={yOf(0)} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
        {/* x ticks at integer current values */}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <text key={t} x={xOf(t)} y={baseY + 12} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
        ))}
        {/* threshold marker */}
        <line x1={xOf(theta)} x2={xOf(theta)} y1={padT} y2={baseY} stroke="#FF9600" strokeWidth={1.3} strokeDasharray="4 3" opacity={0.75} />
        <text x={xOf(theta)} y={padT + 11} fill="#FF9600" fontSize={10} textAnchor="middle" fontWeight="bold">θ</text>
        <path d={path} fill="none" stroke={color} strokeWidth={2.8} strokeLinejoin="round" />
        {/* x-axis title with units + weak→strong hint */}
        <text x={W / 2} y={baseY + 28} fill="#9EA3BD" fontSize={10} textAnchor="middle">Injected current, I (au) — weak → strong</text>
      </svg>
    </div>
  );
}

// ─── Numerical differentiation of sine (NMA Demo 2.2) ──────
const ND_TMIN = -10;
const ND_TMAX = 10;

export function NumericalDerivativeWidget() {
  const [h, setH] = useState(0.5);

  // fine grids for the exact curves
  const fine = useMemo(() => {
    const ts: number[] = [];
    const sin: number[] = [];
    const cos: number[] = [];
    for (let t = ND_TMIN; t <= ND_TMAX; t += 0.05) {
      ts.push(t);
      sin.push(Math.sin(t));
      cos.push(Math.cos(t));
    }
    return { ts, sin, cos };
  }, []);

  // numerical derivative on a coarse grid of step h (forward difference)
  const numer = useMemo(() => {
    const tc: number[] = [];
    for (let t = ND_TMIN; t <= ND_TMAX; t += h) tc.push(t);
    const ts: number[] = [];
    const dy: number[] = [];
    for (let i = 0; i < tc.length - 1; i++) {
      ts.push(tc[i]);
      dy.push((Math.sin(tc[i + 1]) - Math.sin(tc[i])) / h);
    }
    return { ts, dy };
  }, [h]);

  const W = 340;
  const H = 210;
  const padL = 16;
  const padR = 12;
  const padT = 12;
  const padB = 26;
  const yMin = -1.45;
  const yMax = 1.45;
  const xOf = (t: number) => padL + ((t - ND_TMIN) / (ND_TMAX - ND_TMIN)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - (y - yMin) / (yMax - yMin)) * (H - padT - padB);
  const toPath = (ts: number[], ys: number[]) =>
    ys.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(ts[i]).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");

  const SINE = "#1CB0F6", EXACT = "#FF9600", NUM = "#58CC02";

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="h — the step size (gap between sample points)"
        value={h}
        min={0.05}
        max={2}
        step={0.05}
        onChange={setH}
        color="#58CC02"
        display={`h = ${h.toFixed(2)}`}
      />
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", marginTop: 6 }}>
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
        <line x1={padL} x2={W - padR} y1={yOf(0)} y2={yOf(0)} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
        {[-10, -5, 0, 5, 10].map((t) => (
          <text key={t} x={xOf(t)} y={H - padB + 13} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
        ))}
        <path d={toPath(fine.ts, fine.sin)} fill="none" stroke={SINE} strokeWidth={2} opacity={0.9} />
        <path d={toPath(fine.ts, fine.cos)} fill="none" stroke={EXACT} strokeWidth={2.4} />
        <path d={toPath(numer.ts, numer.dy)} fill="none" stroke={NUM} strokeWidth={2.4} strokeDasharray="1 0" />
        <text x={W / 2} y={H - 4} fill="#9EA3BD" fontSize={10} textAnchor="middle">Time, t (au)</text>
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
        {[["sin(t)", SINE], ["exact derivative: cos(t)", EXACT], ["numerical derivative", NUM]].map(([l, c]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 14, height: 3, background: c, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: "#9EA3BD", fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        The exact derivative of sin(t) is cos(t) (orange). The <strong style={{ color: NUM }}>green</strong> curve is the
        finite-difference estimate using step <strong style={{ color: "#58CC02" }}>h</strong>. Shrink h → green hugs
        orange (accurate). Grow h → green lags and distorts. Smaller h is more accurate, but needs more points — the
        accuracy-vs-cost tradeoff.
      </p>
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
        label="θ — threshold (current at half-activation)"
        value={theta}
        min={2}
        max={8}
        step={0.5}
        onChange={setTheta}
        color="#FF9600"
        display={`θ = ${theta.toFixed(1)}`}
      />
      <SliderRow
        label="a — gain parameter (steepness of the rise)"
        value={a}
        min={0.3}
        max={3}
        step={0.1}
        onChange={setA}
        color="#1CB0F6"
        display={`a = ${a.toFixed(1)}`}
      />

      <TFPlot xs={Is} ys={rates} color={C_FUNC} theta={theta} yLabel="firing rate, r (normalized)" title="Transfer function" />
      <TFPlot xs={Is} ys={gains} color={C_INTEG} theta={theta} yLabel="gain = d(r)/dI (sensitivity)" title="Gain — the slope of the curve above" />

      <p style={{ margin: "14px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Raise <strong style={{ color: "#FF9600" }}>θ</strong> → the transfer curve and the gain bump both shift to a
        higher current (the neuron needs more drive to respond).<br />
        Raise <strong style={{ color: "#1CB0F6" }}>a</strong> → the transfer curve steepens, and the gain bump grows
        taller and narrower (higher peak sensitivity over a narrower range of currents).
      </p>
    </div>
  );
}

// ─── Viridis-style colormap (blue → green → yellow) ────────
const VIRIDIS_STOPS: [number, [number, number, number]][] = [
  [0.0, [68, 1, 84]],
  [0.25, [59, 82, 139]],
  [0.5, [33, 144, 141]],
  [0.75, [93, 201, 99]],
  [1.0, [253, 231, 37]],
];

function viridis(t: number): string {
  const x = Math.max(0, Math.min(1, t));
  for (let i = 0; i < VIRIDIS_STOPS.length - 1; i++) {
    const [t0, c0] = VIRIDIS_STOPS[i];
    const [t1, c1] = VIRIDIS_STOPS[i + 1];
    if (x >= t0 && x <= t1) {
      const f = (x - t0) / (t1 - t0);
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * f);
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * f);
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * f);
      return `rgb(${r},${g},${b})`;
    }
  }
  return "rgb(253,231,37)";
}

// ─── Partial Derivative Explorer (NMA Section 3) ───────────
// Renders f(x,y) and its two partial derivatives as color heatmaps —
// the "render the value as color" idea from the NMA tutorial, which is far
// clearer on a phone than a rotating 3-D surface.
type PdKey = "cross" | "bowl" | "saddle" | "product";

interface PdDef {
  key: PdKey;
  label: string;
  expr: string;
  f: (x: number, y: number) => number;
  dxExpr: string;
  dyExpr: string;
}

const PD_FUNCTIONS: PdDef[] = [
  {
    key: "cross",
    label: "x² + 2xy + y²",
    expr: "f(x,y) = x² + 2xy + y²",
    f: (x, y) => x * x + 2 * x * y + y * y,
    dxExpr: "∂f/∂x = 2x + 2y",
    dyExpr: "∂f/∂y = 2x + 2y",
  },
  {
    key: "bowl",
    label: "x² + y²",
    expr: "f(x,y) = x² + y²",
    f: (x, y) => x * x + y * y,
    dxExpr: "∂f/∂x = 2x",
    dyExpr: "∂f/∂y = 2y",
  },
  {
    key: "saddle",
    label: "x² − y²",
    expr: "f(x,y) = x² − y²",
    f: (x, y) => x * x - y * y,
    dxExpr: "∂f/∂x = 2x",
    dyExpr: "∂f/∂y = −2y",
  },
  {
    key: "product",
    label: "x · y",
    expr: "f(x,y) = x · y",
    f: (x, y) => x * y,
    dxExpr: "∂f/∂x = y",
    dyExpr: "∂f/∂y = x",
  },
];

const PD_MIN = -5;
const PD_MAX = 5;
const PD_GRID = 22; // cells per axis

// numerical partial derivatives (central difference)
function partialX(f: (x: number, y: number) => number, x: number, y: number): number {
  const h = 1e-3;
  return (f(x + h, y) - f(x - h, y)) / (2 * h);
}
function partialY(f: (x: number, y: number) => number, x: number, y: number): number {
  const h = 1e-3;
  return (f(x, y + h) - f(x, y - h)) / (2 * h);
}

// 3-D surface plot via isometric projection + painter's algorithm, with a
// matplotlib-style axis box (floor + back walls, gridlines, x/y/z tick numbers).
function Surface3D({
  values,
  title,
  formula,
  formulaColor,
}: {
  values: number[][]; // [row=y][col=x]
  title: string;
  formula: string;
  formulaColor: string;
}) {
  const W = 330;
  const H = 300;
  const n = values.length;

  let vMin = Infinity;
  let vMax = -Infinity;
  for (const row of values)
    for (const v of row) {
      if (v < vMin) vMin = v;
      if (v > vMax) vMax = v;
    }
  const range = vMax - vMin || 1;

  // azimuth/elevation camera (like matplotlib view_init) so tilted surfaces
  // clearly show their rise toward the z-axis, instead of looking flat.
  const az = (-58 * Math.PI) / 180;
  const el = (24 * Math.PI) / 180;
  const cosA = Math.cos(az), sinA = Math.sin(az);
  const cosE = Math.cos(el), sinE = Math.sin(el);
  const S = 96; // x/y extent
  const Hz = 118; // z (height) extent
  const ox = W / 2;
  const oy = 156;

  // project normalized cube: a ∈ [-1,1] (x), b ∈ [-1,1] (y), c ∈ [0,1] (z)
  const proj = (a: number, b: number, c: number) => {
    const wx = a * S, wy = b * S, wz = (c - 0.5) * Hz;
    const x1 = wx * cosA - wy * sinA;
    const y1 = wx * sinA + wy * cosA;
    const up = -y1 * sinE + wz * cosE;
    return { x: ox + x1, y: oy - up, depth: y1 * cosE + wz * sinE };
  };
  const P = (a: number, b: number, c: number) => proj(a, b, c);
  const dN = (d: number) => d / 5; // data coord in [-5,5] → [-1,1]
  const cOf = (v: number) => (v - vMin) / range;
  const xy = [-4, -2, 0, 2, 4]; // x & y tick values (range is -5..5)
  const zTicks = [0, 1, 2, 3, 4].map((i) => vMin + (range * i) / 4);

  const quads: { d: string; depth: number; color: string }[] = [];
  for (let yi = 0; yi < n - 1; yi++) {
    for (let xi = 0; xi < n - 1; xi++) {
      const na = (xi / (n - 1) - 0.5) * 2;
      const na1 = ((xi + 1) / (n - 1) - 0.5) * 2;
      const nb = (yi / (n - 1) - 0.5) * 2;
      const nb1 = ((yi + 1) / (n - 1) - 0.5) * 2;
      const c00 = cOf(values[yi][xi]), c10 = cOf(values[yi][xi + 1]);
      const c11 = cOf(values[yi + 1][xi + 1]), c01 = cOf(values[yi + 1][xi]);
      const p00 = proj(na, nb, c00), p10 = proj(na1, nb, c10), p11 = proj(na1, nb1, c11), p01 = proj(na, nb1, c01);
      quads.push({
        d: `M${p00.x.toFixed(1)},${p00.y.toFixed(1)} L${p10.x.toFixed(1)},${p10.y.toFixed(1)} L${p11.x.toFixed(1)},${p11.y.toFixed(1)} L${p01.x.toFixed(1)},${p01.y.toFixed(1)} Z`,
        depth: p00.depth + p10.depth + p11.depth + p01.depth,
        color: viridis((c00 + c10 + c11 + c01) / 4),
      });
    }
  }
  quads.sort((a, b) => b.depth - a.depth); // far first, near last

  const grid = "rgba(255,255,255,0.10)";
  const pane = "rgba(255,255,255,0.04)";
  const axc = "#8B8FB0";
  const line = (p1: { x: number; y: number }, p2: { x: number; y: number }, stroke: string, sw: number, key: string) => (
    <line key={key} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={stroke} strokeWidth={sw} />
  );

  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12, color: "#C8CADF", fontWeight: 700, marginBottom: 2, textAlign: "center" }}>{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        {/* floor pane (z = 0) */}
        <polygon points={[P(-1, -1, 0), P(1, -1, 0), P(1, 1, 0), P(-1, 1, 0)].map((p) => `${p.x},${p.y}`).join(" ")} fill={pane} />
        {xy.map((t) => line(P(dN(t), -1, 0), P(dN(t), 1, 0), grid, 0.5, "flx" + t))}
        {xy.map((t) => line(P(-1, dN(t), 0), P(1, dN(t), 0), grid, 0.5, "fly" + t))}
        {/* back-left wall (x = -5) */}
        <polygon points={[P(-1, -1, 0), P(-1, 1, 0), P(-1, 1, 1), P(-1, -1, 1)].map((p) => `${p.x},${p.y}`).join(" ")} fill={pane} />
        {zTicks.map((v, i) => line(P(-1, -1, cOf(v)), P(-1, 1, cOf(v)), grid, 0.5, "wlz" + i))}
        {xy.map((t) => line(P(-1, dN(t), 0), P(-1, dN(t), 1), grid, 0.5, "wly" + t))}
        {/* back-right wall (y = -5) */}
        <polygon points={[P(-1, -1, 0), P(1, -1, 0), P(1, -1, 1), P(-1, -1, 1)].map((p) => `${p.x},${p.y}`).join(" ")} fill={pane} />
        {zTicks.map((v, i) => line(P(-1, -1, cOf(v)), P(1, -1, cOf(v)), grid, 0.5, "wrz" + i))}
        {xy.map((t) => line(P(dN(t), -1, 0), P(dN(t), -1, 1), grid, 0.5, "wrx" + t))}

        {/* the surface */}
        {quads.map((q, i) => (
          <path key={i} d={q.d} fill={q.color} stroke={q.color} strokeWidth={0.4} strokeLinejoin="round" />
        ))}

        {/* x-axis (front-left edge, y = +5) */}
        {line(P(-1, 1, 0), P(1, 1, 0), axc, 1, "xaxis")}
        {xy.map((t) => {
          const p = P(dN(t), 1, 0);
          return (
            <text key={"xt" + t} x={p.x - 2} y={p.y + 11} fill={axc} fontSize={8} textAnchor="middle">{t}</text>
          );
        })}
        <text x={P(0, 1, 0).x - 6} y={P(0, 1, 0).y + 24} fill="#C8CADF" fontSize={12} fontWeight="bold" textAnchor="middle">x</text>
        {/* y-axis (front-left bottom edge, x = -5) */}
        {line(P(-1, 1, 0), P(-1, -1, 0), axc, 1, "yaxis")}
        {xy.map((t) => {
          const p = P(-1, dN(t), 0);
          return (
            <text key={"yt" + t} x={p.x - 7} y={p.y + 5} fill={axc} fontSize={8} textAnchor="end">{t}</text>
          );
        })}
        <text x={P(-1, -1, 0).x - 8} y={P(-1, -1, 0).y + 16} fill="#C8CADF" fontSize={12} fontWeight="bold" textAnchor="middle">y</text>
        {/* z-axis (front-right vertical edge) with tick labels outside on the right */}
        {line(P(1, 1, 0), P(1, 1, 1), axc, 1, "zaxis")}
        {zTicks.map((v, i) => {
          const p = P(1, 1, cOf(v));
          return (
            <text key={"zt" + i} x={p.x + 6} y={p.y + 3} fill={axc} fontSize={8} textAnchor="start">{Math.round(v)}</text>
          );
        })}
      </svg>
      <div
        style={{
          fontSize: 11,
          color: formulaColor,
          fontWeight: 700,
          fontFamily: "var(--font-code)",
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {formula}
      </div>
    </div>
  );
}

export function PartialDerivativeWidget() {
  const [key, setKey] = useState<PdKey>("cross");
  const def = PD_FUNCTIONS.find((d) => d.key === key)!;

  const { fGrid, dxGrid, dyGrid } = useMemo(() => {
    const xs: number[] = [];
    for (let i = 0; i < PD_GRID; i++) xs.push(PD_MIN + ((PD_MAX - PD_MIN) * i) / (PD_GRID - 1));
    const fGrid: number[][] = [];
    const dxGrid: number[][] = [];
    const dyGrid: number[][] = [];
    for (let yi = 0; yi < PD_GRID; yi++) {
      const fRow: number[] = [];
      const dxRow: number[] = [];
      const dyRow: number[] = [];
      for (let xi = 0; xi < PD_GRID; xi++) {
        const x = xs[xi];
        const y = xs[yi];
        fRow.push(def.f(x, y));
        dxRow.push(partialX(def.f, x, y));
        dyRow.push(partialY(def.f, x, y));
      }
      fGrid.push(fRow);
      dxGrid.push(dxRow);
      dyGrid.push(dyRow);
    }
    return { fGrid, dxGrid, dyGrid };
  }, [def]);

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      {/* function selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {PD_FUNCTIONS.map((d) => (
          <button
            key={d.key}
            onClick={() => setKey(d.key)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-code)",
              border: key === d.key ? "1px solid #7C82F8" : "1px solid rgba(255,255,255,0.1)",
              background: key === d.key ? "rgba(124,130,248,0.22)" : "rgba(255,255,255,0.04)",
              color: key === d.key ? "#C7CAFF" : "#9EA3BD",
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C_FUNC, fontFamily: "var(--font-code)" }}>{def.expr}</span>
      </div>

      <Surface3D values={fGrid} title="The function" formula="f(x, y)" formulaColor={C_FUNC} />
      <Surface3D values={dxGrid} title="Partial derivative w.r.t. x" formula={def.dxExpr} formulaColor={C_DERIV} />
      <Surface3D values={dyGrid} title="Partial derivative w.r.t. y" formula={def.dyExpr} formulaColor={C_INTEG} />

      {/* colorbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, justifyContent: "center" }}>
        <span style={{ fontSize: 10.5, color: "#9EA3BD" }}>low</span>
        <div
          style={{
            width: 120,
            height: 10,
            borderRadius: 5,
            background: "linear-gradient(90deg, rgb(68,1,84), rgb(59,82,139), rgb(33,144,141), rgb(93,201,99), rgb(253,231,37))",
          }}
        />
        <span style={{ fontSize: 10.5, color: "#9EA3BD" }}>high</span>
      </div>

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Each surface is a 3-D plot — <strong>height</strong> (and color) is the value at each (x, y), just like NMA&apos;s
        <code> plot3d</code>. The <strong style={{ color: C_DERIV }}>second</strong> surface is the slope along x (∂f/∂x);
        the <strong style={{ color: C_INTEG }}>third</strong> is the slope along y (∂f/∂y). Notice: with the cross term{" "}
        <em>2xy</em>, both partial-derivative surfaces tilt along x <em>and</em> y. Drop the cross term (x² + y²) and each
        partial becomes a flat ramp that only tilts along its own variable.
      </p>
    </div>
  );
}

// ─── Riemann Sum Explorer (NMA Section 4) ──────────────────
// f(t) = t² − t + 1 on [0, 10];  exact integral F(t) = t³/3 − t²/2 + t
const RS_MIN = 0;
const RS_MAX = 10;
function rsF(t: number): number {
  return t * t - t + 1;
}
function rsIntExact(t: number): number {
  return (t * t * t) / 3 - (t * t) / 2 + t;
}

export function RiemannSumWidget() {
  const [dt, setDt] = useState(1.0);

  // left-endpoint rectangles
  const rects = useMemo(() => {
    const out: { a: number; h: number }[] = [];
    const n = Math.floor((RS_MAX - RS_MIN) / dt);
    for (let i = 0; i < n; i++) {
      const a = RS_MIN + i * dt;
      out.push({ a, h: rsF(a) });
    }
    return out;
  }, [dt]);

  // running Riemann sum (cumulative)
  const riemannPts = useMemo(() => {
    const out: { t: number; v: number }[] = [];
    let acc = 0;
    for (const r of rects) {
      acc += r.h * dt;
      out.push({ t: r.a + dt, v: acc });
    }
    return out;
  }, [rects, dt]);

  // smooth curves
  const fine = useMemo(() => {
    const ts: number[] = [];
    const fy: number[] = [];
    const iy: number[] = [];
    for (let t = RS_MIN; t <= RS_MAX + 1e-9; t += 0.1) {
      ts.push(t);
      fy.push(rsF(t));
      iy.push(rsIntExact(t));
    }
    return { ts, fy, iy };
  }, []);

  const exactTotal = rsIntExact(RS_MAX);
  const riemannTotal = riemannPts.length ? riemannPts[riemannPts.length - 1].v : 0;
  const errPct = Math.abs((riemannTotal - exactTotal) / exactTotal) * 100;

  // left plot geometry
  const W = 340;
  const H = 180;
  const padL = 30;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const fMax = rsF(RS_MAX) * 1.08;
  const xOf = (t: number) => padL + ((t - RS_MIN) / (RS_MAX - RS_MIN)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - y / fMax) * (H - padT - padB);
  const fPath = fine.fy.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(fine.ts[i]).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");
  const baseY = yOf(0);

  // right plot geometry
  const iMax = exactTotal * 1.1;
  const yOfI = (y: number) => padT + (1 - y / iMax) * (H - padT - padB);
  const iPath = fine.iy.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(fine.ts[i]).toFixed(1)},${yOfI(y).toFixed(1)}`).join(" ");
  const rPath = riemannPts.map((p, i) => `${i === 0 ? "M" : "L"}${xOf(p.t).toFixed(1)},${yOfI(p.v).toFixed(1)}`).join(" ");

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="dt — width of each rectangle (step size)"
        value={dt}
        min={0.25}
        max={2.5}
        step={0.25}
        onChange={setDt}
        color="#FF4B4B"
        display={`dt = ${dt.toFixed(2)}`}
      />

      {/* left: rectangles under the curve */}
      <div style={{ fontSize: 12, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
        f(t) = t² − t + 1, with {rects.length} rectangles
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
        {rects.map((r, i) => (
          <rect
            key={i}
            x={xOf(r.a)}
            y={yOf(r.h)}
            width={Math.max(0.5, xOf(r.a + dt) - xOf(r.a) - 0.8)}
            height={baseY - yOf(r.h)}
            fill="rgba(255,75,75,0.22)"
            stroke="#FF4B4B"
            strokeWidth={0.8}
          />
        ))}
        <path d={fPath} fill="none" stroke="#1CB0F6" strokeWidth={2.4} />
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <text key={t} x={xOf(t)} y={H - padB + 13} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
        ))}
      </svg>

      {/* right: estimate vs exact */}
      <div style={{ fontSize: 12, color: "#C8CADF", fontWeight: 700, margin: "12px 0 2px 2px" }}>
        Integral (area so far): Riemann sum vs exact
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
        <path d={iPath} fill="none" stroke="#FF9600" strokeWidth={2.6} />
        <path d={rPath} fill="none" stroke="#58CC02" strokeWidth={2.2} strokeDasharray="4 3" />
        {riemannPts.map((p, i) => (
          <circle key={i} cx={xOf(p.t)} cy={yOfI(p.v)} r={2} fill="#58CC02" />
        ))}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <text key={t} x={xOf(t)} y={H - padB + 13} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
        ))}
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
        {[["exact integral", "#FF9600"], ["Riemann sum", "#58CC02"]].map(([l, c]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 14, height: 3, background: c, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: "#9EA3BD", fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(0,0,0,0.25)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Exact total area: <strong style={{ color: "#FF9600" }}>{exactTotal.toFixed(1)}</strong>
        </span>
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Riemann estimate: <strong style={{ color: "#58CC02" }}>{riemannTotal.toFixed(1)}</strong>
        </span>
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Off by <strong style={{ color: errPct > 8 ? "#FF4B4B" : "#58CC02" }}>{errPct.toFixed(1)}%</strong>
        </span>
      </div>

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Shrink <strong style={{ color: "#FF4B4B" }}>dt</strong> → more, skinnier rectangles hug the curve and the green
        estimate snaps onto the orange exact line. The catch: more rectangles = more computation. And because each
        rectangle uses its <em>left</em> edge while the curve is rising, every rectangle sits slightly under the
        curve — so a big dt <strong>underestimates</strong> the area.
      </p>
    </div>
  );
}

// ─── Seeded RNG for reproducible noise (SSR-safe) ──────────
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Differentiation/Integration as Filtering (NMA Section 5) ──
const SF_MIN = 0;
const SF_MAX = 2;
const SF_H = 0.01;

export function SignalFilteringWidget() {
  const [noise, setNoise] = useState(0.5);
  const [seed, setSeed] = useState(1);

  const { tx, signal, diff, integ } = useMemo(() => {
    const rand = mulberry32(seed);
    const tx: number[] = [];
    const clean: number[] = [];
    const signal: number[] = [];
    for (let t = SF_MIN; t < SF_MAX; t += SF_H) {
      tx.push(t);
      const base = Math.sin(0.5 * Math.PI * t * 2); // a smooth ~1 Hz wave
      clean.push(base);
      signal.push(base + rand() * noise);
    }
    // derivative-equivalent: difference of adjacent samples (amplifies noise)
    const diff: number[] = [];
    for (let i = 1; i < signal.length; i++) diff.push((signal[i] - signal[i - 1]) / SF_H);
    // integration-equivalent: average adjacent samples (smooths noise)
    const integ: number[] = [];
    for (let i = 1; i < signal.length; i++) integ.push((signal[i] + signal[i - 1]) / 2);
    return { tx, signal, diff, integ };
  }, [noise, seed]);

  function MiniPlot({
    ts,
    ys,
    color,
    title,
    overlay,
    overlayColor,
  }: {
    ts: number[];
    ys: number[];
    color: string;
    title: string;
    overlay?: number[];
    overlayColor?: string;
  }) {
    const W = 340;
    const H = 110;
    const padL = 12;
    const padR = 10;
    const padT = 10;
    const padB = 16;
    let yMin = Infinity;
    let yMax = -Infinity;
    for (const v of ys) {
      if (v < yMin) yMin = v;
      if (v > yMax) yMax = v;
    }
    if (overlay) for (const v of overlay) { if (v < yMin) yMin = v; if (v > yMax) yMax = v; }
    const pad = (yMax - yMin) * 0.1 || 1;
    yMin -= pad;
    yMax += pad;
    const xOf = (t: number) => padL + ((t - SF_MIN) / (SF_MAX - SF_MIN)) * (W - padL - padR);
    const yOf = (y: number) => padT + (1 - (y - yMin) / (yMax - yMin)) * (H - padT - padB);
    const toPath = (arr: number[], times: number[]) =>
      arr.map((y, i) => `${i === 0 ? "M" : "L"}${xOf(times[i]).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");
    return (
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11.5, color, fontWeight: 700, marginBottom: 2, marginLeft: 2 }}>{title}</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
          <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
          {overlay && overlayColor && (
            <path d={toPath(overlay, ts.slice(0, overlay.length))} fill="none" stroke={overlayColor} strokeWidth={1.4} opacity={0.5} />
          )}
          <path d={toPath(ys, ts.slice(0, ys.length))} fill="none" stroke={color} strokeWidth={1.6} />
        </svg>
      </div>
    );
  }

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="noise — how much fast jitter is added to the wave"
        value={noise}
        min={0}
        max={1.2}
        step={0.05}
        onChange={setNoise}
        color="#7C82F8"
        display={`${noise.toFixed(2)}`}
      />
      <button
        onClick={() => setSeed((s) => s + 1)}
        style={{
          padding: "7px 14px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          color: "#C8CADF",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 4,
        }}
      >
        🎲 New noise
      </button>

      <MiniPlot ts={tx} ys={signal} color="#1CB0F6" title="① Original signal (smooth wave + noisy jitter)" />
      <MiniPlot ts={tx} ys={diff} color="#FF4B4B" title="② Differentiated → noise EXPLODES (high-pass)" />
      <MiniPlot ts={tx} ys={integ} color="#58CC02" title="③ Integrated/averaged → noise SMOOTHED away (low-pass)" />

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Same signal, two operations. <strong style={{ color: "#FF4B4B" }}>Differentiating</strong> (subtracting
        neighbors) keeps only what <em>changes fast</em> — so it amplifies the jittery noise: a{" "}
        <strong>high-pass filter</strong>. <strong style={{ color: "#58CC02" }}>Integrating</strong> (adding neighbors)
        keeps only what changes <em>slowly</em> — it washes the noise out and leaves the smooth wave: a{" "}
        <strong>low-pass filter</strong>. Crank the noise up and watch the red plot go wild while the green stays calm.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  Differential Equations (NMA Calculus Tutorial 2)
// ═══════════════════════════════════════════════════════════

// ─── Shared flexible chart ─────────────────────────────────
type XY = [number, number];

function Chart({
  W = 340,
  H = 170,
  xMin,
  xMax,
  yMin,
  yMax,
  xLabel,
  yLabel,
  xTicks = [],
  yTicks = [],
  lines = [],
  dots = [],
  hlines = [],
  vlines = [],
}: {
  W?: number;
  H?: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xLabel?: string;
  yLabel?: string;
  xTicks?: number[];
  yTicks?: number[];
  lines?: { pts: XY[]; color: string; width?: number; dash?: string }[];
  dots?: { x: number; y: number; color: string; r?: number }[];
  hlines?: { y: number; color?: string; label?: string }[];
  vlines?: { x: number; color?: string; label?: string }[];
}) {
  const padL = 40;
  const padR = 14;
  const padT = 12;
  const padB = 28;
  const xOf = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const yOf = (y: number) => padT + (1 - (y - yMin) / (yMax - yMin)) * (H - padT - padB);
  const toPath = (pts: XY[]) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"}${xOf(x).toFixed(1)},${yOf(y).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} fill="#0E1124" rx={6} />
      {hlines.map((h, i) => (
        <g key={`h${i}`}>
          <line x1={padL} x2={W - padR} y1={yOf(h.y)} y2={yOf(h.y)} stroke={h.color || "rgba(255,255,255,0.25)"} strokeWidth={1} strokeDasharray="4 3" />
          {h.label && (
            <text x={W - padR - 2} y={yOf(h.y) - 3} fill={h.color || "#9EA3BD"} fontSize={9} textAnchor="end">{h.label}</text>
          )}
        </g>
      ))}
      {vlines.map((v, i) => (
        <g key={`v${i}`}>
          <line x1={xOf(v.x)} x2={xOf(v.x)} y1={padT} y2={H - padB} stroke={v.color || "rgba(255,255,255,0.25)"} strokeWidth={1} strokeDasharray="4 3" />
          {v.label && (
            <text x={xOf(v.x)} y={padT + 9} fill={v.color || "#9EA3BD"} fontSize={9} textAnchor="middle">{v.label}</text>
          )}
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={`xt${t}`} x={xOf(t)} y={H - padB + 13} fill="#5A5F80" fontSize={9} textAnchor="middle">{t}</text>
      ))}
      {yTicks.map((t) => (
        <text key={`yt${t}`} x={padL - 4} y={yOf(t) + 3} fill="#5A5F80" fontSize={9} textAnchor="end">{t}</text>
      ))}
      {lines.map((l, i) => (
        <path key={`l${i}`} d={toPath(l.pts)} fill="none" stroke={l.color} strokeWidth={l.width || 2.2} strokeDasharray={l.dash || "none"} strokeLinejoin="round" />
      ))}
      {dots.map((d, i) => (
        <circle key={`d${i}`} cx={xOf(d.x)} cy={yOf(d.y)} r={d.r || 4} fill={d.color} stroke="#0E1124" strokeWidth={1} />
      ))}
      {xLabel && (
        <text x={(padL + W - padR) / 2} y={H - 3} fill="#9EA3BD" fontSize={9.5} textAnchor="middle">{xLabel}</text>
      )}
      {yLabel && (
        <text x={11} y={(padT + H - padB) / 2} fill="#9EA3BD" fontSize={9.5} textAnchor="middle" transform={`rotate(-90 11 ${(padT + H - padB) / 2})`}>{yLabel}</text>
      )}
    </svg>
  );
}

// ─── Population Explorer (NMA Demo 1.2) ────────────────────
export function PopulationExplorer() {
  const [alpha, setAlpha] = useState(0.3);
  const P0 = 1;

  const dpdt = useMemo(() => {
    const pts: XY[] = [];
    for (let p = 0; p <= 100; p += 2) pts.push([p, alpha * p]);
    return pts;
  }, [alpha]);

  const pOfT = useMemo(() => {
    const pts: XY[] = [];
    for (let t = 0; t <= 10; t += 0.1) pts.push([t, P0 * Math.exp(alpha * t)]);
    return pts;
  }, [alpha]);

  // left plot y-range (dp/dt at p=100 is alpha*100)
  const dEnd = alpha * 100;
  const dLo = Math.min(0, dEnd);
  const dHi = Math.max(0, dEnd);
  const dSpan = Math.max(6, dHi - dLo);
  const lyMin = dLo - dSpan * 0.12;
  const lyMax = dHi + dSpan * 0.12;

  // right plot y-range
  const pHi = Math.max(...pOfT.map((p) => p[1]));
  const ryMax = Math.max(1.3, pHi * 1.12);

  const sign = alpha > 0.001 ? "pos" : alpha < -0.001 ? "neg" : "zero";

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="α — birth rate (the single parameter)"
        value={alpha}
        min={-1}
        max={1}
        step={0.1}
        onChange={setAlpha}
        color="#7C82F8"
        display={`α = ${alpha.toFixed(1)}`}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
            Left: dp/dt vs p
          </div>
          <Chart
            xMin={0}
            xMax={100}
            yMin={lyMin}
            yMax={lyMax}
            xLabel="population, p"
            yLabel="dp/dt"
            xTicks={[0, 50, 100]}
            hlines={[{ y: 0, color: "rgba(255,255,255,0.3)" }]}
            lines={[{ pts: dpdt, color: C_DERIV, width: 2.6 }]}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
            Right: p(t) over time
          </div>
          <Chart
            xMin={0}
            xMax={10}
            yMin={0}
            yMax={ryMax}
            xLabel="time, t (years)"
            yLabel="population"
            xTicks={[0, 5, 10]}
            hlines={[{ y: P0, color: "rgba(255,150,0,0.4)", label: "p₀ = 1" }]}
            lines={[{ pts: pOfT, color: C_FUNC, width: 2.6 }]}
            dots={[{ x: 0, y: P0, color: C_INTEG }]}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          background:
            sign === "pos" ? "rgba(255,75,75,0.1)" : sign === "neg" ? "rgba(88,204,2,0.1)" : "rgba(255,150,0,0.12)",
          border: `1px solid ${sign === "pos" ? "rgba(255,75,75,0.3)" : sign === "neg" ? "rgba(88,204,2,0.3)" : "rgba(255,150,0,0.35)"}`,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "#C8CADF", lineHeight: 1.55 }}>
          {sign === "pos" && (
            <><strong style={{ color: C_FUNC }}>α &gt; 0 → explosion.</strong> The line slopes up, so more population makes even more population. The solution blows up exponentially toward infinity.</>
          )}
          {sign === "neg" && (
            <><strong style={{ color: C_INTEG }}>α &lt; 0 → decay.</strong> The line slopes down: population shrinks itself away. The solution decays exponentially to 0 — a stable end state.</>
          )}
          {sign === "zero" && (
            <><strong style={{ color: "#FF9600" }}>α = 0 → frozen (equilibrium).</strong> dp/dt = 0 everywhere: nothing changes. The population sits still forever — the equilibrium / stable point.</>
          )}
        </p>
      </div>
    </div>
  );
}

// ─── LIF parameters (shared) ───────────────────────────────
const LIF_EL = -75; // resting potential (mV)
const LIF_TAU = 10; // time constant (ms)
const LIF_RM = 10; // membrane resistance
const LIF_VTH = -50; // spike threshold (mV)
const LIF_VRESET = -75; // reset potential (mV)

// ─── LIF Pull-to-Rest (NMA Demo 2.1.1) ─────────────────────
export function LIFPullToRest() {
  const [vReset, setVReset] = useState(-65);

  const dVdt = useMemo(() => {
    const pts: XY[] = [];
    for (let V = -90; V <= -50; V += 1) pts.push([V, -(V - LIF_EL) / LIF_TAU]);
    return pts;
  }, []);

  const vOfT = useMemo(() => {
    const pts: XY[] = [];
    for (let t = 0; t <= 80; t += 0.5) pts.push([t, LIF_EL + (vReset - LIF_EL) * Math.exp(-t / LIF_TAU)]);
    return pts;
  }, [vReset]);

  const dAtReset = -(vReset - LIF_EL) / LIF_TAU;

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="V_reset — the starting voltage (initial condition)"
        value={vReset}
        min={-90}
        max={-50}
        step={1}
        onChange={setVReset}
        color="#58CC02"
        display={`${vReset} mV`}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
            Left: dV/dt vs V
          </div>
          <Chart
            xMin={-90}
            xMax={-50}
            yMin={-3}
            yMax={2}
            xLabel="V (mV)"
            yLabel="dV/dt"
            xTicks={[-90, -70, -50]}
            hlines={[{ y: 0, color: "rgba(255,255,255,0.3)" }]}
            vlines={[{ x: LIF_EL, color: "#FF9600", label: "E_L" }]}
            lines={[{ pts: dVdt, color: C_DERIV, width: 2.6 }]}
            dots={[{ x: vReset, y: dAtReset, color: C_INTEG }]}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
            Right: V(t) over time
          </div>
          <Chart
            xMin={0}
            xMax={80}
            yMin={-92}
            yMax={-48}
            xLabel="time, t (ms)"
            yLabel="V (mV)"
            xTicks={[0, 40, 80]}
            hlines={[{ y: LIF_EL, color: "#FF9600", label: "E_L" }]}
            lines={[{ pts: vOfT, color: C_FUNC, width: 2.6 }]}
            dots={[{ x: 0, y: vReset, color: C_INTEG }]}
          />
        </div>
      </div>

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        The green dot is where you start.{" "}
        {vReset > LIF_EL ? (
          <>You started <strong style={{ color: C_FUNC }}>above</strong> rest, so dV/dt is <strong>negative</strong> — the voltage leaks <strong>down</strong> to E_L.</>
        ) : vReset < LIF_EL ? (
          <>You started <strong style={{ color: C_FUNC }}>below</strong> rest, so dV/dt is <strong>positive</strong> — the voltage climbs <strong>up</strong> to E_L.</>
        ) : (
          <>You started <strong style={{ color: "#FF9600" }}>exactly at rest</strong> (E_L), so dV/dt = 0 — the voltage never moves. This is the equilibrium point.</>
        )}{" "}
        Either way, the leaky neuron always returns to E_L = −75 mV.
      </p>
    </div>
  );
}

// ─── LIF simulation (exact integrate-and-fire) ─────────────
function simulateLIF(I: number, T: number, dt: number) {
  const Vinf = LIF_EL + LIF_RM * I; // steady-state target
  const trace: XY[] = [];
  const spikes: number[] = [];
  let tLast = 0;
  const steps = Math.round(T / dt);
  for (let i = 0; i <= steps; i++) {
    const t = i * dt;
    const V = Vinf + (LIF_VRESET - Vinf) * Math.exp(-(t - tLast) / LIF_TAU);
    if (V >= LIF_VTH) {
      trace.push([t, 0]); // draw the spike up to 0 mV
      spikes.push(t);
      tLast = t;
    } else {
      trace.push([t, V]);
    }
  }
  const rate = spikes.length / (T / 1000); // Hz
  return { trace, spikes, rate, Vinf };
}

// ─── LIF Spiking Simulator (NMA Demo 2.3.1) ────────────────
export function LIFSpikingSimulator() {
  const [I, setI] = useState(3);
  const T = 500;
  const { trace, spikes, rate, Vinf } = useMemo(() => simulateLIF(I, T, 0.5), [I]);

  const inputLine: XY[] = [
    [0, I],
    [T, I],
  ];

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="I — injected input current (nA)"
        value={I}
        min={2}
        max={4}
        step={0.1}
        onChange={setI}
        color="#FF9600"
        display={`I = ${I.toFixed(1)}`}
      />

      <div style={{ fontSize: 11.5, color: "#FF9600", fontWeight: 700, margin: "8px 0 2px 2px" }}>① Input current</div>
      <Chart
        W={340}
        H={64}
        xMin={0}
        xMax={T}
        yMin={0}
        yMax={5}
        yTicks={[]}
        lines={[{ pts: inputLine, color: "#FF9600", width: 2.4 }]}
      />

      <div style={{ fontSize: 11.5, color: C_FUNC, fontWeight: 700, margin: "10px 0 2px 2px" }}>② Membrane voltage V(t)</div>
      <Chart
        W={340}
        H={150}
        xMin={0}
        xMax={T}
        yMin={-82}
        yMax={6}
        yLabel="V (mV)"
        hlines={[{ y: LIF_VTH, color: "#FF4B4B", label: "V_th = −50" }]}
        lines={[{ pts: trace, color: C_FUNC, width: 1.6 }]}
      />

      <div style={{ fontSize: 11.5, color: C_DERIV, fontWeight: 700, margin: "10px 0 2px 2px" }}>③ Spike raster</div>
      <Chart
        W={340}
        H={42}
        xMin={0}
        xMax={T}
        yMin={0}
        yMax={1}
        xLabel="time, t (ms)"
        lines={spikes.map((t) => ({ pts: [[t, 0.1], [t, 0.9]] as XY[], color: C_DERIV, width: 1.4 }))}
      />

      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(0,0,0,0.25)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Target voltage: <strong style={{ color: "#FF9600" }}>{Vinf.toFixed(0)} mV</strong>
        </span>
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Spikes: <strong style={{ color: C_DERIV }}>{spikes.length}</strong>
        </span>
        <span style={{ fontSize: 12.5, color: "#9EA3BD" }}>
          Firing rate: <strong style={{ color: C_INTEG }}>{rate.toFixed(0)} Hz</strong>
        </span>
      </div>

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Turn up <strong style={{ color: "#FF9600" }}>I</strong> → the bucket fills toward a higher target, crosses the
        threshold <strong style={{ color: "#FF4B4B" }}>V_th</strong> sooner, and the neuron <strong>fires faster</strong>.
        Below about I = 2.5 the target never reaches threshold, so the neuron stays silent. Each spike instantly resets
        the voltage to −75 mV — that vertical drop is the artificial &quot;discontinuity&quot; of the LIF model.
      </p>
    </div>
  );
}

// ─── F–I Curve (NMA Section 2.4) ───────────────────────────
export function FICurve() {
  const [I, setI] = useState(3);

  const curve = useMemo(() => {
    const pts: XY[] = [];
    for (let i = 2; i <= 4.0001; i += 0.05) {
      const { rate } = simulateLIF(i, 1000, 0.5);
      pts.push([i, rate]);
    }
    return pts;
  }, []);

  const rateNow = useMemo(() => simulateLIF(I, 1000, 0.5).rate, [I]);
  const yMax = Math.max(10, ...curve.map((p) => p[1])) * 1.1;

  return (
    <div style={{ background: "#15183A", border: "1px solid rgba(124,130,248,0.18)", borderRadius: 16, padding: 16 }}>
      <SliderRow
        label="I — injected current (nA)"
        value={I}
        min={2}
        max={4}
        step={0.1}
        onChange={setI}
        color="#FF9600"
        display={`I = ${I.toFixed(1)}`}
      />

      <div style={{ fontSize: 12, color: "#C8CADF", fontWeight: 700, margin: "8px 0 2px 2px" }}>
        F–I curve: firing rate as a function of input
      </div>
      <Chart
        xMin={2}
        xMax={4}
        yMin={0}
        yMax={yMax}
        xLabel="input current, I (nA)"
        yLabel="rate (Hz)"
        xTicks={[2, 2.5, 3, 3.5, 4]}
        lines={[{ pts: curve, color: C_INTEG, width: 2.6 }]}
        dots={[{ x: I, y: rateNow, color: "#FF9600", r: 5 }]}
        vlines={[{ x: I, color: "rgba(255,150,0,0.4)" }]}
      />

      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "#9EA3BD" }}>
          At I = <strong style={{ color: "#FF9600" }}>{I.toFixed(1)} nA</strong>, this neuron fires at{" "}
          <strong style={{ color: C_INTEG }}>{rateNow.toFixed(0)} Hz</strong>
        </span>
      </div>

      <p style={{ margin: "12px 2px 0", fontSize: 12.5, color: "#9EA3BD", lineHeight: 1.6 }}>
        Below the &quot;rheobase&quot; current (~2.5 nA) the neuron is silent — 0 Hz. Past it, firing rate climbs with
        input. This <strong>F–I curve is exactly the transfer function</strong> you met in the last tutorial — except now
        we <em>derived</em> it from a real neuron model instead of just assuming an S-shape. Its slope is the neuron&apos;s{" "}
        <strong>gain</strong>.
      </p>
    </div>
  );
}
