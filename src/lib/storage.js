// Couche de stockage localStorage, consciente des profils.
//
// Clés globales (partagées) : commencent par "__" → "guide-route/__<key>".
// Clés par profil : "guide-route/u/<profileId>/<key>".
//
// L'ID de profil actif est tenu en module ; il est positionné au démarrage par
// profiles.js avant le rendu de l'app. Changer de profil = remonter l'arbre
// React (clé sur la racine) pour relire les données du nouveau profil.

const ROOT = "guide-route/";

let activeProfileId = "default";

export function setActiveProfileForStorage(id) {
  activeProfileId = id || "default";
}

function fullKey(key) {
  if (key.startsWith("__")) return ROOT + key.slice(2); // clé globale
  return `${ROOT}u/${activeProfileId}/${key}`;
}

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(fullKey(key));
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(fullKey(key), JSON.stringify(value));
  } catch {
    // localStorage indisponible (mode privé, quota) — échec silencieux
  }
}

export function clearKey(key) {
  try {
    localStorage.removeItem(fullKey(key));
  } catch {
    // ignore
  }
}

// Lit toutes les paires (sous-clé → valeur brute) d'un profil (pour l'export).
export function readProfileRaw(profileId) {
  const prefix = `${ROOT}u/${profileId}/`;
  const out = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) out[k.slice(prefix.length)] = localStorage.getItem(k);
    }
  } catch {
    // ignore
  }
  return out;
}

// Écrit des paires (sous-clé → valeur brute) sous un profil donné (pour l'import).
export function writeProfileRaw(profileId, data) {
  const prefix = `${ROOT}u/${profileId}/`;
  try {
    for (const [sub, val] of Object.entries(data || {})) {
      if (typeof val === "string") localStorage.setItem(prefix + sub, val);
    }
  } catch {
    // ignore
  }
}

// Supprime toutes les données d'un profil donné.
export function clearProfileData(profileId) {
  try {
    const prefix = `${ROOT}u/${profileId}/`;
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
