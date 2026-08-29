"use client";

import {
  useState,
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
import DistressSupport from "./DistressSupport";
import FreshnessNotice from "./FreshnessNotice";
import GlossaryHelp from "./GlossaryHelp";
import RecommendationActions from "./RecommendationActions";
import RecommendationCard from "./RecommendationCard";

import Roadmap, {
  type RoadmapProviderSelection,
} from "./Roadmap";

interface ResultsProps {
  answers:
    OrientationAnswers;
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

  /**
   * Choix des mutuelles / assurances /
   * banques conservés uniquement
   * dans la mémoire de cette page.
   */
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

  /**
   * En Sarthe :
   * si un interlocuteur local précis
   * est trouvé, on évite d'afficher
   * en plus la recommandation
   * départementale générique.
   */
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

  /**
   * En Mayenne :
   * même logique avec les Maisons
   * du Département.
   */
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
   * REGROUPEMENT + SUPPRESSION DES DOUBLONS
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

  /**
   * On affiche en premier une
   * recommandation prioritaire.
   *
   * À défaut, on prend simplement
   * la première disponible.
   */
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

  /**
   * La feuille de route reprend
   * toutes les démarches dans
   * l'ordre d'affichage.
   */
  const roadmapRecommendations =
    firstRecommendation
      ? [
          firstRecommendation,
          ...otherRecommendations,
        ]
      : [];

  /**
   * Organismes réellement sélectionnés
   * dans les recommandations
   * assurance / mutuelle.
   *
   * Ils sont transmis au système
   * de fraîcheur afin qu'il puisse
   * tenir compte de leur date
   * de vérification.
   */
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
   * Aide spécifique au deuil.
   */
  const showBereavementSupport =
    answers.situation ===
    "deces-proche";

  /**
   * ============================================================
   * MÉMORISATION TEMPORAIRE DE L'ORGANISME
   * ============================================================
   */
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

        /**
         * Si aucun organisme et aucun
         * nom libre ne sont présents,
         * on supprime simplement
         * l'entrée correspondante.
         */
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
    <div className="orientation-readable orientation-reading-width">
      {/*
       * ========================================================
       * EN-TÊTE DES RÉSULTATS
       * ========================================================
       */}
      <header className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#8f6500]">
          {forRelative
            ? "Résultat pour votre proche"
            : "Votre résultat"}
        </p>

        <h1 className="mt-2 text-[2.1rem] font-bold leading-tight text-[var(--lumea-navy)] sm:text-[2.6rem]">
          Voici par où commencer
        </h1>

        {answers.communeName ? (
          <p className="mt-3 text-[18px] leading-8 text-[var(--lumea-blue-grey)]">
            {forRelative ? (
              <>
                Nous avons recherché
                les solutions correspondant
                à la situation de votre
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
                les solutions correspondant
                à{" "}

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

      <p className="mb-5 text-sm leading-6 text-[var(--lumea-blue-grey)]">
        Les sigles administratifs soulignés
        en pointillés peuvent être touchés
        pour afficher une explication simple.
      </p>

      {/*
       * ========================================================
       * PREMIÈRE DÉMARCHE
       * ========================================================
       */}
      {firstRecommendation ? (
        <section>
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
        </section>
      ) : (
        <div className="rounded-[24px] border border-[var(--lumea-border)] bg-white p-6">
          <p className="text-lg font-bold text-[var(--lumea-navy)]">
            {forRelative
              ? "Nous n’avons pas encore trouvé d’interlocuteur précis pour la situation de votre proche."
              : "Nous n’avons pas encore trouvé d’interlocuteur précis pour cette situation."}
          </p>
        </div>
      )}

      {/*
       * ========================================================
       * SOUTIEN SPÉCIFIQUE AU DEUIL
       * ========================================================
       */}
      {showBereavementSupport ? (
        <BereavementSupport />
      ) : null}

      {/*
       * ========================================================
       * FEUILLE DE ROUTE
       * ========================================================
       */}
      <Roadmap
        recommendations={
          roadmapRecommendations
        }
        providerSelections={
          providerSelections
        }
      />

      {/*
       * ========================================================
       * AUTRES POSSIBILITÉS
       * ========================================================
       */}
      {otherRecommendations.length >
      0 ? (
        <section className="mt-12 border-t border-[var(--lumea-border)] pt-9">
          <h2 className="text-2xl font-bold text-[var(--lumea-navy)]">
            Vous pouvez aussi vérifier
          </h2>

          <p className="mt-2 text-[17px] leading-7 text-[var(--lumea-blue-grey)]">
            {forRelative
              ? "Ces démarches ne sont pas forcément nécessaires tout de suite. Regardez-les seulement si elles peuvent être utiles à votre proche."
              : "Ces démarches ne sont pas forcément nécessaires tout de suite. Regardez-les seulement si vous le souhaitez."}
          </p>

          {!showOthers ? (
            <button
              type="button"
              onClick={() =>
                setShowOthers(
                  true
                )
              }
              className="mt-5 min-h-[54px] rounded-full border border-[var(--lumea-border)] bg-white px-6 py-3 text-[17px] font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
            >
              Voir les autres
              possibilités{" "}
              (
              {
                otherRecommendations.length
              }
              )
            </button>
          ) : null}

          {/*
           * Les cartes restent montées même lorsqu'elles sont
           * masquées. Ainsi, un organisme sélectionné dans une
           * démarche secondaire n'est pas perdu si l'utilisateur
           * masque puis réaffiche cette zone.
           */}
          <div
            className={
              showOthers
                ? "mt-7 space-y-5"
                : "hidden"
            }
            aria-hidden={
              !showOthers
            }
          >
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
                    className="rounded-[22px] border border-[var(--lumea-border)] bg-white"
                  >
                    <summary className="cursor-pointer list-none p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[18px] font-bold leading-7 text-[var(--lumea-navy)]">
                          {
                            summaryTitle
                          }
                        </p>

                        <span
                          aria-hidden="true"
                          className="shrink-0 text-xl font-bold text-[var(--lumea-gold)]"
                        >
                          +
                        </span>
                      </div>
                    </summary>

                    <div className="border-t border-[var(--lumea-border)] p-5 sm:p-6">
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

          {showOthers ? (
            <button
              type="button"
              onClick={() =>
                setShowOthers(
                  false
                )
              }
              className="mt-6 text-sm font-semibold text-[var(--lumea-blue-grey)] underline underline-offset-4"
            >
              Masquer les autres
              possibilités
            </button>
          ) : null}
        </section>
      ) : null}

      {/*
       * ========================================================
       * PETIT DICTIONNAIRE ADMINISTRATIF
       * ========================================================
       */}
      <GlossaryHelp />

      {/*
       * ========================================================
       * ÉCOUTE / DÉTRESSE
       *
       * Toujours disponible mais
       * entièrement repliée par défaut.
       * ========================================================
       */}
      <DistressSupport />

      {/*
       * ========================================================
       * FRAÎCHEUR DES INFORMATIONS
       *
       * Là encore, affichage très discret.
       * ========================================================
       */}
      <FreshnessNotice
        recommendations={
          allRecommendations
        }
        providers={
          selectedProviders
        }
      />

      {/*
       * ========================================================
       * CONFIDENTIALITÉ / LIMITES
       * ========================================================
       */}
      <footer className="mt-8 border-t border-[var(--lumea-border)] pt-7">
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
    </div>
  );
}