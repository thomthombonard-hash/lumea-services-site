import type {
  OrientationAnswers,
  OrientationQuestion,
} from "./types";

import { getQuestionById } from "@/data/questions";

export type QuestionId =
  | "need"
  | "situation"
  | "ageGroup"
  | "isRetired"
  | "hasMutuelle"
  | "hasHomeInsurance";

/**
 * Détermine la prochaine question utile.
 *
 * Le code postal est géré séparément
 * par l'interface.
 */
export function getNextQuestionId(
  answers: OrientationAnswers
): QuestionId | null {
  if (answers.need === undefined) {
    return "need";
  }

  if (answers.situation === undefined) {
    return "situation";
  }

  switch (answers.situation) {
    case "retour-hospitalisation": {
      if (
        answers.ageGroup === undefined
      ) {
        return "ageGroup";
      }

      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      if (
        answers.hasMutuelle === undefined
      ) {
        return "hasMutuelle";
      }

      return null;
    }

    case "perte-autonomie": {
      if (
        answers.ageGroup === undefined
      ) {
        return "ageGroup";
      }

      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      return null;
    }

    case "handicap": {
      if (
        answers.ageGroup === undefined
      ) {
        return "ageGroup";
      }

      return null;
    }

    case "accident-immobilisation": {
      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      if (
        answers.hasMutuelle === undefined
      ) {
        return "hasMutuelle";
      }

      return null;
    }

    case "demenagement": {
      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      if (
        answers.hasHomeInsurance ===
        undefined
      ) {
        return "hasHomeInsurance";
      }

      return null;
    }

    case "sinistre": {
      if (
        answers.hasHomeInsurance ===
        undefined
      ) {
        return "hasHomeInsurance";
      }

      return null;
    }

    case "deces-proche": {
      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      if (
        answers.hasMutuelle === undefined
      ) {
        return "hasMutuelle";
      }

      return null;
    }

    case "difficulte-temporaire": {
      if (
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      if (
        answers.hasMutuelle === undefined
      ) {
        return "hasMutuelle";
      }

      return null;
    }

    case "besoin-regulier": {
      if (
        answers.ageGroup === undefined
      ) {
        return "ageGroup";
      }

      if (
        answers.ageGroup !==
          "moins-60" &&
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      return null;
    }

    case "inconnue":
    case "autre": {
      if (
        answers.ageGroup === undefined
      ) {
        return "ageGroup";
      }

      if (
        answers.ageGroup !==
          "moins-60" &&
        answers.isRetired === undefined
      ) {
        return "isRetired";
      }

      return null;
    }

    default:
      return null;
  }
}

export function getNextQuestion(
  answers: OrientationAnswers
): OrientationQuestion | null {
  const questionId =
    getNextQuestionId(answers);

  if (!questionId) {
    return null;
  }

  return (
    getQuestionById(questionId) ??
    null
  );
}

export function isOrientationComplete(
  answers: OrientationAnswers
): boolean {
  return (
    answers.postalCode !== undefined &&
    answers.department !== undefined &&
    getNextQuestionId(answers) === null
  );
}

export function cleanAnswersAfterSituationChange(
  answers: OrientationAnswers
): OrientationAnswers {
  return {
    need: answers.need,
    situation: answers.situation,
  };
}

export function createEmptyAnswers(): OrientationAnswers {
  return {};
}