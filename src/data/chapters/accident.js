// Chapitre 5 — L'Accident (complet)
export default {
  id: "5",
  title: "L'Accident",
  emoji: "🚨",
  color: "#e65100",
  accent: "#f57c00",
  sections: [
    {
      title: "Assurance automobile au Québec – Régime public (SAAQ)",
      content: [
        { type: "rule", text: "Couvre les DOMMAGES CORPORELS de toutes les victimes, peu importe la responsabilité (régime sans faute)" },
        { type: "rule", text: "S'applique aux Québécois victimes au Québec ET hors Québec" },
        { type: "rule", text: "Les personnes non-résidentes blessées au Québec dans un véhicule immatriculé au Québec sont aussi couvertes" },
        { type: "rule", text: "Dommages matériels : couverts par l'assurance privée (responsabilité civile min. 50 000$ obligatoire)" },
        { type: "rule", text: "Régime sans recours aux tribunaux civils pour les préjudices corporels" }
      ]
    },
    {
      title: "Exclusions du régime (pas d'indemnité SAAQ)",
      content: [
        { type: "list", items: [
          "Accident lors d'une compétition ou course (parcours fermé), même comme spectateur",
          "Accident de motoneige ou VHR (sauf si une automobile est impliquée)",
          "Accident hors chemin public avec tracteur de ferme ou équipement (sauf si automobile impliquée)",
          "Blessures par un appareil indépendant du véhicule quand le véhicule est immobilisé hors chemin public"
        ]}
      ]
    },
    {
      title: "Indemnités disponibles (SAAQ)",
      content: [
        { type: "list", items: [
          "Remplacement du revenu",
          "Perte d'emploi",
          "Frais de garde",
          "Indemnité forfaitaire (douleurs, souffrances, perte de jouissance)",
          "Frais médicaux et paramédicaux (ambulance, prothèses, médicaments, etc.)",
          "Perte d'une année scolaire ou session d'études",
          "Indemnité de décès + frais funéraires"
        ]},
        { type: "rule", text: "Délai pour contester une décision de la SAAQ : 60 jours pour demander une révision, puis appel possible au Tribunal administratif du Québec (60 jours)." },
        { type: "rule", text: "Indemnité de remplacement du revenu revalorisée chaque année (1er janvier). La SAAQ peut aussi payer la réadaptation (frais d'adaptation, recyclage, équipements)." }
      ]
    },
    {
      title: "Cas particuliers (travail, acte criminel)",
      content: [
        { type: "rule", text: "Accident de la route survenu dans le cadre du travail : réclamation à la CNESST d'abord (pas la SAAQ)." },
        { type: "rule", text: "Victime de voies de fait avec un véhicule (acte criminel) : choix entre les indemnités de l'IVAC ou celles de la SAAQ." },
        { type: "rule", text: "Personne blessée en portant secours à une victime : peut se prévaloir de la loi favorisant le civisme ou de la SAAQ." }
      ]
    },
    {
      title: "Préjudices matériels et solvabilité",
      content: [
        { type: "rule", text: "Dommages matériels (véhicule, biens) : non couverts par la SAAQ. Couverts par l'assurance privée." },
        { type: "rule", text: "Assurance responsabilité civile : minimum 50 000$ obligatoire au Québec." },
        { type: "rule", text: "Collision entre 2+ véhicules dont les propriétaires sont connus : chacun s'adresse à SON assureur (convention d'indemnisation directe)." },
        { type: "rule", text: "Sans assurance ET responsable d'un accident causant > 500$ de dommages → suspension du permis jusqu'à preuve de paiement ou garantie déposée à la SAAQ." },
        { type: "rule", text: "Délit de fuite / responsable insolvable : la SAAQ peut, dans certains cas, indemniser la victime des préjudices matériels (après jugement non exécuté)." },
        { type: "rule", text: "Interdiction d'immatriculer un autre véhicule tant que la dette n'est pas réglée." }
      ]
    },
    {
      title: "Que faire en cas d'accident ?",
      content: [
        { type: "step", label: "Sécuriser les lieux", detail: "Allumer les feux de détresse, sortir avec prudence si possible" },
        { type: "step", label: "Évaluer s'il y a des blessés", detail: "Appeler le 911 immédiatement si blessés ou doute" },
        { type: "step", label: "Appeler la police", detail: "Obligatoire pour faire produire un rapport d'accident si blessés ou si délit de fuite" },
        { type: "step", label: "Échanger les informations avec les autres conducteurs", detail: "Nom, adresse, permis, immatriculation, assureur, n° police, plaque, photos" },
        { type: "step", label: "Consulter un médecin", detail: "Même si blessures légères. Faire inscrire tous les symptômes au rapport médical" },
        { type: "step", label: "Faire une réclamation à la SAAQ", detail: "1 888 810-2525 – le plus tôt possible (max 3 ans pour réclamer)" },
        { type: "step", label: "Aviser son assureur privé", detail: "Si l'accident a causé des préjudices matériels" },
        { type: "step", label: "Assurer le suivi médical", detail: "Le médecin doit envoyer le rapport médical à la SAAQ" },
        { type: "alert", text: "Délit de fuite = infraction criminelle. Collision avec objet inanimé ou animal > 25 kg : contacter le poste de police le plus proche si on ne peut joindre le propriétaire sur les lieux." },
        { type: "signGrid", signs: [
          { sign: "policiers", label: "Poste de police (signalisation d'indication)" },
          { sign: "hopital", label: "Hôpital avec service d'urgence" }
        ]}
      ]
    },
    {
      title: "Sur la scène de l'accident",
      content: [
        { type: "rule", text: "Ranger le véhicule sur l'accotement, à ~30 m de l'accident" },
        { type: "rule", text: "Signaler avec les feux de détresse et fusées éclairantes" },
        { type: "rule", text: "Couper le contact des voitures accidentées, interdire de fumer (risque de feu)" },
        { type: "rule", text: "Porter secours dans la mesure de ses compétences. Sinon : ne pas manipuler les blessés." },
        { type: "alert", text: "Ne jamais déplacer un blessé, SAUF en cas de danger réel de feu ou de collision imminente" }
      ]
    },
    {
      title: "Premiers soins – Principes de base",
      content: [
        { type: "step", label: "PROTÉGER", detail: "Soi-même puis la scène : feux de détresse, fusées, éloigner les autres usagers" },
        { type: "step", label: "ALERTER", detail: "911 : décrire le lieu précis, nombre de blessés, gravité apparente" },
        { type: "step", label: "SECOURIR", detail: "Sans aggraver. Parler à la victime, la rassurer, ne pas la déplacer si possible" },
        { type: "rule", text: "Hémorragie : presser fermement sur la plaie avec un linge propre, ne pas retirer un objet planté." },
        { type: "rule", text: "Inconscient qui respire : position latérale de sécurité (sur le côté, tête vers le sol)." },
        { type: "rule", text: "Inconscient qui ne respire pas : RCR (30 compressions thoraciques – 2 insufflations) jusqu'à l'arrivée des secours." },
        { type: "rule", text: "Brûlure : refroidir à l'eau froide 10-15 min. Ne pas crever les cloques." },
        { type: "alert", text: "Si soupçon de fracture du cou/dos : NE PAS bouger la victime. Stabiliser la tête." }
      ]
    },
    {
      title: "Hors Québec – Ce qu'il faut savoir",
      content: [
        { type: "rule", text: "Le Québécois blessé hors Québec reçoit les mêmes indemnités corporelles de la SAAQ" },
        { type: "rule", text: "S'il est responsable de l'accident hors Québec : son assurance responsabilité privée entre en jeu pour les dommages causés à autrui" },
        { type: "rule", text: "Vérifier avant de partir que la couverture d'assurance responsabilité est suffisante pour la province/état visité" },
        { type: "rule", text: "Aux États-Unis : couverture minimale du Québec souvent insuffisante. Demander une « Carte d'assurance interprovinciale » à son assureur." }
      ]
    }
  ]
};
