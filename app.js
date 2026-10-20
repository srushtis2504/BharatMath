/* ═══════════════════════════════════════════════════
   BharatMath — Application Logic
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── Utilities ─────────────────────────────────── */
const $ = s => document.querySelector(s);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Persistent state ──────────────────────────── */
let S = { xp: 0, done: [] };
try { S = Object.assign(S, JSON.parse(localStorage.getItem('bm4') || '{}')); } catch(_) {}
const save = () => { try { localStorage.setItem('bm4', JSON.stringify(S)); } catch(_) {} };

/* ─── Screen transitions ────────────────────────── */
/**
 * showScreen(id)
 * Fades out the current active screen and fades in the target screen.
 */
function showScreen(id, cb) {
  const next = document.getElementById(id);
  const cur  = document.querySelector('.screen.active');

  if (cur && cur !== next) {
    cur.classList.add('exit');
    cur.classList.remove('active');
    setTimeout(() => {
      cur.classList.remove('exit');
      cur.style.display = '';
    }, 420);
  }

  if (next) {
    // Force display before transition
    next.style.display = '';
    // Micro-delay to allow display to apply
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        next.classList.add('active');
        cb && cb();
      });
    });
  }
}

/* ─── Starfield canvas on home ──────────────────── */
(function initStars() {
  const canvas = $('#stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a = Math.max(0.05, Math.min(1, s.a + s.da));
      if (s.a <= 0.06 || s.a >= 0.99) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,186,100,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  window.addEventListener('resize', resize);
  drawStars();
})();

/* ─── Floating Devanagari digits ────────────────── */
(function initNumCloud() {
  const cloud = $('#num-cloud');
  if (!cloud) return;
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('span');
    const a = Math.random() * Math.PI * 2;
    const d = 55 + Math.random() * 65;
    s.className = 'num';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = '०१२३४५६७८९'[i % 10];
    s.style.cssText = [
      `--dx:${Math.cos(a) * d}vmax`,
      `--dy:${Math.sin(a) * d}vmax`,
      `font-size:${2.5 + Math.random() * 5}rem`,
      `animation-duration:${9 + Math.random() * 10}s`,
      `animation-delay:-${Math.random() * 18}s`
    ].join(';');
    cloud.appendChild(s);
  }
})();

/* ─── Home stats badge ───────────────────────────── */
function updateHomeStats() {
  const el = $('#home-stats');
  if (!el) return;
  const lvl = Math.floor(S.xp / 30) + 1;
  el.innerHTML = S.xp
    ? `<span>🏅 Level ${lvl}</span><span>⚡ ${S.xp} XP</span><span>✅ ${S.done.length}/${EV.length} solved</span>`
    : `<span>Start solving challenges to earn XP!</span>`;
}
updateHomeStats();

/* ─── Acharya Meow ───────────────────────────────── */
function say(text, hop) {
  $('#cat').classList.add('on');
  $('#say').textContent = text;
  if (hop && !reduce) {
    const cat = $('#cs');
    cat.classList.remove('hop');
    void cat.getBoundingClientRect(); // force reflow
    cat.classList.add('hop');
  }
}
$('#mute').onclick = () => $('#cat').classList.remove('on');

/* Ticker handled by timeline.js */

/* ─── Level string ───────────────────────────────── */
const lvlStr = () => `Level ${Math.floor(S.xp / 30) + 1} · ${S.xp} XP · ${S.done.length}/${EV.length}`;

/* ─── Shared helpers (used by both app.js & timeline.js) ── */
const NOW = 2026;
const fy = y => y < 0 ? `${Math.round(-y)} BCE` : `${Math.round(y)}`;

/* render / go / zoom — owned by timeline.js */
function render() {}
function go(a,b,D,done) { done && done(); }
function zoom() {}

/* ─── Stubs — overridden by timeline.js ─────────── */
function travel()       { /* overridden by timeline.js */ }
function openEra(i,ev) { playAnim(i, ERA[i].a, () => showEra(i, ev)); }
function openEv(i)     { const v=EV[i]; playAnim(v.era, v.y, () => showEra(v.era, i)); }

