"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOut },
};

const teamMembers = [
  {
    name: "Thomas",
    img: "/optimized/Thomas.webp",
    role: "Gérant",
  },
  {
    name: "Samantha",
    img: "/optimized/Samantha.webp",
    role: "Référente et animation",
  },
  {
    name: "Pascal",
    img: "/optimized/Pascal.webp",
    role: "Laveur de vitres",
  },
  {
    name: "Dominique",
    img: "/optimized/Dominique.webp",
    role: "Aide ménagère",
  },
  {
    name: "Candice",
    img: "/optimized/Candice.webp",
    role: "Aide ménagère",
  },
  {
    name: "Valérie",
    img: "/optimized/Valérie.webp",
    role: "Aide ménagère",
  },
  {
    name: "Gwendoline",
    img: "/optimized/Gwendoline.webp",
    role: "Aide ménagère",
  },
];

const infiniteTeamMembers = [
  ...teamMembers,
  ...teamMembers,
  ...teamMembers,
];

export default function AboutPage() {
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const resettingScroll = useRef(false);

  /*
   * Au chargement, on se place sur la copie du milieu.
   * Cela permet ensuite d'aller à gauche ou à droite à l'infini.
   */
  useEffect(() => {
    const container = teamScrollRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      const cards = container.querySelectorAll<HTMLElement>("[data-team-card]");

      if (cards.length < teamMembers.length * 2) return;

      const firstCard = cards[0];
      const middleFirstCard = cards[teamMembers.length];

      const oneLoopWidth =
        middleFirstCard.offsetLeft - firstCard.offsetLeft;

      container.scrollLeft = oneLoopWidth;
    });
  }, []);

  /*
   * Calcule la largeur d'une carte + l'espace entre deux cartes.
   * Comme ça, un clic = exactement une personne.
   */
  const getCardStep = () => {
    const container = teamScrollRef.current;

    if (!container) return 284;

    const cards =
      container.querySelectorAll<HTMLElement>("[data-team-card]");

    if (cards.length < 2) return 284;

    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  /*
   * Clic gauche / droite.
   * Aucun déplacement automatique.
   */
  const scrollTeam = (direction: "left" | "right") => {
    const container = teamScrollRef.current;

    if (!container) return;

    const step = getCardStep();

    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  /*
   * Quand on arrive trop loin dans une copie de la liste,
   * on se replace instantanément au même endroit dans la copie centrale.
   *
   * Visuellement, rien ne change car les cartes sont identiques.
   */
  const handleTeamScroll = () => {
    const container = teamScrollRef.current;

    if (!container || resettingScroll.current) return;

    const cards =
      container.querySelectorAll<HTMLElement>("[data-team-card]");

    if (cards.length < teamMembers.length * 3) return;

    const firstCard = cards[0];
    const middleFirstCard = cards[teamMembers.length];

    const oneLoopWidth =
      middleFirstCard.offsetLeft - firstCard.offsetLeft;

    if (container.scrollLeft < oneLoopWidth * 0.5) {
      resettingScroll.current = true;

      container.scrollLeft += oneLoopWidth;

      requestAnimationFrame(() => {
        resettingScroll.current = false;
      });
    }

    if (container.scrollLeft > oneLoopWidth * 1.5) {
      resettingScroll.current = true;

      container.scrollLeft -= oneLoopWidth;

      requestAnimationFrame(() => {
        resettingScroll.current = false;
      });
    }
  };

  return (
    <main className="site-page">

      {/* HERO SECTION */}
      <section className="site-page-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div {...fadeUp} className="text-center">

            <h1 className="text-4xl font-bold sm:text-5xl text-[#1E293B]">
              À propos de{" "}
              <span className="site-page-accent">
                Luméa Services
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
              Entreprise locale et humaine située à La Flèche, Luméa Services
              place la confiance, la proximité et la valorisation du personnel
              au cœur de sa démarche. Découvrez notre histoire, nos valeurs et
              notre vision.
            </p>

            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-700">
              Vous avez des questions sur nos prestations de ménage et de
              nettoyage ?{" "}

              <Link
                href="/faq"
                className="font-semibold text-[#0d4772] underline underline-offset-4 hover:text-[#0d2446]"
              >
                Consultez notre FAQ
              </Link>
              .
            </p>

          </motion.div>

        </div>
      </section>


      {/* SECTION — NOTRE HISTOIRE */}
      <section className="relative site-page-section border-b bg-white scroll-mt-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">

          <motion.div {...fadeUp}>

            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Notre histoire
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Après plusieurs années d’expérience dans les services à la
              personne, <strong>Thomas Bonard</strong> a souhaité créer{" "}
              <strong>Luméa Services</strong> : une entreprise à taille humaine
              où la proximité, la bienveillance et la qualité du travail
              priment avant tout. Implantée à <strong>La Flèche</strong> et{" "}
              <strong>La Suze-sur-Sarthe</strong>, la société met un point
              d’honneur à répondre avec rigueur aux besoins de chacun.
            </p>

            <p className="mt-3 text-gray-700 leading-relaxed">
              En valorisant le professionnalisme et l’engagement de ses
              intervenants, <strong>Luméa Services</strong> construit jour
              après jour une relation de confiance durable avec ses clients,
              fondée sur le respect et la satisfaction mutuelle.
            </p>

          </motion.div>


          <motion.div
            {...fadeUp}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm"
          >

            <Image
              src="/optimized/pexels-fauxels-3183150.webp"
              alt="Locaux Luméa Services"
              fill
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />

          </motion.div>

        </div>

      </section>


      {/* SECTION — NOS VALEURS */}
      <section className="relative site-page-section border-b bg-[#f2f7fb] scroll-mt-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >

            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Nos valeurs
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Notre philosophie repose sur la conviction que la réussite d’une
              entreprise de services dépend avant tout du bien-être de ses
              salariés. C’est pourquoi chaque collaborateur est accompagné,
              écouté et valorisé.
            </p>

          </motion.div>


          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Bienveillance",
                desc: "Un climat de respect mutuel, d’écoute et de compréhension à chaque niveau de l’entreprise.",
                icon: "🤝",
              },
              {
                title: "Qualité",
                desc: "Des prestations rigoureuses et un suivi personnalisé pour chaque client, sans compromis.",
                icon: "✨",
              },
              {
                title: "Confiance",
                desc: "Une relation de transparence et de fidélité durable entre nos équipes et nos clients.",
                icon: "💛",
              },
              {
                title: "Valorisation",
                desc: "Nous investissons dans nos salariés, leur confort, leur matériel et leur évolution.",
                icon: "🌱",
              },
            ].map((value) => (

              <motion.div
                key={value.title}
                {...fadeUp}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition"
              >

                <div className="text-4xl mb-4">
                  {value.icon}
                </div>

                <h3 className="text-lg font-semibold">
                  {value.title}
                </h3>

                <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                  {value.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* SECTION — NOTRE VISION */}
      <section className="site-page-section bg-[#fcf3e2]">

        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">

          <motion.div
            {...fadeUp}
            className="order-2 lg:order-1"
          >

            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Notre vision
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              “Investir dans l’humain, c’est investir dans la qualité.”
              Cette phrase est le pilier de notre engagement. Luméa Services
              aspire à bâtir un cercle vertueux où la satisfaction des
              collaborateurs crée naturellement celle des clients.
            </p>

            <p className="mt-3 text-gray-700 leading-relaxed">
              Nous croyons en un modèle local, durable, sans intermédiaires
              inutiles, où chaque client connaît son intervenant et chaque
              salarié se sent reconnu.
            </p>

            <Link
              href="/contact"
              className="site-page-button"
            >
              Nous contacter
            </Link>

          </motion.div>


          <motion.div
            {...fadeUp}
            className="relative order-1 lg:order-2 aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm"
          >

            <Image
              src="/optimized/pexels-fauxels-3184418.webp"
              alt="Vision de l'entreprise"
              fill
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

          </motion.div>

        </div>

      </section>


      {/* SECTION — ÉQUIPE */}
      <section className="relative site-page-section bg-[#f2f7fb]">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            {...fadeUp}
            className="text-center mb-12 max-w-3xl mx-auto"
          >

            <h2 className="text-3xl font-semibold text-[#1E293B]">
              Une équipe engagée et souriante
            </h2>

            <p className="mt-4 text-gray-700">
              Derrière chaque intervention, il y a une équipe passionnée,
              disponible et attachée à la qualité du service rendu.
            </p>

          </motion.div>


          <div className="relative">

            {/* FLÈCHE GAUCHE */}
            <button
              type="button"
              onClick={() => scrollTeam("left")}
              aria-label="Voir le membre précédent"
              className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                z-20
                h-11
                w-11
                rounded-full
                bg-white
                border
                shadow-md
                flex
                items-center
                justify-center
                text-3xl
                text-[#1E293B]
                hover:shadow-lg
                hover:bg-gray-50
                transition
              "
            >
              ‹
            </button>


            {/* CARROUSEL MANUEL INFINI */}
            <div
              ref={teamScrollRef}
              onScroll={handleTeamScroll}
              className="
                flex
                gap-6
                overflow-x-auto
                snap-x
                snap-mandatory
                px-14
                py-3
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {infiniteTeamMembers.map((member, index) => (

                <div
                  key={`${member.name}-${index}`}
                  data-team-card
                  className="
                    flex-none
                    w-[240px]
                    sm:w-[260px]
                    snap-center
                    flex
                    flex-col
                    items-center
                    text-center
                    rounded-2xl
                    border
                    bg-white
                    p-6
                    shadow-sm
                    hover:shadow-md
                    transition-shadow
                  "
                >

                  <div className="relative h-32 w-32 overflow-hidden rounded-full border mb-4">

                    <Image
                      src={member.img}
                      alt={`Photo ${member.name}`}
                      fill
                      quality={70}
                      sizes="128px"
                      className="object-cover"
                    />

                  </div>

                  <h3 className="text-lg font-semibold text-[#1E293B]">
                    {member.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {member.role}
                  </p>

                </div>

              ))}

            </div>


            {/* FLÈCHE DROITE */}
            <button
              type="button"
              onClick={() => scrollTeam("right")}
              aria-label="Voir le membre suivant"
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                z-20
                h-11
                w-11
                rounded-full
                bg-white
                border
                shadow-md
                flex
                items-center
                justify-center
                text-3xl
                text-[#1E293B]
                hover:shadow-lg
                hover:bg-gray-50
                transition
              "
            >
              ›
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}