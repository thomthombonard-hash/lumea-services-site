"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import LumeaIcon from "@/components/LumeaIcon";
import { ChristmasContestTeaser } from "@/components/ChristmasContest";
import { homeQuoteServices } from "@/lib/homeQuoteServices";

const sectionWidth = "mx-auto w-full max-w-[92rem] px-5 sm:px-10 xl:px-16";
const sectionTitle = "text-[clamp(2rem,3.15vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0d1c35]";
const secondaryLink = "inline-flex items-center gap-2 font-bold text-[#0d2446] underline-offset-4 hover:underline";
const callButton = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#0d2446] bg-white px-4 py-2 font-bold text-[#0d2446] transition hover:bg-[#e7f1f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2446]";
const formField = "min-h-12 w-full rounded-lg border border-[#9da8b4] bg-white px-3 py-2 text-base text-[#0d1c35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1c35]";

function HomeQuoteStart() {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");
  const [choosingService, setChoosingService] = useState(false);
  const [service, setService] = useState("");
  const serviceField = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (choosingService) serviceField.current?.focus();
  }, [choosingService]);

  function continueQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!choosingService) {
      setChoosingService(true);
      return;
    }
    const query = new URLSearchParams({ codePostal: postalCode, service });
    router.push(`/contact?${query}#prenom`);
  }

  return (
    <form onSubmit={continueQuote} className="mt-7 w-full max-w-xl rounded-2xl border border-[#dce4ec] bg-white p-4 shadow-sm sm:p-5 lg:mt-8">
      <p className="mb-3 font-extrabold text-[#0d1c35]">Votre devis gratuit et sans engagement</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Code postal de l’intervention</span>
          <input
            name="codePostal"
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{5}"
            title="Saisissez un code postal à 5 chiffres"
            maxLength={5}
            required
            placeholder="Code postal"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            className={formField}
          />
        </label>
        {choosingService && (
          <label className="min-w-0 flex-[1.35]">
            <span className="sr-only">Votre service</span>
            <select ref={serviceField} name="service" value={service} onChange={(event) => setService(event.target.value)} required className={formField}>
              <option value="">Choisir un service</option>
              {homeQuoteServices.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
              <option value="autre">Autre service</option>
            </select>
          </label>
        )}
        <button type="submit" className="min-h-12 shrink-0 rounded-lg bg-[#0d2446] px-4 py-2 font-bold text-white hover:bg-[#1b3e64]">
          {choosingService ? "Continuer" : "Choisir un service"} <span aria-hidden="true">→</span>
        </button>
      </div>
      <Link href="/contact#prenom" className={`mt-3 text-sm ${secondaryLink}`}>Accéder au formulaire de devis <span aria-hidden="true">→</span></Link>
    </form>
  );
}

const servicePhotos: Record<(typeof homeQuoteServices)[number]["slug"], string> = {
  menage: "/brand/lumea-menage.webp",
  vitrerie: "/brand/lumea-vitrerie.webp",
  nettoyage: "/brand/lumea-grand-nettoyage.webp",
};

const serviceSteps = [
  {
    title: "Vous nous parlez de votre besoin",
    description: "Ménage régulier, vitres ou grand nettoyage : dites-nous ce que vous souhaitez, par téléphone ou en ligne.",
  },
  {
    title: "On prépare votre devis",
    description: "Nous faisons le point sur le logement, la fréquence et les tâches à prévoir, puis nous vous transmettons une proposition.",
  },
  {
    title: "On organise la première intervention",
    description: "Une fois le devis accepté, nous convenons avec vous d’un créneau adapté.",
  },
  {
    title: "Votre agence assure le suivi",
    description: "Si vos besoins ou vos horaires changent, vous pouvez faire le point avec votre interlocuteur à La Flèche.",
  },
];

const localAgency = {
  reviews: "https://www.pagesjaunes.fr/pros/64449237",
  directions: "https://www.google.com/maps/dir/?api=1&destination=4%20rue%20Fontevrault%2C%2072200%20La%20Fl%C3%A8che",
};

const commitments = [
  { icon: "team", title: "Des équipes formées", text: "Des intervenants recrutés et accompagnés par Luméa." },
  { icon: "quote", title: "Un devis sans engagement", text: "Un devis gratuit, adapté à votre logement et à vos besoins." },
  { icon: "pin", title: "Une agence à La Flèche", text: "Un interlocuteur local pour organiser et suivre vos prestations." },
  { icon: "credit", title: "50 % de crédit d’impôt", text: "Avance immédiate disponible, sous réserve d’éligibilité." },
] as const;

const homeQuestions = [
  {
    question: "Puis-je demander un ménage ponctuel ?",
    answer: "Oui. Nous proposons des prestations ponctuelles et des passages réguliers. Indiquez-nous les pièces et les tâches à prévoir pour que nous puissions établir votre devis.",
  },
  {
    question: "Que se passe-t-il après ma demande de devis ?",
    answer: "L’agence vous contacte pour préciser votre besoin. Si une visite est utile pour chiffrer la prestation, nous la convenons avec vous. Vous recevez ensuite un devis gratuit et sans engagement.",
  },
  {
    question: "Comment savoir si vous intervenez dans ma commune ?",
    answer: "Nous intervenons à La Flèche, à La Suze-sur-Sarthe et dans les environs. Indiquez votre code postal dans la demande : l’agence vous confirmera si nous pouvons intervenir à votre adresse.",
  },
];

function QuickContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("formType", "contact");
    body.set("subject", "Demande rapide (page d’accueil)");
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/form", { method: "POST", body });
      if (!response.ok) throw new Error("Envoi impossible");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={sendMessage} className="min-w-0 rounded-2xl border border-[#dce4ec] bg-white p-5 sm:p-8">
      <h3 className="text-2xl font-extrabold tracking-tight text-[#0d1c35]">Écrivez-nous</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="min-w-0 space-y-2 text-sm font-semibold text-[#263348]">
          <span>Votre nom</span>
          <input type="text" name="name" autoComplete="name" required className={formField} />
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-[#263348]">
          <span>Votre e-mail</span>
          <input type="email" name="email" autoComplete="email" required className={formField} />
        </label>
        <label className="space-y-2 text-sm font-semibold text-[#263348] sm:col-span-2">
          <span>Votre message</span>
          <textarea name="message" rows={4} required className={formField} />
        </label>
      </div>
      <div className="mt-4 flex items-start gap-3 text-sm text-[#445267]">
        <input id="home-contact-consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#0d2446]" />
        <label htmlFor="home-contact-consent">
          J’accepte le traitement de mes données. Consultez notre{" "}
          <Link href="/politique-confidentialite" className="underline underline-offset-2">politique de confidentialité</Link>.
        </label>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" disabled={sending} className="min-h-12 rounded-lg bg-[#0d2446] px-5 py-2 font-bold text-white hover:bg-[#1b3e64] disabled:opacity-60">
          {sending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        <Link href="/contact#prenom" className={secondaryLink}>Formulaire complet <span aria-hidden="true">→</span></Link>
      </div>
      {status === "success" && <p role="status" className="mt-4 font-semibold text-[#24583e]">Merci, votre message a bien été envoyé.</p>}
      {status === "error" && <p role="alert" className="mt-4 font-semibold text-[#943631]">L’envoi a échoué. Réessayez dans quelques instants ou appelez-nous.</p>}
    </form>
  );
}

export default function HomePage() {
  return (
    <main className="lumea-home min-h-screen bg-white text-[#0d1c35]">
      <section id="hero" className="bg-[#fcfcfb]">
        <div className={`${sectionWidth} grid items-center gap-9 pb-10 pt-12 sm:gap-12 sm:py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:gap-14 lg:py-20 xl:gap-20 xl:py-24`}>
          <div className="min-w-0">
            <div aria-hidden="true" className="mb-6 h-1.5 w-14 rounded-full bg-[#f3b434] lg:mb-8" />
            <h1 className="max-w-[16ch] text-[clamp(2.15rem,4.1vw,4.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
              Votre ménage à domicile, près de chez vous.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#37465b] lg:mt-7 lg:text-xl">
              Ménage régulier, nettoyage de vitres et grand nettoyage à <strong>La Flèche</strong>, à La Suze-sur-Sarthe et dans les environs.
            </p>
            <HomeQuoteStart />
            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a href="tel:0673258816" className={`w-full sm:w-auto ${callButton}`}>
                <LumeaIcon name="phone" className="h-5 w-5 shrink-0" /> Nous appeler
              </a>
              <span className="text-sm font-semibold text-[#445267]">06 73 25 88 16</span>
            </div>
          </div>
          <Image
            src="/brand/lumea-home-hero.webp"
            alt=""
            width={1448}
            height={1086}
            priority
            sizes="(min-width: 1472px) 680px, (min-width: 1024px) 48vw, 100vw"
            className="block h-auto w-full rounded-2xl lg:rounded-3xl"
          />
        </div>
      </section>

      <section aria-labelledby="engagements-title" className="border-y border-[#e9dfce] bg-[#fcf3e2]">
        <div className={sectionWidth}>
          <h2 id="engagements-title" className="sr-only">Les engagements Luméa Services</h2>
          <ul className="grid gap-5 py-7 min-[380px]:grid-cols-2 sm:gap-6 sm:py-9 lg:grid-cols-4 lg:divide-x lg:divide-[#e9dfce]">
            {commitments.map(({ icon, title, text }) => (
              <li key={icon} className="min-w-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <LumeaIcon name={icon} className="h-8 w-8 text-[#0d4772] sm:h-10 sm:w-10" />
                {icon === "credit" ? (
                  <a href="#credit-impot" className={`mt-3 ${secondaryLink}`}>{title}</a>
                ) : (
                  <h3 className="mt-3 font-extrabold leading-snug">{title}</h3>
                )}
                <p className="mt-1 max-w-[28ch] text-sm leading-relaxed text-[#445267]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="bg-[#e7f1f8] py-12 sm:py-16 lg:py-20">
        <div className={sectionWidth}>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <h2 className={sectionTitle}>Nos services pour votre maison</h2>
            <Link href="/services" className={secondaryLink}>Voir tous les services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {homeQuoteServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/particuliers/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#c5d8e8] bg-white transition hover:border-[#7196b5] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1c35]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#d9e4eb]">
                  <Image
                    src={servicePhotos[service.slug]}
                    alt=""
                    fill
                    sizes="(min-width: 1472px) 440px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[50%_55%] transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 p-5 xl:p-6">
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight">{service.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#445267]">{service.description}</p>
                  </div>
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7f1f8] text-lg text-[#0d2446] group-hover:bg-[#d3e7f6]">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-steps-title" className="border-b border-[#e5ebf1] py-12 sm:py-16 lg:py-20">
        <div className={sectionWidth}>
          <h2 id="home-steps-title" className={sectionTitle}>Comment ça se passe ?</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
            {serviceSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4 border-t border-[#d8e3ec] pt-5">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fcf3e2] font-extrabold">{index + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-[#445267]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="presentation" className="bg-[#fcf3e2] py-12 sm:py-16 lg:py-20">
        <div className={`${sectionWidth} grid items-center gap-8 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h2 className={sectionTitle}>Pourquoi choisir Luméa Services ?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#37465b]">
              Notre agence est à La Flèche. Nous intervenons aussi à La Suze-sur-Sarthe et dans les environs.
            </p>
            <ul className="mt-6 space-y-3 text-[#263348]">
              <li className="flex items-start gap-3"><LumeaIcon name="team" className="mt-0.5 h-5 w-5 shrink-0 text-[#0d4772]" /> Une équipe qui connaît votre logement et vos habitudes.</li>
              <li className="flex items-start gap-3"><LumeaIcon name="quote" className="mt-0.5 h-5 w-5 shrink-0 text-[#0d4772]" /> Des prestations régulières ou ponctuelles, selon vos besoins.</li>
              <li className="flex items-start gap-3"><LumeaIcon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-[#0d4772]" /> Un interlocuteur à l’agence pour adapter vos passages.</li>
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href="tel:0673258816" className={callButton}>
                <LumeaIcon name="phone" className="h-5 w-5 shrink-0" /> Appeler l’agence
              </a>
              <Link href="/a-propos" className={secondaryLink}>Découvrir Luméa <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eadfd1] lg:rounded-3xl">
            <Image src="/brand/lumea-agence-appel.webp" alt="" fill sizes="(min-width: 1472px) 640px, (min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_45%]" />
          </div>
        </div>
      </section>

      <section id="avis-clients" className="border-b border-[#e5ebf1] bg-[#f7f9fc] py-12 sm:py-16 lg:py-20">
        <div className={sectionWidth}>
          <h2 className={sectionTitle}>Ce que disent nos clients</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-6">
            <div className="rounded-2xl border border-[#dce4ec] bg-white p-5 sm:p-7">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="text-4xl leading-none">5<span className="text-xl">/5</span></strong>
                <span aria-hidden="true" className="text-xl tracking-wide text-[#a86700]">★★★★★</span>
              </p>
              <p className="mt-3 text-[#37465b]">29 avis Google, selon la fiche PagesJaunes consultée le 24 novembre 2026.</p>
              <a href={localAgency.reviews} className={`mt-4 ${secondaryLink}`}>Consulter les avis <span aria-hidden="true">↗</span></a>
            </div>
            <figure className="flex flex-col justify-between rounded-2xl border border-[#dce4ec] bg-white p-5 sm:p-7">
              <blockquote cite={localAgency.reviews} className="text-lg font-semibold leading-relaxed text-[#263348]">
                « L’équipe est arrivée à l’heure, super souriante et vraiment professionnelle. »
              </blockquote>
              <figcaption className="mt-5 text-sm text-[#445267]">Extrait d’un avis PagesJaunes du 11 mars 2026 · Ménage à domicile</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="credit-impot" className="scroll-mt-6 bg-[#e7f1f8] py-12 sm:py-16 lg:py-20">
        <div className={`${sectionWidth} grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-12`}>
          <div>
            <h2 className={sectionTitle}>Crédit d’impôt et Avance immédiate</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#37465b]">
              Les prestations éligibles peuvent ouvrir droit à un crédit d’impôt de 50 %, dans les limites et conditions du dispositif. Avec l’Avance immédiate de l’Urssaf, une fois le service activé, vous réglez directement votre reste à charge.
            </p>
            <Link href="/faq" className={`mt-5 ${secondaryLink}`}>Consulter la FAQ <span aria-hidden="true">→</span></Link>
          </div>
          <div className="rounded-2xl border border-[#c5d8e8] bg-white p-5 sm:p-7">
            <h3 className="text-xl font-extrabold">Besoin d’aide pour l’activer ?</h3>
            <p className="mt-2 leading-relaxed text-[#445267]">Indiquez-le lors de votre demande. L’agence peut vous expliquer les démarches.</p>
            <Link href="/contact#prenom" className={`mt-4 ${secondaryLink}`}>Poser une question à l’agence <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className={`${sectionWidth} grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.66fr)] lg:gap-12`}>
          <div>
            <h2 className={sectionTitle}>Vos questions avant de commencer</h2>
            <div className="mt-6 divide-y divide-[#dce4ec] border-y border-[#dce4ec]">
              {homeQuestions.map(({ question, answer }) => (
                <details key={question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold [&::-webkit-details-marker]:hidden">
                    {question}
                    <span aria-hidden="true" className="text-xl leading-none group-open:hidden">+</span>
                    <span aria-hidden="true" className="hidden text-xl leading-none group-open:inline">−</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[#445267]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e9dfce] bg-[#fcf3e2] p-5 sm:p-7 lg:mt-2">
            <h2 className="text-2xl font-extrabold tracking-tight">Qui peut m’aider ?</h2>
            <p className="mt-3 leading-relaxed text-[#37465b]">Perte d’autonomie, sortie d’hospitalisation ou besoin d’aide au quotidien ? Trouvez les bons interlocuteurs près de chez vous.</p>
            <Link href="/qui-peut-maider" className={`mt-5 ${secondaryLink}`}>Découvrir l’outil <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f2f7fb] py-14 sm:py-20 lg:py-24">
        <div className={`${sectionWidth} grid items-start gap-9 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16`}>
          <div>
            <h2 className={sectionTitle}>Votre agence à La Flèche</h2>
            <address className="mt-5 space-y-3 not-italic text-[#37465b]">
              <p className="font-semibold">4 rue Fontevrault, 72200 La Flèche</p>
              <p><a className={callButton} href="tel:0673258816"><LumeaIcon name="phone" className="h-5 w-5 shrink-0" /> 06 73 25 88 16</a></p>
              <p><a className={secondaryLink} href="mailto:bonard@lumea-services.fr">bonard@lumea-services.fr</a></p>
            </address>
            <p className="mt-4 text-[#445267]">Joignable du lundi au vendredi, de 9 h à 18 h.</p>
            <a href={localAgency.directions} className={`mt-5 ${secondaryLink}`}>Itinéraire vers l’agence <span aria-hidden="true">↗</span></a>
          </div>
          <QuickContactForm />
        </div>
      </section>

      <div className={`${sectionWidth} space-y-5 py-12 sm:py-16`}>
        <section id="recrutement" className="rounded-2xl border border-[#dce4ec] px-5 py-6 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Rejoindre Luméa Services</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-[#445267]">Une équipe locale à taille humaine, avec de la formation et du matériel fourni pour vos interventions.</p>
          </div>
          <Link href="/recrutement" className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-[#0d2446] px-4 py-2 font-bold text-[#0d2446] hover:bg-[#e7f1f8] lg:mt-0">
            Voir le recrutement <span aria-hidden="true">→</span>
          </Link>
        </section>
        <ChristmasContestTeaser />
      </div>
    </main>
  );
}
