import ServiceTemplate from "@/components/ServiceTemplate";

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title="Grand nettoyage de logement à La Flèche"
      subtitle="Remise en état et nettoyage en profondeur après travaux, déménagement ou besoin ponctuel, à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/gros.webp"
      imgAlt="Grand nettoyage et remise en état"
      bullets={[
        "Nettoyage en profondeur : sols, surfaces, sanitaires, cuisine",
        "Remise en état après déménagement ou travaux",
        "Nettoyage des zones difficiles (plinthes, recoins, etc.)",
        "Organisation claire : priorités, temps, zones",
      ]}
      details={[
        "Un grand nettoyage, c’est une vraie remise à neuf : on traite l’ensemble des pièces avec une logique de résultat et de gain de temps.",
        "Idéal avant un état des lieux, après chantier, après une longue absence, ou pour retrouver un intérieur sain et agréable.",
      ]}
      keywordsLine="Mots-clés : grand nettoyage, remise en état, nettoyage après travaux, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
