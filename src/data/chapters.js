// Index — assemble les chapitres dans l'ordre d'affichage.
// Pour modifier le contenu, éditer les fichiers dans ./chapters/
import conducteur from "./chapters/conducteur.js";
import vehicule from "./chapters/vehicule.js";
import signalisation from "./chapters/signalisation.js";
import circulation from "./chapters/circulation.js";
import usagers from "./chapters/usagers.js";
import accident from "./chapters/accident.js";
import infractions from "./chapters/infractions.js";

export const chapters = [
  conducteur,
  vehicule,
  signalisation,
  circulation,
  usagers,
  accident,
  infractions
];
