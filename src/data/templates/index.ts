import {
  adaptRequestForAudience,
} from "@/lib/orientation/audience-language";

import type {
  OrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  Recommendation,
} from "@/lib/orientation/types";

export type AssistanceTemplateType =
  | "telephone"
  | "email"
  | "courrier";

export interface AssistanceTemplate {
  id: string;

  type:
    AssistanceTemplateType;

  label: string;

  title: string;

  subject?: string;

  content: string;
}

function getContractReference(
  recommendation:
    Recommendation,
  audience:
    OrientationAudience
): string | null {
  const forRelative =
    audience ===
    "relative";

  if (
    recommendation.organizationType ===
    "mutuelle"
  ) {
    return forRelative
      ? "N° d'adhérent / de contrat de votre proche : [à compléter]"
      : "N° d'adhérent / de contrat : [à compléter]";
  }

  if (
    recommendation.organizationType ===
    "assurance"
  ) {
    return forRelative
      ? `N° de contrat de votre proche : [à compléter]
N° de sinistre / dossier : [si un dossier existe déjà]`
      : `N° de contrat : [à compléter]
N° de sinistre / dossier : [si vous en avez déjà un]`;
  }

  return null;
}

function getPhonePreparation(
  recommendation:
    Recommendation,
  audience:
    OrientationAudience
): string | null {
  const forRelative =
    audience ===
    "relative";

  if (
    recommendation.organizationType ===
    "mutuelle"
  ) {
    return forRelative
      ? `Avant d'appeler, gardez la carte de mutuelle ou le contrat de votre proche à proximité.

On pourra vous demander son numéro d'adhérent ou son numéro de contrat.`
      : `Avant d'appeler, gardez votre carte de mutuelle ou votre contrat à proximité.

On pourra vous demander votre numéro d'adhérent ou votre numéro de contrat.`;
  }

  if (
    recommendation.organizationType ===
    "assurance"
  ) {
    return forRelative
      ? `Avant d'appeler, gardez le contrat ou l'attestation d'assurance de votre proche à proximité.

On pourra vous demander son numéro de contrat.

Si un sinistre a déjà été déclaré, gardez également le numéro de sinistre ou de dossier.`
      : `Avant d'appeler, gardez votre contrat ou votre attestation d'assurance à proximité.

On pourra vous demander votre numéro de contrat.

Si vous avez déjà déclaré le sinistre, gardez également votre numéro de sinistre ou de dossier.`;
  }

  return null;
}

function getRequestTitle(
  recommendation:
    Recommendation
): string {
  switch (
    recommendation.organizationType
  ) {
    case "caisse-retraite":
    case "carsat":
      return "Demande d'information sur les aides à domicile";

    case "mutuelle":
      return "Demande d'information sur les prestations d'assistance";

    case "assurance":
      return "Demande d'information sur les garanties d'assistance";

    case "clic":
      return "Demande d'orientation concernant une aide à domicile";

    case "departement":
      return "Demande d'information et d'orientation";

    case "ccas":
    case "mairie":
      return "Demande d'information sur les aides disponibles localement";

    case "service-social":
      return "Demande d'orientation concernant une aide à domicile";

    case "mdph":
      return "Demande d'information concernant les aides et accompagnements";

    default:
      return "Demande d'information concernant une aide à domicile";
  }
}

function normalizeRequestText(
  text: string
): string {
  let result =
    text.trim();

  result =
    result.replace(
      /^Demandez si\s+/i,
      "Je souhaite savoir si "
    );

  result =
    result.replace(
      /^Demandez quelles?\s+/i,
      (
        match
      ) =>
        match
          .toLowerCase()
          .includes(
            "quelles"
          )
          ? "Je souhaite savoir quelles "
          : "Je souhaite savoir quelle "
    );

  result =
    result.replace(
      /^Demandez comment\s+/i,
      "Je souhaite savoir comment "
    );

  result =
    result.replace(
      /^Vérifiez si\s+/i,
      "Je souhaite vérifier si "
    );

  return result;
}

function getRequestText(
  recommendation:
    Recommendation,
  audience:
    OrientationAudience
): string {
  if (
    recommendation.whatToAsk
  ) {
    const adapted =
      adaptRequestForAudience(
        recommendation.whatToAsk,
        audience
      );

    return normalizeRequestText(
      adapted
    );
  }

  return audience ===
    "relative"
    ? "Je souhaite savoir quelles aides, démarches ou solutions peuvent correspondre à la situation de mon proche."
    : "Je souhaite savoir quelles aides, démarches ou solutions peuvent correspondre à ma situation.";
}

