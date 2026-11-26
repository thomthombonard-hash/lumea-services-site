import { pageMetadata } from "@/lib/siteSeo";
import ServiceTemplate from "@/components/ServiceTemplate";

const title = "Grand nettoyage de logement à La Flèche";
const path = "/services/particuliers/nettoyage";

export const metadata = pageMetadata(
  path,
  `${title} | Luméa Services`,
  "Nettoyage approfondi de maison ou d’appartement après déménagement ou travaux à La Flèche et La Suze-sur-Sarthe. Demandez un devis gratuit.",
  "/optimized/gros.webp",
);

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      title={title}
      path={path}
      quoteService="nettoyage"
      subtitle="Remise en état et nettoyage en profondeur après travaux, déménagement ou besoin ponctuel, à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/gros.webp"
      imgAlt="Grand nettoyage et remise en état"
      bullets={[
        "Nettoyage en profondeur : sols, surfaces, sanitaires, cuisine",
        "Remise en état après déménagement ou travaux",
        "Nettoyage des zones difficiles (plinthes, recoins, etc.)",
        "Organisation claire : priorités, temps, zones",
      ]}
      details={["Nous définissons avec vous les pièces à traiter et les tâches utiles, par exemple en cuisine et dans les sanitaires ou sur les plinthes et les vitres."]}
      questions={[
        {
          question: "Pouvez-vous intervenir avant un état des lieux ?",
          answer: "Oui, selon les disponibilités. Indiquez-nous la date de remise des clés, la surface du logement et les pièces à nettoyer.",
        },
        {
          question: "Pouvez-vous chiffrer un grand nettoyage sans vous déplacer ?",
          answer: "Selon le logement, une description et des photos peuvent suffire pour établir un devis. Si l’état du logement est difficile à évaluer sur photo, nous convenons d’une visite.",
        },
      ]}
    />
  );
}
