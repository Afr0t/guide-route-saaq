// Auto-generates multiple-choice questions from the structured chapter data.
// Strategy: tables are the most reliable Q source — for each row, the value in
// column N is the correct answer to "given column 0, what is column N?". We
// also generate the inverse direction. Distractors are pulled from the same
// column to keep them plausible.

function seededShuffle(arr, seed) {
  const out = arr.slice();
  let s = seed | 0;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function shuffle(arr) {
  return seededShuffle(arr, Date.now() ^ Math.floor(Math.random() * 0xffffffff));
}

function uniqueDistractors(correct, pool, n) {
  const seen = new Set([correct]);
  const out = [];
  const shuffled = shuffle(pool);
  for (const v of shuffled) {
    if (out.length >= n) break;
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

// Collect every (column-i value) across all tables of every chapter, so that
// we can find fallback distractors if a single table doesn't have enough
// distinct values.
function buildGlobalColumnPool(chapters) {
  const byHeader = new Map();
  for (const ch of chapters) {
    for (const sec of ch.sections) {
      for (const item of sec.content) {
        if (item.type !== "table") continue;
        item.headers.forEach((h, colIdx) => {
          if (!byHeader.has(h)) byHeader.set(h, []);
          for (const row of item.rows) {
            byHeader.get(h).push(row[colIdx]);
          }
        });
      }
    }
  }
  return byHeader;
}

function questionsFromTable(table, ctx, globalPool) {
  const questions = [];
  const { headers, rows } = table;
  if (rows.length < 2) return questions;

  // For each non-first column, build questions: given row[0], what is row[col]?
  for (let col = 1; col < headers.length; col++) {
    const columnValues = rows.map((r) => r[col]);
    for (let r = 0; r < rows.length; r++) {
      const correct = rows[r][col];
      const subjectLabel = rows[r][0];
      const headerLabel = headers[col];

      // distractors first from same column, then from global pool with same header
      let pool = columnValues.filter((v) => v !== correct);
      if (new Set(pool).size < 3) {
        const extra = (globalPool.get(headers[col]) || []).filter(
          (v) => v !== correct && !pool.includes(v)
        );
        pool = pool.concat(extra);
      }
      const distractors = uniqueDistractors(correct, pool, 3);
      if (distractors.length < 3) continue;

      const options = shuffle([correct, ...distractors]);
      questions.push({
        id: `${ctx.chapterId}-${ctx.sectionIdx}-t${col}-r${r}`,
        chapterId: ctx.chapterId,
        chapterTitle: ctx.chapterTitle,
        sectionTitle: ctx.sectionTitle,
        prompt: `${subjectLabel} → ${headerLabel.replace(/\?$/, "")} ?`,
        correct,
        options
      });
    }

    // Inverse direction: given a column N value, what's the row label?
    // Only generate when:
    //  - first-column values look like labels (≤ 60 chars)
    //  - the cue is unique in its column (otherwise the question is ambiguous)
    //  - the cue is descriptive (≥ 4 chars — skips "1", "2 pts", etc. which
    //    map to many infractions in the points tables)
    const allFirst = rows.map((r) => r[0]);
    const firstLooksLikeLabel = allFirst.every((v) => v.length <= 60);
    if (firstLooksLikeLabel) {
      const cueCounts = columnValues.reduce((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {});
      for (let r = 0; r < rows.length; r++) {
        const correct = rows[r][0];
        const cue = rows[r][col];
        if (cueCounts[cue] > 1) continue;
        if (cue.length < 4) continue;
        let pool = allFirst.filter((v) => v !== correct);
        if (new Set(pool).size < 3) continue;
        const distractors = uniqueDistractors(correct, pool, 3);
        if (distractors.length < 3) continue;
        const options = shuffle([correct, ...distractors]);
        questions.push({
          id: `${ctx.chapterId}-${ctx.sectionIdx}-t${col}-inv-r${r}`,
          chapterId: ctx.chapterId,
          chapterTitle: ctx.chapterTitle,
          sectionTitle: ctx.sectionTitle,
          prompt: `« ${cue} » — à quoi cela correspond-il ?`,
          correct,
          options
        });
      }
    }
  }

  return questions;
}

// ─────────────────── Questions sur les panneaux ───────────────────

// Catégorie d'un panneau (pour choisir des distracteurs plausibles, même forme).
function signCategory(id) {
  if (id.startsWith("danger")) return "danger";
  if (id.startsWith("travaux")) return "travaux";
  if (id.startsWith("limiteVitesse") || id.startsWith("vitesseRecommandee")) return "vitesse";
  if (id.startsWith("interdiction") || id.startsWith("acces")) return "interdiction";
  if (id.startsWith("obligation")) return "obligation";
  if (id.startsWith("feuPieton")) return "feuPieton";
  if (id.startsWith("feu")) return "feu";
  if (id.startsWith("bus")) return "bus";
  if (id.startsWith("macle")) return "macle";
  return "autre";
}

// Collecte les panneaux (signId → meaning + contexte) d'une liste de chapitres.
// Première occurrence gagne ; on préfère le `title` d'un bloc `sign` sinon le
// `label` d'un `signGrid`.
function collectSignEntries(chapters) {
  const map = new Map();
  for (const ch of chapters) {
    for (const sec of ch.sections) {
      for (const item of sec.content) {
        if (item.type === "sign" && item.sign) {
          if (!map.has(item.sign)) {
            map.set(item.sign, {
              sign: item.sign,
              meaning: (item.title || sec.title).trim(),
              chapterId: ch.id, chapterTitle: ch.title, sectionTitle: sec.title
            });
          }
        } else if (item.type === "signGrid") {
          for (const s of item.signs) {
            if (s.sign && !map.has(s.sign)) {
              map.set(s.sign, {
                sign: s.sign,
                meaning: (s.label || "").trim(),
                chapterId: ch.id, chapterTitle: ch.title, sectionTitle: sec.title
              });
            }
          }
        }
      }
    }
  }
  return [...map.values()];
}

// Distracteurs : on privilégie la même catégorie, puis on complète globalement.
function categoryAwareDistractors(correct, sameCat, all, n) {
  const d = uniqueDistractors(correct, sameCat, n);
  if (d.length >= n) return d;
  return d.concat(uniqueDistractors(correct, all, n - d.length).filter((x) => !d.includes(x)));
}

// `target` = panneaux pour lesquels poser une question (selon le chapitre).
// `allEntries` = tous les panneaux (sert de réservoir de distracteurs).
function questionsFromSigns(allEntries, target) {
  const out = [];

  for (const e of target) {
    if (!e.meaning || e.meaning.length < 3) continue;
    const cat = signCategory(e.sign);
    // Exclure les variantes du même panneau (même signId) des distracteurs.
    const others = allEntries.filter((x) => x.sign !== e.sign);
    const sameCatEntries = others.filter((x) => signCategory(x.sign) === cat);

    // Type A : image du panneau → sa signification (réponses = texte)
    const dA = categoryAwareDistractors(
      e.meaning,
      sameCatEntries.map((x) => x.meaning),
      others.map((x) => x.meaning),
      3
    );
    if (dA.length === 3) {
      out.push({
        id: `signA-${e.sign}`,
        chapterId: e.chapterId,
        chapterTitle: e.chapterTitle,
        sectionTitle: e.sectionTitle,
        prompt: "Que signifie ce panneau ?",
        promptSign: e.sign,
        correct: e.meaning,
        options: shuffle([e.meaning, ...dA])
      });
    }

    // Type B : signification → bon panneau (réponses = images)
    const dB = categoryAwareDistractors(
      e.sign,
      sameCatEntries.map((x) => x.sign),
      others.map((x) => x.sign),
      3
    );
    if (dB.length === 3) {
      out.push({
        id: `signB-${e.sign}`,
        chapterId: e.chapterId,
        chapterTitle: e.chapterTitle,
        sectionTitle: e.sectionTitle,
        prompt: `Quel panneau correspond à : « ${e.meaning} » ?`,
        correct: e.sign,
        correctLabel: e.meaning,
        options: shuffle([e.sign, ...dB]),
        optionsAreSigns: true
      });
    }
  }
  return out;
}

export function buildQuestionPool(chapters, chapterId /* optional */) {
  const globalPool = buildGlobalColumnPool(chapters);
  const target = chapterId
    ? chapters.filter((c) => c.id === chapterId)
    : chapters;
  const out = [];
  for (const ch of target) {
    ch.sections.forEach((sec, sectionIdx) => {
      sec.content.forEach((item) => {
        if (item.type !== "table") return;
        out.push(
          ...questionsFromTable(item, {
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionTitle: sec.title,
            sectionIdx
          }, globalPool)
        );
      });
    });
  }

  // Questions sur les panneaux (image ↔ signification).
  // Les distracteurs piochent dans TOUS les panneaux (réservoir global), mais on
  // ne pose de questions que pour les panneaux effectivement montrés dans la
  // portée choisie — un panneau réutilisé dans plusieurs chapitres devient ainsi
  // quizzable depuis chacun d'eux, sans doublon dans le mode « tous ».
  const allEntries = collectSignEntries(chapters);
  const signTarget = collectSignEntries(target);
  out.push(...questionsFromSigns(allEntries, signTarget));

  return out;
}

export function pickQuiz(pool, count) {
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Build flashcard list — every rule / alert / step (as a single fact)
export function buildFlashcards(chapters, chapterId /* optional */) {
  const target = chapterId
    ? chapters.filter((c) => c.id === chapterId)
    : chapters;
  const out = [];
  for (const ch of target) {
    ch.sections.forEach((sec, sectionIdx) => {
      sec.content.forEach((item, itemIdx) => {
        const baseId = `${ch.id}-${sectionIdx}-${itemIdx}`;
        if (item.type === "rule" || item.type === "alert") {
          out.push({
            id: baseId,
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionTitle: sec.title,
            kind: item.type,
            text: item.text
          });
        } else if (item.type === "step") {
          out.push({
            id: baseId,
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionTitle: sec.title,
            kind: "step",
            text: item.label + (item.detail ? ` — ${item.detail}` : "")
          });
        } else if (item.type === "list") {
          item.items.forEach((li, k) => {
            out.push({
              id: `${baseId}-${k}`,
              chapterId: ch.id,
              chapterTitle: ch.title,
              sectionTitle: sec.title,
              kind: "list",
              text: li
            });
          });
        }
      });
    });
  }
  return out;
}

export function shuffleFlashcards(cards, seed) {
  if (seed === undefined || seed === null) return shuffle(cards);
  // Mix scope-stable seed with the array length so identical seeds across
  // different filters still produce different orderings.
  return seededShuffle(cards, (seed * 2654435761) ^ cards.length);
}
