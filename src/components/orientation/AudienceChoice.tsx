"use client";

import type {
  OrientationAudience,
} from "@/lib/orientation/audience-context";

interface AudienceChoiceProps {
  onSelect: (
    audience:
      OrientationAudience
  ) => void;
}

export default function AudienceChoice({
  onSelect,
}: AudienceChoiceProps) {
  return (
    <section className="orientation-readable orientation-reading-width">
      <div className="rounded-[28px] border border-[var(--lumea-border)] bg-white p-6 shadow-[0_18px_50px_rgba(13,35,68,0.06)] sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#8f6500]">
          Pour commencer
        </p>

        <h1 className="mt-3 text-[2rem] font-bold leading-tight text-[var(--lumea-navy)] sm:text-[2.5rem]">
          Pour qui cherchez-vous une aide ?
        </h1>

        <p className="mt-4 max-w-[650px] text-[17px] leading-8 text-[var(--lumea-blue-grey)]">
          Cela nous permet simplement
          d&apos;adapter les questions
          et les conseils à la situation concernée.
        </p>

        <div className="mt-8 grid gap-4">
          <button
            type="button"
            onClick={() =>
              onSelect(
                "self"
              )
            }
            className="group rounded-[22px] border-2 border-[var(--lumea-border)] bg-[#fbfaf7] p-5 text-left transition hover:border-[var(--lumea-gold)] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:p-6"
          >
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xl font-bold text-[var(--lumea-navy)]">
                  Pour moi
                </p>

                <p className="mt-2 text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
                  Je cherche une aide
                  pour ma propre situation.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="shrink-0 text-2xl font-bold text-[var(--lumea-gold)] transition group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              onSelect(
                "relative"
              )
            }
            className="group rounded-[22px] border-2 border-[var(--lumea-border)] bg-[#fbfaf7] p-5 text-left transition hover:border-[var(--lumea-gold)] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:p-6"
          >
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xl font-bold text-[var(--lumea-navy)]">
                  J&apos;aide un proche
                </p>

                <p className="mt-2 text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
                  J&apos;aide un parent,
                  mon conjoint, un ami
                  ou une autre personne.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="shrink-0 text-2xl font-bold text-[var(--lumea-gold)] transition group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </button>
        </div>

        <div className="mt-7 border-t border-[var(--lumea-border)] pt-5">
          <p className="text-sm leading-6 text-[var(--lumea-blue-grey)]">
            <strong className="text-[var(--lumea-navy)]">
              Nous respectons votre vie privée.
            </strong>{" "}
            Si vous aidez un proche, nous ne
            vous demanderons ni son nom,
            ni sa date de naissance,
            ni ses coordonnées.
          </p>
        </div>
      </div>
    </section>
  );
}