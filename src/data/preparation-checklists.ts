import type {
  Recommendation,
} from "@/lib/orientation/types";

export interface PreparationItem {
  id: string;

  label: string;

  note?: string;
}

export interface PreparationChecklist {
  title: string;

  introduction: string;

  items: PreparationItem[];
}

/**
 * Les éléments indiqués ici sont uniquement
 * des choses utiles à avoir à proximité.
 *
 * Ils ne sont jamais présentés comme
 * obligatoires pour obtenir une aide.
 */
export function getPreparationChecklist(
  recommendation: Recommendation
): PreparationChecklist {
  switch (
    recommendation.organizationType
  ) {
    /**
     * =========================================================
     * MUTUELLE
     * =========================================================
     */
    case "mutuelle":
      return {
        title:
          "Avant d'appeler votre mutuelle",

        introduction:
          "Si vous les avez sous la main, préparez simplement :",

        items: [
          {
            id:
              "mutuelle-carte",

            label:
              "Votre carte de mutuelle ou de tiers payant",
          },

          {
            id:
              "mutuelle-numero",

            label:
              "Votre numéro d'adhérent ou de contrat",

            note:
              "Il est généralement indiqué sur votre carte ou votre espace adhérent.",
          },

          {
            id:
              "mutuelle-situation",

            label:
              "Une phrase simple pour expliquer ce dont vous avez besoin",

            note:
              "Par exemple : « J'ai besoin d'une aide temporaire à domicile. »",
          },

          {
            id:
              "mutuelle-notes",

            label:
              "De quoi noter la réponse",
          },
        ],
      };

    /**
     * =========================================================
     * ASSURANCE
     * =========================================================
     */
    case "assurance":
      return {
        title:
          "Avant d'appeler votre assurance",

        introduction:
          "Gardez si possible ces éléments à proximité :",

        items: [
          {
            id:
              "assurance-contrat",

            label:
              "Votre contrat ou votre attestation d'assurance",
          },

          {
            id:
              "assurance-numero",

            label:
              "Votre numéro de contrat",
          },

          {
            id:
              "assurance-sinistre",

            label:
              "Votre numéro de sinistre ou de dossier, si vous en avez déjà un",
          },

          {
            id:
              "assurance-preuves",

            label:
              "Les photos, factures ou devis utiles, si votre demande concerne un sinistre",

            note:
              "Pas besoin de tout envoyer pendant le premier appel : gardez-les simplement à proximité.",
          },

          {
            id:
              "assurance-notes",

            label:
              "De quoi noter la réponse",
          },
        ],
      };

    /**
     * =========================================================
     * RETRAITE
     * =========================================================
     */
    case "caisse-retraite":
    case "carsat":
      return {
        title:
          "Avant d'appeler votre caisse de retraite",

        introduction:
          "Quelques informations peuvent aider le conseiller à retrouver votre dossier :",

        items: [
          {
            id:
              "retraite-securite-sociale",

            label:
              "Votre numéro de Sécurité sociale",

            note:
              "Vous pouvez le trouver notamment sur votre carte Vitale.",
          },

          {
            id:
              "retraite-reference",

            label:
              "Votre numéro de dossier ou référence retraite, si vous en avez un",
          },

          {
            id:
              "retraite-besoin",

            label:
              "Une phrase simple pour expliquer l'aide dont vous avez besoin",
          },

          {
            id:
              "retraite-notes",

            label:
              "De quoi noter le nom du dispositif et les prochaines démarches",
          },
        ],
      };

    /**
     * =========================================================
     * CLIC / AUTONOMIE / DÉPARTEMENT
     * =========================================================
     */
    case "clic":
    case "departement":
      return {
        title:
          "Avant de les contacter",

        introduction:
          "Vous n'avez pas besoin de préparer un dossier complet. Ces quelques informations suffisent pour commencer :",

        items: [
          {
            id:
              "autonomie-identite",

            label:
              "Votre nom, prénom et commune de résidence",
          },

          {
            id:
              "autonomie-besoin",

            label:
              "Une phrase pour expliquer ce qui devient difficile au quotidien",

            note:
              "Par exemple : ménage, repas, déplacements ou aide dans la vie quotidienne.",
          },

          {
            id:
              "autonomie-decision",

            label:
              "Une ancienne décision APA, PCH ou autre aide, seulement si vous en avez déjà une",
          },

          {
            id:
              "autonomie-notes",

            label:
              "De quoi noter les prochaines démarches",
          },
        ],
      };

    /**
     * =========================================================
     * MDPH
     * =========================================================
     */
    case "mdph":
      return {
        title:
          "Avant de contacter la MDPH",

        introduction:
          "Pour un premier contact, quelques informations simples suffisent :",

        items: [
          {
            id:
              "mdph-identite",

            label:
              "Votre identité et votre commune de résidence",
          },

          {
            id:
              "mdph-dossier",

            label:
              "Votre numéro de dossier MDPH, si vous avez déjà un dossier",
          },

          {
            id:
              "mdph-decision",

            label:
              "Votre dernière décision MDPH, seulement si vous en avez une",
          },

          {
            id:
              "mdph-question",

            label:
              "La question principale que vous souhaitez poser",
          },
        ],
      };

    /**
     * =========================================================
     * CCAS / MAIRIE
     * =========================================================
     */
    case "ccas":
    case "mairie":
      return {
        title:
          "Avant de contacter votre mairie ou votre CCAS",

        introduction:
          "Pour être orienté, vous pouvez simplement préparer :",

        items: [
          {
            id:
              "ccas-identite",

            label:
              "Votre nom et votre adresse",
          },

          {
            id:
              "ccas-besoin",

            label:
              "Le type d'aide que vous recherchez",

            note:
              "Ménage, repas, transport, accompagnement, difficulté temporaire...",
          },

          {
            id:
              "ccas-notes",

            label:
              "De quoi noter le nom du service vers lequel on vous oriente",
          },
        ],
      };

    /**
     * =========================================================
     * SERVICE SOCIAL
     * =========================================================
     */
    case "service-social":
      return {
        title:
          "Avant de contacter le service social",

        introduction:
          "Pas besoin de préparer un dossier complet. Quelques informations peuvent simplement faciliter l'échange :",

        items: [
          {
            id:
              "social-identite",

            label:
              "Votre nom et votre commune de résidence",
          },

          {
            id:
              "social-documents",

            label:
              "Les documents que l'établissement vous a déjà remis, si vous en avez",
          },

          {
            id:
              "social-retour",

            label:
              "La date prévue de votre retour à domicile, si elle est déjà connue",
          },

          {
            id:
              "social-besoin",

            label:
              "Ce dont vous aurez principalement besoin une fois chez vous",
          },
        ],
      };

    /**
     * =========================================================
     * CPAM
     * =========================================================
     */
    case "cpam":
      return {
        title:
          "Avant de contacter l'Assurance Maladie",

        introduction:
          "Gardez si possible à proximité :",

        items: [
          {
            id:
              "cpam-vitale",

            label:
              "Votre carte Vitale",
          },

          {
            id:
              "cpam-securite-sociale",

            label:
              "Votre numéro de Sécurité sociale",
          },

          {
            id:
              "cpam-dossier",

            label:
              "Une référence de dossier ou un courrier reçu, si votre demande en concerne un",
          },

          {
            id:
              "cpam-question",

            label:
              "La question que vous souhaitez poser",
          },
        ],
      };

    /**
     * =========================================================
     * AUTRES ORGANISMES
     * =========================================================
     */
    default:
      return {
        title:
          "Avant de les contacter",

        introduction:
          "Vous pouvez préparer quelques informations simples :",

        items: [
          {
            id:
              "general-identite",

            label:
              "Votre nom et votre commune de résidence",
          },

          {
            id:
              "general-besoin",

            label:
              "Une phrase pour expliquer ce dont vous avez besoin",
          },

          {
            id:
              "general-reference",

            label:
              "Votre numéro de dossier ou de contrat, seulement si vous en avez un",
          },

          {
            id:
              "general-notes",

            label:
              "De quoi noter la réponse",
          },
        ],
      };
  }
}