/* ═══════════════════════════════════════════════════
   BharatMath — My Knowledge Constellation
   Interactive cosmic concept map & achievement system
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let selectedNode = null;
  let animId = null;

  function initConstellation() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.constellation) {
      S.teach.constellation = { unlocked: [], achievements: [] };
    }

    checkConstellationAchievements();
    renderConstellationView();
  }

  function checkConstellationAchievements() {
    if (!S.teach) return;
    if (!S.teach.constellation) S.teach.constellation = { unlocked: [], achievements: [] };

    const cState = S.teach.constellation;
    const completedTwoPaths = (S.teach.twoPaths && S.teach.twoPaths.completed) || [];
    const completedZero = (S.teach.zeroLab && S.teach.zeroLab.completed) || [];
    const completedDet = (S.teach.detective && S.teach.detective.completed) || [];
    const completedWs = (S.teach.workshop && S.teach.workshop.completed) || [];
    const completedMs = (S.teach.manuscript && S.teach.manuscript.completed) || [];

    // Check Node Unlocks
    const unlocked = [];
    if (completedZero.length > 0) unlocked.push('zero');
    if (completedWs.length > 0) unlocked.push('geom');
    if (completedTwoPaths.includes('p1') || completedTwoPaths.length > 0) unlocked.push('arith');
    if (completedDet.length > 0) unlocked.push('alg');
    if (completedMs.length > 0 || completedTwoPaths.includes('p3')) unlocked.push('calc');
    if (unlocked.length >= 4) unlocked.push('num');

    cState.unlocked = unlocked;

    // Check Achievements
    const totalActivitiesDone = completedTwoPaths.length + completedZero.length + completedDet.length + completedWs.length + completedMs.length;
    
    function unlockAch(achId, xpReward) {
      if (!cState.achievements.includes(achId)) {
        cState.achievements.push(achId);
        save();
        awardXP(xpReward, `Achievement Unlocked: ${achId}!`);
      }
    }

    if (totalActivitiesDone >= 1) unlockAch('ach_first', 15);
    if (completedTwoPaths.length >= 4) unlockAch('ach_twopaths', 30);
    if (completedZero.length >= 3) unlockAch('ach_zero', 25);
    if (completedDet.length >= 9) unlockAch('ach_detective', 35);
    if (completedWs.length >= 3) unlockAch('ach_engineer', 30);
    if (completedMs.length >= 5) unlockAch('ach_manuscript', 30);
    if (unlocked.length >= 6) unlockAch('ach_constellation', 50);
    if ((S.xp || 0) >= 200) unlockAch('ach_scholar', 75);

    save();
  }

  function renderConstellationView() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const data = TEACH_DATA.constellation;
    const unlockedNodes = S.teach.constellation.unlocked || [];
    const achievements = data.achievements;
    const unlockedAchs = S.teach.constellation.achievements || [];

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="con-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">🌌 My Knowledge Constellation</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="constellation-container">
        <!-- Cosmic Canvas -->
        <div class="constellation-canvas-wrap">
          <canvas id="con-canvas"></canvas>
          <div id="con-node-card" style="display:none; position:absolute; bottom:1.5rem; left:1.5rem; right:1.5rem; max-width:540px; background:rgba(20, 12, 7, 0.95); border:1px solid var(--gold); border-radius:var(--rad); padding:1.5rem; backdrop-filter:blur(12px); box-shadow:0 8px 32px rgba(0,0,0,0.8); z-index:10;">
            <!-- Node Inspector Content Populated dynamically -->
          </div>
        </div>

        <!-- Node Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; background:var(--teach-surface); padding:1rem 1.5rem; border-radius:var(--rad-sm); border:1px solid var(--teach-border);">
          <div style="font-size:0.95rem; color:var(--fg);">
            Stars Ignited: <strong style="color:var(--gold2);">${unlockedNodes.length} / ${data.nodes.length}</strong>
          </div>
          <div style="font-size:0.85rem; color:var(--muted);">
            Click any star on the celestial sphere to view its historical lineage.
          </div>
        </div>

        <!-- Achievements Showcase -->
        <div style="margin-top:1.5rem;">
          <h3 style="font-family:'Cinzel',serif; color:var(--gold2); margin:0 0 0.5rem; font-size:1.35rem;">
            🏆 Achievements of the Scholar (${unlockedAchs.length} / ${achievements.length})
          </h3>
          <p style="color:var(--muted); font-size:0.9rem; margin:0 0 1rem;">
            Complete interactive laboratory investigations to unlock timeless honors.
          </p>

          <div class="achieve-grid">
            ${achievements.map(ach => {
              const isUnlocked = unlockedAchs.includes(ach.id);
              return `
                <div class="achieve-card ${isUnlocked ? 'unlocked' : ''}">
                  <span class="achieve-icon">${ach.icon}</span>
                  <div class="achieve-info">
                    <h4>${ach.title}</h4>
                    <p>${ach.desc}</p>
                    <span style="font-size:0.75rem; color:var(--gold); font-weight:700; margin-top:0.3rem; display:block;">
                      ${isUnlocked ? '✓ Unlocked' : `⚡ +${ach.xp} XP`}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Back to hub
    $('#con-back-hub').onclick = () => {
      cancelAnimationFrame(animId);
      openTeaching();
    };

    initConstellationCanvas();
    say("Your Knowledge Constellation maps connections across 3,000 years of mathematical lineage! 🐾", false);
  }

  function initConstellationCanvas() {
    const canvas = document.getElementById('con-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const nodes = TEACH_DATA.constellation.nodes;
    const edges = TEACH_DATA.constellation.edges;
    const unlockedSet = new Set(S.teach.constellation.unlocked || []);

    let w = 0, h = 0;
    let bgStars = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      w = rect.width;
      h = rect.height;

      // Seed ambient background stars
      bgStars = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2
      }));
    }

    window.addEventListener('resize', resize);
    resize();

    let t = 0;
    function renderLoop() {
      t += 0.03;
      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Draw ambient background stars
      bgStars.forEach(s => {
        const pulse = Math.sin(t + s.x) * 0.2;
        ctx.fillStyle = `rgba(224, 173, 74, ${Math.max(0.1, s.alpha + pulse)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw constellation edges
      edges.forEach(([fromId, toId]) => {
        const fromNode = nodes.find(n => n.id === fromId);
        const toNode = nodes.find(n => n.id === toId);
        if (!fromNode || !toNode) return;

        const x1 = fromNode.x * w;
        const y1 = fromNode.y * h;
        const x2 = toNode.x * w;
        const y2 = toNode.y * h;

        const isBothUnlocked = unlockedSet.has(fromId) && unlockedSet.has(toId);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        if (isBothUnlocked) {
          ctx.strokeStyle = 'rgba(224, 173, 74, 0.45)';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
        }
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const nx = node.x * w;
        const ny = node.y * h;
        const isUnlocked = unlockedSet.has(node.id);
        const isSelected = selectedNode && selectedNode.id === node.id;

        // Halo / pulse
        if (isUnlocked) {
          const haloR = 24 + Math.sin(t * 2) * 4;
          const grad = ctx.createRadialGradient(nx, ny, 6, nx, ny, haloR);
          grad.addColorStop(0, node.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(nx, ny, haloR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 12 : 9, 0, Math.PI * 2);
        ctx.fillStyle = isUnlocked ? node.color : '#3a2618';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#fff' : (isUnlocked ? '#ffe082' : '#5a3d28');
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.font = '600 12px Inter, sans-serif';
        ctx.fillStyle = isUnlocked ? '#fff' : 'rgba(205, 183, 151, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny + 24);
      });

      ctx.restore();
      animId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // Canvas click to inspect node
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let clicked = null;
      nodes.forEach(n => {
        const nx = n.x * w;
        const ny = n.y * h;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist < 26) clicked = n;
      });

      if (clicked) {
        selectedNode = clicked;
        showNodeCard(clicked, unlockedSet.has(clicked.id));
      }
    };
  }

  function showNodeCard(node, isUnlocked) {
    const card = document.getElementById('con-node-card');
    if (!card) return;

    card.style.display = 'block';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:1.8rem;">${node.icon}</span>
          <div>
            <h3 style="font-family:'Cinzel',serif; color:var(--gold2); margin:0; font-size:1.25rem;">${node.label}</h3>
            <span style="font-size:0.8rem; color:var(--muted);">${node.era}</span>
          </div>
        </div>
        <button id="close-node-card" style="border:none; background:transparent; color:var(--muted); font-size:1.2rem; cursor:pointer;">✕</button>
      </div>

      <div style="background:rgba(224,173,74,0.1); border-left:3px solid var(--gold); padding:0.5rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.85rem; color:var(--fg); margin-bottom:0.8rem; font-style:italic;">
        “${node.verse}”
      </div>

      <p style="font-size:0.92rem; color:var(--fg); line-height:1.5; margin-bottom:1rem;">
        ${node.desc}
      </p>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
        <span style="font-size:0.82rem; color:${isUnlocked ? 'var(--ok)' : 'var(--bad)'}; font-weight:700;">
          ${isUnlocked ? '✨ Celestial Star Ignited' : `🔒 Locked (Explore in: ${node.unlockedBy})`}
        </span>
        <button id="revisit-act-btn" class="btn-pri" style="padding:0.45rem 1.1rem; font-size:0.85rem;" data-act="${node.activityId}">
          Launch Lab ✦
        </button>
      </div>
    `;

    document.getElementById('close-node-card').onclick = () => {
      card.style.display = 'none';
      selectedNode = null;
    };

    document.getElementById('revisit-act-btn').onclick = (e) => {
      const actId = e.currentTarget.dataset.act;
      openTeaching(actId);
    };
  }

  window.initConstellation = initConstellation;
  window.checkConstellationAchievements = checkConstellationAchievements;
})();
