"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

type ServiceCard = {
  title: string;
  desc: string;
  img: string;
  href: string;
};

export default function ServicesPage() {
  const servicesParticuliers: ServiceCard[] = [
    {
      title: "Ménage à domicile",
      desc: "Entretien régulier ou ponctuel de votre logement : dépoussiérage, sols, cuisine, sanitaires. Une prestation sur mesure adaptée à votre rythme.",
      img: "/optimized/ménage.webp",
      href: "/services/particuliers/menage",
    },
    {
      title: "Grand nettoyage",
      desc: "Remise à neuf après déménagement, travaux ou longue absence : nettoyage en profondeur, pièces complètes, zones difficiles, finition soignée.",
      img: "/optimized/gros.webp",
      href: "/services/particuliers/nettoyage",
    },
    {
      title: "Vitrerie",
      desc: "Fenêtres, baies vitrées, vérandas : nettoyage intérieur/extérieur avec un rendu sans traces, même sur les surfaces difficiles d’accès.",
      img: "/optimized/vitrepart.webp",
      href: "/services/particuliers/vitrerie",
    },
    {
      title: "Transport & accompagnement",
      desc: "Un service de proximité pour les déplacements du quotidien (accompagnement, courses, rendez-vous). Approche humaine et rassurante.",
      img: "/optimized/transport.webp",
      href: "/services/particuliers/transport",
    },
    {
      title: "Assistance administrative",
      desc: "Aide aux démarches, courriers, classement, organisation des documents : un accompagnement simple pour gagner du temps et être serein.",
      img: "/optimized/assistanceadmi.webp",
      href: "/services/particuliers/assistance-administrative",
    },
    {
      title: "Assistance informatique",
      desc: "Aide numérique à domicile : prise en main, installation, paramétrages simples, petits blocages du quotidien. Pédagogique et clair.",
      img: "/optimized/assistanceinfo.webp",
      href: "/services/particuliers/assistance-informatique",
    },
  ];

  return (
    <main className="site-page">
      {/* HERO */}
      <section className="site-page-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            {...fadeUp}
            className="text-5xl sm:text-6xl font-extrabold text-[#1E293B] leading-tight"
          >
            Nos{" "}
            <span className="site-page-accent">
              services
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-700 leading-relaxed"
          >
            Ménage, vitrerie, grand nettoyage et aide à domicile :{" "}
            <strong>Luméa Services</strong> accompagne les <strong>particuliers</strong> à{" "}
            <strong>La Flèche</strong> et{" "}
            <strong>La Suze-sur-Sarthe</strong> avec des prestations sur mesure.
          </motion.p>

          <motion.p
            {...fadeUp}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600"
          >
            Pour votre maison ou votre appartement : une organisation simple, des prestations
            adaptées à votre quotidien et un suivi régulier.
          </motion.p>

          <motion.p
            {...fadeUp}
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-700"
          >
            Des questions sur nos prestations, nos tarifs ou le crédit d&apos;impôt ?{" "}
            <Link
              href="/faq"
              className="font-semibold text-[#0d4772] underline underline-offset-4 hover:text-[#0d2446]"
            >
              Consultez notre FAQ
            </Link>
            .
          </motion.p>

          {/* Crédit d'impôt */}
          <motion.div {...fadeUp} className="mt-10 flex justify-center">
            <div className="max-w-3xl w-full flex flex-col md:flex-row items-center gap-6 bg-white/80 border border-[#dce4ec] rounded-2xl px-6 py-5 shadow-sm">
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#0d4772]">
                  Avantage fiscal pour les particuliers
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                  Pour les prestations de services à la personne réalisées au domicile des particuliers,
                  vous pouvez bénéficier, selon votre situation, d’un{" "}
                  <strong>crédit d&apos;impôt égal à 50&nbsp;% des dépenses engagées</strong>,
                  dans les limites et conditions prévues par la réglementation en vigueur.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Dispositif encadré par l&apos;
                  <strong>article 199 sexdecies du Code général des impôts (CGI)</strong>. Luméa
                  Services remet une attestation fiscale récapitulative annuelle.
                </p>
              </div>

              <div className="shrink-0">
                <Image
                  src="/optimized/50pourcent.webp"
                  alt="Crédit d'impôt de 50 % pour les services à la personne"
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* PARTICULIERS */}
      <section className="relative site-page-section bg-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col items-center justify-center mb-16 gap-4">
            <h2 className="text-4xl font-bold text-[#1E293B] flex items-center gap-4">
              Pour les <span className="site-page-accent">particuliers</span>
              <Image
                src="/optimized/50pourcent.webp"
                alt="Crédit d'impôt 50% - Services à la personne"
                width={70}
                height={70}
                className="object-contain inline-block"
              />
            </h2>

            <p className="text-gray-600 text-center max-w-2xl">
              Ménage, vitrerie, grand nettoyage, accompagnement et assistance à domicile — à La Flèche
              et La Suze-sur-Sarthe.
            </p>
          </motion.div>

          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
            {servicesParticuliers.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="site-page-card group relative overflow-hidden transition hover:border-[#7196b5] hover:shadow-md"
              >
                <Link href={s.href} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      quality={80}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 mix-blend-multiply" />
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-semibold text-[#1E293B]">{s.title}</h3>
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">{s.desc}</p>

                    <div className="mt-5">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F59E0B] group-hover:underline">
                        Voir le détail
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-[#FBBF24]/0 group-hover:ring-4 group-hover:ring-[#FBBF24]/30 transition" />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-20">
            <Link
              href="/contact#prenom"
              className="site-page-button"
            >
              Demander un devis particulier
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t bg-[#f2f7fb] site-page-section">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-[#1E293B]">
            Un besoin précis ? On s’en occupe.
          </motion.h2>
          <motion.p {...fadeUp} className="mt-4 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Dites-nous ce que vous souhaitez : nous revenons rapidement avec une proposition claire et personnalisée.
          </motion.p>
          <motion.div {...fadeUp} className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact#prenom"
              className="site-page-button"
            >
              Nous contacter
            </Link>
            <Link href="/a-propos" className="rounded-3xl border px-8 py-3 text-[#1E293B] font-medium transition hover:bg-gray-50">
              En savoir plus
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
