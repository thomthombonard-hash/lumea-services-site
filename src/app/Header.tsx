"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const PRO_SITE_URL = "https://www.lumea-servicespro.fr/";

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
    { name: "À propos", href: "/a-propos" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Recrutement", href: "/recrutement" },
  ];

  const mobileLinkClass = (href: string) =>
    pathname === href ? "text-[#FBBF24] underline underline-offset-4" : "hover:text-[#FBBF24]";

  const desktopLinkClass = (href: string) =>
    pathname === href ? "underline underline-offset-4" : "hover:underline hover:underline-offset-4";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[#dedbd4] bg-[#fcf3e2] text-[#0d1c35]">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[105rem] items-center justify-between gap-4 px-5 xl:h-[4.75rem] xl:px-8 2xl:px-12">
        <nav aria-label="Navigation principale" className="hidden min-w-0 flex-1 items-center gap-4 whitespace-nowrap text-sm font-medium xl:flex 2xl:gap-8 2xl:text-base">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={desktopLinkClass("/")}>
            Accueil
          </Link>

          <div
            ref={dropdownRef}
            className="relative"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setServicesOpen(false);
                dropdownRef.current?.querySelector("button")?.focus();
              }
            }}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className={`inline-flex items-center gap-2 ${pathname.startsWith("/services") ? "underline underline-offset-4" : "hover:underline hover:underline-offset-4"}`}
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

            {servicesOpen && (
              <div
                className="absolute left-0 top-[calc(100%+0.75rem)] w-[340px] overflow-hidden rounded-2xl border border-[#dce4ec] bg-white shadow-xl"
              >
                <div className="border-b border-[#dce4ec] bg-[#f2f7fb] px-4 py-3">
                  <Link
                    href="/services"
                    className="text-sm font-semibold text-[#0d2446] hover:underline"
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
                            className="rounded-xl px-3 py-2 text-sm text-[#1E293B] hover:bg-[#e7f1f8] transition"
                          >
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/qui-peut-maider" className={desktopLinkClass("/qui-peut-maider")}>
            Qui peut m’aider ?
          </Link>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLinkClass(link.href)}>
              {link.name}
            </Link>
          ))}
          <a href={PRO_SITE_URL} className="hover:underline hover:underline-offset-4">
            Professionnels <span aria-hidden="true">↗</span>
          </a>
          <Link href="/contact#prenom" className="ml-auto shrink-0 rounded-xl bg-[#ffbd3b] px-4 py-2.5 font-bold hover:bg-[#f4ac23]">
            Demander un devis
          </Link>
        </nav>

        {/* Bouton burger mobile */}
        <button
          type="button"
          className="-ml-2 flex h-11 w-11 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 xl:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
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

        <Link href="/" onClick={() => setMenuOpen(false)} className="relative block aspect-[3.65] w-40 shrink-0 overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 xl:w-44 2xl:w-48">
          <Image
            src="/brand/lumea-services-logo.jpg"
            alt="Luméa Services — accueil"
            fill
            priority
            sizes="(min-width: 1536px) 192px, (min-width: 1280px) 176px, 160px"
            className="object-cover object-[50%_49%]"
          />
        </Link>
      </div>



      {/* Menu mobile animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="menu-mobile"
            className="xl:hidden max-h-[calc(100dvh-4.25rem)] overflow-y-auto bg-[#1E293B] border-t border-[#FBBF24]/20"
          >
            <div className="flex flex-col items-center py-4 space-y-4 text-white w-full px-6">
              {/* ✅ Ordre mobile : Accueil puis Services */}
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={mobileLinkClass("/")} onClick={() => setMenuOpen(false)}>
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

              <Link
                href="/qui-peut-maider"
                className={`w-full max-w-sm rounded-2xl border border-[#FBBF24]/50 px-4 py-3 text-center font-semibold transition ${
                  pathname === "/qui-peut-maider"
                    ? "bg-[#FBBF24] text-[#1E293B]"
                    : "text-[#FBBF24] hover:bg-[#FBBF24]/10"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Qui peut m’aider ?
              </Link>

              {/* Suite du menu mobile */}
              <Link href="/a-propos" className={mobileLinkClass("/a-propos")} onClick={() => setMenuOpen(false)}>
                À propos
              </Link>

              <Link href="/faq" className={mobileLinkClass("/faq")} onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>

              <Link href="/contact" className={mobileLinkClass("/contact")} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

              <Link href="/recrutement" className={mobileLinkClass("/recrutement")} onClick={() => setMenuOpen(false)}>
                Recrutement
              </Link>

              <a
                href={PRO_SITE_URL}
                onClick={() => setMenuOpen(false)}
                className="w-full max-w-sm rounded-2xl border border-[#FBBF24]/60 px-4 py-3 text-center font-semibold text-[#FBBF24] transition hover:bg-[#FBBF24] hover:text-[#1E293B]"
                aria-label="Professionnels : accéder au site Luméa Services Pro"
              >
                Professionnels ↗
              </a>

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
