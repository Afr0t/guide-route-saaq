// Statistiques et suivi de progression (par profil).

import { loadJSON, saveJSON } from "./storage.js";
import { getSRS, srsStats } from "./srs.js";
import { buildFlashcards } from "./quiz.js";

const ACTIVITY_KEY = "activityDates"; // [ "YYYY-MM-DD", ... ]
const EXAM_KEY = "examHistory"; // [ { ts, score, total, pct, passed, durationMs } ]

function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function markActivityToday() {
  const days = loadJSON(ACTIVITY_KEY, []);
  const t = todayStr();
  if (!days.includes(t)) {
    days.push(t);
    saveJSON(ACTIVITY_KEY, days.slice(-400));
  }
}

export function getStreak() {
  const days = new Set(loadJSON(ACTIVITY_KEY, []));
  if (days.size === 0) return 0;
  let streak = 0;
  const d = new Date();
  // Si pas d'activité aujourd'hui, on tolère en partant d'hier.
  if (!days.has(todayStr(d))) d.setDate(d.getDate() - 1);
  while (days.has(todayStr(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function getExamHistory() {
  return loadJSON(EXAM_KEY, []);
}

export function recordExam(result) {
  const list = getExamHistory();
  list.unshift({ ...result, ts: Date.now() });
  saveJSON(EXAM_KEY, list.slice(0, 50));
}

// Maîtrise par chapitre, basée sur les boîtes SRS des flashcards du chapitre.
export function chapterMastery(chapters) {
  const srs = getSRS();
  return chapters.map((ch) => {
    const cards = buildFlashcards(chapters, ch.id);
    const s = srsStats(cards, srs);
    const pct = s.total ? Math.round((s.mastered / s.total) * 100) : 0;
    const bestScore = loadJSON(`bestScore/${ch.id}/20`, null);
    return {
      id: ch.id,
      title: ch.title,
      emoji: ch.emoji,
      color: ch.color,
      total: s.total,
      mastered: s.mastered,
      due: s.due,
      pct,
      bestScore
    };
  });
}
