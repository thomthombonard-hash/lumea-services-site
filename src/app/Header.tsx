"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromoBanner from "@/components/PromoBanner"; // ✅ Bannière incluse ici

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Recrutement", href: "/recrutement" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#1E293B]/95 backdrop-blur-sm shadow-lg">
      {/* Barre du haut : logo + navigation */}
      <div className="flex w-full items-center justify-between px-6 lg:px-12 py-4 border-b border-[#FBBF24]/20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="text-2xl font-bold tracking-wide">
            <span className="text-[#FBBF24]">Luméa</span> Services
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-10 text-base font-medium text-white">
          {navLinks.map((link) => {
            if (link.name === "Recrutement") {
              return (
                <div
                  key={link.href}
                  className="flex items-center gap-4"
                >
                  <Link
                    href={link.href}
                    className={`transition ${
                      pathname === link.href
                        ? "text-[#FBBF24] underline underline-offset-4"
                        : "hover:text-[#FBBF24]"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* ✅ Image après le bouton Recrutement — réduite de 30% */}
                  <Image
                    src="/optimized/sap-transparent.webp"
                    alt="SAP"
                    width={85}     // 120 → 85
                    height={28}    // 40 → 28
                    className="object-contain"
                  />
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-[#FBBF24] underline underline-offset-4"
                    : "hover:text-[#FBBF24]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden text-[#FBBF24] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Bannière promo */}
      <PromoBanner />

      {/* Menu mobile animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#1E293B] border-t border-[#FBBF24]/20"
          >
            <div className="flex flex-col items-center py-4 space-y-4 text-white">
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg transition ${
                    pathname === link.href
                      ? "text-[#FBBF24] underline underline-offset-4"
                      : "hover:text-[#FBBF24]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Séparateur */}
              <div className="w-3/4 border-t border-[#FBBF24]/30 my-2" />

              {/* ✅ Image mobile — taille réduite proportionnellement */}
              <Image
                src="/optimized/sap-transparent.webp"
                alt="SAP"
                width={98}   // 140 → 98
                height={28}  // même hauteur pour une cohérence
                className="object-contain"
              />

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-[#FBBF24] px-5 py-2.5 text-base font-semibold text-[#1E293B] shadow-md transition hover:scale-[1.05] hover:shadow-lg"
              >
                Demander un devis
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