export function getTemplatesForRecommendation(
  recommendation:
    Recommendation,
  organizationName: string,
  communeName?: string,
  audience:
    OrientationAudience = "self"
): AssistanceTemplate[] {
  const forRelative =
    audience ===
    "relative";

  const requestTitle =
    getRequestTitle(
      recommendation
    );

  const requestText =
    getRequestText(
      recommendation,
      audience
    );

  const contractReference =
    getContractReference(
      recommendation,
      audience
    );

  const phonePreparation =
    getPhonePreparation(
      recommendation,
      audience
    );

  const locationText =
    forRelative
      ? communeName
        ? `Mon proche habite à ${communeName}.`
        : "Mon proche habite dans votre secteur."
      : communeName
        ? `J'habite à ${communeName}.`
        : "J'habite dans votre secteur.";

  const telephonePreparationText =
    phonePreparation
      ? `${phonePreparation}\n\n────────────────────\n\n`
      : "";

  const emailReferenceText =
    contractReference
      ? `\n${contractReference}\n`
      : "";

  const courrierReferenceText =
    contractReference
      ? `\n${contractReference}\n`
      : "";

  const telephoneIntro =
    forRelative
      ? `Bonjour,

Je vous appelle pour un proche que j'accompagne. Je cherche des informations concernant une aide à domicile pour cette personne.`
      : `Bonjour,

Je vous appelle car je cherche des informations concernant une aide à domicile.`;

  const telephoneSituation =
    forRelative
      ? `Je ne sais pas forcément quel dispositif correspond à sa situation. Pouvez-vous m'indiquer vers quelle aide ou quel service nous devons nous tourner ?`
      : `Je ne sais pas forcément quel dispositif correspond à ma situation. Pouvez-vous m'indiquer vers quelle aide ou quel service je dois me tourner ?`;

  const emailIntro =
    forRelative
      ? "Je me permets de vous contacter pour un proche que j'accompagne afin d'obtenir des informations concernant les aides ou services qui pourraient correspondre à sa situation."
      : "Je me permets de vous contacter afin d'obtenir des informations concernant les aides ou services qui pourraient correspondre à ma situation.";

  const emailQuestion =
    forRelative
      ? "Je souhaiterais savoir vers quel dispositif ou service nous devons nous tourner et, le cas échéant, quelles démarches sont nécessaires pour effectuer une demande."
      : "Je souhaiterais savoir vers quel dispositif ou service je dois me tourner et, le cas échéant, quelles démarches sont nécessaires pour effectuer une demande.";

  const courrierIntro =
    forRelative
      ? "Je me permets de vous contacter pour un proche que j'accompagne afin d'obtenir des informations concernant les aides ou services qui pourraient correspondre à sa situation."
      : "Je me permets de vous contacter afin d'obtenir des informations concernant les aides ou services qui pourraient correspondre à ma situation.";

  const courrierQuestion =
    forRelative
      ? "Je souhaiterais savoir vers quel dispositif ou service nous devons nous tourner et connaître les éventuelles démarches à effectuer."
      : "Je souhaiterais savoir vers quel dispositif ou service je dois me tourner et connaître les éventuelles démarches à effectuer.";

  return [
    {
      id:
        `${recommendation.id}-telephone`,

      type:
        "telephone",

      label:
        "Préparer mon appel",

      title:
        "Exemple de conversation téléphonique",

      content:
        `${telephonePreparationText}${telephoneIntro}

${locationText}

${requestText}

${telephoneSituation}

Pouvez-vous également me préciser les démarches à effectuer et les documents qui pourraient être nécessaires ?

Merci beaucoup pour votre aide.`,
    },

    {
      id:
        `${recommendation.id}-email`,

      type:
        "email",

      label:
        "Préparer un mail",

      title:
        "Modèle de mail",

      subject:
        requestTitle,

      content:
        `Bonjour,
${emailReferenceText}
${emailIntro}

${locationText}

${requestText}

${emailQuestion}

Je vous remercie par avance pour votre aide et reste disponible si vous avez besoin d'informations complémentaires.

Bien cordialement,

[Votre prénom et votre nom]`,
    },

    {
      id:
        `${recommendation.id}-courrier`,

      type:
        "courrier",

      label:
        "Préparer un courrier",

      title:
        "Modèle de courrier",

      subject:
        requestTitle,

      content:
        `[Votre prénom et votre nom]
[Votre adresse]
[Votre code postal et votre commune]${courrierReferenceText}

À l'attention de ${organizationName}

Objet : ${requestTitle}

Madame, Monsieur,

${courrierIntro}

${locationText}

${requestText}

${courrierQuestion}

Je vous remercie par avance pour l'attention portée à ma demande.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Signature]`,
    },
  ];
}