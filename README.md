# 🚘 Guide de la route – Examen SAAQ

Application web pour réviser l'examen théorique du permis de conduire classe 5 au Québec. Condensé interactif du *Guide de la route* SAAQ (4ᵉ édition, 2024) avec trois modes :

- **📖 Lecture** — 7 chapitres, 100+ sections repliables, avec recherche par chapitre. **97 panneaux SVG sur disque** (78 SAAQ officiels avec leur code P-010, D-040-1, T-070-1-50 ; 6 feux MUTCD ; 1 cône StVO ; 1 macle HOV ; 11 dispositifs MTQ Québec générés). Plus aucun rendu inline — tout passe par `<img src="signs/...svg">`.
- **📝 Quiz** — **550+ questions** à choix multiples auto-générées. Trois familles : (1) questions sur les **tableaux** du guide ; (2) **« Que signifie ce panneau ? »** — image du panneau → bonne signification ; (3) **« Quel panneau correspond à… ? »** — description → bonne image parmi 4 panneaux. Les distracteurs des questions visuelles sont choisis dans la **même catégorie** (un feu propose d'autres feux, un losange de danger d'autres dangers). Seuil de réussite 75 % (comme à la SAAQ). Meilleur score sauvegardé par chapitre. Mode « tous les chapitres mélangés » disponible.
- **📋 Examen blanc** — simulation au format SAAQ : **32 questions** de tous les chapitres, **chrono 30 min**, aucune correction pendant l'épreuve, verdict réussite/échec (seuil 75 %), pastilles de navigation, auto-soumission à la fin du temps. Historique des tentatives conservé.
- **🃏 Cartes (répétition espacée)** — 400 flashcards avec un algorithme de **Leitner** : les cartes ratées reviennent plus souvent, les cartes sues s'espacent (boîtes 1→5). Mode « Révision intelligente » qui ne montre que les cartes dues.
- **📊 Progrès** — tableau de bord : maîtrise par chapitre, série de jours (streak), historique d'examens, et **deck d'erreurs** qui collecte automatiquement les questions ratées (quiz + examen) pour révision ciblée.

**👥 Multi-utilisateur (profils locaux)** : plusieurs personnes peuvent partager le même appareil, chacune avec sa propre progression. Tout reste local (aucun compte, aucun serveur) — les données sont cloisonnées par profil dans le navigateur. **Export / import** de la progression en fichier `.json` depuis le menu de profil → sauvegarde et transfert entre appareils sans serveur.

Le contenu (116 sections sur 7 chapitres, 550+ questions, 400 cartes) a été vérifié page par page contre le PDF officiel du *Guide de la route* (4ᵉ édition). Recherche disponible **par chapitre ou dans tout le guide**. Navigation clavier du quiz (touches 1-4, Entrée) et `alt` descriptifs sur les panneaux pour l'accessibilité.

**Contenu couvert** : permis + classes (1 à 8), conditions de santé, équipement véhicule + autospection, **panneaux complets avec images** (prescription, danger, travaux, indication, zone scolaire), feux, marques chaussée, virages, cession de passage, dépassement, partage véhicules lourds + angles morts, cyclistes/motos/VHR, accident + premiers soins, amendes & points d'inaptitude.

100 % statique, 100 % hors-ligne après le premier chargement (PWA). Pas de backend, pas de tracking, aucune donnée envoyée à un serveur. Bundle final : **~237 kB JS (75 kB gzip)** + 15 kB CSS + ~420 kB de panneaux SVG (cachés par le service worker, donc téléchargés une seule fois).

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir <http://localhost:5173>.

## Build de production

```bash
npm run build
```

Sortie statique dans `dist/`. Aperçu local :

```bash
npm run preview
```

## Hébergement gratuit

Le dossier `dist/` est purement statique. Compatible :

- **GitHub Pages** — pousser `dist/` sur la branche `gh-pages`, ou utiliser une action.
- **Cloudflare Pages** — pointer sur le repo, build `npm run build`, output `dist`.
- **Netlify** — idem (build `npm run build`, publish `dist`).
- **Vercel** — autodétecte Vite, rien à configurer.
- **Surge / Render / un seau S3** — `dist/` peut être servi tel quel.

### Déploiement GitHub Pages (manuel)

```bash
npm run build
# si tu utilises gh-pages :
npx gh-pages -d dist
```

Si l'app est servie sous `https://user.github.io/repo/`, garde `base: "./"` (déjà configuré) — ça produit des URLs relatives qui marchent partout.

### Déploiement Cloudflare Pages / Netlify (depuis Git)

- Build command : `npm run build`
- Output directory : `dist`
- Node version : 18+

## Structure du projet

