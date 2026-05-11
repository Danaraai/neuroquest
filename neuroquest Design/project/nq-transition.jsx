// nq-transition.jsx — Anime-style transparent brain with neurons forming inside

const PEACH = '255,185,168';
const PEACH_DARK = '235,140,140';
const GOLD  = '255,220,170';

// ── 4-pointed sparkle star ────────────────────────────────────
function drawSparkle(ctx, x, y, r, alpha) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = `rgba(${GOLD},${alpha})`;
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(r * 0.09, r * 0.09, 0, r);
    ctx.quadraticCurveTo(-r * 0.09, r * 0.09, 0, 0);
    ctx.fill();
  }
  ctx.restore();
}

// ── Main cerebrum outline ────────────────────────────────────
function brainPath(ctx, cx, cy, s) {
  ctx.beginPath();
  ctx.moveTo(cx - s*0.32, cy + s*0.60);
  // front face up
  ctx.bezierCurveTo(cx-s*.60, cy+s*.28, cx-s*.66, cy-s*.04, cx-s*.58, cy-s*.28);
  // frontal lobe bulge
  ctx.bezierCurveTo(cx-s*.52, cy-s*.54, cx-s*.30, cy-s*.72, cx-s*.06, cy-s*.70);
  // central sulcus notch
  ctx.bezierCurveTo(cx+s*.04, cy-s*.68, cx+s*.06, cy-s*.61, cx+s*.13, cy-s*.65);
  // parietal bump
  ctx.bezierCurveTo(cx+s*.24, cy-s*.70, cx+s*.40, cy-s*.63, cx+s*.46, cy-s*.52);
  // parieto-occipital
  ctx.bezierCurveTo(cx+s*.52, cy-s*.38, cx+s*.56, cy-s*.22, cx+s*.60, cy-s*.06);
  // occipital (back, rounded)
  ctx.bezierCurveTo(cx+s*.62, cy+s*.12, cx+s*.58, cy+s*.30, cx+s*.50, cy+s*.44);
  // toward cerebellum
  ctx.bezierCurveTo(cx+s*.44, cy+s*.54, cx+s*.34, cy+s*.60, cx+s*.20, cy+s*.64);
  // bottom
  ctx.bezierCurveTo(cx+s*.02, cy+s*.68, cx-s*.14, cy+s*.67, cx-s*.28, cy+s*.63);
  ctx.bezierCurveTo(cx-s*.30, cy+s*.62, cx-s*.31, cy+s*.61, cx-s*.32, cy+s*.60);
  ctx.closePath();
}

// ── Cerebellum shape (back-bottom) ───────────────────────────
function cerebellumPath(ctx, cx, cy, s) {
  ctx.beginPath();
  ctx.moveTo(cx+s*.20, cy+s*.64);
  ctx.bezierCurveTo(cx+s*.30, cy+s*.60, cx+s*.48, cy+s*.52, cx+s*.54, cy+s*.38);
  ctx.bezierCurveTo(cx+s*.62, cy+s*.54, cx+s*.62, cy+s*.74, cx+s*.48, cy+s*.82);
  ctx.bezierCurveTo(cx+s*.36, cy+s*.88, cx+s*.20, cy+s*.86, cx+s*.12, cy+s*.80);
  ctx.bezierCurveTo(cx+s*.08, cy+s*.74, cx+s*.12, cy+s*.68, cx+s*.20, cy+s*.64);
  ctx.closePath();
}

