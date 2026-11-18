import Link from "next/link";

type FAQ = {
  category: "Particuliers" | "Fonctionnement & tarifs";
  icon: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  // === PARTICULIERS ===
  {
    category: "Particuliers",
    icon: "🏡",
    question: "Quels services de ménage à domicile propose Luméa Services ?",
    answer:
      "Luméa Services propose du ménage à domicile sur mesure : entretien régulier ou ponctuel de votre maison (sols, poussière, cuisine, sanitaires, salle de bain, vitrerie légère…). Nous intervenons principalement à La Flèche, La Suze-sur-Sarthe et les communes alentours.",
  },
  {
    category: "Particuliers",
    icon: "🧽",
    question: "Faites-vous des grands nettoyages (après travaux, déménagement, état des lieux) ?",
    answer:
      "Oui, nous réalisons des prestations de grand nettoyage : remise en état après travaux, nettoyage complet avant ou après un déménagement, préparation d’un état des lieux ou rafraîchissement après une longue période d’inoccupation du logement.",
  },
  {
    category: "Particuliers",
    icon: "🧼",
    question: "Proposez-vous le nettoyage de vitres chez les particuliers ?",
    answer:
      "Oui, nous pouvons inclure la vitrerie dans vos prestations de ménage à domicile ou intervenir ponctuellement pour un nettoyage de vitres : fenêtres, baies vitrées, portes-fenêtres, vérandas accessibles…",
  },
  {
    category: "Particuliers",
    icon: "💳",
    question: "Puis-je bénéficier du crédit d’impôt de 50 % pour le ménage à domicile ?",
    answer:
      "Oui, nos prestations de ménage à domicile entrent dans le cadre des services à la personne. Sous réserve de la réglementation en vigueur, vous pouvez bénéficier d’un crédit d’impôt pouvant aller jusqu’à 50 % des sommes versées. Nous vous fournissons chaque année les justificatifs nécessaires pour votre déclaration.",
  },

  // === FONCTIONNEMENT & TARIFS ===
  {
    category: "Fonctionnement & tarifs",
    icon: "📍",
    question: "Dans quelles villes interviennent les équipes de Luméa Services ?",
    answer:
      "Nos équipes interviennent principalement à La Flèche, La Suze-sur-Sarthe et les communes proches. En cas de doute, contactez-nous avec votre adresse : nous vous confirmerons rapidement la possibilité d’intervention.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "📦",
    question: "Y a-t-il des frais de dossier, de gestion ou des frais cachés ?",
    answer:
      "Non, aucun frais de dossier, aucun frais de gestion, aucun frais caché. Un tarif, c’est tout. Vous recevez un devis clair, détaillé, et ce que vous voyez est ce que vous payez.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "🧴",
    question: "Fournissez-vous le matériel et les produits d’entretien ?",
    answer:
      "Nous pouvons utiliser votre matériel et vos produits si vous le préférez, ou vous proposer des solutions adaptées. Nous définissons ensemble l’organisation adaptée à votre domicile avant la première intervention.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "📝",
    question: "Comment se passe la première prise de contact et le devis ?",
    answer:
      "Vous pouvez nous appeler, nous écrire ou remplir le formulaire de contact. Nous réalisons ensuite un échange téléphonique et, si besoin, une visite sur place pour estimer précisément la prestation (surface, fréquence, contraintes). À l’issue, vous recevez un devis gratuit, clair et sans engagement.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "⏱️",
    question: "Y a-t-il un engagement de durée pour vos prestations de ménage ou de nettoyage ?",
    answer:
      "Nous privilégions la flexibilité : la plupart de nos prestations peuvent être ajustées (fréquence, durée, jours d’intervention). En cas d’arrêt, un simple délai de prévenance est prévu afin d’organiser correctement la fin de mission.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "👥",
    question: "Comment sont recrutés et encadrés vos intervenants ?",
    answer:
      "Nos intervenants sont recrutés sur leur sérieux, leur savoir-être et leur expérience dans le ménage et l’entretien du domicile. Ils sont ensuite accompagnés, formés à nos méthodes et suivis régulièrement sur le terrain afin de garantir la qualité des prestations et la sécurité chez nos clients.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "🛡️",
    question: "Êtes-vous assurés en cas de casse ou de dommage pendant une intervention ?",
    answer:
      "Oui, Luméa Services dispose d’une assurance responsabilité civile professionnelle. En cas d’incident lié à une prestation, nous analysons la situation et vous accompagnons dans les démarches nécessaires.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "🔑",
    question: "Comment gérez-vous les clés pour le ménage à domicile ?",
    answer:
      "Si vous nous confiez un jeu de clés, il est identifié de manière sécurisée et conservé selon une procédure stricte. Seules les personnes autorisées peuvent y accéder. Nous définissons avec vous la méthode la plus rassurante : remise en main propre, coffre sécurisé, etc.",
  },
  {
    category: "Fonctionnement & tarifs",
    icon: "📞",
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

export const metadata = {
  title: "FAQ – Ménage et aide à domicile | Luméa Services",
  description:
    "Toutes les réponses aux questions sur nos prestations de ménage, nettoyage et vitrerie à La Flèche et La Suze-sur-Sarthe. Aucun frais caché, devis gratuit, services à domicile pour les particuliers.",
};

export default function FAQPage() {
  const categories: Array<FAQ["category"]> = [
    "Particuliers",
    "Fonctionnement & tarifs",
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* JSON-LD pour le SEO FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-16 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl text-[#1E293B]">
              FAQ – Ménage & nettoyage{" "}
              <span className="text-[#F59E0B]">Luméa Services</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              Vous vous posez des questions sur nos prestations de{" "}
              <strong>ménage à domicile</strong> ou de{" "}
              <strong>grand nettoyage à domicile</strong> autour de{" "}
              <strong>La Flèche</strong> et <strong>La Suze-sur-Sarthe</strong> ?{" "}
              Cette foire aux questions regroupe les réponses essentielles
              pour l’entretien de votre domicile et votre accompagnement au quotidien.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <span className="px-4 py-1.5 text-xs sm:text-sm rounded-full bg-[#FBBF24]/15 text-[#92400E]">
                ✅ Ménage à domicile sur mesure
              </span>
              <span className="px-4 py-1.5 text-xs sm:text-sm rounded-full bg-[#FBBF24]/15 text-[#92400E]">
                🧼 Grand nettoyage et vitrerie à domicile
              </span>
              <span className="px-4 py-1.5 text-xs sm:text-sm rounded-full bg-[#FBBF24]/15 text-[#92400E]">
                ✨ Aucun frais caché
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LISTE FAQ PAR CATÉGORIE */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {faqs.find((f) => f.category === category)?.icon ?? "❓"}
                  </span>
                  <h2 className="text-2xl font-semibold text-[#1E293B]">
                    {category === "Particuliers" && "Questions des particuliers"}
                    {category === "Fonctionnement & tarifs" &&
                      "Fonctionnement, tarifs & organisation"}
                  </h2>
                </div>
                <div className="space-y-4">
                  {faqs
                    .filter((f) => f.category === category)
                    .map((faq, index) => (
                      <div
                        key={faq.question + index}
                        className="rounded-2xl border border-[#FBBF24]/30 bg-white/90 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#FBBF24]/60 transition"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-[#1E293B] flex items-start gap-2">
                          <span className="hidden sm:inline-block mt-1 text-[#FBBF24]">
                            {faq.icon}
                          </span>
                          <span>{faq.question}</span>
                        </h3>
                        <p className="mt-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
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
                className="rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg hover:bg-[#F59E0B]"
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
