import {
  getClic49IdByCommuneCode,
} from "@/data/local/clic49-map";

import {
  getSartheAutonomieIdByCommuneCode,
} from "@/data/local/sarthe-autonomie-map";

import {
  getMayenneOrganizationIdsByCommuneCode,
} from "@/data/local/mayenne-local-map";

import {
  getOrganizationById,
} from "@/data/organisations";

import type {
  OrientationAnswers,
  Recommendation,
} from "./types";

/**
 * ============================================================
 * MAINE-ET-LOIRE
 * ============================================================
 */

function shouldSuggestClic49(
  answers: OrientationAnswers
): boolean {
  if (
    answers.situation ===
    "perte-autonomie"
  ) {
    return true;
  }

  const isOlderPerson =
    answers.ageGroup === "60-74" ||
    answers.ageGroup === "75-plus";

  if (isOlderPerson) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire" ||
      answers.situation ===
        "inconnue"
    );
  }

  if (
    answers.isRetired === true
  ) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire" ||
      answers.situation ===
        "deces-proche"
    );
  }

  return false;
}

function createClic49Recommendation(
  answers: OrientationAnswers
): Recommendation | null {
  if (
    answers.department !== "49" ||
    !answers.communeCode
  ) {
    return null;
  }

  if (
    !shouldSuggestClic49(
      answers
    )
  ) {
    return null;
  }

  const clicId =
    getClic49IdByCommuneCode(
      answers.communeCode
    );

  if (!clicId) {
    return null;
  }

  const organization =
    getOrganizationById(
      clicId
    );

  if (!organization) {
    return null;
  }

  const isLossOfAutonomy =
    answers.situation ===
    "perte-autonomie";

  return {
    id: `local-${clicId}`,

    title:
      `Votre interlocuteur de proximité : ${organization.name}`,

    organizationType: "clic",

    priority:
      isLossOfAutonomy
        ? "primary"
        : "secondary",

    why:
      isLossOfAutonomy
        ? `Pour ${answers.communeName ?? "votre commune"}, ce CLIC est votre interlocuteur local pour être informé et accompagné dans les démarches liées à l'âge, au maintien à domicile et à la perte d'autonomie.`
        : `Ce CLIC intervient sur le secteur de ${answers.communeName ?? "votre commune"}. Il peut informer les personnes âgées, les retraités et leurs proches sur les aides et services disponibles localement.`,

    whatToAsk:
      "J'habite dans votre secteur et j'ai besoin d'aide à domicile. Pouvez-vous m'indiquer les dispositifs et services qui peuvent correspondre à ma situation ?",

    organizationId:
      clicId,

    sourceIds: [
      "source-mda-49",
    ],
  };
}

/**
 * ============================================================
 * SARTHE
 * ============================================================
 */

function shouldSuggestSartheAutonomie(
  answers: OrientationAnswers
): boolean {
  if (
    answers.situation ===
      "perte-autonomie" ||
    answers.situation ===
      "handicap"
  ) {
    return true;
  }

  const isOlderPerson =
    answers.ageGroup === "60-74" ||
    answers.ageGroup === "75-plus";

  if (isOlderPerson) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire" ||
      answers.situation ===
        "inconnue"
    );
  }

  if (
    answers.isRetired === true
  ) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire"
    );
  }

  return false;
}

function createSartheAutonomieRecommendation(
  answers: OrientationAnswers
): Recommendation | null {
  if (
    answers.department !== "72" ||
    !answers.communeCode
  ) {
    return null;
  }

  if (
    !shouldSuggestSartheAutonomie(
      answers
    )
  ) {
    return null;
  }

  const organizationId =
    getSartheAutonomieIdByCommuneCode(
      answers.communeCode
    );

  if (!organizationId) {
    return null;
  }

  const organization =
    getOrganizationById(
      organizationId
    );

  if (!organization) {
    return null;
  }

  const isDirectAutonomySituation =
    answers.situation ===
      "perte-autonomie" ||
    answers.situation ===
      "handicap";

  return {
    id:
      `local-${organizationId}`,

    title:
      `Votre interlocuteur Sarthe Autonomie : ${organization.name}`,

    organizationType:
      "departement",

    priority:
      isDirectAutonomySituation
        ? "primary"
        : "secondary",

    why:
      answers.situation === "handicap"
        ? `Pour ${answers.communeName ?? "votre commune"}, ce service Sarthe Autonomie est votre interlocuteur territorial pour être informé et orienté dans les démarches liées au handicap et à l'accompagnement à domicile.`
        : `Pour ${answers.communeName ?? "votre commune"}, ce service Sarthe Autonomie est votre interlocuteur territorial pour les questions liées à l'âge, au maintien à domicile et à la perte d'autonomie.`,

    whatToAsk:
      answers.situation === "handicap"
        ? "J'habite dans votre secteur et je souhaiterais être orienté concernant les aides et accompagnements à domicile pouvant correspondre à ma situation."
        : "J'habite dans votre secteur et j'ai besoin d'aide à domicile. Pouvez-vous m'indiquer les dispositifs et services qui peuvent correspondre à ma situation ?",

    organizationId,

    sourceIds: [
      "source-sarthe-autonomie",
    ],
  };
}

