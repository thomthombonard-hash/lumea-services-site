"use client";

import {
  useState,
} from "react";

import {
  getOrganizationById,
} from "@/data/organisations";

import type {
  SupportProvider,
  SupportProviderCategory,
} from "@/data/support-providers";

import {
  getTemplatesForRecommendation,
  type AssistanceTemplate,
  type AssistanceTemplateType,
} from "@/data/templates";

import {
  adaptTextForAudience,
} from "@/lib/orientation/audience-language";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  Recommendation,
} from "@/lib/orientation/types";

import PreparationChecklist from "./PreparationChecklist";
import ProviderSelector from "./ProviderSelector";

interface RecommendationActionsProps {
  recommendation:
    Recommendation;

  communeName?: string;

  onProviderChange?: (
    provider:
      SupportProvider | null,
    unknownName?: string
  ) => void;
}

export default function RecommendationActions({
  recommendation,
  communeName,
  onProviderChange,
}: RecommendationActionsProps) {
  const audience =
    useOrientationAudience();

  const forRelative =
    audience ===
    "relative";

  const [
    activeType,
    setActiveType,
  ] =
    useState<AssistanceTemplateType | null>(
      null
    );

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    selectedProvider,
    setSelectedProvider,
  ] =
    useState<SupportProvider | null>(
      null
    );

  const [
    providerUnknown,
    setProviderUnknown,
  ] = useState(false);

  const [
    unknownProviderName,
    setUnknownProviderName,
  ] = useState("");

  const genericOrganization =
    recommendation.organizationId
      ? getOrganizationById(
          recommendation.organizationId
        )
      : undefined;

  const providerCategory:
    SupportProviderCategory | null =
    recommendation.organizationType ===
    "mutuelle"
      ? "mutuelle"
      : recommendation.organizationType ===
          "assurance"
        ? "assurance"
        : null;

  const organizationName =
    selectedProvider?.name ??
    (
      providerUnknown &&
      unknownProviderName.trim()
        ? unknownProviderName.trim()
        : null
    ) ??
    genericOrganization?.name ??
    adaptTextForAudience(
      recommendation.title,
      audience
    );

  const templates =
    getTemplatesForRecommendation(
      recommendation,
      organizationName,
      communeName,
      audience
    );

  const activeTemplate =
    templates.find(
      (
        template
      ) =>
        template.type ===
        activeType
    );

  function openTemplate(
    type:
      AssistanceTemplateType
  ) {
    setCopied(
      false
    );

    setActiveType(
      (
        current
      ) =>
        current === type
          ? null
          : type
    );
  }

  async function copyTemplate(
    template:
      AssistanceTemplate
  ) {
    const completeText =
      template.subject
        ? `Objet : ${template.subject}\n\n${template.content}`
        : template.content;

    try {
      await navigator.clipboard.writeText(
        completeText
      );

      setCopied(
        true
      );
    } catch {
      setCopied(
        false
      );
    }
  }

  function resetProvider() {
    setSelectedProvider(
      null
    );

    setProviderUnknown(
      false
    );

    setUnknownProviderName(
      ""
    );

    setActiveType(
      null
    );

    setCopied(
      false
    );

    onProviderChange?.(
      null
    );
  }

  if (
    providerCategory &&
    !selectedProvider &&
    !providerUnknown
  ) {
    return (
      <div className="mt-6">
        <ProviderSelector
          category={
            providerCategory
          }
          onSelect={(
            provider
          ) => {
            setSelectedProvider(
              provider
            );

            setProviderUnknown(
              false
            );

            setUnknownProviderName(
              ""
            );

            onProviderChange?.(
              provider
            );
          }}
          onUnknown={(
            enteredName
          ) => {
            setProviderUnknown(
              true
            );

            setUnknownProviderName(
              enteredName
            );

            onProviderChange?.(
              null,
              enteredName
            );
          }}
        />
      </div>
    );
  }

  const providerNote =
    selectedProvider?.note
      ? adaptTextForAudience(
          selectedProvider.note,
          audience
        )
      : undefined;

  return (
    <section className="mt-6 rounded-[24px] bg-[#f8f4eb] p-5 sm:p-7">
      {selectedProvider ? (
        <div className="mb-7">
          <p className="text-sm font-bold text-[var(--lumea-blue-grey)]">
            {forRelative
              ? "Organisme de votre proche"
              : "Votre organisme"}
          </p>

          <h3 className="mt-1 text-[1.65rem] font-bold leading-tight text-[var(--lumea-navy)]">
            {
              selectedProvider.name
            }
          </h3>

          {providerNote ? (
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
              {providerNote}
            </p>
          ) : null}

          <button
            type="button"
            onClick={
              resetProvider
            }
            className="mt-4 text-sm font-semibold text-[var(--lumea-blue-grey)] underline underline-offset-4"
          >
            {forRelative
              ? "Ce n’est pas son organisme"
              : "Ce n’est pas mon organisme"}
          </button>
        </div>
      ) : null}

      {providerUnknown ? (
        <div className="mb-7 rounded-[20px] border border-[var(--lumea-border)] bg-white p-5 sm:p-6">
          <p className="text-xl font-bold text-[var(--lumea-navy)]">
            Ce n&apos;est pas grave.
          </p>

          <p className="mt-2 text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
            {forRelative
              ? "Même si l’organisme de votre proche n’est pas encore dans notre annuaire, nous allons quand même vous aider."
              : "Même si votre organisme n’est pas encore dans notre annuaire, nous allons quand même vous aider."}
          </p>

          <label
            htmlFor="unknown-provider-name"
            className="mt-5 block font-bold text-[var(--lumea-navy)]"
          >
            {forRelative
              ? "Nom de son organisme"
              : "Nom de votre organisme"}

            <span className="font-normal text-[var(--lumea-blue-grey)]">
              {" "}
              (facultatif)
            </span>
          </label>

          <input
            id="unknown-provider-name"
            type="text"
            value={
              unknownProviderName
            }
            placeholder={
              providerCategory ===
              "mutuelle"
                ? forRelative
                  ? "Ex. sa mutuelle..."
                  : "Ex. ma mutuelle..."
                : forRelative
                  ? "Ex. son assurance ou sa banque..."
                  : "Ex. mon assurance ou ma banque..."
            }
            onChange={(
              event
            ) => {
              const value =
                event.target.value;

              setUnknownProviderName(
                value
              );

              onProviderChange?.(
                null,
                value
              );
            }}
            className="mt-2 h-14 w-full rounded-[15px] border border-[var(--lumea-border)] bg-[#fbfaf7] px-4 text-[17px] text-[var(--lumea-navy)] outline-none focus:border-[var(--lumea-gold)] focus:ring-4 focus:ring-[var(--lumea-gold-soft)]"
          />

          <div className="mt-6 border-t border-[var(--lumea-border)] pt-5">
            <p className="font-bold text-[var(--lumea-navy)]">
              Où trouver le bon numéro ?
            </p>

            <ol className="mt-4 space-y-4 text-[16px] leading-7 text-[var(--lumea-blue-grey)]">
              <li className="flex gap-3">
                <span className="font-bold text-[var(--lumea-navy)]">
                  1.
                </span>

                <span>
                  {forRelative
                    ? "Prenez sa "
                    : "Prenez votre "}

                  <strong className="text-[var(--lumea-navy)]">
                    carte, attestation
                    ou contrat
                  </strong>
                  .
                </span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-[var(--lumea-navy)]">
                  2.
                </span>

                <span>
                  Cherchez{" "}
                  <strong className="text-[var(--lumea-navy)]">
                    Assistance,
                    Sinistre,
                    Urgence
                  </strong>{" "}
                  ou{" "}
                  <strong className="text-[var(--lumea-navy)]">
                    Nous contacter
                  </strong>
                  .
                </span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-[var(--lumea-navy)]">
                  3.
                </span>

                <span>
                  {providerCategory ===
                  "assurance"
                    ? forRelative
                      ? "Si son assurance a été souscrite auprès d’une banque, son conseiller bancaire peut vous donner le numéro du service assurance ou assistance."
                      : "Si votre assurance a été souscrite auprès d'une banque, votre conseiller peut vous donner le numéro du service assurance ou assistance."
                    : forRelative
                      ? "Le numéro correspondant à son contrat est très souvent indiqué sur sa carte de tiers payant."
                      : "Le numéro correspondant à votre contrat est très souvent indiqué sur votre carte de tiers payant."}
                </span>
              </li>
            </ol>
          </div>

          <button
            type="button"
            onClick={
              resetProvider
            }
            className="mt-5 text-sm font-semibold text-[var(--lumea-navy)] underline underline-offset-4"
          >
            Rechercher à nouveau
          </button>
        </div>
      ) : null}

      <PreparationChecklist
        recommendation={
          recommendation
        }
      />

      {!providerCategory &&
      genericOrganization?.phone ? (
        <div className="mt-6">
          <a
            href={`tel:${genericOrganization.phone.replace(
              /\s/g,
              ""
            )}`}
            className="flex min-h-[62px] w-full items-center justify-between gap-4 rounded-[16px] bg-[var(--lumea-gold)] px-5 py-4 text-[18px] font-bold text-[var(--lumea-navy)]"
          >
            <span>
              Appeler maintenant
            </span>

            <span>
              {
                genericOrganization.phone
              }
            </span>
          </a>
        </div>
      ) : null}

      {selectedProvider &&
      selectedProvider.contacts.length >
        0 ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-[var(--lumea-navy)]">
            Vous pouvez les appeler
          </h3>

          <div className="mt-4 space-y-3">
            {selectedProvider.contacts.map(
              (
                contact
              ) => (
                <a
                  key={`${contact.label}-${contact.phone}`}
                  href={`tel:${contact.phone.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="block rounded-[16px] border border-[var(--lumea-border)] bg-white px-5 py-4 transition hover:border-[var(--lumea-gold)]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-bold leading-6 text-[var(--lumea-navy)]">
                      {
                        contact.label
                      }
                    </span>

                    <span className="text-[18px] font-bold text-[var(--lumea-navy)]">
                      {
                        contact.phone
                      }
                    </span>
                  </div>

                  {contact.detail ? (
                    <p className="mt-2 text-sm leading-6 text-[var(--lumea-blue-grey)]">
                      {
                        contact.detail
                      }
                    </p>
                  ) : null}
                </a>
              )
            )}
          </div>
        </div>
      ) : null}

      {selectedProvider &&
      selectedProvider.contacts.length ===
        0 ? (
        <div className="mt-6 rounded-[18px] border border-[var(--lumea-border)] bg-white p-5">
          <p className="font-bold text-[var(--lumea-navy)]">
            Nous n&apos;affichons pas
            de numéro national pour
            cet organisme.
          </p>

          <p className="mt-2 text-[15px] leading-7 text-[var(--lumea-blue-grey)]">
            {forRelative
              ? "Les coordonnées varient selon le contrat. Regardez la carte, le contrat ou l’espace client de votre proche."
              : "Les coordonnées varient selon le contrat. Regardez votre carte, votre contrat ou votre espace client."}
          </p>
        </div>
      ) : null}

      {selectedProvider ? (
        <a
          href={
            selectedProvider.website
          }
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block min-h-11 font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] underline-offset-4"
        >
          Voir le site officiel ↗
        </a>
      ) : null}

      <div className="mt-7 border-t border-[var(--lumea-border)] pt-6">
        <h3 className="text-xl font-bold text-[var(--lumea-navy)]">
          Besoin d&apos;aide pour leur parler ?
        </h3>

        <button
          type="button"
          onClick={() =>
            openTemplate(
              "telephone"
            )
          }
          className="mt-4 flex min-h-[58px] w-full items-center justify-between rounded-[16px] border border-[var(--lumea-border)] bg-white px-5 py-3 text-left text-[17px] font-bold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
        >
          <span>
            Voir ce que je dois
            leur dire
          </span>

          <span aria-hidden="true">
            →
          </span>
        </button>
      </div>

      <div className="mt-6 border-t border-[var(--lumea-border)] pt-5">
        <p className="font-bold text-[var(--lumea-navy)]">
          Vous préférez écrire ?
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              openTemplate(
                "email"
              )
            }
            className="min-h-[58px] rounded-[16px] border border-[var(--lumea-border)] bg-white px-5 py-3 text-left font-semibold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
          >
            Préparer un mail
          </button>

          <button
            type="button"
            onClick={() =>
              openTemplate(
                "courrier"
              )
            }
            className="min-h-[58px] rounded-[16px] border border-[var(--lumea-border)] bg-white px-5 py-3 text-left font-semibold text-[var(--lumea-navy)] transition hover:border-[var(--lumea-gold)]"
          >
            Préparer un courrier
          </button>
        </div>
      </div>

      {activeTemplate ? (
        <div className="mt-7 border-t border-[var(--lumea-border)] pt-6">
          <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#946800]">
            {activeType ===
            "telephone"
              ? "Vous pouvez dire ceci"
              : activeType ===
                  "email"
                ? "Exemple de mail"
                : "Exemple de courrier"}
          </p>

          {activeTemplate.subject ? (
            <div className="mt-4 rounded-[16px] bg-white p-4">
              <p className="text-sm font-bold text-[var(--lumea-blue-grey)]">
                Objet
              </p>

              <p className="mt-1 text-[17px] font-semibold leading-7 text-[var(--lumea-navy)]">
                {
                  activeTemplate.subject
                }
              </p>
            </div>
          ) : null}

          <div className="mt-4 whitespace-pre-wrap rounded-[18px] bg-white p-5 text-[17px] leading-8 text-[var(--lumea-navy)] sm:p-6">
            {
              activeTemplate.content
            }
          </div>

          <button
            type="button"
            onClick={() =>
              copyTemplate(
                activeTemplate
              )
            }
            className="mt-4 min-h-[54px] rounded-full bg-[var(--lumea-navy)] px-6 py-3 font-bold text-white"
          >
            {copied
              ? "Texte copié ✓"
              : "Copier ce texte"}
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveType(
                null
              )
            }
            className="mt-5 block text-sm font-semibold text-[var(--lumea-blue-grey)] underline underline-offset-4"
          >
            Fermer cette aide
          </button>
        </div>
      ) : null}
    </section>
  );
}