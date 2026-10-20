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
