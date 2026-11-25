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
    <main className="site-page">
      {/* HERO */}
      <section className="site-page-hero">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Fil d’Ariane" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#37465b]">
            <Link className="underline underline-offset-4" href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link className="underline underline-offset-4" href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#0d4772]">
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
                  className="site-page-button"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/services"
                  className="site-page-button-secondary"
                >
                  Voir tous les services
                </Link>
              </div>

              {isPart && (
                <p className="mt-5 text-sm text-[#37465b]">
                  Crédit d’impôt de 50 % sous conditions. <Link href="/#credit-impot" className="font-bold text-[#0d4772] underline underline-offset-4">Voir les modalités</Link>.
                </p>
              )}
            </motion.div>

            {/* Image (style identique à tes cartes) */}
            <motion.div
              {...fadeUp}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#e9dfce] bg-white"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="site-page-section">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-2">
          {/* Bloc prestation */}
          <motion.div {...fadeUp} className="site-page-card p-5 sm:p-8">
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
          <motion.div {...fadeUp} className="site-page-card p-5 sm:p-8">
            <h2 className="text-2xl font-bold text-[#1E293B]">Comment ça se passe ?</h2>
            <ol className="mt-5 space-y-2 text-gray-700 list-decimal pl-5">
              <li>Vous décrivez votre besoin (surface, fréquence, contraintes).</li>
              <li>On vous propose un devis clair et une organisation adaptée.</li>
              <li>Intervention + suivi qualité Luméa Services.</li>
            </ol>

            {/* Crédit d’impôt (Particuliers) */}
              <div className="mt-7 rounded-2xl border border-[#dce4ec] bg-[#f2f7fb] p-5">
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
              <Link href="/faq" className="underline text-[#0d4772] hover:text-[#0d2446]">
                consultez la FAQ
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-page-section border-t bg-[#f2f7fb]">
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
              className="site-page-button"
            >
              Obtenir un devis
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
