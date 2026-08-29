"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import AudienceChoice from "@/components/orientation/AudienceChoice";
import Welcome from "@/components/orientation/Welcome";
import Question from "@/components/orientation/Question";
import PostalCodeQuestion from "@/components/orientation/PostalCodeQuestion";
import Progress from "@/components/orientation/Progress";
import Results from "@/components/orientation/Results";

import {
  OrientationAudienceProvider,
  type OrientationAudience,
} from "@/lib/orientation/audience-context";

import {
  createEmptyAnswers,
  getNextQuestion,
  isOrientationComplete,
} from "@/lib/orientation/engine";

import type {
  DepartmentCode,
  OrientationAnswers,
} from "@/lib/orientation/types";

type AnswerValue =
  | string
  | boolean
  | null;

export default function OrientationTool() {
  const [
    started,
    setStarted,
  ] = useState(false);

  /**
   * Pour qui répond-on ?
   *
   * Cette information reste uniquement
   * dans l'état React de la page.
   */
  const [
    audience,
    setAudience,
  ] =
    useState<OrientationAudience | null>(
      null
    );

  const [
    answers,
    setAnswers,
  ] =
    useState<OrientationAnswers>(
      createEmptyAnswers()
    );

  const [
    history,
    setHistory,
  ] = useState<
    OrientationAnswers[]
  >([]);

  const contentRef =
    useRef<HTMLDivElement | null>(
      null
    );

  /**
   * Tant que la personne n'a pas choisi
   * "Pour moi" ou "J'aide un proche",
   * on ne démarre pas encore les questions.
   */
  const currentQuestion =
    audience
      ? getNextQuestion(
          answers
        )
      : null;

  const needsPostalCode =
    Boolean(
      audience &&
        answers.need &&
        answers.situation &&
        answers.postalCode ===
          undefined
    );

  const isComplete =
    Boolean(
      audience &&
        isOrientationComplete(
          answers
        )
    );

  /**
   * L'étape "Pour qui ?" devient
   * la première étape du parcours.
   */
  const currentStep =
    audience
      ? Math.max(
          2,
          history.length + 2
        )
      : 1;

  /**
   * ============================================================
   * REPOSITIONNEMENT AUTOMATIQUE
   * ============================================================
   */
  useEffect(() => {
    if (!started) {
      return;
    }

    const animationFrame =
      window.requestAnimationFrame(
        () => {
          const prefersReducedMotion =
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;

          contentRef.current?.scrollIntoView(
            {
              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth",

              block:
                "start",
            }
          );
        }
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    started,
    audience,
    history.length,
    needsPostalCode,
    isComplete,
    currentQuestion?.id,
  ]);

  function saveHistory() {
    setHistory(
      (previous) => [
        ...previous,

        {
          ...answers,
        },
      ]
    );
  }

  function handleAudience(
    value:
      OrientationAudience
  ) {
    setAudience(
      value
    );
  }

  function handleAnswer(
    value:
      AnswerValue
  ) {
    if (!currentQuestion) {
      return;
    }

    saveHistory();

    setAnswers(
      (previous) => {
        const next = {
          ...previous,
        };

        switch (
          currentQuestion.id
        ) {
          case "need":
            next.need =
              value as OrientationAnswers["need"];

            break;

          case "situation":
            next.situation =
              value as OrientationAnswers["situation"];

            break;

          case "ageGroup":
            next.ageGroup =
              value as OrientationAnswers["ageGroup"];

            break;

          case "isRetired":
            next.isRetired =
              value as
                | boolean
                | null;

            break;

          case "hasMutuelle":
            next.hasMutuelle =
              value as
                | boolean
                | null;

            break;

          case "hasHomeInsurance":
            next.hasHomeInsurance =
              value as
                | boolean
                | null;

            break;
        }

        return next;
      }
    );
  }

  function handlePostalCode(
    postalCode: string,
    department:
      DepartmentCode,
    communeCode: string,
    communeName: string
  ) {
    saveHistory();

    setAnswers(
      (previous) => ({
        ...previous,

        postalCode,
        department,
        communeCode,
        communeName,
      })
    );
  }

  function handleBack() {
    /**
     * Depuis l'écran "Pour qui ?",
     * Retour ramène à l'accueil.
     */
    if (!audience) {
      setStarted(
        false
      );

      return;
    }

    /**
     * Depuis la première vraie question,
     * Retour ramène à "Pour qui ?".
     */
    if (
      history.length === 0
    ) {
      setAudience(
        null
      );

      setAnswers(
        createEmptyAnswers()
      );

      return;
    }

    const previousAnswers =
      history[
        history.length - 1
      ];

    setAnswers(
      previousAnswers
    );

    setHistory(
      (previous) =>
        previous.slice(
          0,
          -1
        )
    );
  }

  function handleRestart() {
    setStarted(
      false
    );

    setAudience(
      null
    );

    setAnswers(
      createEmptyAnswers()
    );

    setHistory([]);
  }

  return (
    <section className="orientation-page rounded-[32px] border border-[var(--lumea-border)] shadow-[0_24px_65px_rgba(13,35,68,0.06)]">
      <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-8 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
        {!started ? (
          <Welcome
            onStart={() =>
              setStarted(true)
            }
          />
        ) : (
          <div
            ref={contentRef}
            className="scroll-mt-32"
          >
            {!isComplete ? (
              <Progress
                step={currentStep}
                onBack={handleBack}
                onRestart={handleRestart}
              />
            ) : (
              <div className="mb-5 flex items-center justify-between gap-4 rounded-[20px] border border-[var(--lumea-border)] bg-white/75 px-4 py-3 shadow-[0_8px_24px_rgba(13,35,68,0.04)] backdrop-blur sm:px-5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="group flex min-h-10 items-center gap-2 rounded-full px-3 py-2 font-semibold text-[var(--lumea-navy)] transition hover:bg-[var(--lumea-cream-2)] focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="transition group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  Retour
                </button>

                <p className="hidden text-sm font-bold text-[var(--lumea-navy)] sm:block">
                  Votre orientation
                </p>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-10 rounded-full px-3 py-2 text-sm font-semibold text-[var(--lumea-blue-grey)] transition hover:bg-[var(--lumea-cream-2)] hover:text-[var(--lumea-navy)] focus:outline-none focus:ring-4 focus:ring-[var(--lumea-gold-soft)] sm:px-4"
                >
                  <span className="sm:hidden">
                    Recommencer
                  </span>
                  <span className="hidden sm:inline">
                    Recommencer depuis le début
                  </span>
                </button>
              </div>
            )}

            <div className="mt-5">
              {!audience ? (
                <AudienceChoice
                  onSelect={handleAudience}
                />
              ) : (
                <OrientationAudienceProvider
                  audience={audience}
                >
                  {needsPostalCode ? (
                    <PostalCodeQuestion
                      onSubmit={handlePostalCode}
                    />
                  ) : currentQuestion ? (
                    <Question
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                    />
                  ) : (
                    <Results
                      answers={answers}
                    />
                  )}
                </OrientationAudienceProvider>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--lumea-border)] pt-6 text-sm text-[var(--lumea-blue-grey)] sm:flex-row sm:items-center sm:justify-between">
          <p>Orientation gratuite</p>
          <p>Réponses du questionnaire non enregistrées</p>
        </div>
      </div>
    </section>
  );
}
