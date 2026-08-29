"use client";

import supportLines from "@/data/support-lines.json";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

function getLine(
  id: string
) {
  return supportLines.find(
    (
      line
    ) =>
      line.id === id
  );
}

function getTelephoneHref(
  phone?: string
) {
  if (!phone) {
    return "#";
  }

  return `tel:${phone.replace(
    /\s/g,
    ""
  )}`;
}

export default function DistressSupport() {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const croixRouge =
    getLine(
      "croix-rouge-ecoute"
    );

  const prevention =
    getLine(
      "3114"
    );

  const samu =
    getLine(
      "samu"
    );

  const emergency =
    getLine(
      "112"
    );

  return (
    <details className="mt-10 rounded-[18px] border border-[var(--lumea-border)] bg-white">
      {/*
       * ========================================================
       * LIGNE DISCRÈTE
       * ========================================================
       */}
      <summary className="cursor-pointer list-none px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--lumea-navy)]">
              {forRelative
                ? "Si la situation devient trop difficile pour votre proche"
                : "Si la situation devient trop difficile à vivre"}
            </p>

            <p className="mt-1 text-sm leading-6 text-[var(--lumea-blue-grey)]">
              Des personnes peuvent aussi
              simplement écouter et orienter.
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

      <div className="border-t border-[var(--lumea-border)] px-5 py-6 sm:px-6">
        {/*
         * ======================================================
         * ÉCOUTE GÉNÉRALE
         * ======================================================
         */}
        {croixRouge ? (
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#8f6500]">
              Pour parler à quelqu&apos;un
            </p>

            <h3 className="mt-2 text-xl font-bold leading-7 text-[var(--lumea-navy)]">
              {
                croixRouge.name
              }
            </h3>

            <p className="mt-3 max-w-[650px] text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
              {forRelative
                ? "Vous ou votre proche pouvez appeler simplement pour parler d’une difficulté, d’un sentiment d’isolement ou pour être orienté vers une aide adaptée."
                : "Vous pouvez appeler simplement pour parler d’une difficulté, d’un sentiment d’isolement ou pour être orienté vers une aide adaptée."}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={
                  getTelephoneHref(
                    croixRouge.phone
                  )
                }
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--lumea-gold)] px-6 py-3 text-[17px] font-bold text-[var(--lumea-navy)]"
              >
                Appeler le{" "}
                {
                  croixRouge.phone
                }
              </a>

              <span className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
                {
                  croixRouge.details
                }
              </span>
            </div>
          </section>
        ) : null}

        {/*
         * ======================================================
         * DÉTRESSE IMPORTANTE
         *
         * Volontairement en deuxième niveau :
         * le 3114 n'est pas présenté comme une
         * ressource nécessaire pour toute
         * difficulté de la vie.
         * ======================================================
         */}
        {prevention ? (
          <section className="mt-7 border-t border-[var(--lumea-border)] pt-6">
            <p className="font-bold text-[var(--lumea-navy)]">
              {forRelative
                ? "Si vous êtes très inquiet pour votre proche"
                : "Si vous êtes en grande détresse"}
            </p>

            <p className="mt-2 max-w-[650px] text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
              {forRelative
                ? "Si votre proche évoque des idées suicidaires, ou si vous êtes inquiet pour sa sécurité, vous pouvez appeler le 3114. Ce numéro est également là pour l’entourage."
                : "Si vous avez des idées suicidaires ou sentez que la situation devient ingérable, vous pouvez appeler le 3114."}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={
                  getTelephoneHref(
                    prevention.phone
                  )
                }
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border-2 border-[var(--lumea-navy)] bg-white px-6 py-3 text-[17px] font-bold text-[var(--lumea-navy)]"
              >
                Appeler le 3114
              </a>

              <span className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
                {
                  prevention.details
                }
              </span>
            </div>
          </section>
        ) : null}

        {/*
         * ======================================================
         * URGENCE IMMÉDIATE
         * ======================================================
         */}
        <section className="mt-7 border-t border-[var(--lumea-border)] pt-5">
          <p className="text-sm leading-6 text-[var(--lumea-blue-grey)]">
            <strong className="text-[var(--lumea-navy)]">
              En cas de danger immédiat
              ou d&apos;urgence médicale :
            </strong>{" "}
            appelez le{" "}

            {samu ? (
              <a
                href={
                  getTelephoneHref(
                    samu.phone
                  )
                }
                className="font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
              >
                15
              </a>
            ) : (
              "15"
            )}

            {" "}ou le{" "}

            {emergency ? (
              <a
                href={
                  getTelephoneHref(
                    emergency.phone
                  )
                }
                className="font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
              >
                112
              </a>
            ) : (
              "112"
            )}
            .
          </p>
        </section>
      </div>
    </details>
  );
}