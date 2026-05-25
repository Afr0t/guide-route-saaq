import { useState } from "react";
import { chapterMastery, getStreak, getExamHistory } from "../lib/stats.js";
import { getErrors, clearAllErrors, clearError } from "../lib/errors.js";
import Sign from "./Sign.jsx";

export default function StatsView({ chapters, onGoToMode, onReviewErrors, onOpenRule }) {
  const [v, setV] = useState(0); // refresh
  const mastery = chapterMastery(chapters);
  const streak = getStreak();
  const exams = getExamHistory();
  const errors = getErrors();

  const totalCards = mastery.reduce((n, c) => n + c.total, 0);
  const totalMastered = mastery.reduce((n, c) => n + c.mastered, 0);
  const globalPct = totalCards ? Math.round((totalMastered / totalCards) * 100) : 0;
  const lastExam = exams[0];

  const removeError = (id) => {
    clearError(id);
    setV((x) => x + 1);
  };
  const clearAll = () => {
    if (confirm("Vider tout le deck d'erreurs ?")) {
      clearAllErrors();
      setV((x) => x + 1);
    }
  };

  return (
    <div className="stats">
      {/* Bandeau résumé */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{globalPct}%</div>
          <div className="stat-label">Maîtrise globale</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">🔥 {streak}</div>
          <div className="stat-label">Jours d'affilée</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{lastExam ? `${lastExam.pct}%` : "—"}</div>
          <div className="stat-label">Dernier examen</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{errors.length}</div>
          <div className="stat-label">Erreurs à revoir</div>
        </div>
      </div>

      {/* Maîtrise par chapitre */}
      <h3 className="stats-h">Maîtrise par chapitre</h3>
      <div className="mastery-list">
        {mastery.map((c) => (
          <div key={c.id} className="mastery-row">
            <div className="mastery-head">
              <span>{c.emoji} {c.title}</span>
              <span className="mastery-num">
                {c.mastered}/{c.total}
                {c.bestScore != null && <span className="mastery-best"> · quiz {c.bestScore}%</span>}
              </span>
            </div>
            <div className="mastery-bar">
              <div
                className="mastery-fill"
                style={{ width: `${c.pct}%`, background: c.color }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="stats-actions">
        <button onClick={() => onGoToMode("flash")}>🃏 Réviser les cartes</button>
        <button onClick={() => onGoToMode("exam")}>📋 Faire un examen blanc</button>
      </div>

      {/* Historique d'examens */}
      {exams.length > 0 && (
        <>
          <h3 className="stats-h">Historique d'examens</h3>
          <div className="exam-history">
            {exams.slice(0, 8).map((e, i) => (
              <div key={i} className={`exam-hist-row ${e.passed ? "is-pass" : "is-fail"}`}>
                <span>{new Date(e.ts).toLocaleDateString("fr-CA")}</span>
                <span>{e.score}/{e.total}</span>
                <span className="exam-hist-pct">{e.pct}%</span>
                <span>{e.passed ? "✓ Réussi" : "✗ Échec"}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Deck d'erreurs */}
      <h3 className="stats-h">
        Mes erreurs ({errors.length})
        {errors.length > 0 && (
          <span style={{ display: "flex", gap: 6 }}>
            <button className="stats-review" onClick={onReviewErrors}>🔁 Réviser</button>
            <button className="stats-clear" onClick={clearAll}>Tout vider</button>
          </span>
        )}
      </h3>
      {errors.length === 0 ? (
        <div className="empty">Aucune erreur enregistrée. Fais un quiz ou un examen pour alimenter ta révision.</div>
      ) : (
        <div className="error-deck">
          {errors.map((e) => (
            <div key={e.id} className="error-item">
              <div className="error-item-body">
                {e.promptSign && <Sign id={e.promptSign} size={48} label="" />}
                <div>
                  <div className="error-q">{e.prompt}</div>
                  <div className="error-a">
                    Bonne réponse :{" "}
                    {e.optionsAreSigns ? (
                      <>
                        <Sign id={e.correct} size={40} label="" />{" "}
                        <strong>{e.correctLabel}</strong>
                      </>
                    ) : (
                      <strong>{e.correct}</strong>
                    )}
                    {e.count > 1 && <span className="error-count"> · raté {e.count}×</span>}
                    <br />
                    <span style={{ color: "var(--text-faint)" }}>📖 {e.chapterTitle} → {e.sectionTitle}</span>
                    {onOpenRule && (
                      <div>
                        <button className="see-rule-btn" onClick={() => onOpenRule(e.chapterId, e.sectionTitle)}>
                          📖 Voir la règle
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="error-remove" onClick={() => removeError(e.id)} aria-label="Retirer">
                ✓ Acquise
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