```
guide-route/
├── src/
│   ├── App.jsx                  # Layout + sélection de mode/chapitre
│   ├── main.jsx                 # Point d'entrée
│   ├── index.css                # Styles globaux + variables CSS (1 fichier)
│   ├── data/
│   │   ├── chapters.js          # Index — assemble les chapitres
│   │   └── chapters/            # Un fichier par chapitre (éditer ici)
│   │       ├── conducteur.js
│   │       ├── vehicule.js
│   │       ├── signalisation.js # Panneaux + tableaux (le plus gros)
│   │       ├── circulation.js
│   │       ├── usagers.js
│   │       ├── accident.js
│   │       └── infractions.js
│   ├── components/
│   │   ├── ReadView.jsx         # Mode lecture
│   │   ├── SectionCard.jsx
│   │   ├── ContentRenderer.jsx  # Rendu step/rule/alert/list/table/sign/signGrid/info/heading
│   │   ├── Sign.jsx             # Bibliothèque SVG de ~50 panneaux
│   │   ├── QuizView.jsx         # Mode quiz
│   │   ├── QuizQuestion.jsx
│   │   ├── QuizResults.jsx
│   │   └── FlashView.jsx        # Mode flashcards
│   └── lib/
│       ├── quiz.js              # Auto-génération des questions et cartes
│       └── storage.js           # Wrapper localStorage
├── public/                      # Icônes PWA
├── index.html
├── vite.config.js               # Vite + plugin PWA
└── package.json
```

## Types de contenu disponibles dans les sections

Quand tu édites `src/data/chapters/*.js`, chaque section a un tableau `content` qui mélange ces blocs :

| `type` | Rendu |
| --- | --- |
| `step` | Étape numérotée avec `label` + `detail` optionnel |
| `rule` | Règle avec puce ▸ |
| `alert` | Encadré orange ⚠ pour info importante |
| `info` | Encadré bleu ℹ pour mise en contexte |
| `heading` | Sous-titre dans une section |
| `list` | Liste à puces (`items: [...]`) |
| `table` | Tableau (`headers: [...], rows: [[...], ...]`) → **alimente le quiz** |
| `sign` | Un panneau SVG avec titre + texte (`sign: "arret"`, `props: {value: "50"}`) |
| `signGrid` | Grille de panneaux (`signs: [{sign, label, props?}, ...]`) |

Liste complète des `sign` disponibles : voir `SIGN_IDS` exporté par `src/components/Sign.jsx`.

## Comment fonctionnent les quiz auto-générés

`src/lib/quiz.js` génère les questions à partir des données, sans IA ni API (100 % déterministe).

**À partir des tableaux** (`type: "table"`), pour chaque ligne :

1. **Sens normal** — « \<colonne 0\> → \<en-tête colonne N\> ? » avec la valeur de la cellule comme réponse. Distracteurs : les autres valeurs de la même colonne.
2. **Sens inverse** — quand la colonne 0 est suffisamment courte pour être un libellé : « \<valeur\> — à quoi cela correspond-il ? » avec la colonne 0 comme réponse.

Si une colonne n'a pas assez de valeurs distinctes pour 3 distracteurs, on pioche dans les autres tableaux ayant le même en-tête.

**À partir des panneaux** (`type: "sign"` et `type: "signGrid"`), pour chaque panneau distinct montré dans la portée :

3. **Type A — image → sens** : « Que signifie ce panneau ? » + l'image, réponses textuelles.
4. **Type B — sens → image** : « Quel panneau correspond à … ? », réponses = 4 images de panneaux.

Les distracteurs sont d'abord choisis dans la **même catégorie** (`feu`, `danger`, `vitesse`, `interdiction`, `obligation`, `travaux`, `bus`, `macle`…) pour des choix réalistes, puis complétés globalement. Un panneau réutilisé dans plusieurs chapitres devient quizzable depuis chacun d'eux, sans doublon dans le mode « tous ».

Pour ajouter du contenu, modifie `src/data/chapters/*.js`. Tout nouveau tableau **et tout nouveau panneau** alimentent automatiquement le quiz. Toute nouvelle règle/alerte/étape alimente automatiquement les flashcards.

## Ajouter ou mettre à jour des panneaux

Les SVG vivent dans `public/signs/`. Deux scripts pour les remplir :

### 1. Panneaux disponibles sur Wikimedia Commons

```bash
# Éditer la table SIGNS de scripts/fetch-signs.mjs :
#   friendly_id: "P-010-fr.svg"           ← préfixe SAAQ par défaut
#   feuRouge:   "raw:Traffic_lights_red.svg" ← préfixer "raw:" pour un fichier hors SAAQ

node scripts/fetch-signs.mjs        # télécharge en série, polite User-Agent, retry exponentiel
npx svgo --multipass -r public/signs # optimise (gain ~70% sur les SVG Inkscape)
```

Le catalogue SAAQ complet est sur <https://commons.wikimedia.org/wiki/Category:Road_signs_in_Quebec> (~1 000 panneaux, fichiers `CA-QC_road_sign_*`).

### 2. Panneaux MTQ très spécifiques (introuvables sur Wikimedia)

