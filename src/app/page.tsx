"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Accueil – Version PREMIUM DYNAMIQUE
 * - Header transparent qui devient opaque au scroll
 * - Palette : Indigo (#4F46E5) / Doré (#FBBF24) / Gris clair (#F9FAFB)
 * - Sections alternées, dégradés, micro-interactions
 * - Framer Motion pour fade/slide-in au scroll
 * - CTA mobile fixe (Contact)
 * - Mini-formulaire qui redirige vers /contact avec champs préremplis
 */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [miniForm, setMiniForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const servicesParticuliers = [
    { title: "Service 1", desc: "Bref résumé du service pour les particuliers.", img: "/window.svg", href: "/services" },
    { title: "Service 2", desc: "Bref résumé du service pour les particuliers.", img: "/window.svg", href: "/services" },
    { title: "Service 3", desc: "Bref résumé du service pour les particuliers.", img: "/window.svg", href: "/services" },
    { title: "Service 4", desc: "Bref résumé du service pour les particuliers.", img: "/window.svg", href: "/services" },
    { title: "Service 5", desc: "Bref résumé du service pour les particuliers.", img: "/window.svg", href: "/services" },
  ];

  const servicesPros = [
    { title: "Service 1", desc: "Bref résumé du service pour les professionnels.", img: "/window.svg", href: "/services" },
    { title: "Service 2", desc: "Bref résumé du service pour les professionnels.", img: "/window.svg", href: "/services" },
    { title: "Service 3", desc: "Bref résumé du service pour les professionnels.", img: "/window.svg", href: "/services" },
    { title: "Service 4", desc: "Bref résumé du service pour les professionnels.", img: "/window.svg", href: "/services" },
    { title: "Service 5", desc: "Bref résumé du service pour les professionnels.", img: "/window.svg", href: "/services" },
  ];

  return (
    <div className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* HEADER dynamique */}
<header className="fixed inset-x-0 top-0 z-50 bg-[#1E293B]/95 backdrop-blur-sm border-b border-[#FBBF24]/20 shadow-md">
  <div className="flex w-full items-center justify-between px-6 lg:px-12 py-4">

    {/* Logo texte stylisé à gauche */}
    <Link href="/" className="flex items-center gap-2 text-white">
      <span className="text-2xl font-bold tracking-wide">
        <span className="text-[#FBBF24]">Luméa</span> Services
      </span>
    </Link>

{/* Navigation centrée */}
<nav className="hidden md:flex items-center gap-10 text-base font-medium text-white">
  <Link href="/a-propos" scroll={false} className="hover:text-[#FBBF24] transition">
    À propos
  </Link>
  <Link href="/services" scroll={false} className="hover:text-[#FBBF24] transition">
    Services
  </Link>
  <Link href="/contact" scroll={false} className="hover:text-[#FBBF24] transition">
    Contact
  </Link>
  <Link href="/recrutement" scroll={false} className="hover:text-[#FBBF24] transition">
    Recrutement
  </Link>
</nav>


    {/* Bloc téléphone + bouton devis alignés à droite */}
    <div className="hidden md:flex items-center gap-6">
      <a
        href="tel:0634200470"
        className="flex items-center gap-2 text-[#FBBF24] font-semibold text-lg hover:underline underline-offset-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#FBBF24]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.5l.7 2.8a2 2 0 01-.54 1.95L8.3 10.7a16 16 0 006 6l1.45-1.08a2 2 0 011.95-.54l2.8.7A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C9.82 22 2 14.18 2 5V4a1 1 0 011-1h0z"
          />
        </svg>
        06&nbsp;34&nbsp;20&nbsp;04&nbsp;70
      </a>

      <Link
        href="/contact"
        className="rounded-xl bg-[#FBBF24] px-5 py-2.5 text-base font-semibold text-[#1E293B] shadow-md transition hover:scale-[1.05] hover:shadow-lg"
      >
        Demander un devis
      </Link>
    </div>
  </div>
</header>


      {/* SECTION 1 — HERO avec gradient */}
      <section id="hero" className="relative isolate overflow-hidden pt-20 scroll-mt-24">
        {/* halo gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FFFBEA] via-white to-white" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <span className="inline-block rounded-full bg-white/90 px-5 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#1E293B] shadow-sm">
                Bienvenue chez <span className="text-[#92400E] font-bold">Luméa Services</span>
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                Des services à la personne & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#FDE68A]">aux professionnels</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-[#374151] font-medium leading-relaxed">
                Société centrée sur l’humain, <strong>Luméa Services</strong> place la qualité, la confiance et l’écoute au cœur de son engagement.  
                Nos valeurs reposent sur le respect, la bienveillance et la valorisation de nos collaborateurs,  
                afin de garantir un suivi rigoureux et des interventions toujours exemplaires.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#services" className="rounded-2xl bg-[#FBBF24] px-5 py-3 text-white shadow transition hover:scale-[1.02] hover:shadow-lg">
                  Découvrir nos services
                </Link>
                <Link href="#contact" className="rounded-2xl border px-5 py-3 transition hover:bg-gray-50">
                  Nous contacter
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border bg-white shadow-lg">
              {/* Image placeholder (remplacer plus tard) */}
              <Image src="/next.svg" alt="Présentation visuelle" fill className="object-contain p-10" />
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FFFBEA] via-white to-white" />
            </motion.div>
          </div>
        </div>
      </section>

{/* SECTION 2 — Présentation / Valeurs / Vision (fond doré clair) */}
<section id="presentation" className="relative border-t overflow-hidden scroll-mt-24">
  {/* Dégradé doré de fond */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FFFBEA] via-white to-white" />

  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-3">
      
      {/* Bloc texte principal */}
      <motion.div {...fadeUp} className="lg:col-span-1">
        <h2 className="text-3xl font-semibold text-gray-900">Qui sommes-nous ?</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          <strong>Luméa Services</strong> est une entreprise de nettoyage implantée à <strong>La Flèche</strong> et <strong>La Suze-sur-Sarthe</strong>,
          spécialisée dans le <strong>ménage professionnel</strong>, la <strong>vitrerie</strong>, le <strong>grand nettoyage</strong> et la <strong>remise en état</strong>.
          Fondée par <strong>Thomas Bonard</strong>, fort de <strong>8 années d’expérience</strong> dans le secteur, la société intervient
          dans un rayon de <strong>10 km</strong> autour de ses agences pour offrir des prestations de qualité aux particuliers comme aux professionnels.
        </p>
      </motion.div>

      {/* Bloc valeurs + vision */}
      <div className="space-y-8 lg:col-span-2">
        
        {/* Nos valeurs */}
        <motion.div {...fadeUp} className="rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Nos valeurs</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Chez Luméa Services, nous croyons que la réussite passe avant tout par l’humain.  
            Nous plaçons la <strong>bienveillance</strong>, la <strong>qualité d’intervention</strong> et la <strong>valorisation du personnel</strong> 
            au cœur de notre fonctionnement.  
            Chaque salarié est accompagné, écouté et reconnu, car un intervenant épanoui garantit la satisfaction durable du client.
          </p>
          <ul className="mt-4 grid list-disc gap-2 pl-6 text-gray-800 sm:grid-cols-2">
            <li>Respect & bienveillance</li>
            <li>Qualité & exigence</li>
            <li>Écoute & accompagnement</li>
            <li>Valorisation du personnel</li>
          </ul>
        </motion.div>

        {/* Vision du dirigeant */}
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#FEF3C7] via-white to-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-900">La vision du dirigeant</h3>
          <p className="mt-3 text-gray-800 leading-relaxed">
            <strong>“Investir dans l’humain, c’est investir dans la qualité.”</strong>  
            C’est autour de cette conviction que Luméa Services s’est construite.  
            Ici, chaque client sait que son investissement contribue directement à la valorisation des salariés,
            à la qualité du suivi et à la pérennité de la relation.  
            Pas de franchise, pas d’actionnaires : uniquement une entreprise locale, humaine et engagée.
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-700">
            <div className="h-10 w-10 overflow-hidden rounded-full border shadow">
              <Image src="/favicon.ico" alt="Dirigeant" width={40} height={40} />
            </div>
            <div>
              <p className="font-medium">Thomas Bonard</p>
              <p>Dirigeant – Luméa Services</p>
            </div>
          </div>

          {/* Halo lumineux subtil */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#FDE68A]/60 to-[#FBBF24]/30 blur-2xl" />
        </motion.div>
      </div>
    </div>
  </div>
</section>



      {/* SECTION 3 — Services */}
      <section id="services" className="border-t bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-semibold">Nos services</h2>
              <p className="mt-2 text-gray-600">Particuliers & Professionnels</p>
            </motion.div>
            <motion.div {...fadeUp}>
              <Link href="/services" className="rounded-xl border px-4 py-2 text-sm transition hover:bg-gray-50">Voir tout</Link>
            </motion.div>
          </div>

          {/* Particuliers */}
          <motion.div {...fadeUp} className="mt-6">
            <h3 className="text-xl font-semibold">Pour les particuliers</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {servicesParticuliers.map((s, i) => (
                <article key={`p-${i}`} className="group rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
                    <Image src={s.img} alt={s.title} fill className="object-contain p-6 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold">{s.title}</h4>
                  <p className="mt-1 line-clamp-3 text-sm text-gray-600">{s.desc}</p>
                  <Link href={s.href} className="mt-3 inline-flex items-center text-sm font-medium text-[#F59E0B]">
                    Voir le détail
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Pros */}
          <motion.div {...fadeUp} className="mt-12">
            <h3 className="text-xl font-semibold">Pour les professionnels</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {servicesPros.map((s, i) => (
                <article key={`b-${i}`} className="group rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
                    <Image src={s.img} alt={s.title} fill className="object-contain p-6 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold">{s.title}</h4>
                  <p className="mt-1 line-clamp-3 text-sm text-gray-600">{s.desc}</p>
                  <Link href={s.href} className="mt-3 inline-flex items-center text-sm font-medium text-[#F59E0B]">
                    Voir le détail
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — Société & Contact */}
      <section id="contact" className="border-t bg-[#F9FAFB] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: company info */}
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-semibold">La société & Contact</h2>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat, lacus ut luctus gravida, nibh nulla dictum lectus, id mattis dolor elit vitae nunc.
              </p>
              <div className="mt-6 space-y-3 text-gray-700">
                <p><span className="font-medium">Adresse :</span> 4 Rue Fontevrault, 72200 La Flèche</p>
                <p><span className="font-medium">Téléphone :</span> 06 34 20 04 70</p>
                <p><span className="font-medium">Email :</span> bonardthomas@yahoo.fr</p>
              </div>
              <div className="mt-8">
                <Link href="/mentions-legales" className="text-sm underline underline-offset-4">Mentions légales</Link>
                <span className="mx-2 text-gray-300">•</span>
                <Link href="/politique-confidentialite" className="text-sm underline underline-offset-4">Politique de confidentialité</Link>
              </div>
            </motion.div>

            {/* Right: small contact form teaser */}
            <motion.div {...fadeUp} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Un projet ? Écrivez-nous</h3>
              <p className="mt-2 text-sm text-gray-600">Formulaire rapide — pour une demande complète, rendez-vous sur la page <Link href="/contact" className="underline">Contact</Link>.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!miniForm.name || !miniForm.email || !miniForm.message) {
                    alert("Merci de renseigner tous les champs.");
                    return;
                  }
                  const q = new URLSearchParams(miniForm as any).toString();
                  window.location.href = `/contact?${q}`;
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium">Votre nom</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                    value={miniForm.name}
                    onChange={(e) => setMiniForm({ ...miniForm, name: e.target.value })}
                    placeholder="Marie Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Votre email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                    value={miniForm.email}
                    onChange={(e) => setMiniForm({ ...miniForm, email: e.target.value })}
                    placeholder="vous@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Message</label>
                  <textarea
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                    rows={4}
                    value={miniForm.message}
                    onChange={(e) => setMiniForm({ ...miniForm, message: e.target.value })}
                    placeholder="Expliquez-nous votre besoin..."
                    required
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <input id="rgpd" type="checkbox" className="h-4 w-4 rounded border" required />
                  <label htmlFor="rgpd">
                    J’accepte le traitement de mes données (voir la <Link href="/politique-confidentialite" className="underline">politique de confidentialité</Link>).
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" className="rounded-2xl bg-[#FBBF24] px-5 py-3 text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg hover:bg-[#F59E0B]">
                    Envoyer la demande rapide
                  </button>
                  <Link href="/contact" className="rounded-2xl border px-5 py-3 transition hover:bg-gray-50">Formulaire complet</Link>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Recrutement */}
      <section id="recrutement" className="border-t bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-semibold">Rejoindre Luméa Services</h2>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              </p>
              <ul className="mt-6 grid list-disc gap-2 pl-6 text-gray-700">
                <li>Ambiance bienveillante & équipe à taille humaine</li>
                <li>Formations & montées en compétences</li>
                <li>Matériel & tenue fournis</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/recrutement" className="rounded-2xl bg-[#FBBF24] px-5 py-3 text-white shadow transition hover:scale-[1.02] hover:shadow-lg">
                  Postuler maintenant
                </Link>
                <Link href="#services" className="rounded-2xl border px-5 py-3 transition hover:bg-gray-50">
                  Voir nos métiers
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-white shadow">
              {/* Placeholder illustration */}
              <Image src="/vercel.svg" alt="Équipe et recrutement" fill className="object-contain p-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOT CTA */}
      <section className="border-t bg-[#F9FAFB]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-lg font-medium">Prêt à démarrer ? Discutons de votre besoin.</p>
            <div className="flex gap-3">
              <Link href="/contact" className="rounded-2xl bg-[#FBBF24] px-5 py-3 text-white shadow transition hover:scale-[1.02] hover:shadow-lg">Demander un devis</Link>
              <Link href="/services" className="rounded-2xl border px-5 py-3 transition hover:bg-gray-50">Voir les services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA MOBILE FIXE */}
      <Link href="/contact" className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#FBBF24] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] md:hidden">
        Contact rapide
      </Link>
    </div>
  );
}

