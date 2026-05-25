import { useEffect } from "react";
import Sign from "./Sign.jsx";

export default function QuizQuestion({
  question,
  selected,
  onSelect,
  onNext,
  onQuit,
  isLast
}) {
  const answered = selected !== null && selected !== undefined;
  const isCorrect = answered && selected === question.correct;
  const signOptions = !!question.optionsAreSigns;

  // Navigation clavier : 1-4 (ou a-d) pour répondre, Entrée/→ pour continuer.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (!answered) {
        const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
        const idx = map[e.key.toLowerCase()];
        if (idx != null && idx < question.options.length) {
          e.preventDefault();
          onSelect(question.options[idx]);
        }
      } else if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, question, onSelect, onNext]);

  const optionClass = (opt) => {
    const base = signOptions ? "quiz-option quiz-option-sign" : "quiz-option";
    if (!answered) return base;
    if (opt === question.correct) return `${base} is-correct`;
    if (opt === selected) return `${base} is-wrong`;
    return `${base} is-revealed`;
  };

  return (
    <div className="quiz-card">
      <div className="quiz-section-label">{question.sectionTitle}</div>

      {question.promptSign && (
        <div className="quiz-prompt-sign">
          <Sign id={question.promptSign} size={150} />
        </div>
      )}

      <div className="quiz-question">{question.prompt}</div>

      <div className={signOptions ? "quiz-options quiz-options-signs" : "quiz-options"}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={optionClass(opt)}
            disabled={answered}
            onClick={() => onSelect(opt)}
            aria-label={signOptions ? `Option ${i + 1}` : `Option ${i + 1} : ${opt}`}
          >
            {!signOptions && <span className="quiz-option-key" aria-hidden="true">{i + 1}</span>}
            {signOptions ? <Sign id={opt} size={92} /> : opt}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`quiz-feedback ${isCorrect ? "is-correct" : "is-wrong"}`}>
          {isCorrect ? (
            <>✓ Bonne réponse.</>
          ) : signOptions ? (
            <span className="quiz-feedback-sign">
              ✗ La bonne réponse était : <Sign id={question.correct} size={56} />
              <strong>{question.correctLabel}</strong>
            </span>
          ) : (
            <>
              ✗ La bonne réponse était : <strong>{question.correct}</strong>
            </>
          )}
        </div>
      )}

      <div className="quiz-actions">
        <button className="quiz-quit" onClick={onQuit}>
          Quitter
        </button>
        <button className="quiz-next" disabled={!answered} onClick={onNext}>
          {isLast ? "Voir le résultat" : "Question suivante →"}
        </button>
      </div>
    </div>
  );
}
