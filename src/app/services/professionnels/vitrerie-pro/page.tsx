import ServiceTemplate from "@/components/ServiceTemplate";

export default function Page() {
  return (
    <ServiceTemplate
      audience="Professionnels"
      title="Vitrerie pro à La Flèche"
      subtitle="Nettoyage de vitres et vitrines pour professionnels : façades vitrées, bureaux, commerces — à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/vitrepro.webp"
      imgAlt="Vitrerie pro : nettoyage de vitrines et vitres de bureaux"
      bullets={[
        "Nettoyage de vitrines de magasins",
        "Façades vitrées et bureaux",
        "Interventions ponctuelles ou contrats",
        "Rendu sans traces pour valoriser votre image",
      ]}
      details={[
        "Une vitrine propre renforce l’image de votre établissement. Nous proposons une vitrerie pro régulière ou ponctuelle selon votre besoin.",
        "Nous adaptons les horaires d’intervention pour limiter la gêne (avant ouverture, horaires calmes, etc.).",
      ]}
      keywordsLine="Mots-clés : vitrerie pro, nettoyage vitrine, vitres bureaux, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
