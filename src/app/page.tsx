"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls, useMotionValue, easeOut } from "framer-motion";

/** Animation d’apparition commune */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

function CarouselSection() {
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentX = useRef(0);

  const servicesParticuliers = [
    {
      title: "Ménage à Domicile",
      desc: "Retrouvez un intérieur propre et soigné grâce à nos prestations de ménage sur mesure : entretien régulier ou ponctuel, selon vos besoins et votre rythme de vie.",
      img: "/optimized/ménage.webp",
      href: "/services",
    },
    {
      title: "Grand Nettoyage",
      desc: "Remise en état complète après travaux, déménagement ou longue absence. Nous redonnons éclat et fraîcheur à votre logement du sol au plafond.",
      img: "/optimized/gros.webp",
      href: "/services",
    },
    {
      title: "Vitrerie",
      desc: "Des vitres toujours impeccables, sans traces ni reflets : nos intervenants assurent un nettoyage soigné de vos fenêtres, baies vitrées et vérandas.",
      img: "/optimized/vitrepart.webp",
      href: "/services",
    },
  ];

  const duplicatedServices = [...servicesParticuliers, ...servicesParticuliers];

  useEffect(() => {
    if (!containerRef.current) return;

    const totalWidth = containerRef.current.scrollWidth / 2;

    const loop = (startX = 0) => {
      const distance = totalWidth + startX;
      const duration = (distance / totalWidth) * 30;

      controls.start({
        x: [startX, -totalWidth],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    loop();

    const container = containerRef.current;

    const stopScroll = () => {
      controls.stop();
      currentX.current = x.get();
    };

    const startScroll = () => {
      loop(currentX.current);
    };

    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, [controls, x]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-8"
        animate={controls}
        style={{ x }}
      >
        {duplicatedServices.map((s, i) => (
          <Link
            key={`srv-${i}`}
            href={s.href}
            className="relative min-w-[300px] sm:min-w-[400px] lg:min-w-[450px] overflow-hidden rounded-3xl shadow-lg group block"
          >
            <div className="relative h-64 w-full">
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <h3 className="absolute bottom-5 left-6 text-2xl font-semibold text-white drop-shadow-md">
                {s.title}
              </h3>
            </div>
            <div className="bg-white p-5">
              <p className="text-gray-700 text-sm leading-relaxed">{s.desc}</p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-[#F59E0B] group-hover:underline">
                Voir le détail →
              </span>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FFFDF7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FFFDF7] to-transparent" />
    </div>
  );
}

/** === Composant principal === */
export default function HomePage() {
  const [miniForm, setMiniForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* === SECTION 1 — HERO === */}
      <section
        id="hero"
        className="relative isolate overflow-hidden pt-28 sm:pt-24 lg:pt-20 scroll-mt-24"
      >
        {/* Fond dégradé */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FFFBEA] via-white to-white" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Texte */}
            <motion.div {...fadeUp}>
              <span className="inline-block rounded-full bg-white/90 px-5 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#1E293B] shadow-sm">
                Bienvenue chez <span className="text-[#92400E] font-bold">Luméa Services</span>
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Des services à la personne{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#FDE68A]">
                  pour votre quotidien
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-[#374151] font-medium leading-relaxed">
                Société de ménage centrée sur l’humain, <strong>Luméa Services</strong>, située à La Flèche place la qualité, la confiance et l’écoute au cœur de son engagement.
                Nos valeurs reposent sur le respect, la bienveillance et la valorisation de nos collaborateurs, afin de garantir un suivi rigoureux et des interventions exemplaires.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#services"
                  className="rounded-2xl bg-[#FBBF24] px-5 py-3 text-white shadow transition hover:scale-[1.02] hover:shadow-lg"
                >
                  Découvrir nos services 
                </Link>
                <Link
                  href="#contact"
                  className="rounded-2xl border px-5 py-3 transition hover:bg-gray-50"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              {...fadeUp}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-white shadow-lg"
            >
            <Image
              src="/optimized/pouss.webp"
              alt="Présentation visuelle"
              fill
              priority
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center scale-110 transition-transform duration-700"
            />

            </motion.div>
          </div>
        </div>
      </section>

      {/* === SECTION 2 — PRÉSENTATION === */}
      <section
        id="presentation"
        className="relative border-t overflow-hidden scroll-mt-24 bg-gradient-to-b from-[#FFFBEA] via-white to-[#F9FAFB]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.2),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Texte principal */}
            <motion.div {...fadeUp} className="space-y-6">
              <h2 className="text-4xl font-bold text-[#1E293B]">Qui sommes-nous ?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Luméa Services</strong>, entreprise indépendante implantée à <strong>La Flèche</strong>,
                intervient à <strong>La Suze-sur-Sarthe</strong> et dans les communes alentour pour l’entretien de votre domicile.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Fondée par <strong>Thomas Bonard</strong>, fort de <strong>plus de 8 ans d’expérience</strong> dans le service à la personne,
                Luméa Services s’appuie sur des valeurs humaines fortes : la <strong>proximité</strong>, la <strong>confiance</strong> et la
                <strong> valorisation des équipes</strong>.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/a-propos" className="rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow transition hover:scale-[1.03] hover:shadow-lg">
                  En savoir plus
                </Link>
                <Link href="/services" className="rounded-2xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
                  Découvrir nos services
                </Link>
              </div>
            </motion.div>

            {/* Carte valeurs */}
            <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl border bg-white shadow-xl p-8">
              <div className="absolute -top-8 -right-8 h-40 w-40 bg-gradient-to-br from-[#FDE68A]/70 to-[#FBBF24]/40 blur-2xl rounded-full" />
              <h3 className="text-2xl font-semibold text-[#1E293B] mb-4">Nos valeurs au quotidien</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous croyons que la qualité passe par le respect et la valorisation des intervenants. L’humain est au centre de chaque action.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                <li>Respect & bienveillance</li>
                <li>Exigence & qualité</li>
                <li>Écoute & accompagnement</li>
                <li>Valorisation du personnel</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

{/* === OUTIL GRATUIT — QUI PEUT M’AIDER ? === */}
<section className="relative overflow-hidden border-t bg-[#1E293B]">
  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
  <div className="pointer-events-none absolute right-10 top-10 h-44 w-44 rounded-full border border-[#FBBF24]/20" />

  <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <motion.div
      {...fadeUp}
      className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-14"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#FBBF24]">
          Un service gratuit Luméa
        </p>

        <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
          Vous ne savez pas qui peut vous aider ?
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
          Hospitalisation, perte d’autonomie, handicap, difficulté temporaire,
          transport, repas ou aide à domicile : quelques questions suffisent
          pour identifier les interlocuteurs à contacter et savoir par où commencer.
        </p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/70">
          <span>✓ Gratuit</span>
          <span>✓ Sans inscription</span>
          <span>✓ Réponses non enregistrées</span>
        </div>
      </div>

      <div className="lg:text-right">
        <Link
          href="/qui-peut-maider"
          className="inline-flex min-h-[58px] items-center justify-center rounded-full bg-[#FBBF24] px-7 py-4 text-lg font-bold text-[#1E293B] shadow-lg shadow-black/15 transition hover:scale-[1.02] hover:bg-[#F59E0B]"
        >
          Qui peut m’aider ? →
        </Link>

        <p className="mt-3 text-sm text-white/55">
          Sarthe · Maine-et-Loire · Mayenne
        </p>
      </div>
    </motion.div>
  </div>
</section>

{/* === SECTION 3 — CARROUSEL INFINI DES SERVICES (VERSION AMÉLIORÉE) === */}
<section
  id="services"
  className="relative isolate overflow-hidden scroll-mt-24 border-t bg-gradient-to-br from-[#FFF7E6] via-[#FFFDF7] to-[#F9FAFB]"
>
  {/* Fond décoratif doux */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.25),transparent_70%)]" />
  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/90 via-[#FFFBEA]/80 to-[#F9FAFB]" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    {/* Titre */}
    <motion.div {...fadeUp} className="text-center mb-14 space-y-4">
      <h2 className="text-4xl font-bold text-[#1E293B]">
        À votre service —{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FDE68A]">
          Votre quotidien à domicile
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Découvrez nos prestations de ménage et d’aide à domicile pour votre maison ou votre appartement à La Flèche et dans les environs.
      </p>
    </motion.div>

    {/* Badges catégories */}
    <motion.div
      {...fadeUp}
      className="flex justify-center gap-4 mb-12 flex-wrap"
    >
      <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
        ✅ Interventions sur mesure
      </span>
      <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
        🧾 Services éligibles au crédit d’impôt
      </span>
      <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#FBBF24]/20 text-[#92400E]">
        🌿 Engagement local & qualité humaine
      </span>
    </motion.div>

    {/* Carrousel fluide avec pause/reprise au survol */}
    <CarouselSection />

        {/* CTA cliquable */}
    <div className="mt-20 text-center space-y-3">
      <Link
        href="/services"
        className="inline-block rounded-3xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-10 py-4 text-white font-semibold shadow-lg shadow-[#F59E0B]/30 transition-all hover:scale-[1.06] hover:shadow-xl hover:from-[#FBBF24] hover:to-[#F59E0B]"
      >
        ✨ Explorer tous nos services
      </Link>

      <p className="text-sm text-gray-600">
        Des questions sur nos prestations de ménage et de nettoyage ?{" "}
        <Link
          href="/faq"
          className="font-semibold text-[#F59E0B] underline underline-offset-4 hover:text-[#92400E]"
        >
          Consulter la FAQ
        </Link>
      </p>
    </div>
  </div>
</section>


{/* === SECTION 4 — SOCIÉTÉ & CONTACT (RELOOKÉE) === */}
<section
  id="contact"
  className="relative isolate overflow-hidden scroll-mt-24 border-t bg-gradient-to-b from-[#FFFBEA] via-white to-[#F9FAFB]"
>
  {/* Halo doré subtil */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.25),transparent_70%)]" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2 items-start">
      
      {/* === Bloc société === */}
      <motion.div {...fadeUp} className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-[#1E293B] mb-3">
            Contact
          </h2>
          <div className="h-1 w-20 bg-[#FBBF24] rounded-full mb-6" />
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Luméa Services</strong> est une entreprise de proximité ancrée à 
            <strong> La Flèche</strong> et <strong>La Suze-sur-Sarthe</strong>.  
            Nous mettons un point d’honneur à offrir des prestations de ménage sur mesure,
            où qualité rime avec confiance et accompagnement durable.
          </p>
        </div>

        <div className="space-y-4 text-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24]">
              📍
            </div>
            <p><span className="font-semibold">Adresse :</span> 4 Rue Fontevrault, 72200 La Flèche</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24]">
              ☎️
            </div>
            <p><span className="font-semibold">Téléphone :</span> 06 73 25 88 16</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24]/10 text-[#FBBF24]">
              ✉️
            </div>
            <p><span className="font-semibold">Email :</span> bonard@lumea-services.fr</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
          <Link href="/mentions-legales" className="underline underline-offset-4 hover:text-[#FBBF24]">
            Mentions légales
          </Link>
          <span className="mx-2 text-gray-300">•</span>
          <Link href="/politique-confidentialite" className="underline underline-offset-4 hover:text-[#FBBF24]">
            Politique de confidentialité
          </Link>
        </div>
      </motion.div>

      {/* === Bloc formulaire === */}
      <motion.div
        {...fadeUp}
        className="relative rounded-3xl border border-[#FBBF24]/30 bg-white p-8 shadow-lg shadow-[#FBBF24]/5"
      >
        {/* Halo décoratif */}
        <div className="absolute -top-10 -right-10 h-48 w-48 bg-gradient-to-br from-[#FBBF24]/40 to-transparent blur-2xl rounded-full" />

        <h3 className="text-2xl font-semibold text-[#1E293B] mb-3">Un projet ? Parlons-en</h3>
        <p className="text-gray-600 mb-6">
          Ce formulaire rapide nous permet de mieux comprendre votre besoin.  
          Pour une demande complète, rendez-vous sur la page{" "}
          <Link href="/contact#prenom" className="underline hover:text-[#FBBF24]">Contact</Link>.
        </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!miniForm.name || !miniForm.email || !miniForm.message) {
                alert("Merci de renseigner tous les champs.");
                return;
              }

              try {
                const fd = new FormData();
                fd.append("formType", "contact"); // ou “mini-contact” si tu veux le distinguer
                fd.append("name", miniForm.name);
                fd.append("email", miniForm.email);
                fd.append("subject", "Demande rapide (page d'accueil)");
                fd.append("message", miniForm.message);

                const res = await fetch("/api/form", {
                  method: "POST",
                  body: fd,
                });

                if (!res.ok) throw new Error("Erreur serveur");
                alert("✅ Merci pour votre message ! Nous vous répondrons rapidement.");
                setMiniForm({ name: "", email: "", message: "" });
              } catch (err) {
                console.error("Erreur lors de l’envoi :", err);
                alert("❌ Une erreur est survenue. Merci de réessayer plus tard.");
              }
            }}
            className="space-y-5"
>

          <div>
            <label className="block text-sm font-medium">Votre nom</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#FBBF24]/50"
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
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#FBBF24]/50"
              value={miniForm.email}
              onChange={(e) => setMiniForm({ ...miniForm, email: e.target.value })}
              placeholder="vous@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#FBBF24]/50"
              rows={4}
              value={miniForm.message}
              onChange={(e) => setMiniForm({ ...miniForm, message: e.target.value })}
              placeholder="Expliquez-nous votre besoin..."
              required
            />
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-500">
            <input id="rgpd" type="checkbox" className="mt-1 h-4 w-4 rounded border" required />
            <label htmlFor="rgpd">
              J’accepte le traitement de mes données (voir la{" "}
              <Link href="/politique-confidentialite" className="underline hover:text-[#FBBF24]">
                politique de confidentialité
              </Link>).
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.02] hover:shadow-lg hover:bg-[#F59E0B]"
            >
              Envoyer la demande rapide
            </button>
            <Link
              href="/contact"
              className="rounded-2xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Formulaire complet
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  </div>
</section>


{/* === SECTION 5 — RECRUTEMENT (VERSION PREMIUM) === */}
<section
  id="recrutement"
  className="relative isolate overflow-hidden scroll-mt-24 border-t bg-gradient-to-b from-[#FFFBEA] via-white to-[#F9FAFB]"
>
  {/* Halo doré dynamique */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.25),transparent_70%)]" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div className="grid items-center gap-16 lg:grid-cols-2">
      {/* Bloc gauche : texte */}
      <motion.div {...fadeUp} className="space-y-6">
        <h2 className="text-4xl font-bold text-[#1E293B]">
          Rejoindre <span className="text-[#F59E0B]">Luméa Services</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Chez <strong>Luméa Services</strong>, nous croyons que le bien-être de nos clients
          commence par celui de nos collaborateurs.  
          Nous offrons un environnement de travail respectueux, des formations continues
          et des perspectives d’évolution concrètes.
        </p>

        <ul className="mt-6 grid gap-3 text-gray-800">
          <li className="flex items-start gap-3">
            <span className="text-[#FBBF24] mt-1">🌿</span>
            Ambiance bienveillante & équipe à taille humaine
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FBBF24] mt-1">🎓</span>
            Formations & montées en compétences
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FBBF24] mt-1">🧤</span>
            Matériel & tenue fournis pour des interventions confortables
          </li>
        </ul>

        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            href="/recrutement"
            className="rounded-2xl bg-[#FBBF24] px-6 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg hover:bg-[#F59E0B]"
          >
            Postuler maintenant
          </Link>
          
        </div>
      </motion.div>

      {/* Bloc droit : visuel équipe */}
      <motion.div
        {...fadeUp}
        className="relative h-80 md:h-[450px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
      >
      <Image
        src="/optimized/pexels-fauxels-3184418.webp"
        alt="Présentation visuelle"
        fill
        priority
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center scale-110 transition-transform duration-700"
      />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl" />
        <div className="absolute bottom-5 left-6 text-white drop-shadow-lg">
        </div>
      </motion.div>
    </div>
  </div>
</section>

  {/* === SECTION 6 — FOOT CTA (MODERNE & IMPACTANT) === */}
  <section className="relative border-t bg-gradient-to-r from-[#FFFBEA] via-[#FFFDF7] to-[#F9FAFB]">
    {/* Halo décoratif */}
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15),transparent_70%)]" />

    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
      <motion.div {...fadeUp} className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
          Prêt à <span className="text-[#F59E0B]">démarrer l’aventure</span> avec Luméa Services ?
        </h2>
        <p className="text-lg text-gray-700">
          Notre équipe est à votre écoute pour l’entretien de votre domicile
          et pour vous accompagner dans votre quotidien.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="#contact"
            className="rounded-2xl bg-[#FBBF24] px-8 py-3 text-white font-semibold shadow-md transition hover:scale-[1.03] hover:shadow-lg hover:bg-[#F59E0B]"
          >
            Demander un devis
          </Link>
          <Link
            href="/services"
            className="rounded-2xl border border-gray-300 px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Voir nos services
          </Link>
        </div>
      </motion.div>
    </div>
  </section>



    </div>
  );
}
