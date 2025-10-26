// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Luméa Services - Aide à la personne à La Flèche",
  description: "Services à domicile : ménage, repassage, entretien, jardinage, vitres, etc.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen text-gray-800 bg-gray-50">
        {/* HEADER */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              Luméa Services
            </Link>
            <div className="flex gap-4">
              <Link href="/">Accueil</Link>
              <Link href="/services">Services</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/recrutement">Recrutement</Link>
            </div>
          </nav>
        </header>

        {/* CONTENU */}
        <main className="flex-grow container mx-auto p-4">{children}</main>

        {/* FOOTER */}
        <footer className="bg-blue-800 text-white text-center py-4 mt-8">
          <p>© {new Date().getFullYear()} Luméa Services. Tous droits réservés.</p>
          <p className="text-sm">
            <Link href="/mentions-legales" className="underline">
              Mentions légales
            </Link>{" "}
            |{" "}
            <Link href="/politique-confidentialite" className="underline">
              Politique de confidentialité
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
