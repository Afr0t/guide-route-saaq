import { lazy, Suspense, useEffect, useState } from "react";
import { chapters } from "./data/chapters.js";
import { loadJSON, saveJSON } from "./lib/storage.js";
import { SUPPORT_URL, SUPPORT_LABEL } from "./config.js";
import ReadView from "./components/ReadView.jsx";
import ProfileMenu from "./components/ProfileMenu.jsx";

// Modes lourds chargés à la demande (code-splitting).
const QuizView = lazy(() => import("./components/QuizView.jsx"));
const FlashView = lazy(() => import("./components/FlashView.jsx"));
const ExamView = lazy(() => import("./components/ExamView.jsx"));
const StatsView = lazy(() => import("./components/StatsView.jsx"));

const MODES = [
  { id: "read", label: "📖 Lecture" },
  { id: "quiz", label: "📝 Quiz" },
  { id: "exam", label: "📋 Examen" },
  { id: "flash", label: "🃏 Cartes" },
  { id: "stats", label: "📊 Progrès" }
];

// Les onglets de chapitre + recherche n'ont de sens que pour ces modes.
const CHAPTER_MODES = new Set(["read", "quiz", "flash"]);

export default function App({ profileApi }) {
  const [mode, setMode] = useState(() => loadJSON("mode", "read"));
  const [activeChapterId, setActiveChapterId] = useState(
    () => loadJSON("activeChapterId", chapters[0].id)
  );
  const [search, setSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);
  const [focus, setFocus] = useState(null); // { chapterId, sectionTitle, n }
  const [quizScope, setQuizScope] = useState(null); // ex. "errors" lancé depuis Progrès

  const activeChapter =
    chapters.find((c) => c.id === activeChapterId) || chapters[0];

  // Saut « Voir la règle » : ouvre la section source en mode Lecture.
  const openRule = (chapterId, sectionTitle) => {
    setActiveChapterId(chapterId);
    setSearch("");
    setGlobalSearch(false);
    setFocus({ chapterId, sectionTitle, n: Date.now() });
    setMode("read");
  };

  // Lance un quiz ciblé sur le deck d'erreurs (depuis Progrès).
  const reviewErrors = () => {
    setQuizScope("errors");
    setMode("quiz");
  };

  const onModeClick = (id) => {
    if (id === "quiz") setQuizScope(null); // onglet Quiz direct = portée normale
    setMode(id);
  };

  useEffect(() => {
    saveJSON("mode", mode);
  }, [mode]);

  useEffect(() => {
    saveJSON("activeChapterId", activeChapterId);
  }, [activeChapterId]);

  const styleVars = {
    "--chapter-color": activeChapter.color,
    "--chapter-accent": activeChapter.accent
  };

  const showChapterBar = CHAPTER_MODES.has(mode);

  return (
    <div className="app" style={styleVars}>
      <header className="header">
        <div className="header-inner">
          <div className="header-title-row">
            <span className="header-logo">🚘</span>
            <div className="header-titles">
              <h1>Guide de la route – Examen SAAQ</h1>
              <p>Condensé 4ᵉ édition · Lecture · Quiz · Examen blanc · Cartes</p>
            </div>
            {profileApi && <ProfileMenu api={profileApi} />}
          </div>

          <div className="mode-tabs" role="tablist" aria-label="Mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={mode === m.id}
                className={`mode-tab${mode === m.id ? " is-active" : ""}`}
                onClick={() => onModeClick(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === "read" && (
            <div className="search-row">
              <input
                className="search-input"
                type="search"
                aria-label={globalSearch ? "Rechercher dans tout le guide" : "Rechercher dans ce chapitre"}
                placeholder={globalSearch ? "🔍 Rechercher dans tout le guide…" : "🔍 Rechercher dans ce chapitre…"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <label className="search-scope" title="Étendre la recherche à tous les chapitres">
                <input
                  type="checkbox"
                  checked={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.checked)}
                />
                Tout le guide
              </label>
            </div>
          )}

          {showChapterBar && (
            <div className="chapter-tabs" role="tablist" aria-label="Chapitre">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  role="tab"
                  aria-selected={ch.id === activeChapterId}
                  className={`chapter-tab${ch.id === activeChapterId ? " is-active" : ""}`}
                  style={
                    ch.id === activeChapterId
                      ? { "--chapter-color": ch.color, "--chapter-accent": ch.accent }
                      : undefined
                  }
                  onClick={() => {
                    setActiveChapterId(ch.id);
                    setSearch("");
                  }}
                >
                  {ch.emoji} {ch.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="app-content">
        {mode === "read" && (
          <ReadView
            chapter={activeChapter}
            chapters={chapters}
            search={search}
            globalSearch={globalSearch}
            focus={focus}
            onFocusConsumed={() => setFocus(null)}
            onJumpToChapter={(id) => {
              setActiveChapterId(id);
              setGlobalSearch(false);
            }}
          />
        )}
        <Suspense fallback={<div className="empty">Chargement…</div>}>
          {mode === "quiz" && (
            <QuizView
              chapters={chapters}
              activeChapterId={activeChapterId}
              initialScope={quizScope}
              onSwitchToRead={() => setMode("read")}
              onOpenRule={openRule}
            />
          )}
          {mode === "exam" && <ExamView chapters={chapters} onOpenRule={openRule} />}
          {mode === "flash" && (
            <FlashView chapters={chapters} activeChapterId={activeChapterId} />
          )}
          {mode === "stats" && (
            <StatsView chapters={chapters} onGoToMode={onModeClick} onReviewErrors={reviewErrors} onOpenRule={openRule} />
          )}
        </Suspense>
      </main>

      <footer className="app-footer">
        {SUPPORT_URL && (
          <div className="support-row">
            <a
              className="support-link"
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SUPPORT_LABEL}
            </a>
            <div className="support-note">Gratuit et sans pub — un café aide à le garder vivant 🙏</div>
          </div>
        )}
        Condensé basé sur le <em>Guide de la route</em> SAAQ (4<sup>e</sup>{" "}
        édition). Consulter{" "}
        <a href="https://saaq.gouv.qc.ca" target="_blank" rel="noopener noreferrer">
          saaq.gouv.qc.ca
        </a>{" "}
        pour les cas particuliers. Données mises à jour à la main — vérifier les
        références officielles avant toute décision légale.
      </footer>
    </div>
  );
}
