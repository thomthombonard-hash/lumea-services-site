import ServiceTemplate from "@/components/ServiceTemplate";

export default function Page() {
  return (
    <ServiceTemplate
      audience="Professionnels"
      title="Entretien des parties communes à La Flèche"
      subtitle="Un service de nettoyage et d’entretien des parties communes pour copropriétés, immeubles, résidences, syndics et SCI à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/partiecom.webp"
      imgAlt="Entretien des parties communes (halls, escaliers, immeubles)"
      bullets={[
        "Nettoyage des halls d’entrée et circulations",
        "Entretien des escaliers, paliers et ascenseurs (selon immeuble)",
        "Gestion des poubelles et zones déchets (selon organisation)",
        "Prestation cadrée : fréquence, zones, contrôles qualité",
      ]}
      details={[
        "L’entretien des parties communes est essentiel pour le confort des résidents et l’image de la résidence. Nous intervenons avec une organisation claire et des passages réguliers, définis avec le syndic ou le gestionnaire.",
        "Notre objectif : des espaces propres, accueillants et entretenus dans la durée (sols, points de contact, zones sensibles), avec un suivi qualité Luméa Services.",
        "Nous adaptons la prestation au bâtiment : surface, nombre d’étages, fréquence, contraintes d’accès et horaires autorisés.",
      ]}
      keywordsLine="Mots-clés : entretien des parties communes, nettoyage copropriété, syndic, immeuble, résidence, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
