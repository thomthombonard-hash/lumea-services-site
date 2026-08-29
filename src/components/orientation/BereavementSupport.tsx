"use client";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

export default function BereavementSupport() {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience === "relative";

  return (
    <aside className="mt-8 border-l-4 border-[var(--lumea-gold)] bg-white px-5 py-4 sm:px-6">
      <p className="font-bold text-[var(--lumea-navy)]">
        {forRelative
          ? "Si votre proche a besoin de parler à quelqu’un"
          : "Si vous avez besoin de parler à quelqu’un"}
      </p>

      <p className="mt-1 text-[15px] leading-6 text-[var(--lumea-blue-grey)]">
        L&apos;association Empreintes propose
        une ligne nationale spécialisée dans
        l&apos;écoute et l&apos;accompagnement
        des personnes en deuil et de leurs proches.
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        <a
          href="tel:0142380808"
          className="text-[18px] font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
        >
          01 42 38 08 08
        </a>

        <span className="text-sm text-[var(--lumea-blue-grey)]">
          Ligne nationale et gratuite
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-[var(--lumea-blue-grey)]">
        {forRelative
          ? "Votre proche peut rester anonyme s’il le souhaite."
          : "Vous pouvez rester anonyme si vous le souhaitez."}
      </p>

      <a
        href="https://www.empreintes-asso.com/accompagnement-du-deuil/ecoute-telephonique-deuil/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-[var(--lumea-blue-grey)] underline underline-offset-4"
      >
        En savoir plus
      </a>
    </aside>
  );
}
