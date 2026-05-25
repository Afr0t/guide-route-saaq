import { useEffect, useMemo, useState } from "react";
import SectionCard from "./SectionCard.jsx";

function matchSection(section, q) {
  if (section.title.toLowerCase().includes(q)) return true;
  return section.content.some(
    (c) =>
      (c.text || "").toLowerCase().includes(q) ||
      (c.label || "").toLowerCase().includes(q) ||
      (c.detail || "").toLowerCase().includes(q) ||
      (c.title || "").toLowerCase().includes(q) ||
      (c.items || []).some((item) => item.toLowerCase().includes(q)) ||
      (c.rows || []).some((r) => r.some((cell) => cell.toLowerCase().includes(q))) ||
      (c.headers || []).some((h) => h.toLowerCase().includes(q)) ||
      (c.signs || []).some((s) => (s.label || "").toLowerCase().includes(q))
  );
}

export default function ReadView({ chapter, chapters, search, globalSearch, onJumpToChapter, focus, onFocusConsumed }) {
  const [openMap, setOpenMap] = useState({});
  const q = search.trim().toLowerCase();

  // Saut vers une section précise (depuis « Voir la règle » d'une question).
  useEffect(() => {
    if (!focus || focus.chapterId !== chapter.id) return;
    const idx = chapter.sections.findIndex((s) => s.title === focus.sectionTitle);
    if (idx >= 0) {
      setOpenMap((p) => ({ ...p, [`${chapter.id}-${idx}`]: true }));
      requestAnimationFrame(() => {
        const el = document.getElementById(`sec-${chapter.id}-${idx}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("section-flash");
          setTimeout(() => el.classList.remove("section-flash"), 1600);
        }
      });
    }
    onFocusConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  // ---- Recherche globale (tous les chapitres) ----
  const globalResults = useMemo(() => {
    if (!globalSearch || !q) return null;
    const out = [];
    for (const ch of chapters) {
      const secs = ch.sections
        .map((s, i) => ({ ...s, _idx: i }))
        .filter((s) => matchSection(s, q));
      if (secs.length) out.push({ chapter: ch, sections: secs });
    }
    return out;
  }, [globalSearch, q, chapters]);

  // ---- Recherche / affichage dans le chapitre courant ----
  const filtered = useMemo(() => {
    const indexed = chapter.sections.map((s, i) => ({ ...s, _idx: i }));
    if (!q || globalSearch) return indexed;
    return indexed.filter((s) => matchSection(s, q));
  }, [chapter, q, globalSearch]);

  const toggleSection = (cid, idx) =>
    setOpenMap((p) => ({ ...p, [`${cid}-${idx}`]: !p[`${cid}-${idx}`] }));
  const isOpen = (cid, idx) => !!openMap[`${cid}-${idx}`];

  const expandAll = () => {
    const next = { ...openMap };
    filtered.forEach((s) => (next[`${chapter.id}-${s._idx}`] = true));
    setOpenMap(next);
  };
  const collapseAll = () => {
    const next = { ...openMap };
    chapter.sections.forEach((_, i) => (next[`${chapter.id}-${i}`] = false));
    setOpenMap(next);
  };

  // ===== Vue recherche globale =====
  if (globalResults) {
    const totalSecs = globalResults.reduce((n, r) => n + r.sections.length, 0);
    return (
      <>
        <div className="chapter-banner">
          <div className="chapter-banner-left">
            <span className="chapter-banner-emoji">🔍</span>
            <div>
              <h2>Recherche dans tout le guide</h2>
              <p>
                {totalSecs} résultat{totalSecs > 1 ? "s" : ""} pour « {search} » dans{" "}
                {globalResults.length} chapitre{globalResults.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {totalSecs === 0 && (
          <div className="empty">Aucun résultat pour « {search} » dans le guide.</div>
        )}

        {globalResults.map(({ chapter: ch, sections }) => (
          <div key={ch.id} style={{ marginBottom: 14 }}>
            <button
              className="global-result-chapter"
              style={{ "--chapter-color": ch.color, "--chapter-accent": ch.accent }}
              onClick={() => onJumpToChapter?.(ch.id)}
              title="Ouvrir ce chapitre"
            >
              {ch.emoji} {ch.title} <span aria-hidden="true">→</span>
            </button>
            <div style={{ "--chapter-color": ch.color, "--chapter-accent": ch.accent }}>
              {sections.map((section) => (
                <SectionCard
                  key={section._idx}
                  section={section}
                  isOpen={isOpen(ch.id, section._idx)}
                  onToggle={() => toggleSection(ch.id, section._idx)}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  // ===== Vue chapitre =====
  return (
    <>
      <div className="chapter-banner">
        <div className="chapter-banner-left">
          <span className="chapter-banner-emoji">{chapter.emoji}</span>
          <div>
            <h2>{chapter.title}</h2>
            <p>
              {filtered.length} section{filtered.length > 1 ? "s" : ""}
              {q && !globalSearch ? " · filtre actif" : ""}
            </p>
          </div>
        </div>
        <div className="chapter-banner-actions">
          <button onClick={expandAll}>Tout ouvrir</button>
          <button onClick={collapseAll}>Tout fermer</button>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="empty">Aucun résultat pour « {search} » dans ce chapitre.</div>
      )}

      {filtered.map((section) => (
        <SectionCard
          key={section._idx}
          section={section}
          domId={`sec-${chapter.id}-${section._idx}`}
          isOpen={isOpen(chapter.id, section._idx)}
          onToggle={() => toggleSection(chapter.id, section._idx)}
        />
      ))}
    </>
  );
}
