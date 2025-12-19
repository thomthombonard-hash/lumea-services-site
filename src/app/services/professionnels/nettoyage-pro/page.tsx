import ServiceTemplate from "@/components/ServiceTemplate";

export default function Page() {
  return (
    <ServiceTemplate
      audience="Professionnels"
      title="Nettoyage de bureaux et locaux professionnels à La Flèche"
      subtitle="Un service de nettoyage professionnel pour bureaux, commerces et locaux : propreté, régularité et image de marque, à La Flèche et La Suze-sur-Sarthe."
      img="/optimized/pexels-tima-miroshnichenko-6196682.webp"
      imgAlt="Nettoyage de bureaux et locaux professionnels"
      bullets={[
        "Nettoyage de bureaux, commerces et locaux",
        "Entretien des sanitaires et points de contact",
        "Organisation adaptée à vos horaires",
        "Contrat régulier ou intervention ponctuelle",
      ]}
      details={[
        "Un environnement propre améliore le confort des équipes et l’accueil des clients : nous intervenons avec une logique de régularité et de contrôle qualité.",
        "Nous cadrons ensemble la prestation : zones, fréquence, horaires, priorités — pour un résultat stable dans le temps.",
      ]}
      keywordsLine="Mots-clés : nettoyage professionnel, bureaux, locaux, entreprise, La Flèche, La Suze-sur-Sarthe, Sarthe."
    />
  );
}
