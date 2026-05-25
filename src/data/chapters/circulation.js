// Chapitre 4 — Règles de Circulation (complet)
export default {
  id: "4",
  title: "Règles de Circulation",
  emoji: "🛣️",
  color: "#b71c1c",
  accent: "#c62828",
  sections: [
    {
      title: "Limites de vitesse (par défaut, sans panneau)",
      content: [
        { type: "table", headers: ["Endroit", "Limite"], rows: [
          ["Autoroute", "Min. 60 km/h – Max. 100 km/h"],
          ["Route pavée (asphalte/béton)", "Max. 90 km/h"],
          ["Route de gravier", "Max. 70 km/h"],
          ["Chemin forestier", "Max. 70 km/h"],
          ["Ville / village", "Max. 50 km/h"],
          ["Zone scolaire", "Max. 50 km/h (sauf panneau différent)"],
          ["Rue partagée (piétons prioritaires)", "Max. 20 km/h"],
          ["Vélorue", "Max. 30 km/h"],
          ["Motoneige", "Max. 70 km/h"],
          ["Autre véhicule hors route", "Max. 50 km/h"]
        ]},
        { type: "rule", text: "Vitesse adaptée aux conditions : pluie, neige, brouillard, route glissante → réduire même sous la limite affichée." },
        { type: "signGrid", signs: [
          { sign: "limiteVitesse_30", label: "Maximum 30 km/h" },
          { sign: "limiteVitesse_50", label: "Maximum 50 km/h (ville)" },
          { sign: "limiteVitesse_70", label: "Maximum 70 km/h" },
          { sign: "limiteVitesse_100", label: "Maximum 100 km/h (autoroute)" },
          { sign: "limiteVitesseMin_60", label: "Minimum 60 km/h" }
        ]}
      ]
    },
    {
      title: "Distance entre véhicules",
      content: [
        { type: "rule", text: "Règle des 2 secondes : choisir un repère fixe, compter 2 secondes entre le passage du véhicule devant et le tien." },
        { type: "rule", text: "3 secondes (ou plus) si chaussée mouillée, glissante ou enneigée." },
        { type: "rule", text: "4-5 secondes derrière une moto ou un camion lourd (mauvaise visibilité)." },
        { type: "rule", text: "Distance imprudente entre véhicules : amende + 2 pts." }
      ]
    },
    {
      title: "Ceinture de sécurité",
      content: [
        { type: "sign", sign: "ceintureObligatoire", title: "Port de la ceinture obligatoire", text: "Rappelle l'obligation de boucler sa ceinture." },
        { type: "rule", text: "Obligatoire pour TOUS les occupants (avant et arrière)" },
        { type: "rule", text: "Enfant < 9 ans OU < 145 cm → siège d'appoint / dispositif de retenue adapté au poids et taille" },
        { type: "rule", text: "Conducteur responsable du port de ceinture pour passager < 16 ans (amende 80$–100$)" },
        { type: "rule", text: "Bébé → siège ORIENTÉ VERS L'ARRIÈRE sur la banquette arrière (idéalement au centre)" },
        { type: "rule", text: "Enfants ≤ 12 ans → banquette arrière (à cause des sacs gonflables frontaux)" },
        { type: "rule", text: "Conducteur : distance min. 25 cm entre poitrine et sac gonflable" },
        { type: "alert", text: "Exemptions : conducteur en marche arrière, passager dans un fourgon cellulaire, certains chauffeurs de taxi en zone municipale" }
      ]
    },
    {
      title: "Appui-tête",
      content: [
        { type: "rule", text: "Centre de l'appui-tête à la hauteur des yeux ou du bord supérieur des oreilles" },
        { type: "rule", text: "Distance maximale entre l'appui-tête et la tête : 7 cm" }
      ]
    },
    {
      title: "Signaler ses intentions et sa présence",
      content: [
        { type: "rule", text: "Clignotant obligatoire AVANT chaque manœuvre : changement de voie, virage, départ d'un stationnement, sortie d'autoroute." },
        { type: "rule", text: "Signaler suffisamment à l'avance (≥ 30 m en ville, ≥ 100 m sur route)." },
        { type: "rule", text: "Klaxon : seulement pour avertir d'un danger imminent. Pas pour exprimer son impatience." },
        { type: "rule", text: "Phares : allumés la nuit et dès que la visibilité est réduite (pluie, brouillard, poudrerie)." },
        { type: "rule", text: "Conducteur de motocyclette : phare TOUJOURS allumé en circulation." }
      ]
    },
    {
      title: "Utilisation des voies",
      content: [
        { type: "rule", text: "Chaussée bidirectionnelle : utiliser la voie d'extrême DROITE. Voie gauche = dépassement ou virage gauche." },
        { type: "rule", text: "Voie du centre (sur route à 3 ou 5 voies) : réservée exclusivement aux virages à gauche (dans les deux sens)" },
        { type: "rule", text: "Autoroute : voie gauche permise pour dépasser, tourner à gauche, éviter obstacle ou rejoindre une sortie" },
        { type: "rule", text: "Intersections : interdit de s'y immobiliser, de bloquer une voie ou de changer de voie" },
        { type: "rule", text: "Terre-plein central : interdit de le franchir sauf signalisation l'autorisant" }
      ]
    },
    {
      title: "Dépassement – Règles complètes",
      content: [
        { type: "sign", sign: "interdictionDepasser", title: "Dépassement interdit", text: "Marque le début d'une zone où le dépassement est interdit." },
        { type: "rule", text: "Toujours par la GAUCHE. Signaler avant, retourner à droite après." },
        { type: "rule", text: "Vérifier : ligne pointillée de son côté, voie libre sur distance suffisante, aucun véhicule derrière qui dépasse déjà" },
        { type: "rule", text: "Dépasser un cycliste : 1 m (≤ 50 km/h) / 1,5 m (> 50 km/h) – sinon rester derrière" },
        { type: "rule", text: "Dépasser un piéton sur la chaussée : mêmes distances" },
        { type: "rule", text: "Ne pas accélérer quand on se fait dépasser (amende 200$–300$ + 2 pts)" },
        { type: "alert", text: "INTERDIT : en courbe, au sommet d'une côte, près d'un tunnel, passage à niveau, passage piétonnier, ligne continue" },
        { type: "rule", text: "Dépasser par la droite : permis SEULEMENT pour doubler un véhicule qui tourne à gauche ou se dirige vers une sortie" },
        { type: "rule", text: "Dépassements en zigzag : interdit (amende 200$–300$ + 4 pts)" }
      ]
    },
    {
      title: "Phares – Quand passer aux feux de croisement (code) ?",
      content: [
        { type: "rule", text: "À moins de 150 m d'un véhicule en sens inverse" },
        { type: "rule", text: "À moins de 150 m d'un véhicule qui précède" },
        { type: "rule", text: "Quand la route est suffisamment éclairée" },
        { type: "rule", text: "La nuit ou mauvaise visibilité : phares et feux allumés obligatoires" },
        { type: "rule", text: "Feux de jour ≠ feux de position arrière : à la tombée du jour, allumer les feux complets sinon l'arrière du véhicule est invisible." }
      ]
    },
    {
      title: "Virages – Méthode",
      content: [
        { type: "heading", text: "Virage à gauche aux feux verts" },
        { type: "step", label: "S'engager dans l'intersection en restant à droite de la ligne médiane", detail: "Pas dans la voie en sens inverse" },
        { type: "step", label: "Céder le passage aux véhicules en sens inverse", detail: "Les laisser passer en premier" },
        { type: "step", label: "Tourner quand sécuritaire", detail: "Vérifier piétons et cyclistes traversant la voie de destination" },
        { type: "step", label: "Se ranger dans la voie la plus à gauche de la chaussée de destination", detail: "Ne pas couper plusieurs voies en même temps" },

        { type: "heading", text: "Virage à droite aux feux verts" },
        { type: "step", label: "Approcher en serrant à droite", detail: "Vérifier l'angle mort droit, cycliste possible" },
        { type: "step", label: "Céder le passage aux piétons", detail: "Et aux cyclistes qui circulent à droite" },
        { type: "step", label: "Effectuer le virage sans empiéter sur la voie opposée", detail: "Sortir dans la voie de droite" }
      ]
    },
    {
      title: "Virage à droite au feu rouge",
      content: [
        { type: "signGrid", signs: [
          { sign: "feuRouge", label: "Feu rouge — s'arrêter complètement" },
          { sign: "interdictionDroite", label: "Si ce panneau est présent : virage à droite interdit au feu rouge" }
        ]},
        { type: "step", label: "S'arrêter complètement avant la ligne d'arrêt (ou passage piéton)", detail: "Ne pas obstruer le passage piétonnier" },
        { type: "step", label: "Vérifier qu'aucun panneau ne l'interdit", detail: "" },
        { type: "step", label: "Céder le passage aux piétons et cyclistes", detail: "Même si le feu est rouge – ils ont la priorité si leur signal les autorise" },
        { type: "step", label: "Regarder : gauche → avant → droite (rétroviseur + angle mort) → gauche", detail: "" },
        { type: "step", label: "N'effectuer le virage que si la voie est libre", detail: "Ce n'est pas obligatoire !" },
        { type: "alert", text: "INTERDIT sur toute l'île de Montréal (sauf panneau d'autorisation spécifique)" }
      ]
    },
    {
      title: "Cession du passage – Priorités",
      content: [
        { type: "signGrid", signs: [
          { sign: "arret", label: "Arrêt — arrêt complet obligatoire puis céder" },
          { sign: "cedezPassage", label: "Cédez le passage — céder sans forcément s'arrêter" }
        ]},
        { type: "heading", text: "À une intersection sans signalisation" },
        { type: "rule", text: "Céder au véhicule arrivé en premier." },
        { type: "rule", text: "Si arrivée simultanée : le véhicule de DROITE a la priorité." },
        { type: "rule", text: "Un véhicule sur une route prioritaire (non signalisée) a la priorité sur celui d'une route secondaire." },

        { type: "heading", text: "À un panneau ARRÊT toutes directions" },
        { type: "rule", text: "Premier arrivé, premier reparti. À égalité : véhicule de droite d'abord." },
        { type: "rule", text: "Si le conducteur cède son tour, l'autre passe (signe de la main = cession volontaire)." },

        { type: "heading", text: "Aux véhicules d'urgence et autres usagers" },
        { type: "rule", text: "Toujours céder à un véhicule d'urgence avec gyrophares + sirène." },
        { type: "rule", text: "Céder aux piétons sur passage piétonnier ou aux intersections." },
        { type: "rule", text: "Céder aux cyclistes circulant dans une bande cyclable ou sur la chaussée." },
        { type: "rule", text: "À une bretelle d'entrée d'autoroute : le véhicule sur l'autoroute a la priorité. Celui qui entre doit s'insérer." },
        { type: "rule", text: "Sortie d'un stationnement, d'une allée privée, d'un chemin de terre : céder à tous les usagers de la chaussée." }
      ]
    },
    {
      title: "Carrefour giratoire",
      content: [
        { type: "signGrid", signs: [
          { sign: "dangerGiratoire", label: "Signal avancé — carrefour giratoire à l'approche" },
          { sign: "cedezGiratoire", label: "Cédez le passage aux véhicules déjà dans l'anneau" }
        ]},
        { type: "rule", text: "Circulation dans le sens contraire des aiguilles d'une montre (par la droite)" },
        { type: "rule", text: "Ralentir à l'approche. Céder le passage aux véhicules DÉJÀ dans l'anneau (ils ont la priorité)." },
        { type: "rule", text: "Pas de clignotant à l'ENTRÉE. Clignotant OBLIGATOIRE à la SORTIE." },
        { type: "rule", text: "Stationnement interdit dans un carrefour giratoire" },
        { type: "rule", text: "S'arrêter si un piéton traverse ou s'apprête à traverser" },
        { type: "rule", text: "Carrefour à plusieurs voies : voie de droite pour la 1re sortie, voie de gauche pour aller plus loin que la moitié." }
      ]
    },
    {
      title: "Faire marche arrière",
      content: [
        { type: "rule", text: "Manœuvre dangereuse : ne pas l'utiliser pour reprendre une sortie manquée, surtout sur autoroute (interdit + dangereux)." },
        { type: "rule", text: "Tourner la tête, regarder par la lunette arrière (pas seulement la caméra)." },
        { type: "rule", text: "Vérifier les deux côtés avant et pendant. Avancer LENTEMENT." },
        { type: "rule", text: "Sortie d'un stationnement : céder à tout véhicule, cycliste ou piéton." },
        { type: "alert", text: "Marche arrière interdite sur autoroute ou bretelle d'autoroute (sauf urgence)." }
      ]
    },
    {
      title: "Autobus scolaire – Obligation d'arrêt",
      content: [
        { type: "rule", text: "Feux JAUNES d'avertissement allumés → se préparer à s'arrêter" },
        { type: "rule", text: "Feux ROUGES clignotants OU panneau d'arrêt activé → s'immobiliser à plus de 5 m" },
        { type: "rule", text: "S'applique dans TOUTES les directions (devant, derrière, route perpendiculaire)" },
        { type: "rule", text: "Exception : si la route est séparée par un terre-plein, l'obligation ne s'applique pas" },
        { type: "alert", text: "Infraction : amende 200$–300$ + 9 points d'inaptitude" }
      ]
    },
    {
      title: "Stationnement – Distances interdites",
      content: [
        { type: "table", headers: ["Endroit", "Distance interdite"], rows: [
          ["Borne d'incendie", "Moins de 3 m"],
          ["Poste de police ou pompiers (même côté)", "Moins de 5 m"],
          ["Intersection / passage piéton / passage à niveau", "Moins de 5 m"],
          ["Côté OPPOSÉ d'un poste police/pompiers", "Moins de 8 m"]
        ]}
      ]
    },
    {
      title: "Stationnement – Autres interdictions",
      content: [
        { type: "signGrid", signs: [
          { sign: "stationnementInterdit", label: "Stationnement interdit" },
          { sign: "arretInterdit", label: "Arrêt interdit (encore plus restrictif)" }
        ]},
        { type: "list", items: [
          "Sur trottoir et terre-plein",
          "Dans un carrefour giratoire",
          "Sur autoroute, voie surélevée, pont, viaduc, tunnel",
          "Chaussée où limite ≥ 70 km/h",
          "Dans une zone de débarcadère",
          "Dans l'espace handicapé sans vignette valide",
          "Dans une voie réservée exclusivement",
          "Devant une rampe d'accès pour personne handicapée"
        ]}
      ]
    },
    {
      title: "Stationnement en pente – Obligations",
      content: [
        { type: "rule", text: "Appliquer le frein de stationnement" },
        { type: "rule", text: "Orienter les roues avant vers la bordure la plus rapprochée" },
        { type: "rule", text: "Retirer la clé, verrouiller les portières" },
        { type: "rule", text: "Ne pas laisser un enfant < 7 ans seul dans le véhicule" }
      ]
    },
    {
      title: "Espace réservé personnes handicapées",
      content: [
        { type: "sign", sign: "fauteuilRoulant", title: "Stationnement réservé", text: "Réservé aux personnes à mobilité réduite — vignette obligatoire et visible." },
        { type: "rule", text: "Stationnement réservé : vignette pour personne handicapée OBLIGATOIRE et visible." },
        { type: "rule", text: "Vignette nominative : à utiliser uniquement quand la personne titulaire est à bord." },
        { type: "alert", text: "Utilisation sans droit : amende ~150$ + remorquage aux frais du contrevenant." }
      ]
    },
    {
      title: "Corridor de sécurité",
      content: [
        { type: "rule", text: "Déclenché par : véhicule d'urgence, dépanneuse, véhicule de surveillance avec feux clignotants ou flèche jaune" },
        { type: "rule", text: "Chaussée à 1 voie → serrer vers la ligne du milieu pour s'éloigner du véhicule arrêté" },
        { type: "rule", text: "Chaussée à plusieurs voies → changer de voie vers la gauche (si sécuritaire)" },
        { type: "rule", text: "Réintégrer la voie de droite après avoir dépassé les travailleurs" }
      ]
    },
    {
      title: "Passage à niveau",
      content: [
        { type: "sign", sign: "dangerPassageNiveau", title: "Signal avancé de passage à niveau", text: "Annonce un croisement avec une voie ferrée. Ralentir et se préparer à s'arrêter." },
        { type: "rule", text: "S'immobiliser à au moins 5 m si feux rouges clignotants, barrière abaissée ou employé de chemin de fer" },
        { type: "rule", text: "Ne pas s'engager si l'espace devant ne permet pas de traverser complètement" },
        { type: "alert", text: "Autobus, minibus, véhicules mat. dangereuses : arrêt OBLIGATOIRE en tout temps avant le passage à niveau" }
      ]
    },
    {
      title: "Véhicule d'urgence",
      content: [
        { type: "rule", text: "Réduire sa vitesse et serrer à droite au maximum" },
        { type: "rule", text: "S'arrêter si nécessaire, s'éloigner des intersections" },
        { type: "rule", text: "Ne jamais tourner devant lui ni le suivre de très près" },
        { type: "rule", text: "Interception par police → activer clignotants, se ranger sécuritairement, mains visibles sur le volant" }
      ]
    },
    {
      title: "Zones de travaux",
      content: [
        { type: "signGrid", signs: [
          { sign: "travauxSignaleur", label: "Signaleur — ses ordres priment sur tout" },
          { sign: "travauxTravailleur", label: "Présence de travailleurs" },
          { sign: "travauxLimiteVitesse_70", label: "Limite de vitesse en zone de travaux" },
          { sign: "travauxDetour", label: "Détour" }
        ]},
        { type: "alert", text: "Amendes DOUBLÉES pour tout excès de vitesse en zone de travaux signalisée" },
        { type: "rule", text: "Obéir aux signaleurs (priorité sur la signalisation)" },
        { type: "rule", text: "Se déplacer vers la voie ouverte dès l'annonce du rétrécissement, pas à la dernière seconde" }
      ]
    },
    {
      title: "Rue partagée et vélorue",
      content: [
        { type: "heading", text: "Rue partagée (piétons prioritaires)" },
        { type: "rule", text: "Limite de vitesse 20 km/h. Piétons peuvent marcher partout sur la chaussée." },
        { type: "rule", text: "Conducteur doit céder à TOUS les usagers (piétons, cyclistes)." },
        { type: "heading", text: "Vélorue (cyclistes prioritaires)" },
        { type: "rule", text: "Limite de vitesse 30 km/h. Cyclistes peuvent occuper la voie au centre." },
        { type: "rule", text: "Dépassement d'un cycliste : distance latérale requise (1 m / 1,5 m)." }
      ]
    },
    {
      title: "Sas vélo (sas avancé pour cyclistes)",
      content: [
        { type: "rule", text: "Espace marqué devant la ligne d'arrêt aux feux, réservé aux cyclistes." },
        { type: "rule", text: "Les véhicules motorisés doivent s'arrêter EN ARRIÈRE du sas." },
        { type: "rule", text: "Permet aux cyclistes de se placer en tête et d'être bien visibles au départ." }
      ]
    },
    {
      title: "Partage de la route avec les véhicules lourds",
      content: [
        { type: "rule", text: "Camion lourd ≠ auto : freinage plus long, virages plus larges, accélération lente." },
        { type: "rule", text: "Ne jamais se placer JUSTE devant un camion qui freine — manque de distance d'arrêt." },
        { type: "rule", text: "Lors d'un virage à droite d'un camion : NE PAS se faufiler dans l'espace ouvert (la remorque va couper la trajectoire)." },
        { type: "heading", text: "Les 4 angles morts (« No Zones »)" },
        { type: "rule", text: "AVANT : ~6 m devant le pare-chocs. ARRIÈRE : jusqu'à 60 m derrière la remorque." },
        { type: "rule", text: "CÔTÉ DROIT : large zone qui s'étend jusqu'au bout de la remorque. CÔTÉ GAUCHE : plus petit, derrière la cabine." },
        { type: "info", text: "Règle d'or : si tu ne vois pas les rétroviseurs du camion, le chauffeur ne te voit pas." }
      ]
    },
    {
      title: "En présence d'un autobus (non scolaire)",
      content: [
        { type: "rule", text: "Sur un chemin où la limite est INFÉRIEURE à 70 km/h : céder le passage à un autobus qui signale son intention de réintégrer la voie, avant de s'arrêter." },
        { type: "rule", text: "L'autobus doit tout de même s'assurer de pouvoir le faire sans danger et signaler avec son clignotant." }
      ]
    },
    {
      title: "Transporter un chargement ou une remorque",
      content: [
        { type: "rule", text: "Le chargement doit être solidement retenu : aucune partie ne doit pouvoir se détacher, masquer les feux ou réduire la visibilité." },
        { type: "rule", text: "Chargement dépassant de plus de 1 m à l'arrière : drapeau rouge (ou panneau réfléchissant) obligatoire. La nuit : feu rouge visible à 150 m." },
        { type: "rule", text: "Véhicule circulant à moins de 40 km/h : panneau avertisseur (triangle orange) obligatoire à l'arrière." },
        { type: "rule", text: "Interdit de transporter des passagers dans une remorque, une semi-remorque ou la caisse d'un véhicule en mouvement." },
        { type: "rule", text: "Remorquage : interdit de remorquer un véhicule dont les roues restent au sol, sauf s'il est retenu par une barre rigide." }
      ]
    },
    {
      title: "Pratiques non autorisées",
      content: [
        { type: "table", headers: ["Pratique", "Conséquence"], rows: [
          ["Course de rue", "Suspension immédiate 30 jours + saisie du véhicule 7 jours (1re fois) / 30 jours (récidive) + amende 1 000$"],
          ["Surf de véhicule (s'agripper à un véhicule)", "Suspension 30 jours + saisie + amende 1 000$ pour tous les participants"],
          ["Détecteur de radar (posséder/installer/utiliser)", "Amende 500$–1 000$ + confiscation"],
          ["Alcool/drogue dans un véhicule en circulation/stationné public", "Conducteur : 300$–600$ | Passager : 200$–300$"],
          ["Faire crisser les pneus (sans raison de sécurité)", "Amende 30$–60$"],
          ["Circuler sur l'accotement", "Interdit sauf urgence ou signalisation"],
          ["Plus de passagers que de ceintures disponibles", "Interdit"],
          ["Ouvrir une portière sans précaution / véhicule en marche", "Interdit — manœuvre sans danger, véhicule arrêté"],
          ["Transporter alcool/drogue à portée dans l'habitacle", "Infraction"]
        ]}
      ]
    }
  ]
};
