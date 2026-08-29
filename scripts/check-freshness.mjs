import fs from "node:fs";

import path from "node:path";

/**
 * ============================================================
 * CONFIGURATION
 * ============================================================
 */

const root =
  process.cwd();

const dataRoot =
  path.join(
    root,
    "src",
    "data"
  );

const DAY =
  24 * 60 * 60 * 1000;

/**
 * Coordonnées administratives,
 * mutuelles, assurances, banques...
 */
const DEFAULT_REVIEW_DAYS =
  180;

/**
 * Au-delà d'un an sans contrôle,
 * on considère l'information comme
 * prioritaire à revérifier.
 */
const OUTDATED_DAYS =
  365;

/**
 * Les lignes d'écoute et d'urgence
 * sont volontairement contrôlées
 * plus souvent.
 */
const SUPPORT_LINE_REVIEW_DAYS =
  90;

/**
 * ============================================================
 * OUTILS
 * ============================================================
 */

function parseDate(
  value
) {
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

function ageInDays(
  value
) {
  const date =
    parseDate(
      value
    );

  if (!date) {
    return Infinity;
  }

  return Math.max(
    0,
    Math.floor(
      (
        Date.now() -
        date.getTime()
      ) /
        DAY
    )
  );
}

function statusForAge(
  days,
  reviewDays =
    DEFAULT_REVIEW_DAYS
) {
  if (
    !Number.isFinite(
      days
    )
  ) {
    return "⚠️ DATE INVALIDE";
  }

  if (
    days >=
    OUTDATED_DAYS
  ) {
    return "🔴 À REVÉRIFIER EN PRIORITÉ";
  }

  if (
    days >=
    reviewDays
  ) {
    return "🟠 À REVÉRIFIER";
  }

  return "🟢 OK";
}

function needsReview(
  days,
  reviewDays =
    DEFAULT_REVIEW_DAYS
) {
  return (
    !Number.isFinite(
      days
    ) ||
    days >=
      reviewDays
  );
}

function readJsonFile(
  filePath
) {
  if (
    !fs.existsSync(
      filePath
    )
  ) {
    return null;
  }

  try {
    return JSON.parse(
      fs.readFileSync(
        filePath,
        "utf8"
      )
    );
  } catch (
    error
  ) {
    console.error(
      `❌ Impossible de lire : ${filePath}`
    );

    console.error(
      error
    );

    return null;
  }
}

/**
 * Compteurs utilisés pour le
 * bilan final.
 */
let totalChecked =
  0;

let totalNeedsReview =
  0;

let totalPriority =
  0;

/**
 * ============================================================
 * TITRE
 * ============================================================
 */

console.log("");

console.log(
  "=========================================="
);

console.log(
  "  LUMÉA - CONTRÔLE DE FRAÎCHEUR"
);

console.log(
  "=========================================="
);

console.log("");

/**
 * ============================================================
 * SOURCES OFFICIELLES
 * ============================================================
 */

const sourcePath =
  path.join(
    dataRoot,
    "freshness",
    "official-sources.json"
  );

const sources =
  readJsonFile(
    sourcePath
  );

console.log(
  "SOURCES OFFICIELLES"
);

console.log(
  "------------------------------------------"
);

console.log("");

if (
  Array.isArray(
    sources
  )
) {
  const sortedSources =
    [...sources].sort(
      (
        a,
        b
      ) =>
        ageInDays(
          b.checkedAt
        ) -
        ageInDays(
          a.checkedAt
        )
    );

  for (
    const source of
      sortedSources
  ) {
    const age =
      ageInDays(
        source.checkedAt
      );

    const reviewDays =
      source.reviewEveryDays ??
      DEFAULT_REVIEW_DAYS;

    const status =
      statusForAge(
        age,
        reviewDays
      );

    totalChecked +=
      1;

    if (
      needsReview(
        age,
        reviewDays
      )
    ) {
      totalNeedsReview +=
        1;
    }

    if (
      age >=
      OUTDATED_DAYS
    ) {
      totalPriority +=
        1;
    }

    console.log(
      `${status}  ${source.label}`
    );

    console.log(
      `   Vérifié le : ${source.checkedAt}`
    );

    if (
      Number.isFinite(
        age
      )
    ) {
      console.log(
        `   Âge : ${age} jour${age > 1 ? "s" : ""}`
      );
    } else {
      console.log(
        "   Âge : impossible à calculer"
      );
    }

    console.log(
      `   Prochain contrôle conseillé : ${reviewDays} jours`
    );

    console.log("");
  }
} else {
  console.log(
    "⚠️ Aucun registre de sources officielles trouvé."
  );

  console.log("");
}

/**
 * ============================================================
 * MUTUELLES / ASSURANCES / BANQUES
 * ============================================================
 *
 * support-providers.ts utilise
 * actuellement une date commune :
 *
 * const checkedAt = "YYYY-MM-DD";
 *
 * Tous les organismes utilisant cette
 * constante sont donc considérés
 * comme vérifiés à cette date.
 */

console.log(
  "MUTUELLES / ASSURANCES / BANQUES"
);

console.log(
  "------------------------------------------"
);

console.log("");

const providersPath =
  path.join(
    dataRoot,
    "support-providers.ts"
  );

if (
  fs.existsSync(
    providersPath
  )
) {
  const providerContent =
    fs.readFileSync(
      providersPath,
      "utf8"
    );

  const providerDateMatch =
    providerContent.match(
      /const\s+checkedAt\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/
    );

  if (
    providerDateMatch
  ) {
    const providerDate =
      providerDateMatch[1];

    const providerAge =
      ageInDays(
        providerDate
      );

    const status =
      statusForAge(
        providerAge,
        DEFAULT_REVIEW_DAYS
      );

    totalChecked +=
      1;

    if (
      needsReview(
        providerAge,
        DEFAULT_REVIEW_DAYS
      )
    ) {
      totalNeedsReview +=
        1;
    }

    if (
      providerAge >=
      OUTDATED_DAYS
    ) {
      totalPriority +=
        1;
    }

    console.log(
      `${status}  Annuaire mutuelles / assurances / banques`
    );

    console.log(
      `   Vérifié le : ${providerDate}`
    );

    if (
      Number.isFinite(
        providerAge
      )
    ) {
      console.log(
        `   Âge : ${providerAge} jour${providerAge > 1 ? "s" : ""}`
      );
    }

    console.log(
      `   Prochain contrôle conseillé : ${DEFAULT_REVIEW_DAYS} jours`
    );

    console.log("");
  } else {
    totalNeedsReview +=
      1;

    console.log(
      "⚠️ Impossible de trouver la date globale checkedAt dans support-providers.ts."
    );

    console.log("");
  }
} else {
  totalNeedsReview +=
    1;

  console.log(
    "⚠️ Le fichier data/support-providers.ts est introuvable."
  );

  console.log("");
}

/**
 * ============================================================
 * LIGNES D'ÉCOUTE / URGENCE
 * ============================================================
 */

console.log(
  "LIGNES D'ÉCOUTE / URGENCE"
);

console.log(
  "------------------------------------------"
);

console.log("");

const supportLinesPath =
  path.join(
    dataRoot,
    "support-lines.json"
  );

const supportLines =
  readJsonFile(
    supportLinesPath
  );

if (
  Array.isArray(
    supportLines
  )
) {
  const sortedSupportLines =
    [...supportLines].sort(
      (
        a,
        b
      ) =>
        ageInDays(
          b.checkedAt
        ) -
        ageInDays(
          a.checkedAt
        )
    );

  for (
    const line of
      sortedSupportLines
  ) {
    const age =
      ageInDays(
        line.checkedAt
      );

    const reviewDays =
      line.reviewEveryDays ??
      SUPPORT_LINE_REVIEW_DAYS;

    const status =
      statusForAge(
        age,
        reviewDays
      );

    totalChecked +=
      1;

    if (
      needsReview(
        age,
        reviewDays
      )
    ) {
      totalNeedsReview +=
        1;
    }

    if (
      age >=
      OUTDATED_DAYS
    ) {
      totalPriority +=
        1;
    }

    console.log(
      `${status}  ${line.name}`
    );

    console.log(
      `   Numéro : ${line.phone}`
    );

    console.log(
      `   Vérifié le : ${line.checkedAt}`
    );

    if (
      Number.isFinite(
        age
      )
    ) {
      console.log(
        `   Âge : ${age} jour${age > 1 ? "s" : ""}`
      );
    }

    console.log(
      `   Prochain contrôle conseillé : ${reviewDays} jours`
    );

    console.log("");
  }
} else {
  totalNeedsReview +=
    1;

  console.log(
    "⚠️ Aucun fichier de lignes d'écoute / urgence trouvé."
  );

  console.log("");
}

/**
 * ============================================================
 * BILAN
 * ============================================================
 */

console.log(
  "=========================================="
);

console.log(
  "  BILAN"
);

console.log(
  "=========================================="
);

console.log("");

console.log(
  `${totalChecked} groupe(s) ou source(s) contrôlé(s).`
);

if (
  totalPriority >
  0
) {
  console.log("");

  console.log(
    `🔴 ${totalPriority} élément(s) à revérifier en priorité.`
  );
}

if (
  totalNeedsReview >
  0
) {
  console.log("");

  console.log(
    `🟠 ${totalNeedsReview} élément(s) nécessitent une vérification.`
  );
} else {
  console.log("");

  console.log(
    "✅ Rien à revérifier pour le moment."
  );
}

console.log("");

console.log(
  "Règles actuelles :"
);

console.log(
  `- Sources / organismes : contrôle conseillé tous les ${DEFAULT_REVIEW_DAYS} jours`
);

console.log(
  `- Écoute / urgence : contrôle conseillé tous les ${SUPPORT_LINE_REVIEW_DAYS} jours`
);

console.log(
  `- Prioritaire à partir de ${OUTDATED_DAYS} jours sans vérification`
);

console.log("");

console.log(
  "=========================================="
);

console.log("");