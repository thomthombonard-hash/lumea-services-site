import type {
  OrientationAudience,
} from "./audience-context";

/**
 * Adapte les textes descriptifs et les listes de préparation
 * lorsqu'une personne répond pour un proche.
 *
 * Important : on ne remplace pas tous les « vous » de façon
 * automatique. Certains s'adressent réellement à l'aidant qui
 * utilise l'outil.
 */
export function adaptTextForAudience(
  text: string,
  audience: OrientationAudience
): string {
  if (audience !== "relative") {
    return text;
  }

  const originalStartsWithUppercase =
    /^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜ]/.test(text);

  let result = text;

  /**
   * Les formulations les plus précises passent en premier afin
   * d'éviter des phrases hybrides du type « votre nom et la
   * commune de votre proche ».
   */
  const replacements: Array<[
    RegExp,
    string,
  ]> = [
    [
      /votre nom, prénom et commune de résidence/gi,
      "le nom, le prénom et la commune de résidence de votre proche",
    ],
    [
      /votre identité et votre commune de résidence/gi,
      "l'identité et la commune de résidence de votre proche",
    ],
    [
      /votre nom et votre commune de résidence/gi,
      "le nom et la commune de résidence de votre proche",
    ],
    [
      /votre nom et votre adresse/gi,
      "le nom et l'adresse de votre proche",
    ],
    [
      /votre carte de mutuelle ou de tiers payant/gi,
      "la carte de mutuelle ou de tiers payant de votre proche",
    ],
    [
      /votre carte de mutuelle ou votre contrat/gi,
      "la carte de mutuelle ou le contrat de votre proche",
    ],
    [
      /votre contrat ou votre attestation d'assurance/gi,
      "le contrat ou l'attestation d'assurance de votre proche",
    ],
    [
      /votre numéro d'adhérent ou de contrat/gi,
      "le numéro d'adhérent ou de contrat de votre proche",
    ],
    [
      /votre numéro de sinistre ou de dossier/gi,
      "le numéro de sinistre ou de dossier de votre proche",
    ],
    [
      /votre numéro de dossier ou référence retraite/gi,
      "le numéro de dossier ou la référence retraite de votre proche",
    ],
    [
      /votre numéro de dossier ou de contrat/gi,
      "le numéro de dossier ou de contrat de votre proche",
    ],
    [
      /votre mairie ou votre CCAS/gi,
      "la mairie ou le CCAS de votre proche",
    ],
    [
      /votre interlocuteur/gi,
      "l'interlocuteur de votre proche",
    ],
    [
      /les documents que l'établissement vous a déjà remis/gi,
      "les documents que l'établissement a déjà remis à votre proche",
    ],
    [
      /la date prévue de votre retour à domicile/gi,
      "la date prévue du retour à domicile de votre proche",
    ],
    [
      /ce dont vous aurez principalement besoin une fois chez vous/gi,
      "ce dont votre proche aura principalement besoin une fois à son domicile",
    ],
    [
      /de votre retour à domicile/gi,
      "du retour à domicile de votre proche",
    ],
    [
      /votre retour à domicile/gi,
      "le retour à domicile de votre proche",
    ],
    [
      /à votre domicile/gi,
      "au domicile de votre proche",
    ],
    [
      /de votre domicile/gi,
      "du domicile de votre proche",
    ],
    [
      /votre domicile/gi,
      "le domicile de votre proche",
    ],
    [
      /dans votre logement/gi,
      "dans le logement de votre proche",
    ],
    [
      /votre logement/gi,
      "le logement de votre proche",
    ],
    [
      /votre situation/gi,
      "la situation de votre proche",
    ],
    [
      /vos besoins/gi,
      "les besoins de votre proche",
    ],
    [
      /votre besoin/gi,
      "le besoin de votre proche",
    ],
    [
      /votre commune de résidence/gi,
      "la commune de résidence de votre proche",
    ],
    [
      /votre commune/gi,
      "la commune de votre proche",
    ],
    [
      /votre département/gi,
      "le département de votre proche",
    ],
    [
      /votre assurance habitation/gi,
      "l'assurance habitation de votre proche",
    ],
    [
      /votre assurance/gi,
      "l'assurance de votre proche",
    ],
    [
      /votre mutuelle/gi,
      "la mutuelle de votre proche",
    ],
    [
      /votre caisse de retraite/gi,
      "la caisse de retraite de votre proche",
    ],
    [
      /votre carte de mutuelle/gi,
      "la carte de mutuelle de votre proche",
    ],
    [
      /votre carte de tiers payant/gi,
      "la carte de tiers payant de votre proche",
    ],
    [
      /votre carte Vitale/gi,
      "la carte Vitale de votre proche",
    ],
    [
      /votre carte ou votre contrat/gi,
      "la carte ou le contrat de votre proche",
    ],
    [
      /votre carte/gi,
      "la carte de votre proche",
    ],
    [
      /votre contrat/gi,
      "le contrat de votre proche",
    ],
    [
      /votre attestation d'assurance/gi,
      "l'attestation d'assurance de votre proche",
    ],
    [
      /votre numéro de Sécurité sociale/gi,
      "le numéro de Sécurité sociale de votre proche",
    ],
    [
      /votre numéro d'adhérent/gi,
      "le numéro d'adhérent de votre proche",
    ],
    [
      /votre numéro de contrat/gi,
      "le numéro de contrat de votre proche",
    ],
    [
      /votre numéro de sinistre/gi,
      "le numéro de sinistre de votre proche",
    ],
    [
      /votre numéro de dossier/gi,
      "le numéro de dossier de votre proche",
    ],
    [
      /votre dernière décision MDPH/gi,
      "la dernière décision MDPH de votre proche",
    ],
    [
      /votre ancienne décision/gi,
      "l'ancienne décision de votre proche",
    ],
    [
      /votre espace adhérent/gi,
      "l'espace adhérent de votre proche",
    ],
    [
      /votre espace client/gi,
      "l'espace client de votre proche",
    ],
    [
      /votre nom/gi,
      "le nom de votre proche",
    ],
    [
      /votre adresse/gi,
      "l'adresse de votre proche",
    ],
    [
      /dont vous avez besoin/gi,
      "dont votre proche a besoin",
    ],
    [
      /si vous êtes retraité(?:e)?/gi,
      "si votre proche est retraité",
    ],
    [
      /si vous avez une mutuelle/gi,
      "si votre proche a une mutuelle",
    ],
    [
      /si vous avez une assurance habitation/gi,
      "si votre proche a une assurance habitation",
    ],
    [
      /si vous en avez déjà un/gi,
      "si votre proche en a déjà un",
    ],
    [
      /si vous en avez déjà une/gi,
      "si votre proche en a déjà une",
    ],
    [
      /si vous en avez un/gi,
      "si votre proche en a un",
    ],
    [
      /si vous en avez une/gi,
      "si votre proche en a une",
    ],
    [
      /si vous en avez/gi,
      "si votre proche en a",
    ],
    [
      /vous aider/gi,
      "aider votre proche",
    ],
    [
      /vous concerne/gi,
      "concerne votre proche",
    ],
    [
      /chez vous/gi,
      "au domicile de votre proche",
    ],
  ];

  for (const [
    pattern,
    replacement,
  ] of replacements) {
    result = result.replace(
      pattern,
      replacement
    );
  }

  if (
    originalStartsWithUppercase &&
    result.length > 0
  ) {
    result =
      result.charAt(0).toLocaleUpperCase(
        "fr"
      ) + result.slice(1);
  }

  return result;
}

