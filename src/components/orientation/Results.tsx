"use client";

import {
  useState,
  type ReactNode,
} from "react";

import {
  calculateRecommendations,
} from "@/data/recommendations";

import type {
  SupportProvider,
} from "@/data/support-providers";

import {
  adaptTextForAudience,
} from "@/lib/orientation/audience-language";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import {
  getLocalRecommendations,
} from "@/lib/orientation/local-routing";

import type {
  OrientationAnswers,
} from "@/lib/orientation/types";

import BereavementSupport from "./BereavementSupport";
import CaregiverSupport from "./CaregiverSupport";
import DistressSupport from "./DistressSupport";
import FreshnessNotice from "./FreshnessNotice";
import GlossaryHelp from "./GlossaryHelp";
import RecommendationActions from "./RecommendationActions";
import RecommendationCard from "./RecommendationCard";

import ResultsNavigation, {
  type ResultNavigationSection,
} from "./ResultsNavigation";

import Roadmap, {
  type RoadmapProviderSelection,
} from "./Roadmap";

interface ResultsProps {
  answers:
    OrientationAnswers;
}

function isCaregiverSituation(
  answers: OrientationAnswers
) {
  switch (
    answers.situation
  ) {
    case "perte-autonomie":
    case "handicap":
    case "retour-hospitalisation":
    case "besoin-regulier":
      return true;

    case "accident-immobilisation":
    case "difficulte-temporaire":
      return (
        answers.need ===
        "aide-quotidien"
      );

    default:
      return false;
  }
}

