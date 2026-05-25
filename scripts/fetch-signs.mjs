// Télécharge les SVGs de panneaux SAAQ depuis Wikimedia Commons (domaine public).
// Source : https://commons.wikimedia.org/wiki/Category:Road_signs_in_Quebec
// Usage : node scripts/fetch-signs.mjs

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "signs");

// Mapping friendly_id → nom du fichier Wikimedia.
// Par défaut on préfixe "CA-QC_road_sign_" (codes SAAQ officiels P/D/T/I).
// Pour un fichier qui n'est pas un panneau SAAQ, préfixer la valeur par "raw:"
// pour utiliser le nom de fichier tel quel.
const SIGNS = {
  // ───── Prescription (priorité, sens) ─────
  arret: "P-010-fr.svg",
  cedezPassage: "P-020-1.svg",
  cedezGiratoire: "P-020-2.svg",
  entreeInterdite: "P-030.svg",
  sensUnique: "P-040-1.svg",
  sensUnique2: "P-040-2.svg",

  // ───── Prescription (vitesse) ─────
  limiteVitesse_30: "P-070-2-30.svg",
  limiteVitesse_40: "P-070-2-40.svg",
  limiteVitesse_50: "P-070-2-50.svg",
  limiteVitesse_70: "P-070-4-40.svg", // utilisé comme placeholder, on cherchera 70
  limiteVitesse_100: "P-070-2-100.svg",
  limiteVitesseMin_60: "P-070-1-60.svg",

  // ───── Prescription (obligation directionnelle) ─────
  obligationDroite: "P-060-D.svg",
  obligationGauche: "P-060-G.svg",
  obligationToutDroit: "P-090-G.svg", // P-090 variantes incluent tout droit

  // ───── Prescription (interdictions virages / dépassement) ─────
  interdictionGauche: "P-100-2-G.svg",
  interdictionDroite: "P-100-2-D.svg",
  interdictionDemiTour: "P-100-5.svg",
  interdictionDepasser: "P-110-1.svg",

  // ───── Prescription (stationnement) ─────
  stationnementInterdit: "P-120-1.svg",
  arretInterdit: "P-130-1.svg",

  // ───── Prescription (voies réservées) ─────
  voieReserveeBusTaxi: "P-150-2.svg",
  voieReserveeBus: "P-150-1.svg",

  // ───── Prescription (accès interdit par type d'usager) ─────
  accesInterditAutos: "P-110-2-G.svg", // ces codes peuvent varier
  accesInterditCamions: "P-110-3-G.svg",
  accesInterditVelos: "P-110-4.svg",
  accesInterditPietons: "P-110-5.svg",
  accesInterditMotos: "P-110-6.svg",

  // ───── Danger (signaux avancés) ─────
  dangerArretAvance: "D-010-1-fr.svg",
  dangerCedezAvance: "D-020.svg",
  dangerFeux: "D-030.svg",

  // ───── Danger (géométrie) ─────
  dangerVirageGauche: "D-040-1-FR.svg",
  dangerVirageDroite: "D-040-2-FR.svg",
  dangerVirageProGauche: "D-040-3-FR.svg",
  dangerCourbesGD: "D-040-5-FR.svg",
  dangerCourbesMultiples: "D-040-6.svg",
  dangerDemiTour: "D-040-7.svg",

  // ───── Danger (pente, vitesse recommandée) ─────
  dangerPenteRaide: "D-080-1.svg",
  vitesseRecommandee_30: "D-070-30.svg",
  vitesseRecommandee_40: "D-070-40.svg",
  vitesseRecommandee_50: "D-070-50.svg",

  // ───── Danger (intersection / carrefour) ─────
  dangerIntersection: "D-100-2-D.svg",
  dangerIntersectionT: "D-100-5.svg",
  dangerIntersectionY: "D-100-8-A.svg",
  dangerGiratoire: "D-130-2.svg",

  // ───── Danger (chaussée) ─────
  dangerChausseeRetrecie: "D-150-G.svg",
  dangerChausseeSeparee: "D-140-1-G.svg",
  dangerPerteVoie: "D-160-D.svg",

  // ───── Danger (passages) ─────
  dangerPassagePietons: "D-270-1-D.svg",
  dangerPassageEcoliers: "D-270-2-D.svg",
  dangerPassageNiveau: "D-200.svg",

  // ───── Danger (animaux et obstacles) ─────
  dangerAnimaux: "D-270-13.svg",
  dangerOrignal: "D-270-12.svg",
  dangerCerf: "D-270-13.svg",
  dangerChausseeCahoteuse: "D-270-17.svg",
  dangerChausseeGlissante: "D-270-18.svg",
  dangerChausseeInondee: "D-270-21.svg",
  dangerChuteRoches: "D-340-1.svg",

  // ───── Travaux ─────
  travauxTravailleur: "T-050-1.svg",
  travauxArpenteurs: "T-050-2.svg",
  travauxMecanises: "T-050-10.svg",
  travauxSignaleur: "T-100-1-D.svg",
  travauxLimiteVitesse_50: "T-070-1-50.svg",
  travauxLimiteVitesse_70: "T-070-1-70.svg",
  travauxFlecheGauche: "T-140-G.svg",
  travauxFlecheDroite: "T-140-D.svg",
  travauxDetour: "T-130.svg",

  // ───── Zone scolaire (pentagone) ─────
  zoneScolaire: "D-270-3-D.svg",
  zoneScolaireDebut: "D-270-5-D.svg",

  // ───── Indication ─────
  hopital: "I-415-2.svg",
  stationnementP: "I-415-1.svg",
  policiers: "I-413-1.svg",
  aeroport: "I-422-1.svg",

  // ───── Routes / autoroute ─────
  autoroute: "I-185-1-A.svg",
  routeNumerotee: "I-260-1-G.svg",

  // ───── Compléments (remplacent les fallbacks inline quand SAAQ existe) ─────
  chevronAlignement: "D-280.svg",
  ceintureObligatoire: "P-200-1.svg",
  fauteuilRoulant: "I-340.svg",
  sortieAutoroute: "I-150-1.svg",

  // ───── Hors SAAQ : feux de circulation (CC-BY-SA 2.5, attribution README) ─────
  feuRouge: "raw:Traffic_lights_red.svg",
  feuJaune: "raw:Traffic_lights_yellow.svg",
  feuVert: "raw:Traffic_lights_green.svg",

  // ───── Hors SAAQ : feux piétons MUTCD (domaine public, US federal) ─────
  feuPietonMarche: "raw:MUTCD_Ped_Signal_-_Walk.svg",
  feuPietonMain: "raw:MUTCD_Ped_Signal_-_Steady_hand.svg",
  feuPietonDecompte: "raw:MUTCD_Ped_Signal_-_Hand_with_timer.svg",

  // ───── Hors SAAQ : cône (StVO 1970 allemand, domaine public) ─────
  travauxCone: "raw:Zeichen_610_-_Leitkegel,_StVO_1970.svg",

  // ───── Hors SAAQ : macle (HOV diamond, CC-BY-SA 3.0) ─────
  macleVecteur: "raw:HOV_Diamond_vector.svg"
};

const PREFIX = "https://upload.wikimedia.org/wikipedia/commons/";
const META_URL = "https://commons.wikimedia.org/w/api.php";

function ensureDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const UA = "guide-route-saaq/1.0 (educational; https://github.com/example/guide-route)";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function get(url, attempt = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": UA, "Accept-Encoding": "identity" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return get(res.headers.location, attempt).then(resolve).catch(reject);
      }
      if (res.statusCode === 429 || res.statusCode === 503) {
        if (attempt >= 5) return reject(new Error(`HTTP ${res.statusCode} after ${attempt + 1} attempts for ${url}`));
        const wait = Math.min(30000, 1500 * Math.pow(2, attempt));
        return sleep(wait).then(() => get(url, attempt + 1)).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function resolveImageUrl(spec) {
  const fullName = spec.startsWith("raw:") ? spec.slice(4) : ("CA-QC_road_sign_" + spec);
  const url = `${META_URL}?action=query&format=json&titles=File:${encodeURIComponent(fullName)}&prop=imageinfo&iiprop=url`;
  const data = JSON.parse((await get(url)).toString("utf8"));
  const pages = data?.query?.pages || {};
  const page = Object.values(pages)[0];
  if (page?.missing !== undefined) return null;
  return page?.imageinfo?.[0]?.url || null;
}

async function fetchOne(id, wmName) {
  const out = path.join(OUT_DIR, `${id}.svg`);
  if (fs.existsSync(out)) {
    return { id, status: "skip (already on disk)" };
  }
  const url = await resolveImageUrl(wmName);
  if (!url) return { id, status: `MISSING (${wmName})` };
  try {
    const buf = await get(url);
    fs.writeFileSync(out, buf);
    return { id, status: `ok ${(buf.length / 1024).toFixed(1)} KB`, wmName };
  } catch (e) {
    return { id, status: `ERROR ${e.message}` };
  }
}

async function main() {
  ensureDir();
  const ids = Object.keys(SIGNS);
  console.log(`Téléchargement de ${ids.length} panneaux SAAQ vers public/signs/...\n`);

  const results = [];
  // En série + petite pause : politique « polite » Wikimedia
  for (const id of ids) {
    const r = await fetchOne(id, SIGNS[id]);
    const tag = r.status.startsWith("ok") ? "✓" : r.status.startsWith("skip") ? "·" : "✗";
    console.log(`  ${tag} ${r.id.padEnd(30)} ${r.status}`);
    results.push(r);
    if (!r.status.startsWith("skip")) await sleep(250);
  }

  const ok = results.filter((r) => r.status.startsWith("ok")).length;
  const skipped = results.filter((r) => r.status.startsWith("skip")).length;
  const missing = results.filter((r) => r.status.startsWith("MISSING")).length;
  const errors = results.filter((r) => r.status.startsWith("ERROR")).length;
  console.log(`\nRésultat : ${ok} téléchargés, ${skipped} déjà présents, ${missing} introuvables, ${errors} erreurs.`);
  if (ok > 0) {
    console.log("\nN'oublie pas d'optimiser les SVGs : npx svgo --multipass -r public/signs");
  }

  // écrire l'index des panneaux disponibles
  const available = results.filter((r) => !r.status.startsWith("MISSING") && !r.status.startsWith("ERROR")).map((r) => r.id);
  const indexPath = path.join(OUT_DIR, "_index.json");
  fs.writeFileSync(indexPath, JSON.stringify(available.sort(), null, 2));
  console.log(`Index écrit : public/signs/_index.json (${available.length} panneaux)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
