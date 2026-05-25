// Répétition espacée (système de Leitner) pour les flashcards.
// État par profil : "flashSRS" = { [cardId]: { box: 1..5, due: ms, seen: ms } }
// Boîte 5 = bien maîtrisée. Une carte sans enregistrement est « nouvelle » (due).

import { loadJSON, saveJSON, clearKey } from "./storage.js";

const KEY = "flashSRS";
const DAY = 86400000;
// Intervalle avant réapparition, par boîte (1→5).
const INTERVALS = [0, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY];

export function getSRS() {
  return loadJSON(KEY, {});
}

export function gradeCard(cardId, known) {
  const srs = getSRS();
  const prev = srs[cardId] || { box: 1 };
  const box = known ? Math.min(prev.box + 1, 5) : 1;
  srs[cardId] = { box, due: Date.now() + INTERVALS[box - 1], seen: Date.now() };
  saveJSON(KEY, srs);
  return srs[cardId];
}

export function resetSRS() {
  clearKey(KEY);
}

export function isDue(cardId, srs = getSRS(), now = Date.now()) {
  const rec = srs[cardId];
  if (!rec) return true; // nouvelle carte
  return rec.due <= now;
}

// Trie/filtre des cartes : à réviser d'abord (plus en retard en tête).
export function dueCards(cards, srs = getSRS(), now = Date.now()) {
  return cards
    .filter((c) => isDue(c.id, srs, now))
    .sort((a, b) => {
      const da = srs[a.id]?.due ?? 0;
      const db = srs[b.id]?.due ?? 0;
      return da - db;
    });
}

export function srsStats(cards, srs = getSRS(), now = Date.now()) {
  let mastered = 0; // boîte 4-5
  let learning = 0; // boîte 1-3 vue
  let due = 0;
  let fresh = 0; // jamais vue
  for (const c of cards) {
    const rec = srs[c.id];
    if (!rec) {
      fresh++;
      due++;
      continue;
    }
    if (rec.box >= 4) mastered++;
    else learning++;
    if (rec.due <= now) due++;
  }
  return { total: cards.length, mastered, learning, fresh, due };
}
