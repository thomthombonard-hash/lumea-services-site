import Link from "next/link";
import { pageMetadata } from "@/lib/siteSeo";

type FAQ = {
  category: "Particuliers" | "Fonctionnement & tarifs";
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  // === PARTICULIERS ===
  {
    category: "Particuliers",
    question: "Quels services de ménage à domicile propose Luméa Services ?",
    answer:
      "Luméa Services propose du ménage à domicile sur mesure : entretien régulier ou ponctuel de votre maison (sols, poussière, cuisine, sanitaires, salle de bain, vitrerie légère…). Nous intervenons principalement à La Flèche, La Suze-sur-Sarthe et les communes alentours.",
  },
  {
    category: "Particuliers",
    question: "Faites-vous des grands nettoyages (après travaux, déménagement, état des lieux) ?",
    answer:
      "Oui, nous réalisons des prestations de grand nettoyage : remise en état après travaux, nettoyage complet avant ou après un déménagement, préparation d’un état des lieux ou rafraîchissement après une longue période d’inoccupation du logement.",
  },
  {
    category: "Particuliers",
    question: "Proposez-vous le nettoyage de vitres chez les particuliers ?",
    answer:
      "Oui, nous pouvons inclure la vitrerie dans vos prestations de ménage à domicile ou intervenir ponctuellement pour un nettoyage de vitres : fenêtres, baies vitrées, portes-fenêtres, vérandas accessibles…",
  },
  {
    category: "Particuliers",
    question: "Puis-je bénéficier du crédit d’impôt de 50 % pour le ménage à domicile ?",
    answer:
      "Oui, nos prestations de ménage à domicile entrent dans le cadre des services à la personne. Sous réserve de la réglementation en vigueur, vous pouvez bénéficier d’un crédit d’impôt pouvant aller jusqu’à 50 % des sommes versées. Nous vous fournissons chaque année les justificatifs nécessaires pour votre déclaration.",
  },

  // === FONCTIONNEMENT & TARIFS ===
  {
    category: "Fonctionnement & tarifs",
    question: "Dans quelles villes interviennent les équipes de Luméa Services ?",
    answer:
      "Nos équipes interviennent principalement à La Flèche, La Suze-sur-Sarthe et les communes proches. En cas de doute, contactez-nous avec votre adresse : nous vous confirmerons rapidement la possibilité d’intervention.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Y a-t-il des frais de dossier, de gestion ou des frais cachés ?",
    answer:
      "Non, aucun frais de dossier, aucun frais de gestion, aucun frais caché. Un tarif, c’est tout. Vous recevez un devis clair, détaillé, et ce que vous voyez est ce que vous payez.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Fournissez-vous le matériel et les produits d’entretien ?",
    answer:
      "Nous pouvons utiliser votre matériel et vos produits si vous le préférez, ou vous proposer des solutions adaptées. Nous définissons ensemble l’organisation adaptée à votre domicile avant la première intervention.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Comment se passe la première prise de contact et le devis ?",
    answer:
      "Vous pouvez nous appeler, nous écrire ou remplir le formulaire de contact. Nous réalisons ensuite un échange téléphonique et, si besoin, une visite sur place pour estimer précisément la prestation (surface, fréquence, contraintes). À l’issue, vous recevez un devis gratuit, clair et sans engagement.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Y a-t-il un engagement de durée pour vos prestations de ménage ou de nettoyage ?",
    answer:
      "Nous privilégions la flexibilité : la plupart de nos prestations peuvent être ajustées (fréquence, durée, jours d’intervention). En cas d’arrêt, un simple délai de prévenance est prévu afin d’organiser correctement la fin de mission.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Comment sont recrutés et encadrés vos intervenants ?",
    answer:
      "Nos intervenants sont recrutés sur leur sérieux, leur savoir-être et leur expérience dans le ménage et l’entretien du domicile. Ils sont ensuite accompagnés, formés à nos méthodes et suivis régulièrement sur le terrain afin de garantir la qualité des prestations et la sécurité chez nos clients.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Êtes-vous assurés en cas de casse ou de dommage pendant une intervention ?",
    answer:
      "Oui, Luméa Services dispose d’une assurance responsabilité civile professionnelle. En cas d’incident lié à une prestation, nous analysons la situation et vous accompagnons dans les démarches nécessaires.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Comment gérez-vous les clés pour le ménage à domicile ?",
    answer:
      "Si vous nous confiez un jeu de clés, il est identifié de manière sécurisée et conservé selon une procédure stricte. Seules les personnes autorisées peuvent y accéder. Nous définissons avec vous la méthode la plus rassurante : remise en main propre, coffre sécurisé, etc.",
  },
  {
    category: "Fonctionnement & tarifs",
    question: "Comment demander un devis ou réserver une intervention de ménage ou de nettoyage ?",
    answer:
      "Pour demander un devis ou réserver une prestation, vous pouvez utiliser la page Contact de notre site, appeler le 06 73 25 88 16 ou écrire à bonard@lumea-services.fr. Nous vous répondons rapidement pour vous proposer une solution adaptée à votre domicile et à vos besoins.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export const metadata = pageMetadata(
  "/faq",
  "FAQ ménage, vitrerie et crédit d’impôt | Luméa Services",
  "Les réponses de Luméa Services sur le ménage à domicile, le nettoyage de vitres, le devis gratuit et le crédit d’impôt à La Flèche et alentours.",
);

export default function FAQPage() {
  const categories: Array<FAQ["category"]> = [
    "Particuliers",
    "Fonctionnement & tarifs",
  ];

  return (
    <main className="site-page">
      {/* JSON-LD pour le SEO FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="site-page-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl text-[#1E293B]">
              FAQ – Ménage & nettoyage{" "}
              <span className="site-page-accent">Luméa Services</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              Vous vous posez des questions sur nos prestations de{" "}
              <strong>ménage à domicile</strong> ou de{" "}
              <strong>grand nettoyage à domicile</strong> autour de{" "}
              <strong>La Flèche</strong> et <strong>La Suze-sur-Sarthe</strong> ?{" "}
              Cette foire aux questions regroupe les réponses essentielles
              pour l’entretien de votre domicile et votre accompagnement au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* LISTE FAQ PAR CATÉGORIE */}
      <section className="site-page-section bg-[#f2f7fb]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-extrabold text-[#0d1c35]">
                  {category === "Particuliers" ? "Questions des particuliers" : "Fonctionnement, tarifs et organisation"}
                </h2>
                <div className="overflow-hidden rounded-2xl border border-[#dce4ec] bg-white">
                  {faqs.filter((faq) => faq.category === category).map((faq) => (
                    <details key={faq.question} className="group border-b border-[#dce4ec] last:border-b-0">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 font-bold text-[#0d1c35] focus-visible:-outline-offset-4 sm:px-6 [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span aria-hidden="true" className="shrink-0 text-[#0d4772] group-open:hidden">+</span>
                        <span aria-hidden="true" className="hidden shrink-0 text-[#0d4772] group-open:inline">−</span>
                      </summary>
                      <p className="px-4 pb-5 leading-relaxed text-[#37465b] sm:px-6">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA FINAL */}
          <div className="mt-14 text-center max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
              Vous avez une question spécifique sur une prestation de{" "}
              <strong>ménage</strong>, de <strong>nettoyage</strong> ou de{" "}
              <strong>vitrerie</strong> qui ne figure pas dans cette FAQ ?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="site-page-button"
              >
                Poser votre question / Demander un devis
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Voir nos services de ménage & nettoyage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