// ── Gyri curves (sulci lines) ────────────────────────────────
function drawGyri(ctx, cx, cy, s, alpha) {
  const lines = [
    // Frontal lobe folds (left area)
    [[cx-s*.55, cy-.02*s],[cx-s*.46, cy-s*.30],[cx-s*.28, cy-s*.52],[cx-s*.10, cy-s*.60]],
    [[cx-s*.54, cy+s*.10],[cx-s*.44, cy-s*.18],[cx-s*.26, cy-s*.44],[cx-s*.06, cy-s*.55]],
    [[cx-s*.50, cy+s*.22],[cx-s*.38, cy-s*.06],[cx-s*.22, cy-s*.34],[cx-s*.02, cy-s*.48]],
    // Top folds crossing parietal
    [[cx-s*.04, cy-s*.58],[cx+s*.10, cy-s*.60],[cx+s*.26, cy-s*.55],[cx+s*.38, cy-s*.46]],
    [[cx-s*.02, cy-s*.50],[cx+s*.12, cy-s*.53],[cx+s*.28, cy-s*.48],[cx+s*.40, cy-s*.40]],
    [[cx+s*.02, cy-s*.42],[cx+s*.16, cy-s*.46],[cx+s*.30, cy-s*.40],[cx+s*.44, cy-s*.30]],
    // Temporal / lower folds
    [[cx-s*.56, cy+s*.22],[cx-s*.38, cy+s*.18],[cx-s*.16, cy+s*.20],[cx+s*.06, cy+s*.26]],
    [[cx-s*.52, cy+s*.36],[cx-s*.34, cy+s*.30],[cx-s*.10, cy+s*.32],[cx+s*.10, cy+s*.38]],
    [[cx-s*.44, cy+s*.50],[cx-s*.26, cy+s*.44],[cx-s*.04, cy+s*.46],[cx+s*.14, cy+s*.50]],
    // Occipital folds (back)
    [[cx+s*.40, cy-s*.18],[cx+s*.50, cy-s*.04],[cx+s*.54, cy+s*.14],[cx+s*.50, cy+s*.30]],
    [[cx+s*.34, cy-s*.08],[cx+s*.44, cy+s*.06],[cx+s*.46, cy+s*.22],[cx+s*.42, cy+s*.36]],
  ];
  lines.forEach(pts => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i=1; i<pts.length-1; i++) {
      const mx=(pts[i][0]+pts[i+1][0])/2, my=(pts[i][1]+pts[i+1][1])/2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    ctx.lineTo(pts[pts.length-1][0], pts[pts.length-1][1]);
    ctx.strokeStyle=`rgba(${PEACH_DARK},${alpha})`; ctx.lineWidth=1.2; ctx.stroke();
  });
  // Cerebellum stripes
  for (let i=0; i<4; i++) {
    const t = 0.25 + i*0.12;
    ctx.beginPath();
    ctx.moveTo(cx+s*.22, cy+s*(0.66+i*.04));
    ctx.bezierCurveTo(cx+s*.36, cy+s*(0.62+i*.04), cx+s*.50, cy+s*(0.52+i*.04), cx+s*.54, cy+s*(0.40+i*.04));
    ctx.strokeStyle=`rgba(${PEACH_DARK},${alpha*.7})`; ctx.lineWidth=1; ctx.stroke();
  }
}

// ── Highlight gradient over brain ────────────────────────────
function drawHighlight(ctx, cx, cy, s, alpha) {
  const g = ctx.createRadialGradient(cx-s*.18, cy-s*.2, 0, cx-s*.1, cy-s*.05, s*.7);
  g.addColorStop(0,   `rgba(255,240,220,${alpha*.25})`);
  g.addColorStop(0.5, `rgba(255,210,190,${alpha*.06})`);
  g.addColorStop(1,   `rgba(255,180,160,0)`);
  brainPath(ctx, cx, cy, s);
  ctx.fillStyle = g; ctx.fill();
}

// ── Main NeuronFormation component ───────────────────────────
function NeuronFormation({ onComplete, color='#00DCFF', W=390, H=780 }) {
  const canvasRef = React.useRef(null);
  const startRef  = React.useRef(null);
  const rafRef    = React.useRef(null);
  const [label,  setLabel]  = React.useState('Building your neural path…');
  const [ready,  setReady]  = React.useState(false);

  const nRgb = React.useMemo(()=>{
    const r=parseInt(color.slice(1,3),16), g=parseInt(color.slice(3,5),16), b=parseInt(color.slice(5,7),16);
    return `${r},${g},${b}`;
  },[color]);

  // Sparkle positions (fixed, outside brain)
  const sparkles = React.useMemo(()=>[
    {x:W*.82, y:H*.06, r:14}, {x:W*.88, y:H*.18, r:9},  {x:W*.76, y:H*.14, r:7},
    {x:W*.92, y:H*.32, r:11}, {x:W*.10, y:H*.08, r:8},  {x:W*.06, y:H*.20, r:12},
    {x:W*.15, y:H*.30, r:7},  {x:W*.85, y:H*.44, r:8},  {x:W*.04, y:H*.40, r:6},
    {x:W*.78, y:H*.52, r:10}, {x:W*.18, y:H*.48, r:7},
  ],[W,H]);

  React.useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // Brain center — large, taking most of the top area
    const cx = W * 0.48, cy = H * 0.30;
    const s  = W * 0.46;

    // Neurons placed inside the cerebrum
    const nodes = [
      { x: cx - s*.30, y: cy - s*.42 }, // frontal
      { x: cx - s*.10, y: cy - s*.50 }, // top-front
      { x: cx + s*.14, y: cy - s*.48 }, // parietal top
      { x: cx + s*.38, y: cy - s*.26 }, // occipital
      { x: cx - s*.44, y: cy - s*.06 }, // frontal lower
      { x: cx - s*.14, y: cy + s*.04 }, // center
      { x: cx + s*.18, y: cy + s*.06 }, // temporal
      { x: cx + s*.40, y: cy + s*.16 }, // back-center
      { x: cx - s*.22, y: cy + s*.32 }, // lower-left
      { x: cx + s*.14, y: cy + s*.34 }, // lower-right
    ];

    const edges = [
      [0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[6,7],
      [0,5],[1,5],[2,6],[3,7],[5,8],[5,9],[8,9],[6,9],[4,8],
    ];

    const APPEAR_MS = 320;
    const DONE_AT   = APPEAR_MS * nodes.length + 900;

    const nodeAlpha = new Array(nodes.length).fill(0);
    const nodeScale = new Array(nodes.length).fill(0);
    const connProg  = edges.map(()=>({progress:0, startMs:-1}));

    const drawNeuron = (nx,ny,alpha,scale,pulse) => {
      const r=8*scale; if(r<=0) return;
      // outer halo
      const g=ctx.createRadialGradient(nx,ny,0,nx,ny,r*5*pulse);
      g.addColorStop(0,`rgba(${nRgb},${.28*alpha})`); g.addColorStop(1,`rgba(${nRgb},0)`);
      ctx.beginPath(); ctx.arc(nx,ny,r*5*pulse,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      // body
      ctx.beginPath(); ctx.arc(nx,ny,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${nRgb},${alpha})`; ctx.fill();
      // bright core
      ctx.beginPath(); ctx.arc(nx,ny,r*.36,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${alpha*.9})`; ctx.fill();
    };

    const drawEdge=(ax,ay,bx,by,prog,alpha)=>{
      ctx.beginPath(); ctx.moveTo(ax,ay);
      ctx.lineTo(ax+(bx-ax)*prog, ay+(by-ay)*prog);
      ctx.strokeStyle=`rgba(${nRgb},${alpha*.38})`; ctx.lineWidth=0.9; ctx.stroke();
    };

    const drawSignal=(ax,ay,bx,by,t)=>{
      const sx=ax+(bx-ax)*t, sy=ay+(by-ay)*t;
      ctx.beginPath(); ctx.arc(sx,sy,3.5,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.92)'; ctx.fill();
      ctx.beginPath(); ctx.arc(sx,sy,7,0,Math.PI*2);
      ctx.fillStyle=`rgba(${nRgb},.32)`; ctx.fill();
    };

    const tick=(ts)=>{
      if(!startRef.current) startRef.current=ts;
      const ms=ts-startRef.current;
      ctx.clearRect(0,0,W,H);

      const a=Math.min(1,ms/700);

      // ── Brain layers (back to front) ──

      // Outer glow — warm pink halo
      ctx.save();
      ctx.shadowBlur=40; ctx.shadowColor=`rgba(${PEACH},.5)`;
      brainPath(ctx,cx,cy,s);
      ctx.strokeStyle=`rgba(${PEACH},${a*.5})`; ctx.lineWidth=3; ctx.stroke();
      ctx.restore();

      // Transparent fill — very subtle so neurons show
      brainPath(ctx,cx,cy,s);
      ctx.fillStyle=`rgba(${PEACH},${a*.06})`; ctx.fill();

      // Cerebellum fill
      cerebellumPath(ctx,cx,cy,s);
      ctx.fillStyle=`rgba(${PEACH_DARK},${a*.10})`; ctx.fill();
      cerebellumPath(ctx,cx,cy,s);
      ctx.strokeStyle=`rgba(${PEACH_DARK},${a*.55})`; ctx.lineWidth=1.5; ctx.stroke();

      // Gyri sulci lines
      drawGyri(ctx,cx,cy,s, a*.22);

      // Highlight
      drawHighlight(ctx,cx,cy,s,a);

      // Main outline — bright pink
      brainPath(ctx,cx,cy,s);
      ctx.strokeStyle=`rgba(${PEACH},${a*.75})`; ctx.lineWidth=2; ctx.stroke();

      // ── Neurons ──
      nodes.forEach((_,i)=>{
        const age=ms-i*APPEAR_MS;
        if(age>0){nodeAlpha[i]=Math.min(1,age/260); nodeScale[i]=Math.min(1,age/260);}
      });

      edges.forEach(([a2,b],ei)=>{
        const cp=connProg[ei];
        if(nodeAlpha[a2]>.4 && nodeAlpha[b]>.4){
          if(cp.startMs<0) cp.startMs=ms+150;
          if(ms>cp.startMs) cp.progress=Math.min(1,(ms-cp.startMs)/280);
        }
      });

      edges.forEach(([a2,b],ei)=>{
        const p=connProg[ei].progress;
        if(p>0) drawEdge(nodes[a2].x,nodes[a2].y,nodes[b].x,nodes[b].y,p,p);
      });

      if(ms>APPEAR_MS*nodes.length){
        edges.forEach(([a2,b],ei)=>{
          if(connProg[ei].progress>=1){
            const t=((ms*.00052+ei*.19)%1);
            drawSignal(nodes[a2].x,nodes[a2].y,nodes[b].x,nodes[b].y,t);
          }
        });
      }

      nodes.forEach(({x,y},i)=>{
        if(nodeAlpha[i]>0){
          const pulse=1+.12*Math.sin(ms*.003+i*1.1);
          drawNeuron(x,y,nodeAlpha[i],nodeScale[i],pulse);
        }
      });

      // ── Sparkles ──
      sparkles.forEach(({x,y,r},i)=>{
        const flicker=.5+.5*Math.sin(ms*.002+i*.8);
        const sa=Math.min(a,ms*.001)*flicker;
        drawSparkle(ctx,x,y,r,sa*.9);
      });

      // Text milestones
      if(ms>800  && ms<900)  setLabel('Neurons connecting…');
      if(ms>2000 && ms<2100) setLabel('Synapses forming…');
      if(ms>DONE_AT-80 && !ready){ setLabel('Your brain is ready! 🧠'); setReady(true); }
      if(ms>DONE_AT+1500){ cancelAnimationFrame(rafRef.current); return; }

      rafRef.current=requestAnimationFrame(tick);
    };

    rafRef.current=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[color,W,H]);

  return (
    <div style={{width:W, height:H, background:'#0A0610', position:'relative', overflow:'hidden', borderRadius:40, flexShrink:0}}>
      {/* Warm ambient stars */}
      {Array.from({length:30}).map((_,i)=>(
        <div key={i} style={{
          position:'absolute', left:`${(i*47+13)%100}%`, top:`${(i*73+7)%100}%`,
          width:(i%2)+1, height:(i%2)+1, borderRadius:'50%',
          background:`rgba(255,${200+i%55},${160+i%60},0.6)`,
          opacity:.05+(i%4)*.03,
          animation:`float ${2.5+(i%3)}s ease-in-out ${(i%5)*.7}s infinite`,
        }}/>
      ))}

      <canvas ref={canvasRef} width={W} height={H} style={{position:'absolute',inset:0}}/>

      {/* Ilya + message */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, display:'flex', flexDirection:'column', alignItems:'center', paddingBottom:52, gap:12}}>
        <div style={{animation:'float 2.5s ease-in-out infinite'}}>
          <IlyaSVG state="thinking" size={76}/>
        </div>
        <div style={{fontSize:14, fontWeight:700, fontFamily:"'Nunito',sans-serif",
          color:`rgba(${PEACH},0.95)`,
          textShadow:`0 0 20px rgba(${PEACH},.5)`,
          transition:'all 0.5s',
        }}>{label}</div>
        {ready && (
          <button onClick={onComplete} style={{
            marginTop:4, padding:'13px 34px', borderRadius:14, border:'none',
            background:`linear-gradient(135deg, ${color}, #58CC02)`,
            color:'#080A18', fontSize:15, fontWeight:900,
            fontFamily:"'Nunito',sans-serif", cursor:'pointer',
            animation:'pop-in 0.5s ease-out both',
            boxShadow:`0 4px 24px ${color}55`,
          }}>Explore NeuroQuest →</button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { NeuronFormation });
