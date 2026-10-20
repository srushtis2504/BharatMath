/* ═══════════════════════════════════════════════════
   BharatMath — Cinematic Timeline Engine
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── ERA image map ─────────────────────────────── */
const ERA_IMG = [
  'img/vedic.png',
  'img/sulba.png',
  'img/classical.png',
  'img/kerala.png',
  'img/ramanujan.png',
  'img/bg.png'          // fallback for demo era
];

const ERA_TAGLINES = [
  'Early Mathematical Traditions',
  'Rope geometry & √2',
  'Sanskrit texts and foundational theories',
  'Innovations and infinite series',
  'Continuing the legacy of genius',
  'Demo range — no verified events'
];

/* ─── State ─────────────────────────────────────── */
const TIMELINE_END = 2026; /* hard cap — nothing drawn past today */
const NOW_TL = 2026;
let vpTL = { a: 2006, b: 2046 };
let rafTL, W_TL = 1200, H_TL = 110;
let activeTLTab = 'overview';
let selectedEraIdx = -1;

const tlSvg    = document.getElementById('tl');
const tlCards  = document.getElementById('tl-cards');
const tlStage  = document.getElementById('tl-stage');

/* ─── Helpers ────────────────────────────────────── */
const fyTL = y => y < 0 ? `${Math.round(-y)} BCE` : `${Math.round(y)}`;
const XTL  = y => (y - vpTL.a) / (vpTL.b - vpTL.a) * W_TL;

function sizeTL() {
  W_TL = tlSvg.clientWidth  || 1200;
  H_TL = tlSvg.clientHeight || 110;
  tlSvg.setAttribute('viewBox', `0 0 ${W_TL} ${H_TL}`);
}

/* Clamp viewport so right edge never goes past TIMELINE_END */
function clampVP() {
  if (vpTL.b > TIMELINE_END) {
    const span = vpTL.b - vpTL.a;
    vpTL = { a: TIMELINE_END - span, b: TIMELINE_END };
  }
}

