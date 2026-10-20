/* ═══════════════════════════════════════════════════
   BharatMath — Decode the Scholar's Manuscript
   Mystery puzzle scroll with authentic Sanskrit verses
   ═══════════════════════════════════════════════════ */

'use strict';

(function () {
  let activeClueIdx = 0;

  function initManuscript() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    if (!S.teach.manuscript) {
      S.teach.manuscript = { completed: [], cluesSolved: 0 };
    }

    renderManuscriptView();
  }

  function renderManuscriptView() {
    const container = document.getElementById('teach-inner');
    if (!container) return;

    const mData = TEACH_DATA.manuscript;
    const clues = mData.clues;
    const solvedList = S.teach.manuscript.completed || [];
    const solvedCount = solvedList.length;

    let cluesHtml = '';
    clues.forEach((clue, idx) => {
      const isSolved = solvedList.includes(clue.id);
      const isUnlocked = idx === 0 || solvedList.includes(clues[idx - 1].id);

      cluesHtml += `
        <div class="manuscript-clue-card ${isUnlocked ? '' : 'smudged'} ${isSolved ? 'cleared' : ''}" id="clue-card-${idx}">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <span style="font-family:'Cinzel',serif; font-weight:700; color:#5c2d12; font-size:1.1rem;">
              📜 Clue #${clue.number}: ${clue.title}
            </span>
            ${isSolved ? '<span class="teach-badge" style="background:rgba(126,203,106,0.3); border-color:#2e7d32; color:#1b5e20;">✓ Deciphered</span>' : ''}
          </div>

          <div class="sanskrit-verse">${clue.sanskritVerse}</div>
          <div class="sanskrit-meaning">“${clue.verseMeaning}”</div>

          <p style="font-size:0.95rem; line-height:1.6; margin-bottom:1rem; color:#2a1a10;">
            ${clue.prompt}
          </p>

          ${!isSolved ? `
            <div style="display:flex; gap:0.8rem; max-width:440px; margin-top:0.8rem;">
              <input type="text" class="practice-input clue-input" data-cidx="${idx}" placeholder="${clue.placeholder}" style="background:#fff; color:#222; border-color:#8d6e63;" aria-label="Decipher answer">
              <button class="btn-pri clue-submit-btn" data-cidx="${idx}" style="background:#702a14; color:#fff; border:none; padding:0.6rem 1.4rem;">
                Reveal
              </button>
            </div>
            <div class="clue-feedback" id="clue-fb-${idx}" style="display:none; margin-top:0.8rem;"></div>
          ` : `
            <div style="background:rgba(126,203,106,0.2); border:1px solid #7ecb6a; border-radius:6px; padding:0.8rem 1rem; color:#1b5e20; font-weight:600;">
              ✨ Verified Inscription: <strong>${clue.correctAnswer}</strong>
            </div>
          `}
        </div>
      `;
    });

    const allCracked = solvedCount >= clues.length;

    container.innerHTML = `
      <!-- Sticky Top Bar -->
      <header class="teach-nav-bar">
        <div class="teach-nav-left">
          <button id="ms-back-hub" class="teach-back-btn" aria-label="Back to Teaching Hub">
            ◀ Teaching Hub
          </button>
          <h2 class="teach-nav-title">📜 Scholar's Manuscript</h2>
        </div>
        <div class="teach-nav-right">
          <span class="teach-xp-pill">⚡ ${S.xp} XP</span>
        </div>
      </header>

      <div class="manuscript-container">
        <!-- Parchment Scroll Surface -->
        <article class="parchment-scroll">
          <div style="text-align:center; margin-bottom:1.5rem;">
            <div style="font-size:2rem; color:#8d6e63; margin-bottom:0.2rem;">ॐ</div>
            <h1 style="font-size:clamp(1.6rem, 4vw, 2.4rem); color:#4a2810; margin:0 0 0.4rem;">
              The Ancient Scholar's Mathematical Notes
            </h1>
            <div style="font-family:'Inter',sans-serif; font-size:0.85rem; color:#6d4c41; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">
              Progress: ${solvedCount} / ${clues.length} Clues Deciphered
            </div>
          </div>

          <!-- Academic Disclaimer -->
          <div style="background:rgba(139,90,43,0.1); border-left:3px solid #8d6e63; padding:0.6rem 1rem; border-radius:0 6px 6px 0; font-family:'Inter',sans-serif; font-size:0.82rem; color:#4e342e; margin-bottom:2rem; line-height:1.5;">
            ${mData.disclaimer}
          </div>

          <!-- Clues List -->
          <div>
            ${cluesHtml}
          </div>

          ${allCracked ? `
            <div style="text-align:center; background:rgba(224,173,74,0.2); border:2px solid #b8860b; border-radius:12px; padding:2rem; margin-top:2rem;">
              <h2 style="font-family:'Cinzel',serif; color:#4a2810; margin-top:0;">🏆 The Manuscript is Fully Deciphered!</h2>
              <p style="font-family:'Inter',sans-serif; font-size:1.05rem; color:#26160c; line-height:1.7; max-width:640px; margin:0 auto;">
                You have traversed triangular progressions, restored the bindu to its place value, computed the altar diagonal with Baudhayana, and integrated Madhava's alternating series. The scholar's lineage is illuminated!
              </p>
            </div>
          ` : ''}
        </article>
      </div>
    `;

    // Back to hub
    $('#ms-back-hub').onclick = () => {
      openTeaching();
    };

    // Clue verification buttons
    container.querySelectorAll('.clue-submit-btn').forEach(btn => {
      btn.onclick = (e) => {
        const cIdx = parseInt(e.currentTarget.dataset.cidx, 10);
        const inputEl = container.querySelector(`.clue-input[data-cidx="${cIdx}"]`);
        const fbEl = document.getElementById(`clue-fb-${cIdx}`);
        const clue = clues[cIdx];
        if (!inputEl || !fbEl) return;

        const raw = (inputEl.value || '').trim();
        if (!raw) return;

        const val = raw.toUpperCase();
        const acceptable = [clue.correctAnswer.toUpperCase(), ...(clue.altAnswers || []).map(a => a.toUpperCase())];

        const isMatch = acceptable.includes(val) || acceptable.some(a => val.includes(a));

        if (isMatch) {
          fbEl.className = 'pred-feedback ok';
          fbEl.style.display = 'block';
          fbEl.innerHTML = '✨ Inscription Deciphered! The next stanza awakens!';

          if (!S.teach.manuscript.completed.includes(clue.id)) {
            S.teach.manuscript.completed.push(clue.id);
            S.teach.manuscript.cluesSolved = S.teach.manuscript.completed.length;
            save();
            awardXP(15, `Clue #${clue.number} deciphered!`);
          }

          setTimeout(() => {
            renderManuscriptView();
          }, 800);
        } else {
          fbEl.className = 'pred-feedback hint';
          fbEl.style.display = 'block';
          fbEl.innerHTML = `<strong>Clue Hint:</strong> ${clue.hint}`;
          say(`Clue hint: ${clue.hint}`, true);
        }
      };
    });

    say("Decode the scholar's cryptic Sanskrit notes and triangular series! 🐾", false);
  }

  window.initManuscript = initManuscript;
})();
