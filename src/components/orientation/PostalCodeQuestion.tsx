"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  DepartmentCode,
} from "@/lib/orientation/types";

import {
  getCommunesFromPostalCode,
  getDepartmentFromPostalCode,
  getDepartmentName,
} from "@/lib/orientation/helpers";

interface PostalCodeQuestionProps {
  onSubmit: (
    postalCode: string,
    department:
      DepartmentCode,
    communeCode: string,
    communeName: string
  ) => void;
}

export default function PostalCodeQuestion({
  onSubmit,
}: PostalCodeQuestionProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const [
    postalCode,
    setPostalCode,
  ] = useState("");

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    showCommuneChoice,
    setShowCommuneChoice,
  ] = useState(false);

  const cleanedPostalCode =
    postalCode.replace(
      /\D/g,
      ""
    );

  const department =
    useMemo(
      () =>
        getDepartmentFromPostalCode(
          cleanedPostalCode
        ),
      [cleanedPostalCode]
    );

  const communes =
    useMemo(
      () =>
        cleanedPostalCode.length ===
        5
          ? getCommunesFromPostalCode(
              cleanedPostalCode
            )
          : [],
      [cleanedPostalCode]
    );

  function validateAndContinue() {
    setError(
      null
    );

    if (
      cleanedPostalCode.length !==
      5
    ) {
      setError(
        "Indiquez un code postal à 5 chiffres."
      );

      return;
    }

    if (!department) {
      setError(
        "Pour le moment, l’outil est disponible en Sarthe, Maine-et-Loire et Mayenne."
      );

      return;
    }

    if (
      communes.length === 0
    ) {
      setError(
        "Nous n’avons pas trouvé de commune correspondant à ce code postal."
      );

      return;
    }

    if (
      communes.length === 1
    ) {
      const commune =
        communes[0];

      onSubmit(
        cleanedPostalCode,
        department,
        commune.code,
        commune.name
      );

      return;
    }

    setShowCommuneChoice(
      true
    );
  }

  if (
    showCommuneChoice &&
    department
  ) {
    return (
      <section className="relative overflow-hidden rounded-[34px] bg-white p-6 shadow-[0_24px_65px_rgba(13,35,68,0.07)] sm:p-9 lg:p-12">
        <div
          aria-hidden="true"
          className="absolute -right-28 -top-28 h-64 w-64 rounded-full border border-[var(--lumea-border)]"
        />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--lumea-navy)]">
              {forRelative
                ? "Sa commune"
                : "Votre commune"}
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[var(--lumea-navy)] sm:text-4xl">
            {forRelative
              ? "Dans quelle commune habite votre proche ?"
              : "Quelle est votre commune ?"}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--lumea-blue-grey)]">
            Plusieurs communes utilisent
            le code postal{" "}

            <strong className="text-[var(--lumea-navy)]">
              {cleanedPostalCode}
            </strong>
            .

            {" "}

            {forRelative
              ? "Sélectionnez simplement celle où habite votre proche."
              : "Sélectionnez simplement la vôtre."}
          </p>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)]">
            {communes.map(
              (
                commune,
                index
              ) => (
                <button
                  key={
                    commune.code
                  }
                  type="button"
                  onClick={() =>
                    onSubmit(
                      cleanedPostalCode,
                      department,
                      commune.code,
                      commune.name
                    )
                  }
                  className={`group flex min-h-[70px] w-full items-center justify-between px-6 py-4 text-left font-semibold text-[var(--lumea-navy)] transition hover:bg-white ${
                    index !==
                    communes.length -
                      1
                      ? "border-b border-[var(--lumea-border)]"
                      : ""
                  }`}
                >
                  <span>
                    {
                      commune.name
                    }
                  </span>

                  <span
                    aria-hidden="true"
                    className="font-bold text-[var(--lumea-gold)] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setShowCommuneChoice(
                false
              )
            }
            className="mt-6 font-semibold text-[var(--lumea-blue-grey)] transition hover:text-[var(--lumea-navy)]"
          >
            ← Modifier le code postal
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[34px] bg-white p-6 shadow-[0_24px_65px_rgba(13,35,68,0.07)] sm:p-9 lg:p-12">
      <div
        aria-hidden="true"
        className="absolute -right-28 -top-28 h-64 w-64 rounded-full border border-[var(--lumea-border)]"
      />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--lumea-navy)]">
            Près de chez vous
          </p>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.04em] text-[var(--lumea-navy)] sm:text-4xl">
          {forRelative
            ? "Quel est le code postal de votre proche ?"
            : "Quel est votre code postal ?"}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--lumea-blue-grey)]">
          {forRelative
            ? "Cela nous permet uniquement d’identifier les interlocuteurs qui interviennent réellement là où habite votre proche."
            : "Cela nous permet uniquement d’identifier les interlocuteurs qui interviennent réellement dans votre secteur."}
        </p>

        <div className="mt-9 max-w-xl">
          <label
            htmlFor="postal-code"
            className="text-sm font-bold text-[var(--lumea-navy)]"
          >
            Code postal
          </label>

          <input
            id="postal-code"
            type="text"
            inputMode="numeric"
            autoComplete={
              forRelative
                ? "off"
                : "postal-code"
            }
            maxLength={5}
            value={
              postalCode
            }
            placeholder="Ex. 72200"
            onChange={(
              event
            ) => {
              setPostalCode(
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              );

              setError(
                null
              );
            }}
            onKeyDown={(
              event
            ) => {
              if (
                event.key ===
                "Enter"
              ) {
                validateAndContinue();
              }
            }}
            className="mt-2 h-16 w-full rounded-[18px] border border-[var(--lumea-border)] bg-[var(--lumea-cream-2)] px-5 text-xl font-semibold tracking-[0.08em] text-[var(--lumea-navy)] outline-none transition placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-400 focus:border-[var(--lumea-gold)] focus:bg-white focus:ring-4 focus:ring-[rgba(239,183,47,0.16)]"
          />

          {department ? (
            <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--lumea-navy)]">
              <span className="h-2 w-2 rounded-full bg-[var(--lumea-gold)]" />

              {getDepartmentName(
                department
              )}
            </div>
          ) : null}

          {error ? (
            <div
              role="alert"
              className="mt-4 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-800"
            >
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={
              validateAndContinue
            }
            className="lumea-button-primary mt-7 flex min-h-[58px] w-full items-center justify-between rounded-full px-7 py-4 text-lg font-semibold"
          >
            <span>
              Continuer
            </span>

            <span
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>

        <div className="mt-8 max-w-2xl border-t border-[var(--lumea-border)] pt-5">
          <p className="text-sm leading-6 text-[var(--lumea-blue-grey)]">
            <strong className="text-[var(--lumea-navy)]">
              Confidentialité :
            </strong>{" "}

            {forRelative
              ? "le code postal et la commune de votre proche restent uniquement dans votre navigateur et ne sont pas transmis à Luméa."
              : "votre code postal et votre commune restent uniquement dans votre navigateur et ne sont pas transmis à Luméa."}
          </p>
        </div>
      </div>
    </section>
  );
}