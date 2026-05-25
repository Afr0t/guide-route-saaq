// Gestion des profils locaux (multi-utilisateur sans serveur).
// Le registre et l'ID actif sont des clés globales ; tout le reste est par profil.

import { loadJSON, saveJSON, clearProfileData, writeProfileRaw, setActiveProfileForStorage } from "./storage.js";

const PROFILES_KEY = "__profiles";
const ACTIVE_KEY = "__active";

export const PROFILE_EMOJIS = ["🦫", "🚗", "🦉", "🐺", "🦊", "🐢", "🦅", "🐱", "🐼", "🦁"];
export const PROFILE_COLORS = ["#2e86c1", "#2e7d32", "#9c27b0", "#c62828", "#00897b", "#f57c00", "#6a1b9a"];

function uid() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function getProfiles() {
  return loadJSON(PROFILES_KEY, []);
}

function setProfiles(list) {
  saveJSON(PROFILES_KEY, list);
}

export function getActiveId() {
  return loadJSON(ACTIVE_KEY, null);
}

export function createProfile(name) {
  const list = getProfiles();
  const i = list.length;
  const profile = {
    id: uid(),
    name: (name || `Profil ${i + 1}`).trim().slice(0, 24) || `Profil ${i + 1}`,
    emoji: PROFILE_EMOJIS[i % PROFILE_EMOJIS.length],
    color: PROFILE_COLORS[i % PROFILE_COLORS.length],
    createdAt: Date.now()
  };
  setProfiles([...list, profile]);
  return profile;
}

export function renameProfile(id, name) {
  const list = getProfiles().map((p) =>
    p.id === id ? { ...p, name: (name || p.name).trim().slice(0, 24) || p.name } : p
  );
  setProfiles(list);
}

export function deleteProfile(id) {
  const list = getProfiles().filter((p) => p.id !== id);
  setProfiles(list);
  clearProfileData(id);
  if (getActiveId() === id) {
    const next = list[0]?.id || null;
    if (next) setActive(next);
  }
  return list;
}

export function setActive(id) {
  saveJSON(ACTIVE_KEY, id);
  setActiveProfileForStorage(id);
}

// Crée un nouveau profil à partir d'un export et y écrit les données.
export function importProfile(parsed) {
  const meta = parsed.profile || {};
  const list = getProfiles();
  const i = list.length;
  const baseName = (meta.name || "Profil importé").slice(0, 16);
  const profile = {
    id: uid(),
    name: `${baseName} (importé)`.slice(0, 24),
    emoji: meta.emoji || PROFILE_EMOJIS[i % PROFILE_EMOJIS.length],
    color: meta.color || PROFILE_COLORS[i % PROFILE_COLORS.length],
    createdAt: Date.now()
  };
  setProfiles([...list, profile]);
  writeProfileRaw(profile.id, parsed.data);
  return profile;
}

export function getActiveProfile() {
  const id = getActiveId();
  return getProfiles().find((p) => p.id === id) || null;
}

// Garantit qu'au moins un profil existe et qu'un profil est actif.
// Migre aussi les anciennes données (clés "guide-route/<key>") vers le 1er profil.
export function ensureInitialized() {
  let list = getProfiles();
  if (list.length === 0) {
    // setActiveProfileForStorage doit pointer sur le futur profil AVANT de créer
    // ses données — mais createProfile n'écrit que dans le registre global.
    const first = createProfile("Moi");
    list = [first];
    setActive(first.id);
    migrateLegacyData(first.id);
  }
  let activeId = getActiveId();
  if (!activeId || !list.some((p) => p.id === activeId)) {
    activeId = list[0].id;
    setActive(activeId);
  } else {
    setActiveProfileForStorage(activeId);
  }
  return getActiveProfile();
}

// Récupère les données de l'ancienne version (sans profil) vers le 1er profil.
function migrateLegacyData(profileId) {
  try {
    const ROOT = "guide-route/";
    const legacyKeys = ["mode", "activeChapterId", "flashStatus"];
    const matches = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(ROOT)) continue;
      const sub = k.slice(ROOT.length);
      if (sub.startsWith("u/") || sub.startsWith("__")) continue; // déjà migré/global
      if (legacyKeys.includes(sub) || sub.startsWith("bestScore/")) matches.push(sub);
    }
    matches.forEach((sub) => {
      const val = localStorage.getItem(ROOT + sub);
      if (val != null) localStorage.setItem(`${ROOT}u/${profileId}/${sub}`, val);
      localStorage.removeItem(ROOT + sub);
    });
  } catch {
    // ignore
  }
}