export default function Results({
  answers,
}: ResultsProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const [
    showOthers,
    setShowOthers,
  ] = useState(false);

  const [
    providerSelections,
    setProviderSelections,
  ] = useState<
    Record<
      string,
      RoadmapProviderSelection
    >
  >({});

  /**
   * ============================================================
   * RECOMMANDATIONS LOCALES
   * ============================================================
   */
  const localRecommendations =
    getLocalRecommendations(
      answers
    );

  /**
   * ============================================================
   * RECOMMANDATIONS GÉNÉRALES
   * ============================================================
   */
  let generalRecommendations =
    calculateRecommendations(
      answers
    );

  if (
    answers.department ===
      "72" &&
    localRecommendations.some(
      (
        recommendation
      ) =>
        recommendation.organizationType ===
        "departement"
    )
  ) {
    generalRecommendations =
      generalRecommendations.filter(
        (
          recommendation
        ) =>
          recommendation.id !==
            "autonomie-sarthe" &&
          recommendation.id !==
            "handicap-sarthe"
      );
  }

  if (
    answers.department ===
      "53" &&
    localRecommendations.some(
      (
        recommendation
      ) =>
        recommendation.organizationId?.startsWith(
          "mayenne-local-"
        )
    )
  ) {
    generalRecommendations =
      generalRecommendations.filter(
        (
          recommendation
        ) =>
          recommendation.id !==
            "autonomie-mayenne" &&
          recommendation.id !==
            "handicap-mayenne"
      );
  }

  /**
   * ============================================================
   * REGROUPEMENT + DOUBLONS
   * ============================================================
   */
  const allRecommendations = [
    ...localRecommendations,
    ...generalRecommendations,
  ].filter(
    (
      recommendation,
      index,
      array
    ) =>
      array.findIndex(
        (
          item
        ) =>
          item.id ===
          recommendation.id
      ) === index
  );

  const firstRecommendation =
    allRecommendations.find(
      (
        recommendation
      ) =>
        recommendation.priority ===
        "primary"
    ) ??
    allRecommendations[0];

  const otherRecommendations =
    firstRecommendation
      ? allRecommendations.filter(
          (
            recommendation
          ) =>
            recommendation.id !==
            firstRecommendation.id
        )
      : [];

  const roadmapRecommendations =
    firstRecommendation
      ? [
          firstRecommendation,
          ...otherRecommendations,
        ]
      : [];

  const selectedProviders =
    Object.values(
      providerSelections
    )
      .map(
        (
          selection
        ) =>
          selection.provider
      )
      .filter(
        (
          provider
        ): provider is SupportProvider =>
          provider !== null
      );

  /**
   * ============================================================
   * BLOCS CONDITIONNELS
   * ============================================================
   */
  const showBereavementSupport =
    answers.situation ===
    "deces-proche";

  const showCaregiverSupport =
    forRelative &&
    isCaregiverSituation(
      answers
    );

  /**
   * ============================================================
   * NAVIGATION
   * ============================================================
   */
  const navigationSections:
    ResultNavigationSection[] = [
      {
        id: "commencer",
        label:
          "Par où commencer",
        shortLabel:
          "Par où commencer",
      },

      ...(showBereavementSupport
        ? [
            {
              id: "soutien-deuil",
              label:
                "Soutien après un décès",
              shortLabel:
                "Soutien",
            },
          ]
        : []),

      ...(showCaregiverSupport
        ? [
            {
              id: "soutien-aidant",
              label:
                "Répit pour l’aidant",
              shortLabel:
                "Répit aidant",
            },
          ]
        : []),

      {
        id: "feuille-route",
        label:
          "Ma feuille de route",
        shortLabel:
          "Feuille de route",
      },

      {
        id: "complements",
        label:
          "En complément",
        shortLabel:
          "En complément",
      },

      {
        id: "a-propos-resultats",
        label:
          "À propos",
        shortLabel:
          "À propos",
      },
    ];

  function updateProviderSelection(
    recommendationId: string,
    provider:
      SupportProvider | null,
    unknownName?: string
  ) {
    setProviderSelections(
      (
        current
      ) => {
        const next = {
          ...current,
        };

        const cleanUnknownName =
          unknownName?.trim();

        if (
          !provider &&
          !cleanUnknownName
        ) {
          delete next[
            recommendationId
          ];

          return next;
        }

        next[
          recommendationId
        ] = {
          provider,

          unknownName:
            cleanUnknownName,
        };

        return next;
      }
    );
  }

  return (
    <div className="orientation-readable mx-auto max-w-[1120px]">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-12">
        <ResultsNavigation
          sections={
            navigationSections
          }
        />

        <main className="min-w-0">
          {/*
           * ====================================================
           * PAR OÙ COMMENCER
           * ====================================================
           */}
          <section
            id="commencer"
            className="scroll-mt-32"
          >
            <header className="mb-7 sm:mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8f6500] sm:text-sm">
                {forRelative
                  ? "Résultat pour votre proche"
                  : "Votre résultat"}
              </p>

              <h1 className="mt-2 text-[1.9rem] font-bold leading-tight text-[var(--lumea-navy)] sm:text-[2.6rem]">
                Voici par où commencer
              </h1>

              {answers.communeName ? (
                <p className="mt-3 text-[16px] leading-7 text-[var(--lumea-blue-grey)] sm:text-[18px] sm:leading-8">
                  {forRelative ? (
                    <>
                      Nous avons recherché
                      les solutions
                      correspondant à la
                      situation de votre
                      proche à{" "}

                      <strong className="text-[var(--lumea-navy)]">
                        {
                          answers.communeName
                        }
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Nous avons recherché
                      les solutions
                      correspondant à{" "}

                      <strong className="text-[var(--lumea-navy)]">
                        {
                          answers.communeName
                        }
                      </strong>
                      .
                    </>
                  )}
                </p>
              ) : null}
            </header>

            <p className="mb-5 text-[13px] leading-6 text-[var(--lumea-blue-grey)] sm:text-sm">
              Les sigles administratifs
              soulignés en pointillés
              peuvent être touchés pour
              afficher une explication
              simple.
            </p>

            {firstRecommendation ? (
              <div>
                <RecommendationCard
                  recommendation={
                    firstRecommendation
                  }
                  primary
                />

                <RecommendationActions
                  recommendation={
                    firstRecommendation
                  }
                  communeName={
                    answers.communeName
                  }
                  onProviderChange={(
                    provider,
                    unknownName
                  ) =>
                    updateProviderSelection(
                      firstRecommendation.id,
                      provider,
                      unknownName
                    )
                  }
                />
              </div>
            ) : (
              <div className="rounded-[22px] border border-[var(--lumea-border)] bg-white p-5 sm:rounded-[24px] sm:p-6">
                <p className="text-lg font-bold text-[var(--lumea-navy)]">
                  {forRelative
                    ? "Nous n’avons pas encore trouvé d’interlocuteur précis pour la situation de votre proche."
                    : "Nous n’avons pas encore trouvé d’interlocuteur précis pour cette situation."}
                </p>
              </div>
            )}
          </section>

          {/*
           * ====================================================
           * DEUIL
           * ====================================================
           */}
          {showBereavementSupport ? (
            <div
              id="soutien-deuil"
              className="scroll-mt-32"
            >
              <BereavementSupport />
            </div>
          ) : null}

          {/*
           * ====================================================
           * AIDANT
           * ====================================================
           */}
          {showCaregiverSupport ? (
            <div
              id="soutien-aidant"
              className="scroll-mt-32"
            >
              <CaregiverSupport
                department={
                  answers.department
                }
                communeName={
                  answers.communeName
                }
              />
            </div>
          ) : null}

          {/*
           * ====================================================
           * FEUILLE DE ROUTE
           * ====================================================
           */}
          <div
            id="feuille-route"
            className="scroll-mt-32"
          >
            <Roadmap
              recommendations={
                roadmapRecommendations
              }
              providerSelections={
                providerSelections
              }
            />
          </div>

          {/*
           * ====================================================
           * EN COMPLÉMENT
           * ====================================================
           */}
          <section
            id="complements"
            className="mt-10 scroll-mt-32 sm:mt-12"
          >
            <div className="overflow-hidden rounded-[24px] border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)]/55 sm:rounded-[30px]">
              {/*
               * INTRODUCTION
               */}
              <div className="border-b border-[var(--lumea-border)] px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8f6500] sm:text-xs">
                      Si vous en avez besoin
                    </p>

                    <h2 className="mt-1.5 text-[1.55rem] font-bold leading-tight text-[var(--lumea-navy)] sm:mt-2 sm:text-[1.8rem]">
                      En complément
                    </h2>
                  </div>

                  <p className="max-w-[540px] text-[14px] leading-6 text-[var(--lumea-blue-grey)] sm:text-[15px] sm:leading-7 lg:text-right">
                    <span className="lg:hidden">
                      Ces ressources restent
                      disponibles si vous en
                      avez besoin.
                    </span>

                    <span className="hidden lg:inline">
                      Ces ressources ne sont
                      pas forcément nécessaires
                      pour avancer maintenant.
                      Elles restent disponibles
                      si une question se pose
                      ou si vous souhaitez aller
                      plus loin.
                    </span>
                  </p>
                </div>
              </div>

              {/*
               * ==================================================
               * MOBILE : MENU COMPACT
               * ==================================================
               */}
              <div className="p-3 sm:p-4 lg:p-7">
                <div className="space-y-3 lg:space-y-4">
                  {/*
                   * ================================================
                   * AUTRES POSSIBILITÉS
                   * ================================================
                   */}
                  {otherRecommendations.length >
                  0 ? (
                    <div className="overflow-hidden rounded-[19px] border border-[var(--lumea-border)] bg-white lg:rounded-[24px] lg:shadow-[0_8px_24px_rgba(13,35,68,0.035)]">
                      <button
                        type="button"
                        aria-expanded={
                          showOthers
                        }
                        onClick={() =>
                          setShowOthers(
                            (
                              current
                            ) =>
                              !current
                          )
                        }
                        className="flex w-full items-center gap-4 p-4 text-left sm:p-5 lg:hidden"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-lg font-black text-[var(--lumea-navy)]">
                          +
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-bold leading-6 text-[var(--lumea-navy)]">
                            Autres possibilités
                          </p>

                          <p className="mt-0.5 text-sm leading-5 text-[var(--lumea-blue-grey)]">
                            {
                              otherRecommendations.length
                            }{" "}
                            autre
                            {otherRecommendations.length >
                            1
                              ? "s"
                              : ""}{" "}
                            piste
                            {otherRecommendations.length >
                            1
                              ? "s"
                              : ""}{" "}
                            à vérifier
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-cream-2)] text-xl font-bold text-[var(--lumea-navy)] transition ${
                            showOthers
                              ? "rotate-45"
                              : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {/*
                       * VERSION DESKTOP
                       */}
                      <div className="hidden p-5 sm:p-6 lg:block">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="max-w-[560px]">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] font-black text-[var(--lumea-navy)]">
                                +
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8f6500]">
                                  Autres pistes
                                </p>

                                <h3 className="mt-1 text-xl font-bold leading-7 text-[var(--lumea-navy)]">
                                  Vous pouvez
                                  aussi vérifier
                                </h3>
                              </div>
                            </div>

                            <p className="mt-4 text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
                              {forRelative
                                ? "D’autres démarches peuvent aussi être utiles à votre proche, mais elles ne sont pas forcément nécessaires tout de suite."
                                : "D’autres démarches peuvent aussi être utiles, mais elles ne sont pas forcément nécessaires tout de suite."}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setShowOthers(
                                (
                                  current
                                ) =>
                                  !current
                              )
                            }
                            className="flex min-h-[52px] shrink-0 items-center justify-center gap-3 rounded-full border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)] px-6 py-3 font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)] hover:bg-white"
                          >
                            <span>
                              {showOthers
                                ? "Masquer"
                                : "Voir les autres possibilités"}
                            </span>

                            {!showOthers ? (
                              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-sm">
                                {
                                  otherRecommendations.length
                                }
                              </span>
                            ) : null}
                          </button>
                        </div>
                      </div>

                      {/*
                       * CONTENU DÉPLIABLE
                       */}
                      <div
                        className={
                          showOthers
                            ? "border-t border-[var(--lumea-border)] bg-[var(--lumea-cream-2)]/30 p-3 sm:p-4 lg:p-5"
                            : "hidden"
                        }
                        aria-hidden={
                          !showOthers
                        }
                      >
                        <div className="space-y-3">
                          {otherRecommendations.map(
                            (
                              recommendation
                            ) => {
                              const summaryTitle =
                                adaptTextForAudience(
                                  recommendation.title,
                                  audience
                                );

                              return (
                                <details
                                  key={
                                    recommendation.id
                                  }
                                  className="overflow-hidden rounded-[16px] border border-[var(--lumea-border)] bg-white lg:rounded-[18px]"
                                >
                                  <summary className="cursor-pointer list-none p-4 sm:p-5">
                                    <div className="flex items-center justify-between gap-4">
                                      <p className="text-[16px] font-bold leading-6 text-[var(--lumea-navy)] sm:text-[17px] sm:leading-7">
                                        {
                                          summaryTitle
                                        }
                                      </p>

                                      <span
                                        aria-hidden="true"
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-cream-2)] text-lg font-bold text-[var(--lumea-gold)]"
                                      >
                                        +
                                      </span>
                                    </div>
                                  </summary>

                                  <div className="border-t border-[var(--lumea-border)] p-4 sm:p-5">
                                    <RecommendationCard
                                      recommendation={
                                        recommendation
                                      }
                                    />

                                    <RecommendationActions
                                      recommendation={
                                        recommendation
                                      }
                                      communeName={
                                        answers.communeName
                                      }
                                      onProviderChange={(
                                        provider,
                                        unknownName
                                      ) =>
                                        updateProviderSelection(
                                          recommendation.id,
                                          provider,
                                          unknownName
                                        )
                                      }
                                    />
                                  </div>
                                </details>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/*
                   * ================================================
                   * DICTIONNAIRE + ÉCOUTE
                   *
                   * Desktop : côte à côte.
                   * Mobile : simples lignes à ouvrir.
                   * ================================================
                   */}
                  <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
                    <SupplementDisclosure
                      icon="?"
                      title="Un mot n’est pas clair ?"
                      description="APA, PCH, CLIC, MDPH… on vous les traduit simplement."
                    >
                      <GlossaryHelp />
                    </SupplementDisclosure>

                    <SupplementDisclosure
                      icon="♡"
                      title="Besoin de parler ?"
                      description="Des personnes peuvent aussi simplement écouter et orienter."
                    >
                      <DistressSupport />
                    </SupplementDisclosure>
                  </div>

                  {/*
                   * ================================================
                   * INFORMATIONS VÉRIFIÉES
                   * ================================================
                   */}
                  <SupplementDisclosure
                    icon="✓"
                    title="Informations vérifiées"
                    description="Voir d’où viennent les informations et quand elles ont été contrôlées."
                    wide
                  >
                    <FreshnessNotice
                      recommendations={
                        allRecommendations
                      }
                      providers={
                        selectedProviders
                      }
                    />
                  </SupplementDisclosure>
                </div>
              </div>
            </div>
          </section>

          {/*
           * ====================================================
           * À PROPOS
           * ====================================================
           */}
          <footer
            id="a-propos-resultats"
            className="mt-7 scroll-mt-32 border-t border-[var(--lumea-border)] pt-6 sm:mt-8 sm:pt-7"
          >
            <details>
              <summary className="cursor-pointer text-sm font-semibold text-[var(--lumea-blue-grey)]">
                À propos de vos données
                et de ces résultats
              </summary>

              <div className="mt-4 max-w-[700px] text-sm leading-7 text-[var(--lumea-blue-grey)]">
                <p>
                  {forRelative
                    ? "Vos réponses, le code postal et la commune de votre proche ne sont pas enregistrés par Luméa."
                    : "Vos réponses, votre code postal et votre commune ne sont pas enregistrés par Luméa."}
                </p>

                <p className="mt-3">
                  {forRelative
                    ? "Cet outil vous aide à identifier des interlocuteurs possibles pour votre proche. Il ne détermine pas son droit à une aide : seul l’organisme concerné peut confirmer une prise en charge."
                    : "Cet outil vous aide à identifier des interlocuteurs possibles. Il ne détermine pas votre droit à une aide : seul l’organisme concerné peut confirmer une prise en charge."}
                </p>
              </div>
            </details>
          </footer>

          {/*
           * Espace pour la boussole mobile.
           */}
          <div
            aria-hidden="true"
            className="h-24 lg:hidden"
          />
        </main>
      </div>
    </div>
  );
}

