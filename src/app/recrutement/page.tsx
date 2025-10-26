"use client";

import { useState } from "react";

export default function RecrutementPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // ✅ Ajouter ici le reCAPTCHA
    try {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );
      data.append("g-recaptcha-response", token);
    } catch {
      console.warn("reCAPTCHA non chargé ou clé absente");
    }

    try {
      const response = await fetch("https://formspree.io/f/movpvqze", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error("Erreur d'envoi");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Rejoignez Luméa Services
      </h1>
      <p className="text-center mb-6 text-gray-600">
        Déposez votre candidature pour rejoindre notre équipe !  
        Nous recherchons régulièrement des intervenants à domicile qualifiés et motivés.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
        <input
          type="text"
          name="nom"
          required
          placeholder="Votre nom complet"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Votre adresse e-mail"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="tel"
          name="telephone"
          placeholder="Votre téléphone"
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Votre message ou vos disponibilités"
          className="border border-gray-300 rounded-md p-2"
        ></textarea>

        <label className="text-sm text-gray-700">
          Joindre votre CV (PDF uniquement)
        </label>
        <input
          type="file"
          name="file"
          accept=".pdf"
          required
          className="border border-gray-300 rounded-md p-2"
        />

        {/* 🧩 Mention RGPD */}
        <p className="text-sm text-gray-500 mt-2">
          En envoyant ce formulaire, j’accepte que mes informations soient utilisées uniquement
          dans le cadre de ma candidature, conformément à la{" "}
          <a href="/politique-confidentialite" className="text-blue-700 underline">
            politique de confidentialité
          </a>.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {status === "sending" ? "Envoi en cours..." : "Envoyer ma candidature"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center mt-2">
            ✅ Candidature envoyée avec succès ! Nous reviendrons vers vous rapidement.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-2">
            ❌ Une erreur est survenue. Merci de réessayer.
          </p>
        )}
      </form>
    </section>
  );
}
