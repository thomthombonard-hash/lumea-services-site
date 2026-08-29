// Départements couverts par la V1
export type DepartmentCode =
  | "72"
  | "49"
  | "53";

// Besoin principal
export type NeedType =
  | "menage"
  | "transport"
  | "courses"
  | "repas"
  | "aide-quotidien"
  | "autre"
  | "inconnu";

// Situation ayant déclenché le besoin
export type SituationType =
  | "retour-hospitalisation"
  | "perte-autonomie"
  | "handicap"
  | "accident-immobilisation"
  | "demenagement"
  | "sinistre"
  | "deces-proche"
  | "difficulte-temporaire"
  | "besoin-regulier"
  | "autre"
  | "inconnue";

// Tranches d'âge volontairement larges
export type AgeGroup =
  | "moins-60"
  | "60-74"
  | "75-plus"
  | "inconnu";

// Valeur d'une réponse simple
export type AnswerValue =
  | string
  | boolean
  | null;

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  value: AnswerValue;
}

export interface OrientationQuestion {
  id: string;
  title: string;
  helpText?: string;
  options: QuestionOption[];
  allowUnknown?: boolean;
}

/**
 * Réponses temporaires du questionnaire.
 *
 * Rien dans cet objet ne doit être envoyé
 * ou enregistré sur un serveur.
 */
export interface OrientationAnswers {
  need?: NeedType;

  situation?: SituationType;

  /**
   * Utilisé uniquement pendant la recherche.
   */
  postalCode?: string;

  /**
   * Déduit automatiquement du code postal.
   */
  department?: DepartmentCode;

  /**
   * Code INSEE de la commune.
   *
   * Utilisé uniquement en mémoire pour trouver
   * les bons interlocuteurs locaux.
   */
  communeCode?: string;

  /**
   * Nom de la commune.
   *
   * Utilisé uniquement pour améliorer
   * l'affichage des résultats.
   */
  communeName?: string;

  ageGroup?: AgeGroup;

  isRetired?: boolean | null;

  hasMutuelle?: boolean | null;

  hasHomeInsurance?: boolean | null;
}

export type OrganizationType =
  | "clic"
  | "departement"
  | "mdph"
  | "carsat"
  | "caisse-retraite"
  | "mutuelle"
  | "assurance"
  | "cpam"
  | "ccas"
  | "mairie"
  | "service-social"
  | "autre";

export interface Organization {
  id: string;

  name: string;

  type: OrganizationType;

  departments?: DepartmentCode[];

  phone?: string;

  email?: string;

  website?: string;

  address?: string;

  description?: string;
}

export interface OfficialSource {
  id: string;

  title: string;

  organization: string;

  url: string;

  checkedAt: string;
}

export type RecommendationPriority =
  | "primary"
  | "secondary"
  | "optional";

export interface Recommendation {
  id: string;

  title: string;

  organizationType: OrganizationType;

  priority: RecommendationPriority;

  why: string;

  whatToAsk?: string;

  organizationId?: string;

  sourceIds: string[];

  templateIds?: string[];
}

export interface OrientationRule {
  id: string;

  matches: (
    answers: OrientationAnswers
  ) => boolean;

  recommendationIds: string[];
}

export interface OrientationResult {
  recommendations: Recommendation[];
}

export type DocumentTemplateType =
  | "email"
  | "courrier"
  | "telephone";

export interface DocumentTemplate {
  id: string;

  title: string;

  type: DocumentTemplateType;

  recipientType: OrganizationType;

  subject?: string;

  content: string;

  relatedSituations?: SituationType[];

  relatedNeeds?: NeedType[];
}