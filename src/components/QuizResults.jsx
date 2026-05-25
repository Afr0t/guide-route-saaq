import Sign from "./Sign.jsx";

export default function QuizResults({
  questions,
  answers,
  bestScore,
  onRetry,
  onChangeScope,
  onReview,
  onOpenRule
}) {
  const total = questions.length;
  const correct = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0),
    0
  );
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const passed = pct >= 75; // SAAQ examen théorique : passage 75%
  const newBest = bestScore == null || pct > bestScore;

  const wrong = questions
    .map((q, i) => ({ q, picked: answers[i] }))
    .filter((x) => x.picked !== x.q.correct);

  return (
    <div className="quiz-results">
      <div className="quiz-section-label">Résultat</div>
      <div className="quiz-results-score">
        {correct} / {total}
      </div>
      <div className="quiz-results-percent">{pct}%</div>
      <div className={`quiz-results-verdict ${passed ? "is-pass" : "is-fail"}`}>
        {passed ? "Réussi (≥ 75%)" : "Sous le seuil de 75%"}
      </div>
      {newBest && bestScore != null && (
        <div style={{ color: "var(--success-text)", fontSize: 12.5, marginBottom: 14 }}>
          🎉 Nouveau record (précédent : {bestScore}%)
        </div>
      )}
      {bestScore != null && !newBest && (
        <div style={{ color: "var(--text-faint)", fontSize: 12.5, marginBottom: 14 }}>
          Meilleur score : {bestScore}%
        </div>
      )}

      <div className="quiz-results-actions">
        <button className="primary" onClick={onRetry}>
          Refaire un quiz
        </button>
        <button className="secondary" onClick={onChangeScope}>
          Changer la portée
        </button>
        <button className="secondary" onClick={onReview}>
          Revenir à la lecture
        </button>
      </div>

      {wrong.length > 0 && (
        <div className="quiz-review">
          <div className="quiz-review-title">À revoir ({wrong.length})</div>
          {wrong.map(({ q, picked }, i) => (
            <div key={i} className="quiz-review-item">
              <div className="quiz-review-q">
                {q.promptSign && (
                  <span className="quiz-review-prompt-sign">
                    <Sign id={q.promptSign} size={54} />
                  </span>
                )}
                {q.prompt}
              </div>
              <div className="quiz-review-a">
                {q.optionsAreSigns ? (
                  <span className="quiz-review-signs">
                    Ta réponse : <Sign id={picked} size={42} /> · Bonne réponse :{" "}
                    <Sign id={q.correct} size={42} /> <strong>{q.correctLabel}</strong>
                  </span>
                ) : (
                  <>
                    Ta réponse : « {picked} » · Bonne réponse :{" "}
                    <strong>{q.correct}</strong>
                  </>
                )}
                <br />
                <span style={{ color: "var(--text-faint)" }}>
                  📖 {q.chapterTitle} → {q.sectionTitle}
                </span>
                {onOpenRule && (
                  <div>
                    <button
                      className="see-rule-btn"
                      onClick={() => onOpenRule(q.chapterId, q.sectionTitle)}
                    >
                      📖 Voir la règle
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
