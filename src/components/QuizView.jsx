import { useMemo, useState } from "react";
import { buildQuestionPool, pickQuiz } from "../lib/quiz.js";
import { loadJSON, saveJSON } from "../lib/storage.js";
import { recordError, clearError, getErrors } from "../lib/errors.js";
import { markActivityToday } from "../lib/stats.js";
import QuizQuestion from "./QuizQuestion.jsx";
import QuizResults from "./QuizResults.jsx";

const COUNT_CHOICES = [10, 20, 30];

export default function QuizView({ chapters, activeChapterId, initialScope, onSwitchToRead, onOpenRule }) {
  const [scope, setScope] = useState(initialScope || activeChapterId); // chapter id | "all" | "errors"
  const [count, setCount] = useState(20);
  const [phase, setPhase] = useState("intro"); // intro | playing | results
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const isErrors = scope === "errors";
  const errorCount = useMemo(() => getErrors().length, []);

  const pool = useMemo(() => {
    if (scope === "errors") {
      // Reconstruit les questions « live » à partir des ids du deck d'erreurs.
      const live = new Map(buildQuestionPool(chapters).map((q) => [q.id, q]));
      return getErrors().map((e) => live.get(e.id)).filter(Boolean);
    }
    return buildQuestionPool(chapters, scope === "all" ? null : scope);
  }, [chapters, scope]);

  const scopeChapter = chapters.find((c) => c.id === scope);
  const bestScoreKey = `bestScore/${scope}/${count}`;
  const bestScore = isErrors ? null : loadJSON(bestScoreKey, null);

  const start = () => {
    const qs = pickQuiz(pool, isErrors ? pool.length : count);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setPhase("playing");
  };

  const handleSelect = (opt) => {
    setAnswers((prev) => {
      const next = prev.slice();
      next[current] = opt;
      return next;
    });
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const correct = questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0),
        0
      );
      const pct = Math.round((correct / questions.length) * 100);
      if (!isErrors && (bestScore == null || pct > bestScore)) {
        saveJSON(bestScoreKey, pct);
      }
      questions.forEach((q, i) => {
        if (answers[i] !== q.correct) {
          recordError(q); // ajoute / incrémente la faute
        } else if (isErrors) {
          clearError(q.id); // réussie en révision → sort du deck
        }
      });
      markActivityToday();
      setPhase("results");
    }
  };

  if (phase === "playing" && questions.length > 0) {
    const q = questions[current];
    const progressPct = ((current + 1) / questions.length) * 100;
    return (
      <>
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="quiz-progress-text">
            {current + 1} / {questions.length}
          </div>
        </div>
        <QuizQuestion
          question={q}
          selected={answers[current]}
          onSelect={handleSelect}
          onNext={handleNext}
          onQuit={() => setPhase("intro")}
          isLast={current + 1 === questions.length}
        />
      </>
    );
  }

  if (phase === "results") {
    return (
      <QuizResults
        questions={questions}
        answers={answers}
        bestScore={bestScore}
        onRetry={start}
        onChangeScope={() => setPhase("intro")}
        onReview={onSwitchToRead}
        onOpenRule={onOpenRule}
      />
    );
  }

  // Intro
  return (
    <div className="quiz-intro">
      <h3>Mode quiz – Questions à choix multiples</h3>
      <p>
        Questions générées automatiquement (tableaux + panneaux). Seuil de
        réussite (comme à la SAAQ) : <strong>75%</strong>. Choisis un chapitre,
        brasse <em>tout</em>, ou révise seulement <em>tes erreurs</em>.
      </p>

      <div style={{ marginBottom: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
        Portée
      </div>
      <div className="quiz-config">
        <button className={`quiz-chip${scope === "all" ? " is-active" : ""}`} onClick={() => setScope("all")}>
          🎲 Tous les chapitres
        </button>
        {errorCount > 0 && (
          <button className={`quiz-chip${isErrors ? " is-active" : ""}`} onClick={() => setScope("errors")}>
            🔁 Mes erreurs ({errorCount})
          </button>
        )}
        {chapters.map((c) => (
          <button
            key={c.id}
            className={`quiz-chip${scope === c.id ? " is-active" : ""}`}
            onClick={() => setScope(c.id)}
          >
            {c.emoji} {c.title}
          </button>
        ))}
      </div>

      {!isErrors && (
        <>
          <div style={{ marginBottom: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
            Nombre de questions
          </div>
          <div className="quiz-config">
            {COUNT_CHOICES.map((n) => (
              <button key={n} className={`quiz-chip${count === n ? " is-active" : ""}`} onClick={() => setCount(n)}>
                {n} questions
              </button>
            ))}
          </div>
        </>
      )}

      <div style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 14 }}>
        {isErrors ? (
          <>
            Révision de <strong>{pool.length}</strong> erreur{pool.length > 1 ? "s" : ""}. Une
            question réussie sort du deck.
          </>
        ) : (
          <>
            Banque disponible : <strong>{pool.length}</strong> question{pool.length > 1 ? "s" : ""}
            {scopeChapter ? ` dans « ${scopeChapter.title} »` : " au total"}.
            {bestScore != null && (
              <>
                {" · "}Meilleur score : <strong>{bestScore}%</strong>
              </>
            )}
          </>
        )}
      </div>

      <button className="quiz-start" onClick={start} disabled={pool.length === 0}>
        {isErrors ? "Réviser mes erreurs →" : "Commencer le quiz →"}
      </button>
    </div>
  );
}
