import { useMemo, useState } from "react";
import { buildFlashcards, shuffleFlashcards } from "../lib/quiz.js";
import { getSRS, gradeCard, resetSRS, dueCards, srsStats } from "../lib/srs.js";
import { markActivityToday } from "../lib/stats.js";

export default function FlashView({ chapters, activeChapterId }) {
  const [scope, setScope] = useState(activeChapterId);
  const [mode, setMode] = useState("review"); // review (dues) | all
  const [seed, setSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [srsVersion, setSrsVersion] = useState(0); // force recompute après notation

  const allCards = useMemo(
    () => buildFlashcards(chapters, scope === "all" ? null : scope),
    [chapters, scope]
  );

  const srs = useMemo(() => getSRS(), [srsVersion]);
  const stats = useMemo(() => srsStats(allCards, srs), [allCards, srs]);

  const deck = useMemo(() => {
    const base = mode === "review" ? dueCards(allCards, srs) : allCards;
    return shuffleFlashcards(base, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCards, mode, seed, srsVersion]);

  const card = deck[index];
  const done = index >= deck.length;

  const grade = (known) => {
    if (!card) return;
    gradeCard(card.id, known);
    markActivityToday();
    setSrsVersion((v) => v + 1);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setSrsVersion((v) => v + 1);
  };

  const setScopeAndReset = (s) => {
    setScope(s);
    setIndex(0);
  };
  const setModeAndReset = (m) => {
    setMode(m);
    setIndex(0);
    setSeed((s) => s + 1);
  };

  const resetProgress = () => {
    if (confirm("Réinitialiser la progression de révision (boîtes SRS) ?")) {
      resetSRS();
      restart();
    }
  };

  return (
    <>
      <div className="flash-config">
        <div className="flash-config-text">
          <strong>{stats.mastered}</strong>/{stats.total} maîtrisées ·{" "}
          <strong>{stats.due}</strong> à réviser
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button className={`quiz-chip${scope === "all" ? " is-active" : ""}`} onClick={() => setScopeAndReset("all")}>
            🎲 Tous
          </button>
          {chapters.map((c) => (
            <button
              key={c.id}
              className={`quiz-chip${scope === c.id ? " is-active" : ""}`}
              onClick={() => setScopeAndReset(c.id)}
              title={c.title}
            >
              {c.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="flash-config">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button className={`quiz-chip${mode === "review" ? " is-active" : ""}`} onClick={() => setModeAndReset("review")}>
            🧠 Révision intelligente ({stats.due})
          </button>
          <button className={`quiz-chip${mode === "all" ? " is-active" : ""}`} onClick={() => setModeAndReset("all")}>
            Toutes ({stats.total})
          </button>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="quiz-chip" onClick={restart} title="Mélanger et recommencer">
            🔀 Mélanger
          </button>
          <button className="quiz-chip" onClick={resetProgress} title="Réinitialiser les boîtes SRS">
            🗑 Réinit.
          </button>
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="flash-done">
          <h3>🎉 Rien à réviser pour l'instant !</h3>
          <p>
            {mode === "review"
              ? "Toutes les cartes de cette portée sont planifiées pour plus tard. Reviens demain ou passe en mode « Toutes »."
              : "Aucune carte dans cette portée."}
          </p>
          <button onClick={() => setModeAndReset("all")}>Voir toutes les cartes</button>
        </div>
      ) : done ? (
        <div className="flash-done">
          <h3>🎉 Pile terminée !</h3>
          <p>Tu as parcouru les {deck.length} cartes. La répétition espacée les ramènera au bon moment.</p>
          <button onClick={restart}>Recommencer</button>
        </div>
      ) : (
        <>
          <div className="quiz-progress">
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
            </div>
            <div className="quiz-progress-text">
              {index + 1} / {deck.length}
            </div>
          </div>

          <div className="flash-card" onClick={() => setIndex((i) => i + 1)} role="button" tabIndex={0}>
            <div className="flash-card-label">
              {card.kind === "alert" ? "⚠ Important" : card.kind === "step" ? "Étape" : card.kind === "list" ? "À retenir" : "Règle"}
              {srs[card.id] ? ` · boîte ${srs[card.id].box}/5` : " · nouvelle"}
            </div>
            <div className="flash-card-section">
              {card.chapterTitle} → {card.sectionTitle}
            </div>
            <div className="flash-card-text">{card.text}</div>
            <div className="flash-card-hint">Choisis une action ↓</div>
          </div>

          <div className="flash-actions">
            <button
              className="flash-btn-review"
              onClick={(e) => {
                e.stopPropagation();
                grade(false);
              }}
            >
              ↻ À revoir
            </button>
            <button
              className="flash-btn-skip"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => i + 1);
              }}
            >
              → Passer
            </button>
            <button
              className="flash-btn-known"
              onClick={(e) => {
                e.stopPropagation();
                grade(true);
              }}
            >
              ✓ Je sais
            </button>
          </div>
        </>
      )}
    </>
  );
}