/* ─── Render SVG rail ────────────────────────────── */
function renderRail() {
  /* Hard-clamp: never draw past TIMELINE_END */
  const drawEnd = Math.min(vpTL.b, TIMELINE_END);
  const span = drawEnd - vpTL.a;
  const LY   = Math.round(H_TL * 0.42);
  const step = [1,2,5,10,20,50,100,200,500,1000]
    .find(v => v >= span / (W_TL < 600 ? 5 : 9)) || 1000;

  /* Right-edge clip x coordinate */
  const xEnd = XTL(TIMELINE_END);

  let o = `<defs>
    <filter id="rg"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="rs"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#e0ad4a" stop-opacity="0.05"/>
      <stop offset="4%"   stop-color="#e0ad4a" stop-opacity="1"/>
      <stop offset="96%"  stop-color="#e0ad4a" stop-opacity="1"/>
      <stop offset="100%" stop-color="#e0ad4a" stop-opacity="0.05"/>
    </linearGradient>
    <clipPath id="tlClip">
      <rect x="0" y="0" width="${Math.max(0, xEnd)}" height="${H_TL}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#tlClip)">
  <!-- Heavy gold rail -->
  <line x1="0" x2="${xEnd}" y1="${LY}" y2="${LY}"
    stroke="url(#railGrad)" stroke-width="22" stroke-linecap="round"/>
  <!-- Bright centre highlight -->
  <line x1="0" x2="${xEnd}" y1="${LY}" y2="${LY}"
    stroke="#fff8e0" stroke-width="4" stroke-linecap="round" opacity="0.22" filter="url(#rg)"/>
  <!-- Thin top sparkle -->
  <line x1="0" x2="${xEnd}" y1="${LY - 6}" y2="${LY - 6}"
    stroke="#f5c96a" stroke-width="2" stroke-linecap="round" opacity="0.35"/>`;

  /* Tick marks & year labels */
  for (let y = Math.ceil(vpTL.a / step) * step; y <= TIMELINE_END; y += step) {
    if (!y) continue;
    const x = XTL(y);
    if (x < 0 || x > xEnd) continue;
    o += `<line x1="${x}" x2="${x}" y1="${LY - 14}" y2="${LY + 14}"
      stroke="rgba(224,173,74,0.7)" stroke-width="2"/>
    <text x="${x}" y="${LY + 30}" fill="#b09060" font-size="11"
      text-anchor="middle" font-family="'Cinzel',serif">${fyTL(y)}</text>`;
  }

  /* Era boundary ticks */
  ERA.forEach(r => {
    [r.a, r.b].forEach(y => {
      if (y > TIMELINE_END) return;
      const x = XTL(y);
      if (x < 0 || x > xEnd) return;
      o += `<line x1="${x}" x2="${x}" y1="${LY - 22}" y2="${LY + 22}"
        stroke="rgba(224,173,74,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    });
  });

  /* Today marker exactly at TIMELINE_END */
  const nx = XTL(TIMELINE_END);
  if (nx >= 0 && nx <= W_TL) {
    o += `<g>
      <circle cx="${nx}" cy="${LY}" r="18" fill="rgba(255,255,255,0.1)" filter="url(#rg)"/>
      <circle cx="${nx}" cy="${LY}" r="9" fill="#f4e6cf"/>
      <circle cx="${nx}" cy="${LY}" r="4" fill="#e0ad4a"/>
      <text x="${nx}" y="${LY - 22}" fill="#f4e6cf" font-size="11"
        text-anchor="middle" font-family="'Cinzel',serif" opacity="0.85">Today ${TIMELINE_END}</text>
    </g>`;
  }

  /* Event dots */
  let lx = -999, row = 0;
  EV.forEach((v, i) => {
    if (v.y > TIMELINE_END) return;
    const x = XTL(v.y);
    if (x < -20 || x > xEnd + 20) return;
    const done   = S.done.includes(v.t);
    const col    = done ? '#7ecb6a' : '#e0ad4a';
    o += `<g data-ev="${i}" style="cursor:pointer" tabindex="0"
        role="button" aria-label="${v.t} — ${fyTL(v.y)}">
      <circle cx="${x}" cy="${LY}" r="20" fill="transparent"/>
      <circle cx="${x}" cy="${LY}" r="9"  fill="${col}" stroke="#080502" stroke-width="3" filter="url(#rs)"/>
      ${done ? `<text x="${x}" y="${LY + 4}" fill="#080502" font-size="8" text-anchor="middle" font-weight="700">✓</text>` : ''}`;

    if (x - lx > 150 && x > 40 && x < xEnd - 20) {
      const label = v.t.length > 20 ? v.t.slice(0, 18) + '…' : v.t;
      const ty = LY + (row % 2 ? 62 : 44);
      o += `<text x="${x}" y="${ty}" fill="rgba(244,230,207,0.85)" font-size="11"
        text-anchor="middle" font-family="'Inter',sans-serif">${label}</text>
      <line x1="${x}" x2="${x}" y1="${LY + 10}" y2="${ty - 8}"
        stroke="rgba(224,173,74,0.3)" stroke-width="1" stroke-dasharray="3 2"/>`;
      lx = x; row++;
    }
    o += '</g>';
  });

  o += '</g>'; /* end clipPath group */
  tlSvg.innerHTML = o;
}

/* ─── Position era image cards ───────────────────── */
function renderCards() {
  if (activeTLTab !== 'overview') return; // Only show in overview

  tlCards.innerHTML = '';

  ERA.forEach((r, i) => {
    /* Compute pixel positions on current viewport */
    const x1Pct = ((r.a - vpTL.a) / (vpTL.b - vpTL.a)) * 100;
    const x2Pct = ((r.b - vpTL.a) / (vpTL.b - vpTL.a)) * 100;
    const wPct  = x2Pct - x1Pct;

    if (x2Pct < -2 || x1Pct > 102) return; // off screen

    const card = document.createElement('div');
    card.className = 'era-card' + (selectedEraIdx === i ? ' selected' : '');
    card.setAttribute('data-era', i);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${r.n}`);
    card.style.left  = `${Math.max(0, x1Pct)}%`;
    card.style.width = `${Math.min(100, x2Pct) - Math.max(0, x1Pct)}%`;

    const img = document.createElement('img');
    img.src    = ERA_IMG[i] || 'img/bg.png';
    img.alt    = r.n;
    img.draggable = false;

    const label = document.createElement('div');
    label.className = 'era-card-label';
    label.innerHTML = `
      <div class="era-card-name">${r.n}</div>
      <div class="era-card-tagline">${ERA_TAGLINES[i] || ''}</div>`;

    card.appendChild(img);
    card.appendChild(label);
    tlCards.appendChild(card);

    card.addEventListener('click', e => {
      if (tlMoved) return;
      selectedEraIdx = i;
      renderCards();
      openEra(i);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectedEraIdx = i; renderCards(); openEra(i); }
    });
  });

  /* Golden dividers between eras */
  ERA.forEach((r, i) => {
    if (i === ERA.length - 1) return;
    const xPct = ((r.b - vpTL.a) / (vpTL.b - vpTL.a)) * 100;
    if (xPct < 0 || xPct > 100) return;
    const div = document.createElement('div');
    div.className = 'era-divider';
    div.style.left = `${xPct}%`;
    tlCards.appendChild(div);
  });
}

