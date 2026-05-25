// Export / import de la progression d'un profil sous forme de fichier JSON.
// 100 % local : aucune donnée n'est envoyée sur un réseau.

import { readProfileRaw } from "./storage.js";

const FORMAT = "guide-route-profile";

export function exportProfile(profile) {
  const payload = {
    format: FORMAT,
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: { name: profile.name, emoji: profile.emoji, color: profile.color },
    data: readProfileRaw(profile.id)
  };
  return JSON.stringify(payload, null, 2);
}

export function parseImport(text) {
  let obj;
  try {
    obj = JSON.parse(text);
  } catch {
    throw new Error("Fichier illisible (JSON invalide).");
  }
  if (!obj || obj.format !== FORMAT || typeof obj.data !== "object") {
    throw new Error("Ce fichier n'est pas un profil Guide de la route.");
  }
  return obj;
}
