import { useEffect, useMemo, useRef, useState } from "react";
import { buildQuestionPool, pickQuiz } from "../lib/quiz.js";
import { recordError } from "../lib/errors.js";
import { recordExam, markActivityToday, getExamHistory } from "../lib/stats.js";
import Sign from "./Sign.jsx";
import QuizResults from "./QuizResults.jsx";

const EXAM_COUNT = 32; // format SAAQ
const EXAM_MINUTES = 30;
const PASS_PCT = 75;

function fmt(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function ExamView({ chapters, onOpenRule }) {
  const [phase, setPhase] = useState("intro"); // intro | playing | results
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(Date.now());
  const timerRef = useRef(null);

  const pool = useMemo(() => buildQuestionPool(chapters), [chapters]);
  const history = useMemo(() => getExamHistory(), [phase === "intro"]);
  const bestPct = history.reduce((m, h) => Math.max(m, h.pct), 0) || null;

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const finish = (qs = questions, ans = answers) => {
    clearInterval(timerRef.current);
    const correct = qs.reduce((a, q, i) => a + (ans[i] === q.correct ? 1 : 0), 0);
    const pct = qs.length ? Math.round((correct / qs.length) * 100) : 0;
    qs.forEach((q, i) => {
      if (ans[i] !== q.correct) recordError(q);
    });
    recordExam({
      score: correct,
      total: qs.length,
      pct,
      passed: pct >= PASS_PCT,
      durationMs: EXAM_MINUTES * 60000 - (deadline - Date.now())
    });
    markActivityToday();
    setPhase("results");
  };

  // Auto-soumission à la fin du temps.
  useEffect(() => {
    if (phase === "playing" && now >= deadline) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, phase]);

  const start = () => {
    const qs = pickQuiz(pool, EXAM_COUNT);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setDeadline(Date.now() + EXAM_MINUTES * 60000);
    setNow(Date.now());
    setPhase("playing");
  };

  const select = (opt) =>
    setAnswers((prev) => {
      const next = prev.slice();
      next[current] = opt;
      return next;
    });

  if (phase === "intro") {
    return (
      <div className="quiz-intro">
        <h3>📋 Examen blanc – format SAAQ</h3>
        <p>
          <strong>{EXAM_COUNT} questions</strong> tirées de tous les chapitres,{" "}
          <strong>{EXAM_MINUTES} minutes</strong>, seuil de réussite{" "}
          <strong>{PASS_PCT}%</strong>. Aucune correction pendant l'examen : tu
          revois tout à la fin. Les erreurs sont ajoutées à ton deck de révision.
        </p>
        {bestPct != null && (
          <div style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 12 }}>
            Meilleur résultat : <strong>{bestPct}%</strong> · {history.length} examen
            {history.length > 1 ? "s" : ""} passé{history.length > 1 ? "s" : ""}
          </div>
        )}
        <button className="quiz-start" onClick={start} disabled={pool.length < EXAM_COUNT}>
          Commencer l'examen →
        </button>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <QuizResults
        questions={questions}
        answers={answers}
        bestScore={bestPct}
        onRetry={start}
        onChangeScope={() => setPhase("intro")}
        onReview={() => setPhase("intro")}
        onOpenRule={onOpenRule}
      />
    );
  }

  // phase playing
  const q = questions[current];
  const signOptions = !!q.optionsAreSigns;
  const answeredCount = answers.filter((a) => a != null).length;
  const remaining = deadline - now;
  const lowTime = remaining < 60000;

  return (
    <>
      <div className="exam-bar">
        <div className={`exam-timer${lowTime ? " is-low" : ""}`}>⏱ {fmt(remaining)}</div>
        <div className="quiz-progress-text">
          {answeredCount}/{questions.length} répondues
        </div>
        <button className="exam-finish" onClick={() => finish()}>
          Terminer
        </button>
      </div>

      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="quiz-progress-text">
          {current + 1} / {questions.length}
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-section-label">Question {current + 1}</div>
        {q.promptSign && (
          <div className="quiz-prompt-sign">
            <Sign id={q.promptSign} size={150} label="panneau à identifier" />
          </div>
        )}
        <div className="quiz-question">{q.prompt}</div>
        <div className={signOptions ? "quiz-options quiz-options-signs" : "quiz-options"}>
          {q.options.map((opt, i) => {
            const sel = answers[current] === opt;
            return (
              <button
                key={i}
                className={`quiz-option${signOptions ? " quiz-option-sign" : ""}${sel ? " is-selected" : ""}`}
                onClick={() => select(opt)}
                aria-pressed={sel}
              >
                {!signOptions && <span className="quiz-option-key" aria-hidden="true">{i + 1}</span>}
                {signOptions ? <Sign id={opt} size={92} label="" /> : opt}
              </button>
            );
          })}
        </div>

        <div className="quiz-actions">
          <button className="quiz-quit" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
            ← Précédent
          </button>
          {current + 1 < questions.length ? (
            <button className="quiz-next" onClick={() => setCurrent((c) => c + 1)}>
              Question suivante →
            </button>
          ) : (
            <button className="quiz-next" onClick={() => finish()}>
              Terminer l'examen
            </button>
          )}
        </div>
      </div>

      {/* pastilles de navigation rapide */}
      <div className="exam-nav">
        {questions.map((_, i) => (
          <button
            key={i}
            className={`exam-dot${i === current ? " is-current" : ""}${answers[i] != null ? " is-done" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Aller à la question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
