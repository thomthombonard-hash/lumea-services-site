import type {
  OrientationAnswers,
  Recommendation,
} from "@/lib/orientation/types";

export const recommendations: Recommendation[] = [
  /*
   * ============================================================
   * HOSPITALISATION
   * ============================================================
   */

  {
    id: "hospitalisation-service-social",
    title:
      "Contactez le service social de l'établissement",
    organizationType: "service-social",
    priority: "primary",

    why:
      "Avant ou juste après votre retour à domicile, le service social de l'établissement peut vous aider à identifier les dispositifs adaptés et à préparer certaines démarches.",

    whatToAsk:
      "Je vais rentrer à domicile et j'aurai besoin d'aide pour certaines tâches du quotidien. Pouvez-vous m'indiquer les aides ou dispositifs qui peuvent être mobilisés dans ma situation ?",

    sourceIds: [],
  },

  {
    id: "hospitalisation-caisse-retraite",
    title:
      "Contactez votre caisse de retraite",
    organizationType: "caisse-retraite",
    priority: "primary",

    why:
      "Selon votre régime et votre situation, votre caisse de retraite peut proposer un accompagnement temporaire après une hospitalisation.",

    whatToAsk:
      "Je rentre chez moi après une hospitalisation. Existe-t-il une aide temporaire à domicile proposée par ma caisse de retraite ?",

    organizationId: "caisse-retraite",

    sourceIds: [
      "source-caisse-retraite",
      "source-carsat-ardh",
    ],
  },

  /*
   * ============================================================
   * CAISSE DE RETRAITE
   * ============================================================
   */

  {
    id: "caisse-retraite-difficulte",
    title:
      "Contactez votre caisse de retraite",
    organizationType: "caisse-retraite",
    priority: "primary",

    why:
      "Certaines caisses de retraite peuvent proposer un accompagnement lorsqu'un retraité rencontre une difficulté temporaire ou un événement fragilisant.",

    whatToAsk:
      "Je rencontre actuellement une difficulté temporaire et j'aurais besoin d'aide à domicile. Ma caisse de retraite propose-t-elle un accompagnement correspondant à ma situation ?",

    organizationId: "caisse-retraite",

    sourceIds: [
      "source-caisse-retraite",
    ],
  },

  {
    id: "caisse-retraite-aide-domicile",
    title:
      "Renseignez-vous auprès de votre caisse de retraite",
    organizationType: "caisse-retraite",
    priority: "primary",

    why:
      "Pour certains retraités encore relativement autonomes, la caisse de retraite peut proposer une aide pour faciliter la vie quotidienne, par exemple une intervention à domicile, une aide aux déplacements ou un portage de repas.",

    whatToAsk:
      "J'ai besoin d'une aide régulière pour faciliter mon quotidien. Quelles aides à domicile ma caisse de retraite peut-elle proposer dans ma situation ?",

    organizationId: "caisse-retraite",

    sourceIds: [
      "source-caisse-retraite",
      "source-aide-domicile-age",
    ],
  },

  /*
   * ============================================================
   * MUTUELLE
   * ============================================================
   */

  {
    id: "mutuelle-assistance",
    title:
      "Vérifiez les garanties de votre mutuelle",
    organizationType: "mutuelle",
    priority: "secondary",

    why:
      "Certains contrats de complémentaire santé comprennent des services d'assistance à domicile dans certaines situations.",

    whatToAsk:
      "Mon contrat prévoit-il des heures d'aide à domicile ou une prestation d'assistance dans ma situation ?",

    organizationId: "mutuelle",

    sourceIds: [],
  },

  /*
   * ============================================================
   * ASSURANCE
   * ============================================================
   */

  {
    id: "assurance-habitation-assistance",
    title:
      "Contactez votre assurance habitation",
    organizationType: "assurance",
    priority: "primary",

    why:
      "Selon votre contrat et l'événement rencontré, des garanties d'assistance ou certaines prises en charge peuvent être prévues.",

    whatToAsk:
      "Mon contrat prévoit-il une assistance ou une prise en charge pour des prestations à domicile dans cette situation ?",

    organizationId: "assurance-habitation",

    sourceIds: [],
  },

  /*
   * ============================================================
   * AUTONOMIE - 72
   * ============================================================
   */

  {
    id: "autonomie-sarthe",
    title: "Contactez Sarthe Autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "Sarthe Autonomie peut vous informer et vous orienter concernant les aides liées à l'âge, à l'autonomie et au maintien à domicile.",

    whatToAsk:
      "J'ai besoin d'aide à domicile et je souhaiterais savoir quels dispositifs peuvent correspondre à ma situation.",

    organizationId: "sarthe-autonomie",

    sourceIds: [
      "source-sarthe-autonomie",
      "source-sarthe-apa",
      "source-apa-national",
    ],
  },

  /*
   * ============================================================
   * AUTONOMIE - 49
   * ============================================================
   */

  {
    id: "autonomie-maine-et-loire",
    title:
      "Contactez la Maison départementale de l'autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "La Maison départementale de l'autonomie peut vous informer et vous orienter vers les dispositifs liés à l'âge et à la perte d'autonomie en Maine-et-Loire.",

    whatToAsk:
      "J'ai besoin d'aide à domicile et je souhaiterais savoir quels dispositifs peuvent correspondre à ma situation.",

    organizationId: "mda-49",

    sourceIds: [
      "source-mda-49",
      "source-apa-49",
      "source-apa-national",
    ],
  },

  /*
   * ============================================================
   * AUTONOMIE - 53
   * ============================================================
   */

  {
    id: "autonomie-mayenne",
    title:
      "Contactez la Maison départementale de l'autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "La Maison départementale de l'autonomie peut vous informer sur les dispositifs liés à l'âge, à l'autonomie et au maintien à domicile.",

    whatToAsk:
      "J'ai besoin d'aide à domicile et je souhaiterais savoir quels dispositifs peuvent correspondre à ma situation.",

    organizationId: "mda-53",

    sourceIds: [
      "source-mda-53",
      "source-apa-53",
      "source-apa-national",
    ],
  },

  /*
   * ============================================================
   * HANDICAP - 72
   * ============================================================
   */

  {
    id: "handicap-sarthe",
    title: "Contactez Sarthe Autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "Sarthe Autonomie peut informer et accompagner dans les démarches liées au handicap et aux dispositifs pouvant être étudiés selon la situation.",

    whatToAsk:
      "Je souhaiterais connaître les démarches et les aides d'accompagnement pouvant correspondre à ma situation.",

    organizationId: "sarthe-autonomie",

    sourceIds: [
      "source-sarthe-autonomie",
      "source-pch-national",
    ],
  },

  /*
   * ============================================================
   * HANDICAP - 49
   * ============================================================
   */

  {
    id: "handicap-maine-et-loire",
    title:
      "Contactez la Maison départementale de l'autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "La Maison départementale de l'autonomie accompagne les personnes dans leurs démarches liées au handicap et peut informer sur les dispositifs pouvant être étudiés.",

    whatToAsk:
      "Je souhaiterais connaître les démarches et les aides d'accompagnement pouvant correspondre à ma situation.",

    organizationId: "mda-49",

    sourceIds: [
      "source-mda-49",
      "source-pch-national",
    ],
  },

  /*
   * ============================================================
   * HANDICAP - 53
   * ============================================================
   */

  {
    id: "handicap-mayenne",
    title:
      "Contactez la Maison départementale de l'autonomie",
    organizationType: "departement",
    priority: "primary",

    why:
      "La Maison départementale de l'autonomie accompagne les personnes dans leurs démarches liées au handicap et peut informer sur les dispositifs pouvant être étudiés.",

    whatToAsk:
      "Je souhaiterais connaître les démarches et les aides d'accompagnement pouvant correspondre à ma situation.",

    organizationId: "mda-53",

    sourceIds: [
      "source-mda-53",
      "source-pch-53",
      "source-pch-national",
    ],
  },

  /*
   * ============================================================
   * BESOIN : MÉNAGE
   * ============================================================
   */

  {
    id: "besoin-menage-service",
    title:
      "Pour le ménage : contactez un service à domicile",
    organizationType: "autre",
    priority: "optional",

    why:
      "Les services à la personne peuvent intervenir pour l'entretien courant du logement. Selon la prestation et votre situation, un crédit d'impôt peut être applicable dans les conditions prévues par la réglementation.",

    whatToAsk:
      "Pouvez-vous intervenir pour l'entretien de mon logement et m'indiquer le tarif ainsi que les éventuelles conditions liées au crédit d'impôt ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-sap-general",
      "source-sap-credit-impot",
    ],
  },

  /*
   * ============================================================
   * BESOIN : COURSES
   * ============================================================
   */

  {
    id: "besoin-courses-service",
    title:
      "Pour les courses : un service à domicile peut vous accompagner",
    organizationType: "autre",
    priority: "optional",

    why:
      "Certains services d'aide à domicile peuvent accompagner une personne pour faire ses courses ou l'aider dans cette tâche du quotidien.",

    whatToAsk:
      "Proposez-vous une aide ou un accompagnement pour faire les courses ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-services-aide-domicile",
    ],
  },

  /*
   * ============================================================
   * BESOIN : REPAS
   * ============================================================
   */

  {
    id: "besoin-repas-mairie",
    title:
      "Pour les repas : renseignez-vous auprès de votre mairie ou CCAS",
    organizationType: "ccas",
    priority: "primary",

    why:
      "Certaines communes ou structures locales proposent un service de portage de repas ou peuvent vous indiquer les services disponibles près de chez vous.",

    whatToAsk:
      "Existe-t-il un service de portage de repas à domicile dans ma commune et quelles sont les conditions pour en bénéficier ?",

    organizationId: "mairie-ccas",

    sourceIds: [
      "source-portage-repas",
      "source-ccas",
    ],
  },

  {
    id: "besoin-repas-service",
    title:
      "Un service à domicile peut aussi vous aider pour les repas",
    organizationType: "autre",
    priority: "optional",

    why:
      "Des services d'aide à domicile peuvent proposer la préparation des repas et certains organismes proposent également du portage de repas.",

    whatToAsk:
      "Proposez-vous la préparation de repas à domicile ou un service de portage de repas ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-portage-repas",
      "source-services-aide-domicile",
    ],
  },

  /*
   * ============================================================
   * BESOIN : TRANSPORT
   * ============================================================
   */

  {
    id: "besoin-transport-local",
    title:
      "Pour vos déplacements : renseignez-vous auprès de votre mairie ou CCAS",
    organizationType: "ccas",
    priority: "primary",

    why:
      "Les solutions de transport et d'accompagnement varient beaucoup selon les communes et les territoires. Votre mairie, CCAS ou CIAS peut vous orienter vers les dispositifs locaux existants.",

    whatToAsk:
      "Existe-t-il dans ma commune un service de transport, de mobilité solidaire ou d'accompagnement pour mes déplacements ?",

    organizationId: "mairie-ccas",

    sourceIds: [
      "source-ccas",
    ],
  },

  {
    id: "besoin-transport-service",
    title:
      "Un service à domicile peut proposer un accompagnement pour certains déplacements",
    organizationType: "autre",
    priority: "optional",

    why:
      "Dans certaines situations, notamment pour les personnes âgées ou en perte d'autonomie, des services à domicile peuvent proposer un accompagnement lors de déplacements ou de sorties.",

    whatToAsk:
      "Proposez-vous un accompagnement pour les déplacements ou les sorties et quelles sont les conditions de ce service ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-services-aide-domicile",
      "source-aide-domicile-age",
    ],
  },

  /*
   * ============================================================
   * BESOIN : AIDE AU QUOTIDIEN
   * ============================================================
   */

  {
    id: "besoin-aide-quotidien-service",
    title:
      "Un service d'aide à domicile peut vous accompagner au quotidien",
    organizationType: "autre",
    priority: "optional",

    why:
      "Les services d'aide à domicile peuvent intervenir pour différentes tâches de la vie quotidienne selon les besoins et la situation de la personne.",

    whatToAsk:
      "Pouvez-vous évaluer avec moi les prestations qui correspondent à mes besoins au quotidien ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-services-aide-domicile",
    ],
  },

  /*
   * ============================================================
   * BESOIN NON IDENTIFIÉ
   * ============================================================
   */

  {
    id: "besoin-inconnu-service",
    title:
      "Vous pouvez demander conseil à un service à domicile",
    organizationType: "autre",
    priority: "optional",

    why:
      "Si vous ne savez pas encore exactement quelle aide vous serait utile, un service à domicile peut vous présenter les prestations disponibles.",

    whatToAsk:
      "Je ne sais pas exactement quelle prestation correspond à mon besoin. Pouvez-vous m'expliquer les services que vous proposez ?",

    organizationId: "services-domicile",

    sourceIds: [
      "source-sap-general",
    ],
  },
];

