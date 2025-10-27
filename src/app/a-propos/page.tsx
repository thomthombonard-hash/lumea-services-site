"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl text-[#1E293B]">
              À propos de <span className="text-[#F59E0B]">Luméa Services</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
              Entreprise locale et humaine, Luméa Services place la confiance, la
              proximité et la valorisation du personnel au cœur de sa démarche.
              Découvrez notre histoire, nos valeurs et notre vision.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border bg-white shadow-lg"
          >
            <Image
              src="/images/a-propos-hero.jpg"
              alt="Équipe Luméa Services"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION — NOTRE HISTOIRE */}
      <section className="relative py-20 border-b bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Notre histoire
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Luméa Services est née de la volonté de{" "}
              <strong>Thomas Bonard</strong> de replacer l’humain au centre du
              secteur du nettoyage. Après huit années d’expérience dans le
              service à la personne et le nettoyage professionnel, il décide de
              créer une entreprise à taille humaine, ancrée sur le territoire de{" "}
              <strong>La Flèche</strong> et <strong>La Suze-sur-Sarthe</strong>.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              L’objectif : offrir des prestations de qualité, tout en valorisant
              le métier des intervenants, souvent sous-estimé. En s’appuyant sur
              une équipe stable, formée et reconnue, Luméa Services tisse une
              relation durable avec ses clients, fondée sur la confiance et la
              satisfaction.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="/images/histoire.jpg"
              alt="Locaux Luméa Services"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION — NOS VALEURS */}
      <section className="relative py-20 border-b bg-[#F9FAFB] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold text-[#1E293B]">Nos valeurs</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Notre philosophie repose sur la conviction que la réussite d’une
              entreprise de services dépend avant tout du bien-être de ses
              salariés. C’est pourquoi chaque collaborateur est accompagné,
              écouté et valorisé.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Bienveillance",
                desc: "Un climat de respect mutuel, d’écoute et de compréhension à chaque niveau de l’entreprise.",
                icon: "🤝",
              },
              {
                title: "Qualité",
                desc: "Des prestations rigoureuses et un suivi personnalisé pour chaque client, sans compromis.",
                icon: "✨",
              },
              {
                title: "Confiance",
                desc: "Une relation de transparence et de fidélité durable entre nos équipes et nos clients.",
                icon: "💛",
              },
              {
                title: "Valorisation",
                desc: "Nous investissons dans nos salariés, leur confort, leur matériel et leur évolution.",
                icon: "🌱",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — NOTRE VISION */}
      <section className="relative py-20 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Notre vision
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              “Investir dans l’humain, c’est investir dans la qualité.”  
              Cette phrase est le pilier de notre engagement.  
              Luméa Services aspire à bâtir un cercle vertueux où la satisfaction
              des collaborateurs crée naturellement celle des clients.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Nous croyons en un modèle local, durable, sans intermédiaires
              inutiles, où chaque client connaît son intervenant et chaque
              salarié se sent reconnu.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 rounded-2xl bg-[#FBBF24] px-6 py-3 text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg"
            >
              Nous contacter
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative order-1 lg:order-2 aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm"
          >
            <Image
              src="/images/vision.jpg"
              alt="Vision de l'entreprise"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION — ÉQUIPE */}
      <section className="relative py-20 bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Une équipe engagée et souriante
            </h2>
            <p className="mt-4 text-gray-700">
              Derrière chaque intervention, il y a une équipe passionnée,
              disponible et attachée à la qualité du service rendu.
            </p>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {["Marie", "Sonia", "Camille", "Thomas"].map((name, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="flex flex-col items-center text-center rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-full border mb-4">
                  <Image
                    src={`/images/equipe-${i + 1}.jpg`}
                    alt={`Photo ${name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">Intervenant(e)</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