function render() {
  hideEvPreview();   /* dots are rebuilt on every render, so drop any stale preview */
  renderRail();
  renderCards();
}

/* ─── Animated pan/zoom ─────────────────────────── */
function goTL(a, b, D, done) {
  /* Never animate past TIMELINE_END */
  if (b > TIMELINE_END) { b = TIMELINE_END; a = Math.min(a, b - 8); }
  cancelAnimationFrame(rafTL);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !D) { vpTL = { a, b }; clampVP(); render(); done && done(); return; }
  const c0 = (vpTL.a + vpTL.b) / 2, s0 = Math.log(vpTL.b - vpTL.a);
  const c1 = (a + b) / 2,            s1 = Math.log(b - a);
  const t0 = performance.now();
  (function f(t) {
    let p = Math.min(1, (t - t0) / D);
    p = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2, 3) / 2;
    const c = c0 + (c1 - c0) * p;
    const s = Math.exp(s0 + (s1 - s0) * p);
    vpTL = { a: c - s/2, b: c + s/2 };
    clampVP();
    render();
    if (p < 1) rafTL = requestAnimationFrame(f);
    else done && done();
  })(t0);
}

function zoomTL(f, cx) {
  const c = cx ?? (vpTL.a + vpTL.b) / 2;
  const n = Math.min(5000, Math.max(8, (vpTL.b - vpTL.a) * f));
  const r = (c - vpTL.a) / (vpTL.b - vpTL.a);
  cancelAnimationFrame(rafTL);
  vpTL = { a: c - n * r, b: c + n * (1 - r) };
  clampVP();
  render();
}

/* ─── Travel animation ───────────────────────────── */
function travelTL() {
  showScreen('tls', () => {
    sizeTL();
    /* Start viewport near today, then sweep to the ancient past */
    vpTL = { a: 1880, b: TIMELINE_END };
    render();
    tlSvg.focus({ preventScroll: true });
    say('Drag the golden rail to explore. Click an era image or glowing dot to dive in. 🏛️', true);
    setTimeout(() => goTL(-1600, -500, 5000), 800);
  });
}

/* ─── openEra / openEv (delegates to app.js) ──────── */
function openEraTL(i, ev) {
  const r = ERA[i], cur = vpTL.b - vpTL.a, h = (r.b - r.a) * 1.2;
  goTL(r.a - cur/2, r.a + cur/2, 500, () =>
    goTL(r.a - h, r.a + h, 700, () =>
      playAnim(i, r.a, () => showEra(i, ev))));
}

function openEvTL(i) {
  const v = EV[i];
  goTL(v.y - 80, v.y + 80, 900, () =>
    playAnim(v.era, v.y, () => showEra(v.era, i)));
}

/* Override app.js references */
window.openEra = openEraTL;
window.openEv  = openEvTL;
window.travel  = travelTL;

/* ─── Pointer / touch / wheel handling ─────────── */
let tlMoved = 0, tlPinch = 0;
const tlPtrs = new Map();

