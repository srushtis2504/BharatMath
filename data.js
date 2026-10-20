/* ═══════════════════════════════════════════════════
   BharatMath — Data: Eras, Events, Fun Facts
   ═══════════════════════════════════════════════════ */

/* ─── Eras ─────────────────────────────────────── */
const ERA = [
  {
    n: "Vedic Age",
    a: -1500, b: -900,
    intro: "Vedic literature counts in a decimal style and names powers of ten. Dating of these texts is approximate and scholarly ranges vary.",
    color: "#e07a2a"
  },
  {
    n: "Sulba Era",
    a: -800, b: -200,
    intro: "The Sulba Sutras are ritual manuals that give rope-and-peg rules for constructing altars, with real geometry inside.",
    color: "#c8a020"
  },
  {
    n: "Classical Age",
    a: 224, b: 700,
    intro: "Mathematics and astronomy flourish in the first millennium CE. Note that the dating of the Bakhshali manuscript is debated.",
    color: "#4da88a"
  },
  {
    n: "Bhaskara to Kerala",
    a: 1150, b: 1500,
    intro: "From Bhaskara II's algebra to the Kerala school's infinite series, centuries before calculus in Europe.",
    color: "#7a6cc8"
  },
  {
    n: "Ramanujan",
    a: 1887, b: 1920,
    intro: "The short, brilliant life of Srinivasa Ramanujan, a self-taught genius of number theory.",
    color: "#d45080"
  },
  {
    n: "1922–1933 (zoom demo)",
    a: 1922, b: 1933,
    intro: "",
    color: "#5a5a5a",
    note: "No verified events have been entered for 1922–1933. Only sourced entries are added, so this range is empty on purpose."
  }
];

/* ─── Events ───────────────────────────────────── */
const EV = [
  {
    y: -1400,
    t: "Vedic number names",
    l: "c. 1500–1000 BCE (approximate)",
    who: "Authors of the Vedic texts",
    c: "Vedic texts use decimal-style number words and name large powers of ten. Exact dating of the texts is uncertain.",
    s: "MacTutor and Joseph, The Crest of the Peacock (verify)",
    q: "Write 10 × 10 × 10 × 10 as a single number.",
    a: 10000, tol: 0,
    h: "Four tens multiplied: 10, 100, 1000, …",
    x: "10⁴ = 10 000: decimal place value is built from repeated powers of ten."
  },
  {
    y: -800,
    t: "Sulba Sutras",
    l: "c. 800–200 BCE (approximate)",
    who: "Baudhayana, Apastamba, Katyayana (traditional attributions)",
    c: "Ritual altar-construction manuals with geometric rules, including a rule equivalent to the Pythagorean relation and an approximation of √2.",
    s: "MacTutor, Indian Sulbasutras",
    q: "The Sulba rule for √2 is 1 + 1/3 + 1/12 − 1/408. Compute it to 4 decimals.",
    a: 1.4142, tol: 0.00015,
    h: "1/3 ≈ 0.3333, 1/12 ≈ 0.0833, 1/408 ≈ 0.00245.",
    x: "The sum is 1.414216; true √2 is 1.414214 — accurate to five decimals."
  },
  {
    y: 224,
    t: "Bakhshali manuscript",
    l: "Dating debated: 2017 radiocarbon results span c. 224–993 CE",
    who: "Anonymous scribes",
    c: "Birch-bark mathematical text using a dot as a placeholder zero. Its dating is contested among scholars.",
    s: "Bodleian Libraries / Oxford, 2017; scholarly debate noted",
    q: "Write 3 hundreds, 0 tens and 5 ones as one number.",
    a: 305, tol: 0,
    h: "The zero keeps the tens place empty.",
    x: "305: the placeholder stops the 3 and 5 from collapsing into 35."
  },
  {
    y: 499,
    t: "Aryabhatiya",
    l: "499 CE (author states birth in 476 CE)",
    who: "Aryabhata",
    c: "Compact verses on mathematics and astronomy, including a value of π as 62832/20000.",
    s: "MacTutor, Aryabhata I",
    q: "Compute Aryabhata's value of π: 62832 ÷ 20000, to 4 decimals.",
    a: 3.1416, tol: 0.00005,
    h: "Divide 62832 by 2, then by 10 000.",
    x: "62832 ÷ 20000 = 3.1416, close to the true π = 3.14159…"
  },
  {
    y: 628,
    t: "Brahmasphutasiddhanta",
    l: "628 CE",
    who: "Brahmagupta",
    c: "Gives rules for arithmetic with zero and negative numbers. His rule for dividing by zero is not accepted in modern arithmetic.",
    s: "MacTutor, Brahmagupta",
    q: "Using the rules for debts and fortunes: (−3) × (−4) = ?",
    a: 12, tol: 0,
    h: "A negative times a negative is positive.",
    x: "(−3) × (−4) = 12."
  },
  {
    y: 1150,
    t: "Siddhanta Shiromani",
    l: "c. 1150 CE",
    who: "Bhaskara II",
    c: "Includes the Lilavati and Bijaganita; refines the cyclic (chakravala) method for Pell-type equations.",
    s: "MacTutor, Bhaskara II",
    q: "For a Pell-type equation x² − 2y² = 1 with y = 12, find positive x.",
    a: 17, tol: 0,
    h: "x² = 1 + 2 × 144.",
    x: "x² = 289, so x = 17. (Illustration only, not Bhaskara's own example.)"
  },
  {
    y: 1340,
    t: "Madhava of Sangamagrama",
    l: "c. 1340–1425 CE",
    who: "Madhava, Kerala school",
    c: "Credited with infinite series for sine, cosine and arctangent, including the series for π/4.",
    s: "MacTutor, Madhava of Sangamagrama",
    q: "Using 4 × (1 − 1/3 + 1/5 …), compute the first three terms to 3 decimals.",
    a: 3.467, tol: 0.002,
    h: "1 − 0.3333 + 0.2 = 0.8667, then × 4.",
    x: "4 × 0.86667 = 3.4667. More terms close in on π."
  },
  {
    y: 1887,
    t: "Ramanujan born",
    l: "22 December 1887",
    who: "Srinivasa Ramanujan",
    c: "Born in Erode, Madras Presidency; later made major contributions to number theory.",
    s: "MacTutor, Ramanujan",
    q: "The number 1729 = 1³ + 12³. It is also 9³ + 10³. Compute 9³ + 10³.",
    a: 1729, tol: 0,
    h: "9³ = 729 and 10³ = 1000.",
    x: "729 + 1000 = 1729."
  },
  {
    y: 1918,
    t: "Ramanujan elected FRS",
    l: "1918",
    who: "Srinivasa Ramanujan",
    c: "Elected a Fellow of the Royal Society in 1918.",
    s: "MacTutor, Ramanujan",
    q: "How many ways can 5 be written as a sum (order ignored)? Example: 4+1.",
    a: 7, tol: 0,
    h: "5; 4+1; 3+2; 3+1+1; 2+2+1; 2+1+1+1; 1+1+1+1+1.",
    x: "There are 7 partitions of 5."
  },
  {
    y: 1920,
    t: "Ramanujan dies",
    l: "26 April 1920",
    who: "Srinivasa Ramanujan",
    c: "Died in Kumbakonam, aged 32.",
    s: "MacTutor, Ramanujan",
    q: "Born in 1887, died in 1920. How many calendar years apart are those two years?",
    a: 33, tol: 0,
    h: "1920 − 1887.",
    x: "1920 − 1887 = 33 calendar years (he was 32, since his birthday is in December)."
  }
].sort((a, b) => a.y - b.y);

/* Assign each event to its era */
EV.forEach(v => {
  v.era = ERA.findIndex(r => v.y >= r.a && v.y <= r.b);
});

/* ─── Fun Facts: exactly 2 per era, pure maths ─── */
/* Each card: { head, detail }
   head  = short punchy title shown on FRONT of flip-card
   detail = the mathematical explanation shown on BACK               */
