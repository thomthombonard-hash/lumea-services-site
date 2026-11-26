import { pageMetadata } from "@/lib/siteSeo";
import ServiceTemplate from "@/components/ServiceTemplate";

const path = "/services/particuliers/assistance-administrative";

export const metadata = pageMetadata(
  path,
  "Assistance administrative à domicile à La Flèche | Luméa Services",
  "Aide aux démarches, courriers et classement des documents à domicile, à La Flèche, La Suze-sur-Sarthe et dans les environs.",
);

export default function Page() {
  return (
    <ServiceTemplate
      audience="Particuliers"
      path={path}
      title="Assistance administrative à domicile à La Flèche"
      subtitle="Un accompagnement administratif simple : documents, courriers, organisation… à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/assistanceadmi.webp"
      imgAlt="Assistance administrative à domicile à La Flèche et La Suze-sur-Sarthe"
      bullets={[
        "Aide aux démarches et courriers",
        "Classement et organisation des documents",
        "Aide aux formulaires (selon besoin)",
        "Accompagnement clair et rassurant",
      ]}
      details={[
        "L’administratif peut vite devenir lourd : nous vous aidons à remettre de l’ordre et à avancer sereinement sur vos démarches.",
        "L’approche est pédagogique et structurée : on clarifie, on organise, et on vous aide à gagner du temps.",
      ]}
    />
  );
}
