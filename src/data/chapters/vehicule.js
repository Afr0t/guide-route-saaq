// Chapitre 2 — Le Véhicule (complet)
export default {
  id: "2",
  title: "Le Véhicule",
  emoji: "🚗",
  color: "#1b5e20",
  accent: "#2e7d32",
  sections: [
    {
      title: "Immatriculation – Dispositions générales",
      content: [
        { type: "rule", text: "Tout véhicule routier doit être immatriculé pour circuler sur un chemin public." },
        { type: "rule", text: "L'immatriculation doit être renouvelée annuellement (paiement des droits + contribution d'assurance)." },
        { type: "rule", text: "Le certificat d'immatriculation doit toujours être dans le véhicule, signé." },
        { type: "rule", text: "La plaque doit être bien visible à l'arrière, propre et non altérée." },
        { type: "rule", text: "Numéro d'identification du véhicule (NIV) : doit être lisible et non modifié." }
      ]
    },
    {
      title: "Véhicules exemptés de l'immatriculation",
      content: [
        { type: "list", items: [
          "Véhicule circulant uniquement sur un terrain privé (sauf chemin minier ou forestier ouvert au public)",
          "Tracteur de ferme (sauf si circule sur autoroute)",
          "Équipement agricole non automoteur",
          "Trottinette à pied (sans moteur), patins, planche à roulettes"
        ]}
      ]
    },
    {
      title: "Cession du véhicule",
      content: [
        { type: "rule", text: "Vendeur et acheteur doivent se présenter ensemble dans un centre de services SAAQ (ou en ligne avec compte SAAQclic)." },
        { type: "rule", text: "Délai : transfert dans les 10 jours suivant la vente." },
        { type: "rule", text: "Le vendeur doit remettre le certificat d'immatriculation à l'acheteur." },
        { type: "rule", text: "Don de véhicule entre membres d'une même famille immédiate : exempt de la TVQ sur la valeur du véhicule." }
      ]
    },
    {
      title: "Pneus d'hiver – Obligations",
      content: [
        { type: "rule", text: "Obligatoires du 1er décembre au 15 mars pour tous les taxis et véhicules de promenade immatriculés au Québec" },
        { type: "rule", text: "Pneus à crampons : permis du 15 octobre au 1er mai (véhicules de commerce ≤ 3 000 kg, véhicules de promenade, taxis)" },
        { type: "rule", text: "Profondeur minimale des sculptures : 1,6 mm pour pneus d'été, 3,2 mm pour pneus d'hiver (recommandation)." },
        { type: "alert", text: "Pneus d'hiver manquants en période obligatoire : amende 200$-300$." },
        { type: "rule", text: "Avant de partir : déneiger vitres, toit, capot. Rien ne doit se détacher du véhicule en roulant." }
      ]
    },
    {
      title: "Équipement obligatoire – Vue d'ensemble",
      content: [
        { type: "table", headers: ["Équipement", "Règle"], rows: [
          ["Phares avant", "Min. 2 phares blancs simples ou jumelés"],
          ["Feux arrière", "Min. 2 feux rouges + feux de freinage + clignotants"],
          ["Rétroviseurs", "Min. 2 : intérieur (centre supérieur) + extérieur gauche. Si intérieur inutilisable → extérieur droit aussi."],
          ["Ceinture de sécurité", "Doit être présente et fonctionnelle. Manquante/modifiée = amende 200$."],
          ["Détecteur de radar", "INTERDIT – confiscation + amende 500$–1 000$"],
          ["Sirène/klaxon spécial", "Réservés aux véhicules d'urgence"],
          ["Vitre teintée", "Pare-brise : bande max 15 cm en haut. Vitres côté conducteur : laissent passer ≥ 70% de lumière."],
          ["Plaque d'immatriculation", "Visible, propre, fixée à l'arrière (et avant si exigé)"],
          ["Pare-chocs", "Avant et arrière à hauteur prescrite"]
        ]}
      ]
    },
    {
      title: "Système d'échappement et klaxon",
      content: [
        { type: "rule", text: "Système d'échappement : doit comporter tous les éléments d'origine (collecteur, tuyaux, silencieux, supports) sans fuite de gaz." },
        { type: "rule", text: "Modification pour le rendre plus bruyant (« straight pipe », silencieux retiré) : interdite — interdit aussi de vendre un tel véhicule." },
        { type: "rule", text: "Klaxon : obligatoire, en état de fonctionner, à n'utiliser qu'en cas de nécessité." },
        { type: "rule", text: "Sirène / dispositif de changement des feux : réservés aux véhicules d'urgence. L'agent peut les faire retirer aux frais du propriétaire." }
      ]
    },
    {
      title: "Système de freinage et d'immobilisation",
      content: [
        { type: "rule", text: "Tout véhicule doit avoir un frein de service (force sur chaque roue portante) ET un frein de stationnement." },
        { type: "rule", text: "Interdit de conduire un véhicule dont le freinage a été modifié ou altéré pour en réduire l'efficacité." },
        { type: "rule", text: "Frein jugé défectueux par un agent : le véhicule peut être immobilisé et retenu aux frais du propriétaire jusqu'à réparation." },
        { type: "rule", text: "Remorque exemptée de frein si masse en charge < 1 300 kg OU < la moitié de la masse nette du véhicule tracteur." }
      ]
    },
    {
      title: "Pare-brise, vitres, écran et rétroviseurs",
      content: [
        { type: "rule", text: "Pare-brise : intègre obligatoirement, sans fissure obstruant la vue du conducteur." },
        { type: "rule", text: "Pellicule pare-soleil sur pare-brise : permise sur les 15 cm supérieurs seulement." },
        { type: "rule", text: "Vitres latérales avant : doivent laisser passer ≥ 70% de la lumière (couleur naturelle si possible)." },
        { type: "rule", text: "Vitres arrière et lunette : aucune restriction de teinte SI le véhicule a un rétroviseur extérieur droit." },
        { type: "rule", text: "Rétroviseur intérieur + extérieur gauche obligatoires. Si vue arrière obstruée (camion, fourgonnette) : intérieur peut être remplacé par extérieur droit." },
        { type: "rule", text: "Écran (téléviseur, ordinateur) visible du conducteur : interdit pendant la conduite, sauf GPS/aide à la conduite installé fixement." }
      ]
    },
    {
      title: "Sacs gonflables et ceintures",
      content: [
        { type: "rule", text: "Interdit de rendre un sac gonflable inopérant sauf avec l'accord de la SAAQ (formulaire spécial)" },
        { type: "rule", text: "Bébé : toujours sur la banquette ARRIÈRE, siège orienté vers l'arrière" },
        { type: "rule", text: "Enfants ≤ 12 ans : banquette arrière si sac gonflable à l'avant" },
        { type: "rule", text: "Conducteur : distance minimale de 25 cm entre le centre du couvercle du sac et la poitrine" },
        { type: "rule", text: "Ceinture sectionnée, sertie ou modifiée : amende 200$ + interdiction de remettre en circulation." }
      ]
    },
    {
      title: "Couleurs de feux clignotants/pivotants",
      content: [
        { type: "table", headers: ["Couleur", "Réservée à"], rows: [
          ["Rouge", "Véhicules d'urgence"],
          ["Bleu", "Véhicules de police"],
          ["Jaune", "Véhicules de service, déneigement, escorte, entretien, convoi exceptionnel"],
          ["Vert clignotant", "Véhicule PERSONNEL d'un pompier autorisé (déplacement d'urgence vers la caserne)"],
          ["Vert fixe", "Poste de commandement sur les lieux d'un sinistre (véhicule d'urgence)"]
        ]},
        { type: "alert", text: "Feux non autorisés sur un véhicule → confiscation aux frais du propriétaire" }
      ]
    },
    {
      title: "Vérification mécanique obligatoire",
      content: [
        { type: "table", headers: ["Fréquence", "Véhicules visés"], rows: [
          ["Tous les 12 mois", "Taxis, véhicules d'urgence, véhicules ≥ 4 500 kg, dépanneuses < 4 500 kg, motos/cyclos d'école"],
          ["Tous les 6 mois", "Autobus, minibus, véhicules d'enseignement (hors motos/cyclos), véhicules et taxis scolaires"]
        ]},
        { type: "rule", text: "Défectuosité mineure : réparation dans 48h, sinon remise en circulation interdite" },
        { type: "rule", text: "Défectuosité majeure : ne peut pas reprendre la route tant que non conforme" },
        { type: "rule", text: "Constat de défectuosité émis par un agent de la paix : avis obligatoire à présenter à un mandataire." }
      ]
    },
    {
      title: "Modifications au véhicule",
      content: [
        { type: "rule", text: "Modifications majeures (hauteur, châssis, freinage, direction) : approbation SAAQ obligatoire avant remise en circulation." },
        { type: "rule", text: "Transformer un véhicule en un autre type : approbation de la SAAQ également requise." },
        { type: "rule", text: "Phares colorés (sauf jaunes/blancs aux normes) : interdits. Phares antibrouillards : à l'avant, jamais plus hauts que les phares blancs." },
        { type: "rule", text: "Néons sous le véhicule : interdits en circulation sur chemin public." },
        { type: "rule", text: "Suspension surbaissée / surélevée : doit respecter les normes de garde au sol et de centrage des phares." }
      ]
    },
    {
      title: "Garde-boue, gaz naturel et propane",
      content: [
        { type: "rule", text: "Garde-boue obligatoires si la carrosserie ne couvre pas la semelle des pneus (sauf tracteur de ferme et machine agricole)." },
        { type: "rule", text: "Véhicule au gaz naturel ou au propane : vignette de conformité obligatoire, inspection du système d'alimentation tous les 5 ans." },
        { type: "alert", text: "Système gaz/propane sans vignette valide : amende 300$–600$." }
      ]
    },
    {
      title: "Mise au rancart, remisage et remboursement",
      content: [
        { type: "rule", text: "Mise au rancart : aviser la SAAQ qu'on renonce à circuler avec le véhicule (par téléphone ou en ligne)." },
        { type: "rule", text: "Remettre un véhicule rancart en circulation : vérification mécanique conforme obligatoire d'abord." },
        { type: "rule", text: "Remisage : la plaque reste sur le véhicule ; interdit de circuler pendant le remisage." },
        { type: "rule", text: "Véhicule remisé > 12 mois : certificat de vérification mécanique requis avant de circuler à nouveau." },
        { type: "rule", text: "Remboursement possible d'une partie des droits + contribution d'assurance si le véhicule est rancart, remisé, vendu, accidenté, volé ou exporté." }
      ]
    },
    {
      title: "Autospection avant de partir – 12 vérifications",
      content: [
        { type: "step", label: "Freins", detail: "Pédale ferme, frein à main fonctionnel" },
        { type: "step", label: "Frein de stationnement", detail: "Maintient le véhicule à l'arrêt en pente" },
        { type: "step", label: "Rétroviseurs", detail: "Ajustés pour minimiser les angles morts" },
        { type: "step", label: "Direction", detail: "Aucun jeu excessif, retour bien aligné" },
        { type: "step", label: "Essuie-glaces et lave-glace", detail: "Balais en bon état, liquide rempli (hiver : antigel)" },
        { type: "step", label: "Pneus", detail: "Pression correcte, profondeur des sculptures, pas de coupure ni hernie" },
        { type: "step", label: "Système d'échappement", detail: "Aucun bruit anormal, pas d'odeur d'essence/CO" },
        { type: "step", label: "Feux et phares", detail: "Phares avant (croisement/route), feux arrière, clignotants, feux de freinage, plaque éclairée" },
        { type: "step", label: "Ceinture de sécurité", detail: "Boucle, sangle en bon état, mécanisme rétracteur fonctionnel" },
        { type: "step", label: "Appui-tête", detail: "Centre à la hauteur des yeux ou oreilles, distance ≤ 7 cm de la tête" },
        { type: "step", label: "Courroies (sous le capot)", detail: "Aucune fissure, bonne tension" },
        { type: "step", label: "Carrosserie", detail: "Aucun morceau qui risque de se détacher (rouille avancée, déneigement complet)" }
      ]
    }
  ]
};
