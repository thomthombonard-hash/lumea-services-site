const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "../../src");

/**
 * Petit chargeur TypeScript réservé aux tests.
 * Il permet d'exécuter les vraies fonctions du projet sans
 * ajouter de dépendance supplémentaire comme tsx ou ts-node.
 */
const originalResolveFilename =
  Module._resolveFilename;

Module._resolveFilename = function (
  request,
  parent,
  isMain,
  options
) {
  if (request.startsWith("@/")) {
    const base = path.join(
      ROOT,
      request.slice(2)
    );

    const candidates = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      `${base}.json`,
      path.join(base, "index.ts"),
      path.join(base, "index.tsx"),
    ];

    for (const candidate of candidates) {
      if (
        fs.existsSync(candidate) &&
        fs.statSync(candidate).isFile()
      ) {
        return candidate;
      }
    }
  }

  return originalResolveFilename.call(
    this,
    request,
    parent,
    isMain,
    options
  );
};

for (const extension of [
  ".ts",
  ".tsx",
]) {
  require.extensions[extension] =
    function transpile(
      module,
      filename
    ) {
      const source =
        fs.readFileSync(
          filename,
          "utf8"
        );

      const output =
        ts.transpileModule(
          source,
          {
            compilerOptions: {
              module:
                ts.ModuleKind.CommonJS,
              target:
                ts.ScriptTarget.ES2020,
              jsx:
                ts.JsxEmit.ReactJSX,
              esModuleInterop:
                true,
              resolveJsonModule:
                true,
              moduleResolution:
                ts.ModuleResolutionKind.Node10,
            },
            fileName:
              filename,
          }
        ).outputText;

      module._compile(
        output,
        filename
      );
    };
}

const {
  recommendations,
  calculateRecommendations,
} = require(
  path.join(
    ROOT,
    "data/recommendations/index.ts"
  )
);

const {
  organizations,
} = require(
  path.join(
    ROOT,
    "data/organisations/index.ts"
  )
);

const {
  officialSources,
} = require(
  path.join(
    ROOT,
    "data/sources/index.ts"
  )
);

const {
  supportProviders,
  providerMatchesSearch,
} = require(
  path.join(
    ROOT,
    "data/support-providers.ts"
  )
);

const {
  localCommunes,
} = require(
  path.join(
    ROOT,
    "data/local/communes.ts"
  )
);

const {
  clic49CommuneMappings,
  getClic49IdByCommuneCode,
} = require(
  path.join(
    ROOT,
    "data/local/clic49-map.ts"
  )
);

const {
  sartheAutonomieCommuneMappings,
  getSartheAutonomieIdByCommuneCode,
} = require(
  path.join(
    ROOT,
    "data/local/sarthe-autonomie-map.ts"
  )
);

const {
  mayenneLocalMappings,
  getMayenneOrganizationIdsByCommuneCode,
} = require(
  path.join(
    ROOT,
    "data/local/mayenne-local-map.ts"
  )
);

const {
  getLocalRecommendations,
} = require(
  path.join(
    ROOT,
    "lib/orientation/local-routing.ts"
  )
);

const {
  getNextQuestionId,
  isOrientationComplete,
} = require(
  path.join(
    ROOT,
    "lib/orientation/engine.ts"
  )
);

const {
  getCommunesFromPostalCode,
  getDepartmentFromPostalCode,
} = require(
  path.join(
    ROOT,
    "lib/orientation/helpers.ts"
  )
);

const {
  adaptRequestForAudience,
} = require(
  path.join(
    ROOT,
    "lib/orientation/audience-language.ts"
  )
);

const {
  getTemplatesForRecommendation,
} = require(
  path.join(
    ROOT,
    "data/templates/index.ts"
  )
);

const {
  getFreshnessLevel,
  buildFreshnessReport,
} = require(
  path.join(
    ROOT,
    "lib/orientation/freshness.ts"
  )
);

const {
  glossaryEntries,
  findGlossaryEntry,
} = require(
  path.join(
    ROOT,
    "data/glossary.ts"
  )
);

