/* ═══════════════════════════════════════════════════
   BharatMath — Mathematical Detective
   Identify mathematical crimes & hidden fallacies
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let activeLevel = 1; // 1 | 2 | 3
  let activeCaseIdx = 0;
  let accusedStep = null;
  let revealedHintsCount = 0;
  let caseSolved = false;

  function initDetective() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.detective) {
      S.teach.detective = { completed: [], level: 1 };
    }

    activeLevel = S.teach.detective.level || 1;
    activeCaseIdx = 0;
    accusedStep = null;
    revealedHintsCount = 0;
    caseSolved = false;

    renderDetectiveView();
  }

  function renderDetectiveView() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const levelData = TEACH_DATA.detective.levels.find(l => l.level === activeLevel) || TEACH_DATA.detective.levels[0];
    const caseData = levelData.cases[activeCaseIdx % levelData.cases.length];
    const isAlreadyCompleted = (S.teach.detective.completed || []).includes(caseData.id);

    // Build step items
    let stepsHtml = '';
    caseData.steps.forEach(step => {
      let statusClass = '';
      if (accusedStep === step.num) {
        statusClass = step.num === caseData.wrongStep ? 'accused-correct' : 'accused-wrong';
      } else if (caseSolved && step.num === caseData.wrongStep) {
        statusClass = 'accused-correct';
      }

      stepsHtml += `
        <div class="case-step-item ${statusClass}" data-step="${step.num}">
          <span class="case-step-num">${step.num}</span>
          <span class="case-step-text">${step.text}</span>
          ${accusedStep === step.num ? (step.num === caseData.wrongStep ? '🎯 Crime Located!' : '❌ Innocent Step') : ''}
        </div>
      `;
    });

    const isStepIdentified = accusedStep === caseData.wrongStep || caseSolved;

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="det-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">🔍 Mathematical Detective</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="detective-container">
        <!-- Level Selector Badges -->
        <div class="detective-level-selector" aria-label="Detective Ranks">
          ${TEACH_DATA.detective.levels.map(l => `
            <button class="level-badge-btn ${l.level === activeLevel ? 'active' : ''}" data-lvl="${l.level}">
              ${l.badge}
            </button>
          `).join('')}
        </div>

        <!-- Case Dossier -->
        <article class="case-dossier">
          <div class="case-dossier-header">
            <div>
              <span class="teach-badge" style="margin-bottom:0.4rem; display:inline-block;">Case File #${caseData.id.toUpperCase()}</span>
              <h1 class="case-title">🕵️ ${caseData.title}</h1>
            </div>
            <div>
              <span style="font-size:0.85rem; color:var(--muted);">Case ${activeCaseIdx + 1} of ${levelData.cases.length}</span>
            </div>
          </div>

          <!-- Problem Statement -->
          <div class="case-statement-box">
            <strong>The Incident Report:</strong> ${caseData.statement}
          </div>

          <!-- Numbered Steps -->
          <div style="margin-bottom:0.8rem; font-weight:600; color:var(--gold);">
            Click the step where the mathematical error took place:
          </div>
          <div class="case-steps-list">
            ${stepsHtml}
          </div>

          <!-- Repair Phase (Appears once wrong step is pinned) -->
          <div id="repair-phase" style="${isStepIdentified ? '' : 'display:none;'} background:rgba(0,0,0,0.4); border:1px solid var(--teach-border); border-radius:var(--rad-sm); padding:1.5rem; margin-top:1.5rem;">
            <div style="font-weight:700; color:var(--gold2); font-size:1.1rem; margin-bottom:0.8rem;">
              ⚖️ Repair the Fallacy: ${caseData.question}
            </div>

            <div class="pred-options-grid" id="repair-options">
              ${caseData.options.map((opt, oIdx) => `
                <button class="pred-btn repair-opt-btn" data-oidx="${oIdx}">
                  <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}
                </button>
              `).join('')}
            </div>

            <div id="repair-feedback" style="${caseSolved ? '' : 'display:none;'} margin-top:1.2rem;">
              ${caseSolved ? `
                <div class="case-solved-stamp">CASE CLOSED ⚖️</div>
                <div class="pred-feedback ok" style="margin-top:1rem;">
                  <strong>Judicial Verdict:</strong> ${caseData.verdict}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Progressive Hint Drawer -->
          <div style="margin-top:2rem; border-top:1px solid rgba(224,173,74,0.15); padding-top:1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <button id="det-request-hint" class="teach-back-btn" ${revealedHintsCount >= caseData.hints.length ? 'disabled style="opacity:0.4;"' : ''}>
                💡 Request Clue (${revealedHintsCount}/${caseData.hints.length})
              </button>
            </div>
            <div>
              <button id="det-next-case" class="btn-pri" style="padding:0.5rem 1.4rem;" ${!caseSolved ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
                Next Case File ▶
              </button>
            </div>
          </div>

          <!-- Hints List -->
          <div id="det-hints-container" style="margin-top:1rem;">
            ${caseData.hints.slice(0, revealedHintsCount).map((h, i) => `
              <div class="pred-feedback hint" style="margin-bottom:0.5rem;">
                <strong>Clue #${i + 1}:</strong> ${h}
              </div>
            `).join('')}
          </div>
        </article>
      </div>
    `;

    // Back to hub
    $('#det-back-hub').onclick = () => {
      openTeaching();
    };

    // Level tabs
    container.querySelectorAll('.level-badge-btn').forEach(btn => {
      btn.onclick = (e) => {
        activeLevel = parseInt(e.currentTarget.dataset.lvl, 10);
        S.teach.detective.level = activeLevel;
        save();
        activeCaseIdx = 0;
        accusedStep = null;
        revealedHintsCount = 0;
        caseSolved = false;
        renderDetectiveView();
      };
    });

    // Step items click
    container.querySelectorAll('.case-step-item').forEach(item => {
      item.onclick = (e) => {
        if (caseSolved) return;
        const stepNum = parseInt(e.currentTarget.dataset.step, 10);
        accusedStep = stepNum;

        if (stepNum === caseData.wrongStep) {
          say("Got him! That is the fraudulent step. Now select the mathematical repair! 🐾", true);
        } else {
          say("Step " + stepNum + " holds up under interrogation. Look closer! 🐾", true);
        }
        renderDetectiveView();
      };
    });

    // Repair options
    container.querySelectorAll('.repair-opt-btn').forEach(btn => {
      btn.onclick = (e) => {
        const oIdx = parseInt(e.currentTarget.dataset.oidx, 10);
        const fb = $('#repair-feedback');
        const nextCaseBtn = $('#det-next-case');

        if (oIdx === caseData.correctOption) {
          e.currentTarget.classList.add('correct');
          caseSolved = true;
          fb.style.display = 'block';
          fb.innerHTML = `
            <div class="case-solved-stamp">CASE CLOSED ⚖️</div>
            <div class="pred-feedback ok" style="margin-top:1rem;">
              <strong>Correct Repair:</strong> ${caseData.correctedStep}<br><br>
              <strong>Judicial Verdict:</strong> ${caseData.verdict}
            </div>
          `;

          if (nextCaseBtn) {
            nextCaseBtn.removeAttribute('disabled');
            nextCaseBtn.style.opacity = '1';
            nextCaseBtn.style.pointerEvents = 'all';
          }

          if (!S.teach.detective.completed.includes(caseData.id)) {
            S.teach.detective.completed.push(caseData.id);
            save();
            awardXP(15, `Solved Case #${caseData.id.toUpperCase()}!`);
          }
        } else {
          e.currentTarget.classList.add('wrong');
          fb.style.display = 'block';
          fb.innerHTML = `
            <div class="pred-feedback hint">
              That repair does not resolve the contradiction. Re-examine the principles!
            </div>
          `;
          say("Not quite. Test the mathematical identities carefully! 🐾", true);
        }
      };
    });

    // Request hint
    const hintBtn = $('#det-request-hint');
    if (hintBtn) {
      hintBtn.onclick = () => {
        if (revealedHintsCount < caseData.hints.length) {
          revealedHintsCount++;
          renderDetectiveView();
        }
      };
    }

    // Next case
    const nextCaseBtn = $('#det-next-case');
    if (nextCaseBtn) {
      nextCaseBtn.onclick = () => {
        activeCaseIdx = (activeCaseIdx + 1) % levelData.cases.length;
        accusedStep = null;
        revealedHintsCount = 0;
        caseSolved = false;
        renderDetectiveView();
      };
    }

    say("Inspect each step of the deduction. Click the step with the fallacy! 🐾", false);
  }

  window.initDetective = initDetective;
})();
