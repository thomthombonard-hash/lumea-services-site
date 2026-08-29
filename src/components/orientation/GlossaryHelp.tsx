"use client";

import {
  glossaryEntries,
} from "@/data/glossary";

export default function GlossaryHelp() {
  return (
    <details className="mt-8 rounded-[18px] border border-[var(--lumea-border)] bg-white">
      <summary className="cursor-pointer list-none px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--lumea-navy)]">
              Un mot administratif n&apos;est pas clair ?
            </p>

            <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
              APA, PCH, CLIC, MDPH… on vous les traduit simplement.
            </p>
          </div>

          <span
            aria-hidden="true"
            className="shrink-0 text-xl font-bold text-[var(--lumea-gold)]"
          >
            +
          </span>
        </div>
      </summary>

      <div className="border-t border-[var(--lumea-border)] px-5 py-5 sm:px-6">
        <div className="space-y-5">
          {glossaryEntries.map(
            (entry) => (
              <section
                key={entry.id}
                className="border-b border-[var(--lumea-border)] pb-5 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="text-[17px] font-black text-[var(--lumea-navy)]">
                    {entry.term}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
                    {entry.fullName}
                  </p>
                </div>

                <p className="mt-2 text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
                  {entry.definition}
                </p>
              </section>
            )
          )}
        </div>
      </div>
    </details>
  );
}
