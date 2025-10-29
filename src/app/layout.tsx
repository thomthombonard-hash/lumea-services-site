import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";
import Header from "./Header";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsConsent from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Luméa Services - Aide à la personne à La Flèche",
  description:
    "Services à domicile : ménage, repassage, entretien de vitres, jardinage et nettoyage de locaux à La Flèche et ses environs.",
  keywords:
    "aide à domicile, ménage, repassage, vitres, jardinage, nettoyage de locaux, La Flèche, Sarthe, services à la personne",
  openGraph: {
    title: "Luméa Services - Aide à la personne à La Flèche",
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
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="flex flex-col min-h-screen text-gray-800 bg-gray-50 relative">
        {/* === HEADER GLOBAL === */}
        <Header />

        {/* === CONTENU DES PAGES === */}
        <main className="flex-grow container mx-auto p-4 pt-24">{children}</main>

        {/* === FOOTER GLOBAL === */}
        <footer className="bg-[#1E293B]/95 text-white text-center py-6 mt-8 text-sm sm:text-base relative">
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

          {/* ✅ Sur mobile/tablette, affichage des boutons ici */}
          <div className="mt-4 flex justify-center gap-4 lg:hidden">
            <div className="bg-white/10 rounded-full px-4 py-2 text-xs font-medium hover:bg-white/20 transition">
              <CookieConsent />
            </div>
            <div className="bg-white/10 rounded-full px-4 py-2 text-xs font-medium hover:bg-white/20 transition">
              <AnalyticsConsent />
            </div>
          </div>
        </footer>

        {/* ✅ Sur desktop uniquement, boutons flottants en bas à gauche */}
        <div className="hidden lg:block fixed bottom-8 left-6 z-[60] space-y-3">
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
            <CookieConsent />
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
            <AnalyticsConsent />
          </div>
        </div>
      </body>
    </html>
  );
}
