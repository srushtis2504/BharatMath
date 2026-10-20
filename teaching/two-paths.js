/* ═══════════════════════════════════════════════════
   BharatMath — Two Paths: Ancient vs Modern
   Interactive comparative learning module with
   dedicated Vedic Mathematics Masterclass & Simulator
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let activeProblemIdx = 0;
  let currentStepIdx = 0;
  let predictionAnswered = false;
  let practiceMode = 'guided'; // 'guided' or 'direct'

  function initTwoPaths() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.twoPaths) {
      S.teach.twoPaths = { completed: [], currentProblem: 0 };
    }

    activeProblemIdx = S.teach.twoPaths.currentProblem || 0;
    if (activeProblemIdx >= TEACH_DATA.twoPaths.length) activeProblemIdx = 0;
    currentStepIdx = 0;
    predictionAnswered = false;
    practiceMode = 'guided';

    renderProblemView();
  }

  function renderProblemView() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const prob = TEACH_DATA.twoPaths[activeProblemIdx];
    const isProblemCompleted = (S.teach.twoPaths.completed || []).includes(prob.id);

    // Build problem selector tabs
    let tabsHtml = '';
    TEACH_DATA.twoPaths.forEach((p, idx) => {
      const isDone = (S.teach.twoPaths.completed || []).includes(p.id);
      const isActive = idx === activeProblemIdx;
      tabsHtml += `
        <button class="prob-tab ${isActive ? 'active' : ''}" data-idx="${idx}">
          ${isDone ? '✅ ' : ''}${p.title.split(':')[0]}
        </button>
      `;
    });

    // Vedic Masterclass card HTML (if present for this problem)
    let masterclassHtml = '';
    if (prob.vedicMasterclass) {
      const vm = prob.vedicMasterclass;
      masterclassHtml = `
        <div class="vedic-masterclass-card" id="vedic-masterclass-panel">
          <div class="sutra-header-row">
            <div class="sutra-title-box">
              <div class="sutra-sanskrit">
                <span>🕉️</span> <span>${vm.sutra}</span>
              </div>
              <div class="sutra-meaning">"${vm.meaning}"</div>
            </div>
            <button id="toggle-sutra-calc" class="btn-sec" style="font-size:0.82rem; padding:0.4rem 0.9rem;">
              ⚡ Interactive Sūtra Simulator
            </button>
          </div>

          <div class="sutra-rule-callout">
            <strong>Mental Sūtra Principle:</strong> ${vm.rule}
            <br>
            <span class="sutra-algebra-pill">Algebraic Foundation: ${vm.algebraicProof}</span>
          </div>

          <div class="sutra-steps-grid">
            ${vm.mentalSteps.map(st => `
              <div class="sutra-step-card">
                <div class="sutra-step-name">${st.name}</div>
                <div class="sutra-step-detail">${st.detail}</div>
              </div>
            `).join('')}
          </div>

          <!-- Interactive Sūtra Simulator -->
          <div class="vedic-playground-box" id="vedic-playground">
            <div class="vplay-title">
              <span>🪄</span> <span>Interactive Vedic Mental Math Lab (Try Any Numbers!)</span>
            </div>
            <div style="font-size:0.85rem; color:var(--muted); margin-bottom:0.8rem;">
              Select a preset or enter two numbers to watch the Vedic mental algorithm calculate the answer step-by-step:
            </div>
            <div class="vplay-presets">
              ${vm.interactivePresets.map((pre, pIdx) => `
                <button class="vplay-preset-btn ${pIdx === 0 ? 'active' : ''}" data-a="${pre.a}" data-b="${pre.b}">
                  ${pre.a} × ${pre.b}
                </button>
              `).join('')}
            </div>
            <div class="vplay-input-row">
              <input type="number" id="vplay-in-a" class="vplay-input" value="${vm.interactivePresets[0].a}" aria-label="First number">
              <span style="font-size:1.2rem; color:var(--gold); font-weight:700;">×</span>
              <input type="number" id="vplay-in-b" class="vplay-input" value="${vm.interactivePresets[0].b}" aria-label="Second number">
              <button id="vplay-solve-btn" class="btn-pri" style="padding:0.5rem 1.2rem; font-size:0.88rem;">
                Calculate with Sūtra ⚡
              </button>
            </div>
            <div id="vplay-output" class="vplay-step-visualizer"></div>
          </div>
        </div>
      `;
    }

    // Build steps side-by-side
    let ancientStepsHtml = '';
    let modernStepsHtml = '';

    prob.steps.forEach((step, sIdx) => {
      const isRevealed = sIdx <= currentStepIdx;
      const isCurrent = sIdx === currentStepIdx;

      ancientStepsHtml += `
        <div class="step-card ${isRevealed ? (isCurrent ? 'active' : 'completed') : ''}" id="ancient-step-${sIdx}">
          <div class="step-badge">Step ${step.stepNum} · ${prob.ancientMethodName}</div>
          <div class="step-card-title">${step.ancient.title}</div>
          <div class="step-math-box">${step.ancient.math}</div>
          <div class="step-desc">${step.ancient.desc}</div>
        </div>
      `;

      modernStepsHtml += `
        <div class="step-card ${isRevealed ? (isCurrent ? 'active' : 'completed') : ''}" id="modern-step-${sIdx}">
          <div class="step-badge">Step ${step.stepNum} · ${prob.modernMethodName}</div>
          <div class="step-card-title">${step.modern.title}</div>
          <div class="step-math-box">${step.modern.math}</div>
          <div class="step-desc">${step.modern.desc}</div>
        </div>
      `;
    });

    const curStepData = prob.steps[currentStepIdx];
    const allStepsRevealed = currentStepIdx >= prob.steps.length - 1 && predictionAnswered;

    // Guided steps HTML for practice
    let guidedHtml = '';
    if (prob.practice.guidedSteps && prob.practice.guidedSteps.length > 0) {
      guidedHtml = `
        <div style="display:flex; align-items:center; gap:0.6rem; margin:1rem 0;">
          <span style="font-size:0.88rem; color:var(--muted); font-weight:600;">Practice Mode:</span>
          <button id="btn-mode-guided" class="btn-sec ${practiceMode === 'guided' ? 'active' : ''}" style="font-size:0.8rem; padding:0.35rem 0.8rem;">
            🎓 Guided Step-by-Step
          </button>
          <button id="btn-mode-direct" class="btn-sec ${practiceMode === 'direct' ? 'active' : ''}" style="font-size:0.8rem; padding:0.35rem 0.8rem;">
            ⚡ Direct Speed Test
          </button>
        </div>

        <div id="guided-steps-container" class="guided-practice-box" style="${practiceMode === 'guided' ? '' : 'display:none;'}">
          ${prob.practice.guidedSteps.map((gs, gIdx) => `
            <div class="guided-step-row" id="guided-row-${gIdx}">
              <div style="flex:1; min-width:240px;">
                <span class="teach-badge" style="font-size:0.7rem; margin-right:0.4rem;">${gs.step}</span>
                <span style="font-size:0.92rem; color:var(--fg);">${gs.question}</span>
              </div>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <input type="text" class="guided-sub-input practice-input" data-gidx="${gIdx}" style="width:110px; padding:0.45rem 0.6rem; font-size:0.9rem;" placeholder="Answer..." aria-label="${gs.step}">
                <button class="guided-sub-check btn-pri" data-gidx="${gIdx}" style="padding:0.45rem 0.8rem; font-size:0.82rem;">
                  Check
                </button>
                <span class="guided-status-icon" id="guided-status-${gIdx}" style="font-size:1.1rem; width:24px;"></span>
              </div>
              <div class="guided-hint-row" id="guided-hint-${gIdx}" style="display:none; width:100%; font-size:0.82rem; color:var(--amber); margin-top:0.3rem;"></div>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="tp-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">⚖️ Two Paths: Ancient vs Modern</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="two-paths-container">
        <!-- Problem Tabs -->
        <nav class="problem-selector-tabs" aria-label="Select Problem">
          ${tabsHtml}
        </nav>

        <!-- Problem Header Card -->
        <div class="two-paths-header-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
            <h1 class="two-paths-prob-title">${prob.title}</h1>
            ${isProblemCompleted ? '<span class="teach-badge" style="background:rgba(126,203,106,0.2); border-color:var(--ok); color:var(--ok);">✅ Mastered</span>' : ''}
          </div>
          <div class="two-paths-source-tag">
            <span>📚 <strong>Sources:</strong> ${prob.source}</span>
          </div>
          <div class="two-paths-hist-note">
            <strong>Historical Context:</strong> ${prob.historicalNote}
          </div>
        </div>

        <!-- Vedic Masterclass Panel (if present) -->
        ${masterclassHtml}

        <!-- Side-by-Side Method Grid -->
        <div class="two-paths-grid">
          <!-- Ancient Column -->
          <div class="path-column path-ancient">
            <div class="path-header">
              <span class="path-title">🏛️ ${prob.ancientMethodName}</span>
              <span class="teach-badge" style="color:var(--teach-ancient); border-color:var(--teach-ancient);">Classical Indian</span>
            </div>
            ${ancientStepsHtml}
          </div>

          <!-- Modern Column -->
          <div class="path-column path-modern">
            <div class="path-header">
              <span class="path-title">🔬 ${prob.modernMethodName}</span>
              <span class="teach-badge" style="color:var(--teach-modern); border-color:var(--teach-modern);">Modern Textbook</span>
            </div>
            ${modernStepsHtml}
          </div>
        </div>

        <!-- Step Predictor Interaction Box -->
        <div class="prediction-box" id="prediction-panel">
          <div class="pred-header">
            <span>🔮</span>
            <span>Step ${curStepData.stepNum} Prediction Challenge: What comes next?</span>
          </div>
          <p style="font-size:1.05rem; margin-bottom:1.2rem; color:var(--fg); line-height:1.6;">
            ${curStepData.prediction.question}
          </p>

          <div class="pred-options-grid" id="pred-options">
            ${curStepData.prediction.options.map((opt, oIdx) => `
              <button class="pred-btn" data-opt="${oIdx}">
                <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}
              </button>
            `).join('')}
          </div>

          <div id="pred-feedback" style="display:none;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <button id="tp-prev-step" class="teach-back-btn" ${currentStepIdx === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
                ◀ Previous Step
              </button>
            </div>
            <div>
              <span style="font-size:0.88rem; color:var(--muted); margin-right:1rem;">
                Step ${currentStepIdx + 1} of ${prob.steps.length}
              </span>
              <button id="tp-next-step" class="btn-pri" style="padding:0.5rem 1.4rem; font-size:0.9rem;" ${!predictionAnswered || currentStepIdx >= prob.steps.length - 1 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
                Next Step ▶
              </button>
            </div>
          </div>
        </div>

        <!-- Practice Challenge Box -->
        <div class="practice-box" id="practice-box" style="${allStepsRevealed ? '' : 'display:none;'}">
          <div class="practice-header">
            <span>✏️</span>
            <span>Hands-on Practice: Put it to the test!</span>
          </div>
          <p style="font-size:1rem; color:var(--fg); line-height:1.6;">
            ${prob.practice.prompt}
          </p>

          ${guidedHtml}

          <!-- Direct Input Row -->
          <div class="practice-input-row" id="direct-input-row" style="${practiceMode === 'direct' || !prob.practice.guidedSteps ? '' : 'display:none;'}">
            <input type="text" id="practice-input" class="practice-input" placeholder="${prob.practice.placeholder}" aria-label="Your answer">
            <button id="practice-submit" class="btn-pri" style="padding:0.75rem 1.6rem;">
              Verify Answer
            </button>
          </div>

          <div style="margin-top:0.8rem;">
            <button id="btn-show-walkthrough" class="btn-sec" style="font-size:0.82rem; padding:0.35rem 0.8rem;">
              💡 Show Mental Walkthrough
            </button>
          </div>

          <div id="practice-feedback" style="display:none; margin-top:1rem;"></div>
        </div>
      </div>
    `;

    // Attach event listeners
    attachEventListeners(prob, curStepData);

    // Initial render of Vedic playground if available
    if (prob.vedicMasterclass) {
      executeVedicSimulator(prob.vedicMasterclass.interactivePresets[0].a, prob.vedicMasterclass.interactivePresets[0].b, prob.id);
    }

    say(`Explore ${prob.title}. Master the classical Indian mental method and compare step-by-step! 🐾`, false);
  }

  function attachEventListeners(prob, curStepData) {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    // Problem selector tabs
    container.querySelectorAll('.prob-tab').forEach(tab => {
      tab.onclick = (e) => {
        activeProblemIdx = parseInt(e.currentTarget.dataset.idx, 10);
        S.teach.twoPaths.currentProblem = activeProblemIdx;
        save();
        currentStepIdx = 0;
        predictionAnswered = false;
        renderProblemView();
      };
    });

    // Back to hub
    const backBtn = $('#tp-back-hub');
    if (backBtn) {
      backBtn.onclick = () => openTeaching();
    }

    // Vedic simulator toggle
    const toggleCalcBtn = $('#toggle-sutra-calc');
    if (toggleCalcBtn) {
      toggleCalcBtn.onclick = () => {
        const vplay = $('#vedic-playground');
        if (vplay) {
          vplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
          vplay.style.boxShadow = '0 0 25px rgba(224, 173, 74, 0.4)';
          setTimeout(() => { vplay.style.boxShadow = ''; }, 1200);
        }
      };
    }

    // Vedic playground presets
    container.querySelectorAll('.vplay-preset-btn').forEach(btn => {
      btn.onclick = (e) => {
        container.querySelectorAll('.vplay-preset-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const a = parseInt(e.currentTarget.dataset.a, 10);
        const b = parseInt(e.currentTarget.dataset.b, 10);
        const inA = $('#vplay-in-a');
        const inB = $('#vplay-in-b');
        if (inA) inA.value = a;
        if (inB) inB.value = b;
        executeVedicSimulator(a, b, prob.id);
      };
    });

    // Vedic playground solve button
    const solveBtn = $('#vplay-solve-btn');
    if (solveBtn) {
      solveBtn.onclick = () => {
        const a = parseInt($('#vplay-in-a').value, 10);
        const b = parseInt($('#vplay-in-b').value, 10);
        if (isNaN(a) || isNaN(b)) return;
        executeVedicSimulator(a, b, prob.id);
      };
    }

    // Prediction options
    const optionBtns = container.querySelectorAll('.pred-btn');
    const feedbackBox = $('#pred-feedback');
    const nextBtn = $('#tp-next-step');

    optionBtns.forEach(btn => {
      btn.onclick = (e) => {
        const selectedOpt = parseInt(e.currentTarget.dataset.opt, 10);
        const correctOpt = curStepData.prediction.correct;

        if (selectedOpt === correctOpt) {
          e.currentTarget.classList.add('correct');
          optionBtns.forEach(b => { if (b !== e.currentTarget) b.style.opacity = '0.5'; });
          feedbackBox.className = 'pred-feedback ok';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <strong>✨ Brilliant Deduction!</strong><br>
            ${curStepData.explanation}
          `;
          predictionAnswered = true;
          if (nextBtn) {
            nextBtn.removeAttribute('disabled');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'all';
          }

          if (!curStepData._awarded) {
            curStepData._awarded = true;
            awardXP(5, `Step ${curStepData.stepNum} prediction verified!`);
          }

          if (currentStepIdx >= prob.steps.length - 1) {
            const pracBox = $('#practice-box');
            if (pracBox) pracBox.style.display = 'block';
          }
        } else {
          e.currentTarget.classList.add('wrong');
          feedbackBox.className = 'pred-feedback hint';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <strong>💡 Not quite:</strong> ${curStepData.prediction.hint}
          `;
          say(`Hint: ${curStepData.prediction.hint}`, true);
        }
      };
    });

    // Previous step
    const prevBtn = $('#tp-prev-step');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentStepIdx > 0) {
          currentStepIdx--;
          predictionAnswered = true;
          renderProblemView();
        }
      };
    }

    // Next step
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentStepIdx < prob.steps.length - 1) {
          currentStepIdx++;
          predictionAnswered = false;
          renderProblemView();
        }
      };
    }

    // Practice mode switchers
    const btnGuided = $('#btn-mode-guided');
    const btnDirect = $('#btn-mode-direct');
    if (btnGuided && btnDirect) {
      btnGuided.onclick = () => {
        practiceMode = 'guided';
        btnGuided.classList.add('active');
        btnDirect.classList.remove('active');
        const gBox = $('#guided-steps-container');
        const dRow = $('#direct-input-row');
        if (gBox) gBox.style.display = 'block';
        if (dRow) dRow.style.display = 'none';
      };
      btnDirect.onclick = () => {
        practiceMode = 'direct';
        btnDirect.classList.add('active');
        btnGuided.classList.remove('active');
        const gBox = $('#guided-steps-container');
        const dRow = $('#direct-input-row');
        if (gBox) gBox.style.display = 'none';
        if (dRow) dRow.style.display = 'flex';
      };
    }

    // Guided sub-step check buttons
    container.querySelectorAll('.guided-sub-check').forEach(btn => {
      btn.onclick = (e) => {
        const gidx = parseInt(e.currentTarget.dataset.gidx, 10);
        const stepDef = prob.practice.guidedSteps[gidx];
        const inputEl = container.querySelector(`.guided-sub-input[data-gidx="${gidx}"]`);
        const statusEl = $(`#guided-status-${gidx}`);
        const hintEl = $(`#guided-hint-${gidx}`);
        if (!inputEl) return;

        const val = inputEl.value.trim().toLowerCase();
        const expected = stepDef.answer.toLowerCase();

        if (val === expected || (val && expected.includes(val))) {
          statusEl.textContent = '✅';
          statusEl.style.color = 'var(--ok)';
          hintEl.style.display = 'none';
          inputEl.style.borderColor = 'var(--ok)';
          inputEl.disabled = true;
          btn.disabled = true;
          btn.style.opacity = '0.5';

          // Check if all guided steps completed
          const allInputs = container.querySelectorAll('.guided-sub-input');
          const allDone = Array.from(allInputs).every(inp => inp.disabled);
          if (allDone) {
            const pracFeedback = $('#practice-feedback');
            if (pracFeedback) {
              pracFeedback.className = 'pred-feedback ok';
              pracFeedback.style.display = 'block';
              pracFeedback.innerHTML = `
                <strong>🎉 All Guided Steps Mastered!</strong><br>
                ${prob.practice.solutionWalkthrough}
              `;
            }
            if (!S.teach.twoPaths.completed.includes(prob.id)) {
              S.teach.twoPaths.completed.push(prob.id);
              save();
              awardXP(15, `${prob.title.split(':')[0]} complete!`);
            }
          }
        } else {
          statusEl.textContent = '❌';
          statusEl.style.color = 'var(--bad)';
          hintEl.textContent = `Hint: ${stepDef.hint}`;
          hintEl.style.display = 'block';
          inputEl.style.borderColor = 'var(--bad)';
        }
      };
    });

    // Walkthrough reveal
    const btnWalk = $('#btn-show-walkthrough');
    if (btnWalk) {
      btnWalk.onclick = () => {
        const pracFeedback = $('#practice-feedback');
        if (pracFeedback) {
          pracFeedback.className = 'pred-feedback hint';
          pracFeedback.style.display = 'block';
          pracFeedback.innerHTML = `
            <strong>💡 Mental Solution Walkthrough:</strong><br>
            ${prob.practice.solutionWalkthrough}
          `;
        }
      };
    }

    // Direct practice submit
    const pracSubmit = $('#practice-submit');
    if (pracSubmit) {
      pracSubmit.onclick = () => {
        const val = ($('#practice-input').value || '').trim();
        const pracFeedback = $('#practice-feedback');
        if (!val) return;

        let isCorrect = false;
        if (prob.practice.tolerance > 0) {
          const numVal = parseFloat(val);
          const target = parseFloat(prob.practice.correctAnswer);
          if (!isNaN(numVal) && Math.abs(numVal - target) <= prob.practice.tolerance) {
            isCorrect = true;
          }
        } else {
          if (val.toLowerCase() === prob.practice.correctAnswer.toLowerCase()) {
            isCorrect = true;
          }
        }

        if (isCorrect) {
          pracFeedback.className = 'pred-feedback ok';
          pracFeedback.style.display = 'block';
          pracFeedback.innerHTML = `
            <strong>🎉 Perfectly Solved!</strong><br>
            ${prob.practice.solutionWalkthrough}
          `;

          if (!S.teach.twoPaths.completed.includes(prob.id)) {
            S.teach.twoPaths.completed.push(prob.id);
            save();
            awardXP(15, `${prob.title.split(':')[0]} complete!`);
          }
        } else {
          pracFeedback.className = 'pred-feedback hint';
          pracFeedback.style.display = 'block';
          pracFeedback.innerHTML = `
            <strong>Check your calculation:</strong> Review the step progression above and give it another try.
          `;
          say("Check the steps above carefully. You've got this! 🐾", true);
        }
      };
    }
  }

  /* ── Interactive Vedic Algorithm Visualizer ── */
  function executeVedicSimulator(a, b, probId) {
    const out = $('#vplay-output');
    if (!out) return;

    if (probId === 'p5') {
      // Nikhilam Base 100 Multiplication
      const d1 = a - 100;
      const d2 = b - 100;
      const leftPart = a + d2; // or b + d1
      const rightPart = d1 * d2;
      const rightPartStr = rightPart < 10 ? '0' + rightPart : '' + rightPart;
      const result = leftPart * 100 + rightPart;

      out.innerHTML = `
        <div style="font-family:ui-monospace, monospace; font-size:1rem; line-height:1.8; color:#fcd34d;">
          <div style="border-bottom:1px solid rgba(224,173,74,0.3); padding-bottom:0.5rem; margin-bottom:0.6rem;">
            <strong>Base = 100</strong> | Deviations: <strong>${a} (${d1})</strong> and <strong>${b} (${d2})</strong>
          </div>
          <div>1️⃣ <strong>Left Part (Cross-Subtraction):</strong> ${a} + (${d2}) = <strong>${leftPart}</strong> (or ${b} + (${d1}) = ${leftPart})</div>
          <div>2️⃣ <strong>Right Part (Deficiency Product):</strong> (${d1}) × (${d2}) = <strong>${rightPartStr}</strong></div>
          <div style="font-size:1.15rem; color:#fff; margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed rgba(224,173,74,0.4);">
            ✨ <strong>Vedic Single-Line Result:</strong> ${leftPart} | ${rightPartStr} = <span style="color:var(--gold); font-weight:800;">${result}</span>
          </div>
        </div>
      `;
    } else if (probId === 'p6' || (b === a && a % 10 === 5)) {
      // Ekādhikena Squaring of numbers ending in 5
      const prefix = Math.floor(a / 10);
      const nextPref = prefix + 1;
      const leftPart = prefix * nextPref;
      const rightPart = 25;
      const result = leftPart * 100 + rightPart;

      out.innerHTML = `
        <div style="font-family:ui-monospace, monospace; font-size:1rem; line-height:1.8; color:#fcd34d;">
          <div style="border-bottom:1px solid rgba(224,173,74,0.3); padding-bottom:0.5rem; margin-bottom:0.6rem;">
            <strong>Ekādhikena Pūrvena Rule:</strong> Squaring ${a}²
          </div>
          <div>1️⃣ <strong>Prefix Part:</strong> Multiply ${prefix} by "one more" (${nextPref}) → ${prefix} × ${nextPref} = <strong>${leftPart}</strong></div>
          <div>2️⃣ <strong>Suffix Part:</strong> Always 5² = <strong>25</strong></div>
          <div style="font-size:1.15rem; color:#fff; margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed rgba(224,173,74,0.4);">
            ✨ <strong>Vedic Single-Line Result:</strong> ${leftPart} | 25 = <span style="color:var(--gold); font-weight:800;">${result}</span>
          </div>
        </div>
      `;
    } else {
      // Ūrdhva-Tiryagbhyām (Vertical & Crosswise)
      const a1 = Math.floor(a / 10);
      const a0 = a % 10;
      const b1 = Math.floor(b / 10);
      const b0 = b % 10;

      const unitProd = a0 * b0;
      const unitDigit = unitProd % 10;
      const carry1 = Math.floor(unitProd / 10);

      const crossSum = (a1 * b0) + (a0 * b1) + carry1;
      const tensDigit = crossSum % 10;
      const carry2 = Math.floor(crossSum / 10);

      const hundredVal = (a1 * b1) + carry2;
      const result = a * b;

      out.innerHTML = `
        <div style="font-family:ui-monospace, monospace; font-size:1rem; line-height:1.8; color:#fcd34d;">
          <div style="border-bottom:1px solid rgba(224,173,74,0.3); padding-bottom:0.5rem; margin-bottom:0.6rem;">
            <strong>Ūrdhva-Tiryagbhyām:</strong> ${a} × ${b} (Tens: [${a1}, ${b1}], Units: [${a0}, ${b0}])
          </div>
          <div>1️⃣ <strong>Vertical Units ( | ):</strong> ${a0} × ${b0} = ${unitProd} → Write <strong>${unitDigit}</strong>, carry <strong>${carry1}</strong></div>
          <div>2️⃣ <strong>Crosswise Diagonals ( ✕ ):</strong> (${a1}×${b0}) + (${a0}×${b1}) + ${carry1} (carry) = ${a1*b0} + ${a0*b1} + ${carry1} = ${crossSum} → Write <strong>${tensDigit}</strong>, carry <strong>${carry2}</strong></div>
          <div>3️⃣ <strong>Vertical Tens ( | ):</strong> (${a1} × ${b1}) + ${carry2} (carry) = ${a1*b1} + ${carry2} = <strong>${hundredVal}</strong></div>
          <div style="font-size:1.15rem; color:#fff; margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed rgba(224,173,74,0.4);">
            ✨ <strong>Vedic Assembled Result:</strong> [${hundredVal}][${tensDigit}][${unitDigit}] = <span style="color:var(--gold); font-weight:800;">${result}</span>
          </div>
        </div>
      `;
    }
  }

  window.initTwoPaths = initTwoPaths;
})();
