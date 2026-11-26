import { pageMetadata } from "@/lib/siteSeo";
import ServiceTemplate from "@/components/ServiceTemplate";

const title = "Nettoyage de vitres à La Flèche";
const path = "/services/particuliers/vitrerie";

export const metadata = pageMetadata(
  path,
  `${title} | Luméa Services`,
  "Nettoyage de fenêtres, baies vitrées et vérandas accessibles à La Flèche et La Suze-sur-Sarthe. Intervention ponctuelle ou régulière. Devis gratuit.",
  "/optimized/vitrepart.webp",
);

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title={title}
      path={path}
      quoteService="vitrerie"
      subtitle="Luméa Services nettoie les fenêtres, baies vitrées et vérandas accessibles de votre maison ou appartement, à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/vitrepart.webp"
      imgAlt="Nettoyage de vitres pour particuliers"
      bullets={[
        "Nettoyage des fenêtres et baies vitrées",
        "Intérieur / extérieur selon configuration",
        "Vérandas, verrières, surfaces vitrées",
        "Intervention ponctuelle ou régulière",
      ]}
      details={["Nous convenons à l’avance des surfaces à nettoyer et vérifions les conditions d’accès. Indiquez-nous si vous souhaitez aussi le nettoyage des encadrements ou des feuillures."]}
      questions={[
        {
          question: "Nettoyez-vous les deux côtés des vitres ?",
          answer: "Le devis peut prévoir le nettoyage intérieur et extérieur selon la configuration. Précisez si certaines vitres sont à l’étage ou difficiles d’accès.",
        },
        {
          question: "Comment demander un devis pour des baies vitrées ou une véranda ?",
          answer: "Indiquez le nombre de vitrages, leurs dimensions approximatives et leur accessibilité. Des photos peuvent nous aider à préparer le devis.",
        },
      ]}
    />
  );
}
