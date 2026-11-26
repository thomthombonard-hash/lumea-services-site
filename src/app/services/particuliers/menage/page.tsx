import { pageMetadata } from "@/lib/siteSeo";
import ServiceTemplate from "@/components/ServiceTemplate";

const title = "Ménage à domicile à La Flèche";
const path = "/services/particuliers/menage";

export const metadata = pageMetadata(
  path,
  `${title} | Luméa Services`,
  "Ménage régulier ou ponctuel pour particuliers à La Flèche et La Suze-sur-Sarthe. Entretien des sols, de la cuisine et des sanitaires. Devis gratuit.",
  "/optimized/ménage.webp",
);

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title={title}
      path={path}
      quoteService="menage"
      subtitle="Un service de ménage à domicile fiable et humain pour l’entretien régulier ou ponctuel de votre logement à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/ménage.webp"
      imgAlt="Ménage à domicile à La Flèche"
      bullets={[
        "Entretien du logement : sols, sanitaires, cuisine",
        "Dépoussiérage et nettoyage des surfaces",
        "Organisation adaptée à vos habitudes",
        "Prestations de services à la personne (éligibilité selon conditions)",
      ]}
      details={["Pour un ménage régulier, nous convenons avec vous de la fréquence et des pièces à entretenir. Vous pouvez préciser les tâches à privilégier lors de la demande de devis."]}
      questions={[
        {
          question: "Puis-je réserver un seul passage de ménage ?",
          answer: "Oui. Luméa Services intervient pour un ménage ponctuel ou pour des passages réguliers. Précisez les pièces et les tâches à prévoir.",
        },
        {
          question: "Que faut-il préciser pour obtenir un devis de ménage ?",
          answer: "Indiquez votre commune, la surface approximative, les pièces à entretenir et la fréquence souhaitée. Si une visite est utile pour chiffrer, nous convenons d’un rendez-vous.",
        },
      ]}
    />
  );
}
