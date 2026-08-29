"use client";

import type {
  SupportProvider,
} from "@/data/support-providers";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import {
  buildFreshnessReport,
} from "@/lib/orientation/freshness";

import type {
  Recommendation,
} from "@/lib/orientation/types";

interface FreshnessNoticeProps {
  recommendations:
    Recommendation[];

  providers:
    SupportProvider[];
}

function formatFrenchDate(
  value?: string
): string | null {
  if (!value) {
    return null;
  }

  const date =
    new Date(
      `${value}T12:00:00Z`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(
    date
  );
}

export default function FreshnessNotice({
  recommendations,
  providers,
}: FreshnessNoticeProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience === "relative";

  const report =
    buildFreshnessReport(
      recommendations,
      providers
    );

  /**
   * On masque le bloc uniquement lorsqu'il n'existe réellement
   * aucune donnée de fraîcheur ET aucune source non suivie.
   */
  if (
    report.checks.length === 0 &&
    report.missingSourceIds.length === 0
  ) {
    return null;
  }

  const oldestDate =
    formatFrenchDate(
      report.oldestCheckedAt
    );

  const isFresh =
    report.level ===
    "fresh";

  const needsReview =
    report.level ===
    "review";

  return (
    <details className="mt-8 rounded-[18px] border border-[var(--lumea-border)] bg-white">
      <summary className="cursor-pointer list-none px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              isFresh
                ? "bg-[var(--lumea-gold)]"
                : "bg-[#a75f0b]"
            }`}
          />

          <span className="font-semibold text-[var(--lumea-navy)]">
            {isFresh
              ? "Informations vérifiées"
              : needsReview
                ? "Certaines informations doivent être revérifiées"
                : "Certaines informations sont anciennes"}
          </span>
        </div>
      </summary>

      <div className="border-t border-[var(--lumea-border)] px-5 py-5">
        {isFresh ? (
          <p className="text-sm leading-7 text-[var(--lumea-blue-grey)]">
            Les sources et coordonnées
            utilisées pour cette orientation
            sont suivies régulièrement.

            {oldestDate ? (
              <>
                {" "}
                La vérification la plus
                ancienne parmi les
                informations affichées
                date du{" "}

                <strong className="text-[var(--lumea-navy)]">
                  {oldestDate}
                </strong>
                .
              </>
            ) : null}
          </p>
        ) : null}

        {needsReview ? (
          <p className="text-sm leading-7 text-[var(--lumea-blue-grey)]">
            Certaines informations
            utilisées dans cette orientation
            doivent être contrôlées à nouveau.
            Lorsque cela est possible,
            utilisez également le site officiel
            de l&apos;organisme pour confirmer
            ses coordonnées.
          </p>
        ) : null}

        {report.level ===
        "outdated" ? (
          <div>
            <p className="text-sm font-bold leading-6 text-[var(--lumea-navy)]">
              Certaines informations
              n&apos;ont pas été revérifiées
              récemment.
            </p>

            <p className="mt-2 text-sm leading-7 text-[var(--lumea-blue-grey)]">
              {forRelative
                ? "Si un numéro ne fonctionne plus, utilisez le site officiel de l’organisme ou les coordonnées présentes sur la carte ou le contrat de votre proche."
                : "Si un numéro ne fonctionne plus, utilisez le site officiel de l’organisme ou les coordonnées présentes sur votre carte ou votre contrat."}
            </p>
          </div>
        ) : null}

        <p className="mt-4 text-xs leading-6 text-[var(--lumea-blue-grey)]">
          Les coordonnées des organismes
          peuvent évoluer indépendamment
          de Luméa.
        </p>
      </div>
    </details>
  );
}
