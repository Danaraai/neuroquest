// nq-home.jsx — Home screen + NeuronCanvas

// ── Neuron Canvas Background ─────────────────────────────────
function NeuronCanvas({ width, height, density = 0.5, color = '#00DCFF' }) {
  const ref = React.useRef(null);
  const raf = React.useRef(null);
  React.useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const N = Math.floor(18 + density * 28);
    const nodes = Array.from({length:N}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: 1.2 + Math.random() * 1.8,
      vx: (Math.random()-.5)*.25, vy: (Math.random()-.5)*.25,
      phase: Math.random() * Math.PI * 2,
    }));
    const hexToRgb = h => { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return `${r},${g},${b}`; };
    const rgb = hexToRgb(color);
    const tick = () => {
      ctx.clearRect(0,0,width,height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.phase += 0.025;
        if (n.x<0||n.x>width) n.vx*=-1;
        if (n.y<0||n.y>height) n.vy*=-1;
      });
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<130) {
          const a=(1-d/130)*0.18;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(${rgb},${a})`; ctx.lineWidth=0.6; ctx.stroke();
        }
      }
      nodes.forEach(n => {
        const p=0.65+0.35*Math.sin(n.phase);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*p,0,Math.PI*2);
        ctx.fillStyle=`rgba(${rgb},${0.55*p})`; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*4*p,0,Math.PI*2);
        ctx.fillStyle=`rgba(${rgb},${0.04*p})`; ctx.fill();
      });
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf.current);
  }, [width, height, density, color]);
  return <canvas ref={ref} width={width} height={height} style={{position:'absolute',inset:0,pointerEvents:'none'}}/>;
}

// ── World data ───────────────────────────────────────────────
const WORLDS = [
  { id:'w0', label:'W0', name:'NeuroBasics',       icon:'🧬', color:'#F472B6', bg:'rgba(244,114,182,0.12)', active:true },
  { id:'w1', label:'W1', name:'Python Village',     icon:'🏘️', color:'#FF8C42', bg:'rgba(255,140,66,0.12)',  done:true   },
  { id:'w2', label:'W2', name:'Math Mountains',     icon:'⛰️', color:'#4ECDC4', bg:'rgba(78,205,196,0.12)', active:true },
  { id:'w3', label:'W3', name:'Stats Swamps',       icon:'🌿', color:'#95E1D3', bg:'rgba(149,225,211,0.10)' },
  { id:'w4', label:'W4', name:'Neuro Jungle',       icon:'🌴', color:'#6BCF7F', bg:'rgba(107,207,127,0.10)' },
  { id:'w5', label:'W5', name:'Computation Caves',  icon:'🪨', color:'#9B59FF', bg:'rgba(155,89,255,0.10)'  },
  { id:'w6', label:'W6', name:'Consciousness',      icon:'🔮', color:'#A78BFA', bg:'rgba(167,139,250,0.10)', soon:true   },
];

// ── Stat Badge ───────────────────────────────────────────────
function StatBadge({ icon, value, label }) {
  return (
    <div style={{flex:1, background:'rgba(255,255,255,0.03)', borderRadius:14, padding:'14px 8px', textAlign:'center', border:'1px solid rgba(255,255,255,0.06)'}}>
      <div style={{fontSize:22, marginBottom:4}}>{icon}</div>
      <div style={{fontSize:22, fontWeight:800, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif"}}>{value}</div>
      <div style={{fontSize:11, color:'#6A70A0', fontWeight:600, marginTop:2}}>{label}</div>
    </div>
  );
}

// ── Home Screen Phone ─────────────────────────────────────────
function HomePhone({ tweaks = {} }) {
  const { accentColor='#00DCFF', neuronDensity=0.5, ilyaSize=88, greeting='cheerful' } = tweaks;
  const greetings = {
    cheerful: "Good morning! 3 quests until your next level! 🧠",
    calm:     "Welcome back. Your review queue has 5 cards waiting.",
    excited:  "YOU'RE ON A 7-DAY STREAK!! Let's go!! 🔥🔥🔥",
  };
  const W = 390, H = 844;
  return (
    <div style={{width:W, height:H, background:'#080A18', position:'relative', overflow:'hidden', fontFamily:"'Inter',sans-serif", borderRadius:40, flexShrink:0}}>
      <NeuronCanvas width={W} height={H} density={neuronDensity} color={accentColor}/>

      {/* ── Top bar ── */}
      <div style={{position:'relative', zIndex:2, padding:'18px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div style={{width:32, height:32, borderRadius:10, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>🦌</div>
          <span style={{fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:17, color:'#F0F0FF', letterSpacing:'-0.3px'}}>NeuroQuest</span>
        </div>
        <div style={{display:'flex', gap:10}}>
          <div style={{display:'flex', alignItems:'center', gap:5, background:'rgba(255,136,0,0.12)', border:'1px solid rgba(255,136,0,0.3)', borderRadius:20, padding:'5px 12px'}}>
            <span style={{fontSize:15}}>🔥</span>
            <span style={{fontSize:13, fontWeight:700, color:'#FF8800'}}>7</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:5, background:'rgba(255,215,0,0.1)', border:'1px solid rgba(255,215,0,0.3)', borderRadius:20, padding:'5px 12px'}}>
            <span style={{fontSize:15}}>⭐</span>
            <span style={{fontSize:13, fontWeight:700, color:'#FFD700'}}>1,240</span>
          </div>
        </div>
      </div>

      {/* ── XP bar ── */}
      <div style={{position:'relative', zIndex:2, padding:'10px 20px 0'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:5}}>
          <span style={{fontSize:11, color:'#5A5E8A', fontWeight:600}}>LV 3 · DENDRITE DRIFTER</span>
          <span style={{fontSize:11, color:'#5A5E8A', fontWeight:600}}>240 / 300 XP</span>
        </div>
        <div style={{height:5, background:'rgba(255,255,255,0.06)', borderRadius:99}}>
          <div style={{height:'100%', width:'80%', background:`linear-gradient(90deg, ${accentColor}, #58CC02)`, borderRadius:99, boxShadow:`0 0 8px ${accentColor}66`}}/>
        </div>
      </div>

      {/* ── Ilya greeting ── */}
      <div style={{position:'relative', zIndex:2, padding:'18px 20px 0', display:'flex', alignItems:'flex-end', gap:12}}>
        <div style={{animation:'float 3s ease-in-out infinite'}}>
          <IlyaSVG state="idle" size={ilyaSize}/>
        </div>
        <div style={{flex:1, background:'linear-gradient(135deg,#12143A,#1C1E48)', border:'1px solid rgba(53,56,112,0.8)', borderRadius:'20px 20px 20px 4px', padding:'13px 15px', boxShadow:'0 4px 24px rgba(0,0,0,0.4)'}}>
          <p style={{margin:0, fontSize:13.5, fontWeight:700, color:'#E8E8FF', lineHeight:1.55, fontFamily:"'Nunito',sans-serif"}}>
            {greetings[greeting]}
          </p>
        </div>
      </div>

      {/* ── Daily Review card ── */}
      <div style={{position:'relative', zIndex:2, margin:'16px 20px 0'}}>
        <div style={{background:`linear-gradient(135deg, rgba(0,220,255,0.08), rgba(0,180,220,0.04))`, border:`1px solid ${accentColor}33`, borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:`0 0 20px rgba(0,220,255,0.06)`}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:40, height:40, borderRadius:12, background:`${accentColor}22`, border:`1px solid ${accentColor}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20}}>🔄</div>
            <div>
              <div style={{fontSize:14, fontWeight:800, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif"}}>Daily Review</div>
              <div style={{fontSize:12, color:'#6A70A0', marginTop:2}}>5 cards waiting · est. 4 min</div>
            </div>
          </div>
          <div style={{width:28, height:28, borderRadius:8, background:accentColor, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:13, fontWeight:800}}>›</div>
        </div>
      </div>

      {/* ── Continue Quest ── */}
      <div style={{position:'relative', zIndex:2, margin:'10px 20px 0'}}>
        <div style={{background:'linear-gradient(135deg,rgba(78,205,196,0.08),rgba(78,205,196,0.03))', border:'1px solid rgba(78,205,196,0.25)', borderRadius:16, padding:'14px 16px', cursor:'pointer'}}>
          <div style={{fontSize:11, fontWeight:700, color:'#4ECDC4', letterSpacing:'0.5px', marginBottom:4}}>MATH MOUNTAINS · QUEST 2.3</div>
          <div style={{fontSize:15, fontWeight:800, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif", marginBottom:10}}>Dot Product Intuition</div>
          <div style={{height:5, background:'rgba(255,255,255,0.06)', borderRadius:99}}>
            <div style={{height:'100%', width:'42%', background:'linear-gradient(90deg,#4ECDC4,#45B7A8)', borderRadius:99, boxShadow:'0 0 8px rgba(78,205,196,0.4)'}}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:6}}>
            <span style={{fontSize:11, color:'#4ECDC4', fontWeight:600}}>6 / 14 quests</span>
            <span style={{fontSize:11, color:'#FFD700', fontWeight:700}}>+25 XP</span>
          </div>
        </div>
      </div>

      {/* ── Your Journey ── */}
      <div style={{position:'relative', zIndex:2, padding:'16px 20px 0'}}>
        <div style={{fontSize:11, fontWeight:700, color:'#4A4E78', letterSpacing:'1px', marginBottom:10}}>YOUR JOURNEY</div>
        <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
          {WORLDS.map(w => (
            <div key={w.id} style={{flexShrink:0, width:64, height:64, borderRadius:16, background:w.done||w.active?w.bg:'rgba(255,255,255,0.03)', border:`1px solid ${w.done||w.active?w.color+'44':'rgba(255,255,255,0.08)'}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2, cursor:'pointer', position:'relative'}}>
              <span style={{fontSize:20}}>{w.icon}</span>
              <span style={{fontSize:9, fontWeight:700, color:w.done||w.active?w.color:'#5A608A'}}>{w.label}</span>
              {w.done && <div style={{position:'absolute', top:3, right:3, width:14, height:14, borderRadius:99, background:'#58CC02', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'white', fontWeight:900}}>✓</div>}
              {w.soon && <div style={{position:'absolute', top:3, right:3, fontSize:8, fontWeight:700, color:'#A78BFA', background:'rgba(167,139,250,0.15)', borderRadius:6, padding:'1px 4px'}}>soon</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{position:'relative', zIndex:2, padding:'14px 20px 0', display:'flex', gap:8}}>
        <StatBadge icon="📖" value={6}  label="Quests done"/>
        <StatBadge icon="🔥" value={7}  label="Day streak"/>
        <StatBadge icon="🏆" value={3}  label="Best streak"/>
      </div>

      {/* ── NMA Prep banner ── */}
      <div style={{position:'relative', zIndex:2, margin:'14px 20px 0'}}>
        <div style={{background:'rgba(155,89,255,0.08)', border:'1px solid rgba(155,89,255,0.2)', borderRadius:14, padding:'12px 14px', display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:22}}>🧠</span>
          <div>
            <div style={{fontSize:12, fontWeight:800, color:'#C084FF', fontFamily:"'Nunito',sans-serif"}}>NMA Prep — 4 Weeks</div>
            <div style={{fontSize:11, color:'#6A70A0'}}>Complete all worlds to be NMA-ready</div>
          </div>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, zIndex:10, background:'rgba(8,10,24,0.95)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.06)', height:80, display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 10px 12px'}}>
        {[['🏠','Home',true],['🗺️','Map',false],['🔄','Review',false],['👤','Me',false]].map(([ic,lb,active])=>(
          <div key={lb} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4, opacity:active?1:0.45, cursor:'pointer'}}>
            <span style={{fontSize:22}}>{ic}</span>
            <span style={{fontSize:10, fontWeight:700, color:active?accentColor:'#6A70A0'}}>{lb}</span>
            {active && <div style={{width:4, height:4, borderRadius:99, background:accentColor}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Home Screen Desktop ───────────────────────────────────────
function HomeDesktop({ tweaks = {} }) {
  const { accentColor='#00DCFF', neuronDensity=0.5, ilyaSize=110, greeting='cheerful' } = tweaks;
  const greetings = {
    cheerful: "Good morning! 3 quests until Level 4 🧠",
    calm:     "Welcome back. Your review queue has 5 cards.",
    excited:  "7-DAY STREAK! You're unstoppable 🔥",
  };
  const W = 1100, H = 700;
  return (
    <div style={{width:W, height:H, background:'#080A18', position:'relative', overflow:'hidden', fontFamily:"'Inter',sans-serif", borderRadius:16, flexShrink:0}}>
      <NeuronCanvas width={W} height={H} density={neuronDensity * 1.4} color={accentColor}/>

      {/* Sidebar */}
      <div style={{position:'absolute', left:0, top:0, bottom:0, width:220, zIndex:5, background:'rgba(8,10,24,0.7)', backdropFilter:'blur(20px)', borderRight:'1px solid rgba(255,255,255,0.06)', padding:'24px 0', display:'flex', flexDirection:'column', gap:4}}>
        <div style={{padding:'0 20px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', marginBottom:8}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <span style={{fontSize:20}}>🦌</span>
            <span style={{fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18, color:'#F0F0FF'}}>NeuroQuest</span>
          </div>
        </div>
        {[['🏠','Home',true],['🗺️','Map',false],['🔄','Review',false],['🏅','Badges',false],['👤','Profile',false]].map(([ic,lb,active])=>(
          <div key={lb} style={{padding:'10px 20px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', background:active?`${accentColor}11`:'transparent', borderLeft:`3px solid ${active?accentColor:'transparent'}`}}>
            <span style={{fontSize:18}}>{ic}</span>
            <span style={{fontSize:13, fontWeight:700, color:active?accentColor:'#6A70A0'}}>{lb}</span>
          </div>
        ))}
        <div style={{flex:1}}/>
        {/* Streak + XP */}
        <div style={{padding:'16px 20px', borderTop:'1px solid rgba(255,255,255,0.05)'}}>
          <div style={{display:'flex', gap:8, marginBottom:10}}>
            <div style={{flex:1, background:'rgba(255,136,0,0.1)', border:'1px solid rgba(255,136,0,0.25)', borderRadius:10, padding:'8px 6px', textAlign:'center'}}>
              <div style={{fontSize:18}}>🔥</div>
              <div style={{fontSize:14, fontWeight:800, color:'#FF8800'}}>7</div>
            </div>
            <div style={{flex:1, background:'rgba(255,215,0,0.08)', border:'1px solid rgba(255,215,0,0.25)', borderRadius:10, padding:'8px 6px', textAlign:'center'}}>
              <div style={{fontSize:18}}>⭐</div>
              <div style={{fontSize:14, fontWeight:800, color:'#FFD700'}}>1.2k</div>
            </div>
          </div>
          <div style={{fontSize:10, color:'#4A4E78', marginBottom:5, fontWeight:600}}>LV3 · 240/300 XP</div>
          <div style={{height:4, background:'rgba(255,255,255,0.06)', borderRadius:99}}>
            <div style={{height:'100%', width:'80%', background:`linear-gradient(90deg,${accentColor},#58CC02)`, borderRadius:99}}/>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{position:'absolute', left:220, top:0, right:0, bottom:0, zIndex:3, overflowY:'auto', padding:'28px 32px'}}>
        {/* Header */}
        <div style={{display:'flex', alignItems:'flex-end', gap:20, marginBottom:28}}>
          <div style={{animation:'float 3s ease-in-out infinite'}}>
            <IlyaSVG state="idle" size={ilyaSize}/>
          </div>
          <div>
            <div style={{fontSize:22, fontWeight:900, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif", marginBottom:6}}>{greetings[greeting]}</div>
            <div style={{fontSize:13, color:'#6A70A0'}}>Monday, April 20 · Week 2 of 4</div>
          </div>
        </div>

        {/* 2-col grid */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20}}>
          {/* Daily Review */}
          <div style={{background:`linear-gradient(135deg, rgba(0,220,255,0.08), rgba(0,180,220,0.03))`, border:`1px solid ${accentColor}33`, borderRadius:18, padding:'18px 20px', cursor:'pointer', boxShadow:`0 0 30px rgba(0,220,255,0.05)`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
              <div style={{fontSize:32}}>🔄</div>
              <div style={{fontSize:12, fontWeight:700, color:accentColor}}>5 CARDS</div>
            </div>
            <div style={{fontSize:17, fontWeight:800, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif"}}>Daily Review</div>
            <div style={{fontSize:12, color:'#6A70A0', marginTop:4}}>Keep your memory sharp · ~4 min</div>
          </div>

          {/* Continue Quest */}
          <div style={{background:'linear-gradient(135deg,rgba(78,205,196,0.08),rgba(78,205,196,0.03))', border:'1px solid rgba(78,205,196,0.25)', borderRadius:18, padding:'18px 20px', cursor:'pointer'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
              <div style={{fontSize:32}}>⛰️</div>
              <div style={{fontSize:12, fontWeight:700, color:'#4ECDC4'}}>+25 XP</div>
            </div>
            <div style={{fontSize:11, fontWeight:700, color:'#4ECDC4', marginBottom:4, letterSpacing:'0.5px'}}>MATH MOUNTAINS</div>
            <div style={{fontSize:17, fontWeight:800, color:'#F0F0FF', fontFamily:"'Nunito',sans-serif"}}>Dot Product Intuition</div>
            <div style={{height:4, background:'rgba(255,255,255,0.06)', borderRadius:99, marginTop:10}}>
              <div style={{height:'100%', width:'42%', background:'linear-gradient(90deg,#4ECDC4,#45B7A8)', borderRadius:99}}/>
            </div>
            <div style={{fontSize:11, color:'#4ECDC4', marginTop:6}}>Quest 6 of 14</div>
          </div>
        </div>

        {/* Worlds */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11, fontWeight:700, color:'#4A4E78', letterSpacing:'1px', marginBottom:12}}>YOUR JOURNEY</div>
          <div style={{display:'flex', gap:10}}>
            {WORLDS.map(w => (
              <div key={w.id} style={{flex:1, background:w.done||w.active?w.bg:'rgba(255,255,255,0.02)', border:`1px solid ${w.done||w.active?w.color+'44':'rgba(255,255,255,0.07)'}`, borderRadius:14, padding:'12px 8px', textAlign:'center', cursor:'pointer', transition:'all 0.2s', position:'relative'}}>
                <div style={{fontSize:24, marginBottom:3}}>{w.icon}</div>
                <div style={{fontSize:9, fontWeight:800, color:w.done||w.active?w.color:'#5A608A'}}>{w.label}</div>
                {w.done && <div style={{position:'absolute', top:5, right:5, fontSize:10}}>✅</div>}
                {w.active && <div style={{width:5, height:5, borderRadius:99, background:w.color, margin:'5px auto 0', boxShadow:`0 0 6px ${w.color}`}}/>}
                {w.soon && <div style={{position:'absolute', top:4, right:4, fontSize:8, fontWeight:700, color:'#A78BFA', background:'rgba(167,139,250,0.15)', borderRadius:6, padding:'1px 4px'}}>soon</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'flex', gap:12}}>
          <StatBadge icon="📖" value={6}  label="Quests done"/>
          <StatBadge icon="🔥" value={7}  label="Day streak"/>
          <StatBadge icon="🏆" value={3}  label="Best streak"/>
          <StatBadge icon="⚡" value={8}  label="Avg session min"/>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NeuronCanvas, HomePhone, HomeDesktop });