export function getRecommendationById(
  id: string
): Recommendation | undefined {
  return recommendations.find(
    (recommendation) =>
      recommendation.id === id
  );
}

function getDepartmentRecommendation(
  answers: OrientationAnswers,
  type: "autonomie" | "handicap"
): Recommendation | undefined {
  if (!answers.department) {
    return undefined;
  }

  const ids = {
    autonomie: {
      "72": "autonomie-sarthe",
      "49": "autonomie-maine-et-loire",
      "53": "autonomie-mayenne",
    },

    handicap: {
      "72": "handicap-sarthe",
      "49": "handicap-maine-et-loire",
      "53": "handicap-mayenne",
    },
  };

  return getRecommendationById(
    ids[type][answers.department]
  );
}

function addRecommendation(
  result: Recommendation[],
  id: string
) {
  const recommendation =
    getRecommendationById(id);

  if (!recommendation) {
    return;
  }

  const alreadyExists = result.some(
    (item) =>
      item.id === recommendation.id
  );

  if (!alreadyExists) {
    result.push(recommendation);
  }
}

/**
 * Ajoute les recommandations correspondant
 * au besoin concret choisi par l'utilisateur.
 */
function addNeedRecommendations(
  result: Recommendation[],
  answers: OrientationAnswers
) {
  switch (answers.need) {
    case "menage": {
      addRecommendation(
        result,
        "besoin-menage-service"
      );

      break;
    }

    case "courses": {
      addRecommendation(
        result,
        "besoin-courses-service"
      );

      break;
    }

    case "repas": {
      addRecommendation(
        result,
        "besoin-repas-mairie"
      );

      addRecommendation(
        result,
        "besoin-repas-service"
      );

      break;
    }

    case "transport": {
      addRecommendation(
        result,
        "besoin-transport-local"
      );

      const transportServiceIsRelevant =
        answers.ageGroup === "60-74" ||
        answers.ageGroup === "75-plus" ||
        answers.isRetired === true ||
        answers.situation ===
          "perte-autonomie" ||
        answers.situation === "handicap";

      if (transportServiceIsRelevant) {
        addRecommendation(
          result,
          "besoin-transport-service"
        );
      }

      break;
    }

    case "aide-quotidien": {
      addRecommendation(
        result,
        "besoin-aide-quotidien-service"
      );

      break;
    }

    case "inconnu":
    case "autre": {
      addRecommendation(
        result,
        "besoin-inconnu-service"
      );

      break;
    }
  }
}

/**
 * Calcule les interlocuteurs pertinents.
 *
 * L'outil ne détermine jamais l'éligibilité
 * à une aide ou à une prise en charge.
 */
export function calculateRecommendations(
  answers: OrientationAnswers
): Recommendation[] {
  const result: Recommendation[] = [];

  switch (answers.situation) {
    /*
     * RETOUR D'HOSPITALISATION
     */
    case "retour-hospitalisation": {
      addRecommendation(
        result,
        "hospitalisation-service-social"
      );

      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "hospitalisation-caisse-retraite"
        );
      }

      if (answers.hasMutuelle === true) {
        addRecommendation(
          result,
          "mutuelle-assistance"
        );
      }

      break;
    }

    /*
     * PERTE D'AUTONOMIE
     */
    case "perte-autonomie": {
      const autonomy =
        getDepartmentRecommendation(
          answers,
          "autonomie"
        );

      if (autonomy) {
        result.push(autonomy);
      }

      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-aide-domicile"
        );
      }

      break;
    }

    /*
     * HANDICAP
     */
    case "handicap": {
      const handicap =
        getDepartmentRecommendation(
          answers,
          "handicap"
        );

      if (handicap) {
        result.push(handicap);
      }

      break;
    }

    /*
     * ACCIDENT / IMMOBILISATION
     */
    case "accident-immobilisation": {
      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-difficulte"
        );
      }

      if (answers.hasMutuelle === true) {
        addRecommendation(
          result,
          "mutuelle-assistance"
        );
      }

      break;
    }

    /*
     * DÉMÉNAGEMENT
     */
    case "demenagement": {
      if (
        answers.hasHomeInsurance === true
      ) {
        addRecommendation(
          result,
          "assurance-habitation-assistance"
        );
      }

      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-difficulte"
        );
      }

      break;
    }

    /*
     * SINISTRE
     */
    case "sinistre": {
      if (
        answers.hasHomeInsurance === true
      ) {
        addRecommendation(
          result,
          "assurance-habitation-assistance"
        );
      }

      break;
    }

    /*
     * DÉCÈS
     */
    case "deces-proche": {
      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-difficulte"
        );
      }

      if (answers.hasMutuelle === true) {
        addRecommendation(
          result,
          "mutuelle-assistance"
        );
      }

      break;
    }

    /*
     * DIFFICULTÉ TEMPORAIRE
     */
    case "difficulte-temporaire": {
      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-difficulte"
        );
      }

      if (answers.hasMutuelle === true) {
        addRecommendation(
          result,
          "mutuelle-assistance"
        );
      }

      break;
    }

    /*
     * BESOIN RÉGULIER
     */
    case "besoin-regulier": {
      if (
        answers.ageGroup === "60-74" ||
        answers.ageGroup === "75-plus" ||
        answers.ageGroup === "inconnu"
      ) {
        const autonomy =
          getDepartmentRecommendation(
            answers,
            "autonomie"
          );

        if (autonomy) {
          result.push(autonomy);
        }
      }

      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-aide-domicile"
        );
      }

      break;
    }

    /*
     * SITUATION NON IDENTIFIÉE
     */
    case "inconnue":
    case "autre": {
      if (
        answers.ageGroup === "60-74" ||
        answers.ageGroup === "75-plus" ||
        answers.ageGroup === "inconnu"
      ) {
        const autonomy =
          getDepartmentRecommendation(
            answers,
            "autonomie"
          );

        if (autonomy) {
          result.push(autonomy);
        }
      }

      if (answers.isRetired === true) {
        addRecommendation(
          result,
          "caisse-retraite-aide-domicile"
        );
      }

      break;
    }
  }

  /*
   * Une fois la situation traitée,
   * on ajoute les recommandations correspondant
   * au besoin concret : ménage, repas, transport...
   */
  addNeedRecommendations(
    result,
    answers
  );

  return result;
}