Pour les éléments comme les feux de priorité pour autobus, macles, etc. :

```bash
# Éditer la map SIGNS dans scripts/generate-mtq-signs.mjs (template literal SVG)
node scripts/generate-mtq-signs.mjs
```

### 3. Référencer le nouveau panneau

Après l'une des deux étapes ci-dessus :

1. Ajouter le `friendly_id` à la `Set` `FILE_SIGNS` dans `src/components/Sign.jsx`.
2. Utiliser dans `src/data/chapters/...` :
   ```js
   { type: "sign", sign: "mon_id", title: "Nom", text: "Description" }
   ```
   ou en grille :
   ```js
   { type: "signGrid", signs: [
     { sign: "mon_id_1", label: "Étiquette 1" },
     { sign: "mon_id_2", label: "Étiquette 2" }
   ]}
   ```

## Avertissement

Ce condensé est destiné à la **révision** et ne remplace pas la consultation du Guide officiel ni des textes de loi en vigueur. Les amendes, points et seuils peuvent évoluer ; vérifier sur [saaq.gouv.qc.ca](https://saaq.gouv.qc.ca) avant toute prise de décision légale.

## Performance & passage à l'échelle

Conçu pour tenir une grosse audience sans coût serveur (100 % statique → servi par CDN) :

- **Code-splitting** : les modes Quiz et Flashcards sont chargés à la demande (`React.lazy`). Le premier affichage (Lecture) ne télécharge que l'app shell + les données.
- **Chunk vendor séparé** (`react`, `react-dom`) : une mise à jour du contenu n'invalide pas le cache du runtime React.
- **Cache long terme** : les assets hachés (`/assets/*`) sont `immutable, max-age=1 an` ; les panneaux SVG `max-age=7 j` ; le `sw.js` et l'`index.html` en `no-cache` pour que les mises à jour se propagent.
- **PWA hors-ligne** : après la 1ʳᵉ visite, tout (panneaux compris) est servi depuis le cache du service worker — 0 requête réseau.
- **Images** : `loading="lazy"` sur tous les panneaux ; SVG optimisés via SVGO.

Bundle initial (gzip) : `react` ~45 kB + app ~28 kB + CSS ~3 kB. Quiz/Flash ~2-3 kB chacun, à la demande.

## Sécurité

- **Content-Security-Policy** stricte : `default-src 'self'`, `script-src 'self'` (aucun script inline, aucun `eval`), `object-src 'none'`, `frame-ancestors 'none'`. Injectée en `<meta>` au build (repli GitHub Pages) **et** en en-tête HTTP (`public/_headers`, `vercel.json`).
- **En-têtes** : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (géoloc/caméra/micro/paiement désactivés), `Strict-Transport-Security` (HSTS preload), `Cross-Origin-Opener-Policy: same-origin`.
- **Aucune donnée ne quitte l'appareil** : pas de backend, pas d'analytics, pas de cookies. La seule persistance est `localStorage` (score, progression) — jamais transmis.
- Liens externes en `rel="noopener noreferrer"`. Pas de `dangerouslySetInnerHTML`. Entrée de recherche échappée par React (aucune injection possible).

Les configs d'hébergement (`netlify.toml`, `vercel.json`, `public/_headers`) appliquent automatiquement cache + sécurité sur Netlify, Vercel et Cloudflare Pages.

## Licence

- **Code** : MIT.
- **Panneaux SVG** (`public/signs/`, 97 fichiers) :
  - **Panneaux SAAQ** (`P-*`, `D-*`, `T-*`, `I-*`) : **domaine public**, déclarés non éligibles au copyright par Wikimedia Commons (« simple signs ineligible for copyright »). Source : <https://commons.wikimedia.org/wiki/Category:Road_signs_in_Quebec>.
  - **Feux pour piétons MUTCD** (`feuPietonMarche`, `feuPietonMain`, `feuPietonDecompte`) : **domaine public** (oeuvre du gouvernement fédéral américain, Manual on Uniform Traffic Control Devices, page I-1).
  - **Cône de signalisation** (`travauxCone`) : **domaine public** (Zeichen 610 du StVO allemand 1970, oeuvre officielle).
  - **Feux de circulation** (`feuRouge`, `feuJaune`, `feuVert`) : **CC BY-SA 2.5** — auteur Maix sur Wikimedia Commons. Attribution requise pour redistribution.
  - **Macle HOV** (`macleVecteur`, non utilisée actuellement) : **CC BY-SA 3.0** — auteur Mikayé.
  - **Panneaux MTQ générés** (feux d'utilisation de voie, feux de priorité bus, macles, route barrée générique) : domaine public (formes géométriques standardisées, code source du générateur sous MIT).
- **Texte** : reprend de manière synthétique et paraphrasée le *Guide de la route* de la SAAQ — propriété de la SAAQ. Usage éducatif personnel.
