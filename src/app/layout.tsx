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
        {/* HEADER */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              Luméa Services
            </Link>
            <div className="flex gap-4 text-sm sm:text-base">
              <Link href="/" className="hover:text-blue-700">
                Accueil
              </Link>
              <Link href="/services" className="hover:text-blue-700">
                Services
              </Link>
              <Link href="/a-propos" className="hover:text-blue-700">
                À propos
              </Link>
              <Link href="/contact" className="hover:text-blue-700">
                Contact
              </Link>
              <Link href="/recrutement" className="hover:text-blue-700">
                Recrutement
              </Link>
            </div>
          </nav>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-grow container mx-auto p-4">{children}</main>

        {/* FOOTER */}
        <footer className="bg-blue-800 text-white text-center py-6 mt-8 text-sm sm:text-base">
          <p className="font-semibold">© {new Date().getFullYear()} Luméa Services</p>
          <p className="mt-2">
            <Link href="/mentions-legales" className="underline hover:text-gray-200">
              Mentions légales
            </Link>{" "}
            |{" "}
            <Link href="/politique-confidentialite" className="underline hover:text-gray-200">
              Politique de confidentialité
            </Link>
          </p>
          <p className="text-xs mt-2 text-gray-200">
            Site réalisé par Thomas BONARD - Tous droits réservés
          </p>
        </footer>
      </body>
    </html>
  );
}
