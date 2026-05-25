// Chapitre 3 — La Signalisation routière (complet, avec panneaux SVG officiels SAAQ)
// Les fichiers SVG proviennent de Wikimedia Commons (domaine public) — voir scripts/fetch-signs.mjs
export default {
  id: "3",
  title: "La Signalisation",
  emoji: "🚦",
  color: "#7b1fa2",
  accent: "#9c27b0",
  sections: [
    // ────────────── FEUX DE CIRCULATION ──────────────
    {
      title: "Feux de circulation – Signification complète",
      content: [
        { type: "heading", text: "Feux fixes" },
        { type: "signGrid", signs: [
          { sign: "feuRouge", label: "Rouge fixe — Arrêt obligatoire avant la ligne / le passage piéton" },
          { sign: "feuJaune", label: "Jaune fixe — S'arrêter, sauf si déjà engagé ou trop près pour s'arrêter sans danger" },
          { sign: "feuVert", label: "Vert fixe — Avancer après avoir cédé le passage aux usagers déjà engagés" }
        ]},
        { type: "heading", text: "Feux clignotants et flèches" },
        { type: "table", headers: ["Feu", "Signification"], rows: [
          ["Vert clignotant", "Virage à gauche PROTÉGÉ (véhicules en sens inverse sont immobilisés)"],
          ["Rouge clignotant", "Arrêt complet + céder le passage (= panneau ARRÊT)"],
          ["Jaune clignotant", "Ralentir + céder le passage aux usagers déjà engagés"],
          ["Flèche rouge", "Interdit de circuler dans le sens indiqué"],
          ["Flèche jaune", "Même règle que feu jaune, dans le sens indiqué"],
          ["Flèche verte", "Circuler dans le sens indiqué en respectant les priorités du feu vert"],
          ["Feu défectueux / éteint", "Se comporter comme s'il y a des panneaux ARRÊT dans TOUTES les directions"]
        ]}
      ]
    },
    {
      title: "Feux pour piétons",
      content: [
        { type: "signGrid", signs: [
          { sign: "feuPietonMarche", label: "Silhouette blanche en marche — Traverser (presser le pas si elle clignote)" },
          { sign: "feuPietonMain", label: "Main orange fixe — Ne pas s'engager. Clignotante : finir si déjà engagé" },
          { sign: "feuPietonDecompte", label: "Main + décompte numérique — Temps restant pour traverser" }
        ]}
      ]
    },
    {
      title: "Feux d'utilisation de voie",
      content: [
        { type: "signGrid", signs: [
          { sign: "feuXRouge", label: "X rouge — Voie interdite à la circulation et à l'arrêt" },
          { sign: "feuFlecheVerte", label: "Flèche verte ↓ — Voie ouverte, circuler" },
          { sign: "feuJaune", label: "Flèche jaune horizontale clignotante — Voie fermée plus loin, changer de voie avec prudence" }
        ]}
      ]
    },
    {
      title: "Feux de priorité pour autobus",
      content: [
        { type: "signGrid", signs: [
          { sign: "busBandeVerticale", label: "Bande blanche verticale — Avancée en ligne droite seulement" },
          { sign: "busBandeHorizontale", label: "Bande blanche horizontale — Toutes manœuvres prioritaires interdites" },
          { sign: "busBandeGauche", label: "Bande inclinée à gauche — Virage à gauche seulement" },
          { sign: "busBandeDroite", label: "Bande inclinée à droite — Virage à droite seulement" },
          { sign: "busTriangle", label: "Triangle blanc — Intervalle de dégagement (comme feu jaune)" },
          { sign: "busTexte", label: "BUS blanc — Toutes directions permises" }
        ]}
      ]
    },

    // ────────────── MARQUES SUR LA CHAUSSÉE ──────────────
    {
      title: "Marques sur la chaussée – Couleurs",
      content: [
        { type: "table", headers: ["Couleur", "Fonction"], rows: [
          ["Jaune", "Sépare voies à SENS INVERSE, délimite rive gauche, stationnement interdit, voies alternées, passages piétons hors intersection"],
          ["Blanc", "Sépare voies à MÊME SENS, rive droite, stationnement permis, ligne d'arrêt, passages piétons aux intersections avec feux ou panneaux"]
        ]}
      ]
    },
    {
      title: "Lignes sur la chaussée – Franchissement",
      content: [
        { type: "table", headers: ["Ligne", "Franchissement"], rows: [
          ["Discontinue (pointillée)", "Permis avec prudence"],
          ["Mixte (continue + discontinue)", "Permis SEULEMENT si la ligne discontinue est DE TON CÔTÉ"],
          ["Simple continue", "Interdit, SAUF : voie obstruée/fermée, virage gauche vers un autre chemin, dépasser machine agricole/bicyclette/véhicule lent"],
          ["Double continue jaune", "Absolument interdit dans tous les cas"]
        ]},
        { type: "heading", text: "Autres lignes notables" },
        { type: "rule", text: "Ligne d'arrêt blanche perpendiculaire : limite où s'arrêter (avant le passage piéton)." },
        { type: "rule", text: "Voie réservée — lignes doubles continues : voie en permanence. Lignes doubles discontinues : voie à certaines heures." },
        { type: "rule", text: "Voie centrale à virage gauche (3 ou 5 voies) : 2 lignes jaunes (une continue + une discontinue) de chaque côté." },
        { type: "rule", text: "Bordures jaunes en zigzag à un arrêt d'autobus : interdiction d'arrêter ou de stationner." }
      ]
    },
    {
      title: "Flèches et symboles sur la chaussée",
      content: [
        { type: "signGrid", signs: [
          { sign: "macleNoir", label: "Macle noire — sens de la circulation (voie réservée)" },
          { sign: "macleRouge", label: "Macle rouge — voie à contresens ou alternance" }
        ]},
        { type: "rule", text: "Flèches blanches sur la chaussée : direction obligatoire de la voie." },
        { type: "rule", text: "Macle (losange allongé) : voie réservée à certaines catégories." },
        { type: "rule", text: "Bicyclette peinte : aménagement cyclable (bande, piste, chaussée désignée, sas vélo)." },
        { type: "rule", text: "Symbole de fauteuil roulant : stationnement / rampe d'accès pour personnes handicapées." }
      ]
    },

    // ────────────── PANNEAUX – CATÉGORIES & COULEURS ──────────────
    {
      title: "Panneaux – Formes et couleurs clés",
      content: [
        { type: "info", text: "Le message d'un panneau se décode par sa forme, sa couleur, son texte ou son symbole. Mémoriser ce code visuel = la moitié du travail." },
        { type: "table", headers: ["Couleur / Forme", "Catégorie"], rows: [
          ["Blanc et noir", "Prescription (obligations / interdictions)"],
          ["Jaune / losange", "Danger"],
          ["Orange / losange ou carré", "Travaux"],
          ["Vert", "Indication – routes, directions, services"],
          ["Bleu", "Indication – services, équipements touristiques"],
          ["Brun", "Indication – attraits touristiques publics"],
          ["Octogone rouge", "ARRÊT uniquement"],
          ["Triangle rouge et blanc inversé", "Cédez le passage uniquement"],
          ["Pentagone jaune-vert", "Zone scolaire uniquement"],
          ["Cercle rouge barré", "Interdiction"],
          ["Cercle vert", "Obligation"]
        ]}
      ]
    },

    // ────────────── PANNEAUX DE PRESCRIPTION ──────────────
    {
      title: "Panneaux de prescription – Priorité & sens",
      content: [
        { type: "sign", sign: "arret", title: "Arrêt (P-010)", text: "Arrêt complet obligatoire avant la ligne d'arrêt ou le passage piéton. ARRÊT TOUTES DIRECTIONS = tous les usagers s'arrêtent et le premier arrivé passe." },
        { type: "sign", sign: "cedezPassage", title: "Cédez le passage (P-020-1)", text: "Céder le passage aux véhicules qui circulent déjà sur la route prioritaire. S'arrêter SEULEMENT si nécessaire." },
        { type: "sign", sign: "cedezGiratoire", title: "Cédez le passage – Carrefour giratoire (P-020-2)", text: "Céder le passage aux véhicules déjà dans l'anneau avant de s'y engager." },
        { type: "sign", sign: "entreeInterdite", title: "Entrée interdite (P-030)", text: "Interdit à toutes les catégories de véhicules. Empêche les contresens sur une voie à sens unique." },
        { type: "sign", sign: "sensUnique", title: "Sens unique (P-040-1)", text: "Obligation de circuler dans le sens de la flèche." }
      ]
    },
    {
      title: "Panneaux de prescription – Vitesse",
      content: [
        { type: "info", text: "Une limite de vitesse légale se termine TOUJOURS par 0 (50, 70, 90, 100). Une vitesse recommandée est un panneau jaune (danger), pas une obligation." },
        { type: "signGrid", signs: [
          { sign: "limiteVitesse_30", label: "Maximum 30 km/h" },
          { sign: "limiteVitesse_40", label: "Maximum 40 km/h" },
          { sign: "limiteVitesse_50", label: "Maximum 50 km/h (ville)" },
          { sign: "limiteVitesse_70", label: "Maximum 70 km/h" },
          { sign: "limiteVitesse_100", label: "Maximum 100 km/h (autoroute)" },
          { sign: "limiteVitesseMin_60", label: "Minimum 60 km/h (autoroute)" }
        ]}
      ]
    },
    {
      title: "Panneaux de prescription – Obligations directionnelles",
      content: [
        { type: "info", text: "Carré blanc à symbole noir = obligation. Le conducteur DOIT effectuer la manœuvre indiquée." },
        { type: "signGrid", signs: [
          { sign: "obligationToutDroit", label: "Aller tout droit" },
          { sign: "obligationGauche", label: "Tourner à gauche" },
          { sign: "obligationDroite", label: "Tourner à droite" }
        ]}
      ]
    },
    {
      title: "Panneaux de prescription – Interdictions",
      content: [
        { type: "info", text: "Cercle rouge barré = interdiction. Le pictogramme indique ce qui est interdit." },
        { type: "signGrid", signs: [
          { sign: "interdictionGauche", label: "Virage à gauche interdit" },
          { sign: "interdictionDroite", label: "Virage à droite interdit" },
          { sign: "interdictionDemiTour", label: "Demi-tour interdit" },
          { sign: "interdictionDepasser", label: "Dépassement interdit" },
          { sign: "accesInterditAutos", label: "Accès interdit aux automobiles" },
          { sign: "accesInterditCamions", label: "Accès interdit aux camions" },
          { sign: "accesInterditVelos", label: "Accès interdit aux bicyclettes" },
          { sign: "accesInterditMotos", label: "Accès interdit aux motocyclettes" },
          { sign: "accesInterditPietons", label: "Accès interdit aux piétons" }
        ]}
      ]
    },
    {
      title: "Panneaux de prescription – Stationnement",
      content: [
        { type: "signGrid", signs: [
          { sign: "stationnementInterdit", label: "Stationnement interdit (P rouge barré)" },
          { sign: "arretInterdit", label: "Arrêt interdit (A rouge barré) — encore plus restrictif" }
        ]},
        { type: "rule", text: "Flèche sous le panneau : indique la zone touchée. ↔ = de part et d'autre du panneau. → / ← : un seul côté." },
        { type: "rule", text: "Heures (Xh - Yh) : restriction valide uniquement pendant ces heures." },
        { type: "rule", text: "Stationnement réservé personnes handicapées : vignette obligatoire, sinon amende ~150$ + remorquage possible." }
      ]
    },
    {
      title: "Panneaux de prescription – Obligations diverses",
      content: [
        { type: "signGrid", signs: [
          { sign: "ceintureObligatoire", label: "Port de la ceinture obligatoire" },
          { sign: "voieReserveeBus", label: "Voie réservée (bus, taxi, covoiturage)" },
          { sign: "fauteuilRoulant", label: "Réservé aux personnes à mobilité réduite" }
        ]},
        { type: "rule", text: "Voie réservée covoiturage : le chiffre dans la macle = nombre minimum d'occupants requis." }
      ]
    },

    // ────────────── PANNEAUX DE DANGER ──────────────
    {
      title: "Panneaux de danger – Vue d'ensemble",
      content: [
        { type: "info", text: "Losange jaune = danger. Selon le pictogramme, le conducteur doit : changer de voie, immobiliser, réduire la vitesse, ou être plus alerte." }
      ]
    },
    {
      title: "Panneaux de danger – Signaux avancés",
      content: [
        { type: "sign", sign: "dangerArretAvance", title: "Signal avancé d'arrêt (D-010)", text: "Un panneau ARRÊT se trouve devant. Se préparer à immobiliser le véhicule." },
        { type: "sign", sign: "dangerCedezAvance", title: "Signal avancé de cédez le passage (D-020)", text: "Un Cédez le passage se trouve devant. Anticiper et ralentir." },
        { type: "sign", sign: "dangerFeux", title: "Signal avancé de feux (D-030)", text: "Feux de circulation devant. Pertinent quand la visibilité ou la configuration de la route ne permet pas de les voir à temps." }
      ]
    },
    {
      title: "Panneaux de danger – Géométrie de la route",
      content: [
        { type: "signGrid", signs: [
          { sign: "dangerVirageGauche", label: "Virage à gauche" },
          { sign: "dangerVirageDroite", label: "Virage à droite" },
          { sign: "dangerVirageProGauche", label: "Virage prononcé à gauche" },
          { sign: "dangerCourbesGD", label: "Courbes successives" },
          { sign: "dangerCourbesMultiples", label: "Plusieurs courbes" },
          { sign: "dangerDemiTour", label: "Virage en épingle (demi-tour)" },
          { sign: "dangerIntersection", label: "Intersection en croix" },
          { sign: "dangerIntersectionT", label: "Intersection en T" },
          { sign: "dangerIntersectionY", label: "Bifurcation en Y" },
          { sign: "dangerGiratoire", label: "Carrefour giratoire" },
          { sign: "dangerChausseeRetrecie", label: "Chaussée rétrécie" },
          { sign: "dangerChausseeSeparee", label: "Chaussée séparée" },
          { sign: "dangerPerteVoie", label: "Perte de voie" },
          { sign: "dangerPenteRaide", label: "Pente raide" }
        ]}
      ]
    },
    {
      title: "Panneaux de danger – Vitesse recommandée (jaunes ≠ obligatoires)",
      content: [
        { type: "info", text: "Les panneaux jaunes de vitesse sont des recommandations dans une courbe ou un point dangereux, pas une limite légale. Mais aller plus vite est imprudent et constatable." },
        { type: "signGrid", signs: [
          { sign: "vitesseRecommandee_30", label: "Vitesse recommandée 30 km/h" },
          { sign: "vitesseRecommandee_40", label: "Vitesse recommandée 40 km/h" },
          { sign: "vitesseRecommandee_50", label: "Vitesse recommandée 50 km/h" }
        ]}
      ]
    },
    {
      title: "Panneaux de danger – Usagers et passages",
      content: [
        { type: "signGrid", signs: [
          { sign: "dangerPassagePietons", label: "Passage pour piétons" },
          { sign: "dangerPassageEcoliers", label: "Passage pour écoliers" },
          { sign: "dangerPassageNiveau", label: "Passage à niveau" }
        ]}
      ]
    },
    {
      title: "Panneaux de danger – Chaussée et environnement",
      content: [
        { type: "signGrid", signs: [
          { sign: "dangerChausseeGlissante", label: "Chaussée glissante" },
          { sign: "dangerChausseeInondee", label: "Chaussée inondée" },
          { sign: "dangerChausseeCahoteuse", label: "Chaussée cahoteuse" },
          { sign: "dangerChuteRoches", label: "Risque de chute de pierres" },
          { sign: "dangerAnimaux", label: "Présence d'animaux sauvages" },
          { sign: "dangerOrignal", label: "Présence d'orignaux" },
          { sign: "dangerCerf", label: "Présence de cerfs" }
        ]}
      ]
    },
    {
      title: "Panneaux de danger – Délinéateurs et chevrons",
      content: [
        { type: "sign", sign: "chevronAlignement", title: "Chevron d'alignement", text: "Indique un virage prononcé. Plus il y en a en série, plus la courbe est serrée. Placé du côté extérieur de la courbe." },
        { type: "rule", text: "Délinéateur jaune = à gauche, blanc = à droite (sens de la circulation)." },
        { type: "rule", text: "Balise de danger à bandes jaunes et noires : indique un obstacle à contourner du côté que les bandes indiquent (pointent vers le côté à éviter)." }
      ]
    },

    // ────────────── ZONE SCOLAIRE ──────────────
    {
      title: "Zone scolaire (pentagone jaune-vert)",
      content: [
        { type: "sign", sign: "zoneScolaireDebut", title: "Début d'une zone scolaire (I-020)", text: "Limite de vitesse de 50 km/h ou moins, lundi-vendredi, septembre à juin, entre 7h et 17h (ou heures précisées par panonceau)." },
        { type: "sign", sign: "zoneScolaire", title: "Signal avancé de passage écoliers", text: "Annonce un passage scolaire ou un terrain de jeu. Prudence maximale." },
        { type: "alert", text: "Excès de vitesse en zone scolaire : amende doublée." }
      ]
    },

    // ────────────── PANNEAUX DE TRAVAUX ──────────────
    {
      title: "Panneaux de travaux (orange) – Présence et signaleurs",
      content: [
        { type: "info", text: "Tout panneau orange concerne les travaux. Amende doublée pour excès de vitesse dans une zone de travaux signalisée." },
        { type: "signGrid", signs: [
          { sign: "travauxTravailleur", label: "Présence de travailleurs" },
          { sign: "travauxArpenteurs", label: "Travaux d'arpentage" },
          { sign: "travauxMecanises", label: "Travaux mécanisés" },
          { sign: "travauxSignaleur", label: "Signaleur sur la route" },
          { sign: "travauxCone", label: "Cône de signalisation" }
        ]},
        { type: "rule", text: "Le panneau du signaleur a force de loi : ses ordres priment sur tous les autres signaux." }
      ]
    },
    {
      title: "Panneaux de travaux – Vitesse et déviation",
      content: [
        { type: "signGrid", signs: [
          { sign: "travauxLimiteVitesse_50", label: "Limite de vitesse 50 km/h en zone de travaux (obligatoire)" },
          { sign: "travauxLimiteVitesse_70", label: "Limite de vitesse 70 km/h en zone de travaux" },
          { sign: "travauxFlecheGauche", label: "Flèche oblique vers la gauche — changer de voie" },
          { sign: "travauxFlecheDroite", label: "Flèche oblique vers la droite — changer de voie" },
          { sign: "travauxRouteBarree", label: "Route barrée" },
          { sign: "travauxDetour", label: "Détour" }
        ]}
      ]
    },

    // ────────────── PANNEAUX D'INDICATION ──────────────
    {
      title: "Panneaux d'indication – Identification des routes",
      content: [
        { type: "signGrid", signs: [
          { sign: "autoroute", label: "Autoroute (écusson bleu)" },
          { sign: "routeNumerotee", label: "Route numérotée (écusson vert)" }
        ]}
      ]
    },
    {
      title: "Panneaux d'indication – Services et destination",
      content: [
        { type: "signGrid", signs: [
          { sign: "sortieAutoroute", label: "Sortie d'autoroute (rectangle vert)", props: { number: "138" } },
          { sign: "hopital", label: "Hôpital (H sur fond bleu)" },
          { sign: "stationnementP", label: "Stationnement disponible" },
          { sign: "policiers", label: "Poste de police" },
          { sign: "aeroport", label: "Aéroport" }
        ]},
        { type: "rule", text: "Vert : autoroutes et routes. Bleu : services et équipements. Brun : attraits touristiques. Rouge : équipement d'urgence." }
      ]
    },

    // ────────────── VOIES CYCLABLES ──────────────
    {
      title: "Signalisation des voies cyclables",
      content: [
        { type: "info", text: "Comme la signalisation routière, celle des voies cyclables se répartit en 4 catégories : prescription, danger, travaux, indication." },
        { type: "heading", text: "Les 4 types d'aménagements cyclables" },
        { type: "table", headers: ["Aménagement", "Description"], rows: [
          ["Accotement asphalté", "Bord de chaussée délimité par une ligne blanche, même sens que la circulation"],
          ["Bande cyclable", "En bordure de chaussée (milieu urbain), délimitée par marques ou aménagement physique, exclusive aux cyclistes"],
          ["Chaussée désignée", "Rue à faible débit partagée ; uniquement des panneaux, pas de corridor réservé"],
          ["Piste cyclable", "Voie spécialement aménagée, souvent à l'écart de la circulation automobile"]
        ]},
        { type: "heading", text: "Panneaux propres aux cyclistes" },
        { type: "rule", text: "Panonceau bicyclette : indique que la prescription ne concerne QUE les cyclistes." },
        { type: "rule", text: "Trajet obligatoire (cercle vert) : route que cyclistes (et parfois piétons) doivent emprunter." },
        { type: "rule", text: "Obligation de descendre de bicyclette et de marcher à côté (cercle vert)." },
        { type: "rule", text: "Enfants < 12 ans doivent être accompagnés d'un adulte (sur route > 50 km/h)." },
        { type: "rule", text: "Interdiction de dépasser côte à côte (cercle rouge) ; panonceau FIN pour la fin de zone." },
        { type: "rule", text: "Pente raide, chaussée glissante, présence de cyclistes : losanges jaunes adaptés au vélo." },
        { type: "rule", text: "Voie cyclable barrée / Détour : panneaux orange pour les travaux." },
        { type: "rule", text: "La Route verte : itinéraire cyclable de plus de 5 000 km reliant les régions du Québec (écusson vert)." }
      ]
    },

    // ────────────── OBLIGATIONS LÉGALES ──────────────
    {
      title: "Obligations légales sur la signalisation",
      content: [
        { type: "rule", text: "Obéir aux signaleurs et agents de la paix même si la signalisation indique autre chose" },
        { type: "rule", text: "Interdit de circuler sur une propriété privée pour éviter de se conformer à une signalisation" },
        { type: "rule", text: "Interdit d'installer une signalisation sur un chemin public sans autorisation" },
        { type: "rule", text: "Endommager, déplacer ou enlever une signalisation : infraction grave." }
      ]
    }
  ]
};
