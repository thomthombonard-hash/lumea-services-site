import officialSources from "@/data/freshness/official-sources.json";

import type {
  SupportProvider,
} from "@/data/support-providers";

import type {
  Recommendation,
} from "@/lib/orientation/types";

export type FreshnessLevel =
  | "fresh"
  | "review"
  | "outdated";

export interface FreshnessCheck {
  id: string;

  label: string;

  checkedAt: string;

  ageDays: number;

  reviewEveryDays: number;

  type:
    | "official-source"
    | "provider";

  level:
    FreshnessLevel;
}

export interface FreshnessReport {
  level:
    FreshnessLevel;

  checks:
    FreshnessCheck[];

  oldestCheckedAt?: string;

  oldestAgeDays?: number;

  needsReviewCount: number;

  outdatedCount: number;

  missingSourceIds:
    string[];
}

const DEFAULT_REVIEW_DAYS =
  180;

const OUTDATED_AFTER_DAYS =
  365;

const DAY_IN_MS =
  24 * 60 * 60 * 1000;

function parseCheckedDate(
  value: string
): Date | null {
  const date =
    new Date(
      `${value}T12:00:00Z`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
}

export function getAgeInDays(
  checkedAt: string,
  now: Date = new Date()
): number {
  const checkedDate =
    parseCheckedDate(
      checkedAt
    );

  if (!checkedDate) {
    return Number.POSITIVE_INFINITY;
  }

  const difference =
    now.getTime() -
    checkedDate.getTime();

  return Math.max(
    0,
    Math.floor(
      difference /
        DAY_IN_MS
    )
  );
}

export function getFreshnessLevel(
  checkedAt: string,
  reviewEveryDays =
    DEFAULT_REVIEW_DAYS,
  now: Date = new Date()
): FreshnessLevel {
  const ageDays =
    getAgeInDays(
      checkedAt,
      now
    );

  if (
    ageDays >=
    OUTDATED_AFTER_DAYS
  ) {
    return "outdated";
  }

  if (
    ageDays >=
    reviewEveryDays
  ) {
    return "review";
  }

  return "fresh";
}

export function buildFreshnessReport(
  recommendations:
    Recommendation[],
  providers:
    SupportProvider[],
  now: Date = new Date()
): FreshnessReport {
  const sourceIds =
    Array.from(
      new Set(
        recommendations.flatMap(
          (
            recommendation
          ) =>
            recommendation.sourceIds ??
            []
        )
      )
    );

  const checks:
    FreshnessCheck[] = [];

  const missingSourceIds:
    string[] = [];

  for (
    const sourceId of sourceIds
  ) {
    const source =
      officialSources.find(
        (
          item
        ) =>
          item.id ===
          sourceId
      );

    if (!source) {
      missingSourceIds.push(
        sourceId
      );

      continue;
    }

    const ageDays =
      getAgeInDays(
        source.checkedAt,
        now
      );

    checks.push({
      id:
        source.id,

      label:
        source.label,

      checkedAt:
        source.checkedAt,

      ageDays,

      reviewEveryDays:
        source.reviewEveryDays,

      type:
        "official-source",

      level:
        getFreshnessLevel(
          source.checkedAt,
          source.reviewEveryDays,
          now
        ),
    });
  }

  const uniqueProviders =
    Array.from(
      new Map(
        providers.map(
          (
            provider
          ) => [
            provider.id,
            provider,
          ]
        )
      ).values()
    );

  for (
    const provider of
      uniqueProviders
  ) {
    if (
      !provider.checkedAt
    ) {
      continue;
    }

    const ageDays =
      getAgeInDays(
        provider.checkedAt,
        now
      );

    checks.push({
      id:
        `provider-${provider.id}`,

      label:
        provider.name,

      checkedAt:
        provider.checkedAt,

      ageDays,

      reviewEveryDays:
        DEFAULT_REVIEW_DAYS,

      type:
        "provider",

      level:
        getFreshnessLevel(
          provider.checkedAt,
          DEFAULT_REVIEW_DAYS,
          now
        ),
    });
  }

  const sortedChecks =
    [...checks].sort(
      (
        a,
        b
      ) =>
        b.ageDays -
        a.ageDays
    );

  const oldest =
    sortedChecks[0];

  const outdatedCount =
    checks.filter(
      (
        check
      ) =>
        check.level ===
        "outdated"
    ).length;

  const checksNeedingReview =
    checks.filter(
      (
        check
      ) =>
        check.level ===
        "review"
    ).length;

  /**
   * Une source utilisée mais absente du registre de fraîcheur
   * ne doit jamais permettre d'afficher « Informations vérifiées ».
   */
  const needsReviewCount =
    checksNeedingReview +
    missingSourceIds.length;

  const level:
    FreshnessLevel =
    outdatedCount > 0
      ? "outdated"
      : needsReviewCount > 0
        ? "review"
        : "fresh";

  return {
    level,

    checks,

    oldestCheckedAt:
      oldest?.checkedAt,

    oldestAgeDays:
      oldest?.ageDays,

    needsReviewCount,

    outdatedCount,

    missingSourceIds,
  };
}