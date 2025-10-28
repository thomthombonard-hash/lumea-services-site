"use client";

import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

export default function RecrutementPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 Ici tu pourras brancher ton backend ou ton envoi email
    alert("Merci pour votre candidature ! Nous vous contacterons rapidement.");
    setForm({ name: "", email: "", phone: "", message: "", file: null });
  };

  return (
    <main className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 bg-gradient-to-b from-[#FFFBEA] via-white to-white border-b scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h1
            {...fadeUp}
            className="text-4xl sm:text-5xl font-bold text-[#1E293B]"
          >
            Rejoignez <span className="text-[#F59E0B]">Luméa Services</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed"
          >
            Vous recherchez une entreprise locale, bienveillante et à taille
            humaine ?  
            Chez Luméa Services, nous croyons que le bien-être des salariés est
            la clé d’un service de qualité.
          </motion.p>

        </div>
      </section>

      {/* SECTION – VALEURS RH */}
      <section className="py-20 border-b bg-[#F9FAFB] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#1E293B] text-center mb-12"
          >
            Nos valeurs RH
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Respect & bienveillance",
                desc: "Nous valorisons un environnement sain où chacun est écouté, reconnu et respecté.",
                icon: "💛",
              },
              {
                title: "Formations & évolution",
                desc: "Nous accompagnons chaque salarié dans son développement professionnel.",
                icon: "📚",
              },
              {
                title: "Équilibre de vie",
                desc: "Des plannings stables et adaptés pour concilier travail et vie personnelle.",
                icon: "🌿",
              },
              {
                title: "Esprit d’équipe",
                desc: "Une équipe soudée, bienveillante et toujours prête à s’entraider.",
                icon: "🤝",
              },
              {
                title: "Sécurité & confort",
                desc: "Matériel, produits et équipements fournis pour garantir des conditions optimales.",
                icon: "🧽",
              },
              {
                title: "Reconnaissance",
                desc: "Nous valorisons l’investissement, la ponctualité et le professionnalisme, convaincus que la réussite collective passe par la reconnaissance de chacun.",
                icon: "🏅",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION – FORMULAIRE CANDIDATURE */}
      <section className="py-20 border-b bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-start">
          {/* FORM */}
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-semibold text-[#1E293B] mb-8">
              Postuler maintenant
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white border rounded-2xl shadow-sm p-6"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nom complet <span className="text-[#F59E0B]">*</span>
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-[#F59E0B]">*</span>
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
                  <label className="block text-sm font-medium mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06 00 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message ou présentation
                </label>
                <textarea
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-[#FBBF24]/40"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Expliquez-nous votre motivation..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  CV (PDF ou Word)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full rounded-xl border px-3 py-2 text-sm"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      file: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  id="rgpd"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border"
                />
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

              <button
                type="submit"
                className="w-full mt-4 rounded-2xl bg-[#FBBF24] px-5 py-3 text-white font-semibold shadow-md transition hover:scale-[1.02] hover:shadow-lg"
              >
                Envoyer ma candidature
              </button>
            </form>
          </motion.div>

          {/* ILLUSTRATION / TEXTE */}
          <motion.div {...fadeUp} className="space-y-8">
            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Pourquoi nous rejoindre ?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Luméa Services, c’est avant tout une aventure humaine.  
              Nous plaçons la qualité de vie au travail au centre de nos
              préoccupations, pour que chaque salarié trouve du sens et de la
              fierté dans son métier.
            </p>
            <ul className="mt-4 grid gap-2 list-disc pl-6 text-gray-700">
              <li>Entreprise locale et à taille humaine</li>
              <li>Accompagnement personnalisé</li>
              <li>Ambiance bienveillante et respectueuse</li>
              <li>Équipements professionnels fournis</li>
            </ul>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm">
              <Image
                src="\pexels-fauxels-3184418.jpg"
                alt="Équipe Luméa"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="border-t bg-gradient-to-b from-white to-[#FFFBEA] py-16 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-semibold text-[#1E293B]">
            Envie de rejoindre une équipe qui vous ressemble ?
          </h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            N’attendez plus ! Postulez en ligne ou contactez-nous pour en savoir
            plus sur nos opportunités à La Flèche et La Suze-sur-Sarthe.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg"
          >
            Nous contacter
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
