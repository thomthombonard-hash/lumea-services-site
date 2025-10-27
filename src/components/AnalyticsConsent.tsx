"use client";

import { useEffect } from "react";

export default function AnalyticsConsent() {
  useEffect(() => {
    // On s'assure d'être côté client (Next 14 App Router)
    if (typeof window === "undefined") return;

    try {
      const consent = JSON.parse(localStorage.getItem("cookieConsent") || "{}");

      // Si le visiteur a accepté les cookies Analytics, on injecte Google Analytics
      if (consent.analytics === true && !window.gtagInitialized) {
        // On évite d'injecter plusieurs fois le script
        window.gtagInitialized = true;

        // 1️⃣ Script principal Google Tag Manager
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // ← Remplace ici ton ID GA4
        script.async = true;
        document.head.appendChild(script);

        // 2️⃣ Script d’initialisation GA
        const scriptInit = document.createElement("script");
        scriptInit.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
        `;
        document.head.appendChild(scriptInit);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du consentement Analytics :", error);
    }
  }, []);

  return null;
}
