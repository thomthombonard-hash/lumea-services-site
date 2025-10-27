"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function PolitiqueConfidentialite() {
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
            Politique de <span className="text-[#F59E0B]">Confidentialité</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            Cette politique explique comment Luméa Services collecte, utilise et protège vos données personnelles conformément au RGPD et à la législation française.
          </motion.p>
        </div>
      </section>

      {/* === CONTENU === */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-16">
          {/* Responsable du traitement */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              1. Responsable du traitement
            </h2>
            <p className="leading-relaxed">
              Le responsable du traitement des données collectées sur ce site est :  
              <br />
              <strong>SARL Luméa Services</strong>  
              4 rue Fontevrault, 72200 La Flèche, France  
              <br />
              SIREN : 992 784 090 — Dirigeant : <strong>Thomas BONARD</strong>  
              <br />
              Email de contact :{" "}
              <Link
                href="mailto:bonardthomas@yahoo.fr"
                className="text-[#F59E0B] underline hover:text-[#92400E]"
              >
                bonardthomas@yahoo.fr
              </Link>
            </p>
          </motion.div>

          {/* Données collectées */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              2. Données personnelles collectées
            </h2>
            <p className="leading-relaxed">
              Luméa Services collecte uniquement les données strictement nécessaires au traitement de votre demande via les formulaires du site :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Formulaire de contact :</strong> nom, adresse e-mail, message.</li>
              <li><strong>Formulaire de candidature :</strong> nom, prénom, coordonnées, message et éventuel CV.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Aucune donnée sensible (santé, opinions politiques, etc.) n’est demandée ni stockée.
            </p>
          </motion.div>

          {/* Finalités */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              3. Finalités de la collecte
            </h2>
            <p className="leading-relaxed">
              Les informations collectées via nos formulaires sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Répondre à vos demandes de contact ou de devis ;</li>
              <li>Gérer les candidatures reçues ;</li>
              <li>Assurer le suivi commercial et la qualité du service.</li>
            </ul>
            <p className="mt-3">
              Les données ne sont jamais revendues ni transmises à des tiers sans votre consentement préalable.
            </p>
          </motion.div>

          {/* Base légale */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              4. Base légale du traitement
            </h2>
            <p className="leading-relaxed">
              Le traitement repose sur :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Votre <strong>consentement</strong> (formulaire de contact / candidature) ;</li>
              <li>L’<strong>intérêt légitime</strong> de Luméa Services à répondre à vos demandes et à gérer ses relations clients.</li>
            </ul>
          </motion.div>

          {/* Durée de conservation */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              5. Durée de conservation
            </h2>
            <p className="leading-relaxed">
              Les données issues du formulaire de contact sont conservées pour une durée maximale de <strong>12 mois</strong>.  
              Celles issues des candidatures sont conservées pour une durée maximale de <strong>24 mois</strong> à compter du dernier contact.
            </p>
          </motion.div>

          {/* Droits des utilisateurs */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              6. Vos droits
            </h2>
            <p className="leading-relaxed">
              Conformément au RGPD et à la Loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Droit d’accès et de rectification ;</li>
              <li>Droit à l’effacement ;</li>
              <li>Droit à la limitation du traitement ;</li>
              <li>Droit d’opposition ;</li>
              <li>Droit à la portabilité de vos données.</li>
            </ul>
            <p className="mt-3">
              Vous pouvez exercer ces droits en écrivant à{" "}
              <Link
                href="mailto:bonardthomas@yahoo.fr"
                className="text-[#F59E0B] underline hover:text-[#92400E]"
              >
                bonardthomas@yahoo.fr
              </Link>
              .  
              En cas de difficulté, vous pouvez introduire une réclamation auprès de la{" "}
              <Link
                href="https://www.cnil.fr/"
                target="_blank"
                className="text-[#F59E0B] underline hover:text-[#92400E]"
              >
                CNIL
              </Link>{" "}
              (Commission Nationale de l’Informatique et des Libertés).
            </p>
          </motion.div>

          {/* Sécurité */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              7. Sécurité des données
            </h2>
            <p className="leading-relaxed">
              Luméa Services met en œuvre des mesures techniques et organisationnelles
              appropriées pour assurer la confidentialité et la sécurité des données collectées.
              L’accès aux données est strictement limité aux personnes habilitées.
            </p>
          </motion.div>

          {/* Cookies */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              8. Cookies et traceurs
            </h2>
            <p className="leading-relaxed">
              Le site Luméa Services n’utilise pas de cookies publicitaires ni de traceurs
              à des fins d’analyse statistique.  
              Seuls les cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.
            </p>
          </motion.div>

          {/* Mise à jour */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-4 border-l-4 border-[#FBBF24] pl-3">
              9. Mise à jour de la politique
            </h2>
            <p className="leading-relaxed">
              La présente politique de confidentialité peut être mise à jour pour refléter
              les évolutions légales, techniques ou organisationnelles.  
              La dernière mise à jour a été effectuée le {new Date().toLocaleDateString("fr-FR")}.
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