/* ─── Era detail screen ──────────────────────────── */
function showEra(eraIdx, evIdx) {
  const r = ERA[eraIdx];
  const events = EV.map((v, k) => [v, k]).filter(([v]) => v.era === eraIdx);
  const facts  = FUN[eraIdx] || [];

  /* Header */
  let html = `
    <div class="era-inner">
      <div class="top-bar">
        <button id="back" aria-label="Back to timeline">◀ Timeline</button>
        <span class="xp-badge" id="xp-badge">${lvlStr()}</span>
      </div>
      <div class="era-hero">
        <h2>${r.n}</h2>
        <div class="era-dates mono">${fy(r.a)} – ${fy(r.b)}</div>
        ${r.intro ? `<p class="era-intro">${r.intro}</p>` : ''}
      </div>`;

  /* Fun-fact flip cards — 2 per era */
  if (facts.length) {
    html += `<div class="funfact-strip" role="list" aria-label="Fun facts — hover to reveal">`;
    facts.forEach((f, i) => {
      html += `
        <div class="flip-card" role="listitem" tabindex="0"
             style="--d:${i * 0.12}s"
             aria-label="Fun fact: ${f.head}">
          <div class="flip-inner">
            <div class="flip-front">
              <div class="flip-front-label">🧮 Maths Fact</div>
              <div class="flip-front-head">${f.head}</div>
            </div>
            <div class="flip-back">
              <div class="flip-back-label">✦ The Detail</div>
              <div class="flip-back-detail">${f.detail}</div>
            </div>
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  /* Empty note */
  if (r.note) {
    html += `<div class="panel panel-empty">${r.note}</div>`;
  }

  /* Events */
  events.forEach(([v, k], order) => {
    const completed = S.done.includes(v.t);
    html += `
      <div class="panel" id="e${k}" style="--d:${0.05 + order * 0.07}s">
        <h3>${v.t}${completed ? ' <span class="done-badge">✓ Done</span>' : ''}</h3>
        <div class="panel-date mono">${v.l}</div>
        <p><strong>Who:</strong> ${v.who}</p>
        <p>${v.c}</p>
        <p class="panel-note">Source: ${v.s}</p>

        <div class="game">
          <div class="game-label">🎯 Challenge</div>
          <p class="game-q">${v.q}</p>
          <div class="game-row">
            <input id="a${k}" type="number" step="any" inputmode="decimal"
              aria-label="Your answer for: ${v.t}" placeholder="Answer…">
            <button class="btn-pri" data-act="c" data-k="${k}">Check ✓</button>
            <button data-act="h" data-k="${k}">Hint 💡</button>
            <span id="d${k}">${completed ? '<span class="done-badge">✓ Completed</span>' : ''}</span>
          </div>
          <div class="game-result" id="f${k}"></div>
        </div>
      </div>`;
  });

  html += `</div>`; // .era-inner

  const eraEl = $('#era');
  eraEl.innerHTML = html;

  showScreen('era', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (evIdx !== undefined) {
      const target = document.getElementById('e' + evIdx);
      if (target) setTimeout(() => target.scrollIntoView({ block: 'start', behavior: 'smooth' }), 300);
    }
  });

  const catMsg = r.note
    ? 'Nothing verified here yet. I would rather show an empty range than an invented discovery.'
    : `Welcome to the ${r.n}! Try each challenge below — earn 10 XP for every correct answer. 🐾`;
  say(catMsg, true);
}

/* ─── Challenge interaction ──────────────────────── */
$('#era').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.id === 'back') {
    $('#cat').classList.remove('on');
    showScreen('tls', () => {
      if (typeof sizeTL === 'function') { sizeTL(); renderRail(); renderCards(); }
      const svg = document.getElementById('tl');
      if (svg) svg.focus({ preventScroll: true });
    });
    return;
  }

  const k = +btn.dataset.k;
  const v = EV[k];
  if (!v) return;

  if (btn.dataset.act === 'h') {
    $('#f' + k).innerHTML = `<span class="bad">Hint: ${v.h}</span>`;
    say('Hint: ' + v.h);
    return;
  }

  if (btn.dataset.act !== 'c') return;

  const raw = $('#a' + k).value.trim();
  const n   = parseFloat(raw);

  if (raw === '' || isNaN(n)) {
    $('#f' + k).innerHTML = '<span class="bad">Please enter a number.</span>';
    return;
  }

  if (Math.abs(n - v.a) <= v.tol) {
    if (!S.done.includes(v.t)) {
      S.done.push(v.t);
      S.xp += 10;
      save();
    }
    $('#f' + k).innerHTML = `<span class="ok">✓ Correct!</span> ${v.x}`;
    $('#d' + k).innerHTML = '<span class="done-badge">✓ Completed</span>';
    const xpBadge = $('#xp-badge');
    if (xpBadge) xpBadge.textContent = lvlStr();
    updateHomeStats();
    say('Correct! ' + v.x, true);
  } else {
    $('#f' + k).innerHTML = '<span class="bad">Not quite.</span> Try the hint!';
    say('Not quite. Want a hint? ' + v.h);
  }
});

/* ─── Era animation overlay ──────────────────────── */
const dev = n => String(n).replace(/\d/g, d => '०१२३४५६७८९'[d]);

function scene(i) {
  /* Vedic: powers of ten in Devanagari */
  if (i === 0) {
    let s = `<g class="fl">
      <path d="M80 235C35 200 70 165 80 110C98 160 128 195 80 235Z" fill="#e0ad4a"/>
      <path d="M80 235C60 215 75 195 80 175C92 200 105 215 80 235Z" fill="#f4e6cf"/>
    </g>
    <rect x="40" y="235" width="80" height="12" rx="4" fill="#6b4a33"/>`;
    [1, 10, 100, 1000, 10000].forEach((n, k) => {
      s += `<text class="fi" style="--d:${0.5 + k * 0.65}s"
        x="290" y="${238 - k * 40}" fill="#f4e6cf" font-size="28" text-anchor="middle"
        font-family="'Noto Sans Devanagari',serif">${dev(n)}</text>`;
    });
    return [s, 'Vedic texts count in tens — each step multiplies by ten (shown in Devanagari numerals).'];
  }

  /* Sulba: √2 square-on-diagonal */
  if (i === 1) {
    return [
      `<rect class="dr" pathLength="1000" x="62" y="100" width="80" height="80"
        fill="none" stroke="#e0ad4a" stroke-width="3"/>
      <line class="dr" pathLength="1000" style="--d:1.2s"
        x1="62" y1="180" x2="142" y2="100" stroke="#f4e6cf" stroke-width="3"/>
      <polygon class="dr" pathLength="1000" style="--d:2.4s"
        points="62,180 142,100 222,180 142,260"
        fill="none" stroke="#e0ad4a" stroke-width="3"/>
      <polygon class="fi" style="--d:3.8s"
        points="62,180 142,100 222,180 142,260"
        fill="#e0ad4a" fill-opacity="0.22"/>
      <text class="fi" style="--d:1.9s" x="88" y="124"
        fill="#f4e6cf" font-size="22">√2</text>`,
      'A square built on the diagonal has twice the area — this insight drives the Sulba approximation of √2.'
    ];
  }

  /* Classical: π circle */
  if (i === 2) {
    return [
      `<circle class="dr" pathLength="1000" cx="200" cy="120" r="88"
        fill="none" stroke="#e0ad4a" stroke-width="3" style="animation-duration:2.4s"/>
      <line class="dr" pathLength="1000" style="--d:2.5s"
        x1="112" y1="120" x2="288" y2="120" stroke="#f4e6cf" stroke-width="3"/>
      <text class="fi" style="--d:3.3s" x="200" y="248"
        fill="#f4e6cf" font-size="21" text-anchor="middle"
        font-family="'Inter',sans-serif">62832 ÷ 20000 = 3.1416</text>`,
      'Aryabhata\'s value of π: circumference ÷ diameter ≈ 62832 ÷ 20000 = 3.1416.'
    ];
  }

  /* Bhaskara/Kerala: Madhava's series converging to π */
  if (i === 3) {
    let pts = '', dots = '', s = 0;
    for (let n = 1; n <= 12; n++) {
      s += 4 * (n % 2 ? 1 : -1) / (2 * n - 1);
      const x = 38 + n * 27, y = 250 - (s - 2.6) * 115;
      pts += `${x},${y} `;
      dots += `<circle class="fi" style="--d:${n * 0.26}s"
        cx="${x}" cy="${y}" r="4" fill="#f4e6cf"/>`;
    }
    return [
      `<line class="fi" style="--d:0.2s"
        x1="28" x2="380" y1="170" y2="170"
        stroke="#7ecb6a" stroke-dasharray="7 5"/>
      <text x="378" y="162" text-anchor="end" fill="#7ecb6a" font-size="13">π</text>
      <polyline class="dr" pathLength="1000" style="animation-duration:3.2s"
        points="${pts}" fill="none" stroke="#e0ad4a" stroke-width="3"/>
      ${dots}`,
      'Madhava\'s series: each term nudges the sum closer to π — an infinite series discovered ~250 years before Leibniz.'
    ];
  }

  /* Ramanujan: 1729 */
  if (i === 4) {
    return [
      `<g font-family="'Inter',monospace" fill="#f4e6cf" text-anchor="middle">
        <text class="fi" x="200" y="76" font-size="30">1³ + 12³</text>
        <text class="fi" style="--d:0.9s" x="200" y="124" font-size="30">9³ + 10³</text>
        <text class="fi" style="--d:1.8s" x="200" y="172" font-size="22">1 + 1728 = 729 + 1000</text>
        <text class="fi" style="--d:2.8s" x="200" y="245"
          fill="#e0ad4a" font-size="60" font-weight="700">= 1729</text>
      </g>`,
      '1729 is the smallest number expressible as the sum of two positive cubes in two different ways — Hardy–Ramanujan number.'
    ];
  }

  /* Fallback */
  return [
    `<text class="fi" x="200" y="170" text-anchor="middle" fill="#e0ad4a" font-size="110">?</text>`,
    'No verified events have been entered for this range yet.'
  ];
}

function playAnim(eraIdx, targetYear, done) {
  if (reduce) { done(); return; }

  const A = $('#anim');
  const [svgContent, caption] = scene(eraIdx);
  const eraName = ERA[eraIdx]?.n || '';

  A.innerHTML = `
    <h2 id="anim-year">${fy(NOW)}</h2>
    <p class="mono" style="color:var(--muted);margin-bottom:0.4rem">${eraName}</p>
    <svg viewBox="0 0 400 280" aria-hidden="true">${svgContent}</svg>
    <p>${caption}</p>
    <button class="skip-btn" id="sk">Skip ▶</button>`;

  A.classList.add('on');
  $('#sk').focus();

  let finished = 0;
  const end = () => {
    if (finished) return;
    finished = 1;
    clearTimeout(timer);
    window.removeEventListener('keydown', onKey);
    A.classList.remove('on');
    done();
  };
  const onKey = e => { if (e.key === 'Escape') end(); };
  const timer  = setTimeout(end, 6200);
  window.addEventListener('keydown', onKey);
  $('#sk').onclick = end;

  /* Animated year counter */
  const yearEl = A.querySelector('#anim-year');
  const t0 = performance.now();
  (function tick(t) {
    const p  = Math.min(1, (t - t0) / 1500);
    const ep = 1 - Math.pow(1 - p, 3);
    yearEl.textContent = fy(NOW + (targetYear - NOW) * ep);
    if (p < 1 && !finished) requestAnimationFrame(tick);
  })(t0);
}

/* ─── Old timeline wiring removed ───────────────────
   Button wiring, pointer events and render for the
   SVG timeline are now handled entirely by timeline.js.
   app.js only provides: showScreen, showEra, playAnim,
   say, updateHomeStats, lvlStr, save, S, FUN.
   ─────────────────────────────────────────────────── */

/* Expose helpers needed by timeline.js */
window.updateHomeStats = updateHomeStats;
window.showScreen      = showScreen;
window.showEra         = showEra;
window.playAnim        = playAnim;
window.say             = say;
window.S               = S;
window.lvlStr          = lvlStr;

