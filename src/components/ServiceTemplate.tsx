"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: easeOut },
};

type Props = {
  audience: "Particuliers";
  title: string;              // H1 SEO
  subtitle: string;           // intro courte
  locationLine?: string;      // ex: "La Flèche • La Suze-sur-Sarthe • Sarthe"
  img: string;                // /optimized/xxx.webp
  imgAlt: string;
  bullets: string[];          // liste simple (lisible Google)
  details?: string[];         // paragraphes (optionnel)
  keywordsLine?: string;      // ligne SEO discrète
};

export default function ServiceTemplate({
  audience,
  title,
  subtitle,
  locationLine = "La Flèche • La Suze-sur-Sarthe • Sarthe",
  img,
  imgAlt,
  bullets,
  details = [],
  keywordsLine,
}: Props) {
  const isPart = audience === "Particuliers";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="pt-32 pb-14 bg-gradient-to-b from-[#FFFBEA] via-white to-[#FFFDF7] border-b">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#92400E]">
                {audience}
              </p>

              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight">
                {title}
              </h1>

              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                {subtitle}
              </p>

              {/* Localisation (SEO + rassurance) */}
              <p className="mt-4 text-sm text-gray-600">
                Zone d’intervention : <strong>{locationLine}</strong>
              </p>

              {keywordsLine && (
                <p className="mt-2 text-xs text-gray-500">
                  {keywordsLine}
                </p>
              )}

              <div className="mt-7 flex gap-3 flex-wrap">
                <Link
                  href="/contact#prenom"
                  className="rounded-3xl bg-[#FBBF24] px-7 py-3 text-white font-semibold shadow-md transition hover:bg-[#F59E0B]"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/services"
                  className="rounded-3xl border px-7 py-3 font-medium text-[#1E293B] hover:bg-gray-50 transition"
                >
                  Voir tous les services
                </Link>
              </div>

              {/* Badges */}
              <div className="mt-7 flex gap-3 flex-wrap">
                <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
                  ✅ Devis clair
                </span>
                <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
                  ⭐ Suivi qualité
                </span>
                {isPart && (
                  <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
                    🧾 Crédit d’impôt 50%
                  </span>
                )}
              </div>
            </motion.div>

            {/* Image (style identique à tes cartes) */}
            <motion.div
              {...fadeUp}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-white shadow-lg"
            >
              <Image
                src={img}
                alt={imgAlt}
                fill
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-2">
          {/* Bloc prestation */}
          <motion.div {...fadeUp} className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1E293B]">
              Ce que comprend notre prestation
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Chez <strong>Luméa Services</strong>, chaque intervention est adaptée à vos besoins.
              Notre objectif : un résultat propre, régulier et fiable, avec une organisation simple.
            </p>
            <ul className="mt-5 space-y-2 text-gray-700 list-disc pl-5">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            {details.length > 0 && (
              <div className="mt-6 space-y-3">
                {details.map((t, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">
                    {t}
                  </p>
                ))}
              </div>
            )}
          </motion.div>

          {/* Bloc organisation */}
          <motion.div {...fadeUp} className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1E293B]">Comment ça se passe ?</h2>
            <ol className="mt-5 space-y-2 text-gray-700 list-decimal pl-5">
              <li>Vous décrivez votre besoin (surface, fréquence, contraintes).</li>
              <li>On vous propose un devis clair et une organisation adaptée.</li>
              <li>Intervention + suivi qualité Luméa Services.</li>
            </ol>

            {/* Crédit d’impôt (Particuliers) */}
              <div className="mt-7 rounded-2xl border border-[#FBBF24]/35 bg-[#FFFBEA]/60 p-5">
                <h3 className="text-lg font-bold text-[#1E293B]">
                  Crédit d’impôt 50% (services à la personne)
                </h3>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Selon votre situation, les prestations réalisées à votre domicile peuvent être
                  <strong> éligibles à un crédit d’impôt de 50%</strong> (dispositif encadré par
                  l’article <strong>199 sexdecies du Code général des impôts</strong>).
                </p>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Nous vous remettons une <strong>attestation fiscale</strong> récapitulative pour vos démarches.
                </p>
              </div>

            <p className="mt-7 text-sm text-gray-600">
              Pour les questions fréquentes (organisation, tarifs, crédit d’impôt…),{" "}
              <Link href="/faq" className="underline text-[#F59E0B] hover:text-[#92400E]">
                consultez la FAQ
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t bg-gradient-to-b from-white to-[#FFFBEA]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-[#1E293B]">
            Besoin d’un devis rapide à {locationLine.split("•")[0].trim()} ?
          </motion.h2>
          <motion.p {...fadeUp} className="mt-3 text-gray-700">
            Réponse rapide, planning clair, suivi sérieux — Luméa Services.
          </motion.p>
          <motion.div {...fadeUp} className="mt-8">
            <Link
              href="/contact#prenom"
              className="inline-flex items-center rounded-3xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-10 py-4 text-white font-semibold shadow-lg shadow-[#F59E0B]/30 transition hover:scale-[1.03]"
            >
              Obtenir un devis
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