/**
 * ============================================================
 * MAYENNE
 * ============================================================
 */

/**
 * Les Maisons du Département constituent
 * une porte d'entrée locale notamment pour
 * l'autonomie, le handicap et l'action sociale.
 */
function shouldSuggestMayenneLocal(
  answers: OrientationAnswers
): boolean {
  if (
    answers.situation ===
      "perte-autonomie" ||
    answers.situation ===
      "handicap"
  ) {
    return true;
  }

  const isOlderPerson =
    answers.ageGroup === "60-74" ||
    answers.ageGroup === "75-plus";

  if (isOlderPerson) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire" ||
      answers.situation ===
        "inconnue"
    );
  }

  if (
    answers.isRetired === true
  ) {
    return (
      answers.situation ===
        "retour-hospitalisation" ||
      answers.situation ===
        "besoin-regulier" ||
      answers.situation ===
        "difficulte-temporaire"
    );
  }

  return false;
}

/**
 * Une commune de Mayenne peut correspondre
 * à une ou plusieurs Maisons du Département.
 *
 * Laval dispose volontairement de plusieurs
 * accueils. Nous les affichons tous plutôt
 * que de demander une adresse personnelle.
 */
function createMayenneLocalRecommendations(
  answers: OrientationAnswers
): Recommendation[] {
  if (
    answers.department !== "53" ||
    !answers.communeCode
  ) {
    return [];
  }

  if (
    !shouldSuggestMayenneLocal(
      answers
    )
  ) {
    return [];
  }

  const organizationIds =
    getMayenneOrganizationIdsByCommuneCode(
      answers.communeCode
    );

  if (
    organizationIds.length === 0
  ) {
    return [];
  }

  const isDirectSituation =
    answers.situation ===
      "perte-autonomie" ||
    answers.situation ===
      "handicap";

  const hasSeveralLocations =
    organizationIds.length > 1;

  const recommendations: Recommendation[] = [];

  for (
    const organizationId
    of organizationIds
  ) {
    const organization =
      getOrganizationById(
        organizationId
      );

    if (!organization) {
      continue;
    }

    recommendations.push({
      id:
        `local-${organizationId}`,

      title:
        hasSeveralLocations
          ? `À ${answers.communeName ?? "Laval"}, vous pouvez contacter : ${organization.name}`
          : `Votre interlocuteur de proximité : ${organization.name}`,

      organizationType:
        "departement",

      priority:
        isDirectSituation
          ? "primary"
          : "secondary",

      why:
        answers.situation === "handicap"
          ? hasSeveralLocations
            ? `Plusieurs Maisons du Département accueillent les habitants de ${answers.communeName ?? "votre commune"}. Celle-ci peut vous informer et vous orienter dans les démarches liées au handicap et à l'accompagnement à domicile.`
            : `Pour ${answers.communeName ?? "votre commune"}, cette Maison du Département est votre guichet de proximité pour être informé et orienté dans les démarches liées au handicap et à l'accompagnement à domicile.`
          : hasSeveralLocations
            ? `Plusieurs Maisons du Département accueillent les habitants de ${answers.communeName ?? "votre commune"}. Celle-ci peut vous informer sur l'autonomie, le maintien à domicile et les aides disponibles.`
            : `Pour ${answers.communeName ?? "votre commune"}, cette Maison du Département est votre guichet de proximité pour les questions liées à l'autonomie, au maintien à domicile et aux aides disponibles.`,

      whatToAsk:
        answers.situation === "handicap"
          ? "J'habite dans votre secteur et je souhaiterais être orienté concernant les aides et accompagnements à domicile pouvant correspondre à ma situation."
          : "J'habite dans votre secteur et j'ai besoin d'aide à domicile. Pouvez-vous m'indiquer les dispositifs et services qui peuvent correspondre à ma situation ?",

      organizationId,

      sourceIds: [
        "source-mda-53",
      ],
    });
  }

  return recommendations;
}

/**
 * ============================================================
 * ROUTAGE LOCAL GLOBAL
 * ============================================================
 */

export function getLocalRecommendations(
  answers: OrientationAnswers
): Recommendation[] {
  const result: Recommendation[] = [];

  /**
   * Maine-et-Loire
   */
  const clic49 =
    createClic49Recommendation(
      answers
    );

  if (clic49) {
    result.push(
      clic49
    );
  }

  /**
   * Sarthe
   */
  const sartheAutonomie =
    createSartheAutonomieRecommendation(
      answers
    );

  if (sartheAutonomie) {
    result.push(
      sartheAutonomie
    );
  }

  /**
   * Mayenne
   */
  const mayenneLocalRecommendations =
    createMayenneLocalRecommendations(
      answers
    );

  result.push(
    ...mayenneLocalRecommendations
  );

  return result;
}