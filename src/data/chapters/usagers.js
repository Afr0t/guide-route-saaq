// Chapitre 4b — Usagers Spécifiques (complet)
export default {
  id: "4b",
  title: "Usagers Spécifiques",
  emoji: "🚲",
  color: "#00695c",
  accent: "#00897b",
  sections: [
    {
      title: "Le piéton – Règles clés",
      content: [
        { type: "signGrid", signs: [
          { sign: "dangerPassagePietons", label: "Signal avancé de passage pour piétons" },
          { sign: "accesInterditPietons", label: "Accès interdit aux piétons" }
        ]},
        { type: "rule", text: "Doit utiliser le trottoir. Sans trottoir → accotement ou bord de la chaussée DANS LE SENS CONTRAIRE à la circulation." },
        { type: "rule", text: "Doit utiliser intersection ou passage piétonnier disponibles à proximité pour traverser" },
        { type: "rule", text: "Interdit de traverser en diagonale à une intersection (sauf signalisation contraire)" },
        { type: "rule", text: "Interdit de faire de l'auto-stop sur la chaussée ou à un endroit de dépassement interdit" },
        { type: "rule", text: "Interdit d'utiliser patins, planche à roulettes, skis ou jouet sur la chaussée" },
        { type: "rule", text: "Doit s'identifier (nom, adresse) à un agent de la paix qui estime qu'une infraction a été commise" },
        { type: "alert", text: "Interdit sur une autoroute sauf en cas de nécessité" }
      ]
    },
    {
      title: "Le cycliste – Règles clés",
      content: [
        { type: "sign", sign: "accesInterditVelos", title: "Accès interdit aux bicyclettes", text: "Ce panneau interdit l'accès du chemin ou de la voie aux cyclistes." },
        { type: "rule", text: "Soumis aux mêmes règles que les véhicules + règles particulières" },
        { type: "rule", text: "Circuler aussi près que possible du côté DROIT, dans le même sens que la circulation" },
        { type: "rule", text: "Groupes : rouler à la file, max 15 cyclistes par file" },
        { type: "rule", text: "Tenir le guidon en tout temps, pas d'écouteurs, pas de passager sans siège fixé" },
        { type: "rule", text: "Interdiction de s'agripper à un véhicule en mouvement" },
        { type: "rule", text: "Interdit sur autoroute et ses voies d'entrée/sortie" },
        { type: "rule", text: "Route > 50 km/h : interdit si moins de 12 ans (sauf voie cyclable protégée physiquement ou excursion dirigée)" },
        { type: "rule", text: "Signaux de virage : bras gauche tendu = virer à gauche | avant-bras gauche vertical vers le haut (OU bras droit tendu) = virer à droite" }
      ]
    },
    {
      title: "Le cycliste – Équipement obligatoire",
      content: [
        { type: "table", headers: ["Emplacement", "Équipement"], rows: [
          ["À l'avant", "Réflecteur blanc + phare/feu blanc (la nuit)"],
          ["À l'arrière", "Réflecteur rouge + feu rouge (la nuit)"],
          ["Sur les pédales", "Réflecteur jaune ou blanc (ou bandes réfléchissantes aux chevilles)"],
          ["Roue avant", "Réflecteur aux rayons (jaune/blanc) ou pneus/jantes réfléchissants"],
          ["Roue arrière", "Réflecteur aux rayons (rouge/blanc) ou bandes réfléchissantes aux haubans"],
          ["Frein", "Au moins un frein agissant sur la roue arrière"]
        ]}
      ]
    },
    {
      title: "Bicyclette à assistance électrique",
      content: [
        { type: "rule", text: "18 ans et plus : aucun permis requis mais casque OBLIGATOIRE" },
        { type: "rule", text: "14 à 17 ans : doit avoir un permis de cyclomoteur (ou véhicule de promenade) + casque obligatoire" },
        { type: "rule", text: "Moins de 14 ans : interdit" },
        { type: "rule", text: "Moteur électrique max 500W, assistance jusqu'à 32 km/h maximum" }
      ]
    },
    {
      title: "Trottinette à pied (sans moteur)",
      content: [
        { type: "rule", text: "Aucun permis requis pour circuler. Considérée comme un piéton sur le trottoir." },
        { type: "rule", text: "Sur la chaussée : règles du cycliste (droite, sens de la circulation, signalisation respectée)." },
        { type: "rule", text: "Casque fortement recommandé (non obligatoire en loi générale)." },
        { type: "rule", text: "La nuit : réflecteur blanc à l'avant, rouge à l'arrière, réflecteurs sur les côtés — ou porter un vêtement réfléchissant. Frein agissant sur la roue arrière obligatoire." },
        { type: "alert", text: "Trottinettes électriques : INTERDITES sur les chemins publics (sauf projet pilote spécifique)." },
        { type: "sign", sign: "accesInterditMotos", title: "Accès interdit (véhicules motorisés légers)", text: "Type de panneau d'interdiction d'accès à certains usagers — la trottinette électrique n'est pas admise sur le chemin public." }
      ]
    },
    {
      title: "Le motocycliste / cyclomotoriste – Règles clés",
      content: [
        { type: "sign", sign: "accesInterditMotos", title: "Accès interdit aux motocyclettes", text: "Interdit l'accès du chemin ou de la voie aux motos / cyclomoteurs." },
        { type: "rule", text: "Phare TOUJOURS allumé en circulation (même de jour)" },
        { type: "rule", text: "Casque protecteur conforme aux normes : obligatoire pour conducteur ET passager" },
        { type: "rule", text: "Passager : assis face au guidon, pieds sur les appuie-pieds. Cyclomotoriste < 16 ans : interdit de transporter un passager." },
        { type: "rule", text: "Circulation en groupe de 2+ : formation en ZIGZAG obligatoire" },
        { type: "alert", text: "INTERDIT de circuler ENTRE deux rangées de véhicules (dans la même voie ou entre voies adjacentes)" },
        { type: "rule", text: "Moto ou cyclo ≤ 125 cm³ : interdit sur autoroute et ses voies d'accès/sortie" }
      ]
    },
    {
      title: "Conducteur sur chemin forestier",
      content: [
        { type: "rule", text: "Limite de vitesse : 70 km/h (sauf signalisation contraire)" },
        { type: "rule", text: "Mêmes obligations : permis valide, immatriculation, attestation d'assurance, ceinture obligatoire" },
        { type: "rule", text: "Alcool/drogue au volant : mêmes règles qu'ailleurs" },
        { type: "rule", text: "Garder la droite en permanence, surtout dans les courbes et pentes" }
      ]
    },
    {
      title: "Véhicule hors route (VTT, motoneige) – Résumé",
      content: [
        { type: "rule", text: "Conducteur : min. 16 ans. Si < 18 ans : certificat de la Fédération requis." },
        { type: "rule", text: "Sur chemin public : doit avoir un permis de conduire valide (classe 5 ou 6 pour 16 ans+)" },
        { type: "rule", text: "Assurance responsabilité civile min. 500 000$ obligatoire" },
        { type: "rule", text: "Casque + lunettes de sécurité (si pas de visière) obligatoires pour tous les occupants" },
        { type: "rule", text: "Vitesse max : motoneige 70 km/h | autres VHR 50 km/h" },
        { type: "rule", text: "Phare avant blanc + feu rouge arrière : toujours allumés" },
        { type: "rule", text: "Interdit de circuler sur un chemin public (sauf traversée perpendiculaire autorisée, max 500 m avec signalisation, etc.)" },
        { type: "rule", text: "Distance minimale des habitations : 30 m (sauf autorisation du propriétaire)" }
      ]
    }
  ]
};
