"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { homeQuoteServices } from "@/lib/homeQuoteServices";

const secondaryLink = "inline-flex items-center gap-2 font-bold text-[#0d2446] underline-offset-4 hover:underline";
const formField = "min-h-12 w-full rounded-lg border border-[#9da8b4] bg-white px-3 py-2 text-base text-[#0d1c35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1c35]";

export function HomeQuoteStart() {
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

export function QuickContactForm() {
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
