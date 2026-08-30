import type { OrientationQuestion } from "@/lib/orientation/types";

export const orientationQuestions: OrientationQuestion[] = [
  {
    id: "need",
    title: "De quoi avez-vous besoin ?",
    helpText:
      "Choisissez ce qui correspond le mieux à votre besoin.",

    options: [
      {
        id: "need-menage",
        label: "Ménage",
        description:
          "Entretien du logement, nettoyage, poussière, sols...",
        value: "menage",
      },

      {
        id: "need-transport",
        label:
          "Transport ou accompagnement",
        description:
          "Pour un rendez-vous, des démarches ou un déplacement.",
        value: "transport",
      },

      {
        id: "need-courses",
        label: "Courses",
        description:
          "Faire ou accompagner pour les courses du quotidien.",
        value: "courses",
      },

      {
        id: "need-repas",
        label: "Repas",
        description:
          "Préparation ou aide autour des repas.",
        value: "repas",
      },

      {
        id: "need-aide-quotidien",
        label: "Aide au quotidien",
        description:
          "Pour certaines tâches devenues difficiles à réaliser seul.",
        value: "aide-quotidien",
      },

      {
        id: "need-inconnu",
        label: "Je ne sais pas",
        description:
          "Pas de souci, nous allons vous aider à vous orienter.",
        value: "inconnu",
      },
    ],
  },

  {
    id: "situation",
    title:
      "Pourquoi avez-vous besoin d'aide aujourd'hui ?",

    helpText:
      "Choisissez la situation qui se rapproche le plus de la vôtre.",

    options: [
      {
        id: "situation-hospitalisation",
        label:
          "Je rentre chez moi après une hospitalisation",
        value: "retour-hospitalisation",
      },

      {
        id: "situation-autonomie",
        label:
          "Certaines choses deviennent difficiles avec l'âge",
        value: "perte-autonomie",
      },

      {
        id: "situation-handicap",
        label:
          "J'ai besoin d'aide en lien avec une situation de handicap",
        value: "handicap",
      },

      {
        id: "situation-accident",
        label:
          "Je suis temporairement limité après un accident ou une blessure",
        value: "accident-immobilisation",
      },

      {
        id: "situation-demenagement",
        label: "Je déménage",
        value: "demenagement",
      },

      {
        id: "situation-sinistre",
        label:
          "J'ai eu un sinistre dans mon logement",
        description:
          "Dégât des eaux, incendie ou autre événement.",
        value: "sinistre",
      },

      {
        id: "situation-deces",
        label:
          "Je traverse un décès ou une situation familiale difficile",
        value: "deces-proche",
      },

      {
        id: "situation-temporaire",
        label:
          "J'ai besoin d'un coup de main temporairement",
        value: "difficulte-temporaire",
      },

      {
        id: "situation-regulier",
        label:
          "J'ai simplement besoin d'une aide régulière",
        value: "besoin-regulier",
      },

      {
        id: "situation-inconnue",
        label: "Je ne sais pas",
        value: "inconnue",
      },
    ],
  },

  {
    id: "ageGroup",
    title: "Dans quelle tranche d'âge êtes-vous ?",

    helpText:
      "Une tranche d'âge suffit. Elle nous aide simplement à identifier les dispositifs qui peuvent vous concerner.",

    options: [
      {
        id: "age-18-29",
        label: "18 à 29 ans",
        value: "moins-60",
      },

      {
        id: "age-30-59",
        label: "30 à 59 ans",
        value: "moins-60",
      },

      {
        id: "age-60-74",
        label: "60 à 74 ans",
        value: "60-74",
      },

      {
        id: "age-75-plus",
        label: "75 ans et plus",
        value: "75-plus",
      },

      {
        id: "age-inconnu",
        label:
          "Je préfère ne pas répondre",
        value: "inconnu",
      },
    ],
  },

  {
    id: "isRetired",
    title: "Êtes-vous retraité(e) ?",

    options: [
      {
        id: "retired-yes",
        label: "Oui",
        value: true,
      },

      {
        id: "retired-no",
        label: "Non",
        value: false,
      },

      {
        id: "retired-unknown",
        label:
          "Je ne sais pas / je préfère ne pas répondre",
        value: null,
      },
    ],
  },

  {
    id: "hasMutuelle",
    title: "Avez-vous une mutuelle ?",

    helpText:
      "Certaines mutuelles proposent des services d'assistance selon les contrats.",

    options: [
      {
        id: "mutuelle-yes",
        label: "Oui",
        value: true,
      },

      {
        id: "mutuelle-no",
        label: "Non",
        value: false,
      },

      {
        id: "mutuelle-unknown",
        label: "Je ne sais pas",
        value: null,
      },
    ],
  },

  {
    id: "hasHomeInsurance",
    title:
      "Avez-vous une assurance habitation ?",

    helpText:
      "Cette question peut être utile notamment après un sinistre ou un déménagement.",

    options: [
      {
        id: "insurance-yes",
        label: "Oui",
        value: true,
      },

      {
        id: "insurance-no",
        label: "Non",
        value: false,
      },

      {
        id: "insurance-unknown",
        label: "Je ne sais pas",
        value: null,
      },
    ],
  },
];

export function getQuestionById(
  id: string
): OrientationQuestion | undefined {
  return orientationQuestions.find(
    (question) =>
      question.id === id
  );
}