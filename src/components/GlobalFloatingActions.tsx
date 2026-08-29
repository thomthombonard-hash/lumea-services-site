"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalFloatingActions() {
  const pathname = usePathname();

  // L’outil d’orientation doit rester neutre : on ne pousse pas
  // Luméa comme solution commerciale pendant le questionnaire.
  if (pathname === "/qui-peut-maider") {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 flex gap-3 md:hidden px-4">
        <a
          href="tel:0673258816"
          className="flex items-center gap-2 rounded-full bg-[#1E293B] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-black/20 transition-all hover:scale-[1.05]"
        >
          <span className="text-sm">📞</span>
          <span>Appeler</span>
        </a>

        <Link
          href="/contact#prenom"
          className="flex items-center gap-2 rounded-full bg-[#FBBF24] px-5 py-3 text-xs font-semibold text-[#1E293B] shadow-lg shadow-[#F59E0B]/30 transition-all hover:scale-[1.05]"
        >
          <span className="text-sm">💬</span>
          <span>Devis</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-col items-end gap-3 fixed bottom-8 right-6 z-[70]">
        <a
          href="tel:0673258816"
          className="flex items-center justify-center gap-2 rounded-full bg-[#1E293B] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.05] hover:bg-[#374151] hover:shadow-xl"
        >
          📞 Appelez-nous !
        </a>

        <Link
          href="/contact#prenom"
          className="flex items-center justify-center gap-2 rounded-full bg-[#FBBF24] px-6 py-3 font-semibold text-[#1E293B] shadow-lg transition hover:scale-[1.05] hover:bg-[#F59E0B] hover:shadow-xl"
        >
          💬 Demander un devis
        </Link>
      </div>
    </>
  );
}
