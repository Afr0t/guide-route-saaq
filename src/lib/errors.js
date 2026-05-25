// Deck d'erreurs persistant : mémorise les questions ratées (quiz + examen)
// pour les revoir plus tard. État par profil : "errorDeck" = [ {question...} ].
// Dédupliqué par id de question ; un compteur suit le nombre de fautes.

import { loadJSON, saveJSON, clearKey } from "./storage.js";

const KEY = "errorDeck";
const MAX = 300;

export function getErrors() {
  return loadJSON(KEY, []);
}

export function recordError(q) {
  if (!q || !q.id) return;
  const list = getErrors();
  const i = list.findIndex((e) => e.id === q.id);
  const entry = {
    id: q.id,
    prompt: q.prompt,
    correct: q.correct,
    correctLabel: q.correctLabel || null,
    optionsAreSigns: !!q.optionsAreSigns,
    promptSign: q.promptSign || null,
    chapterId: q.chapterId,
    chapterTitle: q.chapterTitle,
    sectionTitle: q.sectionTitle,
    ts: Date.now()
  };
  if (i >= 0) {
    entry.count = (list[i].count || 1) + 1;
    list[i] = entry;
  } else {
    entry.count = 1;
    list.unshift(entry);
  }
  saveJSON(KEY, list.slice(0, MAX));
}

// Retire une question du deck (ex. réussie lors d'une révision ciblée).
export function clearError(id) {
  saveJSON(KEY, getErrors().filter((e) => e.id !== id));
}

export function clearAllErrors() {
  clearKey(KEY);
}

export function errorCount() {
  return getErrors().length;
}
