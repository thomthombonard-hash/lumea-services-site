import ServiceTemplate from "@/components/ServiceTemplate";

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title="Ménage à domicile à La Flèche"
      subtitle="Un service de ménage à domicile fiable et humain pour l’entretien régulier ou ponctuel de votre logement à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/ménage.webp"
      imgAlt="Ménage à domicile à La Flèche"
      bullets={[
        "Entretien du logement : sols, sanitaires, cuisine",
        "Dépoussiérage et nettoyage des surfaces",
        "Organisation adaptée à vos habitudes",
        "Prestations de services à la personne (éligibilité selon conditions)",
      ]}
      details={[
        "Notre équipe intervient pour un ménage à domicile soigné, avec des méthodes simples, efficaces et un vrai suivi.",
        "Que ce soit pour un entretien hebdomadaire, un besoin ponctuel ou une remise au propre, Luméa Services vous accompagne dans la durée.",
      ]}
      keywordsLine="Mots-clés : ménage à domicile, aide à domicile, entretien du logement, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
