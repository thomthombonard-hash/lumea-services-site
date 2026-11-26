import { pageMetadata } from "@/lib/siteSeo";
import ServiceTemplate from "@/components/ServiceTemplate";

const path = "/services/particuliers/assistance-informatique";

export const metadata = pageMetadata(
  path,
  "Assistance informatique à domicile à La Flèche | Luméa Services",
  "Aide à l’usage de votre ordinateur, de vos outils numériques et de vos équipements à domicile, à La Flèche et dans les environs.",
);

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      path={path}
      title="Assistance informatique à domicile à La Flèche"
      subtitle="Aide informatique simple et accessible : prise en main, installation, petits problèmes du quotidien à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/assistanceinfo.webp"
      imgAlt="Assistance informatique à domicile à La Flèche et La Suze-sur-Sarthe"
      bullets={[
        "Aide à l’utilisation ordinateur / tablette / smartphone",
        "Installation de logiciels et paramétrages simples",
        "Résolution de problèmes du quotidien",
        "Accompagnement patient et pédagogique",
      ]}
      details={[
        "Le but n’est pas de “faire à votre place”, mais de vous aider à comprendre et à utiliser vos outils plus sereinement.",
        "On intervient sur des besoins simples et concrets : mise en route, réglages, usage, et bonnes pratiques de base.",
      ]}
    />
  );
}
