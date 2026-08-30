"use client";

import {
  useState,
} from "react";

import {
  getOrganizationById,
} from "@/data/organisations";

import type {
  SupportProvider,
} from "@/data/support-providers";

import {
  adaptRequestForAudience,
  adaptTextForAudience,
} from "@/lib/orientation/audience-language";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  Recommendation,
} from "@/lib/orientation/types";

export interface RoadmapProviderSelection {
  provider:
    SupportProvider | null;

  unknownName?: string;
}

interface RoadmapProps {
  recommendations:
    Recommendation[];

  providerSelections:
    Record<
      string,
      RoadmapProviderSelection
    >;
}

/**
 * Petite protection utilisée uniquement
 * pour générer la version imprimable.
 */
function escapeHtml(
  value: string
) {
  return value.replace(
    /[&<>"']/g,
    (
      character
    ) => {
      const entities:
        Record<
          string,
          string
        > = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        };

      return (
        entities[
          character
        ] ??
        character
      );
    }
  );
}

function formatPrintText(
  value?: string
) {
  if (
    !value
  ) {
    return "";
  }

  return escapeHtml(
    value
  ).replace(
    /\n/g,
    "<br />"
  );
}

export default function Roadmap({
  recommendations,
  providerSelections,
}: RoadmapProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    completed,
    setCompleted,
  ] = useState<
    Record<
      string,
      boolean
    >
  >({});

  if (
    recommendations.length ===
    0
  ) {
    return null;
  }

  const completedCount =
    recommendations.filter(
      (
        recommendation
      ) =>
        completed[
          recommendation.id
        ]
    ).length;

  /**
   * ============================================================
   * VERSION IMPRIMABLE / PDF
   * ============================================================
   *
   * On ouvre une page temporaire contenant
   * uniquement la feuille de route.
   *
   * L'utilisateur peut ensuite :
   * - l'imprimer ;
   * - ou choisir "Enregistrer au format PDF".
   *
   * Aucune donnée n'est envoyée sur un serveur.
   */
  function printRoadmap() {
    const preparationDate =
      new Intl.DateTimeFormat(
        "fr-FR",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ).format(
        new Date()
      );

    const itemsHtml =
      recommendations
        .map(
          (
            recommendation,
            index
          ) => {
            const organization =
              recommendation.organizationId
                ? getOrganizationById(
                    recommendation.organizationId
                  )
                : undefined;

            const providerSelection =
              providerSelections[
                recommendation.id
              ];

            const provider =
              providerSelection
                ?.provider;

            const unknownName =
              providerSelection
                ?.unknownName
                ?.trim();

            const displayName =
              provider?.name ??
              unknownName ??
              organization?.name ??
              adaptTextForAudience(
                recommendation.title,
                audience
              );

            const why =
              adaptTextForAudience(
                recommendation.why,
                audience
              );

            const whatToAsk =
              recommendation.whatToAsk
                ? adaptRequestForAudience(
                    recommendation.whatToAsk,
                    audience
                  )
                : undefined;

            const isDone =
              Boolean(
                completed[
                  recommendation.id
                ]
              );

            const providerContacts =
              provider?.contacts ??
              [];

            let contactsHtml =
              "";

            if (
              providerContacts.length >
              0
            ) {
              contactsHtml =
                providerContacts
                  .map(
                    (
                      contact
                    ) => `
                      <div class="contact">
                        <strong>${escapeHtml(
                          contact.label
                        )}</strong>
                        <span>${escapeHtml(
                          contact.phone
                        )}</span>
                        ${
                          contact.detail
                            ? `<small>${formatPrintText(
                                contact.detail
                              )}</small>`
                            : ""
                        }
                      </div>
                    `
                  )
                  .join(
                    ""
                  );
            } else if (
              !provider &&
              organization?.phone
            ) {
              contactsHtml = `
                <div class="contact">
                  <strong>Téléphone</strong>
                  <span>${escapeHtml(
                    organization.phone
                  )}</span>
                </div>
              `;
            }

            const website =
              provider?.website ??
              organization?.website;

            const websiteHtml =
              website
                ? `
                  <div class="website">
                    Site officiel :
                    ${escapeHtml(
                      website
                    )}
                  </div>
                `
                : "";

            const requestHtml =
              whatToAsk
                ? `
                  <div class="ask">
                    <strong>À demander</strong>
                    <p>${formatPrintText(
                      whatToAsk
                    )}</p>
                  </div>
                `
                : "";

            return `
              <article class="step ${
                isDone
                  ? "done"
                  : ""
              }">
                <div class="step-header">
                  <div class="checkbox">
                    ${
                      isDone
                        ? "✓"
                        : ""
                    }
                  </div>

                  <div class="step-title">
                    <div class="priority">
                      ${
                        index === 0
                          ? "À faire en premier"
                          : `À vérifier ensuite · ${
                              index +
                              1
                            }`
                      }
                    </div>

                    <h2>
                      ${escapeHtml(
                        displayName
                      )}
                    </h2>
                  </div>
                </div>

                <div class="step-body">
                  <p class="why">
                    ${formatPrintText(
                      why
                    )}
                  </p>

                  ${
                    contactsHtml
                      ? `<div class="contacts">${contactsHtml}</div>`
                      : ""
                  }

                  ${requestHtml}

                  ${websiteHtml}
                </div>
              </article>
            `;
          }
        )
        .join(
          ""
        );

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=980,height=900"
      );

    if (
      !printWindow
    ) {
      window.alert(
        "Votre navigateur a bloqué la fenêtre d’impression. Autorisez les fenêtres pop-up pour ce site puis réessayez."
      );

      return;
    }

    printWindow.document.open();

    printWindow.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />

          <title>
            Ma feuille de route - Luméa Services
          </title>

          <style>
            * {
              box-sizing: border-box;
            }

            @page {
              size: A4;
              margin: 16mm;
            }

            body {
              margin: 0;
              background: #ffffff;
              color: #0d2344;
              font-family:
                Arial,
                Helvetica,
                sans-serif;
              font-size: 14px;
              line-height: 1.5;
            }

            .document {
              max-width: 780px;
              margin: 0 auto;
            }

            .brand {
              padding-bottom: 22px;
              border-bottom: 2px solid #d7bd79;
            }

            .brand-name {
              margin: 0;
              color: #0d2344;
              font-size: 13px;
              font-weight: 800;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }

            .tool-name {
              margin: 5px 0 0;
              color: #946800;
              font-size: 12px;
              font-weight: 700;
            }

            h1 {
              margin: 24px 0 0;
              color: #0d2344;
              font-size: 30px;
              line-height: 1.15;
            }

            .intro {
              margin: 10px 0 0;
              color: #536477;
              font-size: 15px;
            }

            .date {
              margin: 18px 0 0;
              color: #536477;
              font-size: 12px;
            }

            .steps {
              margin-top: 28px;
            }

            .step {
              margin: 0 0 18px;
              padding: 20px;
              border: 1px solid #ded9cb;
              border-radius: 14px;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .step.done {
              background: #f5f2e9;
            }

            .step-header {
              display: flex;
              gap: 14px;
              align-items: flex-start;
            }

            .checkbox {
              width: 28px;
              height: 28px;
              flex: 0 0 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #d7bd79;
              border-radius: 7px;
              color: #0d2344;
              font-size: 17px;
              font-weight: 900;
            }

            .done .checkbox {
              border-color: #0d2344;
              background: #0d2344;
              color: white;
            }

            .step-title {
              min-width: 0;
            }

            .priority {
              color: #946800;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }

            .step h2 {
              margin: 4px 0 0;
              color: #0d2344;
              font-size: 19px;
              line-height: 1.3;
            }

            .done h2 {
              text-decoration: line-through;
              opacity: 0.7;
            }

            .step-body {
              margin-left: 42px;
              padding-top: 13px;
            }

            .why {
              margin: 0;
              color: #536477;
            }

            .contacts {
              margin-top: 15px;
              display: grid;
              gap: 8px;
            }

            .contact {
              padding: 11px 13px;
              background: #f8f6f0;
              border-radius: 9px;
            }

            .contact strong {
              display: block;
              color: #536477;
              font-size: 11px;
            }

            .contact span {
              display: block;
              margin-top: 2px;
              color: #0d2344;
              font-size: 16px;
              font-weight: 800;
            }

            .contact small {
              display: block;
              margin-top: 4px;
              color: #536477;
            }

            .ask {
              margin-top: 15px;
              padding: 11px 13px;
              border-left: 4px solid #d7bd79;
              background: #fffaf0;
            }

            .ask strong {
              color: #0d2344;
              font-size: 12px;
            }

            .ask p {
              margin: 4px 0 0;
              color: #536477;
            }

            .website {
              margin-top: 13px;
              color: #536477;
              font-size: 11px;
              word-break: break-word;
            }

            .footer {
              margin-top: 28px;
              padding-top: 16px;
              border-top: 1px solid #ded9cb;
              color: #687686;
              font-size: 10px;
              line-height: 1.6;
            }

            .no-print {
              max-width: 780px;
              margin: 0 auto 20px;
              padding: 12px 16px;
              border-radius: 10px;
              background: #0d2344;
              color: #ffffff;
              text-align: center;
              font-size: 13px;
            }

            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="no-print">
            Dans la fenêtre d’impression,
            choisissez « Enregistrer au format PDF »
            pour conserver ce document.
          </div>

          <main class="document">
            <header class="brand">
              <p class="brand-name">
                Luméa Services
              </p>

              <p class="tool-name">
                Qui peut m’aider ?
              </p>

              <h1>
                ${
                  forRelative
                    ? "Feuille de route pour mon proche"
                    : "Ma feuille de route"
                }
              </h1>

              <p class="intro">
                ${
                  forRelative
                    ? "Les démarches utiles pour avancer dans la situation de votre proche, regroupées au même endroit."
                    : "Les démarches utiles pour avancer, regroupées au même endroit."
                }
              </p>

              <p class="date">
                Préparée le
                ${escapeHtml(
                  preparationDate
                )}
              </p>
            </header>

            <section class="steps">
              ${itemsHtml}
            </section>

            <footer class="footer">
              Cette feuille de route a été préparée
              à partir des informations affichées
              dans l’outil « Qui peut m’aider ? »
              de Luméa Services.

              <br /><br />

              Elle constitue une aide à l’orientation.
              Seuls les organismes concernés peuvent
              confirmer l’existence d’un droit,
              d’une aide ou d’une prise en charge.
            </footer>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    window.setTimeout(
      () => {
        printWindow.print();
      },
      250
    );
  }

  return (
    <section className="mt-10">
      <button
        type="button"
        aria-expanded={
          isOpen
        }
        onClick={() =>
          setIsOpen(
            (
              current
            ) =>
              !current
          )
        }
        className="w-full rounded-[24px] border border-[var(--lumea-border)] bg-white p-5 text-left transition hover:border-[var(--lumea-gold)] sm:p-6"
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-xl"
            >
              ✓
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--lumea-navy)] sm:text-2xl">
                {forRelative
                  ? "Feuille de route pour mon proche"
                  : "Ma feuille de route"}
              </h2>

              <p className="mt-1 text-[15px] leading-6 text-[var(--lumea-blue-grey)]">
                Retrouvez toutes les
                démarches au même endroit.
              </p>
            </div>
          </div>

          <span className="shrink-0 font-bold text-[var(--lumea-navy)]">
            {isOpen
              ? "Masquer"
              : "Voir"}
          </span>
        </div>
      </button>

      {isOpen ? (
        <div
          data-roadmap
          className="mt-4 overflow-hidden rounded-[26px] border border-[var(--lumea-border)] bg-[#fbfaf7]"
        >
          <header className="border-b border-[var(--lumea-border)] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#8f6500]">
                  {forRelative
                    ? "Feuille de route de votre proche"
                    : "Votre feuille de route"}
                </p>

                <h2 className="mt-2 text-[1.8rem] font-bold leading-tight text-[var(--lumea-navy)]">
                  Avancez tranquillement,
                  une démarche après
                  l&apos;autre.
                </h2>

                <p className="mt-3 max-w-[650px] text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
                  {forRelative
                    ? "Commencez par la première. Les suivantes sont des possibilités à vérifier selon la situation de votre proche."
                    : "Commencez par la première. Les suivantes sont des possibilités à vérifier selon votre situation."}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  printRoadmap
                }
                className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--lumea-border)] bg-[#f8f4eb] px-5 py-3 text-sm font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)] hover:bg-white"
              >
                <span
                  aria-hidden="true"
                  className="text-base"
                >
                  ⎙
                </span>

                <span>
                  Imprimer / PDF
                </span>
              </button>
            </div>

            {completedCount > 0 ? (
              <p className="mt-5 font-bold text-[var(--lumea-navy)]">
                {completedCount} démarche
                {completedCount > 1
                  ? "s"
                  : ""}{" "}
                cochée
                {completedCount > 1
                  ? "s"
                  : ""}
                {" "}sur{" "}
                {
                  recommendations.length
                }
              </p>
            ) : null}
          </header>

          <div className="divide-y divide-[var(--lumea-border)]">
            {recommendations.map(
              (
                recommendation,
                index
              ) => {
                const organization =
                  recommendation.organizationId
                    ? getOrganizationById(
                        recommendation.organizationId
                      )
                    : undefined;

                const providerSelection =
                  providerSelections[
                    recommendation.id
                  ];

                const provider =
                  providerSelection
                    ?.provider;

                const unknownName =
                  providerSelection
                    ?.unknownName
                    ?.trim();

                const isProviderRecommendation =
                  recommendation.organizationType ===
                    "mutuelle" ||
                  recommendation.organizationType ===
                    "assurance";

                const displayName =
                  provider?.name ??
                  unknownName ??
                  organization?.name ??
                  adaptTextForAudience(
                    recommendation.title,
                    audience
                  );

                const providerContacts =
                  provider?.contacts ??
                  [];

                const isDone =
                  Boolean(
                    completed[
                      recommendation.id
                    ]
                  );

                const why =
                  adaptTextForAudience(
                    recommendation.why,
                    audience
                  );

                const whatToAsk =
                  recommendation.whatToAsk
                    ? adaptRequestForAudience(
                        recommendation.whatToAsk,
                        audience
                      )
                    : undefined;

                return (
                  <article
                    key={
                      recommendation.id
                    }
                    className={`p-6 sm:p-8 ${
                      isDone
                        ? "bg-[#f4f1e8]"
                        : "bg-[#fbfaf7]"
                    }`}
                  >
                    <div className="flex gap-4 sm:gap-5">
                      <button
                        type="button"
                        aria-label={
                          isDone
                            ? `Marquer ${displayName} comme non terminé`
                            : `Marquer ${displayName} comme terminé`
                        }
                        aria-pressed={
                          isDone
                        }
                        onClick={() =>
                          setCompleted(
                            (
                              current
                            ) => ({
                              ...current,

                              [recommendation.id]:
                                !isDone,
                            })
                          )
                        }
                        className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border-2 text-lg font-bold transition ${
                          isDone
                            ? "border-[var(--lumea-navy)] bg-[var(--lumea-navy)] text-white"
                            : "border-[var(--lumea-gold)] bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#8f6500]">
                          {index === 0
                            ? "À faire en premier"
                            : `À vérifier ensuite · ${index + 1}`}
                        </p>

                        <h3
                          className={`mt-1 text-xl font-bold leading-7 text-[var(--lumea-navy)] sm:text-[1.35rem] ${
                            isDone
                              ? "line-through opacity-60"
                              : ""
                          }`}
                        >
                          {displayName}
                        </h3>

                        <p className="mt-3 text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
                          {why}
                        </p>

                        {providerContacts.length >
                        0 ? (
                          <div className="mt-5 space-y-3">
                            {providerContacts.map(
                              (
                                contact
                              ) => (
                                <div
                                  key={`${contact.label}-${contact.phone}`}
                                  className="rounded-[14px] bg-white px-4 py-3"
                                >
                                  <p className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
                                    {
                                      contact.label
                                    }
                                  </p>

                                  <a
                                    href={`tel:${contact.phone.replace(
                                      /\s/g,
                                      ""
                                    )}`}
                                    className="mt-1 inline-block text-[18px] font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
                                  >
                                    {
                                      contact.phone
                                    }
                                  </a>
                                </div>
                              )
                            )}
                          </div>
                        ) : null}

                        {!provider &&
                        organization?.phone ? (
                          <div className="mt-5 rounded-[14px] bg-white px-4 py-3">
                            <p className="text-sm font-semibold text-[var(--lumea-blue-grey)]">
                              Téléphone
                            </p>

                            <a
                              href={`tel:${organization.phone.replace(
                                /\s/g,
                                ""
                              )}`}
                              className="mt-1 inline-block text-[18px] font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
                            >
                              {
                                organization.phone
                              }
                            </a>
                          </div>
                        ) : null}

                        {isProviderRecommendation &&
                        !provider ? (
                          <div className="mt-5 rounded-[14px] border border-[#ead7a2] bg-[#fffaf0] px-4 py-3">
                            <p className="text-[15px] leading-6 text-[var(--lumea-blue-grey)]">
                              {unknownName
                                ? forRelative
                                  ? `Nous n'avons pas encore les coordonnées de ${unknownName}. Utilisez la carte ou le contrat de votre proche pour trouver le numéro correspondant.`
                                  : `Nous n'avons pas encore les coordonnées de ${unknownName}. Utilisez votre carte ou votre contrat pour trouver le numéro correspondant.`
                                : forRelative
                                  ? "Choisissez l’organisme de votre proche dans la démarche correspondante pour obtenir ses coordonnées."
                                  : "Choisissez votre organisme dans la démarche correspondante pour obtenir ses coordonnées."}
                            </p>
                          </div>
                        ) : null}

                        {whatToAsk ? (
                          <div className="mt-5 border-l-4 border-[var(--lumea-gold)] pl-4">
                            <p className="text-sm font-bold text-[var(--lumea-navy)]">
                              À demander
                            </p>

                            <p className="mt-1 text-[15px] leading-6 text-[var(--lumea-blue-grey)]">
                              {whatToAsk}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>

          <footer className="border-t border-[var(--lumea-border)] bg-white p-5 text-center sm:p-6">
            <p className="text-sm leading-6 text-[var(--lumea-blue-grey)]">
              Les cases cochées ne sont
              pas enregistrées. Elles
              disparaîtront lorsque vous
              fermerez ou actualiserez
              cette page.
            </p>

            <button
              type="button"
              onClick={
                printRoadmap
              }
              className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[var(--lumea-border)] bg-[#f8f4eb] px-5 py-2.5 text-sm font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
            >
              <span
                aria-hidden="true"
              >
                ⎙
              </span>

              Imprimer ou enregistrer
              en PDF
            </button>
          </footer>
        </div>
      ) : null}
    </section>
  );
}