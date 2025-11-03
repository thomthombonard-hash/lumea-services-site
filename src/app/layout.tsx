import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";
import Header from "./Header";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsConsent from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Luméa Services - Services à la personne à La Flèche",
  description:
    "Services à domicile : ménage, entretien de vitres et nettoyage de locaux à La Flèche et ses environs.",
  keywords:
    "ménage, repassage, vitres, nettoyage de locaux, La Flèche, Sarthe, services à la personne",
  openGraph: {
    title: "Luméa Services - Services à la personne à La Flèche",
    description:
      "Découvrez nos prestations de ménage, repassage, vitres et entretien pour particuliers et professionnels à La Flèche et alentours.",
    url: "https://www.lumea-services.fr",
    siteName: "Luméa Services",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#FBBF24" />

        {/* ✅ Vérification Google Search Console */}
        <meta
          name="google-site-verification"
          content="UwqrZdY5KXTPUdpV_mv5SeLYn9kIdCHWaZIRrwuH1DU"
        />

        {/* ⚡ Optimisations de performance */}
        <link
          rel="preconnect"
          href="https://www.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.google.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/logo.ico" />
      </head>

      <body className="flex flex-col min-h-screen text-gray-800 bg-gray-50 relative">
        {/* === HEADER GLOBAL === */}
        <Header />

        {/* === CONTENU DES PAGES === */}
        <main className="flex-grow container mx-auto p-4 pt-24">{children}</main>

        {/* === FOOTER GLOBAL === */}
        <footer className="bg-[#1E293B]/95 text-white text-center py-6 mt-8 text-sm sm:text-base">
          <p className="font-semibold">
            © {new Date().getFullYear()} Luméa Services
          </p>
          <p className="mt-2">
            <Link
              href="/mentions-legales"
              className="underline hover:text-gray-200"
            >
              Mentions légales
            </Link>{" "}
            |{" "}
            <Link
              href="/politique-confidentialite"
              className="underline hover:text-gray-200"
            >
              Politique de confidentialité
            </Link>
          </p>
          <p className="text-xs mt-2 text-gray-200">
            Site réalisé par HBS Partners – Tous droits réservés
          </p>
        </footer>

        {/* === COMPOSANTS RGPD === */}
        <div className="hidden lg:block fixed bottom-6 left-6 z-[60] md:bottom-8 md:left-8">
          <CookieConsent />
        </div>

        <div className="hidden lg:block fixed bottom-6 left-24 z-[60] md:bottom-8 md:left-32">
          <AnalyticsConsent />
        </div>

        {/* === CTA GLOBAL FLOTTANT (visible sur toutes les pages) === */}

        {/* Version mobile & tablette : côte à côte en bas */}
<div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 flex gap-3 md:hidden px-4">
  <a
    href="tel:0673258816"
    className="flex items-center gap-2 rounded-full bg-[#1E293B] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-black/20 transition-all hover:scale-[1.05]"
  >
    <span className="text-sm">📞</span>
    <span>Appeler</span>
  </a>

  <Link
    href="/contact"
    className="flex items-center gap-2 rounded-full bg-[#FBBF24] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-[#F59E0B]/30 transition-all hover:scale-[1.05]"
  >
    <span className="text-sm">💬</span>
    <span>Devis</span>
  </Link>
</div>


        {/* Version desktop : bloc d’action empilé en bas à droite */}
        <div className="hidden md:flex flex-col items-end gap-3 fixed bottom-8 right-6 z-[70]">
          {/* 📞 Bouton d'appel */}
          <a
            href="tel:0673258816"
            className="flex items-center justify-center gap-2 rounded-full bg-[#1E293B] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.05] hover:bg-[#374151] hover:shadow-xl"
          >
            📞 Appelez-nous !
          </a>

          {/* 💬 Bouton devis */}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-full bg-[#FBBF24] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.05] hover:bg-[#F59E0B] hover:shadow-xl"
          >
            💬 Demander un devis
          </Link>
        </div>
      </body>
    </html>
  );
}
