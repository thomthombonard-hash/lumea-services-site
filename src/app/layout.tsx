import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Luméa Services - Aide à la personne à La Flèche",
  description:
    "Services à domicile : ménage, repassage, entretien de vitres, jardinage et nettoyage de locaux à La Flèche et ses environs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* 🔒 Script Google reCAPTCHA v3 */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>
      </head>

      <body className="flex flex-col min-h-screen text-gray-800 bg-gray-50">
        {/* ✅ HEADER GLOBAL */}
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
              <Link
                href="/a-propos"
                scroll={false}
                className="hover:text-[#FBBF24] transition"
              >
                À propos
              </Link>
              <Link
                href="/services"
                scroll={false}
                className="hover:text-[#FBBF24] transition"
              >
                Services
              </Link>
              <Link
                href="/contact"
                scroll={false}
                className="hover:text-[#FBBF24] transition"
              >
                Contact
              </Link>
              <Link
                href="/recrutement"
                scroll={false}
                className="hover:text-[#FBBF24] transition"
              >
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

        {/* ✅ CONTENU PRINCIPAL */}
        <main className="flex-grow container mx-auto p-4 pt-24">
          {children}
        </main>

        {/* ✅ FOOTER GLOBAL */}
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
            Site réalisé par HBS Partners - Tous droits réservés
          </p>
        </footer>
      </body>
    </html>
  );
}
