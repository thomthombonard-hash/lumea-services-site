"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromoBanner from "@/components/PromoBanner";

type ServiceItem = { label: string; href: string };

const SERVICES_MENU: {
  category: string;
  items: ServiceItem[];
}[] = [
  {
    category: "Particuliers",
    items: [
      { label: "Ménage", href: "/services/particuliers/menage" },
      { label: "Vitrerie", href: "/services/particuliers/vitrerie" },
      { label: "Nettoyage", href: "/services/particuliers/nettoyage" },
      { label: "Transport", href: "/services/particuliers/transport" },
      { label: "Assistance administrative", href: "/services/particuliers/assistance-administrative" },
      { label: "Assistance informatique", href: "/services/particuliers/assistance-informatique" },
    ],
  },
  {
    category: "Professionnels",
    items: [
      { label: "Nettoyage Pro", href: "/services/professionnels/nettoyage-pro" },
      { label: "Vitrerie Pro", href: "/services/professionnels/vitrerie-pro" },
      { label: "Entretien des Parties Communes", href: "/services/professionnels/parties-communes" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  // Dropdown desktop
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Dropdown mobile (section dépliable)
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Recrutement", href: "/recrutement" },
  ];

  const linkClass = (href: string) =>
    `transition ${
      pathname === href
        ? "text-[#FBBF24] underline underline-offset-4"
        : "hover:text-[#FBBF24]"
    }`;

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
          {/* ✅ 1) Accueil */}
          <Link href="/" className={linkClass("/")}>
            Accueil
          </Link>

          {/* ✅ 2) Services (dropdown) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              className={`inline-flex items-center gap-2 ${
                pathname.startsWith("/services")
                  ? "text-[#FBBF24] underline underline-offset-4"
                  : "hover:text-[#FBBF24]"
              } transition`}
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 mt-3 w-[340px] rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-gradient-to-r from-[#FFFBEA] to-white border-b">
                    <Link
                      href="/services"
                      className="text-sm font-semibold text-[#1E293B] hover:text-[#F59E0B]"
                      onClick={() => setServicesOpen(false)}
                    >
                      Voir tous les services →
                    </Link>
                  </div>

                  <div className="p-4 grid gap-4">
                    {SERVICES_MENU.map((block) => (
                      <div key={block.category}>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          {block.category}
                        </p>
                        <div className="grid gap-1">
                          {block.items.map((it) => (
                            <Link
                              key={it.href}
                              href={it.href}
                              onClick={() => setServicesOpen(false)}
                              className="rounded-xl px-3 py-2 text-sm text-[#1E293B] hover:bg-[#FFFBEA] hover:text-[#92400E] transition"
                            >
                              {it.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ 3) À propos, FAQ, Contact, Recrutement */}
          {navLinks
            .filter((l) => l.href !== "/") // on retire Accueil (déjà affiché)
            .map((link) => {
              if (link.name === "Recrutement") {
                return (
                  <div key={link.href} className="flex items-center gap-4">
                    <Link href={link.href} className={linkClass(link.href)}>
                      {link.name}
                    </Link>

                    <Image
                      src="/optimized/sap-transparent.webp"
                      alt="SAP"
                      width={85}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                );
              }

              return (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
            <div className="flex flex-col items-center py-4 space-y-4 text-white w-full px-6">
              {/* ✅ Ordre mobile : Accueil puis Services */}
              <Link href="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>

              {/* Services (accordéon) */}
              <button
                type="button"
                onClick={() => setServicesMobileOpen((v) => !v)}
                className={`w-full max-w-sm flex items-center justify-between rounded-2xl px-4 py-3 border border-[#FBBF24]/30 ${
                  pathname.startsWith("/services") ? "text-[#FBBF24]" : "text-white"
                }`}
                aria-expanded={servicesMobileOpen}
              >
                <span className="font-semibold">Services</span>
                <svg
                  className={`h-4 w-4 transition-transform ${servicesMobileOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {servicesMobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-sm overflow-hidden"
                  >
                    <div className="mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
                      <Link
                        href="/services"
                        className="block text-sm font-semibold text-[#FBBF24]"
                        onClick={() => setMenuOpen(false)}
                      >
                        Voir tous les services →
                      </Link>

                      {SERVICES_MENU.map((block) => (
                        <div key={block.category}>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                            {block.category}
                          </p>
                          <div className="flex flex-col gap-1">
                            {block.items.map((it) => (
                              <Link
                                key={it.href}
                                href={it.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-xl px-3 py-2 text-sm text-white hover:bg-white/10 transition"
                              >
                                {it.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suite du menu mobile */}
              <Link href="/a-propos" className={linkClass("/a-propos")} onClick={() => setMenuOpen(false)}>
                À propos
              </Link>

              <Link href="/faq" className={linkClass("/faq")} onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>

              <Link href="/contact" className={linkClass("/contact")} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

              <Link href="/recrutement" className={linkClass("/recrutement")} onClick={() => setMenuOpen(false)}>
                Recrutement
              </Link>

              <div className="w-3/4 border-t border-[#FBBF24]/30 my-2" />

              <Image
                src="/optimized/sap-transparent.webp"
                alt="SAP"
                width={98}
                height={28}
                className="object-contain"
              />

              <Link
                href="/contact#prenom"
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
