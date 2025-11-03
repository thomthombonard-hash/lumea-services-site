"use client";

import Link from "next/link";

export default function PromoBanner() {
  return (
    <div className="w-full bg-white border-b border-[#FBBF24]/40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-4 md:gap-6">

        {/* === OFFRES === */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-center justify-center text-sm md:text-base text-gray-800 leading-tight">

          {/* 📱 Version Mobile (compacte) */}
          <div className="flex md:hidden flex-row items-center justify-center gap-4 whitespace-nowrap">
            {/* Offre 1 */}
            <span className="flex items-center gap-1">
              🎁 <strong className="text-[#F59E0B]">-10 %</strong> / 1 mois
            </span>

            {/* Séparateur */}
            <span className="h-4 w-px bg-gray-300"></span>

            {/* Offre 2 */}
            <span className="flex items-center gap-1">
              💫 <strong className="text-[#F59E0B]">-10 %</strong> / 2 mois
            </span>
          </div>

          {/* 🖥️ Version Desktop (rendu original intact) */}
          <div className="hidden md:flex flex-row gap-10 items-center">
            {/* Offre 1 */}
            <div className="flex items-center gap-3">
              <div className="bg-[#FBBF24]/30 text-[#B45309] p-2 rounded-lg font-bold text-lg">
                🎁
              </div>
              <div>
                <p className="font-semibold">
                  <strong className="text-[#F59E0B]">-10 %</strong> pendant 1 mois
                </p>
                <p className="text-xs text-gray-600">Nouveaux clients</p>
              </div>
            </div>

            {/* Séparateur */}
            <div className="h-6 w-px bg-gray-300" />

            {/* Offre 2 */}
            <div className="flex items-center gap-3">
              <div className="bg-[#FBBF24]/30 text-[#B45309] p-2 rounded-lg font-bold text-lg">
                💫
              </div>
              <div>
                <p className="font-semibold">
                  <strong className="text-[#F59E0B]">-10 %</strong> pendant 2 mois
                </p>
                <p className="text-xs text-gray-600">Parrain + filleul</p>
              </div>
            </div>
          </div>
        </div>

        {/* === CTA & Infos === */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
          <span className="text-xs md:text-sm text-gray-700 italic">
            Offre valable jusqu’au <strong>31/01/2026</strong>
          </span>
          <Link
            href="/services#offre-moment"
            className="px-5 py-2 bg-[#F59E0B] text-white font-semibold rounded-full text-xs md:text-sm shadow-md transition hover:bg-[#D97706] hover:shadow-lg whitespace-nowrap"
          >
            J’en profite →
          </Link>
        </div>
      </div>
    </div>
  );
}
