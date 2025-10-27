"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string;
  version: string; // pour invalider proprement si tu changes la logique
};

const STORAGE_KEY = "lumea-consent";
const CONSENT_VERSION = "v1";

function getStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Au premier chargement : si pas de consentement => ouvrir le bandeau
  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setOpen(true);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
      setSeen(true);
      // Déclenche un event pour que le site sache quoi charger (ex: GA)
      window.dispatchEvent(new CustomEvent("lumea:consent", { detail: stored }));
    }
  }, []);

  const saveConsent = (c: Omit<Consent, "necessary" | "date" | "version"> & { analytics: boolean; marketing: boolean }) => {
    const consent: Consent = {
      necessary: true,
      analytics: c.analytics,
      marketing: c.marketing,
      date: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("lumea:consent", { detail: consent }));
    setOpen(false);
    setSeen(true);
  };

  const acceptAll = () => saveConsent({ analytics: true, marketing: true });
  const refuseAll = () => saveConsent({ analytics: false, marketing: false });
  const saveChoices = () => saveConsent({ analytics, marketing });

  return (
    <>
      {/* Bouton flottant pour rouvrir les préférences */}
      {seen && (
        <button
          onClick={() => { setOpen(true); setPrefsOpen(true); }}
          className="fixed bottom-4 left-4 z-[60] rounded-full border bg-white/90 px-4 py-2 text-sm shadow hover:bg-white"
          aria-label="Ouvrir les préférences cookies"
        >
          Préférences cookies
        </button>
      )}

      {/* Bandeau / panneau de préférences */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center sm:justify-center bg-black/40 p-0 sm:p-4">
          <div className="w-full sm:max-w-2xl rounded-2xl border bg-white p-5 sm:p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="hidden sm:block h-10 w-10 shrink-0 rounded-xl bg-[#FBBF24]/15 text-[#F59E0B] flex items-center justify-center">🍪</div>
              <div className="grow">
                <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B]">Cookies & respect de votre vie privée</h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Nous utilisons des cookies nécessaires au bon fonctionnement du site. Avec votre accord, nous pourrions activer des mesures d’audience
                  (analytics) et, le cas échéant, des cookies marketing. Vous pouvez <strong>accepter</strong>, <strong>refuser</strong> ou{" "}
                  <strong>personnaliser</strong> vos choix à tout moment.
                </p>

                {/* Basculer en mode préférences */}
                {!prefsOpen ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={acceptAll} className="rounded-xl bg-[#FBBF24] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
                      Accepter tout
                    </button>
                    <button onClick={refuseAll} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                      Refuser tout
                    </button>
                    <button onClick={() => setPrefsOpen(true)} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                      Personnaliser
                    </button>
                    <Link href="/politique-confidentialite" className="ml-auto text-sm underline hover:text-[#F59E0B]">
                      En savoir plus
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cookies nécessaires</p>
                          <p className="text-sm text-gray-600">Indispensables au fonctionnement du site.</p>
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">Toujours actifs</span>
                      </div>
                    </div>

                    <div className="rounded-xl border p-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4"
                          checked={analytics}
                          onChange={(e) => setAnalytics(e.target.checked)}
                        />
                        <div>
                          <p className="font-medium">Mesure d’audience (Analytics)</p>
                          <p className="text-sm text-gray-600">
                            Permet d’améliorer le site via des statistiques anonymisées (ex : pages vues, parcours).
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="rounded-xl border p-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                        />
                        <div>
                          <p className="font-medium">Marketing</p>
                          <p className="text-sm text-gray-600">
                            Activation de services publicitaires / remarketing lorsque présents.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={saveChoices} className="rounded-xl bg-[#FBBF24] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
                        Enregistrer mes choix
                      </button>
                      <button onClick={refuseAll} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                        Refuser tout
                      </button>
                      <button onClick={acceptAll} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                        Accepter tout
                      </button>
                      <button onClick={() => setOpen(false)} className="ml-auto text-sm underline hover:text-[#F59E0B]">
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
