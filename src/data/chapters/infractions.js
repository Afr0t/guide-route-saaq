// Chapitre 6 — Infractions (complet)
export default {
  id: "6",
  title: "Infractions",
  emoji: "⚖️",
  color: "#4a148c",
  accent: "#6a1b9a",
  sections: [
    {
      title: "Grand excès de vitesse – Définition et conséquences",
      content: [
        { type: "table", headers: ["Zone de vitesse", "Grand excès si dépassement de…"], rows: [
          ["60 km/h ou moins", "40 km/h ou plus"],
          ["Plus de 60 km/h et au plus 90 km/h", "50 km/h ou plus"],
          ["100 km/h", "60 km/h ou plus"]
        ]},
        { type: "alert", text: "Grand excès de vitesse : amende DOUBLÉE. Si 3 condamnations ou plus pour grand excès en 10 ans : amende TRIPLÉE." },
        { type: "rule", text: "Suspension immédiate possible (7-60 jours) + saisie du véhicule en cas d'interception" }
      ]
    },
    {
      title: "Amendes – Excès de vitesse (barème officiel)",
      content: [
        { type: "table", headers: ["Excès", "Calcul de l'amende", "Fourchette"], rows: [
          ["1 à 20 km/h", "15$ + 10$ par tranche de 5 km/h", "15$ à 55$"],
          ["21 à 30 km/h", "15$ + 15$ par tranche de 5 km/h", "75$ à 105$"],
          ["31 à 45 km/h", "15$ + 20$ par tranche de 5 km/h", "135$ à 195$"],
          ["46 à 60 km/h", "15$ + 25$ par tranche de 5 km/h", "240$ à 315$"],
          ["61 km/h ou plus", "15$ + 30$ par tranche de 5 km/h", "375$+"]
        ]},
        { type: "rule", text: "Exemple : limite 50 km/h, mesuré à 75 km/h (excès 25 km/h) = 15$ + (5 × 15$) = 90$" },
        { type: "alert", text: "Montants DOUBLÉS en zone de travaux signalisée ET pour les grands excès de vitesse" }
      ]
    },
    {
      title: "Points d'inaptitude – Infractions de vitesse",
      content: [
        { type: "table", headers: ["Excès de vitesse", "Points (zones ≤ 60)", "Points (61-90)", "Points (100 km/h)"], rows: [
          ["1 à 10 km/h", "1", "1", "1"],
          ["11 à 20 km/h", "2", "2", "2"],
          ["21 à 30 km/h", "3", "3", "3"],
          ["31 à 39 km/h", "6 (grand excès)", "3", "3"],
          ["40 à 45 km/h", "6", "6 (grand excès)", "3"],
          ["46 à 49 km/h", "10", "5", "5"],
          ["50 à 59 km/h", "10", "10", "5"],
          ["60 km/h", "10", "10", "10 (grand excès)"],
          ["61 à 80 km/h", "14", "14", "14"],
          ["81 à 100 km/h", "18", "18", "18"],
          ["101 à 120 km/h", "24", "24", "24"],
          ["121 km/h ou plus", "30+", "30+", "30+"]
        ]}
      ]
    },
    {
      title: "Points d'inaptitude – Autres infractions importantes",
      content: [
        { type: "table", headers: ["Infraction", "Points"], rows: [
          ["Accélérer lors d'un dépassement par un autre véhicule", "2"],
          ["Distance imprudente entre véhicules", "2"],
          ["Freinage brusque sans nécessité", "2"],
          ["Vitesse trop grande par rapport aux conditions", "2"],
          ["Défaut de céder le passage aux piétons/cyclistes à une intersection", "2"],
          ["Dépassement interdit par la droite", "3"],
          ["Dépassement interdit par la gauche", "3"],
          ["Omission de porter la ceinture de sécurité", "3"],
          ["Omission de se conformer à un feu rouge ou panneau d'arrêt", "3"],
          ["Franchissement interdit d'une ligne de démarcation", "3"],
          ["Marche arrière interdite", "3"],
          ["Omission d'arrêt obligatoire à un passage à niveau", "3"],
          ["Omission de s'arrêter au feu rouge avant un virage à droite", "3"],
          ["Omission de porter le casque (moto/cyclo)", "3"],
          ["Dépassements successifs en zigzag", "4"],
          ["Dépassement interdit sur voie à sens inverse", "4"],
          ["Vitesse ou action imprudente", "4"],
          ["Omission de se conformer à un ordre d'un agent de la paix", "4"],
          ["Défaut de céder passage à un véhicule d'urgence", "4"],
          ["Défaut de créer corridor de sécurité", "4"],
          ["Conduite avec appareil électronique (téléphone, etc.)", "5"],
          ["Omission d'arrêter pour autobus scolaire avec feux rouges", "9"],
          ["Manquement à un devoir lors d'un accident", "9"],
          ["Course de rue", "12"],
          ["Surf de véhicule (tolérer ou participer)", "12"]
        ]}
      ]
    },
    {
      title: "Points d'inaptitude – Infractions spécifiques (apprentis/probatoires)",
      content: [
        { type: "table", headers: ["Infraction", "Points"], rows: [
          ["Conduire sans accompagnateur (apprenti)", "4"],
          ["Conduire pendant la période interdite (minuit–5h)", "4"],
          ["Conduire avec alcool dans l'organisme (tolérance zéro)", "4"],
          ["Refus de fournir un échantillon d'haleine", "4"],
          ["Transporter des passagers en période interdite (probatoire ≤ 19 ans)", "4"]
        ]}
      ]
    },
    {
      title: "Amendes notables – Permis et circulation",
      content: [
        { type: "table", headers: ["Infraction", "Amende"], rows: [
          ["Ne pas avoir son permis avec soi", "30$–60$"],
          ["Changer d'adresse sans aviser dans 30 jours", "60$–100$"],
          ["Ne pas avoir les documents du véhicule", "60$–100$"],
          ["Laisser un enfant < 7 ans seul dans le véhicule", "60$–100$"],
          ["Passager < 16 ans sans ceinture", "80$–100$"],
          ["Ne pas porter sa ceinture", "200$–300$ + 3 pts"],
          ["Conduire avec appareil électronique (1re fois)", "300$–600$ + 5 pts"],
          ["Conduire avec appareil électronique (récidive)", "600$ + 5 pts"],
          ["Conduire sans permis de la bonne classe", "300$–600$"],
          ["Conduire malgré suspension (non-criminel)", "300$–600$"],
          ["Conduire malgré suspension pour pts d'inaptitude", "600$–2 000$"],
          ["Conduire malgré révocation criminelle", "1 500$–3 000$"],
          ["Détecteur de radar (posséder/installer)", "500$–1 000$"],
          ["Alcool dans le véhicule (conducteur)", "300$–600$"],
          ["Alcool dans le véhicule (passager)", "200$–300$"],
          ["Course de rue", "1 000$"],
          ["Surf de véhicule", "1 000$"]
        ]}
      ]
    },
    {
      title: "Amendes – Immatriculation et équipement",
      content: [
        { type: "table", headers: ["Infraction", "Amende"], rows: [
          ["Plaque sale, masquée, non conforme", "60$–100$"],
          ["Immatriculation expirée", "200$–300$"],
          ["Pneus d'hiver non conformes en période obligatoire", "200$–300$"],
          ["Échappement modifié (silencieux retiré)", "100$–200$"],
          ["Phares non conformes / défectueux", "60$–100$"],
          ["Vitre teintée non conforme côté conducteur", "200$–300$"],
          ["Sac gonflable rendu inopérant sans autorisation", "200$–300$"]
        ]}
      ]
    },
    {
      title: "Amendes – Cyclistes, motocyclistes et piétons",
      content: [
        { type: "table", headers: ["Infraction", "Amende"], rows: [
          ["Bicyclette : manque d'équipement obligatoire", "80$–100$"],
          ["Bicyclette : ne pas circuler à droite ou à la file", "80$–100$"],
          ["Bicyclette : écouteurs en circulant", "80$–100$"],
          ["Bicyclette : appareil électronique en circulant", "80$–100$"],
          ["Bicyclette : passager sans siège fixé", "80$–100$"],
          ["Bicyclette : non-respect d'un feu/panneau", "80$–100$"],
          ["Bicyclette assistée : pas de casque", "100$–200$"],
          ["Moto : pas de casque", "200$–300$ + 3 pts"],
          ["Moto : circuler entre deux rangées de véhicules", "100$–200$"],
          ["Moto : pas de formation zigzag en groupe", "100$–200$"],
          ["Piéton : non-respect d'un feu/passage", "15$-30$"],
          ["Piéton sur l'autoroute (sans urgence)", "60$–100$"]
        ]}
      ]
    },
    {
      title: "Sanctions – Facultés affaiblies (résumé)",
      content: [
        { type: "table", headers: ["Moment", "Sanction"], rows: [
          ["À l'arrestation (CSR)", "Suspension 24h ou 90 jours + saisie du véhicule 30 jours"],
          ["Déclaration de culpabilité – Code criminel", "Amende min. 1 000$ + interdiction conduire ≥ 1 an + casier judiciaire"],
          ["Déclaration de culpabilité – CSR", "Révocation 1 ou 3 ans + programme d'évaluation + antidémarreur"],
          ["Récidive", "Saisie 90 jours + interdiction ≥ 2 ans + emprisonnement + antidémarreur à vie possible"]
        ]},
        { type: "rule", text: "Coût total estimé 1re infraction : minimum 1 750$ (sans frais variables : avocat, hausse d'assurance ~5 ans, antidémarreur ~125$/mois)" }
      ]
    },
    {
      title: "Durée des points et règles clés",
      content: [
        { type: "rule", text: "Points restent au dossier 2 ans à compter de la déclaration de culpabilité OU du paiement de l'amende" },
        { type: "rule", text: "Payer l'amende = déclaration de culpabilité" },
        { type: "rule", text: "Lors d'une révocation : on soustrait le seuil atteint (4, 8, 12 ou 15 pts) mais les points excédentaires restent 2 ans" },
        { type: "rule", text: "Le renouvellement du permis N'efface PAS les points" },
        { type: "rule", text: "Plaider non coupable : possibilité de contester. Reçu dans les 30 jours du constat." }
      ]
    }
  ]
};
