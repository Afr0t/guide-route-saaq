import { useState } from "react";
import App from "./App.jsx";
import {
  ensureInitialized,
  getProfiles,
  getActiveId,
  setActive,
  createProfile,
  renameProfile,
  deleteProfile,
  importProfile
} from "./lib/profiles.js";
import { parseImport } from "./lib/transfer.js";

export default function Root() {
  // Initialise les profils une seule fois (création + migration éventuelle).
  useState(() => {
    ensureInitialized();
    return true;
  });

  const [profiles, setProfiles] = useState(() => getProfiles());
  const [activeId, setActiveId] = useState(() => getActiveId());

  const sync = () => {
    setProfiles(getProfiles());
    setActiveId(getActiveId());
  };

  const profileApi = {
    profiles,
    activeId,
    onSwitch: (id) => {
      setActive(id);
      setActiveId(id);
    },
    onAdd: (name) => {
      const p = createProfile(name);
      setActive(p.id);
      sync();
      setActiveId(p.id);
    },
    onRename: (id, name) => {
      renameProfile(id, name);
      setProfiles(getProfiles());
    },
    onDelete: (id) => {
      deleteProfile(id);
      sync();
    },
    onImport: (text) => {
      const parsed = parseImport(text); // peut lever une erreur
      const p = importProfile(parsed);
      setActive(p.id);
      sync();
      setActiveId(p.id);
      return p;
    }
  };

  // key={activeId} : remonte l'app au changement de profil pour relire ses données.
  return <App key={activeId} profileApi={profileApi} />;
}
