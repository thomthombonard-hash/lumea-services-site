import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import ChoiceButton from "./ChoiceButton";

type QuestionValue =
  | string
  | boolean
  | null;

interface QuestionOption {
  label: string;

  description?: string;

  value:
    QuestionValue;
}

interface QuestionData {
  id?: string;

  title: string;

  helpText?: string;

  options:
    readonly QuestionOption[];
}

interface QuestionProps {
  question:
    QuestionData;

  onAnswer: (
    value:
      QuestionValue
  ) => void;
}

/**
 * ============================================================
 * TITRES DES QUESTIONS - PARCOURS PROCHE
 * ============================================================
 */
function getRelativeTitle(
  question:
    QuestionData
): string {
  switch (
    question.id
  ) {
    case "need":
      return "De quoi votre proche a-t-il besoin ?";

    case "situation":
      return "Quelle situation correspond le mieux à celle de votre proche ?";

    case "ageGroup":
      return "Quel âge a votre proche ?";

    case "isRetired":
      return "Votre proche est-il retraité ?";

    case "hasMutuelle":
      return "Votre proche a-t-il une mutuelle ?";

    case "hasHomeInsurance":
      return "Votre proche a-t-il une assurance habitation ?";

    default:
      return question.title;
  }
}

/**
 * ============================================================
 * TEXTES D'AIDE - PARCOURS PROCHE
 * ============================================================
 */
function getRelativeHelpText(
  question:
    QuestionData
): string | undefined {
  switch (
    question.id
  ) {
    case "need":
      return "Choisissez simplement ce qui correspond le mieux à ses besoins.";

    case "situation":
      return "Choisissez la situation qui se rapproche le plus de ce que vit votre proche.";

    case "ageGroup":
      return "Une tranche d’âge suffit. Nous ne demandons pas sa date de naissance.";

    case "isRetired":
      return "Cette information nous aide uniquement à identifier les organismes qui pourraient être utiles.";

    case "hasMutuelle":
      return "Certaines mutuelles peuvent prévoir des services d’assistance selon le contrat.";

    case "hasHomeInsurance":
      return "Certaines assurances habitation peuvent prévoir des services d’assistance selon le contrat.";

    default:
      return question.helpText;
  }
}

/**
 * ============================================================
 * RÉPONSES - PARCOURS PROCHE
 * ============================================================
 *
 * Les valeurs ne changent jamais.
 * Seul le texte visible est adapté.
 *
 * Le moteur d'orientation continue donc
 * exactement à fonctionner comme avant.
 */
function getRelativeOptionLabel(
  questionId: string | undefined,
  option:
    QuestionOption
): string {
  if (
    questionId !==
    "situation"
  ) {
    return option.label;
  }

  switch (
    String(
      option.value
    )
  ) {
    case "retour-hospitalisation":
      return "Retour à domicile après une hospitalisation";

    case "perte-autonomie":
      return "Certaines choses deviennent difficiles avec l’âge";

    case "handicap":
      return "Besoin d’aide en lien avec une situation de handicap";

    case "accident-immobilisation":
      return "Limitation temporaire après un accident ou une blessure";

    case "demenagement":
      return "Déménagement";

    case "sinistre":
      return "Sinistre dans son logement";

    case "deces-proche":
      return "Décès d’un proche ou situation familiale difficile";

    case "difficulte-temporaire":
      return "Besoin d’un coup de main temporairement";

    case "besoin-regulier":
      return "Besoin d’une aide régulière";

    case "autre":
      return "Une autre situation";

    case "inconnue":
      return "Je ne sais pas";

    default:
      return option.label;
  }
}

export default function Question({
  question,
  onAnswer,
}: QuestionProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const title =
    forRelative
      ? getRelativeTitle(
          question
        )
      : question.title;

  const helpText =
    forRelative
      ? getRelativeHelpText(
          question
        )
      : question.helpText;

  return (
    <section className="relative grid gap-8 overflow-hidden rounded-[34px] bg-white p-6 shadow-[0_24px_65px_rgba(13,49,83,0.07)] sm:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:p-12">
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-56 w-56 rounded-full border border-[var(--lumea-border)]"
      />

      <div className="relative">
        <div className="inline-flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--lumea-navy)]">
            {forRelative
              ? "La situation de votre proche"
              : "Votre situation"}
          </p>
        </div>

        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] text-[var(--lumea-navy)] sm:text-4xl">
          {title}
        </h1>

        {helpText ? (
          <p className="mt-5 max-w-md leading-7 text-[var(--lumea-blue-grey)]">
            {helpText}
          </p>
        ) : null}

        {forRelative ? (
          <p className="mt-5 max-w-md text-sm leading-6 text-[var(--lumea-blue-grey)]">
            Répondez simplement à partir
            de ce que vous savez.
            Nous ne vous demanderons
            aucune information permettant
            d&apos;identifier votre proche.
          </p>
        ) : null}

        <div className="mt-8 hidden h-[3px] w-16 rounded-full bg-[var(--lumea-gold)] lg:block" />
      </div>

      <div className="relative rounded-[24px] border border-[var(--lumea-border)] bg-[var(--lumea-sky-light)] px-5 py-2 sm:px-7">
        {question.options.map(
          (
            option,
            index
          ) => {
            const optionLabel =
              forRelative
                ? getRelativeOptionLabel(
                    question.id,
                    option
                  )
                : option.label;

            return (
              <ChoiceButton
                key={`${String(
                  option.value
                )}-${index}`}
                label={
                  optionLabel
                }
                description={
                  option.description
                }
                onClick={() =>
                  onAnswer(
                    option.value
                  )
                }
              />
            );
          }
        )}
      </div>
    </section>
  );
}