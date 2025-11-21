// Updated ContactPage with dataLayer push for contact_submit_success

"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen bg-white text-gray-900 scroll-smooth">
      {/* === HERO === */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h1
            {...fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1E293B]"
          >
            Contactez <span className="text-[#F59E0B]">Luméa Services</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed"
          >
            Une question, un devis ou une candidature spontanée ?{" "}
            Remplissez le formulaire ci-dessous, nous vous répondrons sous 24 à 48h jours ouvrés.
          </motion.p>

          <motion.div {...fadeUp} className="mt-10">
            <Image
              src="/optimized/pexels-mikhail-nilov-7681302.webp"
              alt="Contact Luméa Services"
              width={1000}
              height={500}
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="mx-auto rounded-3xl shadow-lg border object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* === FORMULAIRE === */}
      <section className="py-20 border-b bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-start">
          {/* FORMULAIRE */}
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-semibold text-[#1E293B] mb-8">
              Envoyez-nous un message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white border rounded-2xl shadow-sm p-6"
            >
              <div id="prenom" className="scroll-mt-[7rem]">
                <label className="block text-sm font-medium mb-1">
                  Votre nom <span className="text-[#F59E0B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Marie Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Votre email <span className="text-[#F59E0B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="vous@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sujet</label>
                <input
                  type="text"
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message <span className="text-[#F59E0B]">*</span>
                </label>
                <textarea
                  required
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
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
                    className="underline text-[#F59E0B]"
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
                className={`w-full mt-4 rounded-2xl px-5 py-3 text-white font-semibold shadow-md transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FBBF24] hover:scale-[1.02] hover:shadow-lg"
                }`}
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#FBBF24]/40 shadow-lg shadow-[#FBBF24]/10">
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
      <section className="border-t bg-[#F9FAFB] py-16 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-semibold text-[#1E293B]">
            Vous préférez nous appeler directement ?
          </h2>
          <p className="mt-4 text-gray-700">
            Notre équipe est disponible du lundi au vendredi, de 9h à 18h.
          </p>
          <a
            href="tel:0673258816"
            className="inline-block mt-6 rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg"
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
