import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";
import { siteOrigin } from "@/lib/siteSeo";
import Header from "./Header";
import ChristmasSeason from "@/components/ChristmasSeason";
import { christmasSeasonBootstrap } from "@/lib/christmasSeason";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import GlobalFloatingActions from "@/components/GlobalFloatingActions";

export const metadata: Metadata = {
  title: "Luméa Services - Ménage & nettoyage à La Flèche",
  description:
    "Services à la personne à domicile : ménage, vitrerie, grand nettoyage et assistance pour les particuliers à La Flèche, La Suze-sur-Sarthe et les environs.",
  metadataBase: new URL(siteOrigin),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: christmasSeasonBootstrap }} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#FBBF24" />

        <meta
          name="google-site-verification"
          content="UwqrZdY5KXTPUdpV_mv5SeLYn9kIdCHWaZIRrwuH1DU"
        />

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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LKB9N8P');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body className="flex flex-col min-h-screen text-gray-800 bg-gray-50 relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LKB9N8P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}


        {/* === HEADER GLOBAL === */}
        <Header />

        {/* === CONTENU DES PAGES === */}
        <div className="site-main flex-grow">
          <ChristmasSeason />
          {children}
        </div>

        <footer className="site-footer">
          <div className="mx-auto grid max-w-[92rem] gap-8 px-5 py-9 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.2fr_1fr_1fr] xl:px-16">
            <div>
              <Link href="/" className="text-xl font-extrabold hover:underline">Luméa Services</Link>
              <p className="mt-2 text-sm text-slate-200">4 rue Fontevrault, 72200 La Flèche</p>
            </div>
            <nav aria-label="Pied de page Luméa" className="grid content-start gap-2 text-sm">
              <Link href="/" className="hover:underline">Accueil</Link>
              <Link href="/services" className="hover:underline">Nos services</Link>
              <Link href="/qui-peut-maider" className="hover:underline">Qui peut m’aider ?</Link>
              <Link href="/faq" className="hover:underline">FAQ</Link>
              <Link href="/concours-noel-2026" className="hover:underline">Concours de Noël 2026</Link>
            </nav>
            <div className="grid content-start gap-2 text-sm">
              <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="hover:underline">Politique de confidentialité</Link>
              <p className="mt-2 text-slate-200">© {new Date().getFullYear()} Luméa Services</p>
              <p className="text-xs text-slate-300">Site réalisé par HBS Partners</p>
            </div>
          </div>
        </footer>

        {/* === COMPOSANTS RGPD === */}
        <div className="hidden lg:block fixed bottom-6 left-6 z-[60] md:bottom-8 md:left-8">
          <CookieConsent />
        </div>

        <div className="hidden lg:block fixed bottom-6 left-24 z-[60] md:bottom-8 md:left-32">
          <AnalyticsConsent />
        </div>

        <GlobalFloatingActions />
      </body>
    </html>
  );
}