/**
 * Adapte une phrase destinée à être dite ou écrite à un
 * organisme.
 *
 * Ici, « votre » désigne souvent l'organisme appelé (« votre
 * secteur », « les services que vous proposez »). On ne passe
 * donc surtout pas par adaptTextForAudience : seules les
 * références à la personne concernée sont transformées.
 */
export function adaptRequestForAudience(
  text: string,
  audience: OrientationAudience
): string {
  if (audience !== "relative") {
    return text;
  }

  let result = text;

  const replacements: Array<[
    RegExp,
    string,
  ]> = [
    [
      /J'habite dans votre secteur et j'ai besoin d'aide à domicile/gi,
      "Mon proche habite dans votre secteur et a besoin d'aide à domicile",
    ],
    [
      /J'habite dans votre secteur et je souhaiterais être orienté/gi,
      "Mon proche habite dans votre secteur et je souhaiterais être orienté",
    ],
    [
      /Je vais rentrer à domicile/gi,
      "Mon proche va rentrer à domicile",
    ],
    [
      /Je rentre chez moi après une hospitalisation/gi,
      "Mon proche rentre à son domicile après une hospitalisation",
    ],
    [
      /Je rencontre actuellement une difficulté temporaire/gi,
      "Mon proche rencontre actuellement une difficulté temporaire",
    ],
    [
      /J'ai besoin d'une aide régulière/gi,
      "Mon proche a besoin d'une aide régulière",
    ],
    [
      /J'ai besoin d'aide à domicile/gi,
      "Mon proche a besoin d'aide à domicile",
    ],
    [
      /j'aurai besoin d'aide/gi,
      "aura besoin d'aide",
    ],
    [
      /j'aurais besoin d'aide/gi,
      "aurait besoin d'aide",
    ],
    [
      /ma situation/gi,
      "sa situation",
    ],
    [
      /ma caisse de retraite/gi,
      "sa caisse de retraite",
    ],
    [
      /mon quotidien/gi,
      "son quotidien",
    ],
    [
      /mon contrat/gi,
      "son contrat",
    ],
    [
      /mon logement/gi,
      "son logement",
    ],
    [
      /ma commune/gi,
      "sa commune",
    ],
    [
      /mes déplacements/gi,
      "ses déplacements",
    ],
    [
      /mes besoins/gi,
      "ses besoins",
    ],
    [
      /mon besoin/gi,
      "le besoin de mon proche",
    ],
    [
      /Pouvez-vous évaluer avec moi les prestations qui correspondent à ses besoins au quotidien \?/gi,
      "Pouvez-vous m'aider à identifier les prestations qui correspondent à ses besoins au quotidien ?",
    ],
  ];

  for (const [
    pattern,
    replacement,
  ] of replacements) {
    result = result.replace(
      pattern,
      replacement
    );
  }

  return result;
}