tlSvg.addEventListener('click', e => {
  if (tlMoved) return;
  const g = e.target.closest('[data-ev]');
  if (g) openEvTL(+g.dataset.ev);
});

tlSvg.addEventListener('keydown', e => {
  const g = e.target.closest('[data-ev]');
  if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openEvTL(+g.dataset.ev); }
});

const tlDown = e => {
  tlPtrs.set(e.pointerId, e);
  tlMoved = 0;
  if (tlPtrs.size === 2) {
    const [a, b] = [...tlPtrs.values()];
    tlPinch = Math.abs(a.clientX - b.clientX);
  }
};
tlSvg.addEventListener('pointerdown', tlDown);
tlCards.addEventListener('pointerdown', tlDown);

window.addEventListener('pointermove', e => {
  if (!tlPtrs.has(e.pointerId)) return;
  const old = tlPtrs.get(e.pointerId);

  if (tlPtrs.size === 2) {
    tlPtrs.set(e.pointerId, e);
    const [a, b] = [...tlPtrs.values()];
    const d = Math.abs(a.clientX - b.clientX);
    if (tlPinch && d) zoomTL(tlPinch / d);
    tlPinch = d;
    tlMoved = 1;
    return;
  }

  const dx = e.clientX - old.clientX;
  if (!tlMoved && Math.abs(dx) > 4) tlMoved = 1;
  if (tlMoved) {
    const k = (vpTL.b - vpTL.a) / W_TL;
    cancelAnimationFrame(rafTL);
    vpTL = { a: vpTL.a - dx * k, b: vpTL.b - dx * k };
    clampVP();
    render();
    tlPtrs.set(e.pointerId, e);
  }
});

window.addEventListener('pointerup', e => {
  tlPtrs.delete(e.pointerId);
  setTimeout(() => tlMoved = 0, 0);
});

/* Wheel zoom */
function tlWheelHandler(e) {
  if (!(e.ctrlKey || e.metaKey || e.deltaMode === 0)) return;
  e.preventDefault();
  const rect = tlStage.getBoundingClientRect();
  const cy   = vpTL.a + (e.clientX - rect.left) / rect.width * (vpTL.b - vpTL.a);
  zoomTL(e.deltaY > 0 ? 1.18 : 1 / 1.18, cy);
}
tlSvg.addEventListener('wheel', tlWheelHandler, { passive: false });
tlStage.addEventListener('wheel', tlWheelHandler, { passive: false });

/* Keyboard pan/zoom */
tlSvg.addEventListener('keydown', e => {
  const k = (vpTL.b - vpTL.a) * 0.12;
  switch (e.key) {
    case 'ArrowLeft':  vpTL = { a: vpTL.a - k, b: vpTL.b - k }; break;
    case 'ArrowRight': vpTL = { a: vpTL.a + k, b: vpTL.b + k }; break;
    case '+': case '=': zoomTL(0.65); e.preventDefault(); return;
    case '-':           zoomTL(1 / 0.65); e.preventDefault(); return;
    default: return;
  }
  e.preventDefault();
  clampVP();
  render();
});

/* ─── Zoom & nav buttons ─────────────────────────── */
const zrTL = f => {
  const c = (vpTL.a + vpTL.b) / 2;
  const h = Math.min(5000, Math.max(8, (vpTL.b - vpTL.a) * f)) / 2;
  goTL(c - h, c + h, 500);
};

document.getElementById('zi').onclick = () => zrTL(0.5);
document.getElementById('zo').onclick = () => zrTL(2);

function hopTL(dir) {
  const c    = (vpTL.a + vpTL.b) / 2;
  const mids = ERA.map(r => (r.a + r.b) / 2);
  const t    = dir > 0
    ? mids.find(x => x > c + 1)
    : [...mids].reverse().find(x => x < c - 1);
  if (t === undefined) return;
  const r = ERA[mids.indexOf(t)];
  const s = Math.max((r.b - r.a) * 3, 300);
  goTL(t - s/2, t + s/2, 900);
}

document.getElementById('ne').onclick = () => hopTL(1);
document.getElementById('pe').onclick = () => hopTL(-1);

document.getElementById('tn').onclick = travelTL;

document.getElementById('home2').onclick = () => {
  cancelAnimationFrame(rafTL);
  document.getElementById('cat').classList.remove('on');
  showScreen('home');
  updateHomeStats();
};

document.getElementById('start').onclick = travelTL;

/* ─── Tab switching ─────────────────────────────── */
document.querySelectorAll('.tl-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tl-tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    activeTLTab = btn.dataset.tab;
    switchTab(activeTLTab);
  });
});

function switchTab(tab) {
  /* Remove old panel if any */
  document.getElementById('tl-panel')?.remove();
  tlCards.style.display  = '';
  document.querySelector('.tl-rail-wrap').style.display = '';
  document.querySelector('.tl-drag-hint').style.display = '';

  if (tab === 'era') {
    showEraGrid();
  } else if (tab === 'event') {
    showEventList();
  }
  // overview: just render
  render();
}

function makePanel() {
  const p = document.createElement('div');
  p.className = 'tl-list-panel';
  p.id = 'tl-panel';
  tlStage.appendChild(p);
  tlCards.style.display = 'none';
  document.querySelector('.tl-rail-wrap').style.display = 'none';
  document.querySelector('.tl-drag-hint').style.display = 'none';
  return p;
}

function showEraGrid() {
  const p = makePanel();
  const grid = document.createElement('div');
  grid.className = 'era-grid';
  ERA.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'era-grid-card';
    card.innerHTML = `
      <img src="${ERA_IMG[i]}" alt="${r.n}">
      <div class="era-grid-info">
        <div class="era-grid-name">${r.n}</div>
        <div class="era-grid-dates">${fyTL(r.a)} – ${fyTL(r.b)}</div>
      </div>`;
    card.onclick = () => openEraTL(i);
    grid.appendChild(card);
  });
  p.appendChild(grid);
}

function showEventList() {
  const p = makePanel();
  const list = document.createElement('div');
  list.className = 'event-list';
  EV.forEach((v, i) => {
    const done = S.done.includes(v.t);
    const row  = document.createElement('div');
    row.className = 'event-row' + (done ? ' done' : '');
    row.innerHTML = `
      <div class="event-dot"></div>
      <div class="event-year">${fyTL(v.y)}</div>
      <div>
        <div class="event-title">${v.t}</div>
        <div class="event-who">${v.who}</div>
      </div>`;
    row.onclick = () => openEvTL(i);
    list.appendChild(row);
  });
  p.appendChild(list);
}

/* ─── Search ─────────────────────────────────────── */
const tlSearch = document.getElementById('tl-search');

function buildSearchResults(q) {
  let panel = document.getElementById('search-results');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'search-results';
    document.getElementById('tls').appendChild(panel);
  }
  if (!q) { panel.classList.remove('open'); return; }

  const lq   = q.toLowerCase();
  const hits = EV.filter(v =>
    v.t.toLowerCase().includes(lq) ||
    v.who.toLowerCase().includes(lq) ||
    v.c.toLowerCase().includes(lq)
  );

  if (!hits.length) {
    panel.innerHTML = `<div class="sr-empty">No results for "<strong>${q}</strong>"</div>`;
  } else {
    panel.innerHTML = hits.map((v, i) => {
      const k = EV.indexOf(v);
      return `<div class="sr-item" data-ev="${k}">
        <div class="sr-year">${fyTL(v.y)}</div>
        <div>
          <div class="sr-title">${v.t}</div>
          <div class="sr-era">${ERA[v.era]?.n || ''} · ${v.who}</div>
        </div>
      </div>`;
    }).join('');
    panel.querySelectorAll('.sr-item').forEach(el => {
      el.addEventListener('click', () => {
        openEvTL(+el.dataset.ev);
        panel.classList.remove('open');
        tlSearch.value = '';
      });
    });
  }

  panel.classList.add('open');
}

tlSearch.addEventListener('input', e => buildSearchResults(e.target.value.trim()));
tlSearch.addEventListener('keydown', e => { if (e.key === 'Escape') { buildSearchResults(''); tlSearch.value = ''; } });
document.addEventListener('click', e => {
  if (!e.target.closest('#search-results') && !e.target.closest('#tl-search')) {
    document.getElementById('search-results')?.classList.remove('open');
  }
});

/* ─── Hover preview: era image when hovering an event dot ─── */
const evPreview = document.createElement('div');
evPreview.id = 'ev-preview';
evPreview.setAttribute('aria-hidden', 'true');
evPreview.innerHTML = `
  <div class="evp-img"><img alt="" draggable="false"></div>
  <div class="evp-body">
    <div class="evp-year"></div>
    <div class="evp-title"></div>
    <div class="evp-who"></div>
    <div class="evp-era"></div>
  </div>`;
document.body.appendChild(evPreview);

const evpImg = evPreview.querySelector('img');
evpImg.addEventListener('error', () => {
  if (!evpImg.src.endsWith('img/bg.png')) evpImg.src = 'img/bg.png';
});

/* Preload so the picture is ready the instant you hover */
ERA_IMG.forEach(src => { const im = new Image(); im.src = src; });

let evpIdx = -1;

function showEvPreview(g) {
  const i = +g.dataset.ev, v = EV[i];
  if (!v) return;

  if (i !== evpIdx) {
    evpIdx = i;
    const eraIdx = v.era >= 0 ? v.era : ERA_IMG.length - 1;
    evpImg.src = ERA_IMG[eraIdx] || 'img/bg.png';
    evPreview.style.setProperty('--evp-col', (ERA[eraIdx] && ERA[eraIdx].color) || '#e0ad4a');
    evPreview.querySelector('.evp-year').textContent  = fyTL(v.y);
    evPreview.querySelector('.evp-title').textContent = v.t;
    evPreview.querySelector('.evp-who').textContent   = v.who;
    evPreview.querySelector('.evp-era').textContent   = ERA[eraIdx] ? ERA[eraIdx].n : '';
  }

  /* Anchor above the dot, clamped inside the viewport */
  const dot = g.querySelector('circle') || g;
  const r   = dot.getBoundingClientRect();
  const cx  = r.left + r.width / 2;
  const w   = evPreview.offsetWidth  || 270;
  const h   = evPreview.offsetHeight || 230;
  const left = Math.min(Math.max(8, cx - w / 2), window.innerWidth - w - 8);
  const top  = Math.max(8, r.top - h - 6);
  evPreview.style.left = `${left}px`;
  evPreview.style.top  = `${top}px`;
  /* little arrow points at the dot */
  evPreview.style.setProperty('--evp-arrow', `${Math.min(Math.max(18, cx - left), w - 18)}px`);
  evPreview.classList.add('show');
}

function hideEvPreview() {
  evPreview.classList.remove('show');
  evpIdx = -1;
}

/* Mouse / pen hover (delegated, because dots are re-created on every render) */
tlSvg.addEventListener('pointermove', e => {
  if (e.pointerType === 'touch' || tlPtrs.size || tlMoved) return; /* not while dragging */
  const g = e.target.closest && e.target.closest('[data-ev]');
  if (g) showEvPreview(g); else hideEvPreview();
});
tlSvg.addEventListener('pointerleave', hideEvPreview);
tlSvg.addEventListener('pointerdown',  hideEvPreview);

/* Keyboard: same preview when a dot gets focus */
tlSvg.addEventListener('focusin',  e => {
  const g = e.target.closest && e.target.closest('[data-ev]');
  if (g) showEvPreview(g);
});
tlSvg.addEventListener('focusout', hideEvPreview);

/* ─── Resize ─────────────────────────────────────── */
window.addEventListener('resize', () => {
  const tlsActive = document.getElementById('tls').classList.contains('active');
  if (tlsActive) { sizeTL(); render(); }
});

/* ─── Ticker (override app.js if running) ────────── */
let tickIdxTL = 0;
function rotateTickerTL() {
  const el = document.getElementById('ticker-text');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = TICKER_FACTS[tickIdxTL % TICKER_FACTS.length];
    el.style.opacity = '1';
    tickIdxTL++;
  }, 600);
}
rotateTickerTL();
setInterval(rotateTickerTL, 7000);

/* ─── Initial size ───────────────────────────────── */
sizeTL();