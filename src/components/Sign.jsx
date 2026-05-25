// Bibliothèque de panneaux de signalisation routière du Québec.
// Tous les panneaux sont des fichiers SVG dans /public/signs/.
//
// Sources :
//   • Panneaux SAAQ officiels (préfixe P/D/T/I) → Wikimedia Commons, domaine public
//     ("simple signs ineligible for copyright"). Voir scripts/fetch-signs.mjs.
//   • Feux de circulation/piétons → Wikimedia Commons (MUTCD : domaine public ;
//     Traffic_lights_*.svg : CC-BY-SA 2.5).
//   • Cône de signalisation → Zeichen 610 (StVO 1970), domaine public.
//   • Macle (HOV diamond) → Wikimedia Commons, CC-BY-SA 3.0.
//   • Feux MTQ spécifiques (feux d'utilisation de voie, feux de priorité bus,
//     macles, route barrée générique) → générés par scripts/generate-mtq-signs.mjs
//     (formes/couleurs standardisées, non protégeables).
//
// La liste FILE_SIGNS est synchronisée avec public/signs/_index.json.

const FILE_SIGNS = new Set([
  "accesInterditAutos", "accesInterditCamions", "accesInterditMotos",
  "accesInterditPietons", "accesInterditVelos",
  "aeroport", "arret", "arretInterdit", "autoroute",
  "busBandeDroite", "busBandeGauche", "busBandeHorizontale", "busBandeVerticale",
  "busTexte", "busTriangle",
  "cedezGiratoire", "cedezPassage", "ceintureObligatoire", "chevronAlignement",
  "dangerAnimaux", "dangerArretAvance", "dangerCedezAvance", "dangerCerf",
  "dangerChausseeCahoteuse", "dangerChausseeGlissante", "dangerChausseeInondee",
  "dangerChausseeRetrecie", "dangerChausseeSeparee", "dangerChuteRoches",
  "dangerCourbesGD", "dangerCourbesMultiples", "dangerDemiTour",
  "dangerFeux", "dangerGiratoire",
  "dangerIntersection", "dangerIntersectionT", "dangerIntersectionY",
  "dangerOrignal", "dangerPassageEcoliers", "dangerPassageNiveau",
  "dangerPassagePietons", "dangerPenteRaide", "dangerPerteVoie",
  "dangerVirageDroite", "dangerVirageGauche", "dangerVirageProGauche",
  "entreeInterdite", "fauteuilRoulant",
  "feuFlecheVerte", "feuJaune", "feuPietonDecompte", "feuPietonMain",
  "feuPietonMarche", "feuRouge", "feuVert", "feuXRouge",
  "hopital",
  "interdictionDemiTour", "interdictionDepasser",
  "interdictionDroite", "interdictionGauche",
  "limiteVitesseMin_60", "limiteVitesse_100", "limiteVitesse_30",
  "limiteVitesse_40", "limiteVitesse_50", "limiteVitesse_70",
  "macleNoir", "macleRouge",
  "obligationDroite", "obligationGauche", "obligationToutDroit",
  "policiers", "routeNumerotee",
  "sensUnique", "sensUnique2", "sortieAutoroute",
  "stationnementInterdit", "stationnementP",
  "travauxArpenteurs", "travauxCone", "travauxDetour",
  "travauxFlecheDroite", "travauxFlecheGauche",
  "travauxLimiteVitesse_50", "travauxLimiteVitesse_70",
  "travauxMecanises", "travauxRouteBarree", "travauxSignaleur", "travauxTravailleur",
  "vitesseRecommandee_30", "vitesseRecommandee_40", "vitesseRecommandee_50",
  "voieReserveeBus", "zoneScolaire", "zoneScolaireDebut"
]);

export default function Sign({ id, size = 80, label }) {
  if (!FILE_SIGNS.has(id)) {
    return <span title={`Sign manquant: ${id}`} style={{ color: "#cc0000" }}>⚠ {id}</span>;
  }
  // alt décrit le panneau pour les lecteurs d'écran. Vide si purement décoratif
  // (label === ""), ce qui évite la redondance quand le texte est déjà à côté.
  const alt = label === undefined ? `Panneau : ${id}` : label;
  return (
    <span
      className="sign"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        verticalAlign: "middle"
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}signs/${id}.svg`}
        alt={alt}
        loading="lazy"
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </span>
  );
}

export const SIGN_IDS = [...FILE_SIGNS].sort();
