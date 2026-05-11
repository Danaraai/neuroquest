// nq-ilya.jsx — Redesigned Ilya the Deer, more expressive

function IlyaSVG({ state = 'idle', size = 100 }) {
  const isHappy = state === 'correct' || state === 'celebrate';
  const isSad   = state === 'wrong'   || state === 'sad';
  const isRun   = state === 'run';

  return (
    <svg viewBox="0 0 100 118" width={size} height={size * 1.18} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Antlers ── */}
      <g stroke="#C8913A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 30 L23 10 L17 3"/>
        <path d="M23 10 L17 18"/>
        <path d="M28 22 L22 14"/>
        <path d="M66 30 L77 10 L83 3"/>
        <path d="M77 10 L83 18"/>
        <path d="M72 22 L78 14"/>
      </g>
      {isHappy && <>
        <circle cx="17" cy="3"  r="3.5" fill="#FFD700" opacity="0.95"/>
        <circle cx="83" cy="3"  r="3.5" fill="#FFD700" opacity="0.95"/>
        <circle cx="17" cy="18" r="2"   fill="#FFD700" opacity="0.7"/>
        <circle cx="83" cy="18" r="2"   fill="#FFD700" opacity="0.7"/>
      </>}

      {/* ── Ears ── */}
      <ellipse cx="27" cy="40" rx="8" ry="11" fill="#F5EFD8" transform="rotate(-15 27 40)"/>
      <ellipse cx="27" cy="40" rx="5" ry="7"  fill="#F0B8B0" transform="rotate(-15 27 40)"/>
      <ellipse cx="73" cy="40" rx="8" ry="11" fill="#F5EFD8" transform="rotate(15 73 40)"/>
      <ellipse cx="73" cy="40" rx="5" ry="7"  fill="#F0B8B0" transform="rotate(15 73 40)"/>

      {/* ── Head ── */}
      <ellipse cx="50" cy="50" rx="25" ry="23" fill="#F5EFD8"/>

      {/* ── Cheeks ── */}
      <circle cx="30" cy="54" r="9" fill="#F5A0A8" opacity="0.45"/>
      <circle cx="70" cy="54" r="9" fill="#F5A0A8" opacity="0.45"/>

      {/* ── Eyes (symmetric around cx=50) ── */}
      {isHappy ? (
        <g>
          <path d="M37 48 Q43 43 49 48" stroke="#2D2040" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M51 48 Q57 43 63 48" stroke="#2D2040" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="37" cy="44" r="2" fill="#FFD700"/>
          <circle cx="63" cy="44" r="2" fill="#FFD700"/>
        </g>
      ) : isSad ? (
        <g>
          <ellipse cx="43" cy="49" rx="6" ry="6.5" fill="#2D2040"/>
          <ellipse cx="57" cy="49" rx="6" ry="6.5" fill="#2D2040"/>
          <circle cx="45.5" cy="47" r="2"   fill="white"/>
          <circle cx="59.5" cy="47" r="2"   fill="white"/>
          <path d="M38 45 L43 42 L48 45" stroke="#2D2040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M52 45 L57 42 L62 45" stroke="#2D2040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </g>
      ) : (
        <g>
          <ellipse cx="43" cy="49" rx="6.5" ry="7" fill="#2D2040"/>
          <ellipse cx="57" cy="49" rx="6.5" ry="7" fill="#2D2040"/>
          <circle cx="45.5" cy="46.5" r="2.2" fill="white"/>
          <circle cx="59.5" cy="46.5" r="2.2" fill="white"/>
          <circle cx="47"   cy="48"   r="1"   fill="white" opacity="0.7"/>
          <circle cx="61"   cy="48"   r="1"   fill="white" opacity="0.7"/>
        </g>
      )}

      {/* ── Nose ── */}
      <rect x="43" y="57" width="14" height="9" rx="4.5" fill="#E09090"/>
      <circle cx="47" cy="60" r="1.8" fill="white" opacity="0.55"/>

      {/* ── Mouth ── */}
      {isSad
        ? <path d="M44 68 Q50 64 56 68" stroke="#B87868" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        : <path d="M44 67 Q50 73 56 67" stroke="#B87868" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      }

      {/* ── Body ── */}
      <ellipse cx="50" cy="95" rx="21" ry="22" fill="#F5EFD8"/>
      <ellipse cx="50" cy="93" rx="12" ry="15" fill="#ECE8DC"/>

      {/* ── Tail ── */}
      <ellipse cx="71" cy="87" rx="5.5" ry="7" fill="white" opacity="0.95"/>

      {/* ── Spots ── */}
      <circle cx="44" cy="92" r="3"   fill="#E8E0CF" opacity="0.7"/>
      <circle cx="57" cy="96" r="2.5" fill="#E8E0CF" opacity="0.6"/>

      {/* ── Legs ── */}
      <g style={isRun ? {transformOrigin:'41px 108px', animation:'ilya-leg-l 0.4s ease-in-out infinite alternate'} : {}}>
        <rect x="37" y="108" width="9" height="13" rx="4.5" fill="#F5EFD8"/>
        <ellipse cx="41.5" cy="121" rx="5.5" ry="3"  fill="#C8913A"/>
      </g>
      <g style={isRun ? {transformOrigin:'59px 108px', animation:'ilya-leg-r 0.4s ease-in-out infinite alternate'} : {}}>
        <rect x="54" y="108" width="9" height="13" rx="4.5" fill="#F5EFD8"/>
        <ellipse cx="58.5" cy="121" rx="5.5" ry="3"  fill="#C8913A"/>
      </g>

      {/* ── Thinking bubble ── */}
      {state === 'thinking' && <>
        <circle cx="88" cy="32" r="13" fill="#181A38" stroke="#252860" strokeWidth="1"/>
        <circle cx="82" cy="43" r="4.5" fill="#181A38" stroke="#252860" strokeWidth="1"/>
        <circle cx="78" cy="51" r="3"   fill="#181A38" stroke="#252860" strokeWidth="1"/>
        <text x="88" y="36" textAnchor="middle" fontSize="9" fill="#8890B0">...</text>
      </>}
    </svg>
  );
}

// IlyaBubble — Ilya + speech bubble side by side
function IlyaBubble({ message, state = 'idle', size = 72, right = false }) {
  return (
    <div style={{display:'flex', alignItems:'flex-end', gap:10, flexDirection: right ? 'row-reverse' : 'row'}}>
      <IlyaSVG state={state} size={size}/>
      <div style={{
        background: 'linear-gradient(135deg, #1A1C40, #222450)',
        border: '1px solid #353870',
        borderRadius: right ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        padding: '12px 16px',
        maxWidth: 260,
        boxShadow: '0 4px 24px rgba(0,220,255,0.08)',
      }}>
        <p style={{margin:0, fontSize:14, fontWeight:700, color:'#F0F0FF', lineHeight:1.5, fontFamily:"'Nunito', sans-serif"}}>
          {message}
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { IlyaSVG, IlyaBubble });
