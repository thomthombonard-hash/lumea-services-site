"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LumeaIcon from "@/components/LumeaIcon";

export default function GlobalFloatingActions() {
  const pathname = usePathname();

  // L’outil d’orientation doit rester neutre : on ne pousse pas
  // Luméa comme solution commerciale pendant le questionnaire.
  if (pathname === "/qui-peut-maider") {
    return null;
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[70] grid grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] gap-2 border-t border-[#d6deea] bg-white px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
        <a
          href="tel:0673258816"
          className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#0d1c35] px-1 text-center text-sm font-bold text-[#0d1c35]"
        >
          <LumeaIcon name="phone" className="h-4 w-4 shrink-0" /> Appeler
        </a>
        <Link
          href="/contact#prenom"
          className="flex min-h-11 items-center justify-center rounded-lg bg-[#ffbd3b] px-1 text-center text-sm font-bold text-[#0d1c35]"
        >
          Demander un devis
        </Link>
      </div>

      <div className={`hidden ${pathname === "/" ? "" : "md:flex"} fixed bottom-8 right-6 z-[70] flex-col items-end gap-3`}>
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
