import type { Metadata } from "next";
import ServiceTemplate from "@/components/ServiceTemplate";

const title = "Nettoyage de vitres à La Flèche | Luméa Services";
const description =
  "Nettoyage de fenêtres, baies vitrées et vérandas à La Flèche et La Suze-sur-Sarthe. Intervention ponctuelle ou régulière pour les particuliers.";
const url = "https://www.lumea-services.fr/services/particuliers/vitrerie";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Luméa Services", locale: "fr_FR", type: "website" },
};

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title="Nettoyage de vitres à La Flèche"
      subtitle="Des vitres propres et sans traces : fenêtres, baies vitrées, vérandas… Intervention à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/vitrepart.webp"
      imgAlt="Nettoyage de vitres pour particuliers"
      bullets={[
        "Nettoyage des fenêtres et baies vitrées",
        "Intérieur / extérieur selon configuration",
        "Vérandas, verrières, surfaces vitrées",
        "Intervention ponctuelle ou régulière",
      ]}
      details={[
        "Le nettoyage de vitres demande du temps et une méthode précise : nous assurons un rendu net, sans traces, et adapté à vos surfaces.",
        "L’objectif : une luminosité maximale et une prestation propre, rapide et sécurisée, même sur des vitres difficiles d’accès.",
      ]}
    />
  );
}
