import { useEffect, useRef, useState } from "react";
import { exportProfile } from "../lib/transfer.js";

export default function ProfileMenu({ api }) {
  const { profiles, activeId, onSwitch, onAdd, onRename, onDelete, onImport } = api;
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const ref = useRef(null);
  const fileRef = useRef(null);

  const active = profiles.find((p) => p.id === activeId) || profiles[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (!active) return null;

  const submitAdd = () => {
    const name = draft.trim();
    onAdd(name || undefined);
    setDraft("");
    setAdding(false);
    setOpen(false);
  };

  const handleRename = () => {
    const name = prompt("Renommer le profil :", active.name);
    if (name != null) onRename(active.id, name);
  };

  const handleDelete = () => {
    if (profiles.length <= 1) {
      alert("Impossible de supprimer le dernier profil.");
      return;
    }
    if (confirm(`Supprimer le profil « ${active.name} » et toute sa progression ?`)) {
      onDelete(active.id);
      setOpen(false);
    }
  };

  const handleExport = () => {
    const json = exportProfile(active);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = active.name.replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "") || "profil";
    a.href = url;
    a.download = `guide-route-${safe}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const p = onImport(String(reader.result));
        setOpen(false);
        alert(`Profil « ${p.name} » importé.`);
      } catch (err) {
        alert("Import impossible : " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="profile-menu" ref={ref}>
      <button
        className="profile-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Profil : ${active.name}`}
      >
        <span className="profile-avatar" style={{ background: active.color }}>
          {active.emoji}
        </span>
        <span className="profile-name">{active.name}</span>
        <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown-label">Profils</div>
          {profiles.map((p) => (
            <button
              key={p.id}
              role="menuitemradio"
              aria-checked={p.id === activeId}
              className={`profile-item${p.id === activeId ? " is-active" : ""}`}
              onClick={() => {
                onSwitch(p.id);
                setOpen(false);
              }}
            >
              <span className="profile-avatar sm" style={{ background: p.color }}>
                {p.emoji}
              </span>
              <span>{p.name}</span>
              {p.id === activeId && <span className="profile-check">✓</span>}
            </button>
          ))}

          <div className="profile-divider" />

          {adding ? (
            <div className="profile-add-row">
              <input
                autoFocus
                value={draft}
                maxLength={24}
                placeholder="Nom du profil"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitAdd();
                  if (e.key === "Escape") setAdding(false);
                }}
              />
              <button onClick={submitAdd}>OK</button>
            </div>
          ) : (
            <button className="profile-action" onClick={() => setAdding(true)}>
              ＋ Nouveau profil
            </button>
          )}
          <button className="profile-action" onClick={handleRename}>
            ✎ Renommer « {active.name} »
          </button>

          <div className="profile-divider" />

          <button className="profile-action" onClick={handleExport}>
            ⬇ Exporter ma progression
          </button>
          <button className="profile-action" onClick={() => fileRef.current?.click()}>
            ⬆ Importer un profil…
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            style={{ display: "none" }}
            onChange={handleFile}
          />

          {profiles.length > 1 && (
            <button className="profile-action danger" onClick={handleDelete}>
              🗑 Supprimer ce profil
            </button>
          )}
        </div>
      )}
    </div>
  );
}
