// Chapitre 1 — Le Conducteur (complet)
export default {
  id: "1",
  title: "Le Conducteur",
  emoji: "🪪",
  color: "#1a5276",
  accent: "#2e86c1",
  sections: [
    {
      title: "Étapes pour obtenir le permis classe 5",
      content: [
        { type: "step", label: "Phase 1 du cours → Permis d'apprenti conducteur", detail: "Réussir l'évaluation théorique en école de conduite reconnue par la SAAQ" },
        { type: "step", label: "Apprenti conducteur : 12 mois minimum", detail: "Accompagnateur obligatoire à côté. Interdit entre minuit et 5h. Tolérance zéro alcool/drogue. 4 points = révocation + délai 3 mois." },
        { type: "step", label: "Examen théorique SAAQ (après 10 mois min.)", detail: "Délai de reprise si échec : 28 jours. Ne dispense pas du reste du cours." },
        { type: "step", label: "Toutes les phases du cours réussies", detail: "Modules théoriques + sorties sur route" },
        { type: "step", label: "Examen pratique SAAQ", detail: "Délai de reprise si échec : 28 jours" },
        { type: "step", label: "Permis probatoire : 24 mois", detail: "Tolérance zéro alcool/drogue. 4 points = révocation. Interdit d'accompagner un apprenti." },
        { type: "step", label: "Permis de conduire", detail: "Après 24 mois de probatoire valide" }
      ]
    },
    {
      title: "Exigences de base – Permis classe 5",
      content: [
        { type: "rule", text: "Âge minimum : 16 ans. Si < 18 ans → consentement écrit du titulaire de l'autorité parentale." },
        { type: "rule", text: "2 pièces d'identité : (1) certificat de naissance OU citoyenneté OU résident permanent OU passeport, (2) carte d'assurance maladie." },
        { type: "rule", text: "Réussir le test visuel (acuité visuelle minimale + champ visuel)." },
        { type: "rule", text: "Rapport d'évaluation médicale exigé si problème de santé déclaré." },
        { type: "rule", text: "Conducteur soumis à la règle « zéro alcool » obligatoire pendant 24 mois (apprenti + probatoire)." }
      ]
    },
    {
      title: "Les 12 classes de permis",
      content: [
        { type: "table", headers: ["Classe", "Véhicules autorisés", "Classes incluses"], rows: [
          ["1", "Tracteur routier 2 essieux + semi-remorque, train routier", "2, 3, 4A, 4B, 5, 6D, 8"],
          ["2", "Autobus > 24 passagers", "3, 4A, 4B, 5, 6D, 8"],
          ["3", "Camion porteur 2 essieux ≥ 4 500 kg / 3 essieux", "4A, 4B, 4C, 5, 6D, 8"],
          ["4A", "Véhicule d'urgence (police, ambulance, pompiers)", "4B, 5, 6D, 8"],
          ["4B", "Minibus, autobus ≤ 24 passagers", "5, 6D, 8"],
          ["4C", "Taxi", "5, 6D, 8"],
          ["5", "Véhicule de promenade (auto, fourgonnette < 4 500 kg), véhicule-outil, véhicule de service ≤ 70 km/h", "6D, 8"],
          ["6A", "Toute motocyclette", "6B, 6C, 6D, 6E, 8"],
          ["6B", "Motocyclette ≤ 400 cm³", "6C, 6D, 6E, 8"],
          ["6C", "Motocyclette ≤ 125 cm³", "6D, 6E, 8"],
          ["6D", "Cyclomoteur (2-3 roues, ≤ 50 cm³ ou électrique ≤ 70 km/h)", "—"],
          ["6E", "Motocyclette à 3 roues", "8"],
          ["8", "Tracteur de ferme", "—"]
        ]}
      ]
    },
    {
      title: "Mentions associées au permis (classes lourdes)",
      content: [
        { type: "table", headers: ["Mention", "Permission de conduire"], rows: [
          ["F", "Véhicule lourd équipé d'un système de freinage pneumatique"],
          ["M", "Véhicule lourd équipé d'une transmission manuelle"],
          ["T", "Train double (train routier) – exige 5 ans d'expérience classe 1"]
        ]},
        { type: "rule", text: "Sans mention requise, l'agent peut suspendre la conduite du véhicule." }
      ]
    },
    {
      title: "Conditions inscrites sur le permis (lettres A à Y)",
      content: [
        { type: "table", headers: ["Lettre", "Condition"], rows: [
          ["A", "Doit porter lunettes / lentilles cornéennes"],
          ["B", "Doit conduire le jour uniquement"],
          ["C", "Doit porter un appareil auditif (classes 2, 4A, 4B)"],
          ["H", "Doit conduire un véhicule < 2 500 kg"],
          ["I", "Doit conduire un véhicule muni d'un antidémarreur éthylométrique (suite à diagnostic médical)"],
          ["J", "Transmission automatique obligatoire"],
          ["K", "Servodirection obligatoire"],
          ["L", "Servofrein obligatoire"],
          ["N", "Harnais de sécurité obligatoire"],
          ["P", "Commandes manuelles obligatoires"],
          ["V", "Commandes adaptées à un handicap"],
          ["W", "Interdit de conduire un véhicule lourd aux États-Unis"],
          ["X", "Antidémarreur suite à condamnation criminelle"],
          ["Y", "Règle du zéro alcool"]
        ]},
        { type: "rule", text: "Non-respect d'une condition = infraction." }
      ]
    },
    {
      title: "Régimes de points d'inaptitude",
      content: [
        { type: "table", headers: ["Type de permis / Âge", "Points max avant révocation"], rows: [
          ["Apprenti conducteur & Probatoire", "4 pts"],
          ["Permis de conduire, moins de 23 ans", "8 pts"],
          ["Permis de conduire, 23 ou 24 ans", "12 pts"],
          ["Permis de conduire, 25 ans et plus", "15 pts"]
        ]},
        { type: "rule", text: "Après révocation : délai de 3, 6 ou 12 mois selon la 1re, 2e ou 3e fois en 2 ans. Examen théorique requis pour récupérer le permis." },
        { type: "rule", text: "Points au dossier : restent 2 ans à compter de la déclaration de culpabilité (ou du paiement de l'amende)" },
        { type: "rule", text: "Renouvellement du permis N'efface PAS les points d'inaptitude." },
        { type: "rule", text: "Payer l'amende = déclaration de culpabilité automatique." }
      ]
    },
    {
      title: "Suspension pour amende non payée",
      content: [
        { type: "rule", text: "Amende impayée après un délai : la SAAQ peut suspendre le permis (ou l'immatriculation) jusqu'à paiement." },
        { type: "rule", text: "Tant que la suspension est en vigueur, conduire = infraction grave (amende 300$-600$, parfois plus + saisie possible)." }
      ]
    },
    {
      title: "Permis probatoire – Passagers entre minuit et 5h",
      content: [
        { type: "table", headers: ["Expérience", "Passagers âgés de 19 ans ou moins (entre minuit et 5h)"], rows: [
          ["0 à 6 mois", "Max 1 passager"],
          ["6 à 12 mois", "Max 3 passagers"],
          ["Plus de 12 mois", "Aucune restriction"]
        ]},
        { type: "rule", text: "Famille immédiate (conjoint, enfants, frères/sœurs) ne comptent pas dans le calcul" },
        { type: "rule", text: "Restrictions levées si un accompagnateur (permis ≥ 2 ans) est assis à l'avant côté passager" }
      ]
    },
    {
      title: "Infractions au Code criminel – Interdictions de conduire",
      content: [
        { type: "table", headers: ["Déclaration de culpabilité", "Interdiction minimale"], rows: [
          ["1re fois (alcool 0,08)", "1 an"],
          ["1re fois (alcool ≥ 0,16 ou refus de test)", "3 ans"],
          ["1re fois (délit de fuite)", "4 ans"],
          ["2e fois dans 10 ans (alcool 0,08)", "3 ans"],
          ["2e fois (≥ 0,16 ou refus ou délit de fuite)", "5 ans"],
          ["3e fois", "5 ans"]
        ]}
      ]
    },
    {
      title: "Facultés affaiblies – Seuils et sanctions",
      content: [
        { type: "rule", text: "Alcool : ≥ 80 mg/100 ml de sang (0,08) = infraction criminelle" },
        { type: "rule", text: "Alcool ≥ 0,16 = infraction aggravée (amende et interdiction de conduire plus sévères)" },
        { type: "rule", text: "Cannabis THC ≥ 2 ng/ml de sang = infraction | ≥ 5 ng/ml = infraction aggravée" },
        { type: "rule", text: "THC ≥ 2,5 ng/ml + alcool ≥ 50 mg/100 ml = infraction combinée" },
        { type: "alert", text: "À l'arrestation : suspension immédiate du permis (24h ou 90 jours selon la situation) + saisie du véhicule 30 jours" },
        { type: "alert", text: "Après déclaration de culpabilité (1re fois) : amende minimale 1 000$ + interdiction de conduire ≥ 1 an + casier judiciaire + antidémarreur" },
        { type: "rule", text: "Coût estimé 1re infraction : 1 750$ minimum, sans compter frais d'avocat, hausse d'assurance, antidémarreur" }
      ]
    },
    {
      title: "Sanctions administratives immédiates (CSR) – alcool/drogue",
      content: [
        { type: "table", headers: ["Situation", "Sanction immédiate (avant procès)"], rows: [
          ["Alcool ≥ 0,08", "Suspension permis 90 jours (saisie 30 j + programme + antidémarreur si récidive)"],
          ["Alcool ≥ 0,16", "Suspension 90 jours + saisie du véhicule 30 jours (90 j si récidive)"],
          ["Refus d'obéir à l'agent (test)", "Suspension 90 jours + saisie 30 jours"],
          ["Zéro alcool : < 22 ans, apprenti, probatoire", "Suspension 90 jours + 4 points + amende 300$–600$"],
          ["Zéro alcool : conducteur d'autobus, minibus, taxi", "Interdiction de conduire ces véhicules 24 h"],
          ["Véhicule lourd avec ≥ 0,05", "Interdiction de conduire 24 h"],
          ["Capacité affaiblie drogue/médicament (test évaluateur échoué)", "Suspension 90 jours + saisie 90 jours si récidive"]
        ]},
        { type: "info", text: "Ces sanctions sont ADMINISTRATIVES (SAAQ) et s'appliquent immédiatement, en plus des sanctions criminelles éventuelles." }
      ]
    },
    {
      title: "Permis restreint",
      content: [
        { type: "rule", text: "Lié aux points : après une 1re révocation pour points, un juge peut accorder un permis restreint pour conduire dans le cadre du travail (besoin de subsistance à prouver)." },
        { type: "rule", text: "Lié à l'alcool : permet de conduire un véhicule muni d'un antidémarreur éthylométrique pendant la période d'interdiction." },
        { type: "rule", text: "Il faut présenter l'ordonnance du juge à la SAAQ pour obtenir le permis restreint." }
      ]
    },
    {
      title: "Vision et exigences de santé",
      content: [
        { type: "rule", text: "90 % de l'information utile à la conduite passe par la vue." },
        { type: "rule", text: "Acuité visuelle : capacité de distinguer nettement les détails à distance (testée à l'obtention)." },
        { type: "rule", text: "Champ visuel : doit être assez étendu pour percevoir les obstacles devant et de chaque côté. Il se rétrécit quand la vitesse augmente ou que l'œil fixe un point." },
        { type: "rule", text: "Vision stéréoscopique (profondeur) : permet d'évaluer les distances entre les objets." },
        { type: "rule", text: "Vision nocturne : dépend de la capacité à voir sous faible éclairage et de la résistance à l'éblouissement (diminue avec l'âge). Éviter les verres teintés la nuit." },
        { type: "rule", text: "Conditions médicales à signaler à la SAAQ : épilepsie, diabète insulinodépendant, troubles cardiaques sévères, problèmes oculaires, neurologiques, alcoolisme/toxicomanie." },
        { type: "rule", text: "Tout changement d'état de santé : déclarer dans les 30 jours suivants." },
        { type: "rule", text: "La SAAQ peut exiger un nouvel examen médical / visuel / pratique selon le dossier." },
        { type: "rule", text: "Examen médical obligatoire à 70, 75 ans, puis tous les 2 ans (classe 5)." },
        { type: "rule", text: "Refus de se soumettre à un examen exigé = suspension du permis." },
        { type: "alert", text: "Conduire en sachant qu'on a une condition médicale incompatible = mise en danger + perte de l'assurance possible." }
      ]
    },
    {
      title: "Fatigue, médicaments et état psychologique",
      content: [
        { type: "rule", text: "Fatigue au volant : réduit l'attention et le temps de réaction comme l'alcool. Risque max entre 1h-7h et 14h-17h." },
        { type: "rule", text: "Faire une pause toutes les 2 heures sur long trajet. Dormir si bâillements répétés ou yeux qui se ferment." },
        { type: "rule", text: "Médicaments en vente libre (antihistaminiques, sirops, somnifères) : peuvent diminuer les capacités → lire la notice ou demander au pharmacien." },
        { type: "rule", text: "Mélange alcool + médicaments : effets multipliés, infraction criminelle si capacités affaiblies." },
        { type: "rule", text: "Émotions fortes (colère, stress, deuil) : reportent l'attention. Éviter de conduire dans ces états." }
      ]
    },
    {
      title: "Appareils électroniques au volant",
      content: [
        { type: "rule", text: "Interdit de tenir en main OU d'utiliser : téléphone, montre intelligente, lecteur MP3, tablette, écran affichant des infos non utiles à la conduite." },
        { type: "rule", text: "Dès qu'un appareil est tenu en main, on est présumé en faire usage. Le mode mains libres est permis mais déconseillé." },
        { type: "rule", text: "« Pendant qu'il conduit » inclut l'attente à un feu rouge ou dans un bouchon. Exception : véhicule immobilisé et stationné de façon sécuritaire hors de la circulation." },
        { type: "rule", text: "Usage permis même en conduisant : appel au 911, paiement sans contact. C.B./walkie-talkie encastré ou fixé toléré." },
        { type: "alert", text: "Téléphone à la main = 300$–600$ + 5 points (600$ en récidive + suspension immédiate 3 / 7 / 30 jours selon la récidive)." }
      ]
    },
    {
      title: "Observation, vigilance et prudence",
      content: [
        { type: "rule", text: "Observation : balayer constamment du regard (loin/proche, rétroviseurs aux 5-8 secondes, angles morts avant tout changement de voie)." },
        { type: "rule", text: "Distance de sécurité : règle des 2 secondes (3 si conditions difficiles)." },
        { type: "rule", text: "Vigilance accrue la nuit et les fins de semaine (plus d'accidents). Anticiper les imprévus (feu défectueux, conducteur perdu, banc de brouillard)." },
        { type: "rule", text: "Principe de prudence (CSR, 2018) : tout usager doit agir avec prudence et respect, surtout envers les plus vulnérables (piétons, cyclistes, personnes à mobilité réduite, moto/cyclo)." },
        { type: "rule", text: "Détecteur de radar : INTERDIT. Confiscation + amende 500$–1 000$." },
        { type: "rule", text: "Conduite avec vision insuffisante (brouillard, nuit) : réduire la vitesse." },
        { type: "rule", text: "Enfant < 7 ans seul dans le véhicule : interdit (amende 60$–100$)." }
      ]
    },
    {
      title: "Obligations du conducteur – Documents requis",
      content: [
        { type: "list", items: [
          "Permis valide, signé, approprié à la classe du véhicule",
          "Certificat d'immatriculation valide et signé",
          "Attestation d'assurance ou de solvabilité",
          "Contrat de location (si véhicule loué < 1 an)",
          "Preuve écrite si véhicule prêté par un commerçant"
        ]},
        { type: "rule", text: "Conduire sans permis de classe appropriée → agent peut saisir le véhicule pour 30 jours" },
        { type: "rule", text: "Changer d'adresse : aviser la SAAQ dans les 30 jours (amende 60$–100$). Modification possible par Internet, poste, téléphone ou centre de services." },
        { type: "rule", text: "Changement d'état de santé : signaler dans les 30 jours." },
        { type: "rule", text: "Interdiction de prêter son permis ou de fournir un renseignement faux pour en obtenir un." },
        { type: "rule", text: "Permis échu depuis 3 ans ou plus : reprendre examens théorique ET pratique" },
        { type: "alert", text: "Non-paiement à l'échéance (renouvellement) : interdiction de conduire jusqu'au paiement. Conduire malgré cela = amende 300$ minimum." }
      ]
    },
    {
      title: "Personnes venant de l'extérieur du Québec",
      content: [
        { type: "rule", text: "Nouveaux résidents : peuvent conduire 6 mois avec leur permis actuel avant d'obtenir un permis québécois" },
        { type: "rule", text: "Province canadienne / États-Unis / pays avec entente : échange sans examen (classe 5)" },
        { type: "rule", text: "Pays sans entente, permis ≥ 1 an : doit réussir examen théorique + pratique" },
        { type: "rule", text: "Pays sans entente, permis < 1 an : doit recommencer comme un premier permis" },
        { type: "rule", text: "Non-résidents : peuvent conduire au Québec jusqu'à 6 mois consécutifs avec leur permis valide" }
      ]
    }
  ]
};
