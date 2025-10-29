"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFBEA] via-white to-[#F9FAFB] text-gray-800 scroll-smooth">
      {/* === HERO === */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 border-b border-gray-200">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_70%)]" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h1
            {...fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1E293B]"
          >
            Mentions <span className="text-[#F59E0B]">Légales</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            Conformément à la loi pour la Confiance dans l’Économie Numérique
            (LCEN) et au Règlement Général sur la Protection des Données (RGPD),
            vous trouverez ci-dessous les informations légales concernant le site
            Luméa Services.
          </motion.p>
        </div>
      </section>

      {/* === CONTENU === */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-16">
          {/* Éditeur du site */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              1. Éditeur du site
            </h2>
            <p className="leading-relaxed">
              Le site Internet est édité par :
              <br />
              <strong>SARL Luméa Services</strong>
              <br />
              Capital social : 3 000 €  
              <br />
              Siège social : 4 rue Fontevrault, 72200 La Flèche, France  
              <br />
              SIREN : 992 784 090 — SIRET : 992 784 090 00019  
              <br />
              RCS : Le Mans  
              <br />
              TVA intracommunautaire : FR 68 992 784 090  
              <br />
              Directeur de la publication : <strong>Thomas BONARD</strong>
            </p>
          </motion.div>

          {/* Hébergeur */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              2. Hébergeur du site
            </h2>
            <p className="leading-relaxed">
              Le site est hébergé par :
              <br />
              <strong>LWS (Ligne Web Services)</strong>  
              <br />
              10, Rue Penthièvre – 75008 Paris – France  
              <br />
              Téléphone : +33 (0)1 77 62 30 03  
              <br />
              Site web :{" "}
              <Link
                href="https://www.lws.fr"
                target="_blank"
                className="text-[#F59E0B] underline hover:text-[#92400E]"
              >
                www.lws.fr
              </Link>
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              3. Contact
            </h2>
            <p className="leading-relaxed">
              Vous pouvez contacter l’éditeur du site par courriel à l’adresse :{" "}
              <Link
                href="mailto:bonard@lumea-services.fr"
                className="text-[#F59E0B] font-medium hover:underline"
              >
                bonard@lumea-services.fr
              </Link>
            </p>
          </motion.div>

{/* Propriété intellectuelle */}
<motion.div {...fadeUp}>
  <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
    4. Propriété intellectuelle
  </h2>
  <p className="leading-relaxed">
    L’ensemble du contenu du site (textes, graphismes, logos, images, vidéos, etc.)
    est la propriété exclusive de <strong>Luméa Services</strong>, sauf mention contraire.
    <br />
    Les photographies présentes sur ce site ont été acquises sur les banques d’images{" "}
    <Link
      href="https://fr.123rf.com/"
      target="_blank"
      className="text-[#F59E0B] underline hover:text-[#92400E]"
    >
      123RF
    </Link>{" "}
    et{" "}
    <Link
      href="https://www.pexels.com/"
      target="_blank"
      className="text-[#F59E0B] underline hover:text-[#92400E]"
    >
      Pexels
    </Link>
    .
    <br />
    Les photos issues de Pexels sont utilisées sous licence libre et attribuées à leurs auteurs respectifs :
  </p>

  <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
    <li>
      <em>pexels-fauxels-3183150</em> — Photo par{" "}
      <Link
        href="https://www.pexels.com/@fauxels/"
        target="_blank"
        className="text-[#F59E0B] underline hover:text-[#92400E]"
      >
        Fauxels
      </Link>
    </li>
    <li>
      <em>pexels-fauxels-3184418</em> — Photo par{" "}
      <Link
        href="https://www.pexels.com/@fauxels/"
        target="_blank"
        className="text-[#F59E0B] underline hover:text-[#92400E]"
      >
        Fauxels
      </Link>
    </li>
    <li>
      <em>pexels-mikhail-nilov-7681302</em> — Photo par{" "}
      <Link
        href="https://www.pexels.com/@mikhail-nilov/"
        target="_blank"
        className="text-[#F59E0B] underline hover:text-[#92400E]"
      >
        Mikhail Nilov
      </Link>
    </li>
    <li>
      <em>pexels-tima-miroschnichenko-6196682</em> — Photo par{" "}
      <Link
        href="https://www.pexels.com/@tima-miroshnichenko/"
        target="_blank"
        className="text-[#F59E0B] underline hover:text-[#92400E]"
      >
        Tima Miroschnichenko
      </Link>
    </li>
  </ul>

  <p className="leading-relaxed mt-3">
    Toute reproduction, modification ou diffusion, totale ou partielle, sans
    autorisation écrite préalable, est strictement interdite.
  </p>
</motion.div>


          {/* Données personnelles */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              5. Données personnelles
            </h2>
            <p className="leading-relaxed">
              Les informations recueillies via les formulaires du site (contact et
              candidature) sont destinées uniquement à Luméa Services pour la gestion des
              demandes et candidatures.  
              <br />
              Conformément au RGPD (Règlement UE 2016/679) et à la Loi Informatique et Libertés,
              vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition
              et de portabilité de vos données personnelles.  
              <br />
              Pour exercer ces droits, adressez un courriel à{" "}
              <Link
                href="mailto:bonard@lumea-services.fr"
                className="text-[#F59E0B] underline hover:text-[#92400E]"
              >
                bonard@lumea-services.fr
              </Link>
              .
              <br />
              Les données ne sont conservées que pour la durée strictement nécessaire à leur
              finalité et ne sont jamais cédées à des tiers sans consentement préalable.
            </p>
          </motion.div>

          {/* Responsabilité */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              6. Responsabilité
            </h2>
            <p className="leading-relaxed">
              Luméa Services s’efforce de maintenir le site accessible et à jour,
              sans pour autant pouvoir garantir l’absence d’erreurs ou d’interruptions.
              L’entreprise ne saurait être tenue responsable des dommages directs ou
              indirects résultant de l’utilisation du site.
            </p>
          </motion.div>

          {/* Droit applicable */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              7. Droit applicable
            </h2>
            <p className="leading-relaxed">
              Les présentes mentions légales sont régies par le droit français.  
              En cas de litige et à défaut d’accord amiable, les tribunaux français
              seront seuls compétents. Les crédits photographiques sont mentionnés 
              conformément aux conditions d’utilisation de chaque banque d’images.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div {...fadeUp} className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} <strong>Luméa Services</strong> — Tous droits réservés  
              <br />
              Création du site : <span className="text-[#F59E0B] font-medium">HBS Partners</span>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
