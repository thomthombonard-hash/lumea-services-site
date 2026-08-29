"use client";

import {
  getOrganizationById,
} from "@/data/organisations";

import {
  adaptTextForAudience,
} from "@/lib/orientation/audience-language";

import {
  useOrientationAudience,
} from "@/lib/orientation/audience-context";

import type {
  Recommendation,
} from "@/lib/orientation/types";

import GlossaryText from "./GlossaryText";

interface RecommendationCardProps {
  recommendation:
    Recommendation;

  primary?: boolean;
}

export default function RecommendationCard({
  recommendation,
  primary = false,
}: RecommendationCardProps) {
  const audience =
    useOrientationAudience();

  const organization =
    recommendation.organizationId
      ? getOrganizationById(
          recommendation.organizationId
        )
      : undefined;

  const requiresProviderSelection =
    recommendation.organizationType ===
      "mutuelle" ||
    recommendation.organizationType ===
      "assurance";

  const hasUsefulContactDetails =
    !requiresProviderSelection &&
    Boolean(
      organization?.phone ||
        organization?.email ||
        organization?.address ||
        organization?.website
    );

  const title =
    adaptTextForAudience(
      recommendation.title,
      audience
    );

  const why =
    adaptTextForAudience(
      recommendation.why,
      audience
    );

  return (
    <article
      className={`bg-white ${
        primary
          ? "rounded-[28px] border-2 border-[var(--lumea-gold)] p-6 shadow-[0_16px_45px_rgba(13,35,68,0.06)] sm:p-8"
          : "rounded-[22px] border border-[var(--lumea-border)] p-5 sm:p-6"
      }`}
    >
      {primary ? (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--lumea-gold)] text-xl font-bold text-[var(--lumea-navy)]">
            1
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--lumea-navy)]">
            Commencez ici
          </p>
        </div>
      ) : null}

      <h2
        className={`font-bold leading-[1.25] text-[var(--lumea-navy)] ${
          primary
            ? "mt-6 text-[1.8rem] sm:text-[2rem]"
            : "text-xl sm:text-2xl"
        }`}
      >
        <GlossaryText
          text={title}
        />
      </h2>

      <div className="mt-6">
        <p className="text-base font-bold text-[var(--lumea-navy)]">
          Pourquoi ?
        </p>

        <p className="mt-2 max-w-[680px] text-[17px] leading-8 text-[var(--lumea-blue-grey)]">
          <GlossaryText
            text={why}
          />
        </p>
      </div>

      {hasUsefulContactDetails ? (
        <div className="mt-6 border-t border-[var(--lumea-border)] pt-5">
          <p className="font-bold text-[var(--lumea-navy)]">
            Coordonnées
          </p>

          <div className="mt-3 space-y-3 text-[17px] leading-7 text-[var(--lumea-blue-grey)]">
            {organization?.phone ? (
              <p>
                <a
                  href={`tel:${organization.phone.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="font-bold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] decoration-2 underline-offset-4"
                >
                  {
                    organization.phone
                  }
                </a>
              </p>
            ) : null}

            {organization?.address ? (
              <p>
                {
                  organization.address
                }
              </p>
            ) : null}

            {organization?.email ? (
              <p>
                <a
                  href={`mailto:${organization.email}`}
                  className="break-all font-semibold text-[var(--lumea-navy)] underline decoration-[var(--lumea-gold)] underline-offset-4"
                >
                  {
                    organization.email
                  }
                </a>
              </p>
            ) : null}
          </div>

          {organization?.website ? (
            <div className="mt-5">
              <a
                href={
                  organization.website
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[var(--lumea-blue-grey)] underline decoration-[var(--lumea-gold)] underline-offset-4"
              >
                Voir le site officiel ↗
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}