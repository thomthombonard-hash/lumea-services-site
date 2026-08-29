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
          </footer>
        </div>
      ) : null}
    </section>
  );
}