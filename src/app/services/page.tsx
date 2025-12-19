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

  const servicesPros: ServiceCard[] = [
    {
      title: "Nettoyage Pro",
      desc: "Nettoyage de bureaux, commerces et locaux : sols, sanitaires, points de contact. Prestations ponctuelles ou contrat régulier avec suivi.",
      img: "/optimized/pexels-tima-miroshnichenko-6196682.webp",
      href: "/services/professionnels/nettoyage-pro",
    },
    {
      title: "Entretien des Parties Communes",
      desc: "Copropriétés, syndics, SCI : halls, escaliers, paliers, ascenseurs (selon immeuble). Passage régulier et organisation cadrée.",
      img: "/optimized/partiecom.webp",
      href: "/services/professionnels/parties-communes",
    },
    {
      title: "Vitrerie Pro",
      desc: "Vitrines, façades vitrées, verrières : intervention ponctuelle ou contrat. Un rendu sans traces pour une image de marque impeccable.",
      img: "/optimized/vitrepro.webp",
      href: "/services/professionnels/vitrerie-pro",
    },
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 bg-gradient-to-b from-[#FFFBEA] via-white to-[#FFFDF7] border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            {...fadeUp}
            className="text-5xl sm:text-6xl font-extrabold text-[#1E293B] leading-tight"
          >
            Nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FDE68A]">
              services
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-700 leading-relaxed"
          >
            Sols impeccables, vitres étincelantes, locaux assainis ou remise en état :{" "}
            <strong>Luméa Services</strong> accompagne <strong>particuliers</strong> et{" "}
            <strong>professionnels</strong> à <strong>La Flèche</strong> et{" "}
            <strong>La Suze-sur-Sarthe</strong> avec des prestations sur mesure.
          </motion.p>

          <motion.p
            {...fadeUp}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600"
          >
            Maison, appartement, bureaux, commerces, copropriétés : une organisation simple, un
            résultat durable, un suivi sérieux.
          </motion.p>

          <motion.p
            {...fadeUp}
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-700"
          >
            Des questions sur nos prestations, nos tarifs ou le crédit d&apos;impôt ?{" "}
            <Link
              href="/faq"
              className="font-semibold text-[#F59E0B] underline underline-offset-4 hover:text-[#92400E]"
            >
              Consultez notre FAQ
            </Link>
            .
          </motion.p>

          <motion.div {...fadeUp} className="mt-10 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/30 text-[#92400E]">
              🌟 Formules personnalisées
            </span>
            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/30 text-[#92400E]">
              🧹 Intervenants qualifiés
            </span>
            <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/30 text-[#92400E]">
              📍 Service local
            </span>
          </motion.div>

          {/* Crédit d'impôt */}
          <motion.div {...fadeUp} className="mt-10 flex justify-center">
            <div className="max-w-3xl w-full flex flex-col md:flex-row items-center gap-6 bg-white/80 border border-[#FBBF24]/40 rounded-2xl px-6 py-5 shadow-sm">
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#92400E]">
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

        <div className="absolute inset-x-0 bottom-0 -z-10 h-80 bg-gradient-to-b from-transparent to-[#FFFBEA]/70 blur-2xl" />
      </section>

      {/* PARTICULIERS */}
      <section className="relative py-28 bg-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col items-center justify-center mb-16 gap-4">
            <h2 className="text-4xl font-bold text-[#1E293B] flex items-center gap-4">
              Pour les <span className="text-[#F59E0B]">particuliers</span>
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
                className="group relative rounded-3xl border border-[#FBBF24]/20 bg-white overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
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
              className="inline-flex items-center rounded-3xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-9 py-4 text-white font-semibold shadow-lg shadow-[#F59E0B]/30 transition-all hover:scale-[1.06] hover:shadow-[#F59E0B]/40"
            >
              Demander un devis particulier
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROFESSIONNELS */}
      <section className="relative py-28 bg-gradient-to-b from-[#F9FAFB] via-[#FFFDF7] to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-[#1E293B] text-center mb-16">
            Pour les <span className="text-[#F59E0B]">professionnels</span>
          </motion.h2>

          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
            {servicesPros.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group relative rounded-3xl border border-[#FDE68A]/30 bg-white overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
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
              className="inline-flex items-center rounded-3xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-9 py-4 text-white font-semibold shadow-lg shadow-[#F59E0B]/30 transition-all hover:scale-[1.06] hover:shadow-[#F59E0B]/40"
            >
              Demander un devis professionnel
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === OFFRE DU MOMENT (inchangé) === */}
      <section id="offre-moment" className="relative py-28 bg-[#FFFBEA] border-b scroll-mt-[6.5rem]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-[#1E293B] text-center mb-12">
            Offre du <span className="text-[#F59E0B]">moment</span> 🎁
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <motion.div {...fadeUp} className="rounded-3xl bg-white p-8 shadow-lg border border-[#FDE68A]/40">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-4">-10 % pendant 1 mois</h3>
              <p className="text-gray-700 leading-relaxed">
                Pour tous les nouveaux clients, bénéficiez de <strong>-10 %</strong> sur le tarif horaire pendant{" "}
                <strong>1 mois</strong>, dès la souscription à une formule de <strong>2 h / semaine minimum</strong>.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact#prenom"
                  className="inline-block px-5 py-2 bg-[#F59E0B] text-white font-semibold rounded-full text-sm shadow-md transition hover:bg-[#D97706] hover:shadow-lg"
                >
                  Profiter →
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="rounded-3xl bg-white p-8 shadow-lg border border-[#FDE68A]/40">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-4">-10 % pendant 2 mois</h3>
              <p className="text-gray-700 leading-relaxed">
                Offrez <strong>-10 % pendant 2 mois</strong> à un proche, et bénéficiez-en aussi en retour 📦.
                <br />
                Offre valable pour le <strong>parrain</strong> et le <strong>filleul</strong>, sous réserve de{" "}
                <strong>4 h / mois chacun</strong>.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact#prenom"
                  className="inline-block px-5 py-2 bg-[#F59E0B] text-white font-semibold rounded-full text-sm shadow-md transition hover:bg-[#D97706] hover:shadow-lg"
                >
                  Parrainer →
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.p {...fadeUp} className="mt-10 text-xs text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
            *Offres cumulables une seule fois par foyer, disponibles jusqu’au 31/01/2026. Application dans la durée :{" "}
            <strong>soit -10 % pendant 3 mois maximum</strong> (1 mois nouveau client + 2 mois parrainage). Hors packs
            promotionnels ou remises en cours. Offre valable sur l’ensemble de notre zone d’intervention.
          </motion.p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t bg-gradient-to-b from-white to-[#FFFBEA] py-20">
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
              className="rounded-3xl bg-[#FBBF24] px-8 py-3 text-[#1E293B] font-medium shadow-md transition hover:scale-[1.05] hover:shadow-xl"
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
