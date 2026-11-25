"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import LumeaIcon from "@/components/LumeaIcon";

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
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Dropdown desktop
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Dropdown mobile (section dépliable)
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
    setServicesMobileOpen(false);
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

  function closeMobileMenu() {
    setMenuOpen(false);
    setServicesMobileOpen(false);
  }

  const mobileRow = "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0d4772]";
  const mobileLinkClass = (active: boolean) =>
    `${mobileRow} ${active ? "bg-[#e7f1f8] text-[#0d2446]" : "hover:bg-[#f2f7fb]"}`;

  const desktopLinkClass = (href: string) =>
    pathname === href ? "underline underline-offset-4" : "hover:underline hover:underline-offset-4";

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 border-b border-[#dedbd4] bg-[#fcf3e2] text-[#0d1c35] ${menuOpen ? "z-[80] xl:z-50" : "z-50"}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          closeMobileMenu();
          menuToggleRef.current?.focus();
        }
      }}
    >
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
          ref={menuToggleRef}
          className="flex h-11 min-w-11 items-center gap-2 rounded-xl border border-[#d9d5cc] bg-white px-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 xl:hidden"
          onClick={menuOpen ? closeMobileMenu : () => setMenuOpen(true)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-5 w-5"
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
          <span>{menuOpen ? "Fermer" : "Menu"}</span>
        </button>

        <Link href="/" onClick={closeMobileMenu} className="relative block aspect-[3.65] w-40 shrink-0 overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 xl:w-44 2xl:w-48">
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

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Navigation mobile"
            id="menu-mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-[#dedbd4] bg-[#fcf3e2] shadow-lg xl:hidden"
          >
            <div className="mx-auto max-w-lg px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="grid gap-1 rounded-2xl border border-[#dce4ec] bg-white p-2">
                <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={mobileLinkClass(pathname === "/")} onClick={closeMobileMenu}>
                  Accueil
                </Link>

                <button
                  type="button"
                  onClick={() => setServicesMobileOpen((open) => !open)}
                  className={mobileLinkClass(servicesMobileOpen || pathname.startsWith("/services"))}
                  aria-expanded={servicesMobileOpen}
                  aria-controls="menu-mobile-services"
                >
                  Services
                  <svg aria-hidden="true" className={`h-5 w-5 shrink-0 motion-safe:transition-transform ${servicesMobileOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                </button>

                <div id="menu-mobile-services" hidden={!servicesMobileOpen} className="rounded-xl bg-[#f2f7fb] p-2">
                  <Link href="/services" aria-current={pathname === "/services" ? "page" : undefined} className={`${mobileLinkClass(pathname === "/services")} text-sm`} onClick={closeMobileMenu}>
                    Voir tous les services <span aria-hidden="true">→</span>
                  </Link>
                  {SERVICES_MENU.flatMap(({ items }) => items).map(({ href, label }) => (
                    <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`${mobileLinkClass(pathname === href)} text-sm`} onClick={closeMobileMenu}>
                      {label}
                    </Link>
                  ))}
                </div>

                {[{ name: "Qui peut m’aider ?", href: "/qui-peut-maider" }, ...navLinks].map(({ name, href }) => (
                  <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={mobileLinkClass(pathname === href)} onClick={closeMobileMenu}>
                    {name}
                  </Link>
                ))}
                <a href={PRO_SITE_URL} className={mobileLinkClass(false)} onClick={closeMobileMenu}>
                  Professionnels <span aria-hidden="true">↗</span>
                </a>
              </div>

              <Link
                href="/contact#prenom"
                onClick={closeMobileMenu}
                className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffbd3b] px-4 py-2.5 text-center font-bold hover:bg-[#f4ac23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <LumeaIcon name="quote" className="h-5 w-5 shrink-0" />
                Demander un devis
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