/**
 * ==============================================================
 * RESSOURCE COMPLÉMENTAIRE RESPONSIVE
 * ==============================================================
 *
 * MOBILE :
 * une ligne compacte façon application.
 * Le contenu n'apparaît qu'au clic.
 *
 * DESKTOP :
 * le contenu reste directement visible
 * comme dans la version validée.
 */
interface SupplementDisclosureProps {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}

function SupplementDisclosure({
  icon,
  title,
  description,
  children,
  wide = false,
}: SupplementDisclosureProps) {
  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <div
      className={[
        "min-w-0 overflow-hidden rounded-[19px] border border-[var(--lumea-border)] bg-white",

        "lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent",

        wide
          ? "lg:col-span-2"
          : "",
      ].join(
        " "
      )}
    >
      {/*
       * MOBILE : LIGNE COMPACTE
       */}
      <button
        type="button"
        aria-expanded={
          open
        }
        onClick={() =>
          setOpen(
            (
              current
            ) =>
              !current
          )
        }
        className="flex w-full items-center gap-4 p-4 text-left sm:p-5 lg:hidden"
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold-soft)] text-base font-black text-[var(--lumea-navy)]"
        >
          {icon}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-6 text-[var(--lumea-navy)]">
            {title}
          </span>

          <span className="mt-0.5 block text-sm leading-5 text-[var(--lumea-blue-grey)]">
            {description}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-cream-2)] text-xl font-bold text-[var(--lumea-navy)] transition ${
            open
              ? "rotate-45"
              : ""
          }`}
        >
          +
        </span>
      </button>

      {/*
       * CONTENU :
       * - masqué mobile par défaut ;
       * - toujours affiché desktop.
       */}
      <div
        className={[
          open
            ? "block"
            : "hidden",

          "border-t border-[var(--lumea-border)] p-3 [&>*]:!mt-0 sm:p-4",

          "lg:block lg:border-0 lg:p-0",
        ].join(
          " "
        )}
      >
        {children}
      </div>
    </div>
  );
}