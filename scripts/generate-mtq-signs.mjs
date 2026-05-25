// Génère les 11 panneaux MTQ pour lesquels Wikimedia Commons n'a pas d'équivalent
// (feux d'utilisation de voie, feux de priorité pour autobus, macles, route
// barrée générique). Ces SVG sont reconstruits d'après les normes MTQ
// (formes/couleurs standardisées, non protégeables par le droit d'auteur).

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "signs");

const SIGNS = {
  // ───── Feux d'utilisation de voie (au-dessus des voies sur autoroute) ─────
  feuXRouge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <rect x="4" y="4" width="72" height="72" fill="#000" stroke="#222" stroke-width="2"/>
  <path d="M20 20l40 40M60 20L20 60" stroke="#cc0000" stroke-width="9" stroke-linecap="round"/>
</svg>`,

  feuFlecheVerte: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <rect x="4" y="4" width="72" height="72" fill="#000" stroke="#222" stroke-width="2"/>
  <path d="M40 18v40m0 0L26 44m14 14l14-14" stroke="#2a9d4a" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  // ───── Feux de priorité pour autobus (cercles noirs avec marquages blancs) ─────
  busBandeVerticale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <rect x="36" y="14" width="8" height="52" fill="#fff"/>
</svg>`,

  busBandeHorizontale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <rect x="14" y="36" width="52" height="8" fill="#fff"/>
</svg>`,

  busBandeGauche: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <rect x="36" y="14" width="8" height="52" fill="#fff" transform="rotate(-45 40 40)"/>
</svg>`,

  busBandeDroite: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <rect x="36" y="14" width="8" height="52" fill="#fff" transform="rotate(45 40 40)"/>
</svg>`,

  busTriangle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <polygon points="40,18 62,58 18,58" fill="#fff"/>
</svg>`,

  busTexte: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="36" fill="#000"/>
  <text x="40" y="50" text-anchor="middle" font-size="20" font-weight="800" fill="#fff" font-family="Arial, sans-serif">BUS</text>
</svg>`,

  // ───── Macles (losanges des voies réservées sur la chaussée) ─────
  macleNoir: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="6" y="6" width="108" height="108" rx="4" fill="#000" stroke="#000" stroke-width="3"/>
  <polygon points="60,28 92,60 60,92 28,60" fill="none" stroke="#fff" stroke-width="6"/>
</svg>`,

  macleRouge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="6" y="6" width="108" height="108" rx="4" fill="#cc0000" stroke="#000" stroke-width="3"/>
  <polygon points="60,28 92,60 60,92 28,60" fill="none" stroke="#fff" stroke-width="6"/>
</svg>`,

  // ───── Route barrée générique (panneau orange, variantes nombreuses dans le PDF SAAQ) ─────
  travauxRouteBarree: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="6" y="6" width="108" height="108" rx="4" fill="#ff7a00" stroke="#000" stroke-width="3"/>
  <text x="60" y="56" text-anchor="middle" font-size="18" font-weight="800" font-family="Arial, sans-serif">ROUTE</text>
  <text x="60" y="80" text-anchor="middle" font-size="18" font-weight="800" font-family="Arial, sans-serif">BARRÉE</text>
</svg>`
};

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let wrote = 0;
  for (const [id, content] of Object.entries(SIGNS)) {
    const out = path.join(OUT_DIR, `${id}.svg`);
    fs.writeFileSync(out, content);
    console.log(`  ✓ ${id}.svg (${content.length} octets)`);
    wrote++;
  }
  // Mettre à jour _index.json
  const indexPath = path.join(OUT_DIR, "_index.json");
  let index = [];
  if (fs.existsSync(indexPath)) index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  for (const id of Object.keys(SIGNS)) if (!index.includes(id)) index.push(id);
  index.sort();
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`\n${wrote} panneaux MTQ générés. Index : ${index.length} panneaux au total.`);
}

main();