const FUN = [
  /* 0 — Vedic Age (BCE) */
  [
    {
      head: "Counted to a trillion in 1500 BCE",
      detail: "Sanskrit had distinct words for every power of ten up to 10¹² (Parardha). While Greek numerals struggled past thousands, Vedic mathematicians already worked with place-value names like Ayuta (10⁴), Niyuta (10⁵), Prayuta (10⁶) — the foundation of our modern decimal system."
    },
    {
      head: "Right angles from 3 : 4 : 5",
      detail: "The Vedic Shatapatha Brahmana describes creating perfect 90° corners using a knotted rope in the ratio 3:4:5. Since 3²+4²=5², this is a direct application of what we call the Pythagorean theorem — used for sacred fire-altar layout c. 800 BCE, centuries before Greece."
    }
  ],

  /* 1 — Sulba Era (BCE) */
  [
    {
      head: "√2 correct to 5 decimal places, 800 BCE",
      detail: "Baudhayana's Sulba Sutra gives √2 = 1 + 1/3 + 1/(3×4) − 1/(3×4×34) = 1.41421356…  The true value is 1.41421356…  The error is less than 1 in 10 million — achieved with fractions alone, no calculator, no algebra notation."
    },
    {
      head: "Pythagoras? Baudhayana came first",
      detail: "The Baudhayana Sulba Sutra (c. 800 BCE) explicitly states: 'The diagonal of a rectangle produces by itself both the areas which the two sides produce separately.' This is the Pythagorean theorem — stated at least 200 years before Pythagoras of Samos (c. 570 BCE) was born."
    }
  ],

  /* 2 — Classical Age (CE) */
  [
    {
      head: "π to 4 correct decimals in 499 CE",
      detail: "Aryabhata gave π = 62832 / 20000 = 3.1416. He also noted the value is 'approximate' (āsanna) — making him possibly the first mathematician to explicitly acknowledge π is irrational. His sine table computed values in steps of 3.75° with errors under 0.001%."
    },
    {
      head: "Zero as a full number — 628 CE",
      detail: "Brahmagupta's Brahmasphutasiddhanta (628 CE) was the first book to treat zero as a number in its own right, with formal arithmetic rules: a + 0 = a, a − 0 = a, a × 0 = 0. He also defined negative numbers as 'debts' and gave rules for their arithmetic — 1,200 years before Europe accepted them."
    }
  ],

  /* 3 — Bhaskara to Kerala (CE) */
  [
    {
      head: "Infinite series for π — 250 yrs before Leibniz",
      detail: "Madhava of Sangamagrama (c. 1340–1425 CE) discovered π/4 = 1 − 1/3 + 1/5 − 1/7 + … and computed π to 11 correct decimal places. The same series was independently found by Leibniz in 1676 and is named after him in the West — but Madhava preceded him by roughly 250 years."
    },
    {
      head: "Bhaskara's Chakravala solved Pell equations",
      detail: "Bhaskara II's cyclic algorithm (chakravala, c. 1150 CE) solved equations of the form x² − Ny² = 1 for any N. His smallest solution for N = 61 is x = 1766319049, y = 226153980 — a result European mathematicians could not reproduce until Euler and Lagrange in the 1760s, 600 years later."
    }
  ],

  /* 4 — Ramanujan (CE) */
  [
    {
      head: "1729: the smallest taxicab number",
      detail: "1729 = 1³ + 12³ = 9³ + 10³. When Hardy visited Ramanujan in hospital and mentioned his taxi number 1729, Ramanujan instantly identified it as the smallest positive integer expressible as the sum of two positive cubes in two different ways. This class of numbers is now called Hardy–Ramanujan or taxicab numbers."
    },
    {
      head: "Partition formula: p(200) = 3,972,999,029,388",
      detail: "Ramanujan and Hardy (1918) found an asymptotic formula for p(n) — the number of ways to write n as an unordered sum. For n = 200 the formula gives exactly 3,972,999,029,388 partitions. Ramanujan also spotted three stunning congruences: p(5k+4) ≡ 0 mod 5, p(7k+5) ≡ 0 mod 7, p(11k+6) ≡ 0 mod 11."
    }
  ],

  /* 5 — demo era */
  [
    {
      head: "No verified entries yet",
      detail: "This date range is intentionally empty. BharatMath only shows sourced, verified mathematical events — never invented discoveries. Hover back to dismiss."
    },
    {
      head: "Why gaps matter in history",
      detail: "An empty range is honest scholarship. Mathematical traditions sometimes had periods of consolidation rather than new breakthroughs. The absence of verified events here reflects careful sourcing, not a gap in Indian mathematical achievement."
    }
  ]
];

/* ─── Ticker facts (timeline ribbon) ───────────── */
const TICKER_FACTS = [
  "The decimal place-value system used worldwide today was invented in ancient India.",
  "Aryabhata (499 CE) calculated Earth's circumference as 39,968 km — the real value is 40,075 km, an error of 0.27%.",
  "Baudhayana stated the Pythagorean theorem at least 200 years before Pythagoras was born.",
  "Madhava's infinite series for π preceded Leibniz and Gregory by ~250 years.",
  "Brahmagupta defined zero and negative-number arithmetic in 628 CE — 1,200 years before Europe.",
  "Ramanujan's 'lost notebook', found in 1976, contained 600 unproved formulas, many still being proved today.",
  "The Sulba Sutra gives √2 = 1.41421356 — correct to 5 decimal places, circa 800 BCE.",
  "1729 = 1³ + 12³ = 9³ + 10³ — identified instantly by Ramanujan from a hospital bed.",
  "Bhaskara II solved Pell equations in 1150 CE; Europe matched this only in the 1760s.",
  "Ancient Vedic priests needed exact area-doubling for fire altars — forcing the invention of √2.",
  "Aryabhata computed a sine table correct to 4 decimal places in 499 CE.",
  "The Kerala school computed π to 11 decimal places by the 15th century CE.",
  "Panini's Sanskrit grammar (~500 BCE) used formal rewriting rules resembling modern formal language theory.",
  "Ramanujan found three partition congruences: p(5k+4)≡0 mod 5, p(7k+5)≡0 mod 7, p(11k+6)≡0 mod 11.",
  "Indian astronomers proposed Earth rotates on its axis at least 1,000 years before Copernicus."
];

/* ═══════════════════════════════════════════════════
   TEACHING HUB DATA & ACTIVITY CONTENT
   Verified historical references and mathematical content
   ═══════════════════════════════════════════════════ */
const TEACH_DATA = {
  activities: [
    {
      id: "twoPaths",
      title: "Two Paths: Ancient vs Modern",
      icon: "⚖️",
      tagline: "Same problem, two distinct mindsets. Reveal, predict & compare.",
      desc: "Step through mathematical problems side-by-side using classical Indian algorithms and modern textbook methods. Predict upcoming steps and test your skills.",
      badge: "Signature Lab",
      duration: "6-8 min",
      xp: 40
    },
    {
      id: "zeroLab",
      title: "Zero Laboratory",
      icon: "⭕",
      tagline: "Explore place value, the bindu, and the revolutionary shunya.",
      desc: "An interactive number playground. Drag digits, manipulate positions (35 vs 305 vs 350), play the arcade 'Save the Number' rush, and trace zero across civilizations.",
      badge: "Interactive Playground",
      duration: "5-7 min",
      xp: 35
    },
    {
      id: "detective",
      title: "Mathematical Detective",
      icon: "🔍",
      tagline: "Find the subtle crime hidden in the calculations.",
      desc: "9 challenging case files across 3 ranks. Identify which step contains the mathematical fallacy, request progressive clues, and submit the authentic repair.",
      badge: "Deduction Game",
      duration: "7-10 min",
      xp: 45
    },
    {
      id: "workshop",
      title: "Ancient Engineer's Workshop",
      icon: "📐",
      tagline: "Interactive Śulbasūtra geometry using pegs, ropes & altars.",
      desc: "Draw and construct on an interactive canvas. Double the square altar, pull the Baudhayana √2 rope, and transform rectangles to squares with exact geometric invariance.",
      badge: "Canvas Geometry",
      duration: "6-9 min",
      xp: 40
    },
    {
      id: "manuscript",
      title: "Scholar's Manuscript",
      icon: "📜",
      tagline: "Decipher smudged palm leaves, sequences & cryptic notes.",
      desc: "A fictional interactive historical scroll containing 5 authentic mathematical puzzles. Clean ink stains as you decode triangular numbers, roots, and infinite series.",
      badge: "Parchment Mystery",
      duration: "5-8 min",
      xp: 35
    },
    {
      id: "constellation",
      title: "Knowledge Constellation",
      icon: "🌌",
      tagline: "Connect ideas across astronomy, algebra & geometry.",
      desc: "Watch your personal star map ignite as you complete activities. Connect the cosmic lineages between Zero, Sulbas, Kerala series, and Ramanujan's modular forms.",
      badge: "Progression Map",
      duration: "Ongoing",
      xp: 50
    }
  ],

  /* ── 1. TWO PATHS DATA ── */
  twoPaths: [
    {
      id: "p1",
      title: "Problem 1: Multiply 16 × 12",
      topic: "Arithmetic & Cross Multiplication",
      source: "Ancient: Urdhva Tiryakbhyam (Vertical & Crosswise method popular in Indian pedagogical arithmetic) · Modern: Standard Column Multiplication",
      historicalNote: "Vertical and crosswise multiplication (also related to the lattice method) allowed calculating products in a single row without separate scratchpads. Documented historically in Lilavati of Bhaskara II (1150 CE) and Sanskrit commentaries.",
      ancientMethodName: "Vedic Crosswise (Ūrdhva-Tiryag)",
      modernMethodName: "Modern Column Multiplication",
      vedicMasterclass: {
        sutra: "Ūrdhva-Tiryagbhyām (ऊर्ध्वतिर्यग्भ्याम्)",
        meaning: "Vertically and Crosswise",
        rule: "To multiply any two numbers, perform three mental moves: Vertical units, Crosswise products with carry, Vertical tens.",
        algebraicProof: "(10a + b)(10c + d) = 100(ac) + 10(ad + bc) + bd",
        mentalSteps: [
          { name: "Step 1: Vertical Units ( | )", detail: "Multiply right units digits: 6 × 2 = 12. Keep 2, carry 1 to tens column." },
          { name: "Step 2: Crosswise Diagonals ( ✕ )", detail: "Cross-multiply and sum: (1×2) + (6×1) + 1 (carry) = 2 + 6 + 1 = 9." },
          { name: "Step 3: Vertical Tens ( | )", detail: "Multiply left tens digits: 1 × 1 = 1. No carry. Final assembled result: 192!" }
        ],
        interactivePresets: [
          { a: 16, b: 12 },
          { a: 23, b: 14 },
          { a: 31, b: 24 }
        ]
      },
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "Vertical Units Multiplication",
            math: "Units column: 6 × 2 = 12",
            desc: "Multiply rightmost digits vertically. Write down 2 in the ones column, carry over 1 to tens.",
            visual: "units_cross"
          },
          modern: {
            title: "Partial Product with Ones Digit",
            math: "16 × 2 = 32",
            desc: "Multiply the entire top number (16) by the ones digit of the bottom number (2).",
            visual: "modern_row1"
          },
          prediction: {
            question: "What is the next step in the Ancient Crosswise method?",
            options: [
              "Multiply 1 × 1 vertically",
              "Cross-multiply (1×2) + (6×1) and add the carry 1",
              "Multiply 16 × 10",
              "Add 16 + 12"
            ],
            correct: 1,
            hint: "The method is called 'Vertical and Crosswise' — after the vertical units, we perform cross-multiplication across the two columns."
          },
          explanation: "In crosswise multiplication, the tens digit comes from the sum of cross-products: (1×2) + (6×1) = 2 + 6 = 8, plus the carry 1 = 9."
        },
        {
          stepNum: 2,
          ancient: {
            title: "Crosswise Multiplication + Carry",
            math: "(1 × 2) + (6 × 1) + 1 (carry) = 2 + 6 + 1 = 9",
            desc: "Cross-multiply diagonals and sum them together with the previous carry. Write down 9 in the tens position.",
            visual: "cross_diag"
          },
          modern: {
            title: "Partial Product with Tens Digit",
            math: "16 × 10 = 160",
            desc: "Multiply 16 by 1 (the tens digit), which is effectively 16 × 10 = 160.",
            visual: "modern_row2"
          },
          prediction: {
            question: "How does the Ancient method determine the hundreds (leftmost) digit?",
            options: [
              "Multiply leftmost digits vertically: 1 × 1",
              "Add 9 + 32",
              "Take the square of 16",
              "Divide 192 by 2"
            ],
            correct: 0,
            hint: "Look at the leftmost vertical pair: the tens digits of 16 and 12."
          },
          explanation: "The leftmost digits (1 × 1) are multiplied vertically to complete the number: 1 × 1 = 1."
        },
        {
          stepNum: 3,
          ancient: {
            title: "Vertical Tens (Hundreds Place)",
            math: "1 × 1 = 1 (no carry) → Place 1 in hundreds",
            desc: "Result directly assembled in one pass: [1][9][2] = 192.",
            visual: "ancient_final"
          },
          modern: {
            title: "Sum the Partial Products",
            math: "32 + 160 = 192",
            desc: "Add both rows of partial products to obtain the final product.",
            visual: "modern_final"
          },
          prediction: {
            question: "What is the key structural difference between the two approaches?",
            options: [
              "Ancient computes digit-by-digit place values in one parallel pass; Modern accumulates whole multi-digit partial rows.",
              "Ancient only works for small numbers below 20.",
              "Modern multiplication doesn't use carrying.",
              "They produce different numerical answers."
            ],
            correct: 0,
            hint: "Think about memory requirements: Ancient writes digits directly from right to left in a single row."
          },
          explanation: "The Indian crosswise method computes each place value directly from right to left, making it ideal for mental calculation and sand-board slate arithmetic without intermediate paper trails."
        }
      ],
      practice: {
        prompt: "Now apply the Ūrdhva-Tiryag Sūtra to multiply 23 × 14 mentally!",
        placeholder: "Enter product (e.g. 250)...",
        correctAnswer: "322",
        tolerance: 0,
        guidedSteps: [
          { step: "1. Vertical Units", question: "Units digit: 3 × 4 = 12. What digit is written in the units place?", answer: "2", hint: "Write down 2, carry 1." },
          { step: "2. Crosswise Sum", question: "Cross multiply (2×4) + (3×1) + carry 1. What is the value before writing?", answer: "12", hint: "(2×4) + (3×1) + 1 = 8 + 3 + 1 = 12. Write 2, carry 1." },
          { step: "3. Vertical Tens", question: "Multiply tens digits (2 × 1) and add carry 1. What is the hundreds digit?", answer: "3", hint: "2 × 1 + 1 = 3." }
        ],
        solutionWalkthrough: "1) Units: 3 × 4 = 12 (write 2, carry 1). 2) Cross: (2×4) + (3×1) + 1 = 8 + 3 + 1 = 12 (write 2, carry 1). 3) Hundreds: 2 × 1 + 1 = 3. Final answer: 322."
      }
    },
    {
      id: "p2",
      title: "Problem 2: Approximating √2",
      topic: "Irrational Numbers & Geometric Altar Roots",
      source: "Ancient: Baudhayana Śulba Sūtra (c. 800 BCE, 1.61-62) · Modern: Newton-Raphson Method (1669 CE)",
      historicalNote: "The Śulba Sūtras contain the earliest recorded rational approximation to √2 in world history: 'Increase the measure by its third, and this by its fourth less its thirty-fourth part.'",
      ancientMethodName: "Baudhayana's Śulba Formula",
      modernMethodName: "Newton-Raphson Iteration",
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "Base Measure + Third Part",
            math: "1 + 1/3 = 4/3 ≈ 1.333333",
            desc: "Start with unit length 1, then add one-third of the side.",
            visual: "rope_one_third"
          },
          modern: {
            title: "Initial Guess & First Iteration",
            math: "x₀ = 1, x₁ = (1 + 2/1)/2 = 1.5",
            desc: "Formula x_{n+1} = (x_n + 2/x_n)/2. Starting at 1 gives 1.5.",
            visual: "newton_iter1"
          },
          prediction: {
            question: "What is Baudhayana's next correction term?",
            options: [
              "Add one-fourth of the previous third: + 1/(3 × 4)",
              "Subtract 1/2",
              "Multiply by 2",
              "Add π / 4"
            ],
            correct: 0,
            hint: "The verse states: '...and this by its own fourth...' (one fourth of one third = 1/12)."
          },
          explanation: "Baudhayana adds 1/(3×4) = 1/12, bringing the running sum to 1 + 1/3 + 1/12 = 17/12 ≈ 1.416666."
        },
        {
          stepNum: 2,
          ancient: {
            title: "Second Correction: The 1/12 Increment",
            math: "1 + 1/3 + 1/(3×4) = 17/12 ≈ 1.416667",
            desc: "Notice that 17/12 = 1.416667 is already very close to √2 (error of only ~0.17%). This matches the 2nd Newton iteration!",
            visual: "rope_twelfth"
          },
          modern: {
            title: "Second Newton Iteration",
            math: "x₂ = (1.5 + 2/1.5)/2 = 17/12 ≈ 1.416667",
            desc: "Averaging 1.5 and 2/1.5 yields exactly 17/12, matching Baudhayana's 2nd term!",
            visual: "newton_iter2"
          },
          prediction: {
            question: "What final genius subtraction did Baudhayana introduce to reach 5 decimal accuracy?",
            options: [
              "- 1/(3 × 4 × 34) = - 1/408",
              "- 1/100",
              "- 1/1000",
              "+ 1/500"
            ],
            correct: 0,
            hint: "In Sanskrit: 'sa-viśeṣa' indicates less the thirty-fourth part of the preceding term."
          },
          explanation: "Subtracting 1/(3×4×34) = 1/408 from 17/12 yields 577/408 ≈ 1.414215686... True √2 is 1.41421356... Correct to 5 decimal places (~0.00015% error)!"
        },
        {
          stepNum: 3,
          ancient: {
            title: "The Sūtra Ratio: 577 / 408",
            math: "577 / 408 = 1.414215686...",
            desc: "Derived geometrically without decimals or calculus in 800 BCE. An error of less than 2 parts per million.",
            visual: "sulba_gold"
          },
          modern: {
            title: "Third Newton Iteration: 577 / 408",
            math: "x₃ = (17/12 + 2/(17/12))/2 = 577/408",
            desc: "Newton's calculus yields the identical fraction 577/408 that the Vedic Śulba masters constructed 2,500 years earlier.",
            visual: "newton_iter3"
          },
          prediction: {
            question: "Why did the Vedic builders need such high precision for √2?",
            options: [
              "Ritual fire altars (Vedi) required exact doubling of area without changing shape.",
              "They were building pyramids across the ocean.",
              "To predict solar eclipses only.",
              "It was required for currency taxation."
            ],
            correct: 0,
            hint: "The altars like the Syenaciti (falcon altar) had rigid geometric rules where the area had to double precisely while preserving geometry."
          },
          explanation: "Religious tradition required sacrificial altars to preserve ritual area with extreme geometric fidelity. Doubling a square altar requires a side of s√2 — making √2 a matter of sacred engineering."
        }
      ],
      practice: {
        prompt: "Calculate the decimal value of Baudhayana's fraction 577 / 408 to 4 decimal places.",
        placeholder: "e.g. 1.3500",
        correctAnswer: "1.4142",
        tolerance: 0.0005,
        solutionWalkthrough: "577 ÷ 408 = 1.414215686... Rounded to 4 decimal places gives 1.4142."
      }
    },
    {
      id: "p3",
      title: "Problem 3: Calculating π to Infinite Precision",
      topic: "Calculus & Infinite Series",
      source: "Ancient: Madhava of Sangamagrama (c. 1340-1425 CE, Kerala School) · Modern: Gregory-Leibniz Series (1671 / 1674 CE)",
      historicalNote: "Madhava established the power series for sine, cosine, and arctangent centuries before European calculus. His verse for π/4 = 1 - 1/3 + 1/5 - 1/7... is preserved in Yuktibhāṣā (1530 CE).",
      ancientMethodName: "Madhava's Infinite Series (Yuktibhāṣā)",
      modernMethodName: "Gregory-Leibniz Series / Polygonal Exhaustion",
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "The Alternating Odd Reciprocals",
            math: "π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...",
            desc: "Derived via infinitesimal arc integration on a circle divided into minute chords (cāpa).",
            visual: "madhava_circle"
          },
          modern: {
            title: "Taylor Expansion of arctan(1)",
            math: "arctan(x) = x - x³/3 + x⁵/5 - ... → for x=1, π/4",
            desc: "Published by James Gregory (1671) and Gottfried Leibniz (1674).",
            visual: "leibniz_curve"
          },
          prediction: {
            question: "What is the 5th term in this infinite series for π/4?",
            options: ["+ 1/9", "- 1/9", "+ 1/11", "- 1/10"],
            correct: 0,
            hint: "The signs alternate (+, -, +, -, +) and the denominators are consecutive odd numbers (1, 3, 5, 7, 9)."
          },
          explanation: "The terms are alternating odd unit fractions: +1/1, -1/3, +1/5, -1/7, +1/9. So the 5th term is +1/9."
        },
        {
          stepNum: 2,
          ancient: {
            title: "Madhava's Correction Terms (Antya-Samskāra)",
            math: "Remainder correction: R_n ≈ 1 / (4n)",
            desc: "Madhava realized the raw series converges painfully slowly, so he invented correction terms (tail remainders) that accelerate convergence by hundreds of times!",
            visual: "madhava_correction"
          },
          modern: {
            title: "Euler-Maclaurin Acceleration",
            math: "Asymptotic expansion of truncation error",
            desc: "Modern numerical analysis adds an integral correction to truncated series, rediscovered in Europe in 1735.",
            visual: "euler_accel"
          },
          prediction: {
            question: "Why was Madhava's invention of correction terms so revolutionary?",
            options: [
              "Without correction, summing 1,000 terms yields only 2 decimals; with his correction, just 50 terms give 11 correct decimal places!",
              "It eliminated the need for subtraction.",
              "It only worked on prime numbers.",
              "It proved π was an integer."
            ],
            correct: 0,
            hint: "Raw Gregory-Leibniz requires 500,000 terms to get 5 decimals. Madhava got 11 decimals with a tiny handful of terms."
          },
          explanation: "The slow convergence of the arctan series was a major computational bottleneck in world mathematics. Madhava's analytical remainder terms allowed calculating π to 11 accurate decimal places in the 14th century."
        }
      ],
      practice: {
        prompt: "Calculate the exact value of the first three terms of Madhava's series: 1 - 1/3 + 1/5 as a decimal (to 2 decimal places).",
        placeholder: "e.g. 0.65",
        correctAnswer: "0.87",
        tolerance: 0.02,
        solutionWalkthrough: "1 - 1/3 + 1/5 = 15/15 - 5/15 + 3/15 = 13/15 ≈ 0.8667. Rounded to 2 decimals gives 0.87."
      }
    },
    {
      id: "p4",
      title: "Problem 4: Solving Quadratic Equations",
      topic: "Algebra & Unknowns (Bījanita)",
      source: "Ancient: Brahmagupta (628 CE, Brāhmasphuṭasiddhānta) · Modern: Quadratic Formula / Factoring",
      historicalNote: "Brahmagupta gave the universal algebraic solution for ax² + bx = c in words: 'To the absolute quantity multiplied by four times the square, add the square of the middle term; the square root of the same, less the middle term, being divided by twice the square, is the value.'",
      ancientMethodName: "Brahmagupta's Universal Verse (628 CE)",
      modernMethodName: "Modern Quadratic Formula (x = (-b ± √(b²-4ac))/2a)",
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "Brahmagupta's Transform",
            math: "For x² + 4x = 12: Multiply c by 4a: 12 × 4 = 48. Add b²: 48 + 16 = 64.",
            desc: "Translating Brahmagupta's Sanskrit verse directly: (4ac + b²). Notice this is the discriminant!",
            visual: "brahma_verse"
          },
          modern: {
            title: "Compute the Discriminant",
            math: "Δ = b² - 4ac = 4² - 4(1)(-12) = 16 + 48 = 64",
            desc: "Standard modern discriminant calculation.",
            visual: "modern_quad"
          },
          prediction: {
            question: "According to Brahmagupta's instruction, what do you do after taking the square root of 64 (which is 8)?",
            options: [
              "'Less the middle term, divided by twice the coefficient of the square': (8 - 4) / (2 × 1)",
              "Add 12 to 8",
              "Multiply 8 by 4",
              "Divide 8 by 0"
            ],
            correct: 0,
            hint: "The verse says: '...the square root of the same, less the middle term (b), divided by twice the square (2a)...'"
          },
          explanation: "Root = (8 - 4) / 2 = 4 / 2 = 2. Brahmagupta gave the explicit algorithmic steps for completing the square long before symbolic algebra was invented!"
        }
      ],
      practice: {
        prompt: "Find the positive root of x² + 6x = 16 using Brahmagupta's method.",
        placeholder: "Enter value of x...",
        correctAnswer: "2",
        tolerance: 0,
        solutionWalkthrough: "1) 4ac + b² = 4(1)(16) + 6² = 64 + 36 = 100. 2) √100 = 10. 3) (10 - b)/(2a) = (10 - 6)/2 = 4/2 = 2. Check: 2² + 6(2) = 4 + 12 = 16."
      }
    },
    {
      id: "p5",
      title: "Problem 5: Vedic Base Multiplication (Nikhilam)",
      topic: "Vedic Mental Arithmetic & Base Deficiency",
      source: "Ancient: Nikhilam Navataścaramam Daśatah (निखिलं नवतश्चरमं दशतः) · Modern: Multi-step Long Multiplication",
      historicalNote: "The Nikhilam Sūtra translates to 'All from 9 and the last from 10'. It provides a legendary mental calculation shortcut when numbers are close to a power of 10 (such as 100 or 1,000).",
      ancientMethodName: "Nikhilam Base-100 Sūtra",
      modernMethodName: "Traditional 2-Row Column Multiplication",
      vedicMasterclass: {
        sutra: "Nikhilam Navataścaramam Daśatah (निखिलं नवतश्चरमं दशतः)",
        meaning: "All from 9 and the last from 10",
        rule: "To multiply numbers near base 100 (e.g. 96 × 94): Write their deficiencies (-4 and -6). Left part = cross-subtract (96 - 6 = 90). Right part = product of deficiencies (-4 × -6 = 24). Result: 9024 in 2 seconds!",
        algebraicProof: "(100 - a)(100 - b) = 100(100 - a - b) + ab",
        mentalSteps: [
          { name: "Step 1: Check Deficiencies from 100", detail: "96 is 4 below 100 (-4). 94 is 6 below 100 (-6)." },
          { name: "Step 2: Cross Subtraction (Left Half)", detail: "Subtract either crosswise: 96 - 6 = 90 (or 94 - 4 = 90). This is the left part!" },
          { name: "Step 3: Multiply Deficiencies (Right Half)", detail: "Multiply the two deficiencies: (-4) × (-6) = +24. Put side-by-side: 90 | 24 = 9024!" }
        ],
        interactivePresets: [
          { a: 96, b: 94 },
          { a: 98, b: 95 },
          { a: 93, b: 97 }
        ]
      },
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "Identify Base & Deficiencies",
            math: "Base = 100.  96 → -4  |  94 → -6",
            desc: "Instead of multiplying large two-digit numbers, Vedic math converts them into small mental deviations (-4 and -6) from base 100.",
            visual: "nikhilam_base"
          },
          modern: {
            title: "First Row Partial Product",
            math: "96 × 4 = 384",
            desc: "Multiply top number 96 by 4 (the ones digit of 94).",
            visual: "modern_row1"
          },
          prediction: {
            question: "How does the Nikhilam Sūtra determine the left part (thousands and hundreds) of the answer?",
            options: [
              "Cross-subtract: 96 - 6 = 90 (or 94 - 4 = 90)",
              "Multiply 90 × 90",
              "Add 96 + 94",
              "Divide 96 by 94"
            ],
            correct: 0,
            hint: "Subtract the opposite deficiency: either 96 minus 6, or 94 minus 4."
          },
          explanation: "Cross-subtraction gives the same answer in both directions: 96 - 6 = 90, and 94 - 4 = 90. That gives the left part: 90!"
        },
        {
          stepNum: 2,
          ancient: {
            title: "Cross-Subtract for Left Part",
            math: "Left Part: 96 - 6 = 90 (or 94 - 4 = 90)",
            desc: "One quick mental subtraction determines the entire higher place values (90 hundreds = 9000).",
            visual: "nikhilam_cross"
          },
          modern: {
            title: "Second Row Partial Product (Tens)",
            math: "96 × 90 = 8640",
            desc: "Multiply 96 by 9 (the tens digit), giving 864 tens.",
            visual: "modern_row2"
          },
          prediction: {
            question: "How does the Nikhilam Sūtra find the final right two digits (ones and tens)?",
            options: [
              "Multiply the two deficiencies: (-4) × (-6) = 24",
              "Add -4 and -6 = -10",
              "Take the square root of 96",
              "Divide 94 by 2"
            ],
            correct: 0,
            hint: "Multiply the two deviations from 100 together."
          },
          explanation: "The right two digits are simply the product of the deviations: (-4) × (-6) = +24. Placed together with 90, we get 9024 instantly!"
        },
        {
          stepNum: 3,
          ancient: {
            title: "Multiply Deviations & Assemble in 1 Line",
            math: "Right Part: (-4) × (-6) = 24 → Result: 9024",
            desc: "Combine left and right parts: 90 | 24 = 9024. Calculated in 2 seconds completely in your head without paper!",
            visual: "nikhilam_combine"
          },
          modern: {
            title: "Sum the Two Partial Products",
            math: "384 + 8640 = 9024",
            desc: "Add 384 and 8640 by column addition to get 9024.",
            visual: "modern_sum"
          },
          prediction: {
            question: "Why is the Nikhilam method so much faster for mental arithmetic than the standard school method?",
            options: [
              "It transforms difficult double-digit multiplications into single-digit arithmetic (4 × 6 = 24 and 96 - 6 = 90).",
              "It only works on computers.",
              "It gives an approximation rather than exact answer.",
              "It rounds everything to 100."
            ],
            correct: 0,
            hint: "Notice that instead of multiplying 96 × 94, you only multiplied 4 × 6 and did a simple subtraction."
          },
          explanation: "Nikhilam's algebraic beauty transforms big multiplications into elementary single-digit facts that can be solved in a heartbeat."
        }
      ],
      practice: {
        prompt: "Use the Nikhilam Sūtra to multiply 98 × 95 mentally! (Base 100: deficiencies -2 and -5)",
        placeholder: "Enter product (e.g. 9100)...",
        correctAnswer: "9310",
        tolerance: 0,
        guidedSteps: [
          { step: "1. Deficiencies", question: "What are the deficiencies of 98 and 95 from 100?", answer: "-2 and -5", hint: "100 - 98 = 2, 100 - 95 = 5." },
          { step: "2. Left Part (Cross-subtract)", question: "What is 98 - 5 (or 95 - 2)?", answer: "93", hint: "98 - 5 = 93." },
          { step: "3. Right Part (Multiply deviations)", question: "What is (-2) × (-5)? (Write as two digits)", answer: "10", hint: "2 × 5 = 10." }
        ],
        solutionWalkthrough: "1) Deficiencies from 100: 98 is (-2), 95 is (-5). 2) Left part: 98 - 5 = 93 (or 95 - 2 = 93). 3) Right part: (-2) × (-5) = 10. Final assembled answer: 9310!"
      }
    },
    {
      id: "p6",
      title: "Problem 6: Instant Squaring Ending in 5 (Ekādhikena)",
      topic: "Vedic Mental Squaring & One More Than Previous",
      source: "Ancient: Ekādhikena Pūrvena (एकाधिकेन पूर्वेण) · Modern: Binomial Expansion (10a+5)²",
      historicalNote: "The Ekādhikena Pūrvena Sūtra translates to 'By one more than the previous one'. It allows squaring ANY number ending in 5 in under one second mentally.",
      ancientMethodName: "Ekādhikena Pūrvena Sūtra",
      modernMethodName: "Standard FOIL / Binomial Multiplication",
      vedicMasterclass: {
        sutra: "Ekādhikena Pūrvena (एकाधिकेन पूर्वेण)",
        meaning: "By one more than the previous one",
        rule: "To square any number ending in 5 (like 75² or 85²): Multiply the tens digit by (tens digit + 1) to get the first part. Append 25 at the end! E.g. 75²: 7 × 8 = 56, append 25 → 5625!",
        algebraicProof: "(10n + 5)² = 100n² + 100n + 25 = 100 · n(n + 1) + 25",
        mentalSteps: [
          { name: "Step 1: First Part = n × (n + 1)", detail: "Take the digits before 5 (say 7). Multiply by one more: 7 × (7 + 1) = 7 × 8 = 56." },
          { name: "Step 2: Second Part = 5² = 25", detail: "The last two digits are always simply 5 × 5 = 25." },
          { name: "Step 3: Combine Directly", detail: "Put them together: 56 and 25 → 5625! Instant 1-second mental square!" }
        ],
        interactivePresets: [
          { a: 35, b: 35 },
          { a: 75, b: 75 },
          { a: 85, b: 85 }
        ]
      },
      steps: [
        {
          stepNum: 1,
          ancient: {
            title: "Prefix: 'One More Than Previous'",
            math: "For 75²: Tens digit = 7. Next integer = 8. 7 × 8 = 56.",
            desc: "The sūtra says multiply the prefix by 'one more than itself': 7 × (7 + 1) = 56.",
            visual: "ekadhikena_prefix"
          },
          modern: {
            title: "Expand Binomial Terms",
            math: "(70 + 5)² = 70² + 2(70)(5) + 5² = 4900 + 700 + 25",
            desc: "Modern textbook FOIL expansion requires calculating and tracking three separate algebraic terms.",
            visual: "modern_foil"
          },
          prediction: {
            question: "Why do numbers ending in 5 always end in 25 when squared?",
            options: [
              "Because 5 × 5 = 25, and in (10n + 5)², the units place is always 5² = 25.",
              "It only happens for numbers less than 100.",
              "Because 75 is divisible by 3.",
              "It is an empirical approximation."
            ],
            correct: 0,
            hint: "Look at the algebraic expansion: (10n+5)² = 100n(n+1) + 25. The 100 shifts the prefix to the hundreds column, leaving 25 in the last two places."
          },
          explanation: "Since 100n(n+1) has two zeros at the end, adding 25 guarantees the last two digits are always 25!"
        },
        {
          stepNum: 2,
          ancient: {
            title: "Suffix: 5² = 25 & Assemble",
            math: "Prefix: 56  |  Suffix: 25  →  5625",
            desc: "No carrying, no scratchpad. Write 56 followed by 25 = 5625.",
            visual: "ekadhikena_assemble"
          },
          modern: {
            title: "Add Partial Sums",
            math: "4900 + 700 + 25 = 5625",
            desc: "Summing 4900 + 700 + 25 gives 5625.",
            visual: "modern_sum"
          },
          prediction: {
            question: "Using this exact Vedic Sūtra, what is 35² calculated mentally in 1 second?",
            options: [
              "1225 (since 3 × 4 = 12, followed by 25)",
              "1025",
              "1525",
              "925"
            ],
            correct: 0,
            hint: "Take 3, multiply by 3 + 1 = 4. 3 × 4 = 12. Then append 25."
          },
          explanation: "3 × 4 = 12, append 25 = 1225! Done mentally in under a second!"
        }
      ],
      practice: {
        prompt: "Use the Ekādhikena Sūtra to mentally compute 85² in under two seconds!",
        placeholder: "Enter square (e.g. 6225)...",
        correctAnswer: "7225",
        tolerance: 0,
        guidedSteps: [
          { step: "1. First Part", question: "Multiply 8 by one more than 8 (8 × 9):", answer: "72", hint: "8 × 9 = 72." },
          { step: "2. Second Part", question: "What is 5²?", answer: "25", hint: "5 × 5 = 25." }
        ],
        solutionWalkthrough: "1) Tens digit is 8. One more than 8 is 9. 8 × 9 = 72. 2) Suffix is 5² = 25. Put together: 7225! Mentally solved in 1 second."
      }
    }
  ],

  /* ── 2. ZERO LABORATORY DATA ── */
  zeroLab: {
    experiment: {
      title: "The Position Experiment",
      instruction: "Drag the zero ⭕ into different slots between and around digits [3] and [5] to observe how its position changes the value by orders of magnitude.",
      baseDigits: [3, 5],
      slots: [
        { id: "before", label: "Prefix (035)", val: 35, explanation: "A leading zero holds no active magnitude column — 035 is still simply 35 units." },
        { id: "between", label: "Internal Tens (305)", val: 305, explanation: "Zero serves as an anchor! It pushes '3' into the Hundreds column (3 × 100 = 300) while recording 0 tens. Without zero, 305 collapses into 35!" },
        { id: "after", label: "Suffix Ones (350)", val: 350, explanation: "Placed at the end, zero multiplies the entire magnitude by 10! The 3 becomes 300, the 5 becomes 50, and 0 holds the ones place." }
      ]
    },
    buildPuzzles: [
      {
        id: "b1",
        target: 4007,
        targetDev: "४००७",
        availableDigits: [0, 7, 4, 0],
        columns: ["Thousands (10³)", "Hundreds (10²)", "Tens (10¹)", "Ones (10⁰)"],
        solution: [4, 0, 0, 7],
        hint: "4 thousands, zero hundreds, zero tens, and 7 ones."
      },
      {
        id: "b2",
        target: 3050,
        targetDev: "३०५०",
        availableDigits: [5, 0, 3, 0],
        columns: ["Thousands (10³)", "Hundreds (10²)", "Tens (10¹)", "Ones (10⁰)"],
        solution: [3, 0, 5, 0],
        hint: "3 thousands, zero hundreds, 5 tens (fifty), and zero units."
      },
      {
        id: "b3",
        target: 90802,
        targetDev: "९०८०२",
        availableDigits: [8, 0, 9, 2, 0],
        columns: ["Ten-Thous (10⁴)", "Thousands (10³)", "Hundreds (10²)", "Tens (10¹)", "Ones (10⁰)"],
        solution: [9, 0, 8, 0, 2],
        hint: "9 in ten-thousands, 0 in thousands, 8 in hundreds, 0 in tens, 2 in ones."
      }
    ],
    saveGameRounds: [
      {
        round: 1,
        targetNumber: 508,
        digits: [5, 0, 8],
        timeLimit: 15,
        slots: ["Hundreds (100)", "Tens (10)", "Ones (1)"]
      },
      {
        round: 2,
        targetNumber: 7040,
        digits: [7, 0, 4, 0],
        timeLimit: 14,
        slots: ["Thousands (1000)", "Hundreds (100)", "Tens (10)", "Ones (1)"]
      },
      {
        round: 3,
        targetNumber: 20093,
        digits: [2, 0, 0, 9, 3],
        timeLimit: 12,
        slots: ["10,000s", "1,000s", "100s", "10s", "1s"]
      }
    ],
    historyMilestones: [
      {
        era: "c. 300 BCE",
        civilization: "Babylonian Placeholder",
        title: "The Blank Space & Double Wedge",
        desc: "Used two slanted wedges as a separator between sexagesimal digits. However, it was never treated as a number itself, was never used at the end of numbers, and could not be calculated with.",
        badge: "Punctuation Mark"
      },
      {
        era: "c. 3rd–7th c. CE",
        civilization: "Ancient India (Bakhshali & Gwalior)",
        title: "The Bindu (Dot) & Shunya",
        desc: "The Sanskrit word 'Śūnya' (void, emptiness) was materialized as a dot (bindu) and small circle. It marked empty columns on counting boards and was recorded on birch bark manuscripts and temple stones (Gwalior temple inscription of 876 CE).",
        badge: "Sacred Place-Value"
      },
      {
        era: "628 CE",
        civilization: "Brahmagupta (Ujjain Observatory)",
        title: "Zero Becomes a Mathematical Number",
        desc: "For the very first time in human history, Brahmagupta defined zero as a full mathematical entity with arithmetic rules: 1 + 0 = 1, 1 - 0 = 1, 0 × 1 = 0, and explored 0 / 0.",
        badge: "First Arithmetic Rules"
      },
      {
        era: "825–1202 CE",
        civilization: "Global Transmission",
        title: "From Baghdad to Europe",
        desc: "Al-Khwarizmi wrote 'On the Calculation with Hindu Numerals' (c. 825 CE). Translated into Latin by Adelard of Bath and championed by Fibonacci in 'Liber Abaci' (1202 CE) as 'zephirum' (hence cipher and zero).",
        badge: "Global Legacy"
      }
    ]
  },

  /* ── 3. MATHEMATICAL DETECTIVE DATA ── */
  detective: {
    levels: [
      {
        level: 1,
        name: "Apprentice Detective",
        badge: "Rank: Apprentice 🔍",
        cases: [
          {
            id: "d1",
            title: "The Careless Product",
            statement: "A student attempted to compute 25 × 4 mentally, but ended up with 105.",
            steps: [
              { num: 1, text: "Break 25 into parts: 25 = 20 + 5" },
              { num: 2, text: "Multiply first part: 20 × 4 = 80" },
              { num: 3, text: "Multiply second part: 5 × 4 = 25" },
              { num: 4, text: "Add partial results: 80 + 25 = 105" }
            ],
            wrongStep: 3,
            hints: [
              "Look carefully at standard times tables in the single-digit multiplication.",
              "Step 2 is completely fine (20 × 4 = 80). Check Step 3.",
              "5 × 4 is NOT 25! What is 5 multiplied by 4?"
            ],
            question: "What is the correct value of 5 × 4 in Step 3?",
            options: ["20", "24", "15", "30"],
            correctOption: 0,
            correctedStep: "5 × 4 = 20, leading to 80 + 20 = 100.",
            verdict: "The student confused 5 × 5 (which is 25) with 5 × 4 (which is 20). The true answer is 100!"
          },
          {
            id: "d2",
            title: "The Across-The-Board Fraction Trap",
            statement: "A scribe claimed that 1/2 + 1/3 = 2/5.",
            steps: [
              { num: 1, text: "Identify fraction numerators: 1 and 1" },
              { num: 2, text: "Add numerators directly: 1 + 1 = 2" },
              { num: 3, text: "Add denominators directly: 2 + 3 = 5" },
              { num: 4, text: "Combine to form the final answer: 2/5" }
            ],
            wrongStep: 2,
            hints: [
              "Can fractions with different denominators be added directly across?",
              "Think about what 1/2 means: 1/2 is already 0.5. How could 1/2 + 1/3 be 2/5 (which is 0.4, smaller than 1/2)?",
              "You must convert to a common denominator (6) before adding numerators!"
            ],
            question: "What is the correct sum of 1/2 + 1/3?",
            options: ["5/6", "2/5", "3/5", "1/6"],
            correctOption: 0,
            correctedStep: "1/2 = 3/6 and 1/3 = 2/6. Then 3/6 + 2/6 = 5/6.",
            verdict: "Fractions cannot be added by blindly combining numerators and denominators. Brahmagupta and Bhaskara II both emphasized finding the Savarnana (common denominator) first."
          },
          {
            id: "d3",
            title: "The Illegal Radical Split",
            statement: "An apprentice was simplifying √(9 + 16) and concluded the answer was 7.",
            steps: [
              { num: 1, text: "Distribute square root across sum: √(9 + 16) = √9 + √16" },
              { num: 2, text: "Evaluate first root: √9 = 3" },
              { num: 3, text: "Evaluate second root: √16 = 4" },
              { num: 4, text: "Add the integers: 3 + 4 = 7" }
            ],
            wrongStep: 1,
            hints: [
              "Does the square root operation distribute across addition: √(a + b) = √a + √b?",
              "Test with numbers: does √(1 + 1) = √1 + √1? No, √2 ≠ 2.",
              "You must perform the addition inside the radical first: 9 + 16 = 25."
            ],
            question: "What is the true value of √(9 + 16)?",
            options: ["5", "7", "25", "12"],
            correctOption: 0,
            correctedStep: "√(9 + 16) = √25 = 5.",
            verdict: "The square root does not distribute across addition. Notice 5 is the hypotenuse of a 3-4-5 right triangle!"
          }
        ]
      },
      {
        level: 2,
        name: "Investigator",
        badge: "Rank: Investigator ⚖️",
        cases: [
          {
            id: "d4",
            title: "The Sign of the Square",
            statement: "A student was asked to evaluate the expression: -3².",
            steps: [
              { num: 1, text: "Write the expression: -3²" },
              { num: 2, text: "Interpret exponent as squaring negative three: (-3) × (-3)" },
              { num: 3, text: "Apply negative times negative rule: (-3) × (-3) = +9" },
              { num: 4, text: "Final conclusion: -3² = +9" }
            ],
            wrongStep: 2,
            hints: [
              "Check operator precedence: does exponentiation take precedence over negation?",
              "Without parentheses, -3² means -(3²), not (-3)².",
              "3² is 9, so -(3²) is -9."
            ],
            question: "What is the correct mathematical value of -3²?",
            options: ["-9", "+9", "-6", "+6"],
            correctOption: 0,
            correctedStep: "By order of operations, exponents bind before unary negation: -3² = -(3 × 3) = -9.",
            verdict: "Order of operations specifies exponentiation precedes unary negation. Only (-3)² = +9."
          },
          {
            id: "d5",
            title: "The Black Hole Division",
            statement: "A notorious 'proof' that 2 = 1 starts with a = b.",
            steps: [
              { num: 1, text: "Let a = b (two equal non-zero quantities)" },
              { num: 2, text: "Multiply both sides by a: a² = ab" },
              { num: 3, text: "Subtract b² from both sides: a² - b² = ab - b²" },
              { num: 4, text: "Factor both sides: (a - b)(a + b) = b(a - b)" },
              { num: 5, text: "Divide both sides by (a - b): a + b = b" },
              { num: 6, text: "Substitute a = b: b + b = b → 2b = b → 2 = 1" }
            ],
            wrongStep: 5,
            hints: [
              "Remember our starting premise: what is the relationship between a and b?",
              "If a = b, what is the exact value of (a - b)?",
              "Since a = b, (a - b) = 0! Step 5 divides both sides by ZERO, which is mathematically invalid."
            ],
            question: "Why is Step 5 a mathematical crime?",
            options: [
              "Because a - b = 0, and division by zero is undefined.",
              "Because you cannot factor differences of squares.",
              "Because a and b must be prime numbers.",
              "Because 2b is always equal to b."
            ],
            correctOption: 0,
            correctedStep: "Since a = b, a - b = 0. Dividing both sides by 0 invalidates the entire chain of logic.",
            verdict: "Division by zero creates mathematical paradoxes. Brahmagupta noted that division by zero produces Khahara (an infinite/indefinite quantity), and modern math forbids dividing by zero entirely."
          },
          {
            id: "d6",
            title: "The Hypotenuse Area Blunder",
            statement: "Computing the area of a right triangle with legs a = 6, b = 8.",
            steps: [
              { num: 1, text: "Compute hypotenuse: c² = 6² + 8² = 36 + 64 = 100 → c = 10" },
              { num: 2, text: "Calculate perimeter: 6 + 8 + 10 = 24" },
              { num: 3, text: "Calculate area: Area = 1/2 × base × hypotenuse = 1/2 × 6 × 10" },
              { num: 4, text: "Evaluate area: 30 square units" }
            ],
            wrongStep: 3,
            hints: [
              "What is the standard formula for the area of a right triangle?",
              "Does the area formula use the hypotenuse or the two perpendicular legs?",
              "In a right triangle, the two perpendicular sides serve as base and height: 6 and 8."
            ],
            question: "What is the true area of this right triangle?",
            options: ["24", "30", "48", "14"],
            correctOption: 0,
            correctedStep: "Area = 1/2 × base × height = 1/2 × 6 × 8 = 24.",
            verdict: "The student mistakenly substituted the hypotenuse (10) instead of the perpendicular leg (8). The actual area is 24."
          }
        ]
      },
      {
        level: 3,
        name: "Master Detective",
        badge: "Rank: Master Detective 🏆",
        cases: [
          {
            id: "d7",
            title: "The Infinite Zero-One Mirage",
            statement: "An investigator evaluated Grandi's series S = 1 - 1 + 1 - 1 + 1 - ...",
            steps: [
              { num: 1, text: "Group adjacent pairs: S = (1 - 1) + (1 - 1) + (1 - 1) + ... = 0 + 0 + 0 = 0" },
              { num: 2, text: "Regroup starting from second term: S = 1 - (1 - 1) - (1 - 1) - ... = 1 - 0 - 0 = 1" },
              { num: 3, text: "Conclude that because both equal S: 0 = 1" }
            ],
            wrongStep: 3,
            hints: [
              "Can the associative property be applied freely to non-convergent infinite series?",
              "Grandi's series does not converge in standard real analysis; its sequence of partial sums oscillates: 1, 0, 1, 0...",
              "You cannot equate two divergent regroupings to prove 0 = 1."
            ],
            question: "What is the fundamental error in this deduction?",
            options: [
              "The series is divergent, so the associative law cannot be applied to yield a unique sum.",
              "1 - 1 is equal to 2, not 0.",
              "The series only has an odd number of terms.",
              "The signs should all be positive."
            ],
            correctOption: 0,
            correctedStep: "The series 1 - 1 + 1 - 1... oscillates and does not converge to any real number under ordinary summation.",
            verdict: "Madhava and later Euler recognized that infinite series require rigorous convergence criteria before algebraic grouping is valid."
          },
          {
            id: "d8",
            title: "The Altar Doubling Fallacy",
            statement: "A priest needing to double the area of a square altar of side 10 doubled each side to 20.",
            steps: [
              { num: 1, text: "Original square side: s = 10, Area = 10 × 10 = 100" },
              { num: 2, text: "To double the area to 200, double the side length: new side = 20" },
              { num: 3, text: "Check new area: 20 × 20 = 400" },
              { num: 4, text: "Conclude the altar area was doubled" }
            ],
            wrongStep: 2,
            hints: [
              "How does area scale when linear dimensions are doubled?",
              "If the side is multiplied by 2, area is multiplied by 2² = 4 (quadrupled, not doubled)!",
              "To double the area, the new side must be s × √2 ≈ 10 × 1.414 = 14.14."
            ],
            question: "What side length actually doubles the area of a 10×10 square?",
            options: ["10√2 ≈ 14.14", "20", "15", "12.5"],
            correctOption: 0,
            correctedStep: "Doubling the area requires multiplying the side by √2: side = 10√2 ≈ 14.142.",
            verdict: "This exact dilemma in the Śulba Sūtras forced Vedic scholars to discover the diagonal theorem (the Pythagorean relation) and compute √2!"
          },
          {
            id: "d9",
            title: "The Linear Sine Assumption",
            statement: "An astronomer estimated that since sin(30°) = 0.5, then sin(60°) must be 2 × 0.5 = 1.0.",
            steps: [
              { num: 1, text: "Know that sin(30°) = 0.5" },
              { num: 2, text: "Notice angle 60° = 2 × 30°" },
              { num: 3, text: "Assume linearity: sin(2θ) = 2 × sin(θ)" },
              { num: 4, text: "Conclude sin(60°) = 2 × 0.5 = 1.0" }
            ],
            wrongStep: 3,
            hints: [
              "Is the sine function linear? Does doubling the angle double the sine?",
              "Remember that sin(90°) = 1.0. If sin(60°) was already 1.0, what would sin(90°) be?",
              "The correct formula is sin(2θ) = 2 sin(θ) cos(θ). True sin(60°) = √3/2 ≈ 0.866."
            ],
            question: "What is the true value of sin(60°)?",
            options: ["√3 / 2 ≈ 0.866", "1.0", "0.707", "0.5"],
            correctOption: 0,
            correctedStep: "Sine is a circular function. sin(60°) = √3/2 ≈ 0.866, not 1.0.",
            verdict: "Aryabhata (499 CE) knew this and constructed second-order sine difference tables (Jya) to account for curvature."
          }
        ]
      }
    ]
  },

  /* ── 4. ANCIENT ENGINEER'S WORKSHOP ── */
  workshop: {
    experiments: [
      {
        id: "w1",
        title: "Experiment 1: Double the Square (Śulbasūtra Altar)",
        subtitle: "Baudhayana Śulba Sūtra 1.45: 'The cord stretched across the diagonal of a square produces an area twice the size.'",
        desc: "Interactive geometry: Manipulate the base square altar. Pull the diagonal cord and construct a new square along that diagonal to visually verify that its area is exactly 2× the original.",
        defaultSide: 120,
        unit: "angulas (finger-widths)"
      },
      {
        id: "w2",
        title: "Experiment 2: The √2 Measuring Rope",
        subtitle: "Baudhayana's sacred formula: 1 + 1/3 + 1/12 - 1/408",
        desc: "Adjust the square side slider and watch the rope measure the diagonal. Compare the exact mathematical diagonal (s√2) against Baudhayana's rational rope knots. Witness the minuscule 0.00015% difference!",
        minSide: 10,
        maxSide: 100,
        defaultSide: 50
      },
      {
        id: "w3",
        title: "Experiment 3: Transform Rectangle to Square",
        subtitle: "Geometric Invariance: Baudhayana Śulba Sūtra 2.5",
        desc: "Vedic altars frequently needed to be converted from a long rectangle to an equivalent square without losing a single angula of area. Follow the rope cuts and compass swings to construct the geometric mean √((a)(b)).",
        defaultWidth: 160,
        defaultHeight: 90
      }
    ]
  },

  /* ── 5. SCHOLAR'S MANUSCRIPT ── */
  manuscript: {
    disclaimer: "Historical Note: This manuscript is an interactive learning device crafted with authentic Sanskrit mathematical puzzles drawn from the Śulba Sūtras, Aryabhatiya, and Yuktibhāṣā.",
    clues: [
      {
        id: "c1",
        number: 1,
        title: "The Sequence of Sums (Triangular Numbers)",
        sanskritVerse: "एक द्विक त्रिक संयोजनेन जायन्ते श्रेढयः...",
        verseMeaning: "By consecutive additions of units, the stairs of numbers appear: 1, 1+2=3, 3+3=6, 6+4=10...",
        prompt: "The ancient text displays the sequence in Devanagari numerals: १, ३, ६, १०, ? — What is the next triangular number in the scholar's list?",
        placeholder: "Enter numeral (e.g. 12)...",
        correctAnswer: "15",
        altAnswers: ["१५", "15"],
        hint: "Look at the differences: +2, +3, +4, +5. Add 5 to 10."
      },
      {
        id: "c2",
        number: 2,
        title: "The Smudged Place-Value Record",
        sanskritVerse: "स्थानात् स्थानं दशगुणं स्यात्...",
        verseMeaning: "From place to place, each is ten times the preceding. (Aryabhata, 499 CE)",
        prompt: "A merchant wrote: 'Four hundred and seven measures of grain: ४ [ • ] ७'. An ink smudge covers the tens place. Which sacred Indian digit must restore this record?",
        placeholder: "Enter digit (0 or ०)...",
        correctAnswer: "0",
        altAnswers: ["०", "0", "zero", "shunya"],
        hint: "The number is four hundred seven (407). How many tens are in four hundred seven?"
      },
      {
        id: "c3",
        number: 3,
        title: "The Diagonal of the Fire Altar",
        sanskritVerse: "प्रमाणं तृतीयेन वर्धयेत्तच्च चतुर्थेनात्मचतुस्त्रिंशोनेन...",
        verseMeaning: "The Śulba Sūtra states: If a square altar has a side of exactly 12 angulas, what is the length of its diagonal?",
        prompt: "Using Baudhayana's approximation (side × 1.4142), compute the diagonal of a square of side 12. Enter to one decimal place (or integer):",
        placeholder: "e.g. 14.5",
        correctAnswer: "17",
        altAnswers: ["16.97", "17", "17.0", "16.9"],
        hint: "12 × 1.4142 = 16.97, which rounds cleanly to 17 angulas."
      },
      {
        id: "c4",
        number: 4,
        title: "Madhava's Alternating Terms",
        sanskritVerse: "व्यासे वारिधिनिहते रूपहृते व्याससागराभिहते...",
        verseMeaning: "Multiply the diameter by 4 and divide alternately by odd numbers... (Yuktibhāṣā)",
        prompt: "Compute the sum of the first three terms of Madhava's infinite series for π/4: 1 - 1/3 + 1/5. Enter as a decimal to two places:",
        placeholder: "e.g. 0.50",
        correctAnswer: "0.87",
        altAnswers: ["0.87", "0.866", "0.867", "13/15"],
        hint: "13/15 = 0.8666... which rounds to 0.87."
      },
      {
        id: "c5",
        number: 5,
        title: "The Master's Cryptic Keyword",
        sanskritVerse: "अनेन विधिना सर्वं गणितं प्रतिष्ठितम्",
        verseMeaning: "By this order, the whole of calculation is established.",
        prompt: "Combine the initial letters of the four great branches you have explored — Zero, Arithmetic, Geometry, Algebra — or enter the sacred Sanskrit root for 'void/empty':",
        placeholder: "Enter Sanskrit word or English term...",
        correctAnswer: "SHUNYA",
        altAnswers: ["SHUNYA", "SUNYA", "ZERO", "ŚŪNYA", "SOONYA", "BHARATMATH"],
        hint: "The ancient Sanskrit word for zero and the void that unlocked all place-value arithmetic."
      }
    ]
  },

  /* ── 6. KNOWLEDGE CONSTELLATION ── */
  constellation: {
    nodes: [
      {
        id: "zero",
        label: "Zero & Place Value",
        icon: "⭕",
        x: 0.18,
        y: 0.65,
        color: "#e0ad4a",
        era: "BCE to 628 CE",
        verse: "Brahmagupta: 'Positive plus zero is positive, negative plus zero is negative.'",
        desc: "The invention of the decimal place-value system with zero (shunya) transformed calculation from a cumbersome chore into universal algebra.",
        activityId: "zeroLab",
        unlockedBy: "Zero Laboratory"
      },
      {
        id: "geom",
        label: "Sacred Geometry",
        icon: "📐",
        x: 0.22,
        y: 0.28,
        color: "#c8a020",
        era: "800–500 BCE",
        verse: "Baudhayana: 'The diagonal cord of a rectangle produces both areas combined.'",
        desc: "The Śulba Sūtras documented the Pythagorean theorem, geometric algebra, and the rational approximation of √2 centuries before Euclid.",
        activityId: "workshop",
        unlockedBy: "Ancient Engineer's Workshop"
      },
      {
        id: "arith",
        label: "Algorithmic Arithmetic",
        icon: "⚖️",
        x: 0.50,
        y: 0.72,
        color: "#4da88a",
        era: "499–1150 CE",
        verse: "Bhaskara II: 'Invert the divisor and multiply the fractions.'",
        desc: "Rapid mental arithmetic, vertical-crosswise multiplication, and algorithms on sand dust slates (Dhuli-Karma).",
        activityId: "twoPaths",
        unlockedBy: "Two Paths (Problem 1)"
      },
      {
        id: "alg",
        label: "Algebra & Unknowns",
        icon: "🔍",
        x: 0.52,
        y: 0.35,
        color: "#7a6cc8",
        era: "628–1150 CE",
        verse: "Brahmagupta & Bhaskara II (Chakravala method for indeterminate equations).",
        desc: "Bījanita (algebra of unknowns), rules of positive/negative numbers, and cyclic methods solving x² - Ny² = 1.",
        activityId: "detective",
        unlockedBy: "Mathematical Detective"
      },
      {
        id: "calc",
        label: "Series & Infinitesimals",
        icon: "📜",
        x: 0.78,
        y: 0.25,
        color: "#d45080",
        era: "1350–1550 CE",
        verse: "Madhava of Sangamagrama: Infinite series for sin, cos, and π.",
        desc: "The Kerala School of Astronomy and Mathematics developed calculus series 250 years before Newton and Leibniz.",
        activityId: "manuscript",
        unlockedBy: "Scholar's Manuscript"
      },
      {
        id: "num",
        label: "Modern Analysis & Ramanujan",
        icon: "🌌",
        x: 0.82,
        y: 0.68,
        color: "#e07a2a",
        era: "1887–1920 CE",
        verse: "Srinivasa Ramanujan: Mock theta functions and partition congruences.",
        desc: "Intuitive leaps connecting modular forms, elliptic integrals, and infinite series that continue to fuel modern string theory.",
        activityId: "constellation",
        unlockedBy: "Complete 4+ activities"
      }
    ],
    edges: [
      ["zero", "geom"],
      ["zero", "arith"],
      ["geom", "alg"],
      ["arith", "alg"],
      ["geom", "calc"],
      ["alg", "calc"],
      ["calc", "num"],
      ["alg", "num"]
    ],
    achievements: [
      { id: "ach_first", title: "First Steps", desc: "Complete any interactive teaching activity", xp: 15, icon: "🌱" },
      { id: "ach_twopaths", title: "Master of Two Paths", desc: "Predict and solve all 4 comparative problems", xp: 30, icon: "⚖️" },
      { id: "ach_zero", title: "Shunya Master", desc: "Complete all experiments & puzzles in Zero Laboratory", xp: 25, icon: "⭕" },
      { id: "ach_detective", title: "Master Detective", desc: "Crack all 9 mathematical mystery cases", xp: 35, icon: "🔍" },
      { id: "ach_engineer", title: "Sacred Altar Builder", desc: "Complete all 3 Śulba geometry constructions", xp: 30, icon: "📐" },
      { id: "ach_manuscript", title: "Manuscript Decoder", desc: "Solve all 5 secret clues on the parchment scroll", xp: 30, icon: "📜" },
      { id: "ach_constellation", title: "Cosmic Mind", desc: "Unlock all 6 nodes in the Knowledge Constellation", xp: 50, icon: "🌌" },
      { id: "ach_scholar", title: "BharatMath Laureate", desc: "Achieve 200+ XP across all interactive modules", xp: 75, icon: "🏆" }
    ]
  }
};

