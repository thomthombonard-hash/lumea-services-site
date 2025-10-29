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

export default function ServicesPage() {
  const servicesParticuliers = [
    {
      title: "Ménage à Domicile",
      desc: "Profitez d’un intérieur propre et sain grâce à nos intervenants expérimentés. Nous prenons en charge l’entretien complet de votre logement : dépoussiérage, nettoyage des sols, sanitaires, cuisine, lavage du linge, repassage et rangement. Nos prestations sont personnalisées selon vos besoins et votre rythme de vie.",
      img: "/optimized/ménage.webp",
    },
    {
      title: "Grand Nettoyage",
      desc: "Vous venez de déménager, d’effectuer des travaux ou souhaitez simplement une remise à neuf ? Nos équipes spécialisées interviennent pour un nettoyage en profondeur : murs, sols, vitres, encadrements, placards et électroménager. Votre logement retrouve éclat et fraîcheur, prêt à être habité immédiatement.",
      img: "/optimized/gros.webp",
    },
    {
      title: "Nettoyage de Vitres Particuliers",
      desc: "Fini les traces et les vitres ternes ! Nous nettoyons soigneusement vos fenêtres, baies vitrées, vérandas et verrières, à l’intérieur comme à l’extérieur. Nos produits et techniques garantissent un rendu impeccable et durable, même sur les surfaces difficiles d’accès.",
      img: "/optimized/vitrepart.webp",
    },
  ];

  const servicesPros = [
    {
      title: "Nettoyage de Bureaux et Locaux Professionnels",
      desc: "Nous assurons la propreté quotidienne ou hebdomadaire de vos bureaux, commerces ou cabinets. Aspiration, dépoussiérage, désinfection des points de contact, entretien des sols et sanitaires : nos prestations sont réalisées dans le respect des normes d’hygiène et de sécurité, pour un environnement de travail sain et agréable.",
      img: "/optimized/pexels-tima-miroshnichenko-6196682.webp",
    },
    {
      title: "Entretien des Parties Communes",
      desc: "Nous intervenons pour les copropriétés, SCI et syndics afin d’assurer la propreté des halls, escaliers, ascenseurs, parkings et espaces extérieurs. Nos passages réguliers garantissent des lieux propres et accueillants pour les résidents comme pour les visiteurs.",
      img: "/optimized/partiecom.webp",
    },
    {
      title: "Vitrerie Professionnelle",
      desc: "Nos agents interviennent sur les vitrines, façades, verrières et vitres en hauteur à l’aide de matériel professionnel adapté. Nous offrons des contrats d’entretien régulier ou des interventions ponctuelles, pour une image de marque toujours soignée et une transparence parfaite.",
      img: "/optimized/vitrepro.webp",
    },
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h1
            {...fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1E293B]"
          >
            Nos <span className="text-[#F59E0B]">services</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed"
          >
            Luméa Services propose des prestations de ménage et de nettoyage
            pour les particuliers et les professionnels, à La Flèche, La Suze
            et les alentours.  
            Qualité, confiance et proximité sont les maîtres mots de notre engagement.
          </motion.p>
        </div>
      </section>

      {/* SERVICES PARTICULIERS */}
      <section className="relative py-20 border-b bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#1E293B] text-center mb-12"
          >
            Pour les particuliers
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {servicesParticuliers.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    quality={70}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1E293B]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg"
            >
              Demander un devis particulier
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PROFESSIONNELS */}
      <section className="relative py-20 bg-[#F9FAFB] border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#1E293B] text-center mb-12"
          >
            Pour les professionnels
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {servicesPros.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    quality={70}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1E293B]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg"
            >
              Demander un devis professionnel
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="border-t bg-gradient-to-b from-white to-[#FFFBEA]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#1E293B]"
          >
            Besoin d’un service sur mesure ?
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="mt-4 text-gray-700 max-w-2xl mx-auto"
          >
            Que vous soyez un particulier ou une entreprise, Luméa Services
            s’adapte à vos besoins. Contactez-nous pour une étude personnalisée
            et un devis gratuit.
          </motion.p>
          <motion.div
            {...fadeUp}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          >
            <Link
              href="/contact"
              className="rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg"
            >
              Nous contacter
            </Link>
            <Link
              href="/a-propos"
              className="rounded-2xl border px-6 py-3 text-[#1E293B] font-semibold transition hover:bg-gray-50"
            >
              En savoir plus sur nous
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
