import ServiceTemplate from "@/components/ServiceTemplate";

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
      keywordsLine="Mots-clés : nettoyage de vitres, vitrerie, vitres sans traces, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
