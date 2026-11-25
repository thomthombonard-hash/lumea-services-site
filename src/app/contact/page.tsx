// Updated ContactPage with dataLayer push for contact_submit_success

"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { homeQuoteServices } from "@/lib/homeQuoteServices";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const postalCode = query.get("codePostal") ?? "";
    const service = homeQuoteServices.find((item) => item.slug === query.get("service"));
    if (!/^[0-9]{5}$/.test(postalCode)) return;

    setForm((current) => ({
      ...current,
      subject: current.subject || (service ? `Demande de devis – ${service.title}` : "Demande de devis"),
      message: current.message || `Code postal de l’intervention : ${postalCode}\n\n`,
    }));
  }, []);

  // 🔹 Chargement différé du script reCAPTCHA Enterprise
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!recaptchaLoaded && typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        document.body.appendChild(script);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [recaptchaLoaded]);

  // 🔹 Soumission du formulaire vers l’API Next.js
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("formType", "contact");
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("subject", form.subject || "Contact");
      fd.append("message", form.message);

      // Récupération du token reCAPTCHA Enterprise
      let token = "";
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (siteKey && typeof window !== "undefined" && window.grecaptcha?.enterprise) {
        try {
          token = await window.grecaptcha.enterprise.execute(siteKey, { action: "submit" });
        } catch (err) {
          console.warn("Erreur reCAPTCHA :", err);
        }
      } else {
        console.warn("reCAPTCHA non disponible ou clé manquante.");
      }

      fd.append("recaptcha", token);

      const res = await fetch("/api/form", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Erreur serveur");

      // 🔹🔹 ÉVÉNEMENT POUR GOOGLE TAG MANAGER 🔹🔹
      if (typeof window !== "undefined") {
        // @ts-ignore au besoin
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore au besoin
        window.dataLayer.push({ event: "contact_submit_success" });
      }

      alert("✅ Merci pour votre message ! Nous reviendrons vers vous rapidement.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("❌ Une erreur est survenue. Merci de réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  // 👉 ICI le seul return du composant
  return (
    <main className="site-page">
      {/* === HERO === */}
      <section className="site-page-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <motion.div {...fadeUp}>
            <h1>Contactez <span className="site-page-accent">Luméa Services</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#37465b]">
              Une question ou une demande de devis ? Contactez notre agence à La Flèche. Nous vous répondons sous 24 à 48 h ouvrées.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#prenom" className="site-page-button">Écrire à l’agence</a>
              <a href="tel:0673258816" className="site-page-button-secondary">Appeler le 06 73 25 88 16</a>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/brand/lumea-agence-appel.webp" alt="" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* === FORMULAIRE === */}
      <section className="site-page-section border-b bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-start">
          {/* FORMULAIRE */}
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-semibold text-[#1E293B] mb-8">
              Envoyez-nous un message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="site-page-card space-y-5 p-4 sm:p-6 lg:p-8"
            >
              <div id="prenom" className="scroll-mt-[7rem]">
                <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
                  Votre nom <span className="site-page-accent">*</span>
                </label>
                <input id="contact-name"
                  type="text"
                  required
                  className="site-page-field"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Marie Dupont"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                  Votre email <span className="site-page-accent">*</span>
                </label>
                <input id="contact-email"
                  type="email"
                  required
                  className="site-page-field"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="vous@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">Sujet</label>
                <input id="contact-subject"
                  type="text"
                  className="site-page-field"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                  Message <span className="site-page-accent">*</span>
                </label>
                <textarea id="contact-message"
                  required
                  className="site-page-field"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <input id="rgpd" type="checkbox" required className="h-4 w-4 rounded border" />
                <label htmlFor="rgpd">
                  J’accepte le traitement de mes données (voir la{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="underline text-[#0d4772]"
                  >
                    politique de confidentialité
                  </Link>
                  ).
                </label>
              </div>

              <div
                className="g-recaptcha"
                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                data-size="invisible"
              ></div>

              <button
                type="submit"
                disabled={loading}
                className="site-page-button w-full sm:w-auto"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </motion.div>

          {/* INFOS + MAPS */}
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-[#1E293B] mb-4">
                Nos coordonnées
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez également nous joindre par téléphone ou venir nous
                rencontrer directement à notre agence de La Flèche.
              </p>

              <div className="mt-6 space-y-3 text-gray-800">
                <p>
                  <span className="font-semibold">📍 Adresse :</span>
                  <br />
                  4 Rue Fontevrault, 72200 La Flèche
                </p>
                <p>
                  <span className="font-semibold">📞 Téléphone :</span>{" "}
                  <a href="tel:0673258816" className="text-[#F59E0B] font-medium">
                    06 73 25 88 16
                  </a>
                </p>
                <p>
                  <span className="font-semibold">✉️ Email :</span>{" "}
                  <a
                    href="mailto:bonard@lumea-services.fr"
                    className="text-[#F59E0B] font-medium"
                  >
                    bonard@lumea-services.fr
                  </a>
                </p>
              </div>
            </div>

            {/* === GOOGLE MAPS === */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#dce4ec] shadow-lg shadow-slate-900/5">
              <iframe
                className="absolute inset-0 w-full h-full"
                title="Localisation Luméa Services"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6370.4835584843795!2d-0.07706592329613694!3d47.69891958159746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48081eb127aae5b3%3A0xb5a219033f568142!2s4%20Rue%20de%20Fontevrault%2C%2072200%20La%20Fl%C3%A8che!5e1!3m2!1sfr!2sfr!4v1761907510712!5m2!1sfr!2sfr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === CTA FINALE === */}
      <section className="border-t bg-[#f2f7fb] site-page-section text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-semibold text-[#1E293B]">
            Vous préférez nous appeler directement ?
          </h2>
          <p className="mt-4 text-gray-700">
            Notre équipe est disponible du lundi au vendredi, de 9h à 18h.
          </p>
          <a
            href="tel:0673258816"
            className="site-page-button"
          >
            📞 06 73 25 88 16
          </a>
        </motion.div>
      </section>
    </main>
  );
}

// ✅ Pour que reCAPTCHA fonctionne :
// Dans Vercel > Settings > Environment Variables :
// NEXT_PUBLIC_RECAPTCHA_SITE_KEY = (clé site Google reCAPTCHA)
