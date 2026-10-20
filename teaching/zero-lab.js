/* ═══════════════════════════════════════════════════
   BharatMath — Zero Laboratory
   Interactive place value & shunya playground
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let activeTab = 'experiment'; // 'experiment' | 'build' | 'save' | 'history'
  let expZeroSlot = 'between'; // 'before' | 'between' | 'after'

  // Build the number state
  let currentBuildRound = 0;
  let buildSlots = []; // array of placed digits

  // Save the number arcade state
  let saveRound = 0;
  let saveTimer = null;
  let saveTimeRemaining = 15;
  let savePlacedSlots = [];

  function initZeroLab() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.zeroLab) {
      S.teach.zeroLab = { completed: [], puzzlesSolved: 0 };
    }

    renderZeroLab();
  }

  function renderZeroLab() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const data = TEACH_DATA.zeroLab;

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="zl-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">⭕ Zero Laboratory</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="zero-lab-container">
        <!-- Sub-mode Navigation Tabs -->
        <nav class="zero-tabs" aria-label="Zero Lab Modes">
          <button class="zero-tab-btn ${activeTab === 'experiment' ? 'active' : ''}" data-tab="experiment">
            🧪 The Position Experiment
          </button>
          <button class="zero-tab-btn ${activeTab === 'build' ? 'active' : ''}" data-tab="build">
            🏗️ Build the Number (${S.teach.zeroLab.puzzlesSolved || 0}/3)
          </button>
          <button class="zero-tab-btn ${activeTab === 'save' ? 'active' : ''}" data-tab="save">
            ⚡ Save the Number Rush
          </button>
          <button class="zero-tab-btn ${activeTab === 'history' ? 'active' : ''}" data-tab="history">
            📜 Zero Through History
          </button>
        </nav>

        <!-- Dynamic Content Body -->
        <div id="zero-tab-content">
          ${renderTabContent()}
        </div>
      </div>
    `;

    // Attach tab click events
    container.querySelectorAll('.zero-tab-btn').forEach(btn => {
      btn.onclick = (e) => {
        clearInterval(saveTimer);
        activeTab = e.currentTarget.dataset.tab;
        renderZeroLab();
      };
    });

    // Attach back to hub button
    $('#zl-back-hub').onclick = () => {
      clearInterval(saveTimer);
      openTeaching();
    };

    wireCurrentTabEvents();
  }

  function renderTabContent() {
    if (activeTab === 'experiment') return renderExperimentTab();
    if (activeTab === 'build') return renderBuildTab();
    if (activeTab === 'save') return renderSaveTab();
    if (activeTab === 'history') return renderHistoryTab();
    return '';
  }

  /* ── 1. The Position Experiment ── */
  function renderExperimentTab() {
    const exp = TEACH_DATA.zeroLab.experiment;
    const currentSlot = exp.slots.find(s => s.id === expZeroSlot) || exp.slots[1];
    const valPercent = Math.min(100, Math.round((currentSlot.val / 350) * 100));

    return `
      <div class="exp-stage">
        <h2 style="font-family:'Cinzel',serif; color:var(--gold2); margin-top:0;">
          The Position Experiment
        </h2>
        <p style="color:var(--muted); max-width:680px; margin:0 auto 1.5rem; line-height:1.6;">
          ${exp.instruction} Click any dotted slot below to place the zero token and observe the explosion or collapse of magnitude.
        </p>

        <!-- Interactive Digit Slots -->
        <div class="exp-slots-row">
          <!-- Before Slot -->
          <div class="exp-slot-drop ${expZeroSlot === 'before' ? 'has-zero' : ''}" data-slot="before" title="Place 0 before 35">
            ${expZeroSlot === 'before' ? '<div class="exp-zero-token">०</div>' : '<span style="color:var(--muted); font-size:0.8rem;">Drop 0<br>(Prefix)</span>'}
          </div>

          <!-- Digit 3 -->
          <div class="exp-digit-card">३</div>

          <!-- Between Slot -->
          <div class="exp-slot-drop ${expZeroSlot === 'between' ? 'has-zero' : ''}" data-slot="between" title="Place 0 between 3 and 5">
            ${expZeroSlot === 'between' ? '<div class="exp-zero-token">०</div>' : '<span style="color:var(--muted); font-size:0.8rem;">Drop 0<br>(Between)</span>'}
          </div>

          <!-- Digit 5 -->
          <div class="exp-digit-card">५</div>

          <!-- After Slot -->
          <div class="exp-slot-drop ${expZeroSlot === 'after' ? 'has-zero' : ''}" data-slot="after" title="Place 0 after 35">
            ${expZeroSlot === 'after' ? '<div class="exp-zero-token">०</div>' : '<span style="color:var(--muted); font-size:0.8rem;">Drop 0<br>(Suffix)</span>'}
          </div>
        </div>

        <!-- Dynamic Value & Meter -->
        <div class="value-magnitude-meter">
          <div class="meter-header">
            <span>Resulting Value: <strong style="color:var(--gold2); font-size:1.4rem;">${currentSlot.val}</strong> (${currentSlot.label})</span>
            <span style="color:var(--muted);">Magnitude: ${currentSlot.val} / 350</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill" style="width: ${valPercent}%;"></div>
          </div>
        </div>

        <!-- Insight Card -->
        <div class="two-paths-hist-note" style="max-width:700px; margin:1.8rem auto 0; text-align:left;">
          <strong>💡 Place-Value Insight:</strong> ${currentSlot.explanation}
        </div>
      </div>
    `;
  }

  /* ── 2. Build the Number ── */
  function renderBuildTab() {
    const puzzles = TEACH_DATA.zeroLab.buildPuzzles;
    const curPuz = puzzles[currentBuildRound % puzzles.length];

    if (buildSlots.length !== curPuz.columns.length) {
      buildSlots = new Array(curPuz.columns.length).fill(null);
    }

    return `
      <div class="exp-stage">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <h2 style="font-family:'Cinzel',serif; color:var(--gold2); margin:0;">
            Target Number: <span style="color:#fff; letter-spacing:0.05em;">${curPuz.target}</span> (${curPuz.targetDev})
          </h2>
          <span class="teach-badge">Puzzle ${currentBuildRound + 1} of ${puzzles.length}</span>
        </div>
        <p style="color:var(--muted); margin-bottom:2rem;">
          Arrange the available digit cards into their correct place-value columns to construct the target number.
        </p>

        <!-- Place Value Column Drop Slots -->
        <div class="slots-drop-row">
          ${curPuz.columns.map((colName, cIdx) => `
            <div class="column-slot-box">
              <span class="column-label">${colName}</span>
              <div class="exp-slot-drop build-slot ${buildSlots[cIdx] !== null ? 'has-zero' : ''}" data-col="${cIdx}">
                ${buildSlots[cIdx] !== null ? `
                  <div class="${buildSlots[cIdx] === 0 ? 'exp-zero-token' : 'exp-digit-card'}" style="width:65px; height:80px; font-size:2rem;">
                    ${buildSlots[cIdx]}
                  </div>
                ` : '<span style="font-size:0.75rem; color:var(--muted);">Empty</span>'}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Available Digit Pool -->
        <div style="margin:2rem 0 1.5rem;">
          <span style="font-size:0.85rem; text-transform:uppercase; color:var(--gold); letter-spacing:0.1em; display:block; margin-bottom:0.8rem;">
            Available Digits (Click to place in next open column):
          </span>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;" id="build-digit-pool">
            ${curPuz.availableDigits.map((d, dIdx) => `
              <button class="build-pool-btn ${d === 0 ? 'exp-zero-token' : 'exp-digit-card'}" style="width:65px; height:80px; font-size:2rem; cursor:pointer;" data-digit="${d}" data-pool-idx="${dIdx}">
                ${d}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
          <button id="build-clear" class="teach-back-btn">Clear Slots</button>
          <button id="build-verify" class="btn-pri" style="padding:0.6rem 1.6rem;">Verify Placement</button>
        </div>

        <div id="build-feedback" style="display:none; max-width:600px; margin:1.5rem auto 0;"></div>
      </div>
    `;
  }

  /* ── 3. Save the Number Rush ── */
  function renderSaveTab() {
    const rounds = TEACH_DATA.zeroLab.saveGameRounds;
    const curRound = rounds[saveRound % rounds.length];

    if (savePlacedSlots.length !== curRound.slots.length) {
      savePlacedSlots = new Array(curRound.slots.length).fill(null);
    }

    return `
      <div class="save-game-panel">
        <h2 style="font-family:'Cinzel',serif; color:var(--gold2); margin-top:0;">
          Save the Number Arcade Rush ⚡
        </h2>
        <p style="color:var(--muted); max-width:640px; margin:0 auto 1.5rem;">
          The sacred numeral <strong style="color:#fff; font-size:1.2rem;">${curRound.targetNumber}</strong> is breaking apart into the void! Quickly tap each digit into its rightful place-value anchor before cosmic stability decays!
        </p>

        <div class="timer-ring-box" id="save-timer-display">
          <span>⏳ Time Remaining: </span>
          <strong id="save-time-num">${saveTimeRemaining}s</strong>
        </div>

        <!-- Target Columns -->
        <div class="slots-drop-row">
          ${curRound.slots.map((sName, sIdx) => `
            <div class="column-slot-box">
              <span class="column-label">${sName}</span>
              <div class="exp-slot-drop save-slot ${savePlacedSlots[sIdx] !== null ? 'has-zero' : ''}" data-sidx="${sIdx}">
                ${savePlacedSlots[sIdx] !== null ? `
                  <div class="${savePlacedSlots[sIdx] === 0 ? 'exp-zero-token' : 'exp-digit-card'}" style="width:65px; height:80px; font-size:2rem;">
                    ${savePlacedSlots[sIdx]}
                  </div>
                ` : '<span style="font-size:0.75rem; color:var(--muted);">Tap digit</span>'}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Floating Loose Digits -->
        <div style="margin:2rem 0;">
          <span style="font-size:0.85rem; color:var(--gold); display:block; margin-bottom:0.8rem; text-transform:uppercase;">
            Drifting Digits:
          </span>
          <div style="display:flex; justify-content:center; gap:1.2rem;" id="save-loose-digits">
            ${curRound.digits.map((d, idx) => `
              <button class="save-digit-btn ${d === 0 ? 'exp-zero-token' : 'exp-digit-card'}" style="width:65px; height:80px; font-size:2rem; cursor:pointer;" data-val="${d}">
                ${d}
              </button>
            `).join('')}
          </div>
        </div>

        <div id="save-feedback" style="display:none; max-width:600px; margin:1rem auto 0;"></div>
      </div>
    `;
  }

  /* ── 4. Zero Through History ── */
  function renderHistoryTab() {
    const milestones = TEACH_DATA.zeroLab.historyMilestones;

    return `
      <div class="history-ribbon">
        <div class="two-paths-hist-note" style="margin-bottom:1rem;">
          <strong>Historical Note:</strong> Zero was not invented in a single afternoon. It evolved from an empty space mark into a punctuation dot (bindu), and finally into a fully operational mathematical number with algebraic arithmetic in ancient India.
        </div>

        ${milestones.map(m => `
          <div class="hist-mile-card">
            <div class="hist-era-badge">${m.era}</div>
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
                <h3 style="font-family:'Cinzel',serif; color:var(--gold2); margin:0;">${m.title}</h3>
                <span class="teach-badge">${m.badge}</span>
              </div>
              <div style="font-size:0.85rem; color:var(--gold); margin-bottom:0.6rem;">${m.civilization}</div>
              <p style="font-size:0.92rem; color:var(--fg); line-height:1.6; margin:0;">
                ${m.desc}
              </p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ── Event Handlers ── */
  function wireCurrentTabEvents() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (activeTab === 'experiment') {
      container.querySelectorAll('.exp-slot-drop').forEach(slot => {
        slot.onclick = (e) => {
          expZeroSlot = e.currentTarget.dataset.slot;
          renderZeroLab();
          if (!S.teach.zeroLab.completed.includes('exp')) {
            S.teach.zeroLab.completed.push('exp');
            save();
            awardXP(10, 'Position Experiment explored!');
          }
        };
      });
      say("Tap the slots to see zero push digits across orders of magnitude! 🐾", false);
    }

    if (activeTab === 'build') {
      const curPuz = TEACH_DATA.zeroLab.buildPuzzles[currentBuildRound % TEACH_DATA.zeroLab.buildPuzzles.length];
      let selectedPoolIndices = [];

      container.querySelectorAll('.build-pool-btn').forEach(btn => {
        btn.onclick = (e) => {
          const val = parseInt(e.currentTarget.dataset.digit, 10);
          // find first empty build slot
          const emptyIdx = buildSlots.findIndex(s => s === null);
          if (emptyIdx !== -1) {
            buildSlots[emptyIdx] = val;
            e.currentTarget.style.visibility = 'hidden';
            renderZeroLab();
          }
        };
      });

      const clearBtn = $('#build-clear');
      if (clearBtn) {
        clearBtn.onclick = () => {
          buildSlots = new Array(curPuz.columns.length).fill(null);
          renderZeroLab();
        };
      }

      const verifyBtn = $('#build-verify');
      if (verifyBtn) {
        verifyBtn.onclick = () => {
          const fb = $('#build-feedback');
          const isFull = buildSlots.every(s => s !== null);
          if (!isFull) {
            fb.className = 'pred-feedback hint';
            fb.style.display = 'block';
            fb.innerHTML = 'Place all digits into the columns first!';
            return;
          }

          const isMatch = buildSlots.every((val, idx) => val === curPuz.solution[idx]);
          if (isMatch) {
            fb.className = 'pred-feedback ok';
            fb.style.display = 'block';
            fb.innerHTML = `
              <strong>🎉 Correctly Assembled!</strong> You built ${curPuz.target} accurately respecting each place value column!
            `;
            S.teach.zeroLab.puzzlesSolved = Math.max(S.teach.zeroLab.puzzlesSolved || 0, currentBuildRound + 1);
            if (!S.teach.zeroLab.completed.includes('build_' + currentBuildRound)) {
              S.teach.zeroLab.completed.push('build_' + currentBuildRound);
              save();
              awardXP(10, `Built ${curPuz.target}!`);
            }
            setTimeout(() => {
              if (currentBuildRound < TEACH_DATA.zeroLab.buildPuzzles.length - 1) {
                currentBuildRound++;
                buildSlots = [];
                renderZeroLab();
              }
            }, 1800);
          } else {
            fb.className = 'pred-feedback hint';
            fb.style.display = 'block';
            fb.innerHTML = `<strong>Hint:</strong> ${curPuz.hint}`;
            say(`Hint: ${curPuz.hint}`, true);
          }
        };
      }
    }

    if (activeTab === 'save') {
      const curRound = TEACH_DATA.zeroLab.saveGameRounds[saveRound % TEACH_DATA.zeroLab.saveGameRounds.length];
      saveTimeRemaining = curRound.timeLimit;

      clearInterval(saveTimer);
      saveTimer = setInterval(() => {
        saveTimeRemaining--;
        const numEl = document.getElementById('save-time-num');
        if (numEl) numEl.textContent = saveTimeRemaining + 's';

        if (saveTimeRemaining <= 0) {
          clearInterval(saveTimer);
          const fb = document.getElementById('save-feedback');
          if (fb) {
            fb.className = 'pred-feedback hint';
            fb.style.display = 'block';
            fb.innerHTML = 'Time expired! Numbers broke down. Tap the tab to try again!';
          }
        }
      }, 1000);

      container.querySelectorAll('.save-digit-btn').forEach(btn => {
        btn.onclick = (e) => {
          const val = parseInt(e.currentTarget.dataset.val, 10);
          const emptySlotIdx = savePlacedSlots.findIndex(s => s === null);
          if (emptySlotIdx !== -1) {
            savePlacedSlots[emptySlotIdx] = val;
            e.currentTarget.style.visibility = 'hidden';

            // Check if all placed
            if (savePlacedSlots.every(s => s !== null)) {
              clearInterval(saveTimer);
              const builtNum = parseInt(savePlacedSlots.join(''), 10);
              const fb = document.getElementById('save-feedback');
              if (builtNum === curRound.targetNumber) {
                fb.className = 'pred-feedback ok';
                fb.style.display = 'block';
                fb.innerHTML = `<strong>🏆 Number Saved!</strong> ${curRound.targetNumber} is fully anchored in stability!`;
                if (!S.teach.zeroLab.completed.includes('save_' + saveRound)) {
                  S.teach.zeroLab.completed.push('save_' + saveRound);
                  save();
                  awardXP(15, `Saved ${curRound.targetNumber}!`);
                }
              } else {
                fb.className = 'pred-feedback hint';
                fb.style.display = 'block';
                fb.innerHTML = `Assembled ${builtNum}, but target was ${curRound.targetNumber}. Watch the place columns!`;
              }
            }
            renderZeroLab();
          }
        };
      });
    }

    if (activeTab === 'history') {
      say("From Mesopotamian punctuation to Brahmagupta's mathematical rules — witness zero's rise. 🐾", false);
    }
  }

  window.initZeroLab = initZeroLab;
})();