const freshnessSources =
  JSON.parse(
    fs.readFileSync(
      path.join(
        ROOT,
        "data/freshness/official-sources.json"
      ),
      "utf8"
    )
  );

const supportLines =
  JSON.parse(
    fs.readFileSync(
      path.join(
        ROOT,
        "data/support-lines.json"
      ),
      "utf8"
    )
  );

let passed = 0;

function test(
  name,
  callback
) {
  try {
    callback();
    passed += 1;
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}`);
    throw error;
  }
}

function duplicates(
  array,
  getKey
) {
  const counts =
    new Map();

  for (const item of array) {
    const key =
      getKey(item);

    counts.set(
      key,
      (counts.get(key) ?? 0) + 1
    );
  }

  return [...counts.entries()]
    .filter(([, count]) =>
      count > 1
    )
    .map(([key]) => key);
}

function findCommune(
  name,
  department
) {
  const commune =
    localCommunes.find(
      (item) =>
        item.name === name &&
        item.department === department
    );

  assert.ok(
    commune,
    `Commune introuvable : ${name} (${department})`
  );

  return commune;
}

function finalRecommendations(
  answers
) {
  const local =
    getLocalRecommendations(
      answers
    );

  let general =
    calculateRecommendations(
      answers
    );

  if (
    answers.department === "72" &&
    local.some(
      (recommendation) =>
        recommendation.organizationType ===
        "departement"
    )
  ) {
    general =
      general.filter(
        (recommendation) =>
          recommendation.id !==
            "autonomie-sarthe" &&
          recommendation.id !==
            "handicap-sarthe"
      );
  }

  if (
    answers.department === "53" &&
    local.some(
      (recommendation) =>
        recommendation.organizationId?.startsWith(
          "mayenne-local-"
        )
    )
  ) {
    general =
      general.filter(
        (recommendation) =>
          recommendation.id !==
            "autonomie-mayenne" &&
          recommendation.id !==
            "handicap-mayenne"
      );
  }

  return [
    ...local,
    ...general,
  ].filter(
    (
      recommendation,
      index,
      array
    ) =>
      array.findIndex(
        (item) =>
          item.id ===
          recommendation.id
      ) === index
  );
}

console.log("");
console.log("==========================================");
console.log("  LUMÉA - TESTS D'ORIENTATION");
console.log("==========================================");
console.log("");

test(
  "768 communes sont embarquées",
  () => {
    assert.equal(
      localCommunes.length,
      768
    );

    const counts = {
      "49": 0,
      "53": 0,
      "72": 0,
    };

    for (const commune of localCommunes) {
      counts[
        commune.department
      ] += 1;
    }

    assert.deepEqual(
      counts,
      {
        "49": 176,
        "53": 240,
        "72": 352,
      }
    );
  }
);

test(
  "les codes INSEE sont uniques et les codes postaux sont cohérents",
  () => {
    assert.deepEqual(
      duplicates(
        localCommunes,
        (commune) =>
          commune.code
      ),
      []
    );

    for (const commune of localCommunes) {
      for (const postalCode of commune.postalCodes) {
        assert.match(
          postalCode,
          /^\d{5}$/
        );

        assert.equal(
          getDepartmentFromPostalCode(
            postalCode
          ),
          commune.department
        );

        assert.ok(
          getCommunesFromPostalCode(
            postalCode
          ).some(
            (found) =>
              found.code ===
              commune.code
          )
        );
      }
    }
  }
);

test(
  "toutes les communes sont routées vers leur interlocuteur territorial",
  () => {
    for (const commune of localCommunes) {
      if (
        commune.department ===
        "49"
      ) {
        assert.ok(
          getClic49IdByCommuneCode(
            commune.code
          )
        );
      }

      if (
        commune.department ===
        "72"
      ) {
        assert.ok(
          getSartheAutonomieIdByCommuneCode(
            commune.code
          )
        );
      }

      if (
        commune.department ===
        "53"
      ) {
        assert.ok(
          getMayenneOrganizationIdsByCommuneCode(
            commune.code
          ).length > 0
        );
      }
    }
  }
);

test(
  "les routages territoriaux connus restent corrects",
  () => {
    assert.equal(
      getClic49IdByCommuneCode(
        findCommune(
          "Les Cerqueux",
          "49"
        ).code
      ),
      "clic49-igeac"
    );

    assert.equal(
      getSartheAutonomieIdByCommuneCode(
        findCommune(
          "Bazouges Cré sur Loir",
          "72"
        ).code
      ),
      "sarthe-autonomie-la-fleche"
    );

    assert.equal(
      getSartheAutonomieIdByCommuneCode(
        findCommune(
          "La Chapelle-du-Bois",
          "72"
        ).code
      ),
      "sarthe-autonomie-la-ferte-bernard"
    );

    assert.equal(
      getSartheAutonomieIdByCommuneCode(
        findCommune(
          "Villeneuve-en-Perseigne",
          "72"
        ).code
      ),
      "sarthe-autonomie-mamers"
    );

    assert.equal(
      getSartheAutonomieIdByCommuneCode(
        findCommune(
          "Tuffé Val de la Chéronne",
          "72"
        ).code
      ),
      "sarthe-autonomie-la-ferte-bernard"
    );

    assert.deepEqual(
      getMayenneOrganizationIdsByCommuneCode(
        findCommune(
          "Laval",
          "53"
        ).code
      ),
      [
        "mayenne-local-pommeraies-laval",
        "mayenne-local-ambroise-pare-laval",
        "mayenne-local-saint-nicolas-laval",
      ]
    );
  }
);

test(
  "aucun identifiant de recommandation, organisme ou prestataire n'est dupliqué",
  () => {
    assert.deepEqual(
      duplicates(
        recommendations,
        (item) => item.id
      ),
      []
    );

    assert.deepEqual(
      duplicates(
        organizations,
        (item) => item.id
      ),
      []
    );

    assert.deepEqual(
      duplicates(
        supportProviders,
        (item) => item.id
      ),
      []
    );
  }
);

test(
  "toutes les recommandations pointent vers des organismes existants",
  () => {
    const organizationIds =
      new Set(
        organizations.map(
          (item) => item.id
        )
      );

    for (const recommendation of recommendations) {
      if (
        recommendation.organizationId
      ) {
        assert.ok(
          organizationIds.has(
            recommendation.organizationId
          ),
          `${recommendation.id} -> ${recommendation.organizationId}`
        );
      }
    }

    const mappedOrganizationIds = [
      ...clic49CommuneMappings.map(
        (item) => item.clicId
      ),
      ...sartheAutonomieCommuneMappings.map(
        (item) => item.organizationId
      ),
      ...mayenneLocalMappings.flatMap(
        (item) => item.organizationIds
      ),
    ];

    for (const organizationId of mappedOrganizationIds) {
      assert.ok(
        organizationIds.has(
          organizationId
        ),
        `Routage vers organisme absent : ${organizationId}`
      );
    }
  }
);

test(
  "toutes les sources utilisées sont enregistrées et suivies",
  () => {
    const sourceRegistry =
      new Set(
        officialSources.map(
          (source) => source.id
        )
      );

    const freshnessRegistry =
      new Set(
        freshnessSources.map(
          (source) => source.id
        )
      );

    for (const recommendation of recommendations) {
      for (const sourceId of recommendation.sourceIds) {
        assert.ok(
          sourceRegistry.has(
            sourceId
          ),
          `Source officielle absente : ${sourceId}`
        );

        assert.ok(
          freshnessRegistry.has(
            sourceId
          ),
          `Source non suivie : ${sourceId}`
        );
      }
    }
  }
);

test(
  "les parcours de questions suivent les branches prévues",
  () => {
    function sequence(
      situation,
      ageGroup = "75-plus"
    ) {
      const answers = {};
      const result = [];

      while (true) {
        const questionId =
          getNextQuestionId(
            answers
          );

        if (!questionId) {
          break;
        }

        result.push(
          questionId
        );

        switch (questionId) {
          case "need":
            answers.need =
              "menage";
            break;
          case "situation":
            answers.situation =
              situation;
            break;
          case "ageGroup":
            answers.ageGroup =
              ageGroup;
            break;
          case "isRetired":
            answers.isRetired =
              true;
            break;
          case "hasMutuelle":
            answers.hasMutuelle =
              true;
            break;
          case "hasHomeInsurance":
            answers.hasHomeInsurance =
              true;
            break;
        }
      }

      return result;
    }

    assert.deepEqual(
      sequence(
        "retour-hospitalisation"
      ),
      [
        "need",
        "situation",
        "ageGroup",
        "isRetired",
        "hasMutuelle",
      ]
    );

    assert.deepEqual(
      sequence(
        "perte-autonomie"
      ),
      [
        "need",
        "situation",
        "ageGroup",
        "isRetired",
      ]
    );

    assert.deepEqual(
      sequence(
        "handicap"
      ),
      [
        "need",
        "situation",
        "ageGroup",
      ]
    );

    assert.deepEqual(
      sequence(
        "accident-immobilisation"
      ),
      [
        "need",
        "situation",
        "isRetired",
        "hasMutuelle",
      ]
    );

    assert.deepEqual(
      sequence(
        "demenagement"
      ),
      [
        "need",
        "situation",
        "isRetired",
        "hasHomeInsurance",
      ]
    );

    assert.deepEqual(
      sequence(
        "sinistre"
      ),
      [
        "need",
        "situation",
        "hasHomeInsurance",
      ]
    );

    assert.deepEqual(
      sequence(
        "deces-proche"
      ),
      [
        "need",
        "situation",
        "isRetired",
        "hasMutuelle",
      ]
    );

    assert.deepEqual(
      sequence(
        "besoin-regulier",
        "moins-60"
      ),
      [
        "need",
        "situation",
        "ageGroup",
      ]
    );
  }
);

test(
  "19 440 combinaisons de réponses produisent un résultat exploitable",
  () => {
    const needs = [
      "menage",
      "transport",
      "courses",
      "repas",
      "aide-quotidien",
      "inconnu",
    ];

    const situations = [
      "retour-hospitalisation",
      "perte-autonomie",
      "handicap",
      "accident-immobilisation",
      "demenagement",
      "sinistre",
      "deces-proche",
      "difficulte-temporaire",
      "besoin-regulier",
      "inconnue",
    ];

    const ages = [
      "moins-60",
      "60-74",
      "75-plus",
      "inconnu",
    ];

    const booleans = [
      true,
      false,
      null,
    ];

    const sampleCommunes = {
      "72": localCommunes.find(
        (item) =>
          item.department === "72"
      ),
      "49": localCommunes.find(
        (item) =>
          item.department === "49"
      ),
      "53": localCommunes.find(
        (item) =>
          item.department === "53"
      ),
    };

    let caseCount = 0;

    for (const department of [
      "72",
      "49",
      "53",
    ]) {
      const commune =
        sampleCommunes[
          department
        ];

      assert.ok(commune);

      for (const need of needs) {
        for (const situation of situations) {
          for (const ageGroup of ages) {
            for (const isRetired of booleans) {
              for (const hasMutuelle of booleans) {
                for (const hasHomeInsurance of booleans) {
                  const answers = {
                    need,
                    situation,
                    postalCode:
                      commune.postalCodes[0],
                    department,
                    communeCode:
                      commune.code,
                    communeName:
                      commune.name,
                    ageGroup,
                    isRetired,
                    hasMutuelle,
                    hasHomeInsurance,
                  };

                  caseCount += 1;

                  assert.equal(
                    isOrientationComplete(
                      answers
                    ),
                    true
                  );

                  const result =
                    finalRecommendations(
                      answers
                    );

                  assert.ok(
                    result.length > 0,
                    JSON.stringify(
                      answers
                    )
                  );

                  assert.equal(
                    new Set(
                      result.map(
                        (item) => item.id
                      )
                    ).size,
                    result.length,
                    "Doublon dans le résultat"
                  );
                }
              }
            }
          }
        }
      }
    }

    assert.equal(
      caseCount,
      19440
    );
  }
);

test(
  "les parcours autonomie/handicap trouvent un relais local partout où prévu",
  () => {
    for (const commune of localCommunes) {
      const situations =
        commune.department === "49"
          ? ["perte-autonomie"]
          : [
              "perte-autonomie",
              "handicap",
            ];

      for (const situation of situations) {
        const local =
          getLocalRecommendations({
            need: "menage",
            situation,
            postalCode:
              commune.postalCodes[0],
            department:
              commune.department,
            communeCode:
              commune.code,
            communeName:
              commune.name,
            ageGroup:
              "75-plus",
            isRetired:
              true,
          });

        assert.ok(
          local.length > 0,
          `${commune.name} (${commune.department}) - ${situation}`
        );
      }
    }
  }
);

test(
  "la recherche mutuelle/assurance retrouve chaque nom et chaque alias",
  () => {
    for (const provider of supportProviders) {
      assert.equal(
        providerMatchesSearch(
          provider,
          provider.name
        ),
        true
      );

      for (const alias of provider.aliases) {
        assert.equal(
          providerMatchesSearch(
            provider,
            alias
          ),
          true,
          `${provider.name} / ${alias}`
        );
      }

      assert.match(
        provider.website,
        /^https:\/\//
      );

      assert.match(
        provider.checkedAt,
        /^\d{4}-\d{2}-\d{2}$/
      );
    }
  }
);

test(
  "le parcours « proche » ne laisse plus de formulation à la première personne pour la personne aidée",
  () => {
    const forbidden =
      /\b(Je rentre|Je vais rentrer|J'ai besoin|Je rencontre|J'habite|ma situation|mon logement|ma commune|mes besoins|mes déplacements|mon contrat|ma caisse de retraite|mon quotidien)\b/i;

    for (const recommendation of recommendations) {
      if (!recommendation.whatToAsk) {
        continue;
      }

      const adapted =
        adaptRequestForAudience(
          recommendation.whatToAsk,
          "relative"
        );

      assert.equal(
        forbidden.test(adapted),
        false,
        `${recommendation.id}: ${adapted}`
      );

      const templates =
        getTemplatesForRecommendation(
          recommendation,
          "Organisme Test",
          "La Flèche",
          "relative"
        );

      for (const template of templates) {
        assert.equal(
          forbidden.test(
            template.content
          ),
          false,
          `${recommendation.id}/${template.type}`
        );
      }
    }

    const seen =
      new Set();

    for (const commune of localCommunes) {
      const answers = {
        need: "menage",
        situation:
          "perte-autonomie",
        postalCode:
          commune.postalCodes[0],
        department:
          commune.department,
        communeCode:
          commune.code,
        communeName:
          commune.name,
        ageGroup:
          "75-plus",
        isRetired:
          true,
      };

      for (const recommendation of getLocalRecommendations(
        answers
      )) {
        if (
          seen.has(
            recommendation.id
          )
        ) {
          continue;
        }

        seen.add(
          recommendation.id
        );

        const adapted =
          adaptRequestForAudience(
            recommendation.whatToAsk ?? "",
            "relative"
          );

        assert.equal(
          forbidden.test(adapted),
          false,
          `${recommendation.id}: ${adapted}`
        );
      }
    }
  }
);

test(
  "le système de fraîcheur bascule aux seuils prévus et refuse une source non suivie",
  () => {
    const now =
      new Date(
        "2026-08-29T12:00:00Z"
      );

    function daysAgo(
      days
    ) {
      const date =
        new Date(now);

      date.setUTCDate(
        date.getUTCDate() -
          days
      );

      return date
        .toISOString()
        .slice(0, 10);
    }

    assert.equal(
      getFreshnessLevel(
        daysAgo(179),
        180,
        now
      ),
      "fresh"
    );

    assert.equal(
      getFreshnessLevel(
        daysAgo(180),
        180,
        now
      ),
      "review"
    );

    assert.equal(
      getFreshnessLevel(
        daysAgo(365),
        180,
        now
      ),
      "outdated"
    );

    const missingReport =
      buildFreshnessReport(
        [
          {
            id: "test",
            title: "Test",
            organizationType:
              "autre",
            priority:
              "primary",
            why: "Test",
            sourceIds: [
              "source-absente",
            ],
          },
        ],
        [],
        now
      );

    assert.equal(
      missingReport.level,
      "review"
    );

    assert.deepEqual(
      missingReport.missingSourceIds,
      ["source-absente"]
    );
  }
);

test(
  "les numéros d'écoute et d'urgence essentiels sont présents",
  () => {
    const byId =
      new Map(
        supportLines.map(
          (line) => [
            line.id,
            line,
          ]
        )
      );

    assert.equal(
      byId.get(
        "croix-rouge-ecoute"
      )?.phone,
      "0 800 858 858"
    );

    assert.equal(
      byId.get("3114")?.phone,
      "3114"
    );

    assert.equal(
      byId.get("samu")?.phone,
      "15"
    );

    assert.equal(
      byId.get("112")?.phone,
      "112"
    );
  }
);

test(
  "aucune réponse du questionnaire n'est envoyée ou stockée par le code exécuté dans le navigateur",
  () => {
    const folders = [
      "app/qui-peut-maider",
      "components/orientation",
      "lib/orientation",
      "data",
    ];

    const forbiddenPatterns = [
      ["fetch", /\bfetch\s*\(/],
      ["XMLHttpRequest", /XMLHttpRequest/],
      ["localStorage", /localStorage/],
      ["sessionStorage", /sessionStorage/],
      ["cookies", /document\.cookie|\bcookies\s*\(/],
      ["sendBeacon", /sendBeacon/],
      ["WebSocket", /\bWebSocket\b/],
      ["IndexedDB", /indexedDB/],
      ["URLSearchParams", /URLSearchParams|searchParams/],
    ];

    function walk(
      directory
    ) {
      for (const entry of fs.readdirSync(
        directory,
        {
          withFileTypes: true,
        }
      )) {
        const fullPath =
          path.join(
            directory,
            entry.name
          );

        if (entry.isDirectory()) {
          walk(fullPath);
          continue;
        }

        if (
          !/\.(ts|tsx|js|jsx)$/.test(
            entry.name
          )
        ) {
          continue;
        }

        const source =
          fs.readFileSync(
            fullPath,
            "utf8"
          );

        for (const [
          label,
          pattern,
        ] of forbiddenPatterns) {
          assert.equal(
            pattern.test(source),
            false,
            `${label} trouvé dans ${path.relative(ROOT, fullPath)}`
          );
        }
      }
    }

    for (const folder of folders) {
      walk(
        path.join(
          ROOT,
          folder
        )
      );
    }
  }
);

test(
  "le glossaire explique les principaux sigles administratifs sans doublon",
  () => {
    const requiredTerms = [
      "APA",
      "PCH",
      "CLIC",
      "MDPH",
      "CCAS",
      "CIAS",
      "Carsat",
      "CPAM",
    ];

    assert.deepEqual(
      duplicates(
        glossaryEntries,
        (entry) =>
          entry.id
      ),
      []
    );

    for (const term of requiredTerms) {
      const entry =
        findGlossaryEntry(
          term
        );

      assert.ok(
        entry,
        `Définition absente pour ${term}`
      );

      assert.ok(
        entry.fullName.length > 4,
        `Nom complet trop court pour ${term}`
      );

      assert.ok(
        entry.definition.length > 25,
        `Définition trop courte pour ${term}`
      );
    }

    assert.equal(
      findGlossaryEntry(
        "carsat"
      )?.id,
      "carsat"
    );
  }
);

test(
  "les fondamentaux d'accessibilité et de langue sont présents",
  () => {
    const layout =
      fs.readFileSync(
        path.join(
          ROOT,
          "app/layout.tsx"
        ),
        "utf8"
      );

    const css =
      fs.readFileSync(
        path.join(
          ROOT,
          "app/globals.css"
        ),
        "utf8"
      );

    const choice =
      fs.readFileSync(
        path.join(
          ROOT,
          "components/orientation/ChoiceButton.tsx"
        ),
        "utf8"
      );

    assert.match(
      layout,
      /<html lang="fr"/
    );

    assert.doesNotMatch(
      layout,
      /Create Next App/
    );

    assert.match(
      css,
      /prefers-reduced-motion/
    );

    assert.match(
      css,
      /--lumea-blue-grey:\s*#586b82/
    );

    assert.match(
      css,
      /\.lumea-button-primary[\s\S]*?color:\s*var\(--lumea-navy\)/
    );

    assert.doesNotMatch(
      choice,
      /focus:outline-none/
    );
  }
);

test(
  "l’outil est correctement raccordé au site Luméa",
  () => {
    const route =
      fs.readFileSync(
        path.join(
          ROOT,
          "app/qui-peut-maider/page.tsx"
        ),
        "utf8"
      );

    const header =
      fs.readFileSync(
        path.join(
          ROOT,
          "app/Header.tsx"
        ),
        "utf8"
      );

    const home =
      fs.readFileSync(
        path.join(
          ROOT,
          "app/page.tsx"
        ),
        "utf8"
      );

    const floatingActions =
      fs.readFileSync(
        path.join(
          ROOT,
          "components/GlobalFloatingActions.tsx"
        ),
        "utf8"
      );

    assert.match(
      route,
      /OrientationTool/
    );

    assert.match(
      header,
      /href="\/qui-peut-maider"/
    );

    assert.match(
      home,
      /href="\/qui-peut-maider"/
    );

    assert.match(
      floatingActions,
      /pathname === "\/qui-peut-maider"/
    );
  }
);

test(
  "tous les fichiers TypeScript/TSX de l'application sont syntaxiquement valides",
  () => {
    const failures = [];

    function walk(
      directory
    ) {
      for (const entry of fs.readdirSync(
        directory,
        {
          withFileTypes: true,
        }
      )) {
        if (
          entry.name === ".git" ||
          entry.name === "node_modules" ||
          entry.name === ".next"
        ) {
          continue;
        }

        const fullPath =
          path.join(
            directory,
            entry.name
          );

        if (entry.isDirectory()) {
          walk(fullPath);
          continue;
        }

        if (
          !/\.(ts|tsx)$/.test(
            entry.name
          ) ||
          entry.name.endsWith(
            ".d.ts"
          )
        ) {
          continue;
        }

        const source =
          fs.readFileSync(
            fullPath,
            "utf8"
          );

        if (!source.trim()) {
          continue;
        }

        try {
          const result =
            ts.transpileModule(
              source,
              {
                compilerOptions: {
                  module:
                    ts.ModuleKind.ESNext,
                  target:
                    ts.ScriptTarget.ES2020,
                  jsx:
                    ts.JsxEmit.ReactJSX,
                  moduleResolution:
                    ts.ModuleResolutionKind.Node10,
                },
                fileName:
                  fullPath,
                reportDiagnostics:
                  true,
              }
            );

          for (const diagnostic of result.diagnostics ?? []) {
            if (
              diagnostic.category ===
              ts.DiagnosticCategory.Error
            ) {
              failures.push(
                `${path.relative(ROOT, fullPath)}: ${ts.flattenDiagnosticMessageText(
                  diagnostic.messageText,
                  " "
                )}`
              );
            }
          }
        } catch (error) {
          failures.push(
            `${path.relative(ROOT, fullPath)}: ${error.message}`
          );
        }
      }
    }

    walk(ROOT);

    assert.deepEqual(
      failures,
      []
    );
  }
);

console.log("");
console.log("==========================================");
console.log(`✅ ${passed} groupes de tests validés`);
console.log("==========================================");
console.log("");
