/* ═══════════════════════════════════════════════════
   BharatMath — Ancient Engineer's Workshop
   Interactive Canvas-based Śulbasūtra Geometry
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let activeExpIdx = 0; // 0: Double Square | 1: √2 Rope | 2: Rectangle to Square
  let animProgress = 1.0; // 0 to 1
  let squareSide = 100;
  let rectWidth = 160;
  let rectHeight = 90;
  let transformStep = 3; // 1 | 2 | 3
  let animReq = null;

  function initWorkshop() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.workshop) {
      S.teach.workshop = { completed: [], constructions: [] };
    }

    activeExpIdx = 0;
    animProgress = 1.0;
    squareSide = 100;
    renderWorkshopView();
  }

  function renderWorkshopView() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const experiments = TEACH_DATA.workshop.experiments;
    const curExp = experiments[activeExpIdx];

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="ws-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">📐 Ancient Engineer's Workshop</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="workshop-container">
        <!-- Experiment Tabs -->
        <nav class="problem-selector-tabs" aria-label="Workshop Experiments">
          ${experiments.map((exp, idx) => `
            <button class="prob-tab ${idx === activeExpIdx ? 'active' : ''}" data-eidx="${idx}">
              ${(S.teach.workshop.completed || []).includes(exp.id) ? '✅ ' : ''}${exp.title.split(':')[0]}
            </button>
          `).join('')}
        </nav>

        <!-- Header Card -->
        <div class="two-paths-header-card">
          <h1 class="two-paths-prob-title">${curExp.title}</h1>
          <div class="two-paths-source-tag">
            <span>📜 <strong>Sūtra:</strong> ${curExp.subtitle}</span>
          </div>
          <p style="color:var(--fg); margin:0.8rem 0 0; line-height:1.6;">
            ${curExp.desc}
          </p>
        </div>

        <!-- Canvas Area -->
        <div class="workshop-canvas-wrap">
          <canvas id="ws-canvas"></canvas>
        </div>

        <!-- Controls & Readouts -->
        <div class="workshop-controls" id="ws-controls">
          ${renderControlsForExp(activeExpIdx)}
        </div>
      </div>
    `;

    // Back to hub
    $('#ws-back-hub').onclick = () => {
      cancelAnimationFrame(animReq);
      openTeaching();
    };

    // Experiment tabs
    container.querySelectorAll('.prob-tab').forEach(tab => {
      tab.onclick = (e) => {
        cancelAnimationFrame(animReq);
        activeExpIdx = parseInt(e.currentTarget.dataset.eidx, 10);
        animProgress = 1.0;
        renderWorkshopView();
      };
    });

    wireControls();
    initCanvas();
  }

  function renderControlsForExp(idx) {
    if (idx === 0) {
      // Double square
      return `
        <div class="slider-group">
          <label style="font-weight:600; color:var(--gold); white-space:nowrap;">Altar Side (s):</label>
          <input type="range" id="ws-side-slider" class="workshop-slider" min="60" max="140" value="${squareSide}">
          <span id="ws-side-val" style="font-weight:700; color:var(--fg); min-width:40px;">${squareSide}</span>
        </div>

        <div class="meas-readout">
          <div class="meas-item">Base Area: <strong id="read-base-area">${squareSide * squareSide}</strong></div>
          <div class="meas-item">Doubled Area: <strong id="read-doubled-area" style="color:var(--ok);">${squareSide * squareSide * 2}</strong></div>
        </div>

        <button id="ws-verify-btn" class="btn-pri" style="padding:0.6rem 1.4rem;">
          Verify Sūtra Proof ✦
        </button>
      `;
    }

    if (idx === 1) {
      // √2 rope
      return `
        <div class="slider-group">
          <label style="font-weight:600; color:var(--gold); white-space:nowrap;">Square Side (s):</label>
          <input type="range" id="ws-rope-slider" class="workshop-slider" min="20" max="120" value="${squareSide}">
          <span id="ws-rope-val" style="font-weight:700; color:var(--fg); min-width:40px;">${squareSide}</span>
        </div>

        <div class="meas-readout">
          <div class="meas-item">Baudhayana Rope (577/408): <strong id="read-sulba-rope">${(squareSide * (577 / 408)).toFixed(3)}</strong></div>
          <div class="meas-item">True s√2: <strong id="read-true-rope" style="color:var(--ok);">${(squareSide * Math.SQRT2).toFixed(3)}</strong></div>
        </div>

        <button id="ws-verify-btn" class="btn-pri" style="padding:0.6rem 1.4rem;">
          Verify Precision ✦
        </button>
      `;
    }

    if (idx === 2) {
      // Rectangle to square
      return `
        <div class="slider-group" style="gap:1.5rem;">
          <div>
            <label style="font-weight:600; color:var(--gold);">Width (a):</label>
            <input type="range" id="ws-rect-w" class="workshop-slider" min="100" max="180" value="${rectWidth}">
            <span id="ws-w-val" style="font-weight:700;">${rectWidth}</span>
          </div>
          <div>
            <label style="font-weight:600; color:var(--gold);">Height (b):</label>
            <input type="range" id="ws-rect-h" class="workshop-slider" min="40" max="90" value="${rectHeight}">
            <span id="ws-h-val" style="font-weight:700;">${rectHeight}</span>
          </div>
        </div>

        <div class="meas-readout">
          <div class="meas-item">Rectangle Area (a×b): <strong>${rectWidth * rectHeight}</strong></div>
          <div class="meas-item">Equivalent Square Side: <strong style="color:var(--ok);">${Math.round(Math.sqrt(rectWidth * rectHeight))}</strong></div>
        </div>

        <button id="ws-verify-btn" class="btn-pri" style="padding:0.6rem 1.4rem;">
          Verify Area Invariance ✦
        </button>
      `;
    }

    return '';
  }

  function wireControls() {
    const sideSlider = document.getElementById('ws-side-slider');
    if (sideSlider) {
      sideSlider.oninput = (e) => {
        squareSide = parseInt(e.target.value, 10);
        document.getElementById('ws-side-val').textContent = squareSide;
        document.getElementById('read-base-area').textContent = squareSide * squareSide;
        document.getElementById('read-doubled-area').textContent = squareSide * squareSide * 2;
        draw();
      };
    }

    const ropeSlider = document.getElementById('ws-rope-slider');
    if (ropeSlider) {
      ropeSlider.oninput = (e) => {
        squareSide = parseInt(e.target.value, 10);
        document.getElementById('ws-rope-val').textContent = squareSide;
        document.getElementById('read-sulba-rope').textContent = (squareSide * (577 / 408)).toFixed(3);
        document.getElementById('read-true-rope').textContent = (squareSide * Math.SQRT2).toFixed(3);
        draw();
      };
    }

    const rw = document.getElementById('ws-rect-w');
    const rh = document.getElementById('ws-rect-h');
    if (rw && rh) {
      rw.oninput = (e) => {
        rectWidth = parseInt(e.target.value, 10);
        document.getElementById('ws-w-val').textContent = rectWidth;
        draw();
      };
      rh.oninput = (e) => {
        rectHeight = parseInt(e.target.value, 10);
        document.getElementById('ws-h-val').textContent = rectHeight;
        draw();
      };
    }

    const verifyBtn = document.getElementById('ws-verify-btn');
    if (verifyBtn) {
      verifyBtn.onclick = () => {
        const curExp = TEACH_DATA.workshop.experiments[activeExpIdx];
        if (!S.teach.workshop.completed.includes(curExp.id)) {
          S.teach.workshop.completed.push(curExp.id);
          save();
          awardXP(15, `${curExp.title.split(':')[0]} verified on sacred canvas!`);
        } else {
          say("Geometry verified with exact mathematical invariance! 🐾", true);
        }
      };
    }
  }

  function initCanvas() {
    const canvas = document.getElementById('ws-canvas');
    if (!canvas) return;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      draw();
    }

    window.addEventListener('resize', resize);
    resize();
  }

  function draw() {
    const canvas = document.getElementById('ws-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);

    // Draw subtle altar construction grid
    ctx.strokeStyle = 'rgba(224, 173, 74, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (activeExpIdx === 0) {
      drawDoubleSquare(ctx, w, h);
    } else if (activeExpIdx === 1) {
      drawSqrt2Rope(ctx, w, h);
    } else if (activeExpIdx === 2) {
      drawRectToSquare(ctx, w, h);
    }
  }

  function drawDoubleSquare(ctx, w, h) {
    const cx = w / 2;
    const cy = h / 2 + 10;
    const s = squareSide;

    // Base square centered
    const x0 = cx - s / 2;
    const y0 = cy - s / 2;

    // Draw doubled square (built on diagonal, rotated by 45 deg)
    const diag = s * Math.SQRT2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);

    ctx.fillStyle = 'rgba(212, 136, 42, 0.18)';
    ctx.strokeStyle = 'var(--teach-ancient)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(-s / 2, -s / 2, s, s);
    ctx.fillRect(-s / 2, -s / 2, s, s);

    ctx.restore();

    // Draw original base square
    ctx.fillStyle = 'rgba(224, 173, 74, 0.25)';
    ctx.strokeStyle = '#e0ad4a';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.fillRect(x0, y0, s, s);
    ctx.strokeRect(x0, y0, s, s);

    // Draw diagonal cord
    ctx.strokeStyle = '#7ecb6a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + s);
    ctx.lineTo(x0 + s, y0);
    ctx.stroke();

    // Pegs at corners
    [ [x0, y0], [x0+s, y0], [x0+s, y0+s], [x0, y0+s] ].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffcc00';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Labels
    ctx.fillStyle = '#f4e6cf';
    ctx.font = '600 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Base Altar (s = ${s})`, cx, cy + s / 2 + 25);
    ctx.fillStyle = '#7ecb6a';
    ctx.fillText(`Diagonal Cord d = s√2 ≈ ${(s * Math.SQRT2).toFixed(1)}`, cx, cy - s / 2 - 25);
    ctx.fillStyle = 'var(--teach-ancient)';
    ctx.fillText(`Doubled Altar (Area = 2s² = ${2 * s * s})`, cx, cy - s / 2 - 45);
  }

  function drawSqrt2Rope(ctx, w, h) {
    const cx = w / 2;
    const cy = h / 2 + 20;
    const s = squareSide * 1.4;

    const x0 = cx - s / 2;
    const y0 = cy - s / 2;

    // Draw base square
    ctx.fillStyle = 'rgba(224, 173, 74, 0.15)';
    ctx.strokeStyle = '#e0ad4a';
    ctx.lineWidth = 2.5;
    ctx.fillRect(x0, y0, s, s);
    ctx.strokeRect(x0, y0, s, s);

    // Diagonal rope
    const startX = x0;
    const startY = y0 + s;
    const endX = x0 + s;
    const endY = y0;

    ctx.strokeStyle = '#7ecb6a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Baudhayana Knots on rope: 1, 1+1/3, 1+1/3+1/12, -1/408
    const totalRatio = 577 / 408; // ~1.414215
    const knots = [
      { ratio: 1.0, label: 's (1.0)', color: '#fff' },
      { ratio: 1 + 1/3, label: '+1/3 (1.333)', color: '#e0ad4a' },
      { ratio: 1 + 1/3 + 1/12, label: '+1/12 (1.416)', color: '#d4882a' },
      { ratio: 577 / 408, label: 'sa-viśeṣa 577/408', color: '#7ecb6a' }
    ];

    knots.forEach(k => {
      const frac = k.ratio / Math.SQRT2; // position along diagonal
      const kx = startX + (endX - startX) * Math.min(1, frac);
      const ky = startY + (endY - startY) * Math.min(1, frac);

      ctx.beginPath();
      ctx.arc(kx, ky, 6, 0, Math.PI * 2);
      ctx.fillStyle = k.color;
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillStyle = k.color;
      ctx.textAlign = 'left';
      ctx.fillText(k.label, kx + 10, ky - 6);
    });

    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillStyle = '#f4e6cf';
    ctx.textAlign = 'center';
    ctx.fillText(`Baudhayana Rational Knot Progression on Diagonal Cord`, cx, cy + s / 2 + 30);
  }

  function drawRectToSquare(ctx, w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const a = rectWidth;
    const b = rectHeight;
    const sqSide = Math.sqrt(a * b);

    // Draw Rectangle on left
    const rx = cx - a - 30;
    const ry = cy - b / 2;

    ctx.fillStyle = 'rgba(77, 168, 138, 0.2)';
    ctx.strokeStyle = 'var(--teach-modern)';
    ctx.lineWidth = 2.5;
    ctx.fillRect(rx, ry, a, b);
    ctx.strokeRect(rx, ry, a, b);

    ctx.fillStyle = 'var(--teach-modern)';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Rectangle (${a} × ${b})`, rx + a / 2, ry + b / 2);
    ctx.fillText(`Area = ${a * b}`, rx + a / 2, ry + b / 2 + 18);

    // Draw Arrow
    ctx.strokeStyle = '#e0ad4a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy);
    ctx.lineTo(cx + 15, cy);
    ctx.lineTo(cx + 10, cy - 6);
    ctx.moveTo(cx + 15, cy);
    ctx.lineTo(cx + 10, cy + 6);
    ctx.stroke();

    // Draw Equivalent Square on right
    const sx = cx + 40;
    const sy = cy - sqSide / 2;

    ctx.fillStyle = 'rgba(212, 136, 42, 0.2)';
    ctx.strokeStyle = 'var(--teach-ancient)';
    ctx.lineWidth = 2.5;
    ctx.fillRect(sx, sy, sqSide, sqSide);
    ctx.strokeRect(sx, sy, sqSide, sqSide);

    ctx.fillStyle = 'var(--teach-ancient)';
    ctx.fillText(`Equivalent Square`, sx + sqSide / 2, sy + sqSide / 2 - 8);
    ctx.fillText(`Side = √ab ≈ ${sqSide.toFixed(1)}`, sx + sqSide / 2, sy + sqSide / 2 + 10);
    ctx.fillText(`Area = ${Math.round(sqSide * sqSide)}`, sx + sqSide / 2, sy + sqSide / 2 + 28);
  }

  window.initWorkshop = initWorkshop;
})();